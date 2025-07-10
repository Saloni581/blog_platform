import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error('MongoDB URI not found');

let cached = (global as any).mongoose || { conn: null };

export async function connectToDB() {
    if (cached.conn) return cached.conn;

    const conn = await mongoose.connect(MONGODB_URI);
    cached.conn = conn;
    (global as any).mongoose = cached;

    return conn;
}
