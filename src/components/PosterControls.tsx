
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface PosterControlsProps {
  title: string;
  mainText: string;
  quotedText: string;
  onTitleChange: (value: string) => void;
  onMainTextChange: (value: string) => void;
  onQuotedTextChange: (value: string) => void;
  gradientHeight: number;
  onGradientHeightChange: (value: number) => void;
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
  fonts: {
    titleFont: string;
    textFont: string;
    quoteFont: string;
  };
  onFontsChange: (fonts: { titleFont: string; textFont: string; quoteFont: string }) => void;
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
  language,
  onLanguageChange,
  socialLinks,
  onSocialLinksChange,
  textPositions,
  onTextPositionsChange,
  quoteBoxSize,
  onQuoteBoxSizeChange,
  fonts,
  onFontsChange,
}) => {
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

      {/* Gradient Height Control */}
      <div>
        <Label className="text-white text-sm font-medium">
          Gradient Height: {gradientHeight}px
        </Label>
        <Slider
          value={[gradientHeight]}
          onValueChange={(value) => onGradientHeightChange(value[0])}
          max={500}
          min={200}
          step={20}
          className="mt-2"
        />
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
              max={400}
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
              max={600}
              min={300}
              step={10}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-white text-xs">Quote Y: {textPositions.quoteY}px</Label>
            <Slider
              value={[textPositions.quoteY]}
              onValueChange={(value) => onTextPositionsChange({ ...textPositions, quoteY: value[0] })}
              max={900}
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
              max={800}
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
              max={300}
              min={100}
              step={20}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Font Selection */}
      <div className="space-y-3">
        <Label className="text-white text-sm font-medium">Font Selection</Label>
        <div className="space-y-2">
          <div>
            <Label className="text-white text-xs">Title Font</Label>
            <Select value={fonts.titleFont} onValueChange={(value) => onFontsChange({ ...fonts, titleFont: value })}>
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white mt-1">
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
          </div>
          
          <div>
            <Label className="text-white text-xs">Text Font</Label>
            <Select value={fonts.textFont} onValueChange={(value) => onFontsChange({ ...fonts, textFont: value })}>
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white mt-1">
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
          </div>
          
          <div>
            <Label className="text-white text-xs">Quote Font</Label>
            <Select value={fonts.quoteFont} onValueChange={(value) => onFontsChange({ ...fonts, quoteFont: value })}>
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white mt-1">
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
          </div>
        </div>
      </div>
    </div>
  );
};
