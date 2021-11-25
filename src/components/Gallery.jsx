import React, { useState, useEffect, createElement } from 'react';

function Gallery() {
  let [fetchedImgs, setfetchedImgs] = useState([]);
  const [showGalleryBtn, setshowGalleryBtn] = useState(false);

  useEffect(() => {
    const json = JSON.stringify(fetchedImgs);
    localStorage.setItem('Images', json);
  }, [fetchedImgs]);

  async function showGallery() {
    let storageImages = localStorage.getItem('Images');
    let parsedImages = await JSON.parse(storageImages);
    setfetchedImgs(parsedImages);
    setshowGalleryBtn(true);
  }

  const deleteImg = (idToDelete) => {
    const filteredImgs = fetchedImgs.filter(
      (fetchedImg) => fetchedImg.id !== idToDelete
    );
    setfetchedImgs(filteredImgs);
  };

  function downloadImg(imgToDownload) {
    const blob = imgToDownload;
    const url = URL.createObjectURL(blob);
    let a = createElement(
      'a',
      { href: `${url}`, download: 'Image.jpeg' },
      'Click to download'
    );
  }

  return (
    <>
      <section id="Gallery">
        <button onClick={showGallery}>Show Gallery</button>
        {showGalleryBtn ? (
          fetchedImgs.map((fetchedImg) => {
            return (
              <div key={fetchedImg.id}>
                <img src={fetchedImg.img} alt="Picture from gallery" />
                <p>Time Taken: {fetchedImg.date}</p>
                <p>Picture taken at: {fetchedImg.position}</p>
                <button onClick={() => deleteImg(fetchedImg.id)}>
                  Remove Image
                </button>
                <a download="Image.jpeg" href={fetchedImg.img}>
                  Download
                </a>
              </div>
            );
          })
        ) : (
          <p>No images in gallery</p>
        )}
      </section>
    </>
  );
}

export default Gallery;
