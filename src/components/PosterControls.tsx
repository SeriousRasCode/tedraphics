import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Type, Move, Palette, Image, Settings, FileText, Crop, ImageIcon, Trash2, X } from 'lucide-react';

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
  gradientInnerHeight: number;
  onGradientInnerHeightChange: (value: number) => void;
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
  quoteBoxStyle: 'rectangle' | 'rounded' | 'none';
  onQuoteBoxStyleChange: (style: 'rectangle' | 'rounded' | 'none') => void;
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
  onCustomFontsChange: (fonts: { titleFont: string | null; textFont: string | null; quoteFont: string | null; topBottomFont: string | null }) => void;
  bilingualEnabled: boolean;
  onBilingualEnabledChange: (enabled: boolean) => void;
  frameStyle: 'none' | 'simple' | 'elegant' | 'bold' | 'rounded' | 'double' | 'dashed' | 'dotted' | 'shadow' | 'glow' | 'vintage' | 'modern' | 'neon' | 'artistic' | 'minimal' | 'partial-top-right' | 'partial-bottom-left' | 'partial-diagonal';
  onFrameStyleChange: (style: 'none' | 'simple' | 'elegant' | 'bold' | 'rounded' | 'double' | 'dashed' | 'dotted' | 'shadow' | 'glow' | 'vintage' | 'modern' | 'neon' | 'artistic' | 'minimal' | 'partial-top-right' | 'partial-bottom-left' | 'partial-diagonal') => void;
  textColors: {
    titleColor: string;
    textColor: string;
    quoteColor: string;
    topBottomColor: string;
  };
  onTextColorsChange: (colors: { titleColor: string; textColor: string; quoteColor: string; topBottomColor: string }) => void;
  mainTextWidth: number;
  onMainTextWidthChange: (width: number) => void;
  additionalIcons: {
    place: string;
    time: string;
    date: string;
  };
  onAdditionalIconsChange: (icons: { place: string; time: string; date: string }) => void;
  additionalIconsY: number;
  onAdditionalIconsYChange: (y: number) => void;
  socialLinksGap: number;
  onSocialLinksGapChange: (gap: number) => void;
  imageCrop: {
    x: number;
    y: number;
    scale: number;
  };
  onImageCropChange: (crop: { x: number; y: number; scale: number }) => void;
  clipart: {
    image: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  onClipartChange: (clipart: { image: string | null; x: number; y: number; width: number; height: number }) => void;
  onClipartUpload: (file: File) => void;
  additionalIconsGap: number;
  onAdditionalIconsGapChange: (gap: number) => void;
  socialLinksPosition: {
    x: number;
    y: number;
  };
  onSocialLinksPositionChange: (position: { x: number; y: number }) => void;
}

