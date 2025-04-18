import React, { useEffect, useState } from 'react';
import Gallery from './Components/Gallery';
import DestinationSelector from './Components/DestinationSelector';
import './Styles/Styles.css';
const API_URL = 'https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project';

export default function App() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('All Destinations');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTours(data);
      setFilteredTours(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tours.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    if (selectedDestination === 'All Destinations') {
      setFilteredTours(tours);
    } else {
      setFilteredTours(tours.filter(tour => tour.name === selectedDestination));
    }
  }, [selectedDestination, tours]);

  const removeTour = (id) => {
    const updatedTours = filteredTours.filter(tour => tour.id !== id);
    setFilteredTours(updatedTours);
  };

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Tour Gallery</h1>
      <DestinationSelector 
        tours={tours} 
        selected={selectedDestination} 
        setSelected={setSelectedDestination} 
      />
      <Gallery 
        tours={filteredTours} 
        loading={loading} 
        error={error} 
        removeTour={removeTour} 
        refreshTours={fetchTours} 
      />
    </main>
  );
}