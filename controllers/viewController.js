import projects from '../data/projects.js';
import Post from '../models/Post.js';
import { marked } from 'marked';

// Home
const getHome = async (req, res) => {
  try {
    const recentPosts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title slug excerpt readTime createdAt tags');

    res.render('pages/home', {
      title: 'Ayomide Ojo-Sola — Backend Engineer',
      projects,
      recentPosts,
    });
  } catch (err) {
    console.error(err);
    res.render('pages/home', {
      title: 'Ayomide Ojo-Sola — Backend Engineer',
      projects,
      recentPosts: [],
    });
  }
};

// Projects
const getProjects = (req, res) => {
  res.render('pages/projects', {
    title: 'Projects — Ayomide Ojo-Sola',
    projects,
  });
};

// Blog list
const getBlog = async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .select('title slug excerpt readTime createdAt tags');

    res.render('pages/blog', {
      title: 'Blog — Ayomide Ojo-Sola',
      posts,
    });
  } catch (err) {
    console.error(err);
    res.render('pages/blog', { title: 'Blog — Ayomide Ojo-Sola', posts: [] });
  }
};

// Single post
const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, published: true });
    if (!post) return res.status(404).render('pages/404', { title: 'Post not found' });

    res.render('pages/post', {
      title: `${post.title} — Ayomide Ojo-Sola`,
      post,
      contentHtml: marked(post.content),
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/404', { title: 'Error' });
  }
};

// Contact page
const getContact = (req, res) => {
  res.render('pages/contact', {
    title: 'Contact — Ayomide Ojo-Sola',
    success: null,
    error: null,
  });
};

export {
  getHome,
  getProjects,
  getBlog,
  getPost,
  getContact
}