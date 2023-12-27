import React, { Component } from 'react';
import axios from 'axios';
// import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class EditCusTicket extends Component {
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

    //mounting retrived data to text areas
    componentDidMount() {
        axios.get('http://localhost:5000/api/ticket/' + this.props.ticketId)
            .then(response => {
                console.log(this.props.ticketId);
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    passportID: response.data.passportID,
                    phoneNumber: response.data.phoneNumber,
                    bookingDate: new Date(response.data.bookingDate),
                    toLocation: response.data.toLocation,
                    price: response.data.price,
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
        alert(date);
    }
    onChangeToLocation(e) {
        this.setState({
            toLocation: e.target.value
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
        console.log(this.props.ticketId);
        axios.put('http://localhost:5000/api/ticket/' + this.props.ticketId, ticket)
            .then(res => {
                console.log(res);
                // if (res.status === 200) {
                //     // this.refreshTable();
                //     this.props.close();
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Successful',
                //         text: 'Ticket details has been updated!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#60e004'
                //     })

                // } else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Error',
                //         text: 'There was an error updating Your Ticket!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#e00404'
                //     })
                // }
            })
    }

    /*
    docName,
    category,
    date,
    description,
    createdEmp,
    empTitle,
    */

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <div className="formdiv">
                                        <form className=' rounded-lg' onSubmit={this.onSubmit}>
                                            <div class="">
                                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                    Update Your Ticket Details
                                                </p>
                                                <div className="grid grid-cols-2 gap-4 form-group">

                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 '>First Name : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control "
                                                            value={this.state.firstName}
                                                            onChange={this.onChangeFirstName}
                                                        /><p />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 '>Last Name : </label>
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
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 ' >Passport Id Number : </label>
                                                        <div>
                                                            <input type="text"
                                                                readOnly
                                                                placeholder=''
                                                                className="form-control"
                                                                value={this.state.passportID}
                                                                onChange={this.onChangePassportId}
                                                            /><p />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 '>Contact Number : </label>
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
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 '>Booking Date: </label>
                                                        <DatePicker
                                                            className='m-2'
                                                            selected={this.state.bookingDate}
                                                            onChange={this.onChangeBookingDate}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="grid grid-cols-2 gap-4 form-group">


                                                            <div className="form-group">
                                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>To Location : </label>
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
                                                                </select><p />
                                                            </div>
                                                            <div class="">
                                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 '>Price : </label>
                                                                <input textarea="text"
                                                                    required
                                                                    placeholder=''
                                                                    className="form-control"
                                                                    value={this.state.price}
                                                                    onChange={this.onChangePrice}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div><p />

                                                <div className="text-center align-middle form-group">
                                                    <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update" />
                                                </div>
                                            </div>
                                        </form>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}