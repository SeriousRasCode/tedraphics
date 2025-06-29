
import React, { useState, useRef } from 'react';
import { PosterCanvas } from '@/components/PosterCanvas';
import { TemplateSelector } from '@/components/TemplateSelector';
import { PosterControls } from '@/components/PosterControls';
import { ImageUpload } from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [title, setTitle] = useState('Your Title Here');
  const [mainText, setMainText] = useState('Your main content goes here. This is where you can add your primary message or description.');
  const [quotedText, setQuotedText] = useState('Optional quoted text or special message');
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [gradientHeight, setGradientHeight] = useState(400);
  const [language, setLanguage] = useState<'amharic' | 'oromic'>('amharic');
  const [socialLinks, setSocialLinks] = useState({
    telegram: '@username',
    instagram: '@username',
    tiktok: '@username'
  });
  const [textPositions, setTextPositions] = useState({
    titleY: 120,
    textY: 400,
    quoteY: 750
  });
  const [quoteBoxSize, setQuoteBoxSize] = useState({
    width: 600,
    height: 150
  });
  const [fonts, setFonts] = useState({
    titleFont: 'Georgia, serif',
    textFont: 'Georgia, serif',
    quoteFont: 'Georgia, serif'
  });
  const [customFonts, setCustomFonts] = useState({
    titleFont: null as string | null,
    textFont: null as string | null,
    quoteFont: null as string | null
  });
  
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

  const handleTelegramShare = async () => {
    if (canvasRef.current) {
      try {
        // Convert canvas to blob
        const canvas = canvasRef.current;
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          
          // Create FormData to send to Telegram Bot API
          const formData = new FormData();
          formData.append('photo', blob, 'poster.png');
          
          // Check if running in Telegram Mini App
          if (window.Telegram && window.Telegram.WebApp) {
            // Send the image back to the bot
            const tg = window.Telegram.WebApp;
            const reader = new FileReader();
            reader.onload = () => {
              tg.sendData(JSON.stringify({
                type: 'share_poster',
                image: reader.result
              }));
            };
            reader.readAsDataURL(blob);
            toast.success('Poster shared to Telegram!');
          } else {
            toast.error('This feature is only available in Telegram Mini App');
          }
        }, 'image/png');
      } catch (error) {
        console.error('Error sharing to Telegram:', error);
        toast.error('Failed to share poster');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
            Poster Generator
          </h1>
          <p className="text-sm sm:text-xl text-blue-200 max-w-2xl mx-auto px-4">
            Create beautiful 1080×1080 posters with elegant designs and bilingual support
          </p>
        </div>

        {/* Mobile-first layout */}
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 max-w-7xl mx-auto">
          
          {/* Preview Panel - Shows first on mobile */}
          <div className="order-1 lg:order-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Preview</h2>
            <div className="flex justify-center">
              <PosterCanvas
                ref={canvasRef}
                backgroundImage={backgroundImage}
                title={title}
                mainText={mainText}
                quotedText={quotedText}
                template={selectedTemplate}
                gradientHeight={gradientHeight}
                language={language}
                socialLinks={socialLinks}
                textPositions={textPositions}
                quoteBoxSize={quoteBoxSize}
                fonts={fonts}
                customFonts={customFonts}
              />
            </div>
          </div>

          {/* Controls Panel - Shows second on mobile */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
            
            {/* Template & Image Upload */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Design Settings</h2>
              
              <div className="space-y-4">
                <TemplateSelector 
                  selectedTemplate={selectedTemplate}
                  onTemplateChange={setSelectedTemplate}
                />
                
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>
            </div>

            {/* All Controls */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Content & Style</h2>
              
              <PosterControls
                title={title}
                mainText={mainText}
                quotedText={quotedText}
                onTitleChange={setTitle}
                onMainTextChange={setMainText}
                onQuotedTextChange={setQuotedText}
                gradientHeight={gradientHeight}
                onGradientHeightChange={setGradientHeight}
                language={language}
                onLanguageChange={setLanguage}
                socialLinks={socialLinks}
                onSocialLinksChange={setSocialLinks}
                textPositions={textPositions}
                onTextPositionsChange={setTextPositions}
                quoteBoxSize={quoteBoxSize}
                onQuoteBoxSizeChange={setQuoteBoxSize}
                fonts={fonts}
                onFontsChange={setFonts}
                customFonts={customFonts}
                onCustomFontsChange={setCustomFonts}
              />
            </div>

            {/* Action Buttons */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 space-y-3">
              <Button 
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Poster (1080×1080)
              </Button>
              
              <Button 
                onClick={handleTelegramShare}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                <Send className="mr-2 h-5 w-5" />
                Share to Telegram Bot
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
