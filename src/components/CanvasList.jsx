import React from 'react';
import { Link } from 'react-router-dom';
import {FaTrashAlt} from 'react-icons/fa';

const CanvasList = ({ canvases, loading, onDelete }) => {
  

  const handleDeleteClick = (e, canvasId) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this canvas?')) {
      onDelete(canvasId);
    }
  };

  return (
    <main className="canvas-list">
      {canvases.length > 0 ? (
        <ul>
          {}
          {canvases.map((canvas, index) => (
            <li key={canvas.id}> {}
              <Link to={`/canvas/${canvas.id}`}> {}
                <div className="canvas-info">
                  {}
                  <span>Canvas #{index + 1}</span>
                  {canvas.createdAt && (
                    <small>
                      _Created: {new Date(canvas.createdAt.seconds * 1000).toLocaleString()}
                    </small>
                  )}
                </div>
                <button
                  className="btn-danger-list"
                  onClick={(e) => handleDeleteClick(e, canvas.id)}
                >
                  <FaTrashAlt />
                </button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no saved canvases. Create one to get started!</p>
      )}
    </main>
  );
};
export default CanvasList;