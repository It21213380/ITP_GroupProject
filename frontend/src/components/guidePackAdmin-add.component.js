import React, { Component } from 'react';
import axios from 'axios';
// import * as Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"

// firstName,
// lastName,
// passportID,
// phoneNumber,
// bookingDate
// toLocation,
// price,

export default class CreateGuidePackage extends Component {
    constructor(props) {
        super(props);
        this.onChangeGuideName = this.onChangeGuideName.bind(this);
        this.onChangeTouristArea = this.onChangeTouristArea.bind(this);
        this.onChangeLangType = this.onChangeLangType.bind(this);
        this.onChangeVehicleType = this.onChangeVehicleType.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            guideName: '',
            touristArea: '',
            langType: '',
            vehicleType: '',
            price: ''
        }
    }

    onChangeGuideName(e) {
        this.setState({
            guideName: e.target.value
        });
    }
    onChangeTouristArea(e) {
        this.setState({
            touristArea: e.target.value
        });
    }
    onChangeLangType(e) {
        this.setState({
            langType: e.target.value
        });
    }
    onChangeVehicleType(e) {
        this.setState({
            vehicleType: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const pack = {
            guideName: this.state.guideName,
            touristArea: this.state.touristArea,
            langType: this.state.langType,
            vehicleType: this.state.vehicleType,
            price: this.state.price,
        }

        console.log(pack);
        axios.post('http://localhost:5000/api/guidepackage/add', pack)
            .then(res => {
                console.log(res);
                // if (res.status === 200) {
                //     // this.refreshTable();
                //     this.clearData();
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Successful',
                //         text: 'Guide Package details has been Added!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#60e004'
                //     })

                // } else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Error',
                //         text: 'There was an error adding Your Guide Package!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#e00404'
                //     })
                // }
            })
    }

    clearData = () => {
        this.setState({
            guideName: '',
            touristArea: '',
            langType: '',
            vehicleType: '',
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
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Add Guide Pack
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 '>Guide Name </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control "
                                                        value={this.state.guideName}
                                                        onChange={this.onChangeGuideName}
                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 '>Tourist Area</label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.touristArea}
                                                        onChange={this.onChangeTouristArea}
                                                    /><p />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 ' >Language Type</label>
                                                    <div>
                                                        <input type="text"

                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.langType}
                                                            onChange={this.onChangeLangType}
                                                        /><p />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 '>Vehicle Type</label>
                                                    <input textarea="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.vehicleType}
                                                        onChange={this.onChangeVehicleType}
                                                    /><p />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 '>Price</label>
                                                    <input textarea="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.price}
                                                        onChange={this.onChangePrice}
                                                    />
                                                </div>
                                            </div><p />
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add" />
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