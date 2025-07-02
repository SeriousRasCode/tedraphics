import React, { useRef, useEffect, forwardRef } from 'react';
import { templates } from '@/utils/posterTemplates';

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
  quoteBoxStyle: 'rectangle' | 'rounded' | 'circle' | 'diamond' | 'none';
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
}

export const PosterCanvas = forwardRef<HTMLCanvasElement, PosterCanvasProps>(
  ({
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
    additionalIconsSize
  }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const bilingualTexts = {
      amharic: {
        top: 'በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ አሜን',
        bottom: 'የጅማ ዩንቨርስቲ ቴክኖሎጂ ኢንስቲትዩት ግቢ ጉባኤ'
      },
      oromic: {
        top: 'Maqaa Abbaa kan ilmaa kan afuura qulqulluu waaqa tokko ameen',
        bottom: 'Yaa\'ii Mooraa Inistiitiyuutii Teeknooloojii Yuunivarsiitii Jimmaa'
      }
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1080;
      canvas.height = 1080;

      const currentTemplate = templates[template] || templates[2];
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const draw = () => {
        drawGradientOverlays(ctx);
        drawTemplate(ctx, currentTemplate, title, mainText, quotedText);
        if (bilingualEnabled) {
          drawBilingualTexts(ctx);
        }
        drawAdditionalIcons(ctx);
        drawSocialLinks(ctx);
        drawClipart(ctx);
        drawFrame(ctx);
      };

      if (backgroundImage) {
        const img = new Image();
        img.onload = () => {
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height) * imageCrop.scale;
          const x = (canvas.width - img.width * scale) / 2 + imageCrop.x;
          const y = (canvas.height - img.height * scale) / 2 + imageCrop.y;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          draw();
        };
        img.src = backgroundImage;
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, currentTemplate.colors.primary);
        gradient.addColorStop(1, currentTemplate.colors.secondary);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        draw();
      }
    }, [backgroundImage, title, mainText, quotedText, template, gradientHeight, gradientStrength, gradientInnerHeight, language, socialLinks, textPositions, quoteBoxSize, quoteBoxStyle, fonts, fontSizes, customFonts, bilingualEnabled, frameStyle, textColors, mainTextWidth, additionalIcons, additionalIconsY, socialLinksGap, imageCrop, clipart, additionalIconsGap, socialLinksPosition, bottomTextPosition, bottomTextSize, socialLinksSize, additionalIconsSize]);

    const drawGradientOverlays = (ctx: CanvasRenderingContext2D) => {
      const alpha = gradientStrength / 100;
      
      // Top gradient overlay with smooth inner height transition
      const top = ctx.createLinearGradient(0, 0, 0, gradientHeight);
      top.addColorStop(0, `rgba(8, 55, 101, ${alpha})`);
      top.addColorStop(Math.min(gradientInnerHeight / gradientHeight, 0.9), `rgba(8, 55, 101, ${alpha * 0.8})`);
      top.addColorStop(1, 'rgba(8, 55, 101, 0)');
      ctx.fillStyle = top;
      ctx.fillRect(0, 0, 1080, gradientHeight);

      // Bottom gradient overlay with smooth inner height transition
      const bottom = ctx.createLinearGradient(0, 1080 - gradientHeight, 0, 1080);
      bottom.addColorStop(0, 'rgba(8, 55, 101, 0)');
      bottom.addColorStop(Math.max(1 - (gradientInnerHeight / gradientHeight), 0.1), `rgba(8, 55, 101, ${alpha * 0.8})`);
      bottom.addColorStop(1, `rgba(8, 55, 101, ${alpha})`);
      ctx.fillStyle = bottom;
      ctx.fillRect(0, 1080 - gradientHeight, 1080, gradientHeight);
    };

    const drawBilingualTexts = (ctx: CanvasRenderingContext2D) => {
      const texts = bilingualTexts[language];
      const fontFamily = customFonts.topBottomFont || fonts.topBottomFont;
      ctx.font = `${bottomTextSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      if (textColors.topBottomColor === 'gradient') {
        const gradient = ctx.createLinearGradient(0, 25, 0, 55);
        gradient.addColorStop(0, '#ffd700');
        gradient.addColorStop(0.3, '#ffed4e');
        gradient.addColorStop(0.7, '#d97706');
        gradient.addColorStop(1, '#b45309');
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = textColors.topBottomColor;
      }

      wrapTextWithGradient(ctx, texts.top, 540, 40, 1000, bottomTextSize * 1.2, textColors.topBottomColor === 'gradient');
      wrapTextWithGradient(ctx, texts.bottom, bottomTextPosition.x, bottomTextPosition.y, 1000, bottomTextSize * 1.2, textColors.topBottomColor === 'gradient');

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

    const drawAdditionalIcons = (ctx: CanvasRenderingContext2D) => {
      const iconSize = 16;
      const fontFamily = customFonts.textFont || fonts.textFont;
      ctx.font = `${additionalIconsSize}px ${fontFamily}`;
      ctx.textBaseline = 'middle';

      const additionalIconsData = [
        { text: additionalIcons.place, color: '#4ade80', iconSrc: '/lovable-uploads/1f6bc006-c641-4689-8e9e-e9da10e585d8.png' },
        { text: additionalIcons.time, color: '#60a5fa', iconSrc: '/lovable-uploads/7475de3f-f477-4f7d-8688-911c55de8ea9.png' },
        { text: additionalIcons.date, color: '#f87171', iconSrc: '/lovable-uploads/6efc2e61-1d10-4ca2-8a06-0d41a15e2b7d.png' }
      ];

      const visibleIcons = additionalIconsData.filter(icon => icon.text.trim() !== '');
      
      if (visibleIcons.length === 0) return;

      const iconPromises = visibleIcons.map(icon => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = icon.iconSrc;
        });
      });

      Promise.all(iconPromises).then(images => {
        const blocks = visibleIcons.map((icon, i) => {
          const textWidth = ctx.measureText(icon.text).width;
          return {
            img: images[i],
            text: icon.text,
            textWidth,
            width: iconSize + 8 + textWidth,
          };
        });

        const totalWidth = blocks.reduce((acc, block) => acc + block.width, 0) + additionalIconsGap * (blocks.length - 1);
        let x = (1080 - totalWidth) / 2;

        ctx.textAlign = 'left';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        blocks.forEach(block => {
          ctx.drawImage(block.img, x, additionalIconsY - iconSize / 2, iconSize, iconSize);
          ctx.fillStyle = '#ffd700';
          ctx.fillText(block.text, x + iconSize + 8, additionalIconsY);
          x += block.width + additionalIconsGap;
        });

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      });
    };

    const drawSocialLinks = (ctx: CanvasRenderingContext2D) => {
      const iconSize = 20;
      const fontFamily = customFonts.textFont || fonts.textFont;
      ctx.font = `${socialLinksSize}px ${fontFamily}`;
      ctx.textBaseline = 'middle';

      const links = [
        {
          iconSrc: '/lovable-uploads/64b58e21-712a-4d26-bed1-69b54bd1c3eb.png',
          text: socialLinks.telegram,
          color: '#0088cc',
        },
        {
          iconSrc: '/lovable-uploads/f87c9785-4207-4403-a81d-869cfbfe9fa4.png',
          text: socialLinks.instagram,
          color: '#E4405F',
        },
        {
          iconSrc: '/lovable-uploads/6aeacb0f-703d-4837-af88-ff14ce749b41.png',
          text: socialLinks.tiktok,
          color: '#ff0050',
        },
      ];

      const visibleLinks = links.filter(link => link.text.trim() !== '');
      
      if (visibleLinks.length === 0) return;

      const imagePromises = visibleLinks.map(link => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = link.iconSrc;
        });
      });

      Promise.all(imagePromises).then(images => {
        const blocks = visibleLinks.map((link, i) => {
          const textWidth = ctx.measureText(link.text).width;
          return {
            img: images[i],
            text: link.text,
            textWidth,
            width: iconSize + 8 + textWidth,
          };
        });

        const totalWidth = blocks.reduce((acc, block) => acc + block.width, 0) + socialLinksGap * (blocks.length - 1);
        let x = socialLinksPosition.x - totalWidth / 2;

        ctx.textAlign = 'left';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        blocks.forEach(block => {
          ctx.drawImage(block.img, x, socialLinksPosition.y - iconSize / 2, iconSize, iconSize);
          ctx.fillStyle = '#ffd700';
          ctx.fillText(block.text, x + iconSize + 8, socialLinksPosition.y);
          x += block.width + socialLinksGap;
        });

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      });
    };

    const drawClipart = (ctx: CanvasRenderingContext2D) => {
      if (!clipart.image) return;

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, clipart.x - clipart.width / 2, clipart.y - clipart.height / 2, clipart.width, clipart.height);
      };
      img.src = clipart.image;
    };

    const drawFrame = (ctx: CanvasRenderingContext2D) => {
      if (frameStyle === 'none') return;

      ctx.strokeStyle = '#ffd700';
      ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
      ctx.shadowBlur = 10;

      switch (frameStyle) {
        case 'simple':
          ctx.lineWidth = 4;
          ctx.strokeRect(20, 20, 1040, 1040);
          break;
        case 'elegant':
          ctx.lineWidth = 6;
          ctx.strokeRect(15, 15, 1050, 1050);
          ctx.lineWidth = 2;
          ctx.strokeRect(25, 25, 1030, 1030);
          break;
        case 'bold':
          ctx.lineWidth = 10;
          ctx.strokeRect(10, 10, 1060, 1060);
          break;
        case 'rounded':
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.roundRect(15, 15, 1050, 1050, 30);
          ctx.stroke();
          break;
        case 'double':
          ctx.lineWidth = 3;
          ctx.strokeRect(10, 10, 1060, 1060);
          ctx.strokeRect(20, 20, 1040, 1040);
          break;
        case 'dashed':
          ctx.lineWidth = 4;
          ctx.setLineDash([20, 10]);
          ctx.strokeRect(15, 15, 1050, 1050);
          ctx.setLineDash([]);
          break;
        case 'dotted':
          ctx.lineWidth = 4;
          ctx.setLineDash([5, 15]);
          ctx.strokeRect(15, 15, 1050, 1050);
          ctx.setLineDash([]);
          break;
        case 'shadow':
          ctx.lineWidth = 6;
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 5;
          ctx.strokeRect(15, 15, 1050, 1050);
          break;
        case 'glow':
          ctx.lineWidth = 4;
          ctx.shadowBlur = 30;
          ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
          ctx.strokeRect(15, 15, 1050, 1050);
          break;
        case 'partial-top-right':
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(540, 15);
          ctx.lineTo(1065, 15);
          ctx.lineTo(1065, 540);
          ctx.stroke();
          break;
        case 'partial-bottom-left':
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(15, 540);
          ctx.lineTo(15, 1065);
          ctx.lineTo(540, 1065);
          ctx.stroke();
          break;
        case 'partial-diagonal':
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(540, 15);
          ctx.lineTo(1065, 15);
          ctx.lineTo(1065, 540);
          ctx.moveTo(15, 540);
          ctx.lineTo(15, 1065);
          ctx.lineTo(540, 1065);
          ctx.stroke();
          break;
      }

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

    const drawTemplate = (ctx: CanvasRenderingContext2D, template: any, title: string, mainText: string, quotedText: string) => {
      const titleFontFamily = customFonts.titleFont || fonts.titleFont;
      
      // Draw title
      if (textColors.titleColor === 'gradient') {
        drawGoldenText(ctx, title, fontSizes.titleSize, titleFontFamily, 540, textPositions.titleY, 800, fontSizes.titleSize * 1.2, true);
      } else {
        ctx.fillStyle = textColors.titleColor;
        ctx.font = `bold ${fontSizes.titleSize}px ${titleFontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        wrapText(ctx, title, 540, textPositions.titleY, 800, fontSizes.titleSize * 1.2);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Draw main text
      const textFontFamily = customFonts.textFont || fonts.textFont;
      ctx.font = `${fontSizes.textSize}px ${textFontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      if (textColors.textColor === 'gradient') {
        wrapTextWithGradient(ctx, mainText, 540, textPositions.textY, mainTextWidth, fontSizes.textSize * 1.5, true);
      } else {
        ctx.fillStyle = textColors.textColor;
        wrapText(ctx, mainText, 540, textPositions.textY, mainTextWidth, fontSizes.textSize * 1.5);
      }

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      if (quotedText.trim()) {
        drawQuoteBox(ctx, template, quotedText);
      }
    };

    const drawGoldenText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      fontSize: number,
      fontFamily: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      isTitle: boolean = false
    ) => {
      ctx.font = `${isTitle ? 'bold' : ''} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;

      wrapTextWithGradient(ctx, text, x, y, maxWidth, lineHeight, true);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

    const drawQuoteBox = (ctx: CanvasRenderingContext2D, template: any, text: string) => {
      const boxX = (1080 - quoteBoxSize.width) / 2;
      const boxY = textPositions.quoteY;

      if (quoteBoxStyle !== 'none') {
        ctx.fillStyle = template.colors.quoteBackground;
        ctx.beginPath();

        switch (quoteBoxStyle) {
          case 'rectangle':
            ctx.rect(boxX, boxY, quoteBoxSize.width, quoteBoxSize.height);
            break;
          case 'rounded':
            ctx.roundRect(boxX, boxY, quoteBoxSize.width, quoteBoxSize.height, 20);
            break;
          case 'circle':
            const radius = Math.min(quoteBoxSize.width, quoteBoxSize.height) / 2;
            ctx.arc(boxX + quoteBoxSize.width / 2, boxY + quoteBoxSize.height / 2, radius, 0, 2 * Math.PI);
            break;
          case 'diamond':
            const centerX = boxX + quoteBoxSize.width / 2;
            const centerY = boxY + quoteBoxSize.height / 2;
            ctx.moveTo(centerX, boxY);
            ctx.lineTo(boxX + quoteBoxSize.width, centerY);
            ctx.lineTo(centerX, boxY + quoteBoxSize.height);
            ctx.lineTo(boxX, centerY);
            ctx.closePath();
            break;
        }

        ctx.fill();

        ctx.strokeStyle = template.colors.quoteBorder;
        ctx.lineWidth = 3;
        ctx.shadowColor = template.colors.quoteBorder;
        ctx.shadowBlur = 10;
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      const quoteFontFamily = customFonts.quoteFont || fonts.quoteFont;
      const quoteText = quoteBoxStyle === 'none' ? text : `"${text}"`;
      
      if (textColors.quoteColor === 'gradient') {
        drawGoldenText(
          ctx,
          quoteText,
          fontSizes.quoteSize,
          quoteFontFamily,
          boxX + quoteBoxSize.width / 2,
          boxY + 50,
          quoteBoxSize.width - 40,
          fontSizes.quoteSize * 1.4
        );
      } else {
        ctx.fillStyle = textColors.quoteColor;
        ctx.font = `${fontSizes.quoteSize}px ${quoteFontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        wrapText(ctx, quoteText, boxX + quoteBoxSize.width / 2, boxY + 50, quoteBoxSize.width - 40, fontSizes.quoteSize * 1.4);
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    };

    const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
    };

    const wrapTextWithGradient = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, useGradient: boolean) => {
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && n > 0) {
          if (useGradient) {
            const gradient = ctx.createLinearGradient(x - maxWidth/2, currentY, x + maxWidth/2, currentY + lineHeight);
            gradient.addColorStop(0, '#ffd700');
            gradient.addColorStop(0.3, '#ffed4e');
            gradient.addColorStop(0.7, '#d97706');
            gradient.addColorStop(1, '#b45309');
            ctx.fillStyle = gradient;
          }
          ctx.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      
      if (useGradient) {
        const gradient = ctx.createLinearGradient(x - maxWidth/2, currentY, x + maxWidth/2, currentY + lineHeight);
        gradient.addColorStop(0, '#ffd700');
        gradient.addColorStop(0.3, '#ffed4e');
        gradient.addColorStop(0.7, '#d97706');
        gradient.addColorStop(1, '#b45309');
        ctx.fillStyle = gradient;
      }
      ctx.fillText(line, x, currentY);
    };

    return (
      <div className="relative">
        <canvas
          ref={(node) => {
            canvasRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className="max-w-full h-auto border border-white/20 rounded-lg shadow-2xl"
          style={{ aspectRatio: '1/1' }}
        />
      </div>
    );
  }
);

PosterCanvas.displayName = 'PosterCanvas';
