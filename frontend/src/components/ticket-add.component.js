import React, { Component } from 'react';
import axios from 'axios';
// import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export class CreateTicket extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassportId = this.onChangePassportId.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeBookingDate = this.onChangeBookingDate.bind(this);
        this.onChangeToLocation = this.onChangeToLocation.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            passportID: '',
            phoneNumber: '',
            bookingDate: new Date(),
            toLocation: '',
            price: ''
        }
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
    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }
    onChangePassportId(e) {
        this.setState({
            passportID: e.target.value
        });
    }
    onChangeBookingDate(date) {
        this.setState({
            bookingDate: date
        });
    }
    onChangeToLocation(e) {

        this.setState({
            toLocation: e.target.value,
        });
        this.onChangePrice()

    }

    onChangePrice(e) {
        const location = this.state.toLocation;
        switch (location) {
            case "USA":
                this.setState({
                    price: "140000"
                }); break;
            case "India":
                this.setState({
                    price: "120000"
                }); break;
            case "China":
                this.setState({
                    price: "170000"
                }); break;
            case "UK":
                this.setState({
                    price: "200000"
                }); break;
            case "Dubai":
                this.setState({
                    price: "213000"
                }); break;
            default:
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const ticket = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            passportID: this.state.passportID,
            phoneNumber: this.state.phoneNumber,
            bookingDate: this.state.bookingDate,
            toLocation: this.state.toLocation,
            price: this.state.price,
        }
        console.log(ticket);
        axios.post('http://localhost:5000/api/ticket/add', ticket)
            .then(res => {
                console.log(res);
                // if (res.status === 200) {
                //     this.clearData();
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Successful',
                //         text: 'ticket has been created!!',
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
            firstName: '',
            lastName: '',
            passportID: '',
            phoneNumber: '',
            bookingDate: '',
            toLocation: '',
            price: ''
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
                                                Book A Ticket Now
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div className="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>First Name : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control "
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeFirstName}
                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Last Name : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeLastName}
                                                    /><p />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div className="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black' >Passport Id Number : </label>
                                                    <div>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.passportID}
                                                            onChange={this.onChangePassportId}
                                                        /><p />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Contact Number : </label>
                                                    <input textarea="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.phoneNumber}
                                                        onChange={this.onChangePhoneNumber}
                                                    /><p />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Booking Date: </label>
                                                    <DatePicker
                                                        className='m-2'
                                                        selected={this.state.bookingDate}
                                                        onChange={this.onChangeBookingDate}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    <div className="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>To Location : </label>
                                                        <select type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.toLocation}
                                                            onChange={this.onChangeToLocation}
                                                        >
                                                            <option>UK</option>
                                                            <option>China</option>
                                                            <option>India</option>
                                                            <option>USA</option>
                                                            <option>Dubai</option>
                                                        </select>
                                                    </div>
                                                    <div className="">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Price : </label>
                                                        <input textarea="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.price}
                                                            onChange={this.onChangePrice}
                                                        />
                                                    </div>

                                                </div><p />
                                            </div>

                                            {/* <div className="form-group ">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black' for="grid-state">Department : </label>
                                                <select type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.department}
                                                    onChange={this.onChangeempdepartment}
                                                >
                                                    <option>Department 1</option>
                                                    <option>Department 2</option>
                                                    <option>Department 3</option>
                                                    <option>Department 4</option>
                                                    <option>Department 5</option>
                                                </select><p />
                                            </div> */}

                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Book Ticket" />
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