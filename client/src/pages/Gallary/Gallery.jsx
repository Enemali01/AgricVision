// import React, { useEffect, useState } from 'react';
// import Header from '../../components/Header/Header';
// import api from '../../utils/api';

// const ITEMS_PER_PAGE = 6;

// const Gallery = () => {
//   const [gallery, setGallery] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('images');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [previewType, setPreviewType] = useState('image');

//   useEffect(() => {
//     const getGallery = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/api/gallery/');
//         setGallery(response.data || []);
//       } catch (error) {
//         console.error(error || 'Something went wrong!');
//       } finally {
//         setLoading(false);
//       }
//     };
//     getGallery();
//   }, []);

//   const filteredGallery = gallery.filter(item => {
//     const hasMedia = activeTab === 'images' ? item.imageUrl?.length : item.videoUrl?.length;
//     const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
//     return hasMedia && matchesCategory;
//   });

//   const paginatedItems = filteredGallery.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const totalPages = Math.ceil(filteredGallery.length / ITEMS_PER_PAGE);
//   const categories = [...new Set(gallery.map(item => item.category))];

//   const openPreview = (url, type) => {
//     setPreviewUrl(url);
//     setPreviewType(type);
//   };

//   const closePreview = () => {
//     setPreviewUrl(null);
//     setPreviewType('image');
//   };

//   return (
//     <>
//       <Header />

//       <section className="max-w-6xl mx-auto px-4 mt-20">
//         <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//           <div className="flex gap-2">
//             <button
//               onClick={() => {
//                 setActiveTab('images');
//                 setCurrentPage(1);
//               }}
//               className={`px-4 py-2 rounded ${activeTab === 'images' ? 'bg-emerald-700 text-white' : 'bg-gray-200'}`}
//             >
//               Images
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('videos');
//                 setCurrentPage(1);
//               }}
//               className={`px-4 py-2 rounded ${activeTab === 'videos' ? 'bg-emerald-700 text-white' : 'bg-gray-200'}`}
//             >
//               Videos
//             </button>
//           </div>

//           <select
//             value={selectedCategory}
//             onChange={(e) => {
//               setSelectedCategory(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="border border-gray-300 rounded px-4 py-2"
//           >
//             <option value="all">All Categories</option>
//             {categories.map((cat, i) => (
//               <option key={i} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
//                 <div className="h-48 bg-gray-300 rounded mb-4"></div>
//                 <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {paginatedItems.length ? (
//                 paginatedItems.map(item => (
//                   <div key={item._id} className="bg-white rounded-lg shadow p-4">
//                     <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
//                     <span className="inline-block bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded mb-2 capitalize">
//                       {item.category}
//                     </span>
//                     <div className="grid grid-cols-2 gap-3 mt-3">
//                       {activeTab === 'images' &&
//                         item.imageUrl?.map((url, i) => (
//                           <img
//                             key={i}
//                             src={url}
//                             alt={`Gallery ${i}`}
//                             className="w-full h-32 object-cover rounded cursor-pointer"
//                             onClick={() => openPreview(url, 'image')}
//                           />
//                         ))}
//                       {activeTab === 'videos' &&
//                         item.videoUrl?.map((url, i) => (
//                           <video
//                             key={i}
//                             src={url}
//                             controls
//                             className="w-full h-32 object-cover rounded cursor-pointer"
//                             onClick={() => openPreview(url, 'video')}
//                           />
//                         ))}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center text-gray-500 col-span-full">
//                   No {activeTab} found for selected category.
//                 </div>
//               )}
//             </div>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="flex justify-center mt-8 space-x-2">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </section>

//       {/* Lightbox Modal */}
//       {previewUrl && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="relative bg-white rounded shadow-lg p-4 max-w-3xl w-full">
//             <button
//               onClick={closePreview}
//               className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
//             >
//               &times;
//             </button>
//             {previewType === 'image' ? (
//               <img src={previewUrl} alt="Preview" className="w-full h-auto rounded" />
//             ) : (
//               <video src={previewUrl} controls className="w-full h-auto rounded" />
//             )}
//           </div>
//         </div>
//       )}

//     </>
//   );
// };

// export default Gallery;


// import React, { useEffect, useState } from 'react';
// import Header from '../../components/Header/Header';
// import api from '../../utils/api';

// const ITEMS_PER_PAGE = 6;

// const Gallery = () => {
//   const [gallery, setGallery] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('images');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [previewType, setPreviewType] = useState('image');

//   useEffect(() => {
//     const getGallery = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/api/gallery/');
//         setGallery(response.data || []);
//       } catch (error) {
//         console.error(error || 'Something went wrong!');
//       } finally {
//         setLoading(false);
//       }
//     };
//     getGallery();
//   }, []);

