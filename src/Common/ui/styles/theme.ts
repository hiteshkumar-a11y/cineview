export interface AppTheme {
    colors: {
      bg: string;
      surface: string;
      surfaceHover: string;
      card: string;
      border: string;
      text: string;
      textMuted: string;
      accent: string;
      accentHover: string;
      success: string;
      error: string;
      warning: string;
    };
    radius: {
      sm: string;
      md: string;
      lg: string;
      pill: string;
    };
    shadow: {
      card: string;
      nav: string;
    };
    layout: {
      maxWidth: string;
      navHeight: string;
      pagePadding: string;
    };
    font: {
      body: string;
    };
  }