import React, { forwardRef, useImperativeHandle } from 'react';

export interface PosterCanvasProps {
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
  elementSizes: {
    socialLinksSize: number;
    additionalIconsSize: number;
    bottomTextSize: number;
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
      elementSizes
    },
    ref
  ) => {
    useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement);

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions
      const width = 1080;
      const height = 1080;
      canvas.width = width;
      canvas.height = height;

      // Function to draw rounded rectangle
      const drawRoundedRect = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number
      ) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
      };

      // Function to apply frame style
      const applyFrameStyle = (
        ctx: CanvasRenderingContext2D,
        frameStyle: string,
        width: number,
        height: number
      ) => {
        ctx.save(); // Save the current state

        switch (frameStyle) {
          case 'simple':
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.strokeRect(0, 0, width, height);
            break;
          case 'elegant':
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.strokeRect(10, 10, width - 20, height - 20);
            break;
          case 'bold':
            ctx.lineWidth = 12;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.strokeRect(0, 0, width, height);
            break;
          case 'rounded':
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineJoin = 'round';
            ctx.strokeRect(10, 10, width - 20, height - 20);
            break;
          case 'double':
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.strokeRect(5, 5, width - 10, height - 10);
            ctx.strokeRect(15, 15, width - 30, height - 30);
            break;
          case 'dashed':
            ctx.lineWidth = 6;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.setLineDash([15, 10]);
            ctx.strokeRect(0, 0, width, height);
            ctx.setLineDash([]);
            break;
          case 'dotted':
            ctx.lineWidth = 6;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.setLineDash([3, 12]);
            ctx.strokeRect(0, 0, width, height);
            ctx.setLineDash([]);
            break;
          case 'shadow':
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.strokeRect(10, 10, width - 20, height - 20);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            break;
          case 'glow':
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.shadowBlur = 30;
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.strokeRect(10, 10, width - 20, height - 20);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            break;
          case 'vintage':
            ctx.lineWidth = 6;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.strokeRect(20, 20, width - 40, height - 40);
            ctx.lineWidth = 2;
            ctx.strokeRect(40, 40, width - 80, height - 80);
            break;
          case 'modern':
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.strokeRect(0, 0, width / 2, height);
            ctx.strokeRect(width / 2, 0, width / 2, height);
            break;
          case 'neon':
            ctx.shadowColor = 'rgba(0, 255, 255, 0.9)';
            ctx.shadowBlur = 20;
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.9)';
            ctx.strokeRect(10, 10, width - 20, height - 20);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            break;
          case 'artistic':
            ctx.lineWidth = 6;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.moveTo(30, 30);
            ctx.lineTo(width - 30, 30);
            ctx.lineTo(width - 50, height - 50);
            ctx.lineTo(50, height - 50);
            ctx.closePath();
            ctx.stroke();
            break;
          case 'minimal':
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.strokeRect(width / 4, height / 4, width / 2, height / 2);
            break;
          case 'partial-top-right':
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.strokeRect(0, 0, width / 2, height / 2);
            break;
          case 'partial-bottom-left':
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.strokeRect(width / 2, height / 2, width / 2, height / 2);
            break;
          case 'partial-diagonal':
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(width / 2, 0);
            ctx.lineTo(width, height / 2);
            ctx.lineTo(width, height);
            ctx.lineTo(width / 2, height);
            ctx.lineTo(0, height / 2);
            ctx.closePath();
            ctx.stroke();
            break;
          default:
            break;
        }

        ctx.restore(); // Restore the saved state
      };

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw background image
      if (backgroundImage) {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
          const imageWidth = img.width * imageCrop.scale;
          const imageHeight = img.height * imageCrop.scale;
          const offsetX = (imageWidth - width) / 2 + imageCrop.x;
          const offsetY = (imageHeight - height) / 2 + imageCrop.y;

          ctx.drawImage(
            img,
            -offsetX,
            -offsetY,
            imageWidth,
            imageHeight,
            0,
            0,
            width,
            height
          );

          // Apply gradient overlay
          const gradient = ctx.createLinearGradient(
            0,
            height - gradientHeight,
            0,
            height
          );
          gradient.addColorStop(
            0,
            `rgba(0, 0, 0, ${gradientStrength / 100})`
          );
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, height - gradientHeight, width, gradientHeight);

          // Apply inner gradient overlay
          const innerGradient = ctx.createLinearGradient(
            0,
            height - gradientHeight,
            0,
            height - gradientHeight + gradientInnerHeight
          );
          innerGradient.addColorStop(
            0,
            `rgba(0, 0, 0, ${gradientStrength / 100})`
          );
          innerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = innerGradient;
          ctx.fillRect(
            0,
            height - gradientHeight,
            width,
            gradientHeight
          );

          // Draw title
          ctx.font = `${fontSizes.titleSize}px ${
            customFonts.titleFont ? 'CustomTitleFont' : fonts.titleFont
          }`;
          ctx.fillStyle =
            textColors.titleColor === 'gradient'
              ? 'white'
              : textColors.titleColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          if (customFonts.titleFont) {
            const fontFace = new FontFace(
              'CustomTitleFont',
              `url(${customFonts.titleFont})`
            );
            fontFace
              .load()
              .then((loadedFontFace) => {
                document.fonts.add(loadedFontFace);
                ctx.font = `${fontSizes.titleSize}px CustomTitleFont`;
                ctx.fillText(title, width / 2, textPositions.titleY);
              })
              .catch((error) =>
                console.error('Error loading custom title font:', error)
              );
          } else {
            ctx.fillText(title, width / 2, textPositions.titleY);
          }

          // Draw main text
          ctx.font = `${fontSizes.textSize}px ${
            customFonts.textFont ? 'CustomTextFont' : fonts.textFont
          }`;
          ctx.fillStyle =
            textColors.textColor === 'gradient' ? 'white' : textColors.textColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          const words = mainText.split(' ');
          let line = '';
          let y = textPositions.textY;
          const lineHeight = fontSizes.textSize * 1.2;

          if (customFonts.textFont) {
            const fontFace = new FontFace(
              'CustomTextFont',
              `url(${customFonts.textFont})`
            );
            fontFace
              .load()
              .then((loadedFontFace) => {
                document.fonts.add(loadedFontFace);
                ctx.font = `${fontSizes.textSize}px CustomTextFont`;

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
              })
              .catch((error) =>
                console.error('Error loading custom text font:', error)
              );
          } else {
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
          }

          // Draw quote box
          if (quoteBoxStyle !== 'none') {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const x = width / 2 - quoteBoxSize.width / 2;
            const y = textPositions.quoteY - quoteBoxSize.height / 2;

            if (quoteBoxStyle === 'rounded') {
              drawRoundedRect(
                ctx,
                x,
                y,
                quoteBoxSize.width,
                quoteBoxSize.height,
                20
              );
            } else {
              ctx.fillRect(x, y, quoteBoxSize.width, quoteBoxSize.height);
            }

            // Draw quoted text
            ctx.font = `${fontSizes.quoteSize}px ${
              customFonts.quoteFont ? 'CustomQuoteFont' : fonts.quoteFont
            }`;
            ctx.fillStyle =
              textColors.quoteColor === 'gradient'
                ? 'white'
                : textColors.quoteColor;

            const quoteWords = quotedText.split(' ');
            let quoteLine = '';
            let quoteY = textPositions.quoteY - fontSizes.quoteSize / 2;
            const quoteLineHeight = fontSizes.quoteSize * 1.2;

            if (customFonts.quoteFont) {
              const fontFace = new FontFace(
                'CustomQuoteFont',
                `url(${customFonts.quoteFont})`
              );
              fontFace
                .load()
                .then((loadedFontFace) => {
                  document.fonts.add(loadedFontFace);
                  ctx.font = `${fontSizes.quoteSize}px CustomQuoteFont`;

                  for (let n = 0; n < quoteWords.length; n++) {
                    const testLine = quoteLine + quoteWords[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    const testWidth = metrics.width;
                    if (testWidth > quoteBoxSize.width - 40 && n > 0) {
                      ctx.fillText(quoteLine, width / 2, quoteY);
                      quoteLine = quoteWords[n] + ' ';
                      quoteY += quoteLineHeight;
                    } else {
                      quoteLine = testLine;
                    }
                  }
                  ctx.fillText(quoteLine, width / 2, quoteY);
                })
                .catch((error) =>
                  console.error('Error loading custom quote font:', error)
                );
            } else {
              for (let n = 0; n < quoteWords.length; n++) {
                const testLine = quoteLine + quoteWords[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > quoteBoxSize.width - 40 && n > 0) {
                  ctx.fillText(quoteLine, width / 2, quoteY);
                  quoteLine = quoteWords[n] + ' ';
                  quoteY += quoteLineHeight;
                } else {
                  quoteLine = testLine;
                }
              }
              ctx.fillText(quoteLine, width / 2, quoteY);
            }
          }

          // Draw additional icons
          ctx.textAlign = 'left';
          ctx.textBaseline = 'bottom';
          ctx.font = `${elementSizes.additionalIconsSize}px ${
            customFonts.topBottomFont ? 'CustomTopBottomFont' : fonts.topBottomFont
          }`;
          ctx.fillStyle =
            textColors.topBottomColor === 'gradient'
              ? 'white'
              : textColors.topBottomColor;

          const iconSize = elementSizes.additionalIconsSize;
          let currentX = 100;

          if (customFonts.topBottomFont) {
            const fontFace = new FontFace(
              'CustomTopBottomFont',
              `url(${customFonts.topBottomFont})`
            );
            fontFace
              .load()
              .then((loadedFontFace) => {
                document.fonts.add(loadedFontFace);
                ctx.font = `${elementSizes.additionalIconsSize}px CustomTopBottomFont`;

                const drawIconText = (
                  iconSrc: string,
                  text: string,
                  x: number
                ) => {
                  const img = new Image();
                  img.src = iconSrc;
                  img.onload = () => {
                    ctx.drawImage(
                      img,
                      x,
                      additionalIconsY - iconSize,
                      iconSize,
                      iconSize
                    );
                    ctx.fillText(text, x + iconSize + 5, additionalIconsY);
                  };
                };

                drawIconText(
                  '/lovable-uploads/1f6bc006-c641-4689-8e9e-e9da10e585d8.png',
                  additionalIcons.place,
                  currentX
                );
                currentX +=
                  ctx.measureText(additionalIcons.place).width +
                  iconSize +
                  5 +
                  additionalIconsGap;

                drawIconText(
                  '/lovable-uploads/7475de3f-f477-4f7d-8688-911c55de8ea9.png',
                  additionalIcons.time,
                  currentX
                );
                currentX +=
                  ctx.measureText(additionalIcons.time).width +
                  iconSize +
                  5 +
                  additionalIconsGap;

                drawIconText(
                  '/lovable-uploads/6efc2e61-1d10-4ca2-8a06-0d41a15e2b7d.png',
                  additionalIcons.date,
                  currentX
                );
              })
              .catch((error) =>
                console.error('Error loading custom top/bottom font:', error)
              );
          } else {
            const drawIconText = (iconSrc: string, text: string, x: number) => {
              const img = new Image();
              img.src = iconSrc;
              img.onload = () => {
                ctx.drawImage(
                  img,
                  x,
                  additionalIconsY - iconSize,
                  iconSize,
                  iconSize
                );
                ctx.fillText(text, x + iconSize + 5, additionalIconsY);
              };
            };

            drawIconText(
              '/lovable-uploads/1f6bc006-c641-4689-8e9e-e9da10e585d8.png',
              additionalIcons.place,
              currentX
            );
            currentX +=
              ctx.measureText(additionalIcons.place).width +
              iconSize +
              5 +
              additionalIconsGap;

            drawIconText(
              '/lovable-uploads/7475de3f-f477-4f7d-8688-911c55de8ea9.png',
              additionalIcons.time,
              currentX
            );
            currentX +=
              ctx.measureText(additionalIcons.time).width +
              iconSize +
              5 +
              additionalIconsGap;

            drawIconText(
              '/lovable-uploads/6efc2e61-1d10-4ca2-8a06-0d41a15e2b7d.png',
              additionalIcons.date,
              currentX
            );
          }

          // Draw social media links
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          const socialIconSize = elementSizes.socialLinksSize;
          let startX = socialLinksPosition.x - (socialLinksGap * 1.5 + socialIconSize * 1.5); // Adjusted calculation
          const socialY = socialLinksPosition.y;

          const drawSocialIcon = (iconSrc: string, link: string, x: number) => {
            if (link && link !== '@username') {
              const img = new Image();
              img.src = iconSrc;
              img.onload = () => {
                ctx.drawImage(img, x, socialY - socialIconSize, socialIconSize, socialIconSize);
              };
            }
          };

          drawSocialIcon(
            '/lovable-uploads/f6463394-9a58-499b-a89b-79ca45a9074a.png',
            socialLinks.telegram,
            startX
          );
          startX += socialLinksGap;

          drawSocialIcon(
            '/lovable-uploads/66659999-5839-469d-985f-9859109db09b.png',
            socialLinks.instagram,
            startX
          );
          startX += socialLinksGap;

          drawSocialIcon(
            '/lovable-uploads/86386999-943d-4c29-b644-8534e4496665.png',
            socialLinks.tiktok,
            startX
          );

          // Draw bottom bilingual text
          if (bilingualEnabled) {
            ctx.font = `${elementSizes.bottomTextSize}px ${
              customFonts.topBottomFont ? 'CustomTopBottomFont' : fonts.topBottomFont
            }`;
            ctx.fillStyle =
              textColors.topBottomColor === 'gradient'
                ? 'white'
                : textColors.topBottomColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            const bottomText =
              language === 'amharic'
                ? 'በቴድሮስ ተሾመ የተሰራ'
                : 'Tedros Teshomen hojjatame';

            if (customFonts.topBottomFont) {
              const fontFace = new FontFace(
                'CustomTopBottomFont',
                `url(${customFonts.topBottomFont})`
              );
              fontFace
                .load()
                .then((loadedFontFace) => {
                  document.fonts.add(loadedFontFace);
                  ctx.font = `${elementSizes.bottomTextSize}px CustomTopBottomFont`;
                  ctx.fillText(
                    bottomText,
                    bottomTextPosition.x,
                    bottomTextPosition.y
                  );
                })
                .catch((error) =>
                  console.error('Error loading custom top/bottom font:', error)
                );
            } else {
              ctx.fillText(
                bottomText,
                bottomTextPosition.x,
                bottomTextPosition.y
              );
            }
          }

          // Draw clipart
          if (clipart.image) {
            const clipImg = new Image();
            clipImg.src = clipart.image;
            clipImg.onload = () => {
              ctx.drawImage(
                clipImg,
                clipart.x - clipart.width / 2,
                clipart.y - clipart.height / 2,
                clipart.width,
                clipart.height
              );
            };
          }

          // Apply frame style
          applyFrameStyle(ctx, frameStyle, width, height);
        };
      }
    }, [
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
      elementSizes
    ]);

    return <canvas ref={canvasRef} />;
  }
);
