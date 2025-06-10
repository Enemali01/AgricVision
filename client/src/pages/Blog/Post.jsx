import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { toast } from 'react-toastify'


const Post = () => {
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [tags, setTags] = useState('')
const [file, setFile] = useState('')
const [error, setError] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tags', tags);
      formData.append('file', file);
      
      const response = await api.post('/blog/posts', formData, {withCredentials: true })
      console.log(response.data)
      if(response.data.message){
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message)
    }
  }
  return (
    <div className="max-w-3xl mx-auto  bg-white rounded-md shadow-lg w-98 p-6 px-4 py-">
            <h3 className="text-xl font-bold mb-4">Add New Blog Post</h3>
            <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <input
                name='title'
                type="text"
                placeholder="Title"
                className="w-full p-3 border rounded"
                onChange={(e)=> setTitle(e.target.value)}
              />
              <textarea
              name='description'
                placeholder="Content"
                className="w-full p-3 border rounded h-32"
                onChange={(e)=> setDescription(e.target.value)}
              ></textarea>
              <input 
              type='file'
              name='file'
              accept='png,jpeg,jpg'
              className='w-full p-3 border rounded'
              onChange={(e) => setFile(e.target.files[0])}
              />
               <input 
              type='name'
              name='tags'
              placeholder="Tags"
              className='w-full p-3 border rounded'
              onChange={(e)=> setTags(e.target.value)}
              />
              <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
                Publish
              </button>
            </form>
          </div>
  )
}

export default Post