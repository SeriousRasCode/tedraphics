
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface PosterControlsProps {
  title: string;
  mainText: string;
  quotedText: string;
  onTitleChange: (value: string) => void;
  onMainTextChange: (value: string) => void;
  onQuotedTextChange: (value: string) => void;
  gradientHeight: number;
  onGradientHeightChange: (value: number) => void;
  gradientStrength: number;
  onGradientStrengthChange: (value: number) => void;
  language: 'amharic' | 'oromic';
  onLanguageChange: (value: 'amharic' | 'oromic') => void;
  socialLinks: {
    telegram: string;
    instagram: string;
    tiktok: string;
  };
  onSocialLinksChange: (links: { telegram: string; instagram: string; tiktok: string }) => void;
  textPositions: {
    titleY: number;
    textY: number;
    quoteY: number;
  };
  onTextPositionsChange: (positions: { titleY: number; textY: number; quoteY: number }) => void;
  quoteBoxSize: {
    width: number;
    height: number;
  };
  onQuoteBoxSizeChange: (size: { width: number; height: number }) => void;
  quoteBoxStyle: 'rectangle' | 'rounded' | 'circle' | 'diamond' | 'none';
  onQuoteBoxStyleChange: (style: 'rectangle' | 'rounded' | 'circle' | 'diamond' | 'none') => void;
  fonts: {
    titleFont: string;
    textFont: string;
    quoteFont: string;
    topBottomFont: string;
  };
  onFontsChange: (fonts: { titleFont: string; textFont: string; quoteFont: string; topBottomFont: string }) => void;
  fontSizes: {
    titleSize: number;
    textSize: number;
    quoteSize: number;
    topBottomSize: number;
  };
  onFontSizesChange: (sizes: { titleSize: number; textSize: number; quoteSize: number; topBottomSize: number }) => void;
  customFonts: {
    titleFont: string | null;
    textFont: string | null;
    quoteFont: string | null;
    topBottomFont: string | null;
  };
  onCustomFontsChange: (customFonts: { titleFont: string | null; textFont: string | null; quoteFont: string | null; topBottomFont: string | null }) => void;
}

const availableFonts = [
  'Georgia, serif',
  'Arial, sans-serif',
  'Times New Roman, serif',
  'Helvetica, sans-serif',
  'Verdana, sans-serif',
  'Trebuchet MS, sans-serif',
  'Impact, sans-serif',
  'Comic Sans MS, cursive',
  'Courier New, monospace',
  'Palatino, serif'
];

