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

## 🎨 Design System & Mixed-Media Visual Language

The redesigned welcome screen is inspired by contemporary mixed-media editorial design (combining real urban architecture and street photography from the `img/` reference archive with vibrant 2D doodle illustrations, route trajectories, and commuter annotations).

| Token Name | Hex Code | Usage |
|---|---|---|
| **Warm Ivory** | `#F5F2EA` | Primary screen canvas & background |
| **Deep Forest** | `#172B2A` | Editorial headings, bold outlines, primary CTA |
| **Fresh Lime** | `#C9F36A` | High-visibility route glow, live status, badges |
| **Pure White** | `#FFFFFF` | Card surfaces, clean contrast containers |
| **Muted Grey** | `#73776F` | Secondary copy and subtle captions |
| **Soft Border** | `#E3E0D7` | Hairline dividers and card borders |
| **Doodle Yellow** | `#FFDE59` | Hand-drawn star accents and rickshaw canopy |
| **Doodle Coral** | `#FF5E4D` | Destination pin and route marker nodes |

---

## 📱 Welcome Screen Architecture

- **`BrandHeader`**: Bilingual SAFAR mark with Devanagari badge (`सफ़र`), compass mobility emblem, and live city ticker.
- **`HeroVisual`**: Mixed-media composition blending genuine urban street photography with 2D doodle transportation overlays (Indian auto-rickshaw, city cab, pooling route trajectory, and floating status tags).
- **`MainContent`**: Prominent typography hierarchy (*"Your City. Your Ride. Your Way."*) with custom hand-drawn highlight brush stroke and supporting transit copy.
- **`MobilityCards`**: Interactive mode selector for **Auto**, **Cab**, and **Ride Pool** featuring live state transitions, checkmark badges, and doodle borders.
- **`ActionButtons`**: High-accessibility 52px primary action (*"Get Started"*) with tactile sticker shadow and secondary auth buttons (*"Log In"*, *"Sign Up"*) with accessible feedback notification.
- **`WelcomeFooter`**: Minimal footnote (*"Made for the way India moves."*) with hand-drawn route divider.
- **`App Preview Shell`**: Adaptive presentation toggle for desktop review (Simulated Smartphone Frame / Fluid Responsive View).

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
