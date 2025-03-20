import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageViewer = ({ imageUrl, detectionResults }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      drawCanvas(ctx, image);
    };

    image.src = imageUrl;
  }, [imageUrl, scale, position]);

  const drawCanvas = (ctx, image) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.scale(scale, scale);
    
    ctx.drawImage(image, 0, 0);
    
    if (detectionResults) {
      detectionResults.forEach(result => {
        if (Array.isArray(result) && result.length === 5) {
          const [x, y, x2, y2, className] = result;
          const width = x2 - x;
          const height = y2 - y;
          
          ctx.strokeStyle = '#0000FF';
          ctx.lineWidth = 2 / scale;
          ctx.strokeRect(x, y, width, height);
          
        } else if (result.x !== undefined) {
          ctx.strokeStyle = '#0000FF';
          ctx.lineWidth = 2 / scale;
          ctx.strokeRect(result.x, result.y, result.width, result.height);
          
        }
      });
    }
    
    ctx.restore();
  };

  const getColorForClass = (className) => {
    const colors = {
      RBC: '#FF0000',
      WBC: '#00FF00',
      Platelet: '#0000FF',
      Circular_RBC: '#FF0000'
    };
    return colors[className] || '#000000';
  };

  const handleWheel = (e) => {
    // e.preventDefault();
    const zoomSensitivity = 0.1;
    const delta = e.deltaY > 0 ? -zoomSensitivity : zoomSensitivity;
    const newScale = Math.max(0.1, scale + delta);
    setScale(newScale);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  );
};

ImageViewer.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  detectionResults: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        class: PropTypes.string.isRequired
      })
    ),
    PropTypes.arrayOf(
      PropTypes.array 
    )
  ])
};

export default ImageViewer;