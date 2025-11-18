// Uncomment when MUI installed
// import { type ThemeOptions, darken, lighten, type PaletteMode } from "@mui/material";
// import { red, orange, teal, green } from "@mui/material/colors";

/* -------------------------------------------------------------------------- */
/*                               COLOR PALETTE                                */
/* -------------------------------------------------------------------------- */

/** Primary */
export const PRIMARY_MAIN = "";
export const PRIMARY_LIGHT = lighten(PRIMARY_MAIN, 0.2);
export const PRIMARY_DARK = darken(PRIMARY_MAIN, 0.2);

/** Secondary */
export const SECONDARY_MAIN = "";
export const SECONDARY_LIGHT = lighten(SECONDARY_MAIN, 0.2);
export const SECONDARY_DARK = darken(SECONDARY_MAIN, 0.2);

/** Status Colors */
export const ERROR_MAIN = red.A400;
export const WARNING_MAIN = orange.A400;
export const INFO_MAIN = teal.A400;
export const SUCCESS_MAIN = green.A400;

/* -------------------------------------------------------------------------- */
/*                              TYPOGRAPHY SETTINGS                           */
/* -------------------------------------------------------------------------- */

export const HEADER_FONT = ""; 
export const BODY_FONT = "";
export const SUBHEADER_FONT = "";
export const SUBTITLE_FONT = "";
export const MONOSPACE_FONT = "";

export const BODY_FONT_WEIGHT = 400;
export const HEADER_FONT_WEIGHT = 700;
export const SUBHEADER_FONT_WEIGHT = 600;
export const SUBTITLE_FONT_WEIGHT = 500;

/* -------------------------------------------------------------------------- */
/*                        LIGHT / DARK PALETTE SELECTOR                       */
/* -------------------------------------------------------------------------- */

const getBackground = (mode: PaletteMode) =>
  mode === "light"
    ? {
        default: "#fafafa",
        paper: "#ffffff",
      }
    : {
        default: "#121212",
        paper: "#1a1a1a",
      };

const getTextColors = (mode: PaletteMode) =>
  mode === "light"
    ? {
        primary: "#111111",
        secondary: "#555555",
        disabled: "#9ea0a6",
      }
    : {
        primary: "#ffffff",
        secondary: "#bdbdbd",
        disabled: "#7a7a7a",
      };

const getPrimaryColors = (mode: PaletteMode) =>
  mode === "light"
    ? {
        main: PRIMARY_MAIN,
        light: PRIMARY_LIGHT,
        dark: PRIMARY_DARK,
      }
    : {
        main: PRIMARY_LIGHT, // optional: lighten for dark mode
        light: lighten(PRIMARY_LIGHT, 0.15),
        dark: PRIMARY_MAIN,
      };

const getSecondaryColors = (mode: PaletteMode) =>
  mode === "light"
    ? {
        main: SECONDARY_MAIN,
        light: SECONDARY_LIGHT,
        dark: SECONDARY_DARK,
      }
    : {
        main: SECONDARY_LIGHT,
        light: lighten(SECONDARY_LIGHT, 0.15),
        dark: SECONDARY_MAIN,
      };

/* -------------------------------------------------------------------------- */
/*                       BASE THEME CONFIGURATION (UPDATED)                   */
/* -------------------------------------------------------------------------- */

export const getTheme = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,

    primary: getPrimaryColors(mode),
    secondary: getSecondaryColors(mode),

    error: { main: ERROR_MAIN },
    warning: { main: WARNING_MAIN },
    info: { main: INFO_MAIN },
    success: { main: SUCCESS_MAIN },

    background: getBackground(mode),
    text: getTextColors(mode),
  },

  typography: {
    fontFamily: BODY_FONT,

    h1: {
      fontFamily: HEADER_FONT,
      fontWeight: HEADER_FONT_WEIGHT,
      fontSize: "3rem",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: HEADER_FONT,
      fontWeight: HEADER_FONT_WEIGHT,
      fontSize: "2.25rem",
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: SUBHEADER_FONT || HEADER_FONT,
      fontWeight: SUBHEADER_FONT_WEIGHT,
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: SUBHEADER_FONT || HEADER_FONT,
      fontWeight: SUBHEADER_FONT_WEIGHT,
      fontSize: "1.5rem",
    },
    h5: {
      fontFamily: SUBTITLE_FONT || BODY_FONT,
      fontWeight: SUBTITLE_FONT_WEIGHT,
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: SUBTITLE_FONT || BODY_FONT,
      fontWeight: SUBTITLE_FONT_WEIGHT,
      fontSize: "1.1rem",
    },

    body1: {
      fontFamily: BODY_FONT,
      fontWeight: BODY_FONT_WEIGHT,
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: BODY_FONT,
      fontWeight: BODY_FONT_WEIGHT,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },

    caption: {
      fontFamily: BODY_FONT,
      fontSize: "0.75rem",
      opacity: 0.8,
    },

    button: {
      fontFamily: BODY_FONT,
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 8,
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingLeft: 16,
          paddingRight: 16,
          transition: "0.2s",
        },
        containedPrimary: {
          color: "#fff",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor:
            mode === "light" ? PRIMARY_MAIN : "#000000", // optional
        },
      },
    },
  },
});
