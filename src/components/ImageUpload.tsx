
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6">
      <label className="block text-white text-sm font-medium mb-2">
        Background Image
      </label>
      <Button
        onClick={handleButtonClick}
        variant="outline"
        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload Background Image
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <p className="text-white/60 text-xs mt-2">
        Upload an image to use as your poster background
      </p>
    </div>
  );
};
