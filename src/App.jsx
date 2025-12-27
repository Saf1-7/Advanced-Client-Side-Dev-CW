import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import PropertyDetails from './pages/PropertyDetails';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBeds, setMinBeds] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [postcodeArea, setPostcodeArea] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [favourites, setFavourites] = useState([]);

  const addFavourite = (property) => {
    setFavourites((prev) => {
      if (prev.some((p) => p.id === property.id)) return prev;
      return [...prev, property];
    });
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  };
  const clearFavourites = () => {
  setFavourites([]);
};


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <SearchBar
                setSearchTerm={setSearchTerm}
                setTypeFilter={setTypeFilter}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                setMinBeds={setMinBeds}
                setMaxBeds={setMaxBeds}
                setPostcodeArea={setPostcodeArea}
                setDateFrom={setDateFrom}
                setDateTo={setDateTo}
              />

              <Gallery
  searchTerm={searchTerm}
  typeFilter={typeFilter}
  minPrice={minPrice}
  maxPrice={maxPrice}
  minBeds={minBeds}
  maxBeds={maxBeds}
  postcodeArea={postcodeArea}
  dateFrom={dateFrom}
  dateTo={dateTo}
  favourites={favourites}
  addFavourite={addFavourite}
  removeFavourite={removeFavourite}
  clearFavourites={clearFavourites}
/>

            </div>
          }
        />

        <Route
          path="/property/:id"
          element={
            <PropertyDetails
              favourites={favourites}
              addFavourite={addFavourite}
              removeFavourite={removeFavourite}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