export const PosterControls = ({ 
  title, mainText, quotedText, onTitleChange, onMainTextChange, onQuotedTextChange,
  gradientHeight, onGradientHeightChange, gradientStrength, onGradientStrengthChange,
  gradientInnerHeight, onGradientInnerHeightChange,
  language, onLanguageChange, socialLinks, onSocialLinksChange,
  textPositions, onTextPositionsChange, quoteBoxSize, onQuoteBoxSizeChange,
  quoteBoxStyle, onQuoteBoxStyleChange, fonts, onFontsChange,
  fontSizes, onFontSizesChange, customFonts, onCustomFontsChange,
  bilingualEnabled, onBilingualEnabledChange, frameStyle, onFrameStyleChange,
  textColors, onTextColorsChange, mainTextWidth, onMainTextWidthChange,
  additionalIcons, onAdditionalIconsChange, additionalIconsY, onAdditionalIconsYChange,
  socialLinksGap, onSocialLinksGapChange, imageCrop, onImageCropChange,
  clipart, onClipartChange, onClipartUpload, additionalIconsGap, onAdditionalIconsGapChange,
  socialLinksPosition, onSocialLinksPositionChange
}: PosterControlsProps) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fontType: keyof typeof customFonts) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fontData = e.target?.result as string;
        onCustomFontsChange({
          ...customFonts,
          [fontType]: fontData
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClipartFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onClipartUpload(file);
    }
  };

  const removeFontFile = (fontType: keyof typeof customFonts) => {
    onCustomFontsChange({
      ...customFonts,
      [fontType]: null
    });
  };

  const removeClipart = () => {
    onClipartChange({
      ...clipart,
      image: null
    });
  };

  return (
    <div className="space-y-4">
      {/* Content & Style Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-white hover:bg-white/20 p-0 h-auto">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <h2 className="text-xl sm:text-2xl font-semibold">Content & Style</h2>
              </div>
              <div className="text-sm text-white/70">Click to expand</div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  placeholder="Enter poster title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainText" className="text-white">Main Text</Label>
                <Textarea
                  id="mainText"
                  value={mainText}
                  onChange={(e) => onMainTextChange(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 min-h-[100px]"
                  placeholder="Enter main content"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quotedText" className="text-white">Quoted Text</Label>
                <Textarea
                  id="quotedText"
                  value={quotedText}
                  onChange={(e) => onQuotedTextChange(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  placeholder="Enter quoted text"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Horizontal Options Bar */}
      <div className="flex flex-wrap gap-2 justify-center border-t border-white/20 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSection('typography')}
          className={`text-white hover:bg-white/20 ${openSections.typography ? 'bg-white/20' : ''}`}
        >
          <Type className="w-4 h-4 mr-2" />
          Typography
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSection('colors')}
          className={`text-white hover:bg-white/20 ${openSections.colors ? 'bg-white/20' : ''}`}
        >
          <Palette className="w-4 h-4 mr-2" />
          Colors
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSection('positions')}
          className={`text-white hover:bg-white/20 ${openSections.positions ? 'bg-white/20' : ''}`}
        >
          <Move className="w-4 h-4 mr-2" />
          Positions
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSection('styling')}
          className={`text-white hover:bg-white/20 ${openSections.styling ? 'bg-white/20' : ''}`}
        >
          <Image className="w-4 h-4 mr-2" />
          Styling
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSection('settings')}
          className={`text-white hover:bg-white/20 ${openSections.settings ? 'bg-white/20' : ''}`}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSection('crop')}
          className={`text-white hover:bg-white/20 ${openSections.crop ? 'bg-white/20' : ''}`}
        >
          <Crop className="w-4 h-4 mr-2" />
          Crop
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSection('clipart')}
          className={`text-white hover:bg-white/20 ${openSections.clipart ? 'bg-white/20' : ''}`}
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Clipart
        </Button>
      </div>

      {/* Typography Section */}
      {openSections.typography && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Typography</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Title Font</Label>
              <Select
                value={fonts.titleFont}
                onValueChange={(value) => onFontsChange({ ...fonts, titleFont: value })}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                  <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                  <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept=".ttf,.otf,.woff,.woff2"
                  onChange={(e) => handleFileUpload(e, 'titleFont')}
                  className="text-sm text-white/70 flex-1"
                />
                {customFonts.titleFont && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFontFile('titleFont')}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Title Size: {fontSizes.titleSize}px</Label>
              <Slider
                value={[fontSizes.titleSize]}
                onValueChange={([value]) => onFontSizesChange({ ...fontSizes, titleSize: value })}
                max={120}
                min={20}
                step={2}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Text Font</Label>
              <Select
                value={fonts.textFont}
                onValueChange={(value) => onFontsChange({ ...fonts, textFont: value })}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                  <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                  <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept=".ttf,.otf,.woff,.woff2"
                  onChange={(e) => handleFileUpload(e, 'textFont')}
                  className="text-sm text-white/70 flex-1"
                />
                {customFonts.textFont && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFontFile('textFont')}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Text Size: {fontSizes.textSize}px</Label>
              <Slider
                value={[fontSizes.textSize]}
                onValueChange={([value]) => onFontSizesChange({ ...fontSizes, textSize: value })}
                max={60}
                min={16}
                step={2}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Quote Font</Label>
              <Select
                value={fonts.quoteFont}
                onValueChange={(value) => onFontsChange({ ...fonts, quoteFont: value })}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                  <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                  <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept=".ttf,.otf,.woff,.woff2"
                  onChange={(e) => handleFileUpload(e, 'quoteFont')}
                  className="text-sm text-white/70 flex-1"
                />
                {customFonts.quoteFont && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFontFile('quoteFont')}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Quote Size: {fontSizes.quoteSize}px</Label>
              <Slider
                value={[fontSizes.quoteSize]}
                onValueChange={([value]) => onFontSizesChange({ ...fontSizes, quoteSize: value })}
                max={50}
                min={16}
                step={2}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Top/Bottom Font</Label>
              <Select
                value={fonts.topBottomFont}
                onValueChange={(value) => onFontsChange({ ...fonts, topBottomFont: value })}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                  <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                  <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept=".ttf,.otf,.woff,.woff2"
                  onChange={(e) => handleFileUpload(e, 'topBottomFont')}
                  className="text-sm text-white/70 flex-1"
                />
                {customFonts.topBottomFont && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFontFile('topBottomFont')}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Top/Bottom Size: {fontSizes.topBottomSize}px</Label>
              <Slider
                value={[fontSizes.topBottomSize]}
                onValueChange={([value]) => onFontSizesChange({ ...fontSizes, topBottomSize: value })}
                max={40}
                min={12}
                step={2}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Colors Section */}
      {openSections.colors && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Colors & Gradients</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Title Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColors.titleColor === 'gradient' ? '#ffffff' : textColors.titleColor}
                  onChange={(e) => onTextColorsChange({ ...textColors, titleColor: e.target.value })}
                  className="w-12 h-8 rounded border border-white/30"
                />
                <Button
                  size="sm"
                  variant={textColors.titleColor === 'gradient' ? 'default' : 'outline'}
                  onClick={() => onTextColorsChange({ ...textColors, titleColor: 'gradient' })}
                  className="text-xs"
                >
                  Gradient
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Main Text Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColors.textColor === 'gradient' ? '#ffffff' : textColors.textColor}
                  onChange={(e) => onTextColorsChange({ ...textColors, textColor: e.target.value })}
                  className="w-12 h-8 rounded border border-white/30"
                />
                <Button
                  size="sm"
                  variant={textColors.textColor === 'gradient' ? 'default' : 'outline'}
                  onClick={() => onTextColorsChange({ ...textColors, textColor: 'gradient' })}
                  className="text-xs"
                >
                  Gradient
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Quote Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColors.quoteColor === 'gradient' ? '#ffffff' : textColors.quoteColor}
                  onChange={(e) => onTextColorsChange({ ...textColors, quoteColor: e.target.value })}
                  className="w-12 h-8 rounded border border-white/30"
                />
                <Button
                  size="sm"
                  variant={textColors.quoteColor === 'gradient' ? 'default' : 'outline'}
                  onClick={() => onTextColorsChange({ ...textColors, quoteColor: 'gradient' })}
                  className="text-xs"
                >
                  Gradient
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Top/Bottom Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColors.topBottomColor === 'gradient' ? '#ffffff' : textColors.topBottomColor}
                  onChange={(e) => onTextColorsChange({ ...textColors, topBottomColor: e.target.value })}
                  className="w-12 h-8 rounded border border-white/30"
                />
                <Button
                  size="sm"
                  variant={textColors.topBottomColor === 'gradient' ? 'default' : 'outline'}
                  onClick={() => onTextColorsChange({ ...textColors, topBottomColor: 'gradient' })}
                  className="text-xs"
                >
                  Gradient
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Background Gradient Height: {gradientHeight}px</Label>
              <Slider
                value={[gradientHeight]}
                onValueChange={([value]) => onGradientHeightChange(value)}
                max={800}
                min={200}
                step={10}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Background Gradient Strength: {gradientStrength}%</Label>
              <Slider
                value={[gradientStrength]}
                onValueChange={([value]) => onGradientStrengthChange(value)}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Inner Gradient Coverage: {gradientInnerHeight}px</Label>
              <Slider
                value={[gradientInnerHeight]}
                onValueChange={([value]) => onGradientInnerHeightChange(value)}
                max={gradientHeight}
                min={50}
                step={10}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Positions Section */}
      {openSections.positions && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Positions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Title Y Position: {textPositions.titleY}px</Label>
              <Slider
                value={[textPositions.titleY]}
                onValueChange={([value]) => onTextPositionsChange({ ...textPositions, titleY: value })}
                max={300}
                min={50}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Text Y Position: {textPositions.textY}px</Label>
              <Slider
                value={[textPositions.textY]}
                onValueChange={([value]) => onTextPositionsChange({ ...textPositions, textY: value })}
                max={600}
                min={200}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Quote Y Position: {textPositions.quoteY}px</Label>
              <Slider
                value={[textPositions.quoteY]}
                onValueChange={([value]) => onTextPositionsChange({ ...textPositions, quoteY: value })}
                max={900}
                min={400}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Main Text Width: {mainTextWidth}px</Label>
              <Slider
                value={[mainTextWidth]}
                onValueChange={([value]) => onMainTextWidthChange(value)}
                max={900}
                min={300}
                step={10}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Additional Icons Y: {additionalIconsY}px</Label>
              <Slider
                value={[additionalIconsY]}
                onValueChange={([value]) => onAdditionalIconsYChange(value)}
                max={1000}
                min={800}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Additional Icons Gap: {additionalIconsGap}px</Label>
              <Slider
                value={[additionalIconsGap]}
                onValueChange={([value]) => onAdditionalIconsGapChange(value)}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Social Links X: {socialLinksPosition.x}px</Label>
              <Slider
                value={[socialLinksPosition.x]}
                onValueChange={([value]) => onSocialLinksPositionChange({ ...socialLinksPosition, x: value })}
                max={1000}
                min={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Social Links Y: {socialLinksPosition.y}px</Label>
              <Slider
                value={[socialLinksPosition.y]}
                onValueChange={([value]) => onSocialLinksPositionChange({ ...socialLinksPosition, y: value })}
                max={1050}
                min={900}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Social Links Gap: {socialLinksGap}px</Label>
              <Slider
                value={[socialLinksGap]}
                onValueChange={([value]) => onSocialLinksGapChange(value)}
                max={100}
                min={20}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Styling Section */}
      {openSections.styling && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Styling Options</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Frame Style</Label>
              <Select
                value={frameStyle}
                onValueChange={(value: typeof frameStyle) => onFrameStyleChange(value)}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Frame</SelectItem>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="elegant">Elegant</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="double">Double Line</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                  <SelectItem value="shadow">Shadow</SelectItem>
                  <SelectItem value="glow">Glow</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="neon">Neon</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="partial-top-right">Partial Top-Right</SelectItem>
                  <SelectItem value="partial-bottom-left">Partial Bottom-Left</SelectItem>
                  <SelectItem value="partial-diagonal">Partial Diagonal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Quote Box Style</Label>
              <Select
                value={quoteBoxStyle}
                onValueChange={(value: 'rectangle' | 'rounded' | 'none') => onQuoteBoxStyleChange(value)}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Box</SelectItem>
                  <SelectItem value="rectangle">Rectangle</SelectItem>
                  <SelectItem value="rounded">Rounded Rectangle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Quote Box Width: {quoteBoxSize.width}px</Label>
                <Slider
                  value={[quoteBoxSize.width]}
                  onValueChange={([value]) => onQuoteBoxSizeChange({ ...quoteBoxSize, width: value })}
                  max={800}
                  min={200}
                  step={10}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Quote Box Height: {quoteBoxSize.height}px</Label>
                <Slider
                  value={[quoteBoxSize.height]}
                  onValueChange={([value]) => onQuoteBoxSizeChange({ ...quoteBoxSize, height: value })}
                  max={300}
                  min={50}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Section */}
      {openSections.settings && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white">Enable Bilingual Text</Label>
              <Switch
                checked={bilingualEnabled}
                onCheckedChange={onBilingualEnabledChange}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Language</Label>
              <Select
                value={language}
                onValueChange={(value: 'amharic' | 'oromic') => onLanguageChange(value)}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amharic">Amharic</SelectItem>
                  <SelectItem value="oromic">Oromic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-white">Social Media Links</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Telegram username"
                  value={socialLinks.telegram}
                  onChange={(e) => onSocialLinksChange({ ...socialLinks, telegram: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
                <Input
                  placeholder="Instagram username"
                  value={socialLinks.instagram}
                  onChange={(e) => onSocialLinksChange({ ...socialLinks, instagram: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
                <Input
                  placeholder="TikTok username"
                  value={socialLinks.tiktok}
                  onChange={(e) => onSocialLinksChange({ ...socialLinks, tiktok: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-white">Additional Icons</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <img src="/lovable-uploads/1f6bc006-c641-4689-8e9e-e9da10e585d8.png" alt="Location" className="w-4 h-4" />
                  <Input
                    placeholder="Place/Location"
                    value={additionalIcons.place}
                    onChange={(e) => onAdditionalIconsChange({ ...additionalIcons, place: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <img src="/lovable-uploads/7475de3f-f477-4f7d-8688-911c55de8ea9.png" alt="Time" className="w-4 h-4" />
                  <Input
                    placeholder="Time"
                    value={additionalIcons.time}
                    onChange={(e) => onAdditionalIconsChange({ ...additionalIcons, time: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <img src="/lovable-uploads/6efc2e61-1d10-4ca2-8a06-0d41a15e2b7d.png" alt="Date" className="w-4 h-4" />
                  <Input
                    placeholder="Date"
                    value={additionalIcons.date}
                    onChange={(e) => onAdditionalIconsChange({ ...additionalIcons, date: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Cropping Section */}
      {openSections.crop && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Image Cropping</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">X Position: {imageCrop.x}px</Label>
              <Slider
                value={[imageCrop.x]}
                onValueChange={([value]) => onImageCropChange({ ...imageCrop, x: value })}
                max={200}
                min={-200}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Y Position: {imageCrop.y}px</Label>
              <Slider
                value={[imageCrop.y]}
                onValueChange={([value]) => onImageCropChange({ ...imageCrop, y: value })}
                max={200}
                min={-200}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-white">Scale: {imageCrop.scale.toFixed(2)}x</Label>
              <Slider
                value={[imageCrop.scale]}
                onValueChange={([value]) => onImageCropChange({ ...imageCrop, scale: value })}
                max={3}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Clipart Section */}
      {openSections.clipart && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Clipart</h3>
            {clipart.image && (
              <Button
                size="sm"
                variant="ghost"
                onClick={removeClipart}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Upload Clipart (PNG)</Label>
              <input
                type="file"
                accept=".png"
                onChange={handleClipartFileUpload}
                className="text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
              />
            </div>

            {clipart.image && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">X Position: {clipart.x}px</Label>
                  <Slider
                    value={[clipart.x]}
                    onValueChange={([value]) => onClipartChange({ ...clipart, x: value })}
                    max={1080}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Y Position: {clipart.y}px</Label>
                  <Slider
                    value={[clipart.y]}
                    onValueChange={([value]) => onClipartChange({ ...clipart, y: value })}
                    max={1080}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Width: {clipart.width}px</Label>
                  <Slider
                    value={[clipart.width]}
                    onValueChange={([value]) => onClipartChange({ ...clipart, width: value })}
                    max={500}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Height: {clipart.height}px</Label>
                  <Slider
                    value={[clipart.height]}
                    onValueChange={([value]) => onClipartChange({ ...clipart, height: value })}
                    max={500}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
