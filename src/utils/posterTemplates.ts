
export const templates = {
  1: {
    name: "Classical Blue",
    colors: {
      primary: "#1e3a8a",
      secondary: "#fbbf24",
      titleColor: "#fbbf24",
      textColor: "#ffffff",
      quoteBackground: "rgba(251, 191, 36, 0.2)",
      quoteBorder: "#fbbf24",
      quoteTextColor: "#fbbf24"
    },
    fonts: {
      titleFamily: "Georgia, serif",
      titleSize: 72,
      textFamily: "Georgia, serif",
      textSize: 32,
      quoteFamily: "Georgia, serif",
      quoteSize: 28
    },
    layout: {
      titleY: 80,
      textY: 300,
      quoteY: 750
    },
    overlay: {
      start: "rgba(30, 58, 138, 0.7)",
      end: "rgba(30, 58, 138, 0.4)"
    },
    decorations: [
      {
        type: "halo",
        x: 540,
        y: 200,
        radius: 80,
        color: "#fbbf24",
        width: 3
      },
      {
        type: "border",
        x: 40,
        y: 40,
        width: 1000,
        height: 1000,
        color: "#fbbf24"
      }
    ]
  },
  2: {
    name: "Golden Elegance",
    colors: {
      primary: "#92400e",
      secondary: "#fbbf24",
      titleColor: "#fbbf24",
      textColor: "#ffffff",
      quoteBackground: "rgba(255, 255, 255, 0.1)",
      quoteBorder: "#fbbf24",
      quoteTextColor: "#ffffff"
    },
    fonts: {
      titleFamily: "Georgia, serif",
      titleSize: 68,
      textFamily: "Arial, sans-serif",
      textSize: 30,
      quoteFamily: "Georgia, serif",
      quoteSize: 26
    },
    layout: {
      titleY: 100,
      textY: 350,
      quoteY: 780
    },
    overlay: {
      start: "rgba(146, 64, 14, 0.8)",
      end: "rgba(251, 191, 36, 0.3)"
    },
    decorations: [
      {
        type: "halo",
        x: 540,
        y: 240,
        radius: 100,
        color: "#fbbf24",
        width: 2
      }
    ]
  },
  3: {
    name: "Royal Purple",
    colors: {
      primary: "#581c87",
      secondary: "#a855f7",
      titleColor: "#fbbf24",
      textColor: "#ffffff",
      quoteBackground: "rgba(168, 85, 247, 0.3)",
      quoteBorder: "#a855f7",
      quoteTextColor: "#ffffff"
    },
    fonts: {
      titleFamily: "Georgia, serif",
      titleSize: 70,
      textFamily: "Georgia, serif",
      textSize: 32,
      quoteFamily: "Georgia, serif",
      quoteSize: 28
    },
    layout: {
      titleY: 90,
      textY: 320,
      quoteY: 760
    },
    overlay: {
      start: "rgba(88, 28, 135, 0.7)",
      end: "rgba(168, 85, 247, 0.4)"
    },
    decorations: [
      {
        type: "halo",
        x: 540,
        y: 220,
        radius: 90,
        color: "#fbbf24",
        width: 3
      },
      {
        type: "border",
        x: 50,
        y: 50,
        width: 980,
        height: 980,
        color: "#a855f7"
      }
    ]
  }
};
