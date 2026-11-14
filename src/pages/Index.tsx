import React, { useState, useRef } from 'react';
import PosterCanvas from '@/components/PosterCanvas';
import { TemplateSelector } from '@/components/TemplateSelector';
import { PosterControls } from '@/components/PosterControls';
import { ImageUpload } from '@/components/ImageUpload';
import { toast } from 'sonner';
import { HeaderSection } from '@/components/HeaderSection';
import { GradientControls, GradientConfig } from '@/components/GradientControls';
import { ActionButtons } from '@/components/ActionButtons';
import { Button } from '@/components/ui/button';
import { Settings, FileText, ArrowRight } from 'lucide-react';
import { templates } from '@/utils/posterTemplates';

const Index = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [activeEditorSection, setActiveEditorSection] = useState<'content' | 'design'>('content');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [title, setTitle] = useState('Your Title Here');
  const [mainText, setMainText] = useState('Main content goes here.');
  const [quotedText, setQuotedText] = useState('Special message');
  const [selectedTemplate, setSelectedTemplate] = useState(1);
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
  const [quoteBoxSize, setQuoteBoxSize] = useState({ width: 600, height: 150 });
  const [quoteBoxStyle, setQuoteBoxStyle] = useState<'rectangle' | 'rounded' | 'none'>('rounded');
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
  const [frameStyle, setFrameStyle] = useState<'none' | 'simple' | 'elegant' | 'bold' | 'rounded' | 'double' | 'dashed' | 'dotted' | 'shadow' | 'glow' | 'vintage' | 'modern' | 'neon' | 'artistic' | 'minimal' | 'partial-top-right' | 'partial-bottom-left' | 'partial-diagonal'>('none');
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
  const [additionalIconsY, setAdditionalIconsY] = useState(940);
  const [socialLinksGap, setSocialLinksGap] = useState(50);
  const [imageCrop, setImageCrop] = useState({ x: 0, y: 0, scale: 1 });
  const [clipart, setClipart] = useState({
    image: null as string | null,
    x: 540, y: 540, width: 100, height: 100
  });
  const [socialLinksColor, setSocialLinksColor] = useState('#ffffff');
  const [selectedCoverId, setSelectedCoverId] = useState<number | null>(null);
  const [gradientConfig, setGradientConfig] = useState<GradientConfig>({
    enabled: true,
    covers: [],
    top: {
      enabled: true,
      height: 200,
      stops: [
        { color: '#083765', opacity: 80, position: 0 },
        { color: '#1e40af', opacity: 40, position: 100 }
      ],
      type: 'linear',
      angle: 180,
      centerX: 50,
      centerY: 50,
      blendMode: 'source-over' as GlobalCompositeOperation,
      intensity: 100
    },
    bottom: {
      enabled: true,
      height: 200,
      stops: [
        { color: '#1e40af', opacity: 60, position: 0 },
        { color: '#083765', opacity: 90, position: 100 }
      ],
      type: 'linear',
      angle: 0,
      centerX: 50,
      centerY: 50,
      blendMode: 'source-over' as GlobalCompositeOperation,
      intensity: 100
    }
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coverIdRef = useRef(0);
  const backgroundStepRef = useRef<HTMLButtonElement>(null);

  const [additionalIconsGap, setAdditionalIconsGap] = useState(30);
  const [socialLinksPosition, setSocialLinksPosition] = useState({ x: 540, y: 1030 });
  const [bottomTextPosition, setBottomTextPosition] = useState({ x: 540, y: 975 });
  const [bottomTextSize, setBottomTextSize] = useState(24);
  const [socialLinksSize, setSocialLinksSize] = useState(28);
  const [additionalIconsSize, setAdditionalIconsSize] = useState(28);
  const [topTextEnabled, setTopTextEnabled] = useState(true);
  const [bottomTextEnabled, setBottomTextEnabled] = useState(true);
  const [customBilingualTexts, setCustomBilingualTexts] = useState({
    amharic: {
      top: 'በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ አሜን',
      bottom: 'የጅማ ዩንቨርስቲ ቴክኖሎጂ ኢንስቲትዩት ግቢ ጉባኤ'
    },
    oromic: {
      top: 'Maqaa Abbaa kan ilmaa kan afuura qulqulluu waaqa tokko ameen',
      bottom: 'Yaa\'ii Mooraa Inistiitiyuutii Teeknooloojii Yuunivarsiitii Jimmaa'
    }
  });

  const toggleSection = (section: string) => {
    setOpenSections(previous => ({ ...previous, [section]: !previous[section] }));
  };

  const handleCoverMove = (id: number, x: number, y: number) => {
    setGradientConfig(previous => {
      const current = previous.covers.find(cover => cover.id === id);
      if (!current || (current.x === x && current.y === y)) return previous;
      return {
        ...previous,
        covers: previous.covers.map(cover => cover.id === id ? { ...cover, x, y } : cover),
      };
    });
  };

  const addSoftCover = (color: string, opacity: number, softness: number) => {
    const id = ++coverIdRef.current;
    setGradientConfig(previous => ({
      ...previous,
      enabled: true,
      covers: [...previous.covers, { id, x: 540, y: 540, radius: 260, color, opacity, softness }],
    }));
    setSelectedCoverId(id);
    setActiveEditorSection('design');
  };

  const handleTemplateChange = (templateId: number) => {
    const template = templates[templateId];
    if (!template) return;
    setSelectedTemplate(templateId);
    setGradientConfig(previous => ({
      ...previous,
      top: {
        ...previous.top,
        stops: [
          { color: template.gradients.top.color1, opacity: template.gradients.top.opacity1, position: 0 },
          { color: template.gradients.top.color2, opacity: template.gradients.top.opacity2, position: 100 },
        ],
      },
      bottom: {
        ...previous.bottom,
        stops: [
          { color: template.gradients.bottom.color1, opacity: template.gradients.bottom.opacity1, position: 0 },
          { color: template.gradients.bottom.color2, opacity: template.gradients.bottom.opacity2, position: 100 },
        ],
      },
    }));
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBackgroundImage(e.target?.result as string);
      toast.success('Background image uploaded!');
    };
    reader.readAsDataURL(file);
  };

  const handleClipartUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setClipart(prev => ({ ...prev, image: e.target?.result as string }));
      toast.success('Clipart uploaded!');
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    try {
      const url = canvasRef.current.toDataURL('image/png');
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.open(url, '_blank');
        toast.success('Poster opened — long press to save');
      } else {
        const link = document.createElement('a');
        link.download = 'tedraphics-poster.png';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Poster downloaded!');
      }
    } catch {
      toast.error('Download failed — please try again');
    }
  };

  const handleTelegramShare = async () => {
    if (!canvasRef.current) return;
    if (window.Telegram && window.Telegram.WebApp) {
      canvasRef.current.toBlob(blob => {
        if (!blob) return;
        const reader = new FileReader();
        reader.onload = () => {
          window.Telegram!.WebApp.sendData(JSON.stringify({
            type: 'share_poster',
            image: reader.result
          }));
        };
        reader.readAsDataURL(blob);
      }, 'image/png');
      toast.success('Poster shared to Telegram!');
    } else {
      toast.error('This feature is only available in Telegram Mini App');
    }
  };

  return (
    <div className="min-h-screen bg-[#071629] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
        <HeaderSection />

        <main className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)] lg:items-start lg:gap-8">
          
          {/* Preview */}
          <section aria-labelledby="preview-title" className="order-1 rounded-3xl border border-white/10 bg-[#10243d] p-4 shadow-2xl shadow-black/20 sm:p-6 lg:order-2 lg:sticky lg:top-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id="preview-title" className="text-xl font-semibold tracking-tight sm:text-2xl">Your poster</h2>
                <p className="mt-1 text-sm text-slate-300">Edits appear here as you make them.</p>
              </div>
              <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">Live preview</span>
            </div>
            <div className="flex justify-center">
              <PosterCanvas
                ref={canvasRef}
                backgroundImage={backgroundImage}
                title={title}
                mainText={mainText}
                quotedText={quotedText}
                template={selectedTemplate}
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
                imageCrop={imageCrop}
                clipart={clipart}
                additionalIconsGap={additionalIconsGap}
                socialLinksPosition={socialLinksPosition}
                bottomTextPosition={bottomTextPosition}
                bottomTextSize={bottomTextSize}
                socialLinksSize={socialLinksSize}
                additionalIconsSize={additionalIconsSize}
                topTextEnabled={topTextEnabled}
                bottomTextEnabled={bottomTextEnabled}
                customBilingualTexts={customBilingualTexts}
                socialLinksColor={socialLinksColor}
                gradientConfig={gradientConfig}
                activeCoverId={activeEditorSection === 'design' ? selectedCoverId : null}
                onCoverMove={handleCoverMove}
              />
            </div>
            <ActionButtons
              onDownload={handleDownload}
              onAddCover={() => addSoftCover('#0f172a', 85, 70)}
              onTelegramShare={handleTelegramShare}
              hideTelegramShare={true}
            />
          </section>

          {/* Controls */}
          <section aria-labelledby="editor-title" className="order-2 min-w-0 space-y-5 lg:order-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Create</p>
              <h2 id="editor-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Make it yours</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Add your message, choose a look, then fine tune the details.</p>
            </div>
            
            {/* Top-level sections */}
            <div role="group" aria-label="Editor steps" className="grid grid-cols-2 rounded-2xl border border-white/10 bg-white/5 p-1.5">
              <Button
                aria-pressed={activeEditorSection === 'content'} id="content-tab"
                variant="ghost"
                onClick={() => setActiveEditorSection('content')}
                className={`h-11 rounded-xl text-sm font-semibold text-white hover:bg-white/10 hover:text-white ${activeEditorSection === 'content' ? 'bg-white/15 shadow-sm' : ''}`}
              >
                <FileText className="mr-2 h-4 w-4" />
                1. Content
              </Button>
              <Button
                ref={backgroundStepRef}
                aria-pressed={activeEditorSection === 'design'} id="design-tab"
                variant="ghost"
                onClick={() => setActiveEditorSection('design')}
                className={`h-11 rounded-xl text-sm font-semibold text-white hover:bg-white/10 hover:text-white ${activeEditorSection === 'design' ? 'bg-white/15 shadow-sm' : ''}`}
              >
                <Settings className="mr-2 h-4 w-4" />
                2. Background
              </Button>
            </div>

            {/* Design Settings */}
            {activeEditorSection === 'design' && (
              <div id="design-panel" role="region" aria-labelledby="design-tab" className="rounded-2xl border border-white/10 bg-[#10243d] p-4 sm:p-6">
                <h3 className="mb-1 text-lg font-semibold text-white">Choose a background</h3>
                <p className="mb-5 text-sm text-slate-300">Choose a theme, add an image, or soften an area with a gradient cover.</p>
                <div className="space-y-4">
                  <TemplateSelector 
                    selectedTemplate={selectedTemplate}
                    onTemplateChange={handleTemplateChange}
                  />
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    hasImage={Boolean(backgroundImage)}
                    onRemove={() => {
                      setBackgroundImage(null);
                      setImageCrop({ x: 0, y: 0, scale: 1 });
                    }}
                  />
                  <GradientControls
                    gradient={gradientConfig}
                    onGradientChange={setGradientConfig}
                    themeColor={templates[selectedTemplate].gradients.top.color1}
                    selectedCoverId={selectedCoverId}
                    onSelectedCoverChange={setSelectedCoverId}
                    onAddCover={addSoftCover}
                  />
                </div>
              </div>
            )}

            {/* Content & Style */}
            {activeEditorSection === 'content' && (
              <div id="content-panel" role="region" aria-labelledby="content-tab" className="rounded-2xl border border-white/10 bg-[#10243d] p-4 sm:p-6">
                <h3 className="mb-1 text-lg font-semibold text-white">Write your message</h3>
                <p className="mb-5 text-sm text-slate-300">The preview updates while you type.</p>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-white text-sm font-medium">Title</label>
                      <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="min-h-11 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        placeholder="Enter poster title"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="mainText" className="text-white text-sm font-medium">Main Text</label>
                      <textarea
                        id="mainText"
                        value={mainText}
                        onChange={(e) => setMainText(e.target.value)}
                        className="min-h-[112px] w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        placeholder="Enter main content (supports line breaks)"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="quotedText" className="text-white text-sm font-medium">Quoted Text</label>
                      <textarea
                        id="quotedText"
                        value={quotedText}
                        onChange={(e) => setQuotedText(e.target.value)}
                        className="min-h-[80px] w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        placeholder="Enter quoted text"
                      />
                    </div>
                  </div>
                  <Button type="button" onClick={() => {
                    setActiveEditorSection('design');
                    requestAnimationFrame(() => backgroundStepRef.current?.focus());
                  }} className="h-11 w-full rounded-xl bg-amber-300 font-semibold text-slate-950 hover:bg-amber-200 sm:w-auto">
                    Next: choose background <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-[#10243d] p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Fine tune</h3>
                <p className="mt-1 text-sm text-slate-300">Adjust type, colors, layout, and extras.</p>
              </div>
            <PosterControls
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
              imageCrop={imageCrop}
              onImageCropChange={setImageCrop}
              clipart={clipart}
              onClipartChange={setClipart}
              onClipartUpload={handleClipartUpload}
              additionalIconsGap={additionalIconsGap}
              onAdditionalIconsGapChange={setAdditionalIconsGap}
              socialLinksPosition={socialLinksPosition}
              onSocialLinksPositionChange={setSocialLinksPosition}
              bottomTextPosition={bottomTextPosition}
              onBottomTextPositionChange={setBottomTextPosition}
              bottomTextSize={bottomTextSize}
              onBottomTextSizeChange={setBottomTextSize}
              socialLinksSize={socialLinksSize}
              onSocialLinksSizeChange={setSocialLinksSize}
              additionalIconsSize={additionalIconsSize}
              onAdditionalIconsSizeChange={setAdditionalIconsSize}
              topTextEnabled={topTextEnabled}
              onTopTextEnabledChange={setTopTextEnabled}
              bottomTextEnabled={bottomTextEnabled}
              onBottomTextEnabledChange={setBottomTextEnabled}
              customBilingualTexts={customBilingualTexts}
              onCustomBilingualTextsChange={setCustomBilingualTexts}
              openSections={openSections}
              onToggleSection={toggleSection}
              socialLinksColor={socialLinksColor}
              onSocialLinksColorChange={setSocialLinksColor}
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
            />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
