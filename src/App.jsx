import React, { useEffect, useState } from 'react';
import Gallery from './Components/Gallery';
import DestinationSelector from './Components/DestinationSelector';
import './Styles/Styles.css';//
// import './Styles/Styles.css'; // Ensure you have this file for styling
const API_URL = 'https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project';
// This URL is a proxy to avoid CORS issues. You can replace it with your own API if needed.
export default function App() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('All Destinations');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// Fetch tours from the API
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
// Set up the initial state and fetch tours when the component mounts
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
// Filter tours based on the selected destination
  const removeTour = (id) => {
    const updatedTours = filteredTours.filter(tour => tour.id !== id);
    setFilteredTours(updatedTours);
  };
// Render the main component
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