//   const filteredGallery = gallery.filter(item => {
//     const hasMedia = activeTab === 'images' ? item.imageUrl?.length : item.videoUrl?.length;
//     const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
//     return hasMedia && matchesCategory;
//   });

//   const paginatedItems = filteredGallery.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const totalPages = Math.ceil(filteredGallery.length / ITEMS_PER_PAGE);
//   const categories = [...new Set(gallery.map(item => item.category))];

//   const openPreview = (url, type) => {
//     setPreviewUrl(url);
//     setPreviewType(type);
//   };

//   const closePreview = () => {
//     setPreviewUrl(null);
//     setPreviewType('image');
//   };

//   return (
//     <>
//       <Header />

//       <section className="max-w-6xl mx-auto px-4 mt-20">
//         <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//           <div className="flex gap-2">
//             <button
//               onClick={() => {
//                 setActiveTab('images');
//                 setCurrentPage(1);
//               }}
//               className={`px-4 py-2 rounded ${activeTab === 'images' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             >
//               Images
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('videos');
//                 setCurrentPage(1);
//               }}
//               className={`px-4 py-2 rounded ${activeTab === 'videos' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             >
//               Videos
//             </button>
//           </div>

//           <select
//             value={selectedCategory}
//             onChange={(e) => {
//               setSelectedCategory(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="border border-gray-300 rounded px-4 py-2"
//           >
//             <option value="all">All Categories</option>
//             {categories.map((cat, i) => (
//               <option key={i} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
//                 <div className="h-48 bg-gray-300 rounded mb-4"></div>
//                 <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {paginatedItems.length ? (
//                 paginatedItems.map(item => (
//                   <div key={item._id} className="bg-white rounded-lg shadow p-4">
//                     <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
//                     <span className="inline-block bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded mb-2 capitalize">
//                       {item.category}
//                     </span>

//                     <div
//                       className={`grid ${
//                         activeTab === 'images' && item.imageUrl?.length === 1
//                           ? 'grid-cols-1'
//                           : 'grid-cols-2'
//                       } gap-3 mt-3`}
//                     >
//                       {activeTab === 'images' &&
//                         item.imageUrl?.map((url, i) => (
//                           <img
//                             key={i}
//                             src={url}
//                             alt={`Gallery ${i}`}
//                             className={`w-full ${
//                               item.imageUrl?.length === 1 ? 'h-60' : 'h-32'
//                             } object-cover rounded cursor-pointer`}
//                             onClick={() => openPreview(url, 'image')}
//                           />
//                         ))}
//                       {activeTab === 'videos' &&
//                         item.videoUrl?.map((url, i) => (
//                           <video
//                             key={i}
//                             src={url}
//                             controls
//                             className="w-full h-32 object-cover rounded cursor-pointer"
//                             onClick={() => openPreview(url, 'video')}
//                           />
//                         ))}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center text-gray-500 col-span-full">
//                   No {activeTab} found for selected category.
//                 </div>
//               )}
//             </div>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="flex justify-center mt-8 space-x-2">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </section>

//       {/* Lightbox Modal */}
//       {previewUrl && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="relative bg-white rounded shadow-lg p-4 max-w-4xl w-full max-h-[90vh] overflow-auto">
//             <button
//               onClick={closePreview}
//               className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
//             >
//               &times;
//             </button>
//             {previewType === 'image' ? (
//               <img src={previewUrl} alt="Preview" className="w-full max-h-[80vh] object-contain rounded" />
//             ) : (
//               <video src={previewUrl} controls className="w-full max-h-[80vh] object-contain rounded" />
//             )}
//           </div>
//         </div>
//       )}

//       {/* Extra Features Section */}
//       <section className="max-w-6xl mx-auto px-4 mt-20 mb-10">
//         <h2 className="text-2xl font-semibold mb-4">Other Features</h2>
//         <ul className="list-disc list-inside space-y-2 text-gray-700">
//           <li>Dynamic tab switching between images and videos</li>
//           <li>Responsive category filter</li>
//           <li>Paginated media display</li>
//           <li>Lightbox for image/video preview</li>
//           <li>Single-image grid expands to full column</li>
//           <li>More enhancements coming soon...</li>
//         </ul>
//       </section>
//     </>
//   );
// };

// export default Gallery;



import React, { useEffect, useState, useRef, useCallback } from 'react'; 
import Header from '../../components/Header/Header'; 
import api from '../../utils/api';
import { Footer } from '../../components/Footer/Footer';
import { IoIosCloseCircle} from 'react-icons/io';

