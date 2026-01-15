import { useState,useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/Profile';
import { useUser } from './contexts/userContext';
import { useGigs } from './contexts/gigContext';
import BidModal from './components/Modals/BidModal';
import CreateModal from './components/Modals/CreateModal';
import HireModal from './components/Modals/HireModal';

function App() {
  const { user, logout } = useUser();
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [activeBidId, setActiveBidId] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false)
  const navigate = useNavigate();

  const noNavbarPaths = ['/login'];
  const hideNavbar = noNavbarPaths.includes(location.pathname);

  useEffect(() => {
    if (isBidModalOpen || isCreateModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isBidModalOpen, isCreateModalOpen]);

  function openBidModal(id){
    setActiveBidId(id);
    setIsBidModalOpen(true)
  }

  function closeBidModal(){
    setActiveBidId(null);
    setIsBidModalOpen(false)
  }

  function openCreateModal(){
    setIsCreateModalOpen(true)
  }

  function closeCreateModal(){
    setIsCreateModalOpen(false)
  }

  function openHireModal(){
    setIsHireModalOpen(true)    
  }

  function closeHireModal(){
      setIsHireModalOpen(false)
  }

  function navigateToProfile(){
    if(!user){
      navigate('/login')
    } else {
      navigate('/profile')
    }
    
  }

  function handleLoginButton(){
    if (user){
      logout()
      navigate('login')
    } else {
      navigate('login')
    }
  }
  return (
    <>
      <div className=' h-screen w-full relative'>
        {!hideNavbar && <div className='h-15 w-full bg-violet-400 fixed top-0 shadow-md z-20 px-3'>
          <div className='h-full w-full max-w-[1000px] mx-auto flex justify-between items-center'>
            <span onClick={() => navigate('/')} className='flex text-black/80 font-work hover:cursor-pointer'>
              <h1 className='text-4xl font-black'>GIG</h1>
              <p className='mt-auto text-xl font-bold pb-[1px]'>FLOW</p>
            </span>
            
            <span className='flex gap-1 items-center rounded-4xl font-semibold h-full relative'>
                  <p 
                    onClick={() => navigate('/')} 
                    className='rounded-4xl px-2 py-1 h-full flex items-center hover:-translate-y-1 transition-all ease-in-out duration-200 hover:cursor-pointer'>Home</p>
                  <p 
                    onClick={() => setIsCreateModalOpen(true)} 
                    className='rounded-4xl px-2 py-1 h-full flex items-center hover:-translate-y-1 transition-all ease-in-out duration-200 hover:cursor-pointer'>Create</p>
                  <p 
                    onClick={navigateToProfile} 
                    className='rounded-4xl px-2 py-1 h-full flex items-center hover:-translate-y-1 transition-all ease-in-out duration-200 hover:cursor-pointer'>Profile</p>
                  <p 
                    onClick={handleLoginButton} 
                    className='rounded-4xl px-2 py-1 h-full flex items-center hover:-translate-y-1 transition-all ease-in-out duration-200 hover:cursor-pointer'>{user?"Log Out":"Log In"}</p>
              <span className='flex items-center group h-full mx-1'>
                <span className='rounded-4xl h-8 w-8 bg-white overflow-hidden pt-1'>
                  <svg onClick={navigateToProfile}  className='fill-black/80 scale-130 hover:cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
                </span>
              </span>
            </span>
          </div>
        </div>}

        {/* message modal */}
        {isBidModalOpen && <BidModal id={activeBidId} closeBidModal={closeBidModal}/>}

        {isCreateModalOpen && <CreateModal closeCreateModal={closeCreateModal}/>}

        {isHireModalOpen && <HireModal  closeHireModal={closeHireModal}/>}

        <Routes>
          <Route path="/" element={<Home setIsBidModalOpen={setIsBidModalOpen} openBidModal={openBidModal}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile openHireModal={openHireModal} openCreateModal={openCreateModal}/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
