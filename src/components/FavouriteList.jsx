import React from 'react';
import { Link } from 'react-router-dom';

const fixPath = (src) => (src && src.startsWith('/') ? src : `/${src}`);

const FavouriteList = ({
  favourites,
  removeFavourite,
  allProperties,
  addFavourite,
  clearFavourites
}) => {
  // allow dropping INTO favourites
  const handleDragOver = (e) => e.preventDefault();

  const handleDropIn = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const found = allProperties?.find((p) => p.id === id);
    if (found) addFavourite(found);
  };

  return (
    <div
      className="favBox"
      onDragOver={handleDragOver}
      onDrop={handleDropIn}
    >
      <h3>Favourites (drag here)</h3>

      {favourites.length > 0 && (
        <button className="button" onClick={clearFavourites}>
          Clear favourites
        </button>
      )}

      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        favourites.map((p) => (
          <div
            key={p.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', p.id)}
            style={{ marginBottom: '10px' }}
          >
            <img src={fixPath(p.picture)} alt={p.id} style={{ width: '120px' }} />
            <p>{p.type} — £{p.price}</p>

            <Link className="link" to={`/property/${p.id}`}>Open</Link>

            <button
              className="button"
              onClick={() => removeFavourite(p.id)}
            >
              Remove
            </button>

            <p style={{ fontSize: '0.8em', opacity: 0.7 }}>
              Drag out to remove
            </p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default FavouriteList;
