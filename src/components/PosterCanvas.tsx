import React, { useEffect, useCallback, useRef } from 'react';
import { GradientConfig } from './GradientControls';

interface PosterCanvasProps {
  backgroundImage: string | null;
  title: string;
  mainText: string;
  quotedText: string;
  template: number;
  gradientHeight: number;
  gradientStrength: number;
  gradientInnerHeight: number;
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
    amharic: {
      top: string;
      bottom: string;
    };
    oromic: {
      top: string;
      bottom: string;
    };
  };
  socialLinksColor: string;
  gradientAngle: number;
  gradientConfig: GradientConfig;
}

const PosterCanvas = React.forwardRef<HTMLCanvasElement, PosterCanvasProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGradient = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!props.gradientConfig.enabled) return;

    const { type, direction, angle, height: gradientHeight, stops } = props.gradientConfig;
    
    let gradient: CanvasGradient;
    
    if (type === 'linear') {
      if (direction === 'center') {
        // For center direction, apply opacity to top and bottom to reveal the middle
        const centerY = height / 2;
        const gradientSpan = Math.min(gradientHeight, height / 2);
        
        // Create top gradient
        const topGradient = ctx.createLinearGradient(0, 0, 0, gradientSpan);
        stops.forEach(stop => {
          const color = `rgba(${parseInt(stop.color.slice(1, 3), 16)}, ${parseInt(stop.color.slice(3, 5), 16)}, ${parseInt(stop.color.slice(5, 7), 16)}, ${stop.opacity / 100})`;
          topGradient.addColorStop(stop.position / 100, color);
        });
        
        // Create bottom gradient
        const bottomGradient = ctx.createLinearGradient(0, height - gradientSpan, 0, height);
        stops.forEach(stop => {
          const color = `rgba(${parseInt(stop.color.slice(1, 3), 16)}, ${parseInt(stop.color.slice(3, 5), 16)}, ${parseInt(stop.color.slice(5, 7), 16)}, ${stop.opacity / 100})`;
          bottomGradient.addColorStop(stop.position / 100, color);
        });
        
        ctx.fillStyle = topGradient;
        ctx.fillRect(0, 0, width, gradientSpan);
        
        ctx.fillStyle = bottomGradient;
        ctx.fillRect(0, height - gradientSpan, width, gradientSpan);
        
        return;
      } else {
        const angleRad = (angle * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const gradientLength = Math.min(gradientHeight, height);
        
        let x0, y0, x1, y1;
        
        switch (direction) {
          case 'top':
            x0 = width / 2;
            y0 = 0;
            x1 = width / 2 + cos * gradientLength;
            y1 = sin * gradientLength;
            break;
          case 'bottom':
            x0 = width / 2;
            y0 = height;
            x1 = width / 2 + cos * gradientLength;
            y1 = height - sin * gradientLength;
            break;
          case 'both':
            x0 = width / 2 - cos * gradientLength / 2;
            y0 = height / 2 - sin * gradientLength / 2;
            x1 = width / 2 + cos * gradientLength / 2;
            y1 = height / 2 + sin * gradientLength / 2;
            break;
          default:
            x0 = 0;
            y0 = 0;
            x1 = width;
            y1 = 0;
        }
        
        gradient = ctx.createLinearGradient(x0, y0, x1, y1);
      }
    } else {
      // Radial gradient
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(gradientHeight, Math.min(width, height) / 2);
      
      gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    }
    
    if (direction !== 'center') {
      stops.forEach(stop => {
        const color = `rgba(${parseInt(stop.color.slice(1, 3), 16)}, ${parseInt(stop.color.slice(3, 5), 16)}, ${parseInt(stop.color.slice(5, 7), 16)}, ${stop.opacity / 100})`;
        gradient.addColorStop(stop.position / 100, color);
      });
      
      ctx.fillStyle = gradient;
      
      if (direction === 'top') {
        ctx.fillRect(0, 0, width, Math.min(gradientHeight, height));
      } else if (direction === 'bottom') {
        ctx.fillRect(0, Math.max(0, height - gradientHeight), width, Math.min(gradientHeight, height));
      } else {
        ctx.fillRect(0, 0, width, height);
      }
    }
  }, [props.gradientConfig]);

  const drawText = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const applyTextColor = (colorType: string, text: string, x: number, y: number, font: string, size: number) => {
      ctx.font = `${size}px ${font}`;
      if (colorType === 'gradient') {
        const gradient = ctx.createLinearGradient(x - props.mainTextWidth / 2, y - size / 2, x + props.mainTextWidth / 2, y + size / 2);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#a1a1aa');
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = colorType;
      }
      ctx.fillText(text, x, y);
    };

    // Title
    applyTextColor(props.textColors.titleColor, props.title, width / 2, props.textPositions.titleY, props.customFonts.titleFont || props.fonts.titleFont, props.fontSizes.titleSize);

    // Main Text with word wrapping
    const words = props.mainText.split(' ');
    let line = '';
    let y = props.textPositions.textY;
    const lineHeight = props.fontSizes.textSize * 1.2;
    
    ctx.font = `${props.fontSizes.textSize}px ${props.customFonts.textFont || props.fonts.textFont}`;
    ctx.fillStyle = props.textColors.textColor;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > props.mainTextWidth && n > 0) {
        ctx.fillText(line, width / 2, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width / 2, y);

    // Quoted Text
    applyTextColor(props.textColors.quoteColor, props.quotedText, width / 2, props.textPositions.quoteY, props.customFonts.quoteFont || props.fonts.quoteFont, props.fontSizes.quoteSize);

    // Bilingual Text (Top)
    if (props.bilingualEnabled && props.topTextEnabled) {
      applyTextColor(props.textColors.topBottomColor, props.customBilingualTexts[props.language].top, width / 2, 50, props.customFonts.topBottomFont || props.fonts.topBottomFont, props.fontSizes.topBottomSize);
    }

    // Bilingual Text (Bottom)
    if (props.bilingualEnabled && props.bottomTextEnabled) {
      applyTextColor(props.textColors.topBottomColor, props.customBilingualTexts[props.language].bottom, props.bottomTextPosition.x, props.bottomTextPosition.y, props.customFonts.topBottomFont || props.fonts.topBottomFont, props.bottomTextSize);
    }
  }, [props]);

  const drawQuoteBox = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (props.quoteBoxStyle === 'none') return;

    const boxWidth = props.quoteBoxSize.width;
    const boxHeight = props.quoteBoxSize.height;
    const x = (width - boxWidth) / 2;
    const y = props.textPositions.quoteY - boxHeight / 2;
    const cornerRadius = 15;

    // Only draw border, no background fill
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();

    if (props.quoteBoxStyle === 'rounded') {
      ctx.moveTo(x + cornerRadius, y);
      ctx.lineTo(x + boxWidth - cornerRadius, y);
      ctx.quadraticCurveTo(x + boxWidth, y, x + boxWidth, y + cornerRadius);
      ctx.lineTo(x + boxWidth, y + boxHeight - cornerRadius);
      ctx.quadraticCurveTo(x + boxWidth, y + boxHeight, x + boxWidth - cornerRadius, y + boxHeight);
      ctx.lineTo(x + cornerRadius, y + boxHeight);
      ctx.quadraticCurveTo(x, y + boxHeight, x, y + boxHeight - cornerRadius);
      ctx.lineTo(x, y + cornerRadius);
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
    } else {
      ctx.rect(x, y, boxWidth, boxHeight);
    }

    ctx.closePath();
    ctx.stroke(); // Only stroke, no fill
  }, [props]);

  const drawSocialLinks = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const iconSize = props.socialLinksSize;
    const gap = props.socialLinksGap;
    
    // Calculate total width and center the social links horizontally
    const totalWidth = iconSize * 3 + gap * 2;
    let startX = (width - totalWidth) / 2;
    const y = props.socialLinksPosition.y;

    ctx.fillStyle = props.socialLinksColor;
    ctx.font = `${iconSize * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Telegram icon
    const telegramIcon = new Image();
    telegramIcon.crossOrigin = 'anonymous';
    telegramIcon.onload = () => {
      ctx.drawImage(telegramIcon, startX, y - iconSize/2, iconSize, iconSize);
      ctx.fillText(props.socialLinks.telegram, startX + iconSize/2, y + iconSize * 0.8);
    };
    telegramIcon.src = '/lovable-uploads/64b58e21-712a-4d26-bed1-69b54bd1c3eb.png';

    // Instagram icon
    const instagramIcon = new Image();
    instagramIcon.crossOrigin = 'anonymous';
    instagramIcon.onload = () => {
      const instagramX = startX + iconSize + gap;
      ctx.drawImage(instagramIcon, instagramX, y - iconSize/2, iconSize, iconSize);
      ctx.fillText(props.socialLinks.instagram, instagramX + iconSize/2, y + iconSize * 0.8);
    };
    instagramIcon.src = '/lovable-uploads/f87c9785-4207-4403-a81d-869cfbfe9fa4.png';

    // TikTok icon
    const tiktokIcon = new Image();
    tiktokIcon.crossOrigin = 'anonymous';
    tiktokIcon.onload = () => {
      const tiktokX = startX + 2 * (iconSize + gap);
      ctx.drawImage(tiktokIcon, tiktokX, y - iconSize/2, iconSize, iconSize);
      ctx.fillText(props.socialLinks.tiktok, tiktokX + iconSize/2, y + iconSize * 0.8);
    };
    tiktokIcon.src = '/lovable-uploads/6aeacb0f-703d-4837-af88-ff14ce749b41.png';
  }, [props]);

  const drawAdditionalIcons = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const iconSize = props.additionalIconsSize;
    const gap = props.additionalIconsGap;
    const startY = props.additionalIconsY;

    // Calculate total width for horizontal layout with proper spacing
    const textWidth = 180; // Space allocated for text
    const itemWidth = iconSize + textWidth;
    const totalWidth = itemWidth * 3 + gap * 2;
    let startX = (width - totalWidth) / 2;

    ctx.fillStyle = '#ffffff';
    ctx.font = `${iconSize - 4}px Arial`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    // Location icon and text
    const locationIcon = new Image();
    locationIcon.crossOrigin = 'anonymous';
    locationIcon.onload = () => {
      ctx.drawImage(locationIcon, startX, startY - iconSize/2, iconSize, iconSize);
      ctx.fillText(props.additionalIcons.place, startX + iconSize + 10, startY);
    };
    locationIcon.src = '/lovable-uploads/1f6bc006-c641-4689-8e9e-e9da10e585d8.png';

    // Time icon and text
    const timeIcon = new Image();
    timeIcon.crossOrigin = 'anonymous';
    timeIcon.onload = () => {
      const timeX = startX + itemWidth + gap;
      ctx.drawImage(timeIcon, timeX, startY - iconSize/2, iconSize, iconSize);
      ctx.fillText(props.additionalIcons.time, timeX + iconSize + 10, startY);
    };
    timeIcon.src = '/lovable-uploads/7475de3f-f477-4f7d-8688-911c55de8ea9.png';

    // Date icon and text
    const dateIcon = new Image();
    dateIcon.crossOrigin = 'anonymous';
    dateIcon.onload = () => {
      const dateX = startX + 2 * (itemWidth + gap);
      ctx.drawImage(dateIcon, dateX, startY - iconSize/2, iconSize, iconSize);
      ctx.fillText(props.additionalIcons.date, dateX + iconSize + 10, startY);
    };
    dateIcon.src = '/lovable-uploads/6efc2e61-1d10-4ca2-8a06-0d41a15e2b7d.png';
  }, [props]);

  const drawClipart = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!props.clipart.image) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(
        img,
        props.clipart.x - props.clipart.width / 2,
        props.clipart.y - props.clipart.height / 2,
        props.clipart.width,
        props.clipart.height
      );
    };
    img.src = props.clipart.image;
  }, [props]);

  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (props.frameStyle === 'none') return;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;

    switch (props.frameStyle) {
      case 'simple':
        ctx.strokeRect(5, 5, width - 10, height - 10);
        break;
      case 'elegant':
        ctx.setLineDash([20, 10]);
        ctx.strokeRect(5, 5, width - 10, height - 10);
        ctx.setLineDash([]);
        break;
      case 'bold':
        ctx.lineWidth = 10;
        ctx.strokeRect(10, 10, width - 20, height - 20);
        break;
      case 'rounded':
        ctx.lineJoin = "round";
        ctx.lineWidth = 20;
        ctx.strokeRect(10, 10, width - 20, height - 20);
        ctx.lineJoin = "miter";
        break;
      case 'double':
        ctx.strokeRect(5, 5, width - 10, height - 10);
        ctx.strokeRect(20, 20, width - 40, height - 40);
        break;
      case 'dashed':
        ctx.setLineDash([15, 15]);
        ctx.strokeRect(5, 5, width - 10, height - 10);
        ctx.setLineDash([]);
        break;
      case 'dotted':
        ctx.setLineDash([5, 10]);
        ctx.strokeRect(5, 5, width - 10, height - 10);
        ctx.setLineDash([]);
        break;
      case 'shadow':
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
        ctx.strokeRect(5, 5, width - 10, height - 10);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        break;
      case 'glow':
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowBlur = 20;
        ctx.strokeRect(5, 5, width - 10, height - 10);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        break;
      case 'vintage':
        ctx.lineWidth = 3;
        ctx.strokeRect(15, 15, width - 30, height - 30);
        ctx.strokeRect(5, 5, width - 10, height - 10);
        break;
      case 'modern':
        ctx.lineWidth = 8;
        ctx.strokeRect(25, 5, width - 30, height - 10);
        break;
      case 'neon':
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = '#00ffff';
        ctx.strokeRect(5, 5, width - 10, height - 10);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff';
        break;
      case 'artistic':
        ctx.lineWidth = 4;
        ctx.setLineDash([25, 15]);
        ctx.strokeRect(5, 5, width - 10, height - 10);
        ctx.setLineDash([]);
        break;
      case 'minimal':
        ctx.lineWidth = 2;
        ctx.strokeRect(5, 5, width - 10, height - 10);
        break;
      case 'partial-top-right':
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.lineTo(width, height);
        ctx.stroke();
        break;
      case 'partial-bottom-left':
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.lineTo(width, height);
        ctx.stroke();
        break;
      case 'partial-diagonal':
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, height);
        ctx.stroke();
        break;
      default:
        break;
    }
  }, [props.frameStyle]);

  const drawPoster = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background image or default background
    if (props.backgroundImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const imageWidth = img.width;
          const imageHeight = img.height;

          const cropX = props.imageCrop.x * imageWidth;
          const cropY = props.imageCrop.y * imageHeight;
          const cropWidth = imageWidth * props.imageCrop.scale;
          const cropHeight = imageHeight * props.imageCrop.scale;

          ctx.drawImage(
            img,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            width,
            height
          );

          // Draw all elements after background is loaded
          drawGradient(ctx, width, height);
          drawText(ctx, width, height);
          drawQuoteBox(ctx, width, height);
          drawSocialLinks(ctx, width, height);
          drawAdditionalIcons(ctx, width, height);
          drawClipart(ctx, width, height);
          drawFrame(ctx, width, height);
        } catch (error) {
          console.error('Error drawing background image:', error);
          // Fallback to default background
          ctx.fillStyle = '#1e3a8a';
          ctx.fillRect(0, 0, width, height);
          drawAllElements();
        }
      };
      img.onerror = () => {
        console.error('Failed to load background image');
        // Fallback to default background
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(0, 0, width, height);
        drawAllElements();
      };
      img.src = props.backgroundImage;
    } else {
      // Default background
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(0, 0, width, height);
      drawAllElements();
    }

    function drawAllElements() {
      drawGradient(ctx, width, height);
      drawText(ctx, width, height);
      drawQuoteBox(ctx, width, height);
      drawSocialLinks(ctx, width, height);
      drawAdditionalIcons(ctx, width, height);
      drawClipart(ctx, width, height);
      drawFrame(ctx, width, height);
    }
  }, [props, drawGradient, drawText, drawQuoteBox, drawSocialLinks, drawAdditionalIcons, drawClipart, drawFrame]);

  // Initialize canvas and set up ref
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && ref) {
      if (typeof ref === 'function') {
        ref(canvas);
      } else {
        ref.current = canvas;
      }
    }
  }, [ref]);

  // Draw poster when component mounts or props change
  useEffect(() => {
    drawPoster();
  }, [drawPoster]);

  return (
    <div className="w-full max-w-md mx-auto">
      <canvas
        ref={canvasRef}
        width={1080}
        height={1080}
        className="w-full h-auto border border-white/20 rounded-lg shadow-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
});

PosterCanvas.displayName = 'PosterCanvas';

export default PosterCanvas;
export type { PosterCanvasProps };
