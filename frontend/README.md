# Virtual Memory OS Simulation - Frontend

This is the frontend component for the Virtual Memory OS simulation, built with [Next.js](https://nextjs.org/) and styled with [Tailwind CSS](https://tailwindcss.com/). It provides an interactive, minimal visualization of operating system memory management, page faults, and replacement algorithms.

## Features

- **Interactive Configuration:** Set memory size, page size, total frames, reference strings, and replacement algorithms (FIFO, LRU, Optimal).
- **Step-by-Step Execution:** Watch the simulation handle memory requests one page at a time with playback controls.
- **Physical Memory Grid:** Visualizes which pages are loaded in RAM and clearly indicates page hit/fault events.
- **Storage Queue:** Displays the upcoming reference string pages waiting in secondary storage.
- **Algorithm Analytics:** Compare the performance (page faults vs page hits) of different algorithms side-by-side using real-time bar charts.
- **Minimal Aesthetic:** Clean, high-contrast monochrome design that prioritizes data visualization over UI noise.

## Getting Started

First, ensure you have Node.js installed on your machine.

1. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependency Setup

This project uses:
- React & Next.js for the core framework.
- Framer Motion for smooth layout animations (e.g., pages swapping in and out of frames).
- Recharts for algorithm comparison analytics.
- Tailwind CSS for the minimalist styling.

## Backend Connection

Make sure the backend simulation engine is running on `http://localhost:8000`. The frontend communicates via POST requests to `/api/simulate` to generate the step-by-step logic. See the backend `README.md` for instructions on starting the Python server.
