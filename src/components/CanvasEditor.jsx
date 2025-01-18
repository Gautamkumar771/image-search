import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null); // Use ref to store the canvas instance

  // Add text function
  const addText = () => {
    if (canvasInstance.current) {
      const text = new fabric.Textbox("Your Caption Here", {
        left: 100,
        top: 100,
        fontSize: 20,
        fill: "black",
        borderColor: "gray",
        cornerColor: "blue",
        cornerSize: 8,
        transparentCorners: false,
        editable: true,
      });
      canvasInstance.current.add(text).setActiveObject(text);
    }
  };

  // Add shape function
  const addShape = (shapeType) => {
    if (canvasInstance.current) {
      let shape;
      if (shapeType === "circle") {
        shape = new fabric.Circle({
          radius: 50,
          fill: "blue",
          left: 150,
          top: 150,
        });
      } else if (shapeType === "rectangle") {
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: "green",
          left: 150,
          top: 150,
        });
      }
      canvasInstance.current.add(shape).setActiveObject(shape);
    }
  };

  // Clear the canvas
  const clearCanvas = () => {
    if (canvasInstance.current) {
      canvasInstance.current.clear();
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(canvasInstance.current.width);
        canvasInstance.current.add(img).setActiveObject(img);
      });
    }
  };

  // Delete selected object
  const deleteSelectedObject = () => {
    if (canvasInstance.current) {
      const activeObject = canvasInstance.current.getActiveObject();
      if (activeObject) {
        canvasInstance.current.remove(activeObject);
      }
    }
  };

  useEffect(() => {
    // Initialize the Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: true,
    });
    canvasInstance.current = canvas;

    // Load the image onto the canvas
    fabric.Image.fromURL(imageUrl, (img) => {
      img.scaleToWidth(canvas.width);
      canvas.add(img).setActiveObject(img);
    });

    // Cleanup function
    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px", alignItems:"center" }}>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={800}
        height={500}
        style={{ border: "2px solid #ccc", marginBottom: "20px" }}
      ></canvas>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", margin: "30px "}}>
        <button onClick={addText} style={buttonStyle}>
          Add Text
        </button>
        <button onClick={() => addShape("circle")} style={buttonStyle}>
          Add Circle
        </button>
        <button onClick={() => addShape("rectangle")} style={buttonStyle}>
          Add Rectangle
        </button>
        <button
          onClick={deleteSelectedObject}
          style={{ ...buttonStyle, backgroundColor: "red", color: "white" }}
        >
          Delete Selected
        </button>
        <button
          onClick={clearCanvas}
          style={{ ...buttonStyle, backgroundColor: "orange", color: "white" }}
        >
          Reset Canvas
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default CanvasEditor;
