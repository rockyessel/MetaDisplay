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
import {
  AppreciateAssetModal,
  Footer,
  LoginModal,
  Navbar,
  RegisterModal,
} from './components';
import { useUserContext } from './contexts/user-context';
import { useThirdWebContext } from './contexts/thirdweb';

const App = () => {
  const { showRegisterModal, showLoginModal } = useUserContext();
  const { assetToBeAppreciatedState } = useThirdWebContext();
  return (
    <>
      {showRegisterModal && <RegisterModal />}
      {showLoginModal && <LoginModal />}
      {assetToBeAppreciatedState && <AppreciateAssetModal />}
      <main className='px-4 lg:px-20 relative'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/explore/:assetId' element={<ExploreDetails />} />
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
