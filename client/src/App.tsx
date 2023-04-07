import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  ExploreDetails,
  Explore,
  Home,
  Dashboard,
  User,
  UploadAsset,
} from './pages';
import { Footer, LoginModal, Navbar, RegisterModal } from './components';
import { useUserContext } from './contexts/user-context';

const App = () => {
const {showRegisterModal,showLoginModal} = useUserContext()
  return (
    <>
      {showRegisterModal && <RegisterModal />}
      {showLoginModal && <LoginModal />}
      <main className='px-4 lg:px-20 relative'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/explore/:owner/:title' element={<ExploreDetails />} />
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='user' element={<User />} />
            <Route path='upload-asset' element={<UploadAsset />} />
          </Route>
        </Routes>
        <Footer />
      </main>
    </>
  );
};

export default App;
