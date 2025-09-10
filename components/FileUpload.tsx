import React, { useCallback, useState } from 'react';
import { Icon } from './Icon';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  disabled?: boolean;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (files: FileList | null) => {
    setError(null);
    if (files && files.length > 0) {
      const file = files[0];
      if (ALLOWED_TYPES.includes(file.type)) {
        onFileUpload(file);
      } else {
        setError('Geçersiz dosya türü. Lütfen bir JPG, PNG, WEBP resmi veya PDF yükleyin.');
      }
    }
  };
  
  const onDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!disabled) {
       handleFileChange(e.dataTransfer.files);
    }
  }, [disabled]);


  const baseClasses = "relative block w-full max-w-2xl mx-auto rounded-lg border-2 border-dashed border-slate-600 p-12 text-center transition-colors duration-300";
  const draggingClasses = "border-cyan-500 bg-slate-800";
  const hoverClasses = "hover:border-slate-500 hover:bg-slate-800";

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <label
        htmlFor="file-upload"
        className={`${baseClasses} ${isDragging ? draggingClasses : hoverClasses} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="flex flex-col items-center">
          <Icon name="drag-drop" className="w-16 h-16 text-slate-500 mb-4" />
          <span className="mt-2 block text-lg font-semibold text-slate-200">
            Belgenizi Buraya Sürükleyin
          </span>
          <span className="block text-sm text-slate-500">veya göz atmak için tıklayın</span>
          <p className="mt-4 text-xs text-slate-400">Desteklenen formatlar: JPG, PNG, WEBP, PDF</p>
        </div>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept={ALLOWED_TYPES.join(',')}
          onChange={(e) => handleFileChange(e.target.files)}
          disabled={disabled}
        />
      </label>
      {error && <p className="mt-4 text-red-400 font-semibold">{error}</p>}
    </div>
  );
};