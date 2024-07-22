import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed with `npm install axios`

const Home = () => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch a random verse
  const fetchRandomVerse = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.alquran.cloud/v1/ayah/random');
      const randomVerse = response.data.data;
      setVerse(randomVerse);
    } catch (error) {
      console.error('Error fetching random verse:', error);
      setVerse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Verse of The Day</h1>
      <button
        onClick={fetchRandomVerse}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Refresh Verse
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        verse && (
          <div className="p-4 bg-white rounded shadow-md">
            <p className="text-lg">{verse.text}</p>
            <p className="text-sm text-gray-500">{verse.surah.name} {verse.number}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Home;
