# Pomodoro Timer

> Built with [Dark Factory v4](https://github.com/ibuzzardo/dark-factory-v4) — autonomous AI software development pipeline

**[Live Demo](https://pomodoro-timer-sepia-one.vercel.app)**


A modern Pomodoro Timer web application built with Next.js 15, TypeScript, and Tailwind CSS. Helps you manage work sessions using the Pomodoro Technique — 25-minute focused work intervals followed by 5-minute breaks.

## Features

- 🍅 Three timer modes: Focus (25 min), Short Break (5 min), Long Break (15 min)
- ⏯️ Start, Pause, Reset controls
- 📊 Visual progress indicator showing completed pomodoros
- 🔄 Auto-transition between modes
- 🔊 Sound notification when timer completes
- 📈 Session counter for daily focus sessions
- 🌙 Dark theme
- ⌨️ Keyboard shortcuts
- 📱 Fully responsive design

## Keyboard Shortcuts

- **Space** - Start/Pause timer
- **R** - Reset timer
- **1** - Switch to Focus mode
- **2** - Switch to Short Break mode
- **3** - Switch to Long Break mode

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pomodoro-timer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with dark theme
│   ├── page.tsx            # Main page
│   ├── globals.css         # Tailwind base styles
│   └── api/
│       └── health/
│           └── route.ts    # Health check endpoint
├── components/
│   ├── PomodoroTimer.tsx   # Main timer component
│   ├── TimerDisplay.tsx    # Circular countdown display
│   ├── TimerControls.tsx   # Control buttons
│   └── ProgressDots.tsx    # Progress indicator
├── hooks/
│   └── useTimer.ts         # Timer logic hook
└── lib/
    └── audio.ts            # Sound generation
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Web Audio API** - Sound notifications

## License

MIT