import express from 'express';
import rateLimit from 'express-rate-limit';
import * as ctrl from '../controllers/apiController.js';

const router    = express.Router();

// Rate limit contact form — max 5 submissions per 15 min per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many messages. Please try again later.' },
});

router.get('/projects',         ctrl.getProjects);
router.get('/projects/:slug',   ctrl.getProject);
router.get('/blog',             ctrl.getPosts);
router.get('/blog/:slug',       ctrl.getPost);
router.post('/contact', contactLimiter, ctrl.postContact);
router.get('/api/resume',           ctrl.getResume);
router.get('/randomjoke',       ctrl.getRandomJoke);

export default router;