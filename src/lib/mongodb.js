import mongoose from 'mongoose';

// const connectionToDb ="mongodb+srv://Vercel-Admin-drcdotkcclshi:lb1gPpaEViAVUwOI@drcdotkcclshi.chomezh.mongodb.net/?retryWrites=true&w=majority";

const connectionToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB__MONGODB_URI)
    console.log("connected to the database");
    
  } catch (error) {
    console.log(error);
    
  }  
}

export default connectionToDb;