export const PosterControls: React.FC<PosterControlsProps> = ({
  title,
  mainText,
  quotedText,
  onTitleChange,
  onMainTextChange,
  onQuotedTextChange,
  gradientHeight,
  onGradientHeightChange,
  gradientStrength,
  onGradientStrengthChange,
  language,
  onLanguageChange,
  socialLinks,
  onSocialLinksChange,
  textPositions,
  onTextPositionsChange,
  quoteBoxSize,
  onQuoteBoxSizeChange,
  quoteBoxStyle,
  onQuoteBoxStyleChange,
  fonts,
  onFontsChange,
  fontSizes,
  onFontSizesChange,
  customFonts,
  onCustomFontsChange,
}) => {
  const handleFontUpload = (event: React.ChangeEvent<HTMLInputElement>, fontType: 'titleFont' | 'textFont' | 'quoteFont' | 'topBottomFont') => {
    const file = event.target.files?.[0];
    if (file && file.type.includes('font')) {
      const fontName = file.name.replace(/\.[^/.]+$/, '');
      const url = URL.createObjectURL(file);
      
      const font = new FontFace(fontName, `url(${url})`);
      font.load().then(() => {
        document.fonts.add(font);
        onCustomFontsChange({
          ...customFonts,
          [fontType]: fontName
        });
      }).catch((error) => {
        console.error('Error loading font:', error);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Text Inputs */}
      <div className="space-y-4">
        <div>
          <Label className="text-white text-sm font-medium">Title</Label>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter your title"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-2"
          />
        </div>

        <div>
          <Label className="text-white text-sm font-medium">Main Content</Label>
          <Textarea
            value={mainText}
            onChange={(e) => onMainTextChange(e.target.value)}
            placeholder="Enter your main content"
            rows={3}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none mt-2"
          />
        </div>

        <div>
          <Label className="text-white text-sm font-medium">Quoted Text (Optional)</Label>
          <Textarea
            value={quotedText}
            onChange={(e) => onQuotedTextChange(e.target.value)}
            placeholder="Enter a quote or special message"
            rows={2}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none mt-2"
          />
        </div>
      </div>

      {/* Language Selection */}
      <div>
        <Label className="text-white text-sm font-medium">Language</Label>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-full bg-white/10 border-white/20 text-white mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="amharic" className="text-white hover:bg-slate-700">
              Amharic
            </SelectItem>
            <SelectItem value="oromic" className="text-white hover:bg-slate-700">
              Oromic
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gradient Controls */}
      <div className="space-y-3">
        <div>
          <Label className="text-white text-sm font-medium">
            Gradient Height: {gradientHeight}px
          </Label>
          <Slider
            value={[gradientHeight]}
            onValueChange={(value) => onGradientHeightChange(value[0])}
            max={1080}
            min={200}
            step={20}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label className="text-white text-sm font-medium">
            Gradient Strength: {gradientStrength}%
          </Label>
          <Slider
            value={[gradientStrength]}
            onValueChange={(value) => onGradientStrengthChange(value[0])}
            max={100}
            min={0}
            step={5}
            className="mt-2"
          />
        </div>
      </div>

      {/* Quote Box Style */}
      <div>
        <Label className="text-white text-sm font-medium">Quote Box Style</Label>
        <Select value={quoteBoxStyle} onValueChange={onQuoteBoxStyleChange}>
          <SelectTrigger className="w-full bg-white/10 border-white/20 text-white mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="rectangle" className="text-white hover:bg-slate-700">
              Rectangle
            </SelectItem>
            <SelectItem value="rounded" className="text-white hover:bg-slate-700">
              Rounded Rectangle
            </SelectItem>
            <SelectItem value="circle" className="text-white hover:bg-slate-700">
              Circle
            </SelectItem>
            <SelectItem value="diamond" className="text-white hover:bg-slate-700">
              Diamond
            </SelectItem>
            <SelectItem value="none" className="text-white hover:bg-slate-700">
              No Shape
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Social Media Links */}
      <div className="space-y-3">
        <Label className="text-white text-sm font-medium">Social Media Links</Label>
        <div className="space-y-2">
          <Input
            value={socialLinks.telegram}
            onChange={(e) => onSocialLinksChange({ ...socialLinks, telegram: e.target.value })}
            placeholder="Telegram username"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            value={socialLinks.instagram}
            onChange={(e) => onSocialLinksChange({ ...socialLinks, instagram: e.target.value })}
            placeholder="Instagram username"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            value={socialLinks.tiktok}
            onChange={(e) => onSocialLinksChange({ ...socialLinks, tiktok: e.target.value })}
            placeholder="TikTok username"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      {/* Text Positions */}
      <div className="space-y-3">
        <Label className="text-white text-sm font-medium">Text Positions</Label>
        <div className="space-y-2">
          <div>
            <Label className="text-white text-xs">Title Y: {textPositions.titleY}px</Label>
            <Slider
              value={[textPositions.titleY]}
              onValueChange={(value) => onTextPositionsChange({ ...textPositions, titleY: value[0] })}
              max={800}
              min={80}
              step={10}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-white text-xs">Main Text Y: {textPositions.textY}px</Label>
            <Slider
              value={[textPositions.textY]}
              onValueChange={(value) => onTextPositionsChange({ ...textPositions, textY: value[0] })}
              max={900}
              min={100}
              step={10}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-white text-xs">Quote Y: {textPositions.quoteY}px</Label>
            <Slider
              value={[textPositions.quoteY]}
              onValueChange={(value) => onTextPositionsChange({ ...textPositions, quoteY: value[0] })}
              max={1000}
              min={600}
              step={10}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Quote Box Size */}
      <div className="space-y-3">
        <Label className="text-white text-sm font-medium">Quote Box Size</Label>
        <div className="space-y-2">
          <div>
            <Label className="text-white text-xs">Width: {quoteBoxSize.width}px</Label>
            <Slider
              value={[quoteBoxSize.width]}
              onValueChange={(value) => onQuoteBoxSizeChange({ ...quoteBoxSize, width: value[0] })}
              max={1000}
              min={400}
              step={20}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-white text-xs">Height: {quoteBoxSize.height}px</Label>
            <Slider
              value={[quoteBoxSize.height]}
              onValueChange={(value) => onQuoteBoxSizeChange({ ...quoteBoxSize, height: value[0] })}
              max={400}
              min={100}
              step={20}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Font Selection with Custom Upload */}
      <div className="space-y-4">
        <Label className="text-white text-sm font-medium">Font Selection</Label>
        
        {/* Title Font */}
        <div>
          <Label className="text-white text-xs">Title Font</Label>
          <div className="flex gap-2 mt-1">
            <Select value={fonts.titleFont} onValueChange={(value) => onFontsChange({ ...fonts, titleFont: value })}>
              <SelectTrigger className="flex-1 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {availableFonts.map((font) => (
                  <SelectItem key={font} value={font} className="text-white hover:bg-slate-700">
                    {font.split(',')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <input
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={(e) => handleFontUpload(e, 'titleFont')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {customFonts.titleFont && (
            <p className="text-xs text-green-400 mt-1">Custom font loaded: {customFonts.titleFont}</p>
          )}
        </div>
        
        {/* Text Font */}
        <div>
          <Label className="text-white text-xs">Text Font</Label>
          <div className="flex gap-2 mt-1">
            <Select value={fonts.textFont} onValueChange={(value) => onFontsChange({ ...fonts, textFont: value })}>
              <SelectTrigger className="flex-1 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {availableFonts.map((font) => (
                  <SelectItem key={font} value={font} className="text-white hover:bg-slate-700">
                    {font.split(',')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <input
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={(e) => handleFontUpload(e, 'textFont')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {customFonts.textFont && (
            <p className="text-xs text-green-400 mt-1">Custom font loaded: {customFonts.textFont}</p>
          )}
        </div>
        
        {/* Quote Font */}
        <div>
          <Label className="text-white text-xs">Quote Font</Label>
          <div className="flex gap-2 mt-1">
            <Select value={fonts.quoteFont} onValueChange={(value) => onFontsChange({ ...fonts, quoteFont: value })}>
              <SelectTrigger className="flex-1 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {availableFonts.map((font) => (
                  <SelectItem key={font} value={font} className="text-white hover:bg-slate-700">
                    {font.split(',')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <input
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={(e) => handleFontUpload(e, 'quoteFont')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {customFonts.quoteFont && (
            <p className="text-xs text-green-400 mt-1">Custom font loaded: {customFonts.quoteFont}</p>
          )}
        </div>

        {/* Top/Bottom Text Font */}
        <div>
          <Label className="text-white text-xs">Top/Bottom Text Font</Label>
          <div className="flex gap-2 mt-1">
            <Select value={fonts.topBottomFont} onValueChange={(value) => onFontsChange({ ...fonts, topBottomFont: value })}>
              <SelectTrigger className="flex-1 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {availableFonts.map((font) => (
                  <SelectItem key={font} value={font} className="text-white hover:bg-slate-700">
                    {font.split(',')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <input
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={(e) => handleFontUpload(e, 'topBottomFont')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {customFonts.topBottomFont && (
            <p className="text-xs text-green-400 mt-1">Custom font loaded: {customFonts.topBottomFont}</p>
          )}
        </div>
      </div>

      {/* Font Sizes */}
      <div className="space-y-3">
        <Label className="text-white text-sm font-medium">Font Sizes</Label>
        <div className="space-y-2">
          <div>
            <Label className="text-white text-xs">Title Size: {fontSizes.titleSize}px</Label>
            <Slider
              value={[fontSizes.titleSize]}
              onValueChange={(value) => onFontSizesChange({ ...fontSizes, titleSize: value[0] })}
              max={120}
              min={20}
              step={2}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-white text-xs">Text Size: {fontSizes.textSize}px</Label>
            <Slider
              value={[fontSizes.textSize]}
              onValueChange={(value) => onFontSizesChange({ ...fontSizes, textSize: value[0] })}
              max={60}
              min={16}
              step={2}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-white text-xs">Quote Size: {fontSizes.quoteSize}px</Label>
            <Slider
              value={[fontSizes.quoteSize]}
              onValueChange={(value) => onFontSizesChange({ ...fontSizes, quoteSize: value[0] })}
              max={50}
              min={16}
              step={2}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-white text-xs">Top/Bottom Text Size: {fontSizes.topBottomSize}px</Label>
            <Slider
              value={[fontSizes.topBottomSize]}
              onValueChange={(value) => onFontSizesChange({ ...fontSizes, topBottomSize: value[0] })}
              max={40}
              min={16}
              step={2}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
