// import React, { useEffect, useState } from 'react';
// // import { FaHeart, FaLocationArrow } from 'react-icons/fa';
// // import dayjs from 'dayjs';
// // import axios from 'axios';
// import Header from '../../components/Header/Header';
// import api from '../../utils/api';

// export default function Blog() {
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(()=>{
//     const getAll = async() => {
//       try {
//         setLoading(true)
//         const response = await api.get('/api/blog/getPost')
//         setPosts(response.data.posts)
//       } catch (error) {
//          console.log(error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     getAll();
//   },[])

//   if (loading) return <div className='flex items-center justify-center space-x-2 mt-70'>
//   <div className='w-5 h-3 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin'></div>
//   <div className='text-emerald-700 font-medium'>
//     Loading Blog Post...
//   </div>
// </div>;

//   return (
//     <>
//     <Header/>
//     <section className="bg-white py-16 px-4">
//       <div className="max-w-6xl mx-auto text-center mb-12 mt-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-green-800">
//           Explore our blog on Seeds, Cultivation, and Irrigation 🌾
//         </h2>
//         <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
//           Stay informed with our latest tips and insights for modern agriculture.
//         </p>
//       </div>
//       {posts ? (
//         <section>
//           <div className='flex shadow-lg max-w-3xl mx-auto mt-30 bg-white rounded-md shadow-lg py-4 px-3'>
//             <div className=''>
//               <div className='rounded-xl overflow-hidden'>
//                 <img className='w-full' src={posts.file} alt='Blog Post' />
//               </div>
//               <h2 className='text-success py-1 px-2'>{posts.title}</h2>
//               <p className='text-1xl md:text-1xl mt-1'>{posts.description}</p>
//                <p className='text-1xl md:text-1xl mt-1'>{posts.tags}</p>
//             </div>
//           </div>

       

//         </section>
//       ) : (
//         <div>Loading...</div>
//       )}

//       </section>
//     </>
//   );
// }


import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import api from '../../utils/api';
import { Link } from 'react-router-dom';


export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const getAll = async () => {
      try {
        setLoading(true);
        const response = await api.get('/blog/getPost');
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAll();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12 mt-10">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Explore our blog on Seeds, Cultivation, and Irrigation 🌾
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Stay informed with our latest tips and insights for modern agriculture.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentPosts.map((post) => (
                <div
                  key={post._id}
                  className="shadow-md bg-white rounded-md overflow-hidden"
                >
                  <img
                    src={post.file}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-green-800">{post.title}</h3>
                     <p className="text-gray-700 text-sm mt-2">
                      {post.description.slice(0, 100)}...
                      <Link
                        to={`/blog/${post._id}`}
                        className="text-green-700 font-medium ml-1 underline"
                      >
                        Read more
                      </Link>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                {(typeof post.tags === 'string' ? post.tags.split(' ') : Array.isArray(post.tags) ? post.tags : []).map((post, idx) => (
                  <span key={idx} className="bg-gray-300 text-emerald-800 px-3 py-1 rounded-full text-sm">
                    {post}
                  </span>
                ))}
              </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-200 text-green-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}



