'use client';

import { useAppDesignUploadStore } from '@/client/store/app-design-upload.store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CircleX, CloudUpload } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

export function AppDesignUpload() {
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const file = useAppDesignUploadStore((state) => state.file);
  const blob = useAppDesignUploadStore((state) => state.blob);
  const updateBlob = useAppDesignUploadStore((state) => state.updateBlob);
  const updateFile = useAppDesignUploadStore((state) => state.updateFile);

  function updateFiles(inputFiles: FileList | null) {
    if (!inputFiles) return;

    setLoading(true);
    const file = inputFiles[0];

    // Toast for correct file format
    if (!inputFiles[0].type.startsWith('image')) {
      toast.warning('Invalid file format!', { description: 'Please select image file format' });
      setLoading(false);
      return;
    }

    // Toast for correct file size
    // if (file.size >= 1024 * 1024 * 5) {
    //   toast.warning('File size exceeded!', { description: 'File size must have at most 5MB' });
    //   return;
    // }

    const blob = URL.createObjectURL(file);
    updateBlob({ url: blob, status: true });

    updateFile(file);
    setLoading(false);
  }

  function dragPreventDefault(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    dragPreventDefault(e);

    updateFiles(e.dataTransfer.files);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputFiles = e.target.files;
    updateFiles(inputFiles);
  }

  // Preview thumbnail
  if (blob.status) {
    return (
      <div className='relative'>
        <div className='h-[85vh] bg-muted dark:bg-muted/60 rounded-md p-2'>
          <img
            src={blob.url}
            className={'w-full h-full object-contain rounded-md'}
            alt={file?.name}
            width={240}
            height={160}
            style={{
              aspectRatio: '240/160',
            }}
          />
        </div>
        <motion.div
          className='absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 max-w-96 mx-auto'
          initial={{ opacity: 0, top: 32 }}
          animate={{ opacity: 1, top: 16 }}
        >
          <p className='w-full bg-muted/70 backdrop-blur-sm rounded-md text-sm px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2 font-medium text-muted-foreground'>
            {file?.name}
          </p>
          <div>
            <Button
              className='text-muted-foreground hover:text-foreground bg-muted/70 backdrop-blur-sm'
              type='button'
              variant='secondary'
              size='icon'
              onClick={() => {
                updateBlob({ url: '', status: false });
                updateFile(null);
              }}
              disabled={loading}
            >
              <CircleX size={14} />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div
        className='border rounded-md h-[85vh] bg-muted/50 text-muted-foreground text-sm flex items-center justify-center flex-col hover:cursor-pointer'
        onClick={() => inputRef.current?.click()}
        onDragEnter={dragPreventDefault}
        onDragLeave={dragPreventDefault}
        onDragOver={dragPreventDefault}
        onDrop={handleDrop}
      >
        <CloudUpload size={82} strokeWidth={1.5} />
        <p className='mt-3'>Upload App Design</p>
      </div>
      <input ref={inputRef} id='app-image' className='hidden' type='file' multiple={false} accept='.jpg,.png,.jpeg,.webp' onChange={handleChange} />
    </React.Fragment>
  );
}
