import React, { useRef, useEffect } from "react";
import "./ImageUpload.scss";
const ImageUpload = ({ file: imageFile, handleOnImageChange, id }) => {
  const inputElement = useRef(null);
  const imageElement = useRef(null);

  useEffect(() => {
    if (!imageFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      imageElement.current.src = fileReader.result;
      console.log(fileReader);
    };
    fileReader.readAsDataURL(imageFile);
  }, [imageFile]);

  const handleButtonClicked = () => inputElement.current.click();

  return (
    <div className="image-upload">
      <input
        id={id}
        type="file"
        accept=".jpg,.png,.jpeg"
        className="image-upload__input"
        ref={inputElement}
        onChange={handleOnImageChange}
      />
      <button className="image-upload__button" onClick={handleButtonClicked}>
        Pick Avatar
      </button>
      <div className="image-upload__preview">
        {imageFile ? (
          <img
            className="image-upload__image"
            alt="Preview"
            ref={imageElement}
          />
        ) : (
          "Preview"
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
