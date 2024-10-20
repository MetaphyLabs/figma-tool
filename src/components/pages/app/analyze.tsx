'use client';

import { useAnalysisStore } from '@/client/store/analysis.store';
import { useAppDesignUploadStore } from '@/client/store/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/store/figma-design-upload.store';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
async function imageToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function getAnalysis(figmaImageData: ImageData, appImageData: ImageData) {
  try {
    const figmaImage = await imageToBase64(figmaImageData.url);
    const appImage = await imageToBase64(appImageData.url);
    console.log("I am here")
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    };

    const payload = {
      model: process.env.NEXT_PUBLIC_OPENAI_MODEL,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze if the coded output image is according to my design. Find each mistake or issue and suggest corrections.If you feel that the images are not at all a match that they are entirely two diffrent things. Then say that the Design and coded seems to be entirely different ones please check if the uploaded images are of right match pair. Give only the reasoning in beautiful markdown format, nothing else.
              Answer in this format:
              **Issue**: Issue Description 
              **IssuePriority**: P0 or P1 or P2 
              **Correction**:`,
            },
            {
              type: 'image_url',
              image_url: {
                url: figmaImage,
              },
            },
            {
              type: 'image_url',
              image_url: {
                url: appImage,
              },
            },
          ],
        },
      ],
      max_tokens: 4095,
    };

    const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    if (axios.isAxiosError(error)) {
      return `Error: ${error.response?.data?.error?.message || error.message}`;
    }
    return 'Error: Failed to analyze the images.';
  }
}

interface ImageData {
  url: string;
  status: boolean;
}

interface AnalysisData {
  id: string;
  figmaImage: string;
  appImage: string;
  analysis: string | null;
}

export default function Analyze() {
  const analysis = useAnalysisStore((state) => state.text);
  // const analysis = 'kdm'
  const setAnalysis = useAnalysisStore((state) => state.updateText);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const figmaImageData = useFigmaDesignUploadStore((state) => state.blob) as ImageData;
  const appImageData = useAppDesignUploadStore((state) => state.blob) as ImageData;
  // Check for ID in URL search params
  const searchParams = new URLSearchParams(window.location.search);
  const idFromUrl = searchParams.get('id');

  // Load or initialize analysis data
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    // Load from localStorage if ID exists
    if (idFromUrl) {
      const storedData = localStorage.getItem(idFromUrl);
      if (storedData) {
        setAnalysisData(JSON.parse(storedData));
      }
    } else {
      // Generate new ID and initialize data
      const newId = uuidv4();
      setAnalysisData({ id: newId, figmaImage: '', appImage: '', analysis: null });
    }
  }, [idFromUrl]);

  useEffect(() => {
    const performAnalysis = async () => {
      if (figmaImageData?.url && appImageData?.url && analysis === null) {
        setIsLoading(true);
        try {
          const result = await getAnalysis(figmaImageData, appImageData);
          setAnalysis(result);
          const updatedAnalysisData = {
            ...analysisData,
            figmaImage: figmaImageData.url!,
            appImage: appImageData.url!,
            analysis: result!,
            id: analysisData?.id! || uuidv4(),
          };
          setAnalysisData(updatedAnalysisData);
          localStorage.setItem(analysisData?.id!, JSON.stringify(updatedAnalysisData));

          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
          setAnalysis(`Error: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      }
    };

    performAnalysis();
  }, [figmaImageData, appImageData, analysis, setAnalysis, analysisData]);

  return (
    <div className='bg-muted dark:bg-muted/60 rounded-md'>
      <div className='relative h-[75vh] p-4 overflow-y-auto'>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center h-full space-y-4'>
            <Loader2 className='w-12 h-12 animate-spin text-primary' />
            <h2 className='text-2xl font-semibold text-center'>Analyzing Designs</h2>
            <p className='text-center text-muted-foreground max-w-md'>
              Our AI is comparing your Figma design to the coded implementation, identifying discrepancies and suggesting improvements.
            </p>
            {/* <AnimatedLoadingText /> */}
          </div>
        ) : analysis ? (
          <div className='flex flex-col gap-5'>
            <div className='flex flex-row items-center justify-center gap-12 mt-4mx-auto'>
              <img src={figmaImageData.url} alt='figma-design' width={600} height={480} />
              <img src={appImageData.url} alt='app-design' width={600} height={480} />
            </div>
            <ReactMarkdown className='relative h-[60vh] p-4 overflow-y-auto'>{analysis}</ReactMarkdown>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full space-y-4'>
            <h2 className='text-2xl font-semibold text-center'>Design Blend Analysis</h2>
            <p className='text-center text-muted-foreground max-w-md'>
              Upload both your Figma design and the coded implementation to receive an AI-powered analysis of their differences.
            </p>
            <p className='text-sm text-muted-foreground'>Please upload both the Figma image and the app image to begin the analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
}
