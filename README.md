# Ayomide Ojo-Sola — Portfolio

Personal portfolio website built with Node.js, Express.js, EJS, and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Views**: EJS + Vanilla JS + CSS
- **Database**: MongoDB + Mongoose (blog posts, contact messages)
- **Email**: Nodemailer (contact form → Gmail)
- **Blog**: marked.js (Markdown → HTML)

## Project Structure

```
portfolio/
├── config/
│   └── db.js                  ← MongoDB connection
├── controllers/
│   ├── viewController.js      ← Page render logic
│   └── apiController.js       ← API endpoint logic
├── data/
│   └── projects.js            ← Static projects array
├── models/
│   ├── Message.js             ← Contact form messages
│   └── Post.js                ← Blog posts
├── routes/
│   ├── views.js               ← Page routes (/, /projects, /blog…)
│   └── api.js                 ← API routes (/api/*)
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   └── pages/
│       ├── home.ejs
│       ├── projects.ejs
│       ├── blog.ejs
│       ├── post.ejs
│       ├── contact.ejs
│       └── 404.ejs
├── public/
│   ├── css/main.css
│   ├── js/main.js
│   ├── images/
│   └── files/                 ← Put your CV PDF here
├── utils/
│   └── mailer.js
├── .env.example
├── .gitignore
├── index.js
└── package.json
```

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Sola-ayomide/portfolio.git
cd portfolio
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
MAIL_USER=aywinner.dev@gmail.com
MAIL_PASS=your_gmail_app_password
MAIL_TO=aywinner.dev@gmail.com
SITE_URL=http://localhost:3000
```

**Gmail App Password setup:**
1. Go to myaccount.google.com → Security
2. Enable 2-Factor Authentication
3. Search "App Passwords" → Generate one for "Mail"
4. Paste it into `MAIL_PASS` (NOT your real Gmail password)

### 3. Add your CV

Place your CV PDF at:
```
public/files/Ayomide_OjoSola_CV.pdf
```

### 4. Run in development

```bash
npm run dev
```

Visit: http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | All projects as JSON |
| GET | `/api/projects/:slug` | Single project |
| GET | `/api/blog` | All published blog posts |
| GET | `/api/blog/:slug` | Single post |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/resume` | Download CV PDF |
| GET | `/api/randomjoke` | Random joke |
| GET | `/api/randomjoke?type=short` | Short jokes only |
| GET | `/api/randomjoke?type=long` | Long jokes only |

## Adding a Blog Post

Use the MongoDB shell or a tool like MongoDB Compass:

```js
db.posts.insertOne({
  title: "My first post",
  slug: "my-first-post",
  excerpt: "A short summary of the post.",
  content: "# Hello\n\nThis is **Markdown** content.",
  tags: ["node.js", "backend"],
  published: true,
  createdAt: new Date()
})
```

## Deployment

### Render (recommended — free)

1. Push to GitHub
2. Go to render.com → New Web Service
3. Connect your repo
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add all environment variables from `.env`
7. Deploy ✅

### Add your custom domain (optional)

In Render dashboard → Settings → Custom Domains → add `ayomide.dev`

## Adding a New Project

Edit `data/projects.js` and add an object to the array:

```js
{
  id: 4,
  name: 'My New Project',
  slug: 'my-new-project',
  type: 'Mini Project',
  badgeClass: 'badge-mini',
  tagline: 'One line description',
  description: 'Full description here.',
  techStack: ['Node.js', 'Express.js'],
  github: 'https://github.com/...',
  live: 'https://...',
  featured: false,
  thumbClass: 'moodflow',   // hirebridge | moodflow | jokes
}
```
