import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import IndonesiaPage from './pages/Indonesia';
import ProgrammingPage from './pages/Programming';
import SearchPage from './pages/Search';
import SavedPage from './pages/Saved';

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<IndonesiaPage />} />
        <Route path="/programming" element={<ProgrammingPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/search/:searchTerm" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
