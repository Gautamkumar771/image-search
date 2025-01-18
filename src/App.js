import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import CanvasEditor from "./components/CanvasEditor";
import DownloadButton from "./components/DownloadButton";
import axios from "axios";
import "./App.css"; 

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query },
        headers: {
          Authorization: `Client-ID KL0hfLXIiA00_E0ZzOJxrgzEn1vnCKbtIfsEQDhH4WM`,
        },
      });
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      {images.length > 0 && <ImageGallery images={images} onSelectImage={setSelectedImage} />}
      {selectedImage && (
        <div>
          <CanvasEditor imageUrl={selectedImage} />
          <DownloadButton canvasId="canvas" />
        </div>
      )}
    </div>
  );
};

export default App;
