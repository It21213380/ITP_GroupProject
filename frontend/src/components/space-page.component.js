import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cloudinary_Image from '../features/cloudinaryAssests'
import { Carousel } from 'react-bootstrap'

const SpacePage = () => {
    const { _id } = useParams()
    const [dataReady, setDataReady] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        const getSpaceData = async () => {
            await axios.get(`http://localhost:5000/api/space/${_id}`)
                .then(response => {
                    setData(response.data)
                    setDataReady(true)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getSpaceData()
    }, [])

    return (
        <div className='container py-3'>
            {!dataReady && <h6 className='display-3 mx-auto'>Loading..</h6>}
            {dataReady &&
                <>
                    <h4>{data?.name}</h4>
                    <p className='text-secondary'>At {data?.location}</p>
                    <hr />
                    <div className='row mb-4'>
                        <div className='col'>
                            <p>
                                {data?.description}
                            </p>
                            <ul>
                                <li>
                                    <p><i alt='Profile' className='bi bi-people-fill img-fluid fs-3 m-2 align-middle' />
                                        Space for {data?.peopleCount} {data?.peopleCount == 1 ? "person" : "people"}
                                    </p>
                                </li>
                                <li>
                                    <p><i alt='Profile' className='bi bi-cash-coin img-fluid fs-3 m-2 align-middle text-success' />
                                        Charge rate /night: {data?.rate} LKR
                                    </p>
                                </li>
                            </ul>
                            <Link to={`/payment/space/${data._id}`}>
                                <button className='btn-primary'>Book Now</button>
                            </Link>
                        </div>
                        <div className='col text-center'>
                            {data?.images?.length == 0 &&
                                <p className='text-secondary'>
                                    No images available
                                </p>
                            }
                            {data?.images?.length > 0 &&
                                <Carousel>
                                    {data?.images.map(imgId =>
                                        <Carousel.Item interval={5000}>
                                            <Cloudinary_Image public_id={imgId.toString()} />
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                            }
                        </div>
                    </div>
                    <p className='text-secondary text-right'>
                        Posted on : {data?.updatedAt.substring(0, 10)} {data?.updatedAt.substring(11, 16)}
                    </p>
                </>
            }

            {/* {JSON.stringify(data)} */}
        </div>
    )
}

export default SpacePage