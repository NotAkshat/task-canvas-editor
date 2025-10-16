import React from 'react';
import {
  FaRegSquare, FaRegCircle, FaSlash, FaFont, FaTrashAlt, 
  FaEraser, FaPencilAlt
} from 'react-icons/fa';
import { TbOvalVertical } from "react-icons/tb";
import { BsTriangleFill } from 'react-icons/bs'; 
import { MdFormatColorFill } from "react-icons/md";

const Toolbar = ({
  addRectangle,
  addCircle,
  addText,
  addTriangle,
  addEllipse,
  addLine,
  togglePenMode,
  isPenMode,
  selectedColor,
  setSelectedColor,
  changeObjectColor,
  deleteSelectedObject,
  clearCanvas,
}) => {
  return (
    <div className="toolbar">
      {}
      <button onClick={addRectangle} title="Rectangle">
        <FaRegSquare /> 
      </button>
      <button onClick={addCircle} title="Circle">
        <FaRegCircle /> 
      </button>
      <button onClick={addTriangle} title="Triangle">
        <BsTriangleFill /> 
      </button>
      <button onClick={addEllipse} title="Oval">
        <TbOvalVertical /> 
      </button>
      <button onClick={addLine} title="Line">
        <FaSlash /> 
      </button>
      <button onClick={addText} title="Text">
        <FaFont /> 
      </button>

      {}
      <div className="tool-group">
        <label htmlFor="shape-color-picker" style={{ display: 'none' }}>Shape Color:</label>
        <input
          id="shape-color-picker"
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          title="Shape Color"
        />
        <button onClick={changeObjectColor} title="Apply Color">
          <MdFormatColorFill /> 
        </button>
      </div>
      
      {}
      <div className="tool-group">
        <button onClick={togglePenMode} className={isPenMode ? 'active' : ''}>
          <FaPencilAlt /> 
        </button>
      </div>

      {}
      <div className="tool-group">
        <button onClick={deleteSelectedObject} className="btn-danger" title="Delete Selected">
          <FaTrashAlt /> 
        </button>
        <button onClick={clearCanvas} className="btn-danger" title="Clear Canvas">
          <FaEraser /> 
        </button>
      </div>
    </div>
  );
};

export default Toolbar;