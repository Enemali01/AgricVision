import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file to Cloudinary from buffer
 * @param {Buffer} buffer - File buffer
 * @param {string} mimetype - MIME type (e.g., image/png, video/mp4)
 * @param {string} folder - Optional folder name in Cloudinary
 */
export const uploadToCloudinary = async (buffer, mimetype, folder = 'gallery') => {
  if (!buffer || !mimetype) throw new Error('Invalid file format or missing mimetype');

  const dataUri = `data:${mimetype};base64,${buffer.toString('base64')}`;

  return await cloudinary.uploader.upload(dataUri, {
    resource_type: mimetype.startsWith('video') ? 'video' : 'image',
    folder,
  });
};
