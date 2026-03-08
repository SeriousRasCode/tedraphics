import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { GradientControls, GradientConfig } from './GradientControls';
import { Type, Move, Palette, Image, Settings, Crop, ImageIcon, Trash2, X } from 'lucide-react';

interface PosterControlsProps {
  language: 'amharic' | 'oromic';
  onLanguageChange: (value: 'amharic' | 'oromic') => void;
  socialLinks: { telegram: string; instagram: string; tiktok: string };
  onSocialLinksChange: (links: { telegram: string; instagram: string; tiktok: string }) => void;
  textPositions: { titleY: number; textY: number; quoteY: number };
  onTextPositionsChange: (positions: { titleY: number; textY: number; quoteY: number }) => void;
  quoteBoxSize: { width: number; height: number };
  onQuoteBoxSizeChange: (size: { width: number; height: number }) => void;
  quoteBoxStyle: 'rectangle' | 'rounded' | 'none';
  onQuoteBoxStyleChange: (style: 'rectangle' | 'rounded' | 'none') => void;
  fonts: { titleFont: string; textFont: string; quoteFont: string; topBottomFont: string };
  onFontsChange: (fonts: { titleFont: string; textFont: string; quoteFont: string; topBottomFont: string }) => void;
  fontSizes: { titleSize: number; textSize: number; quoteSize: number; topBottomSize: number };
  onFontSizesChange: (sizes: { titleSize: number; textSize: number; quoteSize: number; topBottomSize: number }) => void;
  customFonts: { titleFont: string | null; textFont: string | null; quoteFont: string | null; topBottomFont: string | null };
  onCustomFontsChange: (fonts: { titleFont: string | null; textFont: string | null; quoteFont: string | null; topBottomFont: string | null }) => void;
  bilingualEnabled: boolean;
  onBilingualEnabledChange: (enabled: boolean) => void;
  frameStyle: string;
  onFrameStyleChange: (style: any) => void;
  textColors: { titleColor: string; textColor: string; quoteColor: string; topBottomColor: string };
  onTextColorsChange: (colors: { titleColor: string; textColor: string; quoteColor: string; topBottomColor: string }) => void;
  mainTextWidth: number;
  onMainTextWidthChange: (width: number) => void;
  additionalIcons: { place: string; time: string; date: string };
  onAdditionalIconsChange: (icons: { place: string; time: string; date: string }) => void;
  additionalIconsY: number;
  onAdditionalIconsYChange: (y: number) => void;
  socialLinksGap: number;
  onSocialLinksGapChange: (gap: number) => void;
  imageCrop: { x: number; y: number; scale: number };
  onImageCropChange: (crop: { x: number; y: number; scale: number }) => void;
  clipart: { image: string | null; x: number; y: number; width: number; height: number };
  onClipartChange: (clipart: { image: string | null; x: number; y: number; width: number; height: number }) => void;
  onClipartUpload: (file: File) => void;
  additionalIconsGap: number;
  onAdditionalIconsGapChange: (gap: number) => void;
  socialLinksPosition: { x: number; y: number };
  onSocialLinksPositionChange: (position: { x: number; y: number }) => void;
  bottomTextPosition: { x: number; y: number };
  onBottomTextPositionChange: (position: { x: number; y: number }) => void;
  bottomTextSize: number;
  onBottomTextSizeChange: (size: number) => void;
  socialLinksSize: number;
  onSocialLinksSizeChange: (size: number) => void;
  additionalIconsSize: number;
  onAdditionalIconsSizeChange: (size: number) => void;
  topTextEnabled: boolean;
  onTopTextEnabledChange: (enabled: boolean) => void;
  bottomTextEnabled: boolean;
  onBottomTextEnabledChange: (enabled: boolean) => void;
  customBilingualTexts: {
    amharic: { top: string; bottom: string };
    oromic: { top: string; bottom: string };
  };
  onCustomBilingualTextsChange: (texts: {
    amharic: { top: string; bottom: string };
    oromic: { top: string; bottom: string };
  }) => void;
  openSections: { [key: string]: boolean };
  onToggleSection: (section: string) => void;
  socialLinksColor: string;
  onSocialLinksColorChange: (color: string) => void;
  gradientConfig: GradientConfig;
  onGradientConfigChange: (config: GradientConfig) => void;
}

