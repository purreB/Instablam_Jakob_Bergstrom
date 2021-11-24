import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [md, setmd] = useState(false);
  const [imgArr, setimgArr] = useState([]);
  const [canUsePos, setcanUsePos] = useState(false);

  useEffect(() => {
    console.log('HEJ');
    askLocationPermisson();
  }, []);

  function askLocationPermisson() {
    try {
      let geo = navigator.geolocation;
      geo.getCurrentPosition((pos) => {
        dispatchEvent({ type: 'SET_GEO_IS_ALLOWED' });
      });
      setcanUsePos(true);
    } catch (error) {
      setcanUsePos(false);
    }
  }

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

  function getDate() {
    // Get Date
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
    let dateTime = '';
    return (dateTime = cDate + ' ' + cTime);
  }

  async function getPos() {
    // Get Coords
    if (canUsePos) {
      navigator.geolocation.getCurrentPosition(onSuccess, (error) => {
        console.log(error.message);
      });
    } else {
      console.log('No location');
    }
  }

  async function onSuccess(pos) {
    console.log('Current position is: ', pos);
    const address = await lookupAddress(
      pos.coords.latitude,
      pos.coords.longitude
    );
    if (address) {
      return address.city;
    }
  }

  async function lookupAddress(lat, lon) {
    try {
      const res = await fetch(
        `https://geocode.xyz/${lat},${lon}?geoit=json&auth=727136109069832636568x99446`
      );
      const data = await res.json();

      if (data.error) {
        console.log(data.error.message);
        return null;
      }

      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async function saveToStorage(imgSrc) {
    let posAddress = await getPos();
    const imgObj = {
      img: imgSrc,
      position: posAddress,
      date: getDate(),
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

      <section id="Gallery"></section>
    </>
  );
}

export default Camera;
