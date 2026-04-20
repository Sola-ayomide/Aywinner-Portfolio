import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 50 },
    email:   { type: String, required: true, unique: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 1000 },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;