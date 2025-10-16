import React, { useEffect, useState } from 'react';
import { PencilBrush, PatternBrush, Shadow } from 'fabric';

const FreeDrawingPanel = ({ canvas }) => {
  const [brushType, setBrushType] = useState('PencilBrush');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowWidth, setShadowWidth] = useState(0);
  const [shadowOffset, setShadowOffset] = useState(0);

  useEffect(() => {
    if (!canvas) return;

    let newBrush;

    if (brushType === 'PencilBrush') {
      newBrush = new PencilBrush(canvas);
    } else if (brushType === 'CircleBrush') {
      newBrush = new fabric.CircleBrush ? new fabric.CircleBrush(canvas) : new PencilBrush(canvas);
    } else {
        newBrush = new PencilBrush(canvas);
    }

    newBrush.color = color;
    newBrush.width = lineWidth;
    newBrush.shadow = new Shadow({
      blur: shadowWidth,
      offsetX: shadowOffset,
      offsetY: shadowOffset,
      affectStroke: true,
      color: shadowColor,
    });

    canvas.freeDrawingBrush = newBrush;

  }, [brushType, color, lineWidth, shadowColor, shadowWidth, shadowOffset, canvas]);

  if (!canvas || !canvas.isDrawingMode) {
    return null; 
  }

  return (
    <div className="drawing-options-panel">
      <h4>Pen Options</h4>
      <div className="option-group">
        <label>Brush Type:</label>
        <select value={brushType} onChange={(e) => setBrushType(e.target.value)}>
          <option>PencilBrush</option>
          {}
          {}
        </select>
      </div>
      <div className="option-group">
        <label>Line Color:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div className="option-group">
        <label>Line Width: <span>{lineWidth}</span></label>
        <input type="range" min="1" max="100" value={lineWidth} onChange={(e) => setLineWidth(parseInt(e.target.value, 10))} />
      </div>
      <div className="option-group">
        <label>Shadow Color:</label>
        <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} />
      </div>
      <div className="option-group">
        <label>Shadow Width: <span>{shadowWidth}</span></label>
        <input type="range" min="0" max="50" value={shadowWidth} onChange={(e) => setShadowWidth(parseInt(e.target.value, 10))} />
      </div>
      <div className="option-group">
        <label>Shadow Offset: <span>{shadowOffset}</span></label>
        <input type="range" min="0" max="50" value={shadowOffset} onChange={(e) => setShadowOffset(parseInt(e.target.value, 10))} />
      </div>
    </div>
  );
};

export default FreeDrawingPanel;