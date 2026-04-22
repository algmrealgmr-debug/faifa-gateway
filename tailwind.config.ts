import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ["'Thmanyah'", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
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
        nature: {
          DEFAULT: "hsl(var(--nature))",
          foreground: "hsl(var(--nature-foreground))",
        },
        mountain: {
          DEFAULT: "hsl(var(--mountain))",
          foreground: "hsl(var(--mountain-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)', 
        'gradient-nature': 'var(--gradient-nature)',
      },
      boxShadow: {
        'nature': 'var(--shadow-nature)',
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
        'soft': 'var(--shadow-soft)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "butterfly-flight": {
          "0%": { 
            transform: "translateX(0) translateY(0) rotate(5deg)",
            opacity: "1"
          },
          "20%": { 
            transform: "translateX(-30vw) translateY(-10vh) rotate(-5deg)",
            opacity: "1"
          },
          "40%": { 
            transform: "translateX(-50vw) translateY(5vh) rotate(5deg)",
            opacity: "1"
          },
          "60%": { 
            transform: "translateX(-70vw) translateY(-15vh) rotate(-5deg)",
            opacity: "1"
          },
          "80%": { 
            transform: "translateX(-90vw) translateY(0) rotate(5deg)",
            opacity: "0.8"
          },
          "100%": { 
            transform: "translateX(-110vw) translateY(-20vh) rotate(-5deg)",
            opacity: "0"
          },
        },
        "wing-left": {
          "0%, 100%": { transform: "rotate(-20deg) scaleX(1)" },
          "50%": { transform: "rotate(-20deg) scaleX(0.6)" },
        },
        "wing-right": {
          "0%, 100%": { transform: "rotate(20deg) scaleX(1)" },
          "50%": { transform: "rotate(20deg) scaleX(0.6)" },
        },
        "tail-wag": {
          "0%, 100%": { transform: "rotate(-20deg)" },
          "50%": { transform: "rotate(-10deg)" },
        },
        "nav-pulse": {
          "0%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "50%": { boxShadow: "0 0 12px 4px hsl(var(--primary) / 0.2)" },
          "100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0)" },
        },
        "icon-bounce": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "butterfly-flight": "butterfly-flight 4s ease-in-out forwards",
        "wing-left": "wing-left 0.15s ease-in-out infinite",
        "wing-right": "wing-right 0.15s ease-in-out infinite",
        "tail-wag": "tail-wag 0.8s ease-in-out infinite",
        "nav-pulse": "nav-pulse 0.5s ease-out",
        "icon-bounce": "icon-bounce 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
