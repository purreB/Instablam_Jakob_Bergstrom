import React, { useState, useEffect, useRef } from 'react';

function Camera() {
  const [canUseMd, setCanUseMd] = useState(false);
  const [cameraIsOn, setCameraIsOn] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const videoRef = useRef(null);

  const handleCameraToggle = () => {
    if (cameraIsOn) {
      cameraOff(videoRef.current, () => setCameraIsOn(false));
    } else {
      cameraOn(videoRef.current, setStatusMessage, () => setCameraIsOn(true));
    }
  };

  useEffect(() => {
    setCanUseMd('mediaDevices' in navigator);
  }, []);

  return (
    <div>
      {canUseMd ? <video ref={videoRef}></video> : null}
      <div>
        <button onClick={handleCameraToggle}>
          {cameraIsOn ? 'Turn Camera Off' : 'Turn Camera On'}
        </button>
      </div>
      <p>{statusMessage}</p>
    </div>
  );
}

async function cameraOff(videoElement, whenDone) {
  videoElement.srcObject = null;
  whenDone();
}

async function cameraOn(videoElement, showMessage, whenDone) {
  const constraints = {
    video: { faceingMode: 'user', width: 300, height: 200 },
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    videoElement.addEventListener('loadedmetadata', () => {
      videoElement.play();
      whenDone();
    });
  } catch (error) {
    console.log(
      'Could not use camera, try allowing it in permissions',
      error.message
    );
    showMessage(
      'Sorry, could not use your camera. Did you give me permission? Check that that you are not already using your camera in another app.'
    );
  }
}

export default Camera;
