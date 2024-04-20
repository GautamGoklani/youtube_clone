// Importing necessary modules from the 'react' and 'react-router-dom' libraries
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importing components for different pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import Music from "./pages/Music";
import Gaming from "./pages/Gaming";
import Sports from "./pages/Sports";
import Movies from "./pages/Movies";

// Defining the main component for the entire application
export default function App() {
  return (
    // Wrapping the entire application in a BrowserRouter to enable client-side routing
    <BrowserRouter>
      {/* Defining the routes for different pages using the Routes component */}
      <Routes>
        {/* Route for the Search page */}
        <Route path="/search" element={<Search />} />
        
        {/* Route for the Watch page, with a dynamic parameter 'id' */}
        <Route path="/watch/:id" element={<Watch />} />
        
        {/* Default route for the Home page */}
        <Route path="/" element={<Home />} />
        
        {/* Default route for the Music page */}
        <Route path="/music" element={<Music />} />
        
        {/* Default route for the gaming page */}
        <Route path="/gaming" element={<Gaming />} />
        
        {/* Default route for the sports page */}
        <Route path="/sports" element={<Sports />} />

        {/* Default route for the movies page */}
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}
