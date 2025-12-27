import React, { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import FavouriteList from './FavouriteList';

const Gallery = ({
  searchTerm,
  typeFilter,
  minPrice,
  maxPrice,
  minBeds,
  maxBeds,
  postcodeArea,
  dateFrom,
  dateTo,
  favourites,
  addFavourite,
  removeFavourite,
  clearFavourites
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/properties.json')
      .then((res) => res.json())
      .then((data) => setProducts(data.properties));
  }, []);

  const monthMap = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'Any' || p.type === typeFilter;

    const minP = minPrice === '' ? null : Number(minPrice);
    const maxP = maxPrice === '' ? null : Number(maxPrice);
    const matchesMinPrice = minP === null || p.price >= minP;
    const matchesMaxPrice = maxP === null || p.price <= maxP;

    const minB = minBeds === '' ? null : Number(minBeds);
    const maxB = maxBeds === '' ? null : Number(maxBeds);
    const matchesMinBeds = minB === null || p.bedrooms >= minB;
    const matchesMaxBeds = maxB === null || p.bedrooms <= maxB;

    const area = postcodeArea.trim().toUpperCase();
    const matchesPostcode = area === '' || p.location.toUpperCase().includes(area);

    const propDate = new Date(p.added.year, monthMap[p.added.month], p.added.day);
    const from = dateFrom === '' ? null : new Date(dateFrom);
    const to = dateTo === '' ? null : new Date(dateTo);
    const matchesFrom = from === null || propDate >= from;
    const matchesTo = to === null || propDate <= to;
    const matchesDate = matchesFrom && matchesTo;

    return (
      matchesSearch &&
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinBeds &&
      matchesMaxBeds &&
      matchesPostcode &&
      matchesDate
    );
  });

  return (
    <div className="grid">
      {/* FAVOURITES */}
      <div className="card">
        <FavouriteList
          favourites={favourites}
          removeFavourite={removeFavourite}
          allProperties={products}
          addFavourite={addFavourite}
          clearFavourites={clearFavourites}
        />
      </div>

      {/* RESULTS (drop favourite here to remove) */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData('text/plain');
          removeFavourite(id);
        }}
      >
        <h3>Results (drag favourite here to remove)</h3>

        {filteredProducts.map((p) => (
          <ImageCard
            key={p.id}
            property={p}
            favourites={favourites}
            addFavourite={addFavourite}
            removeFavourite={removeFavourite}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
