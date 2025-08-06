import React, { useEffect } from 'react';
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

const PosterCanvas = React.forwardRef<HTMLCanvasElement, PosterCanvasProps>(({
  backgroundImage,
  title,
  mainText,
  quotedText,
  template,
  gradientHeight,
  gradientStrength,
  gradientInnerHeight,
  language,
  socialLinks,
  textPositions,
  quoteBoxSize,
  quoteBoxStyle,
  fonts,
  fontSizes,
  customFonts,
  bilingualEnabled,
  frameStyle,
  textColors,
  mainTextWidth,
  additionalIcons,
  additionalIconsY,
  socialLinksGap,
  imageCrop,
  clipart,
  additionalIconsGap,
  socialLinksPosition,
  bottomTextPosition,
  bottomTextSize,
  socialLinksSize,
  additionalIconsSize,
  topTextEnabled,
  bottomTextEnabled,
  customBilingualTexts,
  socialLinksColor,
  gradientAngle,
  gradientConfig
}, ref) => {
  useEffect(() => {
    // Get canvas element from ref
    let canvas: HTMLCanvasElement | null = null;
    
    if (ref) {
      if (typeof ref === 'function') {
        // Callback ref - we can't access the element directly
        return;
      } else {
        // Ref object
        canvas = ref.current;
      }
    }
    
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background image
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        const imageWidth = img.width;
        const imageHeight = img.height;

        const cropX = imageCrop.x * imageWidth;
        const cropY = imageCrop.y * imageHeight;
        const cropWidth = imageWidth * imageCrop.scale;
        const cropHeight = imageHeight * imageCrop.scale;

        const destX = 0;
        const destY = 0;
        const destWidth = width;
        const destHeight = height;

        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          destX,
          destY,
          destWidth,
          destHeight
        );

        // Apply gradient overlay
        drawGradient(ctx, width, height);

        // Draw text and other elements
        drawText(ctx, width, height);
        drawQuoteBox(ctx, width, height);
        drawSocialLinks(ctx, width, height);
        drawAdditionalIcons(ctx, width, height);
        drawClipart(ctx, width, height);
        drawFrame(ctx, width, height);
      };
    } else {
      // If no background image, fill with a default color or gradient
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(0, 0, width, height);

      // Apply gradient overlay
      drawGradient(ctx, width, height);

      // Draw text and other elements
      drawText(ctx, width, height);
      drawQuoteBox(ctx, width, height);
      drawSocialLinks(ctx, width, height);
      drawAdditionalIcons(ctx, width, height);
      drawClipart(ctx, width, height);
      drawFrame(ctx, width, height);
    }
  }, [backgroundImage, title, mainText, quotedText, template, gradientHeight, gradientStrength, gradientInnerHeight, language, socialLinks, textPositions, quoteBoxSize, quoteBoxStyle, fonts, fontSizes, customFonts, bilingualEnabled, frameStyle, textColors, mainTextWidth, additionalIcons, additionalIconsY, socialLinksGap, imageCrop, clipart, additionalIconsGap, socialLinksPosition, bottomTextPosition, bottomTextSize, socialLinksSize, additionalIconsSize, topTextEnabled, bottomTextEnabled, customBilingualTexts, socialLinksColor, gradientAngle, gradientConfig]);

  const drawGradient = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!gradientConfig.enabled) return;

    const { type, direction, angle, height: gradientHeight, stops } = gradientConfig;
    
    let gradient: CanvasGradient;
    
    if (type === 'linear') {
      // Calculate gradient coordinates based on angle and direction
      const angleRad = (angle * Math.PI) / 180;
      let x0, y0, x1, y1;
      
      if (direction === 'center') {
        // For center direction, apply opacity to top and bottom to reveal the middle
        const centerY = height / 2;
        const gradientSpan = Math.min(gradientHeight, height / 2);
        
        // Create top gradient (opacity overlay on top)
        const topGradient = ctx.createLinearGradient(0, 0, 0, gradientSpan);
        stops.forEach(stop => {
          const color = `rgba(${parseInt(stop.color.slice(1, 3), 16)}, ${parseInt(stop.color.slice(3, 5), 16)}, ${parseInt(stop.color.slice(5, 7), 16)}, ${stop.opacity / 100})`;
          topGradient.addColorStop(stop.position / 100, color);
        });
        
        // Create bottom gradient (opacity overlay on bottom)
        const bottomGradient = ctx.createLinearGradient(0, height - gradientSpan, 0, height);
        stops.forEach(stop => {
          const color = `rgba(${parseInt(stop.color.slice(1, 3), 16)}, ${parseInt(stop.color.slice(3, 5), 16)}, ${parseInt(stop.color.slice(5, 7), 16)}, ${stop.opacity / 100})`;
          bottomGradient.addColorStop(stop.position / 100, color);
        });
        
        // Apply top overlay
        ctx.fillStyle = topGradient;
        ctx.fillRect(0, 0, width, gradientSpan);
        
        // Apply bottom overlay
        ctx.fillStyle = bottomGradient;
        ctx.fillRect(0, height - gradientSpan, width, gradientSpan);
        
        return;
      } else {
        // Handle other directions
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const gradientLength = Math.min(gradientHeight, height);
        
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
      
      if (direction === 'center') {
        // For radial center, create inner circle that's transparent/low opacity
        gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      } else {
        gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      }
    }
    
    // Add color stops for non-center directions
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
  };

  const drawText = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Function to apply text color based on the color type (solid or gradient)
    const applyTextColor = (colorType: string, text: string, x: number, y: number, font: string, size: number) => {
      ctx.font = `${size}px ${font}`;
      if (colorType === 'gradient') {
        const gradient = ctx.createLinearGradient(x - mainTextWidth / 2, y - size / 2, x + mainTextWidth / 2, y + size / 2);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#a1a1aa');
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = colorType;
      }
      ctx.fillText(text, x, y);
    };

    // Title
    applyTextColor(textColors.titleColor, title, width / 2, textPositions.titleY, customFonts.titleFont || fonts.titleFont, fontSizes.titleSize);

    // Main Text
    ctx.font = `${fontSizes.textSize}px ${customFonts.textFont || fonts.textFont}`;
    ctx.fillStyle = textColors.textColor;
    const words = mainText.split(' ');
    let line = '';
    let y = textPositions.textY;
    const lineHeight = fontSizes.textSize * 1.2;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > mainTextWidth && n > 0) {
        ctx.fillText(line, width / 2, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width / 2, y);

    // Quoted Text
    applyTextColor(textColors.quoteColor, quotedText, width / 2, textPositions.quoteY, customFonts.quoteFont || fonts.quoteFont, fontSizes.quoteSize);

    // Bilingual Text (Top)
    if (bilingualEnabled && topTextEnabled) {
      ctx.font = `${fontSizes.topBottomSize}px ${customFonts.topBottomFont || fonts.topBottomFont}`;
      applyTextColor(textColors.topBottomColor, customBilingualTexts[language].top, width / 2, 50, customFonts.topBottomFont || fonts.topBottomFont, fontSizes.topBottomSize);
    }

    // Bilingual Text (Bottom)
    if (bilingualEnabled && bottomTextEnabled) {
      ctx.font = `${bottomTextSize}px ${customFonts.topBottomFont || fonts.topBottomFont}`;
      applyTextColor(textColors.topBottomColor, customBilingualTexts[language].bottom, bottomTextPosition.x, bottomTextPosition.y, customFonts.topBottomFont || fonts.topBottomFont, bottomTextSize);
    }
  };

  const drawQuoteBox = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (quoteBoxStyle === 'none') return;

    const boxWidth = quoteBoxSize.width;
    const boxHeight = quoteBoxSize.height;
    const x = (width - boxWidth) / 2;
    const y = textPositions.quoteY - boxHeight / 2;
    const cornerRadius = 15;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';

    ctx.beginPath();

    if (quoteBoxStyle === 'rounded') {
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
    ctx.fill();
  };

  const drawSocialLinks = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const iconSize = socialLinksSize;
    const gap = socialLinksGap;
    let startX = socialLinksPosition.x - (iconSize * 3 + gap * 2) / 2;
    const y = socialLinksPosition.y;

    ctx.fillStyle = socialLinksColor;
    ctx.font = `${iconSize}px FontAwesome`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const drawIcon = (icon: string, x: number) => {
      ctx.fillText(icon, x, y);
    };

    drawIcon('\uf264', startX); // Telegram
    drawIcon('\uf16d', startX + iconSize + gap); // Instagram
    drawIcon('\ue07b', startX + 2 * (iconSize + gap)); // TikTok
  };

  const drawAdditionalIcons = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const iconSize = additionalIconsSize;
    const gap = additionalIconsGap;
    let startY = additionalIconsY;

    ctx.fillStyle = '#ffffff';
    ctx.font = `${iconSize}px FontAwesome`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const drawIconWithText = (icon: string, text: string, y: number) => {
      ctx.fillText(icon, width / 2 - 50, y);
      ctx.font = `${iconSize - 4}px sans-serif`;
      ctx.fillText(text, width / 2 + 40, y);
    };

    drawIconWithText('\uf041', additionalIcons.place, startY); // Map Pin
    drawIconWithText('\uf017', additionalIcons.time, startY + iconSize + gap); // Clock
    drawIconWithText('\uf073', additionalIcons.date, startY + 2 * (iconSize + gap)); // Calendar
  };

  const drawClipart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!clipart.image) return;

    const img = new Image();
    img.src = clipart.image;
    img.onload = () => {
      ctx.drawImage(
        img,
        clipart.x - clipart.width / 2,
        clipart.y - clipart.height / 2,
        clipart.width,
        clipart.height
      );
    };
  };

  const drawFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (frameStyle === 'none') return;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;

    const drawFrameStyle = (style: string) => {
      switch (style) {
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
          ctx.lineWidth = 5;
          break;
        case 'rounded':
          ctx.lineJoin = "round";
          ctx.lineWidth = 20;
          ctx.strokeRect(10, 10, width - 20, height - 20);
          ctx.lineJoin = "miter";
          ctx.lineWidth = 5;
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
          ctx.lineWidth = 5;
          break;
        case 'modern':
          ctx.lineWidth = 8;
          ctx.strokeRect(25, 5, width - 30, height - 10);
          ctx.lineWidth = 5;
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
          ctx.lineWidth = 5;
          break;
        case 'minimal':
          ctx.lineWidth = 2;
          ctx.strokeRect(5, 5, width - 10, height - 10);
          ctx.lineWidth = 5;
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
    };

    drawFrameStyle(frameStyle);
  };

  return (
    <canvas
      ref={ref}
      width={1080}
      height={1080}
    />
  );
});

export default PosterCanvas;
export type { PosterCanvasProps };
