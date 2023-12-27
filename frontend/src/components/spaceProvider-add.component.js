import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export class CreateSpaceProvider extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeLangType = this.onChangeLangType.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeTelNo = this.onChangeTelNo.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            nic: '',
            email: '',
            langType: '',
            company: '',
            telNo: '',
            password: '',
            address: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
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
    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }
    onChangeTelNo(e) {
        this.setState({
            telNo: e.target.value
        });
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value,
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

    onSubmit(e) {
        e.preventDefault();

        const spaceProvider = {
            username: this.state.username,
            email: this.state.email,
            langType: this.state.langType,
            company: this.state.company,
            telNo: this.state.telNo,
            address: this.state.address,
            nic: this.state.nic,
            password: this.state.password
        }
        console.log(spaceProvider);
        axios.post('http://localhost:5000/api/spaceProvider/add', spaceProvider)
            .then(res => {
                console.log(res);
                // if (res.status === 200) {
                //     this.clearData();
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Successful',
                //         text: 'SpaceProvider has been created!!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#60e004'
                //     })
                // } else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Error',
                //         text: 'Error in creating!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#e00404'
                //     })
                // }
            })
    }

    clearData = () => {
        this.setState({
            username: '',
            email: '',
            langType: '',
            company: '',
            telNo: '',
            address: '',
            nic: ''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div className="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div className="">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Add a Space Provider
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div className="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>SpaceProvider Name </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control "
                                                        title='Enter a name atleast 3 characters long'
                                                        value={this.state.username}
                                                        onChange={this.onChangeUsername}
                                                    /><br />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Email</label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.email}
                                                        onChange={this.onChangeEmail}
                                                    /><br />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div className="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black' >Language</label>
                                                    <div>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.langType}
                                                            onChange={this.onChangeLangType}
                                                        /><br />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Company/Business name</label>
                                                    <input textarea="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.company}
                                                        onChange={this.onChangeCompany}
                                                    /><br />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
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
                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    <div className="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Address</label>
                                                        <input textarea="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.address}
                                                            onChange={this.onChangeAddress}
                                                        /><br />
                                                    </div>
                                                    <div className="">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>NIC</label>
                                                        <input textarea="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.nic}
                                                            onChange={this.onChangeNIC}
                                                        />
                                                    </div>

                                                </div><br />
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
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Space Provider" />
                                                <Link to={'/spaceProvider'}>
                                                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                                                        Cancel
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}