import React, { useState } from 'react'
import { CreateUser } from '../components/user-add.component'
import { ServiceSignUp } from './ServiceSignUp'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const login = { freelancer: 'freelancer', customer: 'customer' }
  const [loginMode, setLoginMode] = useState(login.customer)

  return (
    <>
      <div className='container row my-2 mx-auto' style={{ maxWidth: '40em' }}>
        <div className='col-sm-6 '>
          <input type='radio' name='login-mode' className='btn-check' id='customer-log'
            checked={loginMode === login.customer}
            onChange={() => setLoginMode(login.customer)}
          />
          <label className="btn btn-outline-primary w-100 m-1" htmlFor='customer-log'>Customer</label>
        </div>
        <div className='col-sm-6'>
          <input type='radio' name='login-mode' className='btn-check' id='service-log'
            checked={loginMode === login.freelancer}
            onChange={() => setLoginMode(login.freelancer)}
          />
          <label className="btn btn-outline-success w-100 m-1" htmlFor='service-log'>Freelancer</label>
        </div>
      </div >
      <div className='container-fluid text-dark mx-auto' style={{ minWidth: '30em' }} >
        <p className='text-center my-3'> Already have an account? <Link to={'/signin'}>
            Sign in
          </Link>.
        </p>
        {loginMode === login.customer && <CreateUser />}
        {loginMode === login.freelancer && <ServiceSignUp />}
      </div>
    </>
  )
}

export default SignUp