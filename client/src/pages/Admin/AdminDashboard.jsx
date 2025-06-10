import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import {
  FaPlusCircle,
  FaThList,
  FaTags,
  FaTachometerAlt,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import {MdBrowseGallery, MdCardMembership} from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Summary from "../../components/Summary/Summary";
import { useAuth } from "../../components/Hooks/authContext";




export default function AdminDashboard() {
  const {logout} = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postDropdownOpen, setPostDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  const [settingDropdownOpen, setSettingDropdownOpen] = useState(false);
  const location = useLocation();

  const isDashboardRoute = location.pathname === "/admin/dashboard" || location.pathname === "/admin/dashboard";

  const handleLogout = () => {
  logout();
}

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-green-800 text-white w-64 p-5 space-y-6
          transform md:translate-x-0 transition-transform duration-300 ease-in-out z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-1xl  font-bold">AgriVision Admin</h1>
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({isActive}) => `${isActive ? "bg-emerald-600" : ""} flex items-center gap-2 px-3 py-1 rounded space-x-2 block py-1 px-2 rounded text-white text-decoration-none cursor-pointer`} end
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <div>
            <button
              className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-green-700 cursor-pointer"
              onClick={() => setPostDropdownOpen(!postDropdownOpen)}
              aria-expanded={postDropdownOpen}
              aria-controls="post-dropdown"
            >
              <span className="flex items-center gap-2" >
                <FaThList /> Posts
              </span>
              <FaChevronDown
                className={`transition-transform duration-200 ${postDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            {postDropdownOpen && (
              <div id="post-dropdown" className="ml-6 mt-2 space-y-2">
                <NavLink to='/admin/dashboard/blogdashboard'
                  // className="flex items-center gap-2 px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                  className={({isActive}) => `${isActive ? "bg-emerald-600" : ""} flex items-center gap-2 px-3 py-1 rounded space-x-2 block py-1 px-2 rounded text-white text-decoration-none cursor-pointer`} end
                >
                   <FaPlusCircle /> Blog Dashboard
                </NavLink>
                <NavLink
                  to="/admin/dashboard/add-post"
                  className={({isActive}) => `${isActive ? "bg-emerald-600" : ""} flex items-center gap-2 px-3 py-1 rounded space-x-2 block py-1 px-2 rounded text-white text-decoration-none cursor-pointer`} end
                >
                  <FaPlusCircle /> Add Blog
                </NavLink>
                <NavLink
                  to="/admin/dashboard/blogcategory"
                  className={({isActive}) => `${isActive ? "bg-emerald-600" : ""} flex items-center gap-2 px-3 py-1 rounded space-x-2 block py-1 px-2 rounded text-white text-decoration-none cursor-pointer`} end
                >
                  <FaTags /> Categories
                </NavLink>
              </div>
            )}
          </div>

            <div>
            <button
              className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-green-700 cursor-pointer"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              aria-expanded={userDropdownOpen}
              aria-controls="post-dropdown"
            >
              <span className="flex items-center gap-2" >
                <FaUsers /> Members
              </span>
              <FaChevronDown
                className={`transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            {userDropdownOpen && (
              <div id="post-dropdown" className="ml-6 mt-2 space-y-2">
                <NavLink to='/admin/dashboard/MemberDashboard'
                  // className="flex items-center gap-2 px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                  className={({isActive}) => `${isActive ? "bg-emerald-600" : ""} flex items-center gap-2 px-3 py-1 rounded space-x-2 block py-1 px-2 rounded text-white text-decoration-none cursor-pointer`} end
                >
                   <MdCardMembership />Member Dashboard
                </NavLink>
                <NavLink
                  to="/admin/dashboard/add-member"
                  className={({isActive}) => `${isActive ? "bg-emerald-600" : ""} flex items-center gap-2 px-3 py-1 rounded space-x-2 block py-1 px-2 rounded text-white text-decoration-none cursor-pointer`} end
                >
                  <FaPlusCircle /> Add Members 
                </NavLink>
                
              </div>
            )}
          </div>
            <div>
            <button
              className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-green-700 cursor-pointer"
              onClick={() => setGalleryDropdownOpen(!galleryDropdownOpen)}
              aria-expanded={galleryDropdownOpen}
              aria-controls="post-dropdown"
            >
              <span className="flex items-center gap-2" >
                <MdBrowseGallery /> Galary
              </span>
              <FaChevronDown
                className={`transition-transform duration-200 ${galleryDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            {galleryDropdownOpen && (
              <div id="post-dropdown" className="ml-6 mt-2 space-y-2">
                <NavLink to='/admin/dashboard/GalleryDashboard'
                  // className="flex items-center gap-2 px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                  className={({isActive}) => `${isActive ? "bg-emerald-600" : ""} flex items-center gap-2 px-3 py-1 rounded space-x-2 block py-1 px-2 rounded text-white text-decoration-none cursor-pointer`} end
                >
                   <MdCardMembership />Gallery Dashboard
                </NavLink>
                <NavLink
                  to="/admin/dashboard/add-gallery"
                  className={({isActive}) => `${isActive ? "bg-emerald-600" : ""} flex items-center gap-2 px-3 py-1 rounded space-x-2 block py-1 px-2 rounded text-white text-decoration-none cursor-pointer`} end
                >
                  <FaPlusCircle /> Add Gallary 
                </NavLink>
                
              </div>
            )}
          </div>
          <NavLink
            to='/admin/dashboard/change-password'
            className={({isActive}) => `${isActive ? "bg-emerald-600 " : ""} flex items-center gap-2 px-3 py-1 rounded space-x-2 block py-1 px-2 rounded text-white text-decoration-none cursor-pointer`} end
          >
            <FaCog /> Settings
          </NavLink>
          <div className="flex-grow"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded bg-red-700 cursor-pointer "
            aria-label="Logout"
          >
            <FaTimes /> Logout
          </button>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gray-100 md:ml-64 transition-margin duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white p-4 shadow flex justify-between items-center sticky top-0 z-30">
          <button
            className="md:hidden text-green-800 text-2xl"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FaBars />
          </button>
          <h2 className="text-1xl text-center font-semibold text-emerald-800">
            AgriVision Admin Dashboard
          </h2>
        </header>

        {/* Conditional Content */}
        <section className="p-6">
          {isDashboardRoute && <Summary />}
          <Outlet />
        </section>
      </main>
    </div>
  );
}
