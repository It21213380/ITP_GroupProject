import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Cloudinary_Image from '../features/cloudinaryAssests'
import { Button, Carousel } from 'react-bootstrap'
import Swal from 'sweetalert2'
import StripeComponent from './payment-stripe.component'

const PaymentConfirmPage = () => {
    const { _id, type } = useParams()
    const [dataReady, setDataReady] = useState(false)
    const [data, setData] = useState({})
    const navigator = useNavigate()

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/api/${type}/${_id}`)
                .then(response => {
                    setData(response.data)
                    setDataReady(true)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getData()
    }, [])



    return (
        <div className='container py-3'>


            <div class="container mt-5 px-5">
                <div class="mb-4">
                    <h2>Confirm order and pay</h2>
                    <span>Please make the payment, after that you can enjoy all the features and benefits.</span>
                </div>
                {!dataReady && <h6 className='display-3 mx-auto'>Loading..</h6>}
                {dataReady &&
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card p-3">
                                <h6 class="text-uppercase display-6 fs-3">Payment details</h6>

                                <StripeComponent
                                    amount={Number(data?.rate + '00')}
                                    currency={"lkr"}
                                    serviceType={type}
                                    serviceId={_id}
                                />
                                <div class="mt-4 mb-4">

                                </div>
                            </div>

                            {/* {JSON.stringify(paymentData)} */}
                        </div>
                        <div class="col-md-4 ">
                            <div class="card card-blue p-3 text-white mb-3 bg-success">
                                <>
                                    <h4>{data?.name}</h4>
                                    <p>At {data?.location}</p>
                                    <hr />
                                    <div className='row mb-4'>
                                        <p>
                                            {data?.description}
                                        </p>
                                        <ul>
                                            <li>
                                                <p><i alt='Profile' className='bi bi-people-fill img-fluid fs-3 m-2 align-middle' />
                                                    Payment for {data?.peopleCount} {data?.peopleCount == 1 ? "person" : "people"}
                                                </p>
                                            </li>
                                            <li>
                                                <p><i alt='Profile' className='bi bi-cash-coin img-fluid fs-3 m-2 align-middle text-success' />
                                                    Charge rate /night: {data?.rate} LKR
                                                </p>
                                            </li>
                                        </ul>
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
                                        <h3 className='mx-auto display-6 my-3'>{data?.rate} LKR</h3>

                                        <p className=' text-right'>
                                            Posted on : {data?.updatedAt?.substring(0, 10)} {data?.updatedAt?.substring(11, 16)}
                                        </p>
                                    </div>
                                </>
                            </div>

                        </div>

                    </div>
                }


            </div>
        </div>
    )
}

export default PaymentConfirmPage