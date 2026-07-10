/** @type {import('tailwindcss').Config} */

import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindFormPlugin from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: ["class", '[class="dark-mode"]'],

  theme: {
    extend: {
      colors: {
        primary: {
          900: withOpacity("--color-primary-900"),
          800: withOpacity("--color-primary-800"),
          700: withOpacity("--color-primary-700"),
          600: withOpacity("--color-primary-600"),
          500: withOpacity("--color-primary-500"),
          400: withOpacity("--color-primary-400"),
          300: withOpacity("--color-primary-300"),
          200: withOpacity("--color-primary-200"),
          100: withOpacity("--color-primary-100"),
        },

        secondary: {
          900: withOpacity("--color-secondary-900"),
          800: withOpacity("--color-secondary-800"),
          700: withOpacity("--color-secondary-700"),
          600: withOpacity("--color-secondary-600"),
          500: withOpacity("--color-secondary-500"),
          400: withOpacity("--color-secondary-400"),
          300: withOpacity("--color-secondary-300"),
          200: withOpacity("--color-secondary-200"),
          100: withOpacity("--color-secondary-100"),
          50: withOpacity("--color-secondary-50"),
          0: withOpacity("--color-secondary-0"),
        },

        success: withOpacity("--color-success"),
        warning: withOpacity("--color-warning"),
        error: withOpacity("--color-error"),
      },

      container: {
        center: true,
        padding: "1rem",
      },

      fontFamily: {
        sans: ["var(--font-vazir)", ...fontFamily.sans],
      },

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.secondary.700"),

            h1: {
              color: theme("colors.secondary.900"),
              fontWeight: "800",
            },

            h2: {
              color: theme("colors.secondary.900"),
              fontWeight: "700",
            },

            h3: {
              color: theme("colors.secondary.900"),
              fontWeight: "700",
            },

            strong: {
              color: theme("colors.secondary.900"),
            },

            a: {
              color: theme("colors.primary.600"),
              textDecoration: "none",
            },

            blockquote: {
              borderRight: `4px solid ${theme("colors.primary.500")}`,
              borderLeft: "none",
              paddingRight: "1rem",
              fontStyle: "normal",
            },

            code: {
              color: theme("colors.primary.600"),
            },

            "pre code": {
              color: "inherit",
            },

            pre: {
              backgroundColor: theme("colors.secondary.900"),
              color: "#fff",
              borderRadius: "0.75rem",
            },

            ul: {
              paddingRight: "1.25rem",
            },

            ol: {
              paddingRight: "1.25rem",
            },

            img: {
              borderRadius: "1rem",
            },
          },
        },
      }),
    },
  },

  plugins: [
    require("@tailwindcss/aspect-ratio"),

    tailwindFormPlugin({
      strategy: "class",
    }),

    typography,
  ],
};
