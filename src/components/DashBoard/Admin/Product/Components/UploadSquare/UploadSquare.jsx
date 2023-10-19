import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './UploadSquare.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import ColorsImages from './ColorsImages/ColorsImages';

const UploadSquare = ({ onImageUpload, colors }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [tempImage, setTempImage] = useState(null);
  const [viewZoom, setViewZoom] = useState(false);
  const [hoverTimeoutId, setHoverTimeoutId] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [color, setColor] = useState(null);
  const [colorChange, setColorChange] = useState(false);

  console.log("🚀 ~ file: UploadSquare.jsx:9 ~ UploadSquare ~ imageFiles:", imageFiles)

  const handlerFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (color) {
      const updatedImages = [...imageFiles, { file: newFiles[0], color }];
      setImageFiles(updatedImages);
      onImageUpload(updatedImages);
      setColorChange(!colorChange)
      setColor(null)
      return
    }
    setTempImage(newFiles[0]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...imageFiles];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
    onImageUpload(updatedImages);
  };


  const handleMouseEnter = (index) => {
    const timeoutId = setTimeout(() => {
      setHoveredImageIndex(index);
      setViewZoom(true);
    }, 1500);
    setHoverTimeoutId(timeoutId);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutId) {
      clearTimeout(hoverTimeoutId);
      setHoverTimeoutId(null);
    }
    setHoveredImageIndex(null);
    setViewZoom(false);
  };

  const handleSelectColor = (color) => {
    setColor(color);
    if (tempImage) {
      const updatedImages = [...imageFiles, { file: tempImage, color }];
      setImageFiles(updatedImages);
      onImageUpload(updatedImages);
      setColorChange(!colorChange)
      setTempImage(null);
      setColor(null)
    }
  };

  return (
    <div className={styles.UploadSquare}>
      {imageFiles?.map((imageInfo, index) => {
        const colorMatch = colors.find(({ name }) => imageInfo.color === name);
        const backgroundColor = colorMatch ? colorMatch.html : '';
        return (<div
          key={index}
          className={styles.Image}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.viewImages} key={index}>
            <div className={styles.showImages}>
              <span className={styles.RemoveButton} onClick={() => handleRemoveImage(index)}>
                <FaTrashAlt size={15} color={'black'} />
              </span>
              <img
                src={URL.createObjectURL(imageInfo.file)}
                alt={`Uploaded_${index}`}
                className={hoveredImageIndex === index && viewZoom ? styles.ImageZoom : undefined}
              />
            </div>
            <div className={styles.ColorSelected}
              style={{ background: `${backgroundColor}` }}>{ }</div>
          </div>
        </div>)
      }
      )}
      <div className={styles.PackImage}>
        <label htmlFor="imageInput">
          <div className={`${styles.newImage} ${styles.Image}`}>
            <span className="plus">+</span>
          </div>
          <input
            type="file"
            name="imagesFiles"
            id="imageInput"
            className={styles.imageInput}
            onChange={handlerFileChange}
            multiple
          ></input>
        </label>
        <ColorsImages colors={colors} onSelectColor={handleSelectColor} inChangeColor={colorChange} />
      </div>
    </div>
  );
};

UploadSquare.propTypes = {
  onImageUpload: PropTypes.func,
  colors: PropTypes.array,
};

export default UploadSquare;
