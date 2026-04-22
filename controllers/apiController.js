import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import projects from '../data/projects.js';
import Post from '../models/Post.js';
import Message from '../models/Message.js';
import { sendContactEmail } from '../utils/mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// GET /api/projects
export const getProjects = (req, res) => {
  res.json({ success: true, data: projects });
};

// GET /api/projects/:slug
export const getProject = (req, res) => {
  const project = projects.find(p => p.slug === req.params.slug);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, data: project });
};

// GET /api/blog
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .select('title slug excerpt readTime createdAt tags');
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/blog/:slug
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, published: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/contact
export const postContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // Try saving to MongoDB — but don't fail if DB is down
    try {
      await Message.create({ name, email, subject, message });
      console.log('Message saved to MongoDB');
    } catch (dbErr) {
      console.error('MongoDB save failed (continuing anyway):', dbErr.message);
    }

    // Send email regardless of MongoDB status
    sendContactEmail({ name, email, subject, message }).catch(err => {
      console.error('Email send error:', err.message);
    });

    // Always return success to the user
    res.json({ success: true, message: "Message received! I'll get back to you soon." });

  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
};
// GET /api/resume
export const getResume = (req, res) => {
  const filePath = path.join(__dirname, '../public/files/Ayomide_OjoSola_CV.pdf');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: 'CV file not found. Please add it to public/files/'
    });
  }

  res.download(filePath, 'Ayomide_OjoSola_CV.pdf', (err) => {
    if (err && !res.headersSent) {
      console.error('Resume download error:', err.message);
      res.status(500).json({ success: false, message: 'Error downloading file.' });
    }
  });
};


// GET /api/randomjoke
const jokes = [
  { id: 1, joke: "Why do Nigerian devs love Power Banks? Na because 'E no dey carry last'.", type: 'short', genre: 'tech' },
  { id: 2, joke: 'A SQL query walks into a bar, walks up to two tables and asks... "Can I join you?"', type: 'short', genre: 'tech' },
  { id: 3, joke: 'Why do programmers prefer dark mode? Because light attracts bugs.', type: 'short', genre: 'tech' },
  { id: 4, joke: 'I told my computer I needed a break and now it won\'t stop sending me Kit-Kat ads.', type: 'short', genre: 'general' },
  { id: 5, joke: 'How many programmers does it take to change a light bulb? None — that\'s a hardware problem.', type: 'short', genre: 'tech' },
  { id: 6, joke: 'There are 10 kinds of people in this world: those who understand binary, those who don\'t, and those who weren\'t expecting base-3.', type: 'long', genre: 'tech' },
  { id: 7, joke: 'A backend developer and a frontend developer walk into a restaurant. The backend dev orders everything correctly but the frontend dev complains the menu isn\'t pretty enough.', type: 'long', genre: 'tech' },
];

export const getRandomJoke = (req, res) => {
  const { type } = req.query;
  let pool = jokes;

  if (type === 'short') pool = jokes.filter(j => j.type === 'short');
  else if (type === 'long') pool = jokes.filter(j => j.type === 'long');

  if (!pool.length) {
    return res.status(404).json({ success: false, message: 'No jokes match that filter.' });
  }

  const joke = pool[Math.floor(Math.random() * pool.length)];
  res.json({ success: true, data: joke });
};
