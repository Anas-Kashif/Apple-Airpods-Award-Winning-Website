# 🎧 Apple AirPods Max — Award-Winning Scrollytelling Experience

A web showcase for **Apple AirPods Max**, featuring **3D image sequence canvas scrollytelling**, interactive exploded-view hotspots, an Active Noise Cancellation audio simulator, dynamic color picker, and technical specification breakdown.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-purple?style=for-the-badge&logo=framer)

---

## ✨ Features

- 🌌 **3D Canvas Scrollytelling (`ScrollyCanvas`)**: Smooth 60fps HTML5 2D canvas frame sequence rendering linked to page scroll progress over a `450vh` sticky section.
- 📜 **Cinematic Story Beats (`StoryBeats`)**: Synchronized typography overlays introducing the design, acoustic architecture, and computational audio experience.
- 🎯 **Exploded View Hotspots (`Hotspots`)**: Interactive engineering callouts (Anodized Aluminum Cups, Knit Mesh Canopy, Custom Driver, Digital Crown) that reveal detailed micro-specifications.
- 🔊 **Interactive ANC Audio Simulator (`AncSimulator`)**: Live audio simulator toggling between **Active Noise Cancellation**, **Transparency Mode**, and **Off** with real-time waveform visualization.
- 🎨 **Dynamic Color Finish Selector (`ColorSelector`)**: Interactive color switcher previewing Space Gray, Silver, Sky Blue, Pink, and Green finishes with smooth visual transitions.
- 📊 **Tech Specs Explorer (`TechSpecs`)**: Tabbed breakdown detailing Audio Technology, Sensors, Microphones, Chipset, Battery Life, and Physical Dimensions.
- 🏛️ **Editorial Footer (`Footer`)**: Google Labs-inspired minimal editorial footer layout with massive brand typography and category navigation.
- ⚡ **Preloader & Performance (`Preloader`)**: Asset preloading pipeline ensuring lag-free canvas sequence playback across high-DPI displays.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```
├── public/                     # Static assets & image sequence frames
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout and metadata
│   │   ├── page.tsx            # Main scrollytelling page entry point
│   │   └── globals.css         # Custom utility classes & dark theme definitions
│   ├── components/
│   │   ├── AncSimulator.tsx    # ANC audio simulator & waveform visualizer
│   │   ├── ColorSelector.tsx   # Color finish preview switcher
│   │   ├── Footer.tsx          # Editorial brand footer component
│   │   ├── Hotspots.tsx        # Exploded view interactive hotspots
│   │   ├── Navbar.tsx          # Fixed glassmorphism navigation header
│   │   ├── Preloader.tsx       # Frame sequence asset preloader
│   │   ├── ScrollyCanvas.tsx   # Scroll-synchronized HTML5 canvas renderer
│   │   ├── StoryBeats.tsx      # Scroll-triggered narrative typography overlays
│   │   └── TechSpecs.tsx       # Detailed technical specs component grid
│   └── lib/
│       └── constants.ts        # Specs data, color options, and story beat configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind theme & color token setup
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.x** or later installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anas-Kashif/Apple-Award-Winning-Website.git
   cd Apple-Award-Winning-Website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## ⚙️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode at `http://localhost:3000` |
| `npm run build` | Builds the production-ready application |
| `npm run start` | Starts the production server after building |
| `npm run lint` | Runs Next.js linter to check for code formatting issues |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
