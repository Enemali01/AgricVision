import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Header from '../../components/Header/Header';
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon
} from 'react-share';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog/posts/${id}`);
        setPost(res.data); // Use res.data based on your confirmation
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <>
      <Header />
      <section className="bg-white py-12 px-4 mt-30">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="w-full h-72 bg-gray-200 rounded-lg" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mt-4" />
              <div className="h-4 bg-gray-200 rounded w-full mt-2" />
              <div className="h-4 bg-gray-200 rounded w-5/6 mt-2" />
              <div className="h-4 bg-gray-200 rounded w-4/6 mt-2" />
            </div>
          ) : post ? (
            <>
              <img
                src={post?.file || 'https://via.placeholder.com/600x300?text=No+Image'}
                alt={post?.title || 'Post Image'}
                className="w-full h-72 object-cover rounded-lg"
              />
              <h1 className="text-3xl font-bold text-green-800 mt-6">{post?.title}</h1>
              <p className="text-sm text-gray-600 mt-4">
                {" "}
                <strong className="font-bold text-green-700">
                  {post?.tags?.join(', ') || 'None'}
                </strong>
              </p>
              <p className="text-gray-700 mt-4 text-lg whitespace-pre-line">{post?.description}</p>
              <p className="text-sm text-gray-600 mt-4">
                {" "}
                <strong className="font-bold text-green-700">
                  {post?.tags?.join(', ') || 'None'}
                </strong>
              </p>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 mt-6">
                <FacebookShareButton url={currentUrl} quote={post?.title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton url={currentUrl} title={post?.title}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <button
                  onClick={handleCopyLink}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 text-sm"
                >
                  Copy Link
                </button>
              </div>

              {/* Back Button */}
              <div className="mt-8">
                <button
                  onClick={() => navigate('/blog')}
                  className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800"
                >
                  ← Back to Blog
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-red-500">Post not found</p>
          )}
        </div>
      </section>
    
    </>
  );
}
 