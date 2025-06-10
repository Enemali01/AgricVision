import * as FaIcon from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from './api'


export const columns = [
  {
    name: 'SN',
    selector: (row) => row.sno,
    width: '80px',
  },
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
    center: true,
  },
  {
    name: 'Description',
    selector: (row) => row.description,
    width: '480px',
    center: true,
  },
  {
  name: 'Tags',
  cell: (row) => row.tags?.join(', '),
  width: '180px',
  center: true,
},
  {
    name: 'Prouct Image',
    selector: (row) => row.file,
    cell: (row) => (
      <div className='align-items-center d-flex rounded'>
        <img src={row.file} style={{ width: '38px', height: '38px' }} />
      </div>
    ),
    center: true,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    center: true
    // maxWidth:'100px',
  },
]


export const BlogButton = ({ id, postDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete')
    if (confirm) {
      try {
        const response = await api.delete(`/blog/deletPost/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        if (response.data.message) {
          toast.success(response.data.message)
          postDelete(id)
          window.location.reload()
        }

      } catch (error) {
        console.error(error || 'Something Went Wrong, Try Again!')
      }
    }
  }
  return (
    <div className='flex space-x-3'>
       <button className='' onClick={() => navigate(`/admin/dashboard/single/${id}`)}><FaIcon.FaEye style={{ color: 'green' }} /></button>
      <div>
        <button className='' onClick={() => navigate(`/admin/dashboard/post/${id}`)}>
          <FaIcon.FaPencilAlt style={{ color: 'gray' }} /></button>
      </div>
      <button className='' onClick={() => handleDelete(id)}><FaIcon.FaTrash style={{ color: 'red' }} /></button>
    </div>
  )
}