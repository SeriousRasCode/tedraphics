import React, { useState, useRef } from 'react';
import PosterCanvas from '@/components/PosterCanvas';
import { TemplateSelector } from '@/components/TemplateSelector';
import { PosterControls } from '@/components/PosterControls';
import { ImageUpload } from '@/components/ImageUpload';
import { toast } from 'sonner';
import { HeaderSection } from '@/components/HeaderSection';
import { GradientControls, GradientConfig, LinearOverlay } from '@/components/GradientControls';
import { ActionButtons } from '@/components/ActionButtons';
import { Button } from '@/components/ui/button';
import { Type, Image as ImageIcon, Blend, SlidersHorizontal, Download } from 'lucide-react';
import { templates } from '@/utils/posterTemplates';

const Index = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [title, setTitle] = useState('Your Title Here');
  const [mainText, setMainText] = useState('Main content goes here.');
  const [quotedText, setQuotedText] = useState('Special message');
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [language, setLanguage] = useState<'amharic' | 'oromic'>('amharic');
  const [socialLinks, setSocialLinks] = useState({
    telegram: '',
    instagram: '',
    tiktok: ''
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
  const [bilingualEnabled, setBilingualEnabled] = useState(false);
  const [frameStyle, setFrameStyle] = useState<'none' | 'simple' | 'elegant' | 'bold' | 'rounded' | 'double' | 'dashed' | 'dotted' | 'shadow' | 'glow' | 'vintage' | 'modern' | 'neon' | 'artistic' | 'minimal' | 'partial-top-right' | 'partial-bottom-left' | 'partial-diagonal'>('none');
  const [textColors, setTextColors] = useState({
    titleColor: 'gradient',
    textColor: '#ffffff',
    quoteColor: 'gradient',
    topBottomColor: 'gradient'
  });
  const [mainTextWidth, setMainTextWidth] = useState(700);
  const [additionalIcons, setAdditionalIcons] = useState({
    place: '',
    time: '',
    date: ''
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
  const [selectedLinearId, setSelectedLinearId] = useState<number | null>(null);
  const [gradientConfig, setGradientConfig] = useState<GradientConfig>({
    enabled: true,
    covers: [],
    linearOverlays: [],
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
  const linearIdRef = useRef(0);
  const moreOptionsRef = useRef<HTMLDetailsElement>(null);

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

  const showPosterOnMobile = () => {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      requestAnimationFrame(() => document.getElementById('preview-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
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
    setSelectedLinearId(null);
    showPosterOnMobile();
  };

  const addLinearOverlay = (initial?: Partial<LinearOverlay>) => {
    const id = ++linearIdRef.current;
    setGradientConfig(previous => ({
      ...previous,
      enabled: true,
      linearOverlays: [...previous.linearOverlays, {
        startX: 540, startY: 90, endX: 540, endY: 500,
        color: templates[selectedTemplate].gradients.top.color1, opacity: 90, enabled: true,
        ...initial, id,
      }],
    }));
    setSelectedLinearId(id);
    setSelectedCoverId(null);
    showPosterOnMobile();
  };

  const addPhotoFades = () => {
    const topId = ++linearIdRef.current;
    const bottomId = ++linearIdRef.current;
    const color = templates[selectedTemplate].gradients.top.color1;
    setGradientConfig(previous => ({
      ...previous, enabled: true,
      top: { ...previous.top, enabled: false },
      bottom: { ...previous.bottom, enabled: false },
      linearOverlays: [
        ...previous.linearOverlays,
        { id: topId, startX: 540, startY: 90, endX: 540, endY: 390, color, opacity: 95, enabled: true },
        { id: bottomId, startX: 540, startY: 990, endX: 540, endY: 680, color, opacity: 95, enabled: true },
      ],
    }));
    setSelectedLinearId(topId);
    setSelectedCoverId(null);
    showPosterOnMobile();
  };

  const handleLinearMove = (id: number, end: 'start' | 'end', x: number, y: number) => {
    setGradientConfig(previous => ({
      ...previous,
      linearOverlays: previous.linearOverlays.map(layer => layer.id === id
        ? { ...layer, [end === 'start' ? 'startX' : 'endX']: x, [end === 'start' ? 'startY' : 'endY']: y }
        : layer),
    }));
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
      <div className="mx-auto max-w-[1680px] px-4 pb-28 pt-5 sm:px-6 sm:pt-8 lg:px-10 lg:pb-8">
        <HeaderSection />

        <main className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-6">
          
          {/* Preview */}
          <section aria-labelledby="preview-title" className="order-1 rounded-3xl border border-white/10 bg-[#10243d] p-4 shadow-2xl shadow-black/20 sm:p-6 lg:sticky lg:top-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id="preview-title" className="text-xl font-semibold tracking-tight sm:text-2xl">Preview</h2>
              </div>
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
                activeCoverId={selectedCoverId}
                onCoverMove={handleCoverMove}
                activeLinearId={selectedLinearId}
                onLinearMove={handleLinearMove}
              />
            </div>
            <ActionButtons
              onDownload={handleDownload}
              onTelegramShare={handleTelegramShare}
              hideTelegramShare={true}
            />
          </section>

          {/* Controls */}
          <section aria-label="Poster editor" className="order-2 min-w-0 space-y-5">
              <div id="message-panel" className="scroll-mt-4 rounded-2xl border border-white/10 bg-[#10243d] p-4 sm:p-6">
                <h3 className="mb-1 text-lg font-semibold text-white">1. Your message</h3>
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
                      <label htmlFor="mainText" className="text-white text-sm font-medium">Details</label>
                      <textarea
                        id="mainText"
                        value={mainText}
                        onChange={(e) => setMainText(e.target.value)}
                        className="min-h-[112px] w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        placeholder="Enter main content (supports line breaks)"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="quotedText" className="text-white text-sm font-medium">Highlight</label>
                      <textarea
                        id="quotedText"
                        value={quotedText}
                        onChange={(e) => setQuotedText(e.target.value)}
                        className="min-h-[80px] w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        placeholder="Enter quoted text"
                      />
                    </div>
                  </div>
                </div>
              </div>

            <div id="background-panel" className="scroll-mt-4 rounded-2xl border border-white/10 bg-[#10243d] p-4 sm:p-6">
              <h3 className="mb-1 text-lg font-semibold text-white">2. Background</h3>
              <p className="mb-5 text-sm text-slate-300">Pick a color or add your photo.</p>
              <div className="space-y-4">
                <TemplateSelector selectedTemplate={selectedTemplate} onTemplateChange={handleTemplateChange} />
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
                  hasImage={Boolean(backgroundImage)}
                  selectedCoverId={selectedCoverId}
                  onSelectedCoverChange={id => { setSelectedCoverId(id); if (id !== null) setSelectedLinearId(null); }}
                  onAddCover={addSoftCover}
                  selectedLinearId={selectedLinearId}
                  onSelectedLinearChange={id => { setSelectedLinearId(id); if (id !== null) setSelectedCoverId(null); }}
                  onAddLinear={addLinearOverlay}
                  onAddPhotoFades={addPhotoFades}
                />
              </div>
            </div>

            <details ref={moreOptionsRef} id="more-options" className="scroll-mt-4 rounded-2xl border border-white/10 bg-[#10243d] p-4 sm:p-6">
              <summary className="cursor-pointer rounded-lg text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">More options</summary>
              <p className="mb-5 mt-2 text-sm text-slate-300">Fonts, layout, icons, and extra text.</p>
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
            </details>
          </section>
        </main>
      </div>
      <nav aria-label="Mobile editor tools" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-white/15 bg-[#10243d]/95 px-2 py-2 shadow-2xl shadow-black/40 backdrop-blur lg:hidden" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        {[
          { label: 'Text', icon: Type, id: 'message-panel' },
          { label: 'Image', icon: ImageIcon, id: 'background-panel' },
          { label: 'Gradients', icon: Blend, id: 'gradient-tools' },
          { label: 'More', icon: SlidersHorizontal, id: 'more-options' },
        ].map(tool => (
          <Button key={tool.id} type="button" variant="ghost" onClick={() => {
            if (tool.id === 'more-options' && moreOptionsRef.current) moreOptionsRef.current.open = true;
            document.getElementById(tool.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }} className="h-14 flex-col gap-1 rounded-lg px-1 text-xs text-white hover:bg-white/10 hover:text-white">
            <tool.icon className="h-5 w-5" aria-hidden="true" />{tool.label}
          </Button>
        ))}
        <Button type="button" variant="ghost" onClick={handleDownload} className="h-14 flex-col gap-1 rounded-lg px-1 text-xs font-semibold text-amber-300 hover:bg-white/10 hover:text-amber-200">
          <Download className="h-5 w-5" aria-hidden="true" />Save
        </Button>
      </nav>
    </div>
  );
};

export default Index;
