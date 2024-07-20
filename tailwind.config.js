/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        phone: "320px",
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "brand-primary": "hsl(var(--brand-primary))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        default: "0 4px 12px 0 rgba(61, 193, 197, 0.25)",
        glossy:
          "2px 4px 6px 0px rgba(19, 48, 66, 0.66), 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset",
        innerBrand: "2px 2px 3px 0px rgba(61, 193, 197, 0.12) inset",
        innerProgress: "0px 1px 2px 0px rgba(0, 0, 0, 0.12) inset;",
        small: "1px 1px 3px 0px rgba(61, 193, 197, 0.12) inset",
        widget: "0px 4px 16px 5px rgba(61, 193, 197, 0.07)",
        widgetHover: "0px 4px 16px 5px rgba(61, 193, 197, 0.25)",
        widgetHoverDestructive: "0px 4px 16px 5px rgba(255, 107, 107, 0.25)",
      },
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.75rem",
    },
    fontWeight: {
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      "extra-bold": "800",
      black: "900",
    },
    fontFamily: {
      primary: ["Poppins", "sans-serif", "serif"],
    },
  },
  plugins: [],
};
