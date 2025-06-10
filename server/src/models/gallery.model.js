import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: [String], 
  videoUrl: [String], 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Gallery', GallerySchema);
