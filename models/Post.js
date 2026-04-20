import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true, trim: true, minlength: 10 },
    slug:      { type: String, required: true, unique: true, lowercase: true },
    excerpt:   { type: String, required: true, maxlength: 300 },
    content:   { type: String, required: true },   // Markdown
    tags:      [{ type: String, trim: true }],
    readTime:  { type: Number, default: 3 },       // minutes
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate readTime from content length before saving
postSchema.pre('save', function (next) {
  const words = this.content.split(/\s+/).length;
  this.readTime = Math.max(1, Math.ceil(words / 200));
  next();
});

const Post = mongoose.model('Post', postSchema);
export default Post
