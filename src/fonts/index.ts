import localFont from "next/font/local";

export const railway = localFont({
  src: [
    {
      path: "./railway/Raleway-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./railway/Raleway-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-railway",
  display: "swap",
});
