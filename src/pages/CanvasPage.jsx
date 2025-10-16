import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { 
    Canvas, Rect, Circle, IText, Triangle, 
    Ellipse, Line, PencilBrush, Shadow 
} from 'fabric';

import Toolbar from '../components/Toolbar';
import FreeDrawingPanel from '../components/FreeDrawingPanel';

const CanvasPage = () => {
    const { canvasId } = useParams();
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null); 
    const debounceTimeoutRef = useRef(null); 

    const [isPenMode, setIsPenMode] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [isLoading, setIsLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState('Saved');


    useEffect(() => {
        const canvas = new Canvas(canvasRef.current, {
            width: 800,
            height: 600,
            backgroundColor: '#ffffff',
        });
        fabricCanvasRef.current = canvas;

        const loadCanvas = async () => {
            setIsLoading(true);
            const docRef = doc(db, 'canvases', canvasId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data().content;
                if (data && Object.keys(JSON.parse(data)).length > 0) {
                    canvas.loadFromJSON(JSON.parse(data), canvas.renderAll.bind(canvas));
                }
            }
            setIsLoading(false);
            setSaveStatus('Saved');
        };
        loadCanvas();

        const handleCanvasChange = () => {
            setSaveStatus('Unsaved');
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            debounceTimeoutRef.current = setTimeout(handleSave, 2000);
        };

        canvas.on('object:modified', handleCanvasChange);
        canvas.on('object:added', handleCanvasChange);
        canvas.on('object:removed', handleCanvasChange);

        return () => {
            canvas.off('object:modified', handleCanvasChange);
            canvas.off('object:added', handleCanvasChange);
            canvas.off('object:removed', handleCanvasChange);
            canvas.dispose();
        };
    }, [canvasId]);

    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                deleteSelectedObject();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); 

    const handleSave = async () => {
        if (!fabricCanvasRef.current) return;
        setSaveStatus('Saving...');
        const canvasJSON = JSON.stringify(fabricCanvasRef.current.toJSON());
        const docRef = doc(db, 'canvases', canvasId);
        try {
            await setDoc(docRef, { content: canvasJSON }, { merge: true });
            setSaveStatus('Saved');
        } catch (error) {
            console.error("Error saving canvas:", error);
            setSaveStatus('Error');
        }
    };

    const addRectangle = () => {
        const rect = new Rect({ left: 50, top: 50, fill: selectedColor, width: 100, height: 60 });
        fabricCanvasRef.current.add(rect);
    };

    const addCircle = () => {
        const circle = new Circle({ left: 100, top: 100, fill: selectedColor, radius: 50 });
        fabricCanvasRef.current.add(circle);
    };

    const addTriangle = () => {
        const triangle = new Triangle({ top: 300, left: 200, width: 100, height: 100, fill: selectedColor });
        fabricCanvasRef.current.add(triangle);
    };

    const addEllipse = () => {
        const ellipse = new Ellipse({ top: 400, left: 300, rx: 75, ry: 50, fill: selectedColor });
        fabricCanvasRef.current.add(ellipse);
    };

    const addLine = () => {
        const line = new Line([50, 100, 250, 100], { stroke: selectedColor, strokeWidth: 4 });
        fabricCanvasRef.current.add(line);
    };

    const addText = () => {
        const text = new IText('Your Text Here', { left: 150, top: 150, fill: selectedColor });
        fabricCanvasRef.current.add(text);
    };

  const changeObjectColor = () => {
        const canvas = fabricCanvasRef.current;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'line') {
                 activeObject.set('stroke', selectedColor);
            } else {
                 activeObject.set('fill', selectedColor);
            }
            canvas.renderAll();
        }
    };

    const deleteSelectedObject = () => {
        const canvas = fabricCanvasRef.current;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0) {
            activeObjects.forEach(obj => canvas.remove(obj));
            canvas.discardActiveObject().renderAll();
        }
    };
    
    const togglePenMode = () => {
        const canvas = fabricCanvasRef.current;
        canvas.isDrawingMode = !canvas.isDrawingMode;
        setIsPenMode(canvas.isDrawingMode);
    };

    const clearCanvas = () => {
        if (window.confirm('Are you sure you want to clear the entire canvas?')) {
            fabricCanvasRef.current.clear();
        }
    };

    return (
        <div className="container editor-container">
            <header className="editor-header">
                <Link to="/" className="btn-back">&larr; Back to Home</Link>
                <h2>Kanvas</h2>
                <div className="save-status">{saveStatus}</div>
            </header>

            <div className="editor-main-area">
                <Toolbar
                    addRectangle={addRectangle}
                    addCircle={addCircle}
                    addText={addText}
                    addTriangle={addTriangle}
                    addEllipse={addEllipse}
                    addLine={addLine}
                    togglePenMode={togglePenMode}
                    isPenMode={isPenMode}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    changeObjectColor={changeObjectColor}
                    deleteSelectedObject={deleteSelectedObject}
                    clearCanvas={clearCanvas}
                />
                
                <div className="canvas-wrapper">
                    <canvas ref={canvasRef} />
                </div>
                
                {isPenMode && <FreeDrawingPanel canvas={fabricCanvasRef.current} />}
            </div>
        </div>
    );
};

export default CanvasPage;