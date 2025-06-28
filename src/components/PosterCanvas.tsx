import React, { useRef, useEffect, forwardRef } from 'react';
import { templates } from '@/utils/posterTemplates';

interface PosterCanvasProps {
  backgroundImage: string | null;
  title: string;
  mainText: string;
  quotedText: string;
  template: number;
  gradientTopHeight: number;
  gradientBottomHeight: number;
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
  fonts: {
    titleFont: string;
    textFont: string;
    quoteFont: string;
  };
}

export const PosterCanvas = forwardRef<HTMLCanvasElement, PosterCanvasProps>(
  (
    {
      backgroundImage,
      title,
      mainText,
      quotedText,
      template,
      gradientTopHeight,
      gradientBottomHeight,
      language,
      socialLinks,
      textPositions,
      quoteBoxSize,
      fonts
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const bilingualTexts = {
      amharic: {
        top: 'በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ አሜን',
        bottom: 'የጅማ ዩንቨርስቲ ቴክኖሎጂ ኢንስቲትዩት ግቢ ጉባኤ'
      },
      oromic: {
        top: 'Maqaa Abbaa kan ilmaa kan afuura qulqulluu waaqa tokko ameen',
        bottom: "Yaa'ii Mooraa Inistiitiyuutii Teeknooloojii Yuunivarsiitii Jimmaa"
      }
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1080;
      canvas.height = 1080;
      const currentTemplate = templates[template] || templates[1];

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
    }, [
      backgroundImage,
      title,
      mainText,
      quotedText,
      template,
      gradientTopHeight,
      gradientBottomHeight,
      language,
      socialLinks,
      textPositions,
      quoteBoxSize,
      fonts
    ]);

    const drawGradientOverlays = (ctx: CanvasRenderingContext2D) => {
      // Top gradient
      if (gradientTopHeight > 0) {
        const top = ctx.createLinearGradient(0, 0, 0, gradientTopHeight);
        top.addColorStop(0, '#083765');
        top.addColorStop(1, 'rgba(8, 55, 101, 0)');
        ctx.fillStyle = top;
        ctx.fillRect(0, 0, 1080, gradientTopHeight);
      }

      // Bottom gradient
      if (gradientBottomHeight > 0) {
        const bottomY = 1080 - gradientBottomHeight;
        const bottom = ctx.createLinearGradient(0, bottomY, 0, 1080);
        bottom.addColorStop(0, 'rgba(8, 55, 101, 0)');
        bottom.addColorStop(1, '#083765');
        ctx.fillStyle = bottom;
        ctx.fillRect(0, bottomY, 1080, gradientBottomHeight);
      }
    };

    const drawBilingualTexts = (ctx: CanvasRenderingContext2D) => {
      const texts = bilingualTexts[language];
      ctx.fillStyle = '#ffd700';
      ctx.font = `28px ${fonts.textFont}`;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      wrapText(ctx, texts.top, 540, 40, 900, 35);
      wrapText(ctx, texts.bottom, 540, 950, 900, 35);

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

    const drawSocialLinks = (ctx: CanvasRenderingContext2D) => {
      const linkY = 1020;
      const gap = 80;
      const fontSize = 22;
      ctx.font = `${fontSize}px ${fonts.textFont}`;
      const links = [
        { icon: '✈️', text: socialLinks.telegram },
        { icon: '📷', text: socialLinks.instagram },
        { icon: '🎵', text: socialLinks.tiktok }
      ];
      const widths = links.map(l => ctx.measureText(`${l.icon} ${l.text}`).width);
      const totalWidth = widths.reduce((a, b) => a + b, 0) + gap * (links.length - 1);
      let x = (1080 - totalWidth) / 2;

      ctx.fillStyle = '#ffd700';
      ctx.textAlign = 'left';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      links.forEach((l, i) => {
        ctx.fillText(`${l.icon} ${l.text}`, x, linkY);
        x += widths[i] + gap;
      });

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

    const drawTemplate = (ctx: CanvasRenderingContext2D, template: any, title: string, mainText: string, quotedText: string) => {
      // Skip halo/circle decoration
      if (template.decorations) {
        template.decorations.forEach((d: any) => {
          if (d.type === 'border') drawBorder(ctx, d);
        });
      }

      drawGoldenText(ctx, title, template.fonts.titleSize, fonts.titleFont, 540, textPositions.titleY, 800, template.fonts.titleSize * 1.2, true);

      ctx.fillStyle = template.colors.textColor;
      ctx.font = `${template.fonts.textSize}px ${fonts.textFont}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      wrapText(ctx, mainText, 540, textPositions.textY, 700, template.fonts.textSize * 1.5);

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

      ctx.fillStyle = template.colors.quoteBackground;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, quoteBoxSize.width, quoteBoxSize.height, 20);
      ctx.fill();

      ctx.strokeStyle = template.colors.quoteBorder;
      ctx.lineWidth = 3;
      ctx.shadowColor = template.colors.quoteBorder;
      ctx.shadowBlur = 10;
      ctx.stroke();

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      drawGoldenText(
        ctx,
        `"${text}"`,
        template.fonts.quoteSize,
        fonts.quoteFont,
        boxX + quoteBoxSize.width / 2,
        boxY + 50,
        quoteBoxSize.width - 40,
        template.fonts.quoteSize * 1.4
      );
    };

    const drawBorder = (ctx: CanvasRenderingContext2D, d: any) => {
      ctx.strokeStyle = d.color;
      ctx.lineWidth = d.width;
      ctx.strokeRect(d.x, d.y, d.width, d.height);
    };

    const wrapText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ) => {
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
