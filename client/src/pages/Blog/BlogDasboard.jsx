import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { BlogButton, columns } from '../../utils/BlogHelpers'
import api from '../../utils/api'


const BlogDasboard = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])


  const postDelete = async() => {
    const data = posts.filter(post => post._id !== id)
    setPosts(data);
  }

  useEffect(() => {
    const getAll = async () => {
      try {
        setLoading(true)
        const response = await api.get('/blog/getPost', {
          withCredentials: true 
        })
        if (response.data.message) {
          let sno = 1;
          const data = await response.data.posts.map((post) => ({
            _id: post._id,
            sno: sno++,
            title: post.title,
            description: post.description,
            tags: post.tags,
            file: post.file,
            action: <BlogButton id={post._id} postDelete={postDelete}/>,
          }))
          setPosts(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getAll();
  }, [])

  return (
    <>
      {loading ? <div className='flex items-center justify-center space-x-2'>
        <div className='w-5 h-3 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin'></div>
        <div className='text-emerald-700 font-medium'>
          Loading Post....
        </div>
      </div> :

        <DataTable
          columns={columns}
          data={posts}
          progressPending={loading}
          pagination
        />
      }
    </>
  )
}

export default BlogDasboard