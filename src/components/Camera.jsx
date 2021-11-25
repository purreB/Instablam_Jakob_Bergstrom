import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [md, setmd] = useState(false);
  const [imgArr, setimgArr] = useState([]);
  const [currentPos, setcurrentPos] = useState();

  useEffect(() => {
    console.log('HEJ');
    askLocationPermisson();
  }, []);

  function askLocationPermisson() {
    try {
      let geo = navigator.geolocation;
      geo.getCurrentPosition((pos) => {
        onSuccess(pos);
      });
    } catch (error) {
      console.log(error.message);
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

  async function onSuccess(pos) {
    console.log('Current position is: ', pos);
    const address = await lookupAddress(
      pos.coords.latitude,
      pos.coords.longitude
    );
    if (address) {
      setcurrentPos(address);
    } else {
      setcurrentPos();
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
    if (currentPos != undefined) {
      let currentCity = currentPos.city;
      const imgObj = {
        img: imgSrc,
        position: currentCity,
        date: getDate(),
      };
      addObjToArray(imgObj);
      const json = JSON.stringify(imgArr);
      localStorage.setItem('Images', json);
    } else {
      let currentCity = 'User did not allow position';
      const imgObj = {
        img: imgSrc,
        position: currentCity,
        date: getDate(),
      };
      addObjToArray(imgObj);
      const json = JSON.stringify(imgArr);
      localStorage.setItem('Images', json);
    }
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
