
import React, { useRef, useEffect, forwardRef } from 'react';
import { templates } from '@/utils/posterTemplates';

interface PosterCanvasProps {
  backgroundImage: string | null;
  title: string;
  mainText: string;
  quotedText: string;
  template: number;
  gradientHeight: number;
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
  ({ 
    backgroundImage, 
    title, 
    mainText, 
    quotedText, 
    template, 
    gradientHeight, 
    language, 
    socialLinks, 
    textPositions, 
    quoteBoxSize, 
    fonts 
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

      // Set canvas size to 1080x1080
      canvas.width = 1080;
      canvas.height = 1080;
      
      const currentTemplate = templates[template] || templates[1];
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      if (backgroundImage) {
        const img = new Image();
        img.onload = () => {
          // Draw background image (cover fit)
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          
          // Apply gradient overlays and template styling
          drawGradientOverlays(ctx);
          drawTemplate(ctx, currentTemplate, title, mainText, quotedText);
          drawBilingualTexts(ctx);
          drawSocialLinks(ctx);
        };
        img.src = backgroundImage;
      } else {
        // Draw default gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, currentTemplate.colors.primary);
        gradient.addColorStop(1, currentTemplate.colors.secondary);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Apply gradient overlays and template styling
        drawGradientOverlays(ctx);
        drawTemplate(ctx, currentTemplate, title, mainText, quotedText);
        drawBilingualTexts(ctx);
        drawSocialLinks(ctx);
      }
    }, [backgroundImage, title, mainText, quotedText, template, gradientHeight, language, socialLinks, textPositions, quoteBoxSize, fonts]);

    const drawGradientOverlays = (ctx: CanvasRenderingContext2D) => {
      // Top gradient rectangle - from #083765 to transparent
      const topGradient = ctx.createLinearGradient(0, 0, 0, gradientHeight);
      topGradient.addColorStop(0, '#083765');
      topGradient.addColorStop(1, 'rgba(8, 55, 101, 0)');
      
      ctx.fillStyle = topGradient;
      ctx.fillRect(0, 0, 1080, gradientHeight);

      // Bottom gradient rectangle - from transparent to #083765
      const bottomGradient = ctx.createLinearGradient(0, 1080 - gradientHeight, 0, 1080);
      bottomGradient.addColorStop(0, 'rgba(8, 55, 101, 0)');
      bottomGradient.addColorStop(1, '#083765');
      
      ctx.fillStyle = bottomGradient;
      ctx.fillRect(0, 1080 - gradientHeight, 1080, gradientHeight);
    };

    const drawBilingualTexts = (ctx: CanvasRenderingContext2D) => {
      const texts = bilingualTexts[language];
      
      // Top text
      ctx.fillStyle = '#ffd700';
      ctx.font = `24px ${fonts.textFont}`;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      ctx.fillText(texts.top, 540, 40);
      
      // Bottom text
      ctx.fillText(texts.bottom, 540, 950);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

    const drawSocialLinks = (ctx: CanvasRenderingContext2D) => {
      const linkY = 1000;
      const linkSpacing = 300;
      const startX = 240;
      
      ctx.fillStyle = '#ffd700';
      ctx.font = `20px ${fonts.textFont}`;
      ctx.textAlign = 'left';
      
      // Telegram
      ctx.fillText('📱 ' + socialLinks.telegram, startX, linkY);
      
      // Instagram  
      ctx.fillText('📷 ' + socialLinks.instagram, startX + linkSpacing, linkY);
      
      // TikTok
      ctx.fillText('🎵 ' + socialLinks.tiktok, startX + (linkSpacing * 2), linkY);
    };

    const drawTemplate = (ctx: CanvasRenderingContext2D, template: any, title: string, mainText: string, quotedText: string) => {
      // Draw decorative elements
      if (template.decorations) {
        template.decorations.forEach((decoration: any) => {
          if (decoration.type === 'halo') {
            drawHalo(ctx, decoration);
          } else if (decoration.type === 'border') {
            drawBorder(ctx, decoration);
          }
        });
      }

      // Draw title with golden gradient effect
      drawGoldenText(ctx, title, template.fonts.titleSize, fonts.titleFont, 540, textPositions.titleY, 800, template.fonts.titleSize * 1.2, true);

      // Draw main text with enhanced styling
      ctx.fillStyle = template.colors.textColor;
      ctx.font = `${template.fonts.textSize}px ${fonts.textFont}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Add text shadow for better visibility
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      wrapText(ctx, mainText, 540, textPositions.textY, 700, template.fonts.textSize * 1.5);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Draw quoted text if provided
      if (quotedText.trim()) {
        drawQuoteBox(ctx, template, quotedText);
      }
    };

    const drawGoldenText = (ctx: CanvasRenderingContext2D, text: string, fontSize: number, fontFamily: string, x: number, y: number, maxWidth: number, lineHeight: number, isTitle: boolean = false) => {
      ctx.font = `${isTitle ? 'bold' : ''} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Create golden gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + fontSize);
      gradient.addColorStop(0, '#ffd700');
      gradient.addColorStop(0.3, '#ffed4e');  
      gradient.addColorStop(0.7, '#d97706');
      gradient.addColorStop(1, '#b45309');
      
      ctx.fillStyle = gradient;
      
      // Add strong shadow for visibility
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      
      wrapText(ctx, text, x, y, maxWidth, lineHeight);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

    const drawHalo = (ctx: CanvasRenderingContext2D, decoration: any) => {
      ctx.strokeStyle = decoration.color;
      ctx.lineWidth = decoration.width;
      ctx.beginPath();
      ctx.arc(decoration.x, decoration.y, decoration.radius, 0, 2 * Math.PI);
      ctx.stroke();
    };

    const drawBorder = (ctx: CanvasRenderingContext2D, decoration: any) => {
      ctx.strokeStyle = decoration.color;
      ctx.lineWidth = decoration.width;
      ctx.strokeRect(decoration.x, decoration.y, decoration.width, decoration.height);
    };

    const drawQuoteBox = (ctx: CanvasRenderingContext2D, template: any, text: string) => {
      const boxX = (1080 - quoteBoxSize.width) / 2;
      const boxY = textPositions.quoteY;

      // Draw quote background with enhanced styling
      ctx.fillStyle = template.colors.quoteBackground;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, quoteBoxSize.width, quoteBoxSize.height, 20);
      ctx.fill();

      // Draw quote border with glow effect
      ctx.strokeStyle = template.colors.quoteBorder;
      ctx.lineWidth = 3;
      ctx.shadowColor = template.colors.quoteBorder;
      ctx.shadowBlur = 10;
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Draw quote text with golden gradient
      drawGoldenText(ctx, `"${text}"`, template.fonts.quoteSize, fonts.quoteFont, boxX + quoteBoxSize.width / 2, boxY + 50, quoteBoxSize.width - 40, template.fonts.quoteSize * 1.4);
    };

    const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
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
