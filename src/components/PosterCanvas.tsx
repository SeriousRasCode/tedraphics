
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
    language,
    socialLinks,
    textPositions,
    quoteBoxSize,
    quoteBoxStyle,
    fonts,
    fontSizes,
    customFonts
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
        drawBilingualTexts(ctx);
        drawSocialLinks(ctx);
      };

      if (backgroundImage) {
        const img = new Image();
        img.onload = () => {
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
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
    }, [backgroundImage, title, mainText, quotedText, template, gradientHeight, gradientStrength, language, socialLinks, textPositions, quoteBoxSize, quoteBoxStyle, fonts, fontSizes, customFonts]);

    const drawGradientOverlays = (ctx: CanvasRenderingContext2D) => {
      const alpha = gradientStrength / 100;
      
      // Top gradient overlay
      const top = ctx.createLinearGradient(0, 0, 0, gradientHeight);
      top.addColorStop(0, `rgba(8, 55, 101, ${alpha})`);
      top.addColorStop(1, 'rgba(8, 55, 101, 0)');
      ctx.fillStyle = top;
      ctx.fillRect(0, 0, 1080, gradientHeight);

      // Bottom gradient overlay
      const bottom = ctx.createLinearGradient(0, 1080 - gradientHeight, 0, 1080);
      bottom.addColorStop(0, 'rgba(8, 55, 101, 0)');
      bottom.addColorStop(1, `rgba(8, 55, 101, ${alpha})`);
      ctx.fillStyle = bottom;
      ctx.fillRect(0, 1080 - gradientHeight, 1080, gradientHeight);
    };

    const drawBilingualTexts = (ctx: CanvasRenderingContext2D) => {
      const texts = bilingualTexts[language];
      ctx.fillStyle = '#ffd700';
      const fontFamily = customFonts.topBottomFont || fonts.topBottomFont;
      ctx.font = `${fontSizes.topBottomSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      wrapText(ctx, texts.top, 540, 40, 1000, fontSizes.topBottomSize * 1.2);
      wrapText(ctx, texts.bottom, 540, 950, 1000, fontSizes.topBottomSize * 1.2);

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

const drawSocialLinks = (ctx: CanvasRenderingContext2D) => {
  const linkY = 1020;
  const iconSize = 24;
  const gap = 50;
  const fontSize = 20;
  const fontFamily = customFonts.textFont || fonts.textFont;
  ctx.font = `${fontSize}px ${fontFamily}`;
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

  const imagePromises = links.map(link => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = link.iconSrc;
    });
  });

  Promise.all(imagePromises).then(images => {
    const blocks = links.map((link, i) => {
      const textWidth = ctx.measureText(link.text).width;
      return {
        img: images[i],
        text: link.text,
        textWidth,
        width: iconSize + 8 + textWidth,
      };
    });

    const totalWidth = blocks.reduce((acc, block) => acc + block.width, 0) + gap * (blocks.length - 1);
    let x = (1080 - totalWidth) / 2;

    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    blocks.forEach(block => {
      ctx.drawImage(block.img, x, linkY - iconSize / 2, iconSize, iconSize);
      ctx.fillStyle = '#ffd700';
      ctx.fillText(block.text, x + iconSize + 8, linkY);
      x += block.width + gap;
    });

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  });
};


    const drawTemplate = (ctx: CanvasRenderingContext2D, template: any, title: string, mainText: string, quotedText: string) => {
      const titleFontFamily = customFonts.titleFont || fonts.titleFont;
      drawGoldenText(ctx, title, fontSizes.titleSize, titleFontFamily, 540, textPositions.titleY, 800, fontSizes.titleSize * 1.2, true);

      ctx.fillStyle = template.colors.textColor;
      const textFontFamily = customFonts.textFont || fonts.textFont;
      ctx.font = `${fontSizes.textSize}px ${textFontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      wrapText(ctx, mainText, 540, textPositions.textY, 700, fontSizes.textSize * 1.5);

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
      const gradient = ctx.createLinearGradient(0, y, 0, y + fontSize);
      gradient.addColorStop(0, '#ffd700');
      gradient.addColorStop(0.3, '#ffed4e');
      gradient.addColorStop(0.7, '#d97706');
      gradient.addColorStop(1, '#b45309');
      ctx.fillStyle = gradient;

      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;

      wrapText(ctx, text, x, y, maxWidth, lineHeight);

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
