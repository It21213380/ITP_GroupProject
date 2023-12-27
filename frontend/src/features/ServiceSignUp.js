import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ROLES from '../config/ROLES.js';

export class ServiceSignUp extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeTelNo = this.onChangeTelNo.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeServiceType = this.onChangeServiceType.bind(this);
        this.onChangePasswordConf = this.onChangePasswordConf.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            nic: '',
            email: '',
            telNo: '',
            serviceType: '',
            password: '',
        }
    }

    onChangeFirstName(e) {

        this.setState({
            firstName: e.target.value,
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value,
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });

    }
    onChangeLangType(e) {
        this.setState({
            langType: e.target.value
        });

    }
    onChangeTelNo(e) {
        this.setState({
            telNo: e.target.value
        });

    }
    onChangeNIC(e) {
        this.setState({
            nic: e.target.value
        });

    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });

    }
    onChangeServiceType(e) {
        this.setState({
            serviceType: e.target.value
        });

    }
    onChangePasswordConf(e) {
        this.setState({
            passwordConf: e.target.value
        });

    }
    setIsValidInfo = () => {
        if (
            [this.state.firstName,
            this.state.lastName,
            this.state.nic,
            this.state.telNo,
            this.state.email,
            this.state.password].every(Boolean) &&
            this.state.password == this.state.passwordConf
        ) {
            this.setState({
                isValid: true
            })
            return
        }
        this.setState({
            isValid: false
        })
        return
    }

    async onSubmit(e) {
        e.preventDefault();
        const account = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            serviceType: this.state.serviceType,
            telNo: this.state.telNo,
            nic: this.state.nic,
            password: this.state.password
        }
        console.log(account)
        let to_DBpart
        switch (this.state.serviceType) {
            case 'spaceProvider':
                to_DBpart = 'spaceProvider'
                break
            case 'tourGuide':
                to_DBpart = 'guide'
                break
            case 'driver':
                to_DBpart = 'driver'
                break
        }

        await axios.post(`http://localhost:5000/api/signup/${to_DBpart}`, account)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.clearData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'SpaceProvider has been created!!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#60e004'
                    })
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error in creating!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                    })
                }
            })
    }

    clearData = () => {
        this.setState({})
    }

    render() {
        const isValid = [
            this.state.firstName,
            this.state.lastName,
            this.state.nic,
            this.state.email,
            this.state.telNo,
            this.state.serviceType,
            this.state.password,
            this.state.passwordConf
        ].every(Boolean) &&
            this.state.password === this.state.passwordConf

        return (
                <form className='container px-4 py-12 border-2 rounded-lg shadow-md bg-gray-50' 
                style={{maxWidth: "50em"}}
                onSubmit={this.onSubmit}>
                    <div className="">
                        <p className='text-4xl font-semibold text-black text-center drop-shadow-lg display-6'>
                            Sign up as a Service
                        </p>
                        <p className='text-center fs-6'>
                            Join the freelancer community and find better ways to earn
                        </p>
                        <hr className='bg-success' />
                        <div className="grid grid-cols-2 gap-4 form-group">

                            <div className="">
                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>First Name</label>
                                <input type="text"
                                    required
                                    placeholder=''
                                    className="form-control "
                                    title='Enter a name atleast 3 characters long'
                                    value={this.state.firstName}
                                    onChange={this.onChangeFirstName}
                                /><br />
                            </div>
                            <div className="form-group">
                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Last name</label>
                                <input type="text"
                                    required
                                    placeholder=''
                                    className="form-control"
                                    title='Enter a name atleast 3 characters long'
                                    value={this.state.lastName}
                                    onChange={this.onChangeLastName}
                                /><br />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 form-group">
                            <div className="">
                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black' >NIC</label>
                                <div>
                                    <input type="text"
                                        required
                                        placeholder=''
                                        className="form-control"
                                        value={this.state.nic}
                                        onChange={this.onChangeNIC}
                                    /><br />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Mobile Number</label>
                                <input textarea="text"
                                    required
                                    placeholder=''
                                    pattern='[0-9]{10}'
                                    title='Only enter a 10 digit number'
                                    className="form-control"
                                    value={this.state.telNo}
                                    onChange={this.onChangeTelNo}
                                /><br />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 form-group">
                            <div className="form-group">
                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Email</label>
                                <input type="email"
                                    required
                                    placeholder=''
                                    title='Only enter a 10 digit number'
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                /><br />
                            </div>
                            <div className="form-group">
                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Service Type</label>
                                <select
                                    required
                                    options={Object.keys(ROLES.services)}
                                    title='Only enter a 10 digit number'
                                    className="form-control"
                                    value={this.state.serviceType}
                                    onChange={this.onChangeServiceType}
                                >
                                    <option >Select</option>
                                    {Object.entries(ROLES.services).map(([key, val]) => (
                                        <option value={key} >{val}</option>
                                    ))}
                                </select><br />
                            </div>
                            <div className="grid grid-cols-2 gap-4 form-group">
                            </div><br />
                        </div>
                        <div className="grid grid-cols-2 gap-4 form-group">
                            <div className="form-group">
                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Password</label>
                                <input type='password'
                                    required
                                    placeholder=''
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                /><br />
                            </div>
                            <div className="form-group">
                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Confirm Password</label>
                                <input type='password'
                                    required
                                    placeholder=''
                                    className="form-control"
                                    value={this.state.passwordConf}
                                    onChange={this.onChangePasswordConf}
                                /><br />
                            </div>
                        </div>
                        <div className="text-center align-middle form-group row">
                            <input
                                className={isValid ?
                                    'btn btn-primary col-sm-12' :
                                    'btn btn-secondary'
                                }
                                type="submit"
                                value="Next"
                                disabled={!isValid}
                            /> <br />
                            <div className='col-sm-12 p-0'>
                                <Link to={'/home'} className=''>
                                    <button className='btn btn-primary mt-3 col-sm-12'
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
        )
    }
}