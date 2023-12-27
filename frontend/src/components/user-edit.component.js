import React, { Component } from 'react';
import axios from 'axios';
// import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { Link } from 'react-router-dom';

export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeLangType = this.onChangeLangType.bind(this);
        this.onChangeTelNo = this.onChangeTelNo.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            id: props.guId,
            firstName: '',
            lastName: '',
            nic: '',
            email: '',
            langType: '',
            telNo: '',
            password: ''
        }
    }

    //mounting retrived data to text areas
    componentDidMount() {
        axios.get('http://localhost:5000/api/user/' + this.state.id)
            .then(response => {
                console.log(this.props.ticketId);
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    nic: response.data.nic,
                    email: response.data.email,
                    langType: response.data.langType,
                    telNo: response.data.telNo,
                    password: response.data.password,
                })
            })
            .catch(function (error) {
                console.log("Error in mounting" + error);
            })
    }


    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeNIC(e) {
        this.setState({
            nic: e.target.value
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
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            nic: this.state.nic,
            email: this.state.email,
            langType: this.state.langType,
            telNo: this.state.telNo,
            password: this.state.password
        }

        console.log(user);

        axios.put('http://localhost:5000/api/user/' + this.state.id, user)
            .then(res => {
                console.log(res);
                // if (res.status === 200) {
                //     // this.refreshTable();
                //     this.props.close();
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Successful',
                //         text: 'User details has been updated!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#60e004'
                //     })

                // } else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Error',
                //         text: 'There was an error updating Your User!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#e00404'
                //     })
                // }
            })
    }
    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className="">
                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                    Add user
                                </p>
                                <div className="grid grid-cols-2 gap-4 form-group">

                                    <div className="">
                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>First Name </label>
                                        <input type="text"
                                            required
                                            placeholder=''
                                            className="form-control "
                                            value={this.state.firstName}
                                            onChange={this.onChangeFirstName}
                                        /><br />
                                    </div>
                                    <div className="form-group">
                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Last Name</label>
                                        <input type="text"
                                            required
                                            placeholder=''
                                            className="form-control"
                                            value={this.state.lastName}
                                            onChange={this.onChangeLastName}
                                        /><br />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 form-group">
                                    <div className="">
                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black' >NIC number</label>
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
                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Email</label>
                                        <input textarea="text"
                                            required
                                            placeholder=''
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                        /><br />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 form-group">
                                    <div className="form-group">
                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Languages</label>
                                        <input textarea="text"
                                            required
                                            placeholder=''
                                            className="form-control"
                                            value={this.state.langType}
                                            onChange={this.onChangeLangType}
                                        /><br />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 form-group">
                                        <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Mobile number</label>
                                            <input textarea="text"
                                                required
                                                placeholder=''
                                                className="form-control"
                                                value={this.state.telNo}
                                                onChange={this.onChangeTelNo}
                                            /><br />
                                        </div>
                                    </div><br />
                                    <div className="form-group">
                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Password</label>
                                        <input textarea="text"
                                            required
                                            placeholder=''
                                            className="form-control"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                        /><br />
                                    </div>
                                </div>
                                <div className="text-center align-middle form-group">
                                    <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add User" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}