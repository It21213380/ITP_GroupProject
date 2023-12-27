import React, { Component, useState } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class EditPayment extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangePeopleCount = this.onChangePeopleCount.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            description: '',
            location: '',
            peopleCount: '',
            rate: '',
            imagesArr: []
        }
    }

    //mounting retrived data to text areas
    componentDidMount() {
        axios.get('http://localhost:5000/api/payment/' + this.props.spaceId)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    reason: response.data.reason,
                    location: response.data.cvv,
                    peopleCount: response.data.peopleCount,
                    rate: response.data.rate,
                    images: response.data.images
                })
                console.log("Mounting");

            })
            .catch(function (error) {
                console.log("Error in mounting" + error);
            })
    }
    onChangenameOnCard(e) {
        this.setState({
            nameOnCard: e.target.value
        });
    }
    onChangeCardNumber(e) {
        this.setState({
            cardNumber: e.target.value
        });
    }
    onChangeExpiry(e) {
        this.setState({
            expiry: e.target.value
        });
    }
   
    onChangecvvNumber(e) {
        this.setState({
            cvvNumber: e.target.value
        });
    }
    onChangestreetAddress(e) {
        this.setState({
            streetAddress: e.target.value
        });
    }
    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }
    onChangeState(e) {
        this.setState({
            state: e.target.value
        });
    }
    onChangezipCode(e) {
        this.setState({
            zipCode: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const payment = {
            nameOnCard: this.state.nameOnCard,
            cardNumber: this.state.cardNumber,
            expiry: this.state.expiry,
            cvv: this.state.cvvNumber,
            streetAddress: this.state.streetAddress,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zipCode
        }
        console.log(payment);
        axios.put('http://localhost:5000/api/payment/' + this.props.paymentId, payment)
            .then(res => {
                console.log(res);
                // if (res.status === 200) {
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Successful',
                //         text: 'Space has been placed!',
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

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <div className="formdiv">
                                        <form className='rounded-lg ' onSubmit={this.onSubmit}>
                                            <div class="">
                                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                    Update The Payment.
                                                </p>
                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    {/* {JSON.stringify(this.state)} */}
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Name on Card : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control "
                                                            value={this.state.nameOnCard}
                                                            onChange={this.onChangenameOnCard}
                                                        /><p />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Card Number : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.CardNumber}
                                                            onChange={this.onChangeCardNumber}
                                                            selected="Payment" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black' >Expiry : </label>
                                                        <div>
                                                            <textarea type="text"
                                                                required
                                                                placeholder=''
                                                                className="form-control"
                                                                value={this.state.expiry}
                                                                onChange={this.onChangeExpiry}
                                                            /><p />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'> CVV: </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.cvvNumber}
                                                            onChange={this.onChangecvvNumber}
                                                        /><p />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 form-group">

                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Street Address : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.streetAddress}
                                                            onChange={this.onChangestreetAddress}
                                                        />
                                                    </div>
                                                    <p />
                                                </div>
                                                <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>City : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.city}
                                                            onChange={this.onChangeCity}
                                                        />
                                                    </div>
                                                    <p />
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>State : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.state}
                                                            onChange={this.onChangeState}
                                                        />
                                                    </div>
                                                    <p />
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Payment Rate : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.rate}
                                                            onChange={this.onChangeRate}
                                                        />
                                                    </div>
                                                    <p />
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Zip Code : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.zipCode}
                                                            onChange={this.onChangeZipCode}
                                                        />
                                                    </div>
                                                    <p />
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
                </div >
            </div >
        )
    }
}