const Gallery = () => {
   const [gallery, setGallery] = useState([]); 
   const [loading, setLoading] = useState(false); 
   const [activeTab, setActiveTab] = useState('images'); 
   const [selectedCategory, setSelectedCategory] = useState('all'); 
   const [previewIndex, setPreviewIndex] = useState(null); 
   const [previewType, setPreviewType] = useState('image'); 
   const loaderRef = useRef(null); 
   const ITEMS_BATCH = 6; 
   const [visibleItems, setVisibleItems] = useState(ITEMS_BATCH);

useEffect(() => { 
  const getGallery = async () => {
     try { setLoading(true); 
      const response = await api.get('/gallery/'); 
      setGallery(response.data || []);
     } catch (error) { 
      console.error(error || 'Something went wrong!'); 
    } finally {
       setLoading(false); 
    }
   }; getGallery(); 
  }, []);

const filteredGallery = gallery.filter(item => { 
  const hasMedia = activeTab === 'images' ? item.imageUrl?.length : item.videoUrl?.length; const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory; return hasMedia && matchesCategory; 
});

const itemsToShow = filteredGallery.slice(0, visibleItems);

const handleObserver = useCallback((entries) => { 
  const target = entries[0]; 
  if (target.isIntersecting) { setVisibleItems((prev) => Math.min(prev + ITEMS_BATCH, filteredGallery.length)); 
  } }, [filteredGallery.length]);

useEffect(() => { 
  const option = {
     root: null, rootMargin: '20px', threshold: 1.0 
    }; 
  const observer = new IntersectionObserver(handleObserver, option); 
  if (loaderRef.current) observer.observe(loaderRef.current); return () => observer.disconnect(); 
}, [handleObserver]);

const categories = [...new Set(gallery.map(item => item.category))];

const openPreview = (index, type) => { 
  setPreviewIndex(index); setPreviewType(type); 
};

const closePreview = () => { 
  setPreviewIndex(null); 
};

const nextPreview = () => { 
  if (previewIndex < itemsToShow.length - 1) 
    setPreviewIndex(previewIndex + 1); 
  };

const prevPreview = () => { 
  if (previewIndex > 0) 
    setPreviewIndex(previewIndex - 1); 
  };

return ( 
<> 
<Header />

<section className="max-w-6xl mx-auto px-4 mt-20">
    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => {
            setActiveTab('images');
            setVisibleItems(ITEMS_BATCH);
          }}
          className={`px-4 py-2 rounded ${activeTab === 'images' ? 'bg-emerald-700 text-white' : 'bg-gray-200'}`}
        >
          Images
        </button>
        <button
          onClick={() => {
            setActiveTab('videos');
            setVisibleItems(ITEMS_BATCH);
          }}
          className={`px-4 py-2 rounded ${activeTab === 'videos' ? 'bg-emerald-700 text-white' : 'bg-gray-200'}`}
        >
          Videos
        </button>
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setVisibleItems(ITEMS_BATCH);
        }}
        className="border border-gray-300 rounded px-4 py-2"
      >
        <option value="all">All Categories</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="h-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsToShow.length ? (
            itemsToShow.map((item, index) => (
              <div key={item._id} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <span className="inline-block bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded mb-2 capitalize">
                  {item.category}
                </span>

                <div className={`grid ${activeTab === 'images' && item.imageUrl?.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-3 mt-3`}>
                  {activeTab === 'images' && item.imageUrl?.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Gallery ${i}`}
                      className={`w-full ${item.imageUrl?.length === 1 ? 'h-60' : 'h-32'} object-cover rounded cursor-pointer`}
                      onClick={() => openPreview(index, 'image')}
                    />
                  ))}
                  {activeTab === 'videos' && item.videoUrl?.map((url, i) => (
                    <video
                      key={i}
                      src={url}
                      controls
                      className="w-full h-32 object-cover rounded cursor-pointer"
                      onClick={() => openPreview(index, 'video')}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">
              No {activeTab} found for selected category.
            </div>
          )}
        </div>

        <div ref={loaderRef} className="h-10 mt-8"></div>
      </>
    )}
  </section>

  {previewIndex !== null && (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded shadow-lg p-4 max-w-4xl w-full max-h-[90vh] overflow-auto">
        <button onClick={closePreview} className="absolute top-2 right-2 text-red-500 text-xl"><IoIosCloseCircle /></button>
        
        {previewType === 'image' ? (
          itemsToShow[previewIndex]?.imageUrl?.map((url, i) => (
            <img key={i} src={url} alt="Preview" className="w-full max-h-[80vh] object-contain rounded mb-2 mt-4" />
          ))
        ) : (
          itemsToShow[previewIndex]?.videoUrl?.map((url, i) => (
            <video key={i} src={url} controls className="w-full max-h-[80vh] object-contain rounded mb-2" />
          ))
        )}
        <div className="flex items-center justify-between mb-4 px-4">
          <button onClick={prevPreview} disabled={previewIndex === 0} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Prev</button>
          <button onClick={nextPreview} disabled={previewIndex >= itemsToShow.length - 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  )}

  <Footer/>
</>

); };

export default Gallery;


