# Codebase Website

The Founding Technical Club of IIIT Kota.

The official Website of Codebase.

## Architecture & Tools

- React 19 & Vite
- Tailwind CSS v4
- Framer Motion & Locomotive Scroll
- React Router DOM
- Lucide React

## Development Workflow

To get this project up and running locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Test production build
- `npm run lint` - Run TypeScript checks

## Repository Layout

```text
src/
├── App.jsx                # Main application component with routing setup
├── index.css              # Global styles and Tailwind configuration
├── main.jsx               # Entry point for React application
│
├── components/            # Reusable UI components
│   ├── ExhibitCard.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── alumni/            # Components specific to the Alumni page
│
├── pages/                 # Full page components
│   └── AlumniPage.jsx
│
├── sections/              # Major landing page sections
│   ├── HeroSection.jsx
│   ├── ProjectsSection.jsx
│   └── TeamSection.jsx
│
├── data/                  # Static data and content
└── hooks/                 # Custom React hooks
```

## Credits

Maintained by Satyam Rajawat. Built by Satyam Rajawat and Raghav Gupta.

© 2026 Codebase . All rights reserved.
