import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ExploreDetails, Explore, Home, Dashboard, User, UploadAsset, CreateCollection, All, Collection } from './pages';
import { AppreciateAssetModal, LoginModal, RegisterModal } from './components';
import { useUserContext } from './contexts/user-context';
import { useThirdWebContext } from './contexts/thirdweb';

const App = () => {
  const { showRegisterModal, showLoginModal } = useUserContext();
  const { assetToBeAppreciatedState } = useThirdWebContext();
  return (
    <React.Fragment>
      {showRegisterModal && <RegisterModal />}
      {showLoginModal && <LoginModal />}
      {assetToBeAppreciatedState && <AppreciateAssetModal />}
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/explore/:assetId' element={<ExploreDetails />} />
        <Route path='/home' element={<Home />} />
        <Route path='/collection/:collectionId' element={<Collection />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='user-account' element={<User />} />
          <Route path='all' element={<All />} />
          <Route path='create-collection' element={<CreateCollection />} />
          <Route path='upload-asset' element={<UploadAsset />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
