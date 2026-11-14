import React, { useEffect, useCallback, useRef, useState } from 'react';
import { GradientConfig, SimpleGradientConfig } from './GradientControls';
import { templates } from '@/utils/posterTemplates';

interface PosterCanvasProps {
  backgroundImage: string | null;
  title: string;
  mainText: string;
  quotedText: string;
  template: number;
  language: 'amharic' | 'oromic';
  socialLinks: {
    telegram: string;
    instagram: string;
    tiktok: string;
  };
  textPositions: {
    titleY: number;
    textY: number;
    quoteY: number;
  };
  quoteBoxSize: {
    width: number;
    height: number;
  };
  quoteBoxStyle: 'rectangle' | 'rounded' | 'none';
  fonts: {
    titleFont: string;
    textFont: string;
    quoteFont: string;
    topBottomFont: string;
  };
  fontSizes: {
    titleSize: number;
    textSize: number;
    quoteSize: number;
    topBottomSize: number;
  };
  customFonts: {
    titleFont: string | null;
    textFont: string | null;
    quoteFont: string | null;
    topBottomFont: string | null;
  };
  bilingualEnabled: boolean;
  frameStyle: 'none' | 'simple' | 'elegant' | 'bold' | 'rounded' | 'double' | 'dashed' | 'dotted' | 'shadow' | 'glow' | 'vintage' | 'modern' | 'neon' | 'artistic' | 'minimal' | 'partial-top-right' | 'partial-bottom-left' | 'partial-diagonal';
  textColors: {
    titleColor: string;
    textColor: string;
    quoteColor: string;
    topBottomColor: string;
  };
  mainTextWidth: number;
  additionalIcons: {
    place: string;
    time: string;
    date: string;
  };
  additionalIconsY: number;
  socialLinksGap: number;
  imageCrop: {
    x: number;
    y: number;
    scale: number;
  };
  clipart: {
    image: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  additionalIconsGap: number;
  socialLinksPosition: {
    x: number;
    y: number;
  };
  bottomTextPosition: {
    x: number;
    y: number;
  };
  bottomTextSize: number;
  socialLinksSize: number;
  additionalIconsSize: number;
  topTextEnabled: boolean;
  bottomTextEnabled: boolean;
  customBilingualTexts: {
    amharic: { top: string; bottom: string };
    oromic: { top: string; bottom: string };
  };
  socialLinksColor: string;
  gradientConfig: GradientConfig;
  activeCoverId: number | null;
  onCoverMove: (id: number, x: number, y: number) => void;
}

// Preload images once and cache them
const imageCache = new Map<string, HTMLImageElement>();
const pendingImages = new Map<string, Promise<HTMLImageElement>>();

function preloadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    const cached = imageCache.get(src)!;
    if (cached.complete && cached.naturalWidth > 0) {
      return Promise.resolve(cached);
    }
  }
  const pending = pendingImages.get(src);
  if (pending) return pending;
  const request = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      pendingImages.delete(src);
      resolve(img);
    };
    img.onerror = () => {
      pendingImages.delete(src);
      reject(new Error(`Could not load image: ${src.slice(0, 80)}`));
    };
    img.src = src;
  });
  pendingImages.set(src, request);
  return request;
}

const ICON_SOURCES = {
  telegram: '/icons/telegram.png',
  instagram: '/icons/instagram.png',
  tiktok: '/icons/tiktok.png',
  location: '/icons/location.png',
  time: '/icons/time.png',
  date: '/icons/date.png',
};

