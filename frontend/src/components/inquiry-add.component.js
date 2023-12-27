import React, { Component } from 'react';
import axios from 'axios';
// import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

export class CreateInquiry extends Component {
    constructor(props) {
        super(props);
        this.onChangeCusName = this.onChangeCusName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeContactNum = this.onChangeContactNum.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            CusName: '',
            description: '',
            contactNum: '',
            address: '',
            date: new Date(),
            status: 'Pending'
        }
    }

    onChangeCusName(e) {
        this.setState({
            CusName: e.target.value
        });
    }
    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeContactNum(e) {
        this.setState({
            contactNum: e.target.value
        });
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const inquiry = {
            CusName: this.state.CusName,
            type: this.state.type,
            description: this.state.description,
            contactNum: this.state.contactNum,
            address: this.state.address,
            date: this.state.date,
            status: this.state.status,
        }
        console.log(inquiry);
        axios.post('http://localhost:5000/api/inquiry/add', inquiry)
            .then(res => {
                console.log(res);
                // if (res.status === 200) {
                //     this.clearData();
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Successful',
                //         text: 'Inquiry has been placed!',
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
                navigator('/inquiry')
            })
    }

    clearData = () => {
        this.setState({
            CusName: '',
            type: '',
            description: '',
            contactNum: '',
            address: '',
            date: new Date(),
            status: ''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Place an Inquiry
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Your Name : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control "
                                                        value={this.state.CusName}
                                                        onChange={this.onChangeCusName}
                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Type : </label>
                                                    <select type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.type}
                                                        onChange={this.onChangeType}
                                                        selected="Payment"
                                                    >
                                                        <option defaultChecked> -- select an option -- </option>
                                                        <option>Payment</option>
                                                        <option>Travel Package</option>
                                                        <option>Tour Guide</option>
                                                        <option>Other</option>
                                                    </select><p />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black' >Description : </label>
                                                    <div>
                                                        <textarea type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.description}
                                                            onChange={this.onChangeDescription}
                                                        /><p />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Contact Number: </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.contactNum}
                                                        onChange={this.onChangeContactNum}
                                                    /><p />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Address : </label>
                                                    <textarea type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.address}
                                                        onChange={this.onChangeAddress}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    <div class="">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Status : </label>
                                                        <input textarea="text"
                                                            disabled
                                                            placeholder='Pending!'
                                                            className="form-control"
                                                            value={this.status}
                                                            onChange={this.onChangeStatus}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Date: </label>
                                                        <DatePicker
                                                            className='m-2'
                                                            selected={this.state.date}
                                                            onChange={this.onChangeDate}
                                                        />
                                                    </div>
                                                </div><p />
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Place" />
                                                <Link className='font-semibold text-white no-underline' to={"/inquiry"}>
                                                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' >
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