export const PosterControls = (props: PosterControlsProps) => {
  const {
    language, onLanguageChange, socialLinks, onSocialLinksChange,
    textPositions, onTextPositionsChange, quoteBoxSize, onQuoteBoxSizeChange,
    quoteBoxStyle, onQuoteBoxStyleChange, fonts, onFontsChange,
    fontSizes, onFontSizesChange, customFonts, onCustomFontsChange,
    bilingualEnabled, onBilingualEnabledChange, frameStyle, onFrameStyleChange,
    textColors, onTextColorsChange, mainTextWidth, onMainTextWidthChange,
    additionalIcons, onAdditionalIconsChange, additionalIconsY, onAdditionalIconsYChange,
    socialLinksGap, onSocialLinksGapChange, imageCrop, onImageCropChange,
    clipart, onClipartChange, onClipartUpload, additionalIconsGap, onAdditionalIconsGapChange,
    socialLinksPosition, onSocialLinksPositionChange, bottomTextPosition, onBottomTextPositionChange,
    bottomTextSize, onBottomTextSizeChange, socialLinksSize, onSocialLinksSizeChange,
    additionalIconsSize, onAdditionalIconsSizeChange,
    topTextEnabled, onTopTextEnabledChange, bottomTextEnabled, onBottomTextEnabledChange,
    customBilingualTexts, onCustomBilingualTextsChange, openSections, onToggleSection,
    socialLinksColor, onSocialLinksColorChange,
    gradientConfig, onGradientConfigChange
  } = props;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fontType: keyof typeof customFonts) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onCustomFontsChange({ ...customFonts, [fontType]: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClipartFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onClipartUpload(file);
  };

  const removeFontFile = (fontType: keyof typeof customFonts) => {
    onCustomFontsChange({ ...customFonts, [fontType]: null });
  };

  const removeClipart = () => {
    onClipartChange({ ...clipart, image: null });
  };

  const fontOptions = [
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "'Times New Roman', serif", label: "Times New Roman" },
    { value: "'Courier New', monospace", label: "Courier New" },
  ];

  const renderFontSelector = (label: string, fontKey: keyof typeof fonts, fontType: keyof typeof customFonts) => (
    <div className="space-y-2">
      <Label className="text-white">{label}</Label>
      <Select
        value={fonts[fontKey]}
        onValueChange={(value) => onFontsChange({ ...fonts, [fontKey]: value })}
      >
        <SelectTrigger className="bg-white/20 border-white/30 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fontOptions.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-2 items-center">
        <input
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          onChange={(e) => handleFileUpload(e, fontType)}
          className="text-sm text-white/70 flex-1"
        />
        {customFonts[fontType] && (
          <Button size="sm" variant="ghost" onClick={() => removeFontFile(fontType)} className="text-red-400 hover:text-red-300 p-1">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Navigation Bar */}
      <div className="flex flex-wrap gap-2 justify-center border-t border-white/20 pt-4">
        {[
          { key: 'typography', icon: Type, label: 'Typography' },
          { key: 'colors', icon: Palette, label: 'Colors' },
          { key: 'positions', icon: Move, label: 'Positions' },
          { key: 'styling', icon: Image, label: 'Styling' },
          { key: 'settings', icon: Settings, label: 'Settings' },
          { key: 'crop', icon: Crop, label: 'Crop' },
          { key: 'clipart', icon: ImageIcon, label: 'Clipart' },
        ].map(({ key, icon: Icon, label }) => (
          <Button
            key={key}
            variant="ghost" size="sm"
            onClick={() => onToggleSection(key)}
            className={`text-white hover:bg-white/20 ${openSections[key] ? 'bg-white/20' : ''}`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>

      {/* Typography Section */}
      {openSections.typography && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Typography</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderFontSelector('Title Font', 'titleFont', 'titleFont')}
            <div className="space-y-2">
              <Label className="text-white">Title Size: {fontSizes.titleSize}px</Label>
              <Slider value={[fontSizes.titleSize]} onValueChange={([v]) => onFontSizesChange({ ...fontSizes, titleSize: v })} max={120} min={20} step={2} />
            </div>
            {renderFontSelector('Text Font', 'textFont', 'textFont')}
            <div className="space-y-2">
              <Label className="text-white">Text Size: {fontSizes.textSize}px</Label>
              <Slider value={[fontSizes.textSize]} onValueChange={([v]) => onFontSizesChange({ ...fontSizes, textSize: v })} max={60} min={16} step={2} />
            </div>
            {renderFontSelector('Quote Font', 'quoteFont', 'quoteFont')}
            <div className="space-y-2">
              <Label className="text-white">Quote Size: {fontSizes.quoteSize}px</Label>
              <Slider value={[fontSizes.quoteSize]} onValueChange={([v]) => onFontSizesChange({ ...fontSizes, quoteSize: v })} max={50} min={16} step={2} />
            </div>
            {renderFontSelector('Top/Bottom Font', 'topBottomFont', 'topBottomFont')}
            <div className="space-y-2">
              <Label className="text-white">Top/Bottom Size: {fontSizes.topBottomSize}px</Label>
              <Slider value={[fontSizes.topBottomSize]} onValueChange={([v]) => onFontSizesChange({ ...fontSizes, topBottomSize: v })} max={40} min={12} step={2} />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Bottom Text Size: {bottomTextSize}px</Label>
              <Slider value={[bottomTextSize]} onValueChange={([v]) => onBottomTextSizeChange(v)} max={40} min={12} step={2} />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Social Links Size: {socialLinksSize}px</Label>
              <Slider value={[socialLinksSize]} onValueChange={([v]) => onSocialLinksSizeChange(v)} max={40} min={16} step={2} />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Icons Size: {additionalIconsSize}px</Label>
              <Slider value={[additionalIconsSize]} onValueChange={([v]) => onAdditionalIconsSizeChange(v)} max={40} min={16} step={2} />
            </div>
          </div>
        </div>
      )}

      {/* Colors Section */}
      {openSections.colors && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Colors & Gradients</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Title Color', key: 'titleColor' as const },
              { label: 'Main Text Color', key: 'textColor' as const },
              { label: 'Quote Color', key: 'quoteColor' as const },
              { label: 'Top/Bottom Color', key: 'topBottomColor' as const },
            ].map(({ label, key }) => (
              <div key={key} className="space-y-2">
                <Label className="text-white">{label}</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={textColors[key] === 'gradient' ? '#ffffff' : textColors[key]}
                    onChange={(e) => onTextColorsChange({ ...textColors, [key]: e.target.value })}
                    className="w-12 h-8 rounded border border-white/30"
                  />
                  <Button
                    size="sm"
                    variant={textColors[key] === 'gradient' ? 'default' : 'outline'}
                    onClick={() => onTextColorsChange({ ...textColors, [key]: 'gradient' })}
                    className="text-xs"
                  >
                    Gradient
                  </Button>
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <Label className="text-white">Social Links Color</Label>
              <input
                type="color"
                value={socialLinksColor}
                onChange={(e) => onSocialLinksColorChange(e.target.value)}
                className="w-12 h-8 rounded border border-white/30"
              />
            </div>
          </div>

          {/* Background Gradient Controls */}
          <GradientControls
            gradient={gradientConfig}
            onGradientChange={onGradientConfigChange}
          />
        </div>
      )}

      {/* Positions Section */}
      {openSections.positions && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Positions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Title Y', value: textPositions.titleY, onChange: (v: number) => onTextPositionsChange({ ...textPositions, titleY: v }), max: 300, min: 50 },
              { label: 'Text Y', value: textPositions.textY, onChange: (v: number) => onTextPositionsChange({ ...textPositions, textY: v }), max: 600, min: 200 },
              { label: 'Quote Y', value: textPositions.quoteY, onChange: (v: number) => onTextPositionsChange({ ...textPositions, quoteY: v }), max: 900, min: 400 },
              { label: 'Text Width', value: mainTextWidth, onChange: onMainTextWidthChange, max: 900, min: 300 },
              { label: 'Bottom Text X', value: bottomTextPosition.x, onChange: (v: number) => onBottomTextPositionChange({ ...bottomTextPosition, x: v }), max: 1000, min: 100 },
              { label: 'Bottom Text Y', value: bottomTextPosition.y, onChange: (v: number) => onBottomTextPositionChange({ ...bottomTextPosition, y: v }), max: 1070, min: 950 },
              { label: 'Icons Y', value: additionalIconsY, onChange: onAdditionalIconsYChange, max: 1000, min: 800 },
              { label: 'Icons Gap', value: additionalIconsGap, onChange: onAdditionalIconsGapChange, max: 100, min: 10 },
              { label: 'Social Y', value: socialLinksPosition.y, onChange: (v: number) => onSocialLinksPositionChange({ ...socialLinksPosition, y: v }), max: 1050, min: 900 },
              { label: 'Social Gap', value: socialLinksGap, onChange: onSocialLinksGapChange, max: 100, min: 20 },
            ].map(({ label, value, onChange, max, min }) => (
              <div key={label} className="space-y-2">
                <Label className="text-white">{label}: {value}px</Label>
                <Slider value={[value]} onValueChange={([v]) => onChange(v)} max={max} min={min} step={5} />
              </div>
            ))}
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
              <Select value={frameStyle} onValueChange={(value) => onFrameStyleChange(value)}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'none', 'simple', 'elegant', 'bold', 'rounded', 'double', 'dashed', 'dotted',
                    'shadow', 'glow', 'vintage', 'modern', 'neon', 'artistic', 'minimal',
                    'partial-top-right', 'partial-bottom-left', 'partial-diagonal'
                  ].map(style => (
                    <SelectItem key={style} value={style}>
                      {style.charAt(0).toUpperCase() + style.slice(1).replace(/-/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Quote Box Style</Label>
              <Select value={quoteBoxStyle} onValueChange={(value: 'rectangle' | 'rounded' | 'none') => onQuoteBoxStyleChange(value)}>
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
                <Slider value={[quoteBoxSize.width]} onValueChange={([v]) => onQuoteBoxSizeChange({ ...quoteBoxSize, width: v })} max={800} min={200} step={10} />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Quote Box Height: {quoteBoxSize.height}px</Label>
                <Slider value={[quoteBoxSize.height]} onValueChange={([v]) => onQuoteBoxSizeChange({ ...quoteBoxSize, height: v })} max={300} min={50} step={10} />
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
              <Switch checked={bilingualEnabled} onCheckedChange={onBilingualEnabledChange} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-white">Show Top Text</Label>
              <Switch checked={topTextEnabled} onCheckedChange={onTopTextEnabledChange} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-white">Show Bottom Text</Label>
              <Switch checked={bottomTextEnabled} onCheckedChange={onBottomTextEnabledChange} />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Language</Label>
              <Select value={language} onValueChange={(value: 'amharic' | 'oromic') => onLanguageChange(value)}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amharic">Amharic</SelectItem>
                  <SelectItem value="oromic">Oromic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Bilingual Text */}
            <div className="space-y-3">
              <Label className="text-white">Custom Bilingual Texts</Label>
              {(['amharic', 'oromic'] as const).map(lang => (
                <div key={lang} className="space-y-2">
                  <Label className="text-white text-sm capitalize">{lang} Top Text</Label>
                  <Textarea
                    value={customBilingualTexts[lang].top}
                    onChange={(e) => onCustomBilingualTextsChange({
                      ...customBilingualTexts,
                      [lang]: { ...customBilingualTexts[lang], top: e.target.value }
                    })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    rows={2}
                  />
                  <Label className="text-white text-sm capitalize">{lang} Bottom Text</Label>
                  <Textarea
                    value={customBilingualTexts[lang].bottom}
                    onChange={(e) => onCustomBilingualTextsChange({
                      ...customBilingualTexts,
                      [lang]: { ...customBilingualTexts[lang], bottom: e.target.value }
                    })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    rows={2}
                  />
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
              <Label className="text-white">Social Media Links</Label>
              <div className="space-y-2">
                <Input placeholder="Telegram" value={socialLinks.telegram} onChange={(e) => onSocialLinksChange({ ...socialLinks, telegram: e.target.value })} className="bg-white/20 border-white/30 text-white placeholder:text-white/70" />
                <Input placeholder="Instagram" value={socialLinks.instagram} onChange={(e) => onSocialLinksChange({ ...socialLinks, instagram: e.target.value })} className="bg-white/20 border-white/30 text-white placeholder:text-white/70" />
                <Input placeholder="TikTok" value={socialLinks.tiktok} onChange={(e) => onSocialLinksChange({ ...socialLinks, tiktok: e.target.value })} className="bg-white/20 border-white/30 text-white placeholder:text-white/70" />
              </div>
            </div>

            {/* Additional Icons */}
            <div className="space-y-3">
              <Label className="text-white">Additional Icons</Label>
              <div className="space-y-2">
                {[
                  { key: 'place' as const, icon: '/lovable-uploads/1f6bc006-c641-4689-8e9e-e9da10e585d8.png', label: 'Place' },
                  { key: 'time' as const, icon: '/lovable-uploads/7475de3f-f477-4f7d-8688-911c55de8ea9.png', label: 'Time' },
                  { key: 'date' as const, icon: '/lovable-uploads/6efc2e61-1d10-4ca2-8a06-0d41a15e2b7d.png', label: 'Date' },
                ].map(({ key, icon, label }) => (
                  <div key={key} className="flex items-center gap-2">
                    <img src={icon} alt={label} className="w-4 h-4" />
                    <Input
                      placeholder={label}
                      value={additionalIcons[key]}
                      onChange={(e) => onAdditionalIconsChange({ ...additionalIcons, [key]: e.target.value })}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crop Section */}
      {openSections.crop && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3">Image Cropping</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">X Offset: {imageCrop.x}</Label>
              <Slider value={[imageCrop.x]} onValueChange={([v]) => onImageCropChange({ ...imageCrop, x: v })} max={200} min={-200} step={5} />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Y Offset: {imageCrop.y}</Label>
              <Slider value={[imageCrop.y]} onValueChange={([v]) => onImageCropChange({ ...imageCrop, y: v })} max={200} min={-200} step={5} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-white">Scale: {imageCrop.scale.toFixed(2)}x</Label>
              <Slider value={[imageCrop.scale]} onValueChange={([v]) => onImageCropChange({ ...imageCrop, scale: v })} max={3} min={0.5} step={0.1} />
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
              <Button size="sm" variant="ghost" onClick={removeClipart} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                <Trash2 className="w-4 h-4 mr-1" /> Remove
              </Button>
            )}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Upload Clipart (PNG)</Label>
              <input
                type="file" accept=".png"
                onChange={handleClipartFileUpload}
                className="text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
              />
            </div>
            {clipart.image && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'X', value: clipart.x, key: 'x', max: 1080 },
                  { label: 'Y', value: clipart.y, key: 'y', max: 1080 },
                  { label: 'Width', value: clipart.width, key: 'width', max: 500 },
                  { label: 'Height', value: clipart.height, key: 'height', max: 500 },
                ].map(({ label, value, key, max }) => (
                  <div key={key} className="space-y-2">
                    <Label className="text-white">{label}: {value}px</Label>
                    <Slider
                      value={[value]}
                      onValueChange={([v]) => onClipartChange({ ...clipart, [key]: v })}
                      max={max} min={key === 'width' || key === 'height' ? 20 : 0} step={5}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
