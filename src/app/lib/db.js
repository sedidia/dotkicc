import mongoose from 'mongoose';

const MONGODB__MONGODB_URI="mongodb+srv://Vercel-Admin-drcdotkcclshi:lb1gPpaEViAVUwOI@drcdotkcclshi.chomezh.mongodb.net/?retryWrites=true&w=majority";

if (!MONGODB__MONGODB_URI) {
  throw new Error('MONGODB_URI est requis');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB__MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;