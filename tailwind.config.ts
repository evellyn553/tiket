import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
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
        // Custom anime-themed colors
        sakura: {
          50: "#fef7f7",
          100: "#fdeaea",
          200: "#fbd5d5",
          300: "#f8b4b4",
          400: "#f48888",
          500: "#ec5a5a",
          600: "#d73c3c",
          700: "#b52d2d",
          800: "#962929",
          900: "#7c2727",
        },
        lavender: {
          50: "#f8f7ff",
          100: "#f0edff",
          200: "#e4ddff",
          300: "#d1c1ff",
          400: "#b899ff",
          500: "#9d6bff",
          600: "#8b42ff",
          700: "#7c2dff",
          800: "#6b25d1",
          900: "#5a21a8",
        },
        neon: {
          blue: "#00f5ff",
          pink: "#ff1493",
          purple: "#bf00ff",
          green: "#39ff14",
          yellow: "#ffff00",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 20, 147, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 20, 147, 0.8), 0 0 30px rgba(255, 20, 147, 0.6)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        sparkle: "sparkle 1.5s ease-in-out infinite",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "monospace"],
      },
      borderWidth: {
        "3": "3px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
