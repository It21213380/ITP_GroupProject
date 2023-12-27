import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cloudinary_Image from './cloudinaryAssests'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {

    const [spaceData, setSpaceData] = useState({})
    const [tourData, setTourData] = useState({})
    const [dataReady, setDataReady] = useState(false)

    useEffect(() => {
        const getSpaceData = async () => {
            await axios.get('http://localhost:5000/api/space/')
                .then(response => {
                    setSpaceData(response.data)
                    setDataReady(true)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        const getTourData = async () => {
            await axios.get('http://localhost:5000/api/tour/')
                .then(response => {
                    setTourData(response.data)
                    setDataReady(true)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getSpaceData()
        getTourData()
    }, [])

    return (
        <>
            <div className='jumbotron-fluid bg-primary text-center p-3 text-light'>
                <h3 className='display-6 >'>Welcome! Start your adventures here </h3>
            </div>
            <div className='container py-3'>
                <div className='row justify-content-between'>
                    <div className='col-md-4 p-3 border'>
                        <h4 className='display-6'>Hotels and Places</h4>
                        {!dataReady && <p className='fs-4 text-center text-gray-400'>Loading...</p>}
                        {dataReady && spaceData && Array.isArray(spaceData) &&
                            spaceData.map(entry =>
                                <div className='border p-2'>
                                    <Link to={`/space/${entry._id}`} className='text-decoration-none '>
                                        <h6 className='fs-3 display-6' >{entry.name}</h6>
                                    </Link>
                                    <p>{entry.description}</p>
                                    <Carousel>
                                        {entry.images.map(imgId =>
                                            <Carousel.Item interval={5000}>
                                                <Cloudinary_Image public_id={imgId.toString()} />
                                            </Carousel.Item>
                                        )}
                                    </Carousel>
                                </div>

                            )}
                    </div>
                    <div className='col-md-8 p-3 border'>
                        <h4 className='display-6'>Tours</h4>
                        {!dataReady && <p className='fs-4 text-center text-gray-400'>Loading...</p>}
                        {dataReady && tourData && Array.isArray(tourData) &&
                            tourData.map(entry =>
                                <div className='border p-2 row'>
                                    <div className='col-md'>
                                        <Link to={`/tour/${entry._id}`} className='text-decoration-none '>
                                            <h6 className='display-6 fs-3'>{entry.name}</h6>
                                        </Link>
                                        <h6 className='fs-3 text-center'>
                                            {entry.fromLocation}
                                            <i className='bi bi-arrow-right px-5' />
                                            {entry.toLocation}
                                        </h6>
                                        <p>{entry.description}</p>
                                    </div>
                                    <div className='col-md'>
                                        <Carousel>
                                            {entry.images.map(imgId =>
                                                <Carousel.Item interval={5000}>
                                                    <Cloudinary_Image public_id={imgId.toString()} />
                                                </Carousel.Item>
                                            )}
                                        </Carousel>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home