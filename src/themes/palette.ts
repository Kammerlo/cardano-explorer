import { alpha } from "@mui/material";

import { ThemeType } from "../types/user";

export const createGradient = (deg: number, startColor: string, endColor: string, start = 0, end = 100): string => {
  return `linear-gradient(${deg}deg, ${startColor} ${start}%, ${endColor} ${end}%)`;
};

const COMMON = {
  black: "#000000",
  white: "#FFFFFF"
};

const GREY = {
  200: "#E3E5E9",
  300: "#50596D",
  400: "#141520",
  500: "#F6F6F6",
  A100: "#A3A3A3",
  A200: "#E7E8E9",
  A400: "#B7B7B7"
};

const RED = {
  100: "#B60000",
  100_15: alpha("#B60000", 0.15),
  100_20: alpha("#B60000", 0.2)
};

const YELLOW = {
  100: "#7A501D",
  100_15: alpha("#7A501D", 0.15)
};

const BLUE = {
  100: "#0048DB",
  100_7: alpha("#0048DB", 0.07),
  100_10: alpha("#0048DB", 0.1),
  100_20: alpha("#0048DB", 0.2)
};

const PURPLE = {
  100: "#E3E2FC",
  200: "#6866D4"
};

const primary = {
  100: "#F6F9FF",
  200: "#D6E2FF",
  500: "#5C8DFF",
  main: "#0033AD",
  dark: "#001F66",
  contrastText: "#fff"
};

const secondary = {
  dark: GREY[300],

  0: "#FFFFFF",
  600: "#6C6F89",
  light: "#434656",
  main: "#24262E",
  contrastText: COMMON.white
};

const text = {
  primary: GREY[400],
  secondary: GREY[300],
  disabled: alpha(GREY[300], 0.4),
  hint: GREY[300],
  dark: COMMON.black
};

const border = {
  primary: "#E3E5E9",
  main: GREY[200],
  disabled: GREY[300],
  hint: "#C8CDD8",
  block: "#438F68",
  line: alpha(COMMON.black, 0.1)
};
const background = {
  paper: COMMON.white,
  default: "#F7F7F7",
  neutral: GREY["A200"]
};

const error = {
  100: "#FFEBEE",
  700: "#C20024",
  contrastText: COMMON.white,

  light: RED[100_15],
  main: RED[100],
  dark: RED[100]
};
const warning = {
  100: "#FEF8EC",
  700: "#F6C667",
  800: "#744F07",
  contrastText: COMMON.white,

  light: YELLOW[100_15],
  main: YELLOW[100],
  dark: YELLOW[100]
};

const info = {
  light: BLUE[100_20],
  main: BLUE[100],
  dark: BLUE[100],
  contrastText: COMMON.white
};

const success = {
  100: "#EDFCF8",
  700: "#1EC198",
  800: "#116A54",
  contrastText: COMMON.white,
  main: "#116A54"
};

const GRADIENTS = {
  0: "linear-gradient(263.55deg, #5A9C56 0%, #184C78 100%)",
  1: "linear-gradient(0deg, #5A9C56 0%, #184C78 100%)",
  2: "linear-gradient(90deg, #2193B0 0%, #6DD5ED 100%)",
  3: "linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)",
  4: "linear-gradient(90deg, #E65C00 0%, #F9D423 100%)",
  5: "linear-gradient(90deg, #A770EF 0%, #CF8BF3 37.85%, #FDB99B 100%)",
  6: "linear-gradient(90deg, #F2709C 0%, #FF9472 100%)",
  7: "linear-gradient(90deg, #8E9EAB 0%, #EEF2F3 100%)",
  8: "linear-gradient(0deg, #FFFFFF00 0%, #FFFFFF40 50%, #FFFFFF00 100%)",
  9: "linear-gradient(52.78deg, #5A9C56 20.64%, #184C78 73.83%)"
};

const customPalette = {
  common: COMMON,
  primary,
  secondary,
  error,
  warning,
  info,
  success,
  grey: GREY,
  text,
  background,
  blue: BLUE,
  red: RED,
  yellow: YELLOW,
  purple: PURPLE,
  gradient: GRADIENTS,
  border
};

export type CustomPalette = {
  [Key in keyof typeof customPalette]: (typeof customPalette)[Key];
};

export type CustomTypeText = {
  [Key in keyof typeof text]: (typeof text)[Key];
};

export type CustomTypeBackground = {
  [Key in keyof typeof background]: (typeof background)[Key];
};

declare module "@mui/material" {
  type Palette = CustomPalette;
  type PaletteOptions = CustomPalette;
  type TypeText = CustomTypeText;
  type TypeBackground = CustomTypeBackground;
}

declare module "@emotion/react" {
  type Palette = CustomPalette;
  type PaletteOptions = CustomPalette;
  type TypeText = CustomTypeText;
  type TypeBackground = CustomTypeBackground;
}

const light: CustomPalette = {
  ...customPalette
};

const dark: CustomPalette = {
  ...customPalette
};

const palette: { [key in ThemeType]: CustomPalette } = {
  light,
  dark
};

export default palette;
