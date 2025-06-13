import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import api from '../../utils/api'
import { column, MemberBuuton } from '../../utils/MemberHelpers'
import { Link } from 'react-router-dom'


const MemberDashboard = () => {
  const [members,setMembers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [filterMember, setFilterMember] = useState([])
   
  const memberDelete = ()=> {
    const data =  members.filter(member => member._id !== id)
    setMembers(data);
  }

  useEffect(()=>{
    const fetchMember = async()=>{
      try {
        setLoading(true);
        const response = await api.get('/member/getMember', {withCredentials: true})
        if(response.data.message){
          let sno = 1;
          const data = await response.data.members.map((member) => ({
           _id:member.id,
           sno: sno++,
           lastname:member.lastname,
           firstname:member.firstname,
           email:member.email,
           phone:member.phone,
           position:member.position,
           action: <MemberBuuton id={member._id} memberDelete={memberDelete}/>

          }))
          setMembers(data)
        }
      } catch (error) {
        console.error(error)
      }finally{
        setLoading(false)
      }
    }
    fetchMember()
  },[])
  

  
  return (
    <>
    {loading ? <div className='flex items-center justify-center space-x-2'>
        <div className='w-5 h-3 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin'></div>
        <div className='text-emerald-700 font-medium'>
          Loading Member....
        </div>
      </div> :
      <section>
        <h4 className='text-center text-2xl mb-10'>Manage Members</h4>
       
        <DataTable
        columns={column}
        data={members}
        pagination
        />
      </section>
      }
    </>
  )
}

export default MemberDashboard