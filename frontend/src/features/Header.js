import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Cloudinary_Image from "./cloudinaryAssests";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Header = () => {
  const [userSession, setUserSession] = useState(JSON.parse(localStorage.getItem("userSession")))

  const [accountButton, setAccountButton] = useState(
    <Nav.Link href="/signin"
      className='btn btn-sm text-center fs-6'>
      Sign in
      <i alt='Profile' className='bi bi-person-circle img-fluid fs-3 m-2 align-middle' />
    </Nav.Link>
  )

  useEffect(() => {
    setUserSession(JSON.parse(localStorage.getItem("userSession")))

    const fetchData = () => {
      if (userSession) {
        axios.get(`http://localhost:5000/api/user/${userSession?._id}`)
          .then(res => {
            if (res.data?.role?.includes('admin'))
              setAccountButton(
                <Nav.Link href="/adminDashboard"
                  className='btn btn-sm text-center fs-6 text-success'>
                  {res.data?.firstName} {res.data?.lastName}
                  <i alt='Profile' className='bi bi-person-circle img-fluid fs-3 m-2 align-middle' />
                </Nav.Link>
              )
            else if (res.data?.role?.find(rl => rl.toString().includes('service')))
              setAccountButton(
                <Nav.Link href="/serviceDashboard"
                  className='btn btn-sm text-center fs-6 text-primary'>
                  {res.data?.firstName} {res.data?.lastName}
                  <i alt='Profile' className='bi bi-person-circle img-fluid fs-3 m-2 align-middle' />
                </Nav.Link>
              )
            else
              setAccountButton(
                <Nav.Link href="/dashboard"
                  className='btn btn-sm text-center fs-6'>
                  {res.data?.firstName} {res.data?.lastName}
                  <i alt='Profile' className='bi bi-person-circle img-fluid fs-3 m-2 align-middle' />
                </Nav.Link>
              )
          })

          .catch(e =>
            console.log('e', e)
          )
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        setUserSession(null)
        window.location.href = "/"
      }
    });
  }

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container className="text-center">
          <Navbar.Brand href="/">
            <Link to={"/"}>
              <Cloudinary_Image public_id={"logo"} width="175" height="100">
              </Cloudinary_Image>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/space" className="my-auto">Hotels</Nav.Link>
              <Nav.Link href="/tour" className="my-auto">Tours</Nav.Link>
              <Nav.Link href="/ticket" className="my-auto">Flights</Nav.Link>
              {accountButton}
              <NavDropdown id="basic-nav-dropdown" className="my-auto">

                {/* function paths */}
                <NavDropdown.Item href="/customerTicket">
                  AirTicket Customer
                </NavDropdown.Item>
                <NavDropdown.Item href="/ticket">
                  Admin AirTicket Customer
                </NavDropdown.Item>
                <NavDropdown.Item href="/tour">
                  Tour Packages
                </NavDropdown.Item>
                <NavDropdown.Item href="/adTourPackageList">
                  TP.admin
                </NavDropdown.Item>
                <NavDropdown.Item href="/guide">
                  Guides
                </NavDropdown.Item>
                <NavDropdown.Item href="/guidePack">
                  Guide Pack
                </NavDropdown.Item>
                <NavDropdown.Item href="/guidePackAdmin">
                  Ad. Guide Pack
                </NavDropdown.Item>
                <NavDropdown.Item href="/inquiry">
                  Inquiry
                </NavDropdown.Item>
                <NavDropdown.Item href="/adInquiry">
                  Ad.Inquiry
                </NavDropdown.Item>
                <NavDropdown.Item href="/spaceProvider">
                  Space provider
                </NavDropdown.Item>
                <NavDropdown.Item href="/space">
                  Spaces
                </NavDropdown.Item>
                <NavDropdown.Item href="/user">
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item href="/payment-list">
                  Payments
                </NavDropdown.Item>


                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>

        <style>
          {`
      .dropdown-menu[data-bs-popper] {
        left: -130px
      }
    `}
        </style>
      </Navbar>
    </header>
  );
};

export default Header;
