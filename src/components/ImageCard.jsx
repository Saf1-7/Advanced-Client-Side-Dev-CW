import React from 'react';
import { Link } from 'react-router-dom';

const fixPath = (src) => (src && src.startsWith('/') ? src : `/${src}`);

const ImageCard = ({ property, favourites, addFavourite, removeFavourite }) => {
  const isFav = favourites?.some((p) => p.id === property.id);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', property.id);
  };

  return (
    <div className="card" draggable onDragStart={handleDragStart}>
      <img src={fixPath(property.picture)} alt={property.id} />
      <h3>{property.type}</h3>
      <p>{property.location}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>£{property.price}</p>

      <Link className="link" to={`/property/${property.id}`}>View</Link>

      {!isFav ? (
        <button className="button" type="button" onClick={() => addFavourite(property)}>
          ♥ Favourite
        </button>
      ) : (
        <button className="button" type="button" onClick={() => removeFavourite(property.id)}>
          Remove
        </button>
      )}
    </div>
  );
};

export default ImageCard;
