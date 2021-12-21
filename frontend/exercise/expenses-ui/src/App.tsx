import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Display, Create, Update, NavBar, Home } from './components'
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/display" element={<Display />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
