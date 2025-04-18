import React from 'react';
import TourCard from './TourCard';

const Gallery = ({ tours, loading, error, removeTour, refreshTours }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching tours.</h2>;
  }

  if (tours.length === 0) {
    return (
      <div className="No-Tours">
        <h2>No Tours available</h2>
        <button onClick={refreshTours}>Refresh</button>
      </div>
    );
  }

  return (
    <section className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} {...tour} onRemove={removeTour} />
      ))}
    </section>
  );
};

export default Gallery;
