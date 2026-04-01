# 🖥️ Virtual Memory OS Simulation - Frontend

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

This is the frontend component for the **Virtual Memory OS Simulation**, providing an interactive, minimal, and highly visual representation of operating system memory management, page faults, and page replacement algorithms.

Built with [Next.js](https://nextjs.org/) and styled with [Tailwind CSS](https://tailwindcss.com/), it prioritizes data visualization over UI noise, offering a clean, high-contrast monochrome design.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [🔌 Backend Connection](#-backend-connection)
- [📂 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- **⚙️ Interactive Configuration:** Set custom memory size, page size, total frames, reference strings, and select from various replacement algorithms (FIFO, LRU, Optimal).
- **⏯️ Step-by-Step Execution:** Watch the simulation handle memory requests one page at a time with intuitive playback controls (Play, Pause, Step Next, Step Prev).
- **🖧 Physical Memory Grid:** Visually tracks which pages are currently loaded into RAM, clearly distinguishing between page **hits** and **faults**.
- **⏳ Storage Queue:** Displays the upcoming reference string pages waiting in secondary storage.
- **📊 Algorithm Analytics:** Compare the performance of different algorithms side-by-side using real-time bar charts (hits vs. faults).
- **🎨 Minimal Aesthetic:** A clean, high-contrast monochrome design ensures the focus remains entirely on the simulation data.

---

## 🛠️ Tech Stack

This project leverages modern web technologies for a smooth and responsive experience:

- **Framework:** [Next.js](https://nextjs.org/) & [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for seamless page swapping and UI transitions
- **Data Visualization:** [Recharts](https://recharts.org/) for real-time analytics graphs

---

## 🚀 Getting Started

Follow these instructions to get a copy of the frontend up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v18.0.0` or higher recommended
- **Package Manager**: npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nishisharma-14/Virtual-memory-OS.git
   cd Virtual-memory-OS/frontend
   ```

2. **Install dependencies:**
   Using npm:
   ```bash
   npm install
   ```
   *Alternatively, use `yarn install` or `pnpm install`.*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the interface.

---

## 🔌 Backend Connection

The frontend relies on the backend simulation engine to process the algorithms. 

1. Ensure the backend engine is running locally at `http://localhost:8000`. 
2. The frontend communicates with the backend via `POST` requests to `/api/simulate` to generate the step-by-step logic.
3. For instructions on starting the Python backend, please refer to the backend's README file.

---

## 📂 Project Structure

A quick look at the top-level files and directories in this project:

```text
frontend/
├── app/               # Next.js app directory (pages, layouts, API routes)
├── components/        # Reusable UI components (Grid, Charts, Controls)
├── public/            # Static assets (images, icons)
├── styles/            # Global CSS and Tailwind directives
├── next.config.mjs    # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── package.json       # Project dependencies and scripts
```

---

## 🤝 Contributing

Contributions are always welcome! Whether it's reporting a bug, suggesting a feature, or submitting a pull request, your input helps improve this project.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source. Please check the main repository root for any specific license details.
