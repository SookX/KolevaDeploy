import { useContext, useEffect, useState } from 'react'
import './gallery.less'
import { DataContext } from '../../context/DataContext'
import { CgMathPlus, CgTrash } from 'react-icons/cg'
import OpenPhoto from './OpenPhoto'

const Gallery = () => {
    // Gets global data from the context
    const { crud, access, url } = useContext(DataContext)



    // Holds the state for the photos
    const [photos, setPhotos] = useState([])
    const [selectedPhoto, setSelectedPhoto] = useState(false)



    // Holds the error and loading state of the gallery
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)



    // Gets the photos from the backend on init
    const fetchPhotos = async () => {
        setLoading(true)

        const response = await crud({
            url: '/service/gallery/',
            method: 'get'
        })

        if(response.status == 200) setPhotos(response.data.data.images)
        else setError('Нещо се обърка. Моля, опитайте по-късно.')

        setLoading(false)
    }


    useEffect(() => {
        fetchPhotos()
    }, [])



    // Makes a crud operation to the backend with the new photo
    const handleUpload = async (e) => {
        setLoading(true)

        const formData = new FormData()
        formData.append("image", e.target.files[0])
        
        const response = await crud({
            url: '/service/gallery/',
            method: 'post',
            body: formData,
        })

        if(response.status == 201) fetchPhotos()
        else {
            setError('Нещо се обърка. Опитай пак.')
            setLoading(false)
        }
    }



    // Makes a crud operation to the backend to delete the photo
    const handleDelete = async (id) => {
        setLoading(true)

        const response = await crud({
            url: `/service/gallery/${id}`,
            method: 'delete'
        })

        if(response.status == 204) fetchPhotos()
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }



    return (
        <section className="section-gallery">
            {
                loading &&
                <div className="overlay">
                    <div className="heart"></div>
                </div>
            }


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

                {
                    access &&
                    <label htmlFor='upload' className="gallery-upload">
                        <input
                            type="file"
                            id='upload'
                            accept="image/*"
                            onChange={(e) => handleUpload(e)}
                        />
                        <CgMathPlus />
                        <p>Качване</p>
                    </label>
                }
            </div>

            {
                error &&
                <p className="error">{error}</p>
            }

            <div className="gallery-grid">
                {
                    photos &&
                    photos.map((photo, i) => (
                        <div className='grid-photo-container'>
                            <img
                                key={i}
                                src={`${url}/${photo.image}`}
                                className='grid-photo'
                                onClick={() => setSelectedPhoto(`${url}/${photo.image}`)}
                            />

                            {
                                access &&
                                <CgTrash onClick={() => handleDelete(photo._id)} className='grid-photo-icon' />
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Gallery