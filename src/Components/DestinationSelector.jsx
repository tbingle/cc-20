import React from 'react';

export default function DestinationSelector({ tours, selected, setSelected }) {
  const destinations = ['All Destinations', ...new Set(tours.map(tour => tour.name))];

  return (
    <div className="mb-4 text-center">
      <select
        className="p-2 border rounded"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {destinations.map((dest, index) => (
          <option key={index} value={dest}>{dest}</option>
        ))}
      </select>
    </div>
  );
}