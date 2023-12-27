import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const DashHeader = () => {

    const userSession = JSON.parse(localStorage.getItem("userSession"))

    return (
        <div className="container text-center border-bottom border-3 p-3 mb-3 d-flex justify-content-between">
            <Link to=
            {
                userSession?.role.find(r => r?.includes("admin")) ? "/adminDashboard" :
                userSession?.role.find(r => r?.includes("service")) ? "/serviceDashboard" : "/dashboard"
            }  
            className="text-decoration-none text-dark">
                <h2 className="display-6" >DashBoard</h2>
            </Link>
        </div>
    )
}

export default DashHeader