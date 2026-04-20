import express from 'express';
import * as ctrl from '../controllers/viewController.js';

const router  = express.Router();

router.get('/',              ctrl.getHome);
router.get('/projects',      ctrl.getProjects);
router.get('/blog',          ctrl.getBlog);
router.get('/blog/:slug',    ctrl.getPost);
router.get('/contact',       ctrl.getContact);

export default router;