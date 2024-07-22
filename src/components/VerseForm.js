import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const VerseForm = ({ verse }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (verse) {
      setTitle(verse.title);
      setContent(verse.content);
    }
  }, [verse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (verse) {
        const verseDoc = doc(db, 'verses', verse.id);
        await updateDoc(verseDoc, { title, content });
        toast.success('Verse updated successfully');
      } else {
        await addDoc(collection(db, 'verses'), { title, content });
        toast.success('Verse added successfully');
      }
      setTitle('');
      setContent('');
    } catch (error) {
      toast.error('Error adding/updating verse');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default VerseForm;
