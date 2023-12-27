import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const DashBoard = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const localUser = JSON.parse(localStorage.getItem("userSession"))
    const [userSession, setUserSession] = useState(JSON.parse(localStorage.getItem("userSession")))

    useEffect(() => {
        const fetchUser =async () => {
            const res = await axios.get(`http://localhost:5000/api/user/${userSession?._id}`)
            setUserSession(res.data)
        }
        fetchUser()
    }, [])

    return (
        <div className='container border-start border-end p-3'>
            <p className='display-5'>Welcome {userSession.firstName+" "+userSession.lastName}</p>
            <small>{today}</small>
            <div className='container row mt-3'>
                <Link to={'/dashboard/payment-list'} className='col-sm-4 p-1'>
                    <button className='btn btn-light border w-100'>
                        <i className='m-5 bi bi-person-badge-fill fs-1' /> <br />
                        My Payment Information
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default DashBoard