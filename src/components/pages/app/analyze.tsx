'use client';

import { useAppDesignUploadStore } from '@/client/client/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/client/figma-design-upload.store';
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import { useEffect, useState } from 'react';

const md = new MarkdownIt();

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
  const figmaImage = await imageToBase64(figmaImageData.url);
  console.log('Figma Image', figmaImage);
  const appImage = await imageToBase64(appImageData.url);
  console.log('App Image', appImage);
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  };
  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `I have a design image and the coded output image of a Figma design. Analyze if the coded output image is according to my design. Find the mistakes and issues and suggest corrections. Give only the reasoning. Give the whole answer in advanced markdown format, nothing else.\nFigma Image: ![Figma Image](data:image/jpeg;base64,${figmaImage})\nApp Image: ![App Image](data:image/jpeg;base64,${appImage})`,
      },
    ],
    max_tokens: 4095,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });
    console.log('Resp', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return 'Error: Failed to analyze the images.';
  }
}

interface ImageData {
  url: string;
  status: boolean;
}

export default function Analyze() {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const figmaImageData = useFigmaDesignUploadStore((state) => state.blob) as ImageData;
  const appImageData = useAppDesignUploadStore((state) => state.blob) as ImageData;

  useEffect(() => {
    if (figmaImageData && appImageData) {
      setAnalysis('');
      setIsLoading(true);
      getAnalysis(figmaImageData, appImageData)
        .then((response) => {
          if (typeof response === 'string') {
            setAnalysis(response);
          } else {
            setAnalysis(response?.choices[0]?.message?.content ?? '');
          }
        })
        .catch((error) => setAnalysis('Error: Failed to analyze the images.'))
        .finally(() => setIsLoading(false));
    } else {
      setAnalysis('Please upload both the Figma image and the app image for analysis.');
    }
  }, [figmaImageData, appImageData]);

  return (
    <div>
      <div className='bg-muted/50 rounded-md'>
        <div className='relative h-[60vh] p-2 overflow-y-auto'>
          {isLoading ? (
            <p>Loading analysis...</p>
          ) : (
            <div className=''>
              {/* <h2>Analysis Result</h2> */}
              {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
              <div dangerouslySetInnerHTML={{ __html: md.render(analysis) }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
