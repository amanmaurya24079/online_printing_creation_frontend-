import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormPage from './Component/Form';
import AboutPage from './Component/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/User_detail" element={<FormPage />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
