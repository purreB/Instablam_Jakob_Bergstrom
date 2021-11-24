import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [md, setmd] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleCameraToggle = () => {
    if (md) {
      setmd(false);
    } else {
      setmd(true);
    }
  };

  return (
    <>
      {md ? (
        <Webcam audio={false} ref={webcamRef} screenshotFormat={'image/jpeg'} />
      ) : null}
      <button onClick={handleCameraToggle}>
        {md ? 'Turn Camera Off' : 'Turn Camera On'}
      </button>
      <button onClick={capture}>Capture Photo</button>
      {imgSrc && <img src={imgSrc} />}
    </>
  );
}

export default Camera;
