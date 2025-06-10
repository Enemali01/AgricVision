import { FaPencilAlt, FaTrash } from "react-icons/fa"
import api from "./api"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"


export const column = [
   {
    name: 'SN',
    selector: (row) => row.sno,
    width: '80px',
  },
  {
    name: 'Lastname',
    selector: (row) => row.lastname,
    center: 'true',
    sortable: true,
  },
  {
    name: 'Firstname',
    selector: (row) => row.firstname,
    center: 'true',
  },
  {
    name: 'Email Address',
    selector: (row) => row.email,
    center: 'true',
  },
  {
    name: 'Phone',
    selector: (row) => row.phone,
    center: 'true',
  },
  {
    name: 'Position',
    selector: (row) => row.position,
    center: 'true',
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    center: 'true',
  }
]

export const MemberBuuton = ({id, memberDelete}) => {
  const navigate = useNavigate();
  const handleDelete = async(id) =>{
    const confirm = window.confirm('Are you sure you want to delete the member?')
      if(confirm){
        try {
          const response = await api.delete(`/member/remove/${id}`,{
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          if(response.data.message){
            toast.success(response.data.message)
            memberDelete(id)
            navigate('/admin/dashboard/MemberDashboard')
          }
        } catch (error) {
          console.error(error || 'Something Went Wrong, Try Again!')
        }
      }
  }
  return (
    <>
    <div className='flex space-x-3'>
          <div>
            <button className='' onClick={() => navigate(`/admin/dashboard/member/${id}`)}>
              <FaPencilAlt style={{ color: 'gray' }} /></button>
          </div>
          <button className='' onClick={() => handleDelete(id)}><FaTrash style={{ color: 'red' }} /></button>
        </div>
    </>
  )
}