import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cloudinary_Image from '../features/cloudinaryAssests'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SpaceBrowse = () => {

    const loadingMsg = <p className='fs-4 text-center text-gray-400'>Loading...</p>

    const [spaceData, setSpaceData] = useState({})
    const [search, setSearch] = useState("")
    const [dataReady, setDataReady] = useState(false)
    const [listRender, setListRender] = useState(
        loadingMsg
    )

    useEffect(() => {
        const getSpaceData = async () => {
            setDataReady(false)
            await axios.get('http://localhost:5000/api/space/')
                .then(response => {
                    setSpaceData(response.data)
                    setDataReady(true)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getSpaceData()
    }, [])

    useEffect(() => { renderList() }, [dataReady, search])

    function spaceListRender(list) {
        if (list?.length == 0) {
            return <p className='text-center text-secondary'>No results. Try with fewer keywords or letters.</p>
        }
        return (

            list?.map(entry =>
                <div className='border p-2 row'>
                    <div className='col-md'>
                        <Link to={`/space/${entry._id}`} className='text-decoration-none '>
                            <h6 className='fs-3 display-6' >{entry.name}</h6>
                        </Link>
                        <p>{entry.description}</p>
                        <ul>
                            <li>
                                <p><i alt='Profile' className='bi bi-people-fill img-fluid fs-3 align-middle' />
                                    Space for {entry?.peopleCount} {entry?.peopleCount == 1 ? "person" : "people"}
                                </p>
                            </li>
                            <li>
                                <p><i alt='Profile' className='bi bi-cash-coin img-fluid fs-3 align-middle text-success' />
                                    Charge rate /night: {entry?.rate} LKR
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md'>
                        <div>
                            <Carousel>
                                {entry.images.map(imgId =>
                                    <Carousel.Item interval={5000}>
                                        <Cloudinary_Image public_id={imgId.toString()} height='300' width='500' />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>
                    </div>
                </div>
            )
        )
    }

    function renderList() {
        if (dataReady) {
            if (spaceData && Array.isArray(spaceData)) {
                setListRender(
                    search == ""
                        ? spaceListRender(spaceData)
                        : spaceListRender(
                            spaceData?.filter(entry =>
                                entry?.name.toLowerCase().includes(search.toString().toLowerCase()) ||
                                entry?.description.toLowerCase().includes(search.toString().toLowerCase())
                            )
                        )
                )
            } else {
                setListRender(<p className='text-center'>An error occured. Please try again later.</p>)

            }
        } else {
            setListRender(loadingMsg)
        }
    }

    return (
        <>
            <div className='container py-3'>
                <div className='p-3 border'>
                    <div className='row'>
                        <div className='col-md'>
                            <h4 className='display-6'>Hotels and Places</h4>
                        </div>
                        <div className='col-md'>
                            <input
                                className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                type="text"
                                placeholder="Search by keywords..."
                                aria-label="Search"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value.toString());
                                }}
                            />
                        </div>
                    </div>
                    {listRender}
                </div>
            </div>
        </>
    )
}

export default SpaceBrowse