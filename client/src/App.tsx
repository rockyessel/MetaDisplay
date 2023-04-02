import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ExploreDetails, Explore, Home } from './pages';
import { Footer, Navbar } from './components';

const App = () => {
  return (
    <main className='px-4 lg:px-24 pb-20'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/explore/:title' element={<ExploreDetails />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
