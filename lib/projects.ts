type Project = {
  name: string
  tagline: string
  desc: string
  stack: string[]
  date: string
  link?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    name: "StarlightQuran",
    tagline: "Your Complete Islamic Companion",
    desc: "Quran, Adhkar & Duas in one place. Built with Next.js featuring audio, tafsir, custom API layer with ISR and in-memory caching. Clean reusable components with lazy loading and code splitting.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ISR"],
    date: "Jan – Feb 2026",
    link: "https://github.com/OsamaFed/StarlightQuran",
    featured: true
  },
  {
    name: "NasaExpo",
    tagline: "Exploring the Universe Through Data",
    desc: "Full-stack app with custom API routes serving paginated exoplanet records from a CSV dataset. Server-side caching with clean separation between data layer and UI.",
    stack: ["Next.js", "TypeScript", "API Routes", "SSR"],
    date: "Nov 2025",
    link: "https://github.com/OsamaFed/Nasa-Exoplanets",
    featured: true
  },
  {
    name: "CortexGarden",
    tagline: "Cognitive Games Platform",
    desc: "Quizzes and cognitive games built with Next.js and Redux Toolkit. Custom server-side math question generation with external trivia API integration and theme-aware UI.",
    stack: ["Next.js", "Redux Toolkit", "TypeScript", "External API"],
    date: "Oct – Nov 2025",
    link: "https://github.com/OsamaFed/Cortexgarden",
    featured: true
  },
  {
    name: "StellarMirror",
    tagline: "Compare the Universe, One Date at a Time",
    desc: "Vanilla JS app integrating NASA APOD API to fetch and compare space photos from any two dates side by side. Clean modular JS with image download support.",
    stack: ["JavaScript", "NASA API", "CSS"],
    date: "Jul 2025",
    link: "https://github.com/OsamaFed/Stellar-mirror-",
  },
  {
    name: "YeFax",
    tagline: "I miss the old Kanye",
    desc: "A creative project celebrating Kanye West's legacy. Built with React to practice frontend development while exploring music and nostalgia in an interactive web experience.",
    stack: ["React", "JavaScript", "CSS"],
    date: "Oct 2025",
    link: "https://github.com/OsamaFed/YeFax",
  },
  {
    name: "AstroDo",
    tagline: "Your Cosmic To-Do List",
    desc: "A sleek and cosmic-themed to-do list web app designed to help you organize tasks with a touch of the stars. Features a dark/night-friendly UI, smooth animations, notifications, and task validation to keep your productivity aligned with the universe.",
    stack: ["HTML", "CSS", "JavaScript"],
    date: "Jul 2025",
    link: "https://github.com/OsamaFed/AstroDo-",
  },
  {
    name: "Windly",
    tagline: "Simple and Responsive Weather App",
    desc: "A clean and intuitive weather application built with React. Provides real-time weather information with a responsive design that works across all devices.",
    stack: ["React", "JavaScript", "CSS", "Weather API"],
    date: "2025",
    link: "https://github.com/OsamaFed/Windly",
  },
  {
    name: "QuotesCraft",
    tagline: "Minecraft-Inspired Quote Gallery",
    desc: "A fun and inspiring quote website with a unique Minecraft-style pixel-art theme. Browse and discover daily inspirational quotes.",
    stack: ["React", "JavaScript", "CSS"],
    date: "2025",
    link: "https://github.com/OsamaFed/Quotescraft",
  },
  {
    name: "Basic-CRUD",
    tagline: "Foundational CRUD Operations",
    desc: "A simple CRUD (Create, Read, Update, Delete) project built while learning JavaScript. Demonstrates fundamental operations on data.",
    stack: ["JavaScript", "HTML", "CSS"],
    date: "2024",
    link: "https://github.com/OsamaFed/Basic-CRUD",
  },
  {
    name: "My First React App",
    tagline: "React Todo List Application",
    desc: "An introductory React project implementing a todo list. A practical first step into building interactive user interfaces with React.",
    stack: ["React", "JavaScript", "CSS"],
    date: "2024",
    link: "https://github.com/OsamaFed/My-first-React-app",
  },
]

export { projects, type Project }