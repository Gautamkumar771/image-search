import React, { useState } from "react";

const ImageGallery = ({ images, onSelectImage }) => {
  const [captions, setCaptions] = useState({}); // Store captions for each image

  // Handle caption changes
  const handleCaptionChange = (id, caption) => {
    setCaptions((prevCaptions) => ({ ...prevCaptions, [id]: caption }));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {images.map((image) => (
        <div key={image.id} style={{ position: "relative", textAlign: "center" }}>
          <img
            src={image.urls.small}
            alt={image.alt_description}
            style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Add a caption"
              value={captions[image.id] || ""}
              onChange={(e) => handleCaptionChange(image.id, e.target.value)}
              style={{
                width: "90%",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            style={{
              marginTop: "10px",
              backgroundColor: "blue",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => onSelectImage(image.urls.full)}
          >
            Add to Canvas
          </button>
          {captions[image.id] && (
            <p style={{ marginTop: "10px", fontSize: "14px", color: "gray" }}>
              Caption: {captions[image.id]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
