import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './components/Hooks/authContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <App />
        <ToastContainer 
         position='bottom-right'
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
         />
      </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)
