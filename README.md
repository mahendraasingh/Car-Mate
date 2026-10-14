# SAFAR — India-Focused Cab, Auto & Ride-Pooling Platform

> **"Your City. Your Ride. Your Way."**
> Book a cab, hop into an auto, or share your journey. Smart, sustainable urban mobility built for Indian cities.

---

## 🚕 Product Overview

**SAFAR** is an urban mobility platform designed specifically for the dynamics of Indian transportation. It bridges everyday personal transit and shared pooling across:

- **City Cabs**: Sedans, hatchbacks, and outstation trips.
- **Direct Autos**: Quick, point-to-point three-wheeler auto-rickshaw rides.
- **Smart Ride-Pooling**: Real-time shared rides before booking and en-route.

---

## 🎨 Design System & Color Palette

The interface adheres to an intentional, restrained Indian urban mobility palette:

| Token Name | Hex Code | Usage |
|---|---|---|
| **Warm Ivory** | `#F5F2EA` | Primary screen background & calm canvas |
| **Deep Forest** | `#172B2A` | Headings, primary CTA buttons, icons |
| **Fresh Lime** | `#C9F36A` | High-visibility accents, badges, indicator lights |
| **Pure White** | `#FFFFFF` | Elevated cards, surfaces, clean container tiles |
| **Muted Grey** | `#73776F` | Secondary copy, descriptions, subtle subtext |
| **Soft Border** | `#E3E0D7` | Subtle dividers, card borders, borders |

---

## 📱 Welcome Screen Architecture

- **`BrandHeader`**: Minimalist header with SAFAR brand monogram, typography, and localized `INDIA` indicator.
- **`HeroIllustration`**: Custom responsive SVG artwork featuring an authentic Indian auto-rickshaw, modern city cab, dynamic pooling trajectory, and metro viaduct silhouette.
- **`Main Content`**: Headline (*"Your City. Your Ride. Your Way."*) and supportive tagline.
- **`MobilityBadges`**: Feature indicator chips for Cab, Auto, and Ride Pool.
- **`ActionButtons`**: High-accessibility primary button (*"Get Started"*, 50px touch target) and secondary authentication placeholders (*"Log In"*, *"Sign Up"*).
- **`WelcomeFooter`**: Minimal footer (*"Made for the way India moves."*).
- **`Preview Switcher`**: Dual mode desktop viewing (Simulated iPhone / Android mobile frame and fluid responsive display).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Production Build & Typecheck
```bash
npm run build
```

### Code Quality & Linting
```bash
npm run lint
```
