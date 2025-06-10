import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as FaIcon from 'react-icons/fa'
import api from '../../utils/api'


const EditPost = () => {
  const post = {
    title: '',
    tags: [],
    description: '',
    file: null,
    image: '',
  }

  const [posts, setPosts] = useState(post)
  const { id } = useParams();


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setPosts({ ...posts, [name]: value });
  };

  useEffect(() => {
    api.get(`/blog/posts/${id}`,
          {withCredentials: true }
        )
      .then((res) => {
        setPosts(prev => ({ ...prev, ...res.data, image: res.data.file, fill: null }))
      }).catch((error) => { console.log(error) })

  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = posts.file;

      // Upload to Cloudinary if a new file was selected
      if (posts.file) {
        const formData = new FormData();
        formData.append("file", posts.file);
        formData.append("agricVision", "agricVision");

        const res = await fetch("https://api.cloudinary.com/v1_1/djr8tvkf7E/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        imageUrl = data.secure_url;
      }
      // Now update the blog post using API
      await api.put(`/api/blog/update/${id}`, {
        title: posts.title,
        tags: posts.tags,
        description: posts.description,
        file: imageUrl,
      });
      toast.success("Post updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update post.");
    }
  };



  return (
    <>
      <section>
        <div className='py-1 px-1'>
          <NavLink to='/admin/dashboard/blogdashboard' className='w-20 block flex items-center block bg-emerald-700  hover:bg-teal-600 space-x-1 text-white rounded py-2 px-3 text-decoration-none'><FaIcon.FaArrowLeft />Back</NavLink>
        </div>
        <div className='max-w-2xl mx-auto bg-white rounded-md shadow-lg w-full px-2 py-2'>
          <h4 className='text-2xl font-bold text-center'>Edit blog Post</h4>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='mt-3'>
              <label
                htmlFor='title'
                className='text-sm py-2 px-2 font-medium text-gray-700'
              >Title
              </label>
              <input
                type='text'
                name='title'
                className='mt-1 w-full p-2 border border-gray-400 rounded-md'
                value={posts.title}
                onChange={inputHandler}
                id='title'
              />
              <label
                htmlFor='tags'
                className='text-sm py-2 px-2 font-medium text-gray-700'
              >Tags
              </label>
              <input
                type='text'
                name='tags'
                className='mt-1 w-full p-2 border border-gray-400 rounded-md'
                onChange={(e) => setPosts({ ...posts, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                value={posts.tags.join(', ')}
              />
              <label
                htmlFor='description'
                className='text-sm py-2 px-2 font-medium text-gray-700'
              >Description
              </label>
              <textarea
                type='text'
                name='description'
                className='mt-1 p-2 block w-full border border-gray-400 rounded-md'
                rows='4'
                onChange={inputHandler}
                id='description'
                value={posts.description}
              ></textarea>
              <label htmlFor='fileUpload'>Select Image</label>
              <input
                type='file'
                accept='image/png, image/jpeg, image/jpg'
                name='file'
                className='block w-full border border-gray-400 rounded-md p-2 mt-1 py-2 px-3 mb-1'
                onChange={(e) => {
                  if (e.target.files &&
                    e.target.files[0]) {
                    setPosts({ ...posts, file: e.target.files[0] });
                  }
                }}
              />
              {posts.file && (
                <p className="text-sm text-gray-600 mb-1">Selected: {posts.file.name}</p>
              )}
              {/* Image preview */}
              {posts.file instanceof File ? (
                <img
                  src={URL.createObjectURL(posts.file)}
                  alt="Selected"
                  className="w-43 h-32 object-cover my-2 rounded"
                />
              ) : posts.image ? (
                <img
                  src={posts.image}
                  alt="Current"
                  className="w-48 h-32 object-cover my-2 rounded"
                />
              ) : null}

            </div>
            <button type='submit' className='w-full bg-emerald-700 py-2 px-2 text-white hover:bg-teal-600'>Edit Blog Post</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default EditPost