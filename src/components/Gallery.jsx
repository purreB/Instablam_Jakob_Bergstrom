import React, { useState, useEffect } from 'react';

function Gallery() {
  let [fetchedImgs, setfetchedImgs] = useState([]);
  const [showGalleryBtn, setshowGalleryBtn] = useState(false);

  useEffect(() => {
    console.log(fetchedImgs);
  }, [fetchedImgs]);

  async function showGallery() {
    let storageImages = localStorage.getItem('Images');
    let parsedImages = await JSON.parse(storageImages);
    setfetchedImgs(parsedImages);
    setshowGalleryBtn(true);
  }

  return (
    <>
      <section id="Gallery">
        <button onClick={showGallery}>Show Gallery</button>
        {showGalleryBtn
          ? fetchedImgs.map((fetchedImgs) => {
              <div key={fetchedImgs.img}>
                {<img src={fetchedImgs.img} alt="Picture from gallery" />}
                <p>Time Taken: {fetchedImgs.date}</p>
                <p>Picture taken at: {fetchedImgs.pos}</p>
              </div>;
            })
          : null}
      </section>
    </>
  );
}

export default Gallery;
