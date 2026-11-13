
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  hasImage: boolean;
  onRemove: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, hasImage, onRemove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
    event.target.value = '';
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label htmlFor="background-upload-button" className="block text-white text-sm font-medium mb-2">
        Your image
      </label>
      <div className="flex gap-2">
        <Button
          id="background-upload-button"
          onClick={handleButtonClick}
          variant="outline"
          className="h-11 flex-1 rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
        >
          <Upload className="mr-2 h-4 w-4" />
          {hasImage ? 'Replace image' : 'Upload background'}
        </Button>
        {hasImage && (
          <Button type="button" variant="outline" onClick={onRemove} aria-label="Remove background image" className="h-11 w-11 shrink-0 rounded-xl border-white/20 bg-white/10 p-0 text-white hover:bg-white/20 hover:text-white">
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <p className="text-white/60 text-xs mt-2">
        JPG, PNG, or another image from your device.
      </p>
    </div>
  );
};
