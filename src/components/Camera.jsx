import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [md, setmd] = useState(false);
  const [imgArr, setimgArr] = useState([]);

  useEffect(() => {
    console.log(imgArr);
  }, [imgArr]);

  const handleCameraToggle = () => {
    if (md) {
      setmd(false);
    } else {
      setmd(true);
    }
  };

  function addObjToArray(imgObj) {
    setimgArr([...imgArr, imgObj]);
  }

  function capture() {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 300,
      height: 200,
    });
    setImgSrc(imageSrc);
    saveToStorage(imageSrc);
  }

  async function saveToStorage(imgSrc) {
    let current = new Date();
    let cDate =
      current.getFullYear() +
      '-' +
      (current.getMonth() + 1) +
      '-' +
      current.getDate();
    let cTime =
      current.getHours() +
      ':' +
      current.getMinutes() +
      ':' +
      current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    const imgObj = {
      img: imgSrc,
      position: '',
      date: dateTime,
    };
    addObjToArray(imgObj);
    const json = JSON.stringify(imgArr);
    localStorage.setItem('Images', json);
  }

  return (
    <>
      <section id="Camera">
        {md ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat={'image/jpeg'}
          />
        ) : null}
        <button onClick={handleCameraToggle}>
          {md ? 'Turn Camera Off' : 'Turn Camera On'}
        </button>
        <button onClick={capture}>Capture Photo</button>
        {imgSrc && <img src={imgSrc} />}
      </section>
    </>
  );
}

export default Camera;
