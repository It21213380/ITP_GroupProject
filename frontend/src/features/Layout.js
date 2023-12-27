import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../components/navbar.component";
import Footer from './Footer';
import Header from './Header'

const Layout = () => {
    return (
        <>
            <Header/>
            {/* <Navbar /> */}
            <Outlet />
            <Footer/>
        </>
    )
}

export default Layout