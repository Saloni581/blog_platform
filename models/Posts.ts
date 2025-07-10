import mongoose, { Schema, model, models } from 'mongoose';

// Define the structure (schema) of a blog post
const PostSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    coverImageUrl: { type: String },
    authorId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// If model already exists (during dev reload), use it; otherwise create a new one
const Post = models.Post || model('Post', PostSchema);

export default Post;
