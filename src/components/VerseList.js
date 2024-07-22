import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import VerseForm from './VerseForm';

const VerseList = () => {
  const [verses, setVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);

  useEffect(() => {
    const fetchVerses = async () => {
      const verseCollection = collection(db, 'verses');
      const verseSnapshot = await getDocs(verseCollection);
      const verseList = verseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVerses(verseList);
    };

    fetchVerses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'verses', id));
      setVerses(verses.filter(verse => verse.id !== id));
      toast.success('Verse deleted successfully');
    } catch (error) {
      toast.error('Error deleting verse');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Manage Verses</h1>
      <VerseForm verse={selectedVerse} />
      <h2 className="text-xl mt-6">Verse List</h2>
      {verses.map(verse => (
        <div key={verse.id} className="bg-white p-4 shadow mb-4">
          <h2 className="text-xl">{verse.title}</h2>
          <p>{verse.content}</p>
          <button onClick={() => setSelectedVerse(verse)} className="bg-yellow-500 text-white p-2 rounded mr-2">
            Edit
          </button>
          <button onClick={() => handleDelete(verse.id)} className="bg-red-500 text-white p-2 rounded">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default VerseList;