const PosterCanvas = React.forwardRef<HTMLCanvasElement, PosterCanvasProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconsLoaded, setIconsLoaded] = useState(false);
  const [clipartLoaded, setClipartLoaded] = useState(0);
  const drawVersion = useRef(0);
  const draggingCoverRef = useRef(false);
  const iconsRef = useRef<Record<string, HTMLImageElement>>({});

  // Preload all icons on mount
  useEffect(() => {
    const loadAllIcons = async () => {
      try {
        const entries = Object.entries(ICON_SOURCES);
        const results = await Promise.allSettled(entries.map(([, src]) => preloadImage(src)));
        const icons: Record<string, HTMLImageElement> = {};
        entries.forEach(([key], i) => {
          const result = results[i];
          if (result.status === 'fulfilled') icons[key] = result.value;
        });
        iconsRef.current = icons;
        setIconsLoaded(true);
      } catch (e) {
        console.warn('Some icons failed to load:', e);
        setIconsLoaded(true); // Still continue drawing
      }
    };
    loadAllIcons();
  }, []);

  const createGradientPattern = useCallback((
    ctx: CanvasRenderingContext2D,
    config: SimpleGradientConfig,
    width: number,
    height: number,
    isTop: boolean
  ) => {
    let gradient;
    
    if (config.type === 'radial') {
      const centerX = (config.centerX / 100) * width;
      const centerY = (config.centerY / 100) * config.height;
      const radius = Math.max(width, config.height) * 0.7;
      gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    } else {
      const angleRad = (config.angle * Math.PI) / 180;
      const h = config.height;
      
      let startX, startY, endX, endY;
      
      if (isTop) {
        startX = width / 2 - Math.cos(angleRad) * h / 2;
        startY = Math.sin(angleRad) >= 0 ? 0 : h;
        endX = width / 2 + Math.cos(angleRad) * h / 2;
        endY = Math.sin(angleRad) >= 0 ? h : 0;
      } else {
        // Bottom: flipped direction
        startX = width / 2 - Math.cos(angleRad) * h / 2;
        startY = Math.sin(angleRad) >= 0 ? h : 0;
        endX = width / 2 + Math.cos(angleRad) * h / 2;
        endY = Math.sin(angleRad) >= 0 ? 0 : h;
      }
      
      gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    }
    
    const sortedStops = [...config.stops].sort((a, b) => a.position - b.position);
    
    sortedStops.forEach((stop) => {
      const r = parseInt(stop.color.slice(1, 3), 16);
      const g = parseInt(stop.color.slice(3, 5), 16);
      const b = parseInt(stop.color.slice(5, 7), 16);
      const alpha = (stop.opacity / 100) * (config.intensity / 100);
      gradient.addColorStop(stop.position / 100, `rgba(${r}, ${g}, ${b}, ${alpha})`);
    });
    
    return gradient;
  }, []);

  const drawPoster = useCallback(() => {
    const version = ++drawVersion.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const template = templates[props.template] || templates[1];

    const drawAllElements = (ctx: CanvasRenderingContext2D) => {
      // --- Gradients ---
      if (props.gradientConfig.enabled) {
        ctx.save();

        // Top gradient
        if (props.gradientConfig.top.enabled) {
          const topH = props.gradientConfig.top.height;
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = width;
          tempCanvas.height = topH;
          const tempCtx = tempCanvas.getContext('2d')!;
          tempCtx.fillStyle = createGradientPattern(tempCtx, props.gradientConfig.top, width, topH, true);
          tempCtx.fillRect(0, 0, width, topH);
          ctx.globalCompositeOperation = props.gradientConfig.top.blendMode;
          ctx.drawImage(tempCanvas, 0, 0);
        }

        // Bottom gradient
        if (props.gradientConfig.bottom.enabled) {
          const bottomH = props.gradientConfig.bottom.height;
          const bottomStart = height - bottomH;
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = width;
          tempCanvas.height = bottomH;
          const tempCtx = tempCanvas.getContext('2d')!;
          tempCtx.fillStyle = createGradientPattern(tempCtx, props.gradientConfig.bottom, width, bottomH, false);
          tempCtx.fillRect(0, 0, width, bottomH);
          ctx.globalCompositeOperation = props.gradientConfig.bottom.blendMode;
          ctx.drawImage(tempCanvas, 0, bottomStart);
        }

        ctx.restore();
      }

      // Soft covers sit above the background and below poster text.
      if (props.gradientConfig.enabled) {
        props.gradientConfig.covers.forEach(cover => {
          if (!/^#[0-9a-f]{6}$/i.test(cover.color)) return;
          const radius = Math.max(1, cover.radius);
          const r = parseInt(cover.color.slice(1, 3), 16);
          const g = parseInt(cover.color.slice(3, 5), 16);
          const b = parseInt(cover.color.slice(5, 7), 16);
          const alpha = Math.min(100, Math.max(0, cover.opacity)) / 100;
          const solidUntil = Math.min(0.99, 1 - Math.min(100, Math.max(0, cover.softness)) / 100);
          const gradient = ctx.createRadialGradient(cover.x, cover.y, 0, cover.x, cover.y, radius);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          gradient.addColorStop(solidUntil, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fillRect(cover.x - radius, cover.y - radius, radius * 2, radius * 2);
        });
      }

      // --- Text ---
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const applyTextColor = (colorType: string, text: string, x: number, y: number, font: string, size: number) => {
        ctx.font = `${size}px ${font}`;
        if (colorType === 'gradient') {
          const grad = ctx.createLinearGradient(x - 200, y - size / 2, x + 200, y + size / 2);
          grad.addColorStop(0, template.colors.secondary || '#ffffff');
          grad.addColorStop(1, '#ffffff');
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = colorType;
        }
        ctx.fillText(text, x, y);
      };

      // Title
      applyTextColor(
        props.textColors.titleColor, props.title, width / 2, props.textPositions.titleY,
        props.customFonts.titleFont || props.fonts.titleFont, props.fontSizes.titleSize
      );

      // Main Text with word wrapping and newline support
      const textFont = props.customFonts.textFont || props.fonts.textFont;
      ctx.font = `${props.fontSizes.textSize}px ${textFont}`;
      ctx.fillStyle = props.textColors.textColor;
      ctx.textAlign = 'center';
      
      const lineHeight = props.fontSizes.textSize * 1.4;
      let currentY = props.textPositions.textY;
      
      const paragraphs = props.mainText.split('\n');
      for (const paragraph of paragraphs) {
        if (paragraph.trim() === '') {
          currentY += lineHeight * 0.5;
          continue;
        }
        const words = paragraph.split(' ');
        let line = '';
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > props.mainTextWidth && n > 0) {
            ctx.fillText(line.trim(), width / 2, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line.trim(), width / 2, currentY);
        currentY += lineHeight;
      }

      // Quote box
      if (props.quoteBoxStyle !== 'none') {
        const boxW = props.quoteBoxSize.width;
        const boxH = props.quoteBoxSize.height;
        const bx = (width - boxW) / 2;
        const by = props.textPositions.quoteY - boxH / 2;
        
        ctx.strokeStyle = template.colors.quoteBorder || 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (props.quoteBoxStyle === 'rounded') {
          const r = 15;
          ctx.moveTo(bx + r, by);
          ctx.lineTo(bx + boxW - r, by);
          ctx.quadraticCurveTo(bx + boxW, by, bx + boxW, by + r);
          ctx.lineTo(bx + boxW, by + boxH - r);
          ctx.quadraticCurveTo(bx + boxW, by + boxH, bx + boxW - r, by + boxH);
          ctx.lineTo(bx + r, by + boxH);
          ctx.quadraticCurveTo(bx, by + boxH, bx, by + boxH - r);
          ctx.lineTo(bx, by + r);
          ctx.quadraticCurveTo(bx, by, bx + r, by);
        } else {
          ctx.rect(bx, by, boxW, boxH);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Quoted text
      applyTextColor(
        props.textColors.quoteColor, props.quotedText, width / 2, props.textPositions.quoteY,
        props.customFonts.quoteFont || props.fonts.quoteFont, props.fontSizes.quoteSize
      );

      // Bilingual top text
      if (props.bilingualEnabled && props.topTextEnabled) {
        applyTextColor(
          props.textColors.topBottomColor, props.customBilingualTexts[props.language].top,
          width / 2, 50, props.customFonts.topBottomFont || props.fonts.topBottomFont, props.fontSizes.topBottomSize
        );
      }

      // Bilingual bottom text
      if (props.bilingualEnabled && props.bottomTextEnabled) {
        applyTextColor(
          props.textColors.topBottomColor, props.customBilingualTexts[props.language].bottom,
          props.bottomTextPosition.x, props.bottomTextPosition.y,
          props.customFonts.topBottomFont || props.fonts.topBottomFont, props.bottomTextSize
        );
      }

      // --- Social Links (synchronous with preloaded icons) ---
      const icons = iconsRef.current;
      const iconSize = props.socialLinksSize;
      const gap = props.socialLinksGap;
      const textMargin = 10;
      
      ctx.font = `${iconSize * 0.6}px Arial`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = props.socialLinksColor;

      const socialItems = [
        { icon: icons.telegram, text: props.socialLinks.telegram },
        { icon: icons.instagram, text: props.socialLinks.instagram },
        { icon: icons.tiktok, text: props.socialLinks.tiktok },
      ];

      const itemWidths = socialItems.map(item => iconSize + textMargin + ctx.measureText(item.text).width);
      const totalSocialWidth = itemWidths.reduce((a, b) => a + b, 0) + gap * (socialItems.length - 1);
      let sx = props.socialLinksPosition.x - totalSocialWidth / 2;
      const sy = props.socialLinksPosition.y;

      socialItems.forEach((item, i) => {
        if (item.icon) ctx.drawImage(item.icon, sx, sy - iconSize / 2, iconSize, iconSize);
        ctx.fillStyle = props.socialLinksColor;
        ctx.fillText(item.text, sx + iconSize + textMargin, sy);
        sx += itemWidths[i] + gap;
      });

      // --- Additional Icons (synchronous) ---
      const aiSize = props.additionalIconsSize;
      const aiGap = props.additionalIconsGap;
      const aiY = props.additionalIconsY;
      ctx.font = `${aiSize - 4}px Arial`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      const additionalItems = [
        { icon: icons.location, text: props.additionalIcons.place },
        { icon: icons.time, text: props.additionalIcons.time },
        { icon: icons.date, text: props.additionalIcons.date },
      ];

      const aiItemWidths = additionalItems.map(item => aiSize + textMargin + ctx.measureText(item.text).width);
      const totalAiWidth = aiItemWidths.reduce((a, b) => a + b, 0) + aiGap * (additionalItems.length - 1);
      let ax = (width - totalAiWidth) / 2;

      additionalItems.forEach((item, i) => {
        if (item.icon) ctx.drawImage(item.icon, ax, aiY - aiSize / 2, aiSize, aiSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(item.text, ax + aiSize + textMargin, aiY);
        ax += aiItemWidths[i] + aiGap;
      });

      // --- Clipart ---
      if (props.clipart.image) {
        const clipImg = imageCache.get(props.clipart.image);
        if (clipImg) {
          ctx.drawImage(
            clipImg,
            props.clipart.x - props.clipart.width / 2,
            props.clipart.y - props.clipart.height / 2,
            props.clipart.width,
            props.clipart.height
          );
        }
      }

      // --- Frame ---
      drawFrame(ctx, width, height);
    };

    const drawFrame = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (props.frameStyle === 'none') return;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 5;

      switch (props.frameStyle) {
        case 'simple': ctx.strokeRect(5, 5, w - 10, h - 10); break;
        case 'elegant':
          ctx.setLineDash([20, 10]);
          ctx.strokeRect(5, 5, w - 10, h - 10);
          ctx.setLineDash([]);
          break;
        case 'bold':
          ctx.lineWidth = 10;
          ctx.strokeRect(10, 10, w - 20, h - 20);
          break;
        case 'rounded':
          ctx.lineJoin = 'round'; ctx.lineWidth = 20;
          ctx.strokeRect(10, 10, w - 20, h - 20);
          ctx.lineJoin = 'miter';
          break;
        case 'double':
          ctx.strokeRect(5, 5, w - 10, h - 10);
          ctx.strokeRect(20, 20, w - 40, h - 40);
          break;
        case 'dashed':
          ctx.setLineDash([15, 15]);
          ctx.strokeRect(5, 5, w - 10, h - 10);
          ctx.setLineDash([]);
          break;
        case 'dotted':
          ctx.setLineDash([5, 10]);
          ctx.strokeRect(5, 5, w - 10, h - 10);
          ctx.setLineDash([]);
          break;
        case 'shadow':
          ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 15;
          ctx.shadowOffsetX = 10; ctx.shadowOffsetY = 10;
          ctx.strokeRect(5, 5, w - 10, h - 10);
          ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
          break;
        case 'glow':
          ctx.shadowColor = 'rgba(255,255,255,0.7)'; ctx.shadowBlur = 20;
          ctx.strokeRect(5, 5, w - 10, h - 10);
          ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
          break;
        case 'vintage':
          ctx.lineWidth = 3;
          ctx.strokeRect(15, 15, w - 30, h - 30);
          ctx.strokeRect(5, 5, w - 10, h - 10);
          break;
        case 'modern':
          ctx.lineWidth = 8;
          ctx.strokeRect(25, 5, w - 30, h - 10);
          break;
        case 'neon':
          ctx.shadowColor = '#00ffff'; ctx.shadowBlur = 10;
          ctx.strokeStyle = '#00ffff';
          ctx.strokeRect(5, 5, w - 10, h - 10);
          ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
          break;
        case 'artistic':
          ctx.lineWidth = 4;
          ctx.setLineDash([25, 15]);
          ctx.strokeRect(5, 5, w - 10, h - 10);
          ctx.setLineDash([]);
          break;
        case 'minimal':
          ctx.lineWidth = 2;
          ctx.strokeRect(5, 5, w - 10, h - 10);
          break;
        case 'partial-top-right':
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, 0); ctx.lineTo(w, h); ctx.stroke();
          break;
        case 'partial-bottom-left':
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, h); ctx.lineTo(w, h); ctx.stroke();
          break;
        case 'partial-diagonal':
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, h); ctx.stroke();
          break;
      }
    };

    const renderBackground = (img?: HTMLImageElement) => {
      if (version !== drawVersion.current) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = template.background;
      ctx.fillRect(0, 0, width, height);
      if (img) {
        try {
          const scale = Math.max(width / img.width, height / img.height) * props.imageCrop.scale;
          const imageWidth = img.width * scale;
          const imageHeight = img.height * scale;
          ctx.drawImage(img,
            (width - imageWidth) / 2 + props.imageCrop.x,
            (height - imageHeight) / 2 + props.imageCrop.y,
            imageWidth, imageHeight);
        } catch {
          // Keep the template background if an image cannot be drawn.
        }
      }
      drawAllElements(ctx);
    };

    if (props.backgroundImage) {
      const cached = imageCache.get(props.backgroundImage);
      if (cached) {
        renderBackground(cached);
      } else {
        renderBackground();
        preloadImage(props.backgroundImage).then(renderBackground).catch(() => {});
      }
    } else {
      renderBackground();
    }
  }, [props, createGradientPattern]);

  // Preload clipart image when it changes
  useEffect(() => {
    if (!props.clipart.image || imageCache.has(props.clipart.image)) return;
    let active = true;
    preloadImage(props.clipart.image)
      .then(() => { if (active) setClipartLoaded(value => value + 1); })
      .catch(() => {});
    return () => { active = false; };
  }, [props.clipart.image]);

  // Set up ref forwarding
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && ref) {
      if (typeof ref === 'function') ref(canvas);
      else ref.current = canvas;
    }
  }, [ref]);

  // Draw when props change
  useEffect(() => {
    drawPoster();
  }, [drawPoster, iconsLoaded, clipartLoaded]);

  const activeCover = props.gradientConfig.enabled
    ? props.gradientConfig.covers.find(cover => cover.id === props.activeCoverId)
    : undefined;

  const moveCoverToPointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!activeCover || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.round(Math.max(0, Math.min(1080, ((event.clientX - rect.left) / rect.width) * 1080)));
    const y = Math.round(Math.max(0, Math.min(1080, ((event.clientY - rect.top) / rect.height) * 1080)));
    props.onCoverMove(activeCover.id, x, y);
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Poster preview: ${props.title}`}
        width={1080}
        height={1080}
        className="w-full h-auto border border-white/20 rounded-lg shadow-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      {activeCover && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full border border-dashed border-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.5)]"
            style={{ left: `${activeCover.x / 10.8}%`, top: `${activeCover.y / 10.8}%`, width: `${activeCover.radius / 5.4}%`, aspectRatio: '1', transform: 'translate(-50%, -50%)' }}
          />
          <button
            type="button"
            aria-label="Move selected soft cover"
            title="Drag to position the soft cover. Arrow keys move it precisely."
            className="absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-amber-300 text-slate-950 shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200"
            style={{ left: `${activeCover.x / 10.8}%`, top: `${activeCover.y / 10.8}%`, transform: 'translate(-50%, -50%)', touchAction: 'none' }}
            onPointerDown={event => {
              event.preventDefault();
              draggingCoverRef.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              moveCoverToPointer(event);
            }}
            onPointerMove={event => { if (draggingCoverRef.current) moveCoverToPointer(event); }}
            onPointerUp={() => { draggingCoverRef.current = false; }}
            onPointerCancel={() => { draggingCoverRef.current = false; }}
            onKeyDown={event => {
              const step = event.shiftKey ? 25 : 5;
              const moves: Record<string, [number, number]> = {
                ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step],
              };
              const move = moves[event.key];
              if (!move) return;
              event.preventDefault();
              props.onCoverMove(activeCover.id,
                Math.max(0, Math.min(1080, activeCover.x + move[0])),
                Math.max(0, Math.min(1080, activeCover.y + move[1])));
            }}
          >
            <span aria-hidden="true" className="text-lg font-bold leading-none">+</span>
          </button>
        </>
      )}
    </div>
  );
});

PosterCanvas.displayName = 'PosterCanvas';

export default PosterCanvas;
export type { PosterCanvasProps };
