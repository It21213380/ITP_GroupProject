import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
  const [credentials, credentialAction] = useState({})
  const navigator = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    Swal.fire({
      icon: 'info',
      title: 'Processing...',
      text: 'Please wait.',
    })

    // looking in users
    axios.post('http://localhost:5000/api/auth/login', {
      email: credentials?.email, password: credentials.password
    })
      .then(res => {
        const getUser = res.data
        if (res.status == 200) {
          localStorage.setItem("userSession", JSON.stringify(getUser))
          Swal.fire({
            icon: 'success',
            title: 'Signed in',
          })
          navigator("/")
          window.location.reload();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Server Error.',
            text: "try again"
          })
        }
      })
      .catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'Email and password mismatched.',
          text: "try again"
        })
      })
  }

  return (
    <div className='container text-center w-50'>
      <h1 className='display-4 my-3'>Login</h1>
      <form>
        <input type='text' placeholder='Email or username'
          value={credentials.email}
          onChange={(e) => credentialAction({
            ...credentials,
            email: e.target.value
          })}
          style={{ maxWidth: "300px" }}
          className='form-control mx-auto'
        /> <br />
        <input type='password' placeholder='Password'
          value={credentials.password}
          onChange={(e) => credentialAction({
            ...credentials,
            password: e.target.value
          })}
          style={{ maxWidth: "300px" }}
          className='form-control mx-auto'
        /> <br />
        <br />
        <input type='submit' onClick={(e) => handleLogin(e)} className='btn btn-primary' value={'Sign in'} />
      </form>

      <p className='my-3'> Don't have an account? <Link to={'/signup'}>
        Sign up
      </Link> today!
      </p>
      {/* <Link to={'/dashboard'}>dash</Link> */}
    </div>
  )
}

export default Login