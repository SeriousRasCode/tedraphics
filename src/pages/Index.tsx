
import React, { useState, useRef } from 'react';
import { PosterCanvas } from '@/components/PosterCanvas';
import { TemplateSelector } from '@/components/TemplateSelector';
import { PosterControls } from '@/components/PosterControls';
import { ImageUpload } from '@/components/ImageUpload';
import { toast } from 'sonner';
import { HeaderSection } from '@/components/HeaderSection';
import { ActionButtons } from '@/components/ActionButtons';

const Index = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [title, setTitle] = useState('Your Title Here');
  const [mainText, setMainText] = useState('Your main content goes here. This is where you can add your primary message or description.');
  const [quotedText, setQuotedText] = useState('Optional quoted text or special message');
  const [selectedTemplate, setSelectedTemplate] = useState(2);
  const [gradientHeight, setGradientHeight] = useState(400);
  const [gradientStrength, setGradientStrength] = useState(80);
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
  const [quoteBoxStyle, setQuoteBoxStyle] = useState<'rectangle' | 'rounded' | 'circle' | 'diamond' | 'none'>('rounded');
  const [fonts, setFonts] = useState({
    titleFont: 'Georgia, serif',
    textFont: 'Georgia, serif',
    quoteFont: 'Georgia, serif',
    topBottomFont: 'Georgia, serif'
  });
  const [fontSizes, setFontSizes] = useState({
    titleSize: 80,
    textSize: 34,
    quoteSize: 30,
    topBottomSize: 28
  });
  const [customFonts, setCustomFonts] = useState({
    titleFont: null as string | null,
    textFont: null as string | null,
    quoteFont: null as string | null,
    topBottomFont: null as string | null
  });
  const [bilingualEnabled, setBilingualEnabled] = useState(true);
  const [frameStyle, setFrameStyle] = useState<'none' | 'simple' | 'elegant' | 'bold' | 'rounded' | 'double' | 'dashed' | 'dotted' | 'shadow' | 'glow' | 'vintage' | 'modern' | 'neon' | 'artistic' | 'minimal'>('none');
  const [textColors, setTextColors] = useState({
    titleColor: 'gradient',
    textColor: '#ffffff',
    quoteColor: 'gradient',
    topBottomColor: 'gradient'
  });
  const [mainTextWidth, setMainTextWidth] = useState(700);
  const [additionalIcons, setAdditionalIcons] = useState({
    place: 'Jimma University',
    time: '2:00 PM',
    date: 'December 30, 2024'
  });
  const [additionalIconsY, setAdditionalIconsY] = useState(890);
  const [socialLinksGap, setSocialLinksGap] = useState(50);
  const [gradientInnerHeight, setGradientInnerHeight] = useState(200);
  
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
      const canvas = canvasRef.current;
      
      // Check if we're in Telegram WebApp
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        canvas.toBlob((blob) => {
          if (!blob) {
            toast.error('Failed to generate poster image');
            return;
          }
          
          const reader = new FileReader();
          reader.onload = () => {
            try {
              // Use Telegram WebApp API to handle the download
              const url = canvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.href = url;
              link.download = 'tedraphics-poster.png';

              if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                window.open(url, '_blank');
                toast.success('Poster opened in new tab - long press to save');
              } else {
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success('Poster downloaded successfully!');
              }
            } catch (error) {
              console.error('Telegram WebApp download error:', error);
              // Fallback to regular download
              regularDownload();
            }
          };
          reader.readAsDataURL(blob);
        }, 'image/png', 1.0);
      } else {
        // Regular browser download
        regularDownload();
      }
    }
  };

  const regularDownload = () => {
    if (canvasRef.current) {
      try {
        const canvas = canvasRef.current;
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'tedraphics-poster.png';
        link.href = url;
        
        // Ensure HTTPS for security
        if (url.startsWith('data:')) {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success('Poster downloaded successfully!');
        } else {
          toast.error('Download failed - please try again');
        }
      } catch (error) {
        console.error('Download error:', error);
        toast.error('Download failed - please try again');
      }
    }
  };

  const handleTelegramShare = async () => {
    if (canvasRef.current) {
      try {
        const canvas = canvasRef.current;
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          
          const formData = new FormData();
          formData.append('photo', blob, 'poster.png');
          
          if (window.Telegram && window.Telegram.WebApp) {
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
        <HeaderSection />

        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 max-w-7xl mx-auto">
          
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
                gradientStrength={gradientStrength}
                gradientInnerHeight={gradientInnerHeight}
                language={language}
                socialLinks={socialLinks}
                textPositions={textPositions}
                quoteBoxSize={quoteBoxSize}
                quoteBoxStyle={quoteBoxStyle}
                fonts={fonts}
                fontSizes={fontSizes}
                customFonts={customFonts}
                bilingualEnabled={bilingualEnabled}
                frameStyle={frameStyle}
                textColors={textColors}
                mainTextWidth={mainTextWidth}
                additionalIcons={additionalIcons}
                additionalIconsY={additionalIconsY}
                socialLinksGap={socialLinksGap}
              />
            </div>
          </div>

          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
            
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

            <PosterControls
              title={title}
              mainText={mainText}
              quotedText={quotedText}
              onTitleChange={setTitle}
              onMainTextChange={setMainText}
              onQuotedTextChange={setQuotedText}
              gradientHeight={gradientHeight}
              onGradientHeightChange={setGradientHeight}
              gradientStrength={gradientStrength}
              onGradientStrengthChange={setGradientStrength}
              gradientInnerHeight={gradientInnerHeight}
              onGradientInnerHeightChange={setGradientInnerHeight}
              language={language}
              onLanguageChange={setLanguage}
              socialLinks={socialLinks}
              onSocialLinksChange={setSocialLinks}
              textPositions={textPositions}
              onTextPositionsChange={setTextPositions}
              quoteBoxSize={quoteBoxSize}
              onQuoteBoxSizeChange={setQuoteBoxSize}
              quoteBoxStyle={quoteBoxStyle}
              onQuoteBoxStyleChange={setQuoteBoxStyle}
              fonts={fonts}
              onFontsChange={setFonts}
              fontSizes={fontSizes}
              onFontSizesChange={setFontSizes}
              customFonts={customFonts}
              onCustomFontsChange={setCustomFonts}
              bilingualEnabled={bilingualEnabled}
              onBilingualEnabledChange={setBilingualEnabled}
              frameStyle={frameStyle}
              onFrameStyleChange={setFrameStyle}
              textColors={textColors}
              onTextColorsChange={setTextColors}
              mainTextWidth={mainTextWidth}
              onMainTextWidthChange={setMainTextWidth}
              additionalIcons={additionalIcons}
              onAdditionalIconsChange={setAdditionalIcons}
              additionalIconsY={additionalIconsY}
              onAdditionalIconsYChange={setAdditionalIconsY}
              socialLinksGap={socialLinksGap}
              onSocialLinksGapChange={setSocialLinksGap}
            />

            <ActionButtons 
              onDownload={handleDownload}
              onTelegramShare={handleTelegramShare}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
