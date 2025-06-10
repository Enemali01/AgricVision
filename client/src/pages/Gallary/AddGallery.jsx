
import React, { useRef, useState, useEffect } from 'react';
import { FaImage, FaVideo, FaTrash } from 'react-icons/fa';
import api from '../../utils/api';



const MAX_IMAGE_SIZE_MB = 5;
const MAX_VIDEO_SIZE_MB = 50;

const AddGallery = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const [openTab, setOpenTab] = useState('images');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('event');
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [error, setError] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const res = await api.get('/gallery/');
      setGalleryItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Validate file size and type
  const validateFiles = (files, type) => {
    for (let file of files) {
      const sizeMB = file.size / (1024 * 1024);
      if (type === 'image') {
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed in Image tab');
          return false;
        }
        if (sizeMB > MAX_IMAGE_SIZE_MB) {
          setError(`Image size must be less than ${MAX_IMAGE_SIZE_MB}MB`);
          return false;
        }
      } else {
        if (!file.type.startsWith('video/')) {
          setError('Only video files are allowed in Video tab');
          return false;
        }
        if (sizeMB > MAX_VIDEO_SIZE_MB) {
          setError(`Video size must be less than ${MAX_VIDEO_SIZE_MB}MB`);
          return false;
        }
      }
    }
    setError('');
    return true;
  };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (!validateFiles(files, type)) return;

    if (type === 'image') {
      setImageFiles(files);
      setVideoFiles([]); // Clear videos if uploading images
    } else {
      setVideoFiles(files);
      setImageFiles([]); // Clear images if uploading videos
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (!title.trim()) return setError('Title is required');

    // Must upload either images or videos, not both
    if ((!imageFiles.length && !videoFiles.length) || (imageFiles.length && videoFiles.length)) {
      return setError('Upload either images or videos, not both');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);

    if (imageFiles.length) {
      imageFiles.forEach(file => formData.append('images', file));
    }
    if (videoFiles.length) {
      videoFiles.forEach(file => formData.append('videos', file));
    }

    try {
      const res = await api.post('/gallery/', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      setUploadProgress(0);
      toast.success('Upload completed successfully!');

      // Clear form
      setTitle('');
      setCategory('event');
      setImageFiles([]);
      setVideoFiles([]);
      fetchGalleryItems();
    } catch (err) {
      console.error(err);
      setError('Upload failed');
      toast.error('Upload failed');
      setUploadProgress(0);
    }

  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`/gallery/${id}`);
      fetchGalleryItems();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Gallery Upload</h2>

      <input
        type="text"
        placeholder="Enter gallery title"
        className="w-full border p-2 mb-4 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      >
        <option value="Irrigation">Irrigation</option>
        <option value="Mechanization">Mechanization</option>
        <option value="Fertalization">Fertalization</option>
      </select>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="space-y-4">
        {/* Image Tab */}
        <div className="border rounded-lg shadow-sm">
          <button
            onClick={() => setOpenTab('images')}
            className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium"
          >
            Upload Images
          </button>
          {openTab === 'images' && (
            <div className="p-6 bg-white">
              <div className="flex justify-center">
                <div
                  className="w-32 h-32 border-2 border-dashed border-emerald-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-50"
                  onClick={() => imageInputRef.current.click()}
                >
                  <FaImage className="text-emerald-700 text-4xl" />
                </div>
              </div>
              <p className="text-center mt-2 text-sm text-gray-500">Click the avatar to upload image(s)</p>
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'image')}
                className="hidden"
                multiple
              />
            </div>
          )}
        </div>

        {/* Video Tab */}
        <div className="border rounded-lg shadow-sm">
          <button
            onClick={() => setOpenTab('videos')}
            className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium"
          >
            Upload Videos
          </button>
          {openTab === 'videos' && (
            <div className="p-6 bg-white">
              <div className="flex justify-center">
                <div
                  className="w-32 h-32 border-2 border-dashed border-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-50"
                  onClick={() => videoInputRef.current.click()}
                >
                  <FaVideo className="text-blue-500 text-4xl" />
                </div>
              </div>
              <p className="text-center mt-2 text-sm text-gray-500">Click the avatar to upload video(s)</p>
              <input
                type="file"
                ref={videoInputRef}
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
                className="hidden"
                multiple
              />
            </div>
          )}
        </div>
      </div>
      {uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-emerald-600 h-4 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          />
          <p className="text-sm text-gray-600 mt-1 text-center">{uploadProgress}%</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded"
      >
        Submit
      </button>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Uploaded Gallery</h3>

        {Array.isArray(galleryItems) && galleryItems
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map(item => (
            <div key={item._id} className="mb-6 border rounded-lg p-4 bg-gray-50 relative">
              <h4 className="font-medium mb-2">
                {item.title} - <em className="text-sm text-gray-600 capitalize">{item.category}</em>
              </h4>
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Delete"
              >
                <FaTrash />
              </button>
              <div className="grid grid-cols-2 gap-4">
                {item.imageUrl?.map((url, i) => (
                  <img key={i} src={url} alt="uploaded" className="w-full h-32 object-cover rounded" />
                ))}
                {item.videoUrl?.map((url, i) => (
                  <video key={i} src={url} controls className="w-full h-32 object-cover rounded" />
                ))}
              </div>
            </div>
          ))}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-3 py-1 text-sm">
            Page {currentPage} of {Math.ceil(galleryItems.length / itemsPerPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage(p => (p < Math.ceil(galleryItems.length / itemsPerPage) ? p + 1 : p))
            }
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            disabled={currentPage === Math.ceil(galleryItems.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default AddGallery;
