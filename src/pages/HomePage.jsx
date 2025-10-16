import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import CanvasList from '../components/CanvasList';

const HomePage = () => {
  const navigate = useNavigate();
  const [canvases, setCanvases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCanvases = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'canvases'));
        const canvasesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCanvases(canvasesList);
      } catch (error) {
        console.error("Error fetching canvases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCanvases();
  }, []);

  const handleCreateCanvas = async () => {
    try {
      const docRef = await addDoc(collection(db, 'canvases'), {
        content: JSON.stringify({}),
        createdAt: new Date(),
      });
      navigate(`/canvas/${docRef.id}`);
    } catch (error) {
      console.error("Error creating new canvas:", error);
    }
  };

  const handleDeleteCanvas = async (canvasId) => {
    try {
      const canvasDocRef = doc(db, 'canvases', canvasId);
      await deleteDoc(canvasDocRef);
      
      setCanvases(prevCanvases => prevCanvases.filter(canvas => canvas.id !== canvasId));
      
    } catch (error) {
      console.error("Error deleting canvas:", error);
      alert("Failed to delete canvas.");
    }
  };

  return (
    <div className="container">
      <header className="home-header">
        <h1>Kanvas</h1>
        <p>Select a canvas to edit or create a new one.</p>
        <button onClick={handleCreateCanvas} className="btn btn-primary">
          + Create a New Canvas
        </button>
      </header>
      
      <CanvasList 
        canvases={canvases} 
        loading={loading} 
        onDelete={handleDeleteCanvas} 
      />
    </div>
  );
};

export default HomePage;