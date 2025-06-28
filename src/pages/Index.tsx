
import React, { useState, useRef, useEffect } from 'react';
import { PosterCanvas } from '@/components/PosterCanvas';
import { TemplateSelector } from '@/components/TemplateSelector';
import { TextInputs } from '@/components/TextInputs';
import { ImageUpload } from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [title, setTitle] = useState('Your Title Here');
  const [mainText, setMainText] = useState('Your main content goes here. This is where you can add your primary message or description.');
  const [quotedText, setQuotedText] = useState('Optional quoted text or special message');
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBackgroundImage(e.target?.result as string);
      toast.success('Background image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'poster.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
      toast.success('Poster downloaded successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Poster Generator
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Create beautiful 1080×1080 posters with elegant designs inspired by classical art
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Controls Panel */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">Design Controls</h2>
              
              <TemplateSelector 
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />
              
              <ImageUpload onImageUpload={handleImageUpload} />
              
              <TextInputs
                title={title}
                mainText={mainText}
                quotedText={quotedText}
                onTitleChange={setTitle}
                onMainTextChange={setMainText}
                onQuotedTextChange={setQuotedText}
              />
              
              <Button 
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Poster (1080×1080)
              </Button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">Preview</h2>
            <div className="flex justify-center">
              <PosterCanvas
                ref={canvasRef}
                backgroundImage={backgroundImage}
                title={title}
                mainText={mainText}
                quotedText={quotedText}
                template={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
