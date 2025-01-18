import React from "react";

const DownloadButton = ({ canvasId }) => {
  const handleDownload = () => {
    const canvas = document.getElementById(canvasId);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "modified-image.png";
    link.click();
  };

  return <button onClick={handleDownload}>Download Image</button>;
};

export default DownloadButton;
