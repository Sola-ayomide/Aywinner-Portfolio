// Static project data — no database needed for projects.
// Add or edit projects here; they're served via GET /api/projects
// and rendered on the /projects page.

const projects = [
  {
    id: 1,
    name: 'HireBridge',
    slug: 'hirebridge',
    type: 'Capstone Project',
    badgeClass: 'badge-cap',
    tagline: "Nigeria's smart recruitment backend API",
    description:
      'A robust backend API enabling structured, digital-first hiring workflows for recruiters and job seekers. Covers job posting, candidate tracking across stages, CV uploads, email notifications, and hiring analytics.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'bcryptjs', 'Nodemailer', 'Multer'],
    github: 'https://github.com/Sola-ayomide/Hire-bridge-backend-api',
    live: null,
    featured: true,
    thumbClass: 'hirebridge',
  },
  {
    id: 2,
    name: 'MoodFlow API',
    slug: 'moodflow',
    type: 'Mini Project',
    badgeClass: 'badge-mini',
    tagline: 'Mood-based personalised content recommendations',
    description:
      'A content recommendation API that serves content based on a user\'s current mood, incorporating historical liked and saved items for smarter suggestions. Includes full JWT auth, Swagger docs, and mood history tracking.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Swagger/OpenAPI'],
    github: 'https://github.com/Aisdev979/Mood-Based-Content-Generator-API',
    live: null,
    featured: false,
    thumbClass: 'moodflow',
  },
  {
    id: 3,
    name: 'Random Jokes Generator',
    slug: 'jokes-api',
    type: 'Standalone Project',
    badgeClass: 'badge-solo',
    tagline: 'Lightweight jokes API with server-rendered UI',
    description:
      'A Node.js + Express API serving random jokes with query parameter filtering, paired with an interactive EJS web UI. Demonstrates randomisation logic, query param handling, and client-side fetch with theme persistence.',
    techStack: ['Node.js', 'Express.js', 'EJS', 'Vanilla JS', 'CSS Flexbox'],
    github: null,
    live: null,
    featured: false,
    thumbClass: 'jokes',
  },
];

export default projects
