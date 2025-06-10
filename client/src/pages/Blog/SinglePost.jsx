import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../utils/api';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blog/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load post:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-6 w-40 bg-gray-300 rounded mb-4" />
        <div className="h-64 w-full bg-gray-300 rounded mb-4" />
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-full bg-gray-300 rounded mb-2" />
        <div className="h-4 w-5/6 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-red-500">
        Post not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/admin/dashboard/blogdashboard" className="flex items-center text-emerald-700 hover:text-teal-600 mb-4">
        <FaArrowLeft className="mr-2" /> Back to Blog Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">Tags: {post.tags.join(', ')}</div>

      {post.file && (
        <img
          src={post.file}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{post.description}</p>
    </div>
  );
};

export default SinglePost;

