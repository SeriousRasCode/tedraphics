
export const templates: Record<number, {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    titleColor: string;
    textColor: string;
    quoteBackground: string;
    quoteBorder: string;
    quoteTextColor: string;
  };
  gradients: {
    top: {
      color1: string;
      opacity1: number;
      color2: string;
      opacity2: number;
    };
    bottom: {
      color1: string;
      opacity1: number;
      color2: string;
      opacity2: number;
    };
  };
  background: string;
}> = {
  1: {
    name: "Royal Blue",
    colors: {
      primary: "#1e3a8a",
      secondary: "#3b82f6",
      titleColor: "gradient",
      textColor: "#ffffff",
      quoteBackground: "rgba(255, 255, 255, 0.1)",
      quoteBorder: "#3b82f6",
      quoteTextColor: "#ffffff"
    },
    gradients: {
      top: { color1: "#083765", opacity1: 80, color2: "#1e40af", opacity2: 40 },
      bottom: { color1: "#1e40af", opacity1: 60, color2: "#083765", opacity2: 90 }
    },
    background: "#1e3a8a"
  },
  2: {
    name: "Golden Elegance",
    colors: {
      primary: "#92400e",
      secondary: "#fbbf24",
      titleColor: "gradient",
      textColor: "#ffffff",
      quoteBackground: "rgba(255, 255, 255, 0.1)",
      quoteBorder: "#fbbf24",
      quoteTextColor: "#ffffff"
    },
    gradients: {
      top: { color1: "#78350f", opacity1: 85, color2: "#b45309", opacity2: 40 },
      bottom: { color1: "#b45309", opacity1: 50, color2: "#78350f", opacity2: 90 }
    },
    background: "#78350f"
  },
  3: {
    name: "Emerald Night",
    colors: {
      primary: "#064e3b",
      secondary: "#10b981",
      titleColor: "gradient",
      textColor: "#d1fae5",
      quoteBackground: "rgba(16, 185, 129, 0.1)",
      quoteBorder: "#10b981",
      quoteTextColor: "#d1fae5"
    },
    gradients: {
      top: { color1: "#022c22", opacity1: 85, color2: "#064e3b", opacity2: 40 },
      bottom: { color1: "#064e3b", opacity1: 50, color2: "#022c22", opacity2: 90 }
    },
    background: "#064e3b"
  },
  4: {
    name: "Crimson Flame",
    colors: {
      primary: "#7f1d1d",
      secondary: "#ef4444",
      titleColor: "gradient",
      textColor: "#fecaca",
      quoteBackground: "rgba(239, 68, 68, 0.1)",
      quoteBorder: "#ef4444",
      quoteTextColor: "#fecaca"
    },
    gradients: {
      top: { color1: "#450a0a", opacity1: 85, color2: "#991b1b", opacity2: 40 },
      bottom: { color1: "#991b1b", opacity1: 50, color2: "#450a0a", opacity2: 90 }
    },
    background: "#7f1d1d"
  },
  5: {
    name: "Purple Royale",
    colors: {
      primary: "#581c87",
      secondary: "#a855f7",
      titleColor: "gradient",
      textColor: "#e9d5ff",
      quoteBackground: "rgba(168, 85, 247, 0.1)",
      quoteBorder: "#a855f7",
      quoteTextColor: "#e9d5ff"
    },
    gradients: {
      top: { color1: "#3b0764", opacity1: 85, color2: "#6b21a8", opacity2: 40 },
      bottom: { color1: "#6b21a8", opacity1: 50, color2: "#3b0764", opacity2: 90 }
    },
    background: "#581c87"
  },
  6: {
    name: "Midnight Black",
    colors: {
      primary: "#0a0a0a",
      secondary: "#525252",
      titleColor: "#ffffff",
      textColor: "#d4d4d4",
      quoteBackground: "rgba(255, 255, 255, 0.05)",
      quoteBorder: "#525252",
      quoteTextColor: "#d4d4d4"
    },
    gradients: {
      top: { color1: "#000000", opacity1: 90, color2: "#171717", opacity2: 40 },
      bottom: { color1: "#171717", opacity1: 50, color2: "#000000", opacity2: 95 }
    },
    background: "#0a0a0a"
  }
};
