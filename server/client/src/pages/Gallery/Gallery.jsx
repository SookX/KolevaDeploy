import { useState } from 'react'
import './gallery.less'
import OpenPhoto from './OpenPhoto'
import gallery1 from '../../img/gallery1.jpg'
import gallery2 from '../../img/gallery2.jpg'
import gallery3 from '../../img/gallery3.jpg'

const Gallery = () => {
    // Holds the state for the photos
    const photos = [gallery1, gallery2, gallery3]
    const [selectedPhoto, setSelectedPhoto] = useState(false)



    return (
        <section className="section-gallery">

            <OpenPhoto
                isOpen={selectedPhoto}
                onRequestClose={() => setSelectedPhoto(false)}
                image={selectedPhoto}
            />
            

            <div className="heading-gallery-container">
                <div className="heading-gallery">
                    <h2 className="title">Галерия</h2>
                    <p className='text'>Тук може да разгледате снимки от кабинета.</p>
                </div>
            </div>

            <div className="gallery-grid">
                {
                    photos &&
                    photos.map((photo, i) => (
                        <div className='grid-photo-container'>
                            <img
                                key={i}
                                src={photo}
                                className='grid-photo'
                                onClick={() => setSelectedPhoto(photo)}
                            />
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Gallery