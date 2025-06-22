import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';


const LatestBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blog/getPost/?limit=3')
      .then(response => {
        setBlogs(response.data.posts); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  const skeletons = Array.from({ length: 3 });

  return (
    <section className="py-16 px-6 md:px-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10 text-green-800">Our Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {loading
          ? skeletons.map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-100 rounded-lg shadow p-6">
                <div className="w-full h-48 bg-gray-300 rounded mb-4" />
                <div className="h-6 bg-gray-300 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))
          : Array.isArray(blogs) && blogs.map(blog => (
              <div key={blog._id} className="bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1">
                <img src={blog.file} alt={blog.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600">{blog.excerpt}</p>
                  <Link to={`/blog/${blog._id}`} className="text-green-600 hover:underline mt-4 block">Read More</Link>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default LatestBlog;
