import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Blog from '../pages/Blog/Blog.';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import MemberDashboard from '../pages/Members/MemberDashboard';
import Post from '../pages/Blog/Post';
import Summary from '../components/Summary/Summary';
import Login from '../pages/Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import BlogDasboard from '../pages/Blog/BlogDasboard';
import BlogCategory from '../pages/Blog/BlogCategory';
import EditPost from '../pages/Blog/EditPost';
import BlogDetails from '../pages/Blog/BlogDetails';
import SinglePost from '../pages/Blog/SinglePost';
import ChangePassword from '../pages/Setting/ChangePassword'
import AddMember from '../pages/Members/AddMember';
import EditMember from '../pages/Members/EditMember';
import AddGallery from '../pages/Gallary/AddGallery';
import GallaryDashboard from '../pages/Gallary/GallaryDashboard';
import Gallery from '../pages/Gallary/Gallery';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/login' element={<Login />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path="/blog/:id" element={<BlogDetails />} />


      <Route path='/admin/dashboard' element={
        <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
        }>
        
       <Route path='/admin/dashboard/post/:id' element={
        <PrivateRoute>
        <EditPost />
      </PrivateRoute>
       }/>
       <Route path='/admin/dashboard/member/:id' element={
        <PrivateRoute>
          <EditMember/>
        </PrivateRoute>
       }/>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path='dashboard' element={<Summary />} />
        <Route path='memberDashboard' element={<MemberDashboard />} />
        <Route path='add-member' element={<AddMember />} />
        <Route path='add-post' element={<Post />} />
        <Route path='blogdashboard' element={<BlogDasboard />} />
        <Route path='blogcategory' element={<BlogCategory />} />
        <Route path='single/:id' element={<SinglePost />} />
        <Route path='change-password' element={<ChangePassword />} />
        <Route path='galleryDashboard' element={<GallaryDashboard />} />
        <Route path='add-gallery' element={<AddGallery />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
