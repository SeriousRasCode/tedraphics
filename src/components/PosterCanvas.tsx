
import React, { useRef, useEffect, forwardRef } from 'react';
import { templates } from '@/utils/posterTemplates';

interface PosterCanvasProps {
  backgroundImage: string | null;
  title: string;
  mainText: string;
  quotedText: string;
  template: number;
}

export const PosterCanvas = forwardRef<HTMLCanvasElement, PosterCanvasProps>(
  ({ backgroundImage, title, mainText, quotedText, template }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
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
          
          // Apply template styling
          drawTemplate(ctx, currentTemplate, title, mainText, quotedText);
        };
        img.src = backgroundImage;
      } else {
        // Draw default gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, currentTemplate.colors.primary);
        gradient.addColorStop(1, currentTemplate.colors.secondary);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawTemplate(ctx, currentTemplate, title, mainText, quotedText);
      }
    }, [backgroundImage, title, mainText, quotedText, template]);

    const drawTemplate = (ctx: CanvasRenderingContext2D, template: any, title: string, mainText: string, quotedText: string) => {
      // Apply overlay
      if (template.overlay) {
        const overlayGradient = ctx.createLinearGradient(0, 0, 0, 1080);
        overlayGradient.addColorStop(0, template.overlay.start);
        overlayGradient.addColorStop(1, template.overlay.end);
        
        ctx.fillStyle = overlayGradient;
        ctx.fillRect(0, 0, 1080, 1080);
      }

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

      // Draw title
      ctx.fillStyle = template.colors.titleColor;
      ctx.font = `bold ${template.fonts.titleSize}px ${template.fonts.titleFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Add text shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      wrapText(ctx, title, 540, template.layout.titleY, 800, template.fonts.titleSize * 1.2);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Draw main text
      ctx.fillStyle = template.colors.textColor;
      ctx.font = `${template.fonts.textSize}px ${template.fonts.textFamily}`;
      wrapText(ctx, mainText, 540, template.layout.textY, 700, template.fonts.textSize * 1.5);

      // Draw quoted text if provided
      if (quotedText.trim()) {
        drawQuoteBox(ctx, template, quotedText);
      }
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
      const boxWidth = 600;
      const boxHeight = 150;
      const boxX = 240;
      const boxY = template.layout.quoteY;

      // Draw quote background
      ctx.fillStyle = template.colors.quoteBackground;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 20);
      ctx.fill();

      // Draw quote border
      ctx.strokeStyle = template.colors.quoteBorder;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw quote text
      ctx.fillStyle = template.colors.quoteTextColor;
      ctx.font = `italic ${template.fonts.quoteSize}px ${template.fonts.quoteFamily}`;
      ctx.textAlign = 'center';
      
      wrapText(ctx, `"${text}"`, boxX + boxWidth / 2, boxY + 40, boxWidth - 40, template.fonts.quoteSize * 1.4);
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
