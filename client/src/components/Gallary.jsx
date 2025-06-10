import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { IoMdClose } from 'react-icons/io';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api.get('/gallery/?limit=3')
      .then(response => {
        setGalleryItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching gallery items:', error);
        setLoading(false);
      });
  }, []);

  const skeletons = Array.from({ length: 3 });

  return (
    <section className="py-16 px-6 md:px-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10 text-green-800">Gallery</h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {loading
          ? skeletons.map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-100 rounded-lg shadow p-6">
                <div className="w-full h-48 bg-gray-300 rounded mb-4" />
                <div className="h-6 bg-gray-300 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
            ))
          : Array.isArray(galleryItems) && galleryItems.map(item => (
              <div
                key={item._id || item.id}
                onClick={() => setSelectedImage(item.imageUrl[0])}
                className="cursor-pointer bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <img
                  src={item.imageUrl[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.category}</p>
                </div>
              </div>
            ))}
      </div>

      {/* View More Button */}
      <div className="mt-10">
        <a
          href="/gallery"
          className="inline-block bg-green-700 hover:bg-green-900 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          View More Galleries
        </a>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
            >
              <IoMdClose size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
