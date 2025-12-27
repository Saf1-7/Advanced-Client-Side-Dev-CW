import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const fixPath = (src) => (src && src.startsWith('/') ? src : `/${src}`);

// ✅ safe description renderer (turns <br> into new lines, no HTML injection)
const renderDescription = (text) => {
  if (!text) return null;
  const cleaned = text.replace(/<br\s*\/?>/gi, '\n');
  return cleaned.split('\n').map((line, i) => (
    <p key={i} style={{ marginTop: '8px' }}>
      {line}
    </p>
  ));
};

const PropertyDetails = ({ favourites, addFavourite, removeFavourite }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/properties.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.properties.find((p) => p.id === id);
        setProperty(found || null);
        setSelectedIndex(0);
        setShowAll(false);
      });
  }, [id]);

  const images = useMemo(() => {
    if (!property) return [];
    if (Array.isArray(property.images) && property.images.length > 0) return property.images;
    if (property.picture) return [property.picture];
    return [];
  }, [property]);

  if (!property) return <p>Loading...</p>;

  const isFav = favourites?.some((p) => p.id === property.id);
  const mainImage = images[selectedIndex] || images[0];
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(property.location)}&z=15&output=embed`;

  return (
    <div className="container">
      <p>
        <Link className="link" to="/">← Back</Link>
      </p>

      <div className="detailsLayout">
        {/* LEFT: images */}
        <div className="card">
          {!isFav ? (
            <button className="button" type="button" onClick={() => addFavourite(property)}>
              ♥ Add to favourites
            </button>
          ) : (
            <button className="button" type="button" onClick={() => removeFavourite(property.id)}>
              Remove favourite
            </button>
          )}

          {mainImage && (
            <img className="mainImg" src={fixPath(mainImage)} alt={property.id} />
          )}

          <div className="thumbRow">
            {images.map((src, idx) => (
              <button
                key={src + idx}
                className="button"
                type="button"
                onClick={() => setSelectedIndex(idx)}
              >
                <img className="thumb" src={fixPath(src)} alt={`${property.id}-${idx}`} />
              </button>
            ))}
          </div>

          <button className="button" type="button" onClick={() => setShowAll(true)}>
            View all images
          </button>
        </div>

        {/* RIGHT: info + tabs */}
        <div className="card">
          <h1>{property.type}</h1>
          <p>{property.location}</p>
          <p><strong>£{property.price}</strong></p>
          <p>Bedrooms: {property.bedrooms}</p>

          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            <TabPanel>
              <div>{renderDescription(property.description)}</div>
            </TabPanel>

            <TabPanel>
              {property.floorPlan ? (
                <img className="mainImg" src={fixPath(property.floorPlan)} alt={`${property.id}-floorplan`} />
              ) : (
                <p>No floor plan available yet.</p>
              )}
            </TabPanel>

            <TabPanel>
              <div style={{ width: '100%', height: '360px' }}>
                <iframe
                  title="map"
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      {/* Modal: all images */}
      {showAll && (
        <div
          onClick={() => setShowAll(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            zIndex: 9999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#111', padding: '12px', maxWidth: '900px', width: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>All images</h3>
              <button className="button" type="button" onClick={() => setShowAll(false)}>
                Close
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '10px',
                marginTop: '10px'
              }}
            >
              {images.map((src, idx) => (
                <img
                  key={src + idx}
                  src={fixPath(src)}
                  alt={`${property.id}-all-${idx}`}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px' }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
