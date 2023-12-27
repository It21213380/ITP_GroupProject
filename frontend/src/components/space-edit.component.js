import React, { Component, useState } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class EditSpace extends Component {
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
        axios.get('http://localhost:5000/api/space/' + this.props.spaceId)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    location: response.data.location,
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
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }
    onChangePeopleCount(e) {
        this.setState({
            peopleCount: e.target.value
        });
    }
    onChangeRate(e) {
        this.setState({
            rate: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const space = {
            name: this.state.name,
            description: this.state.description,
            location: this.state.location,
            peopleCount: this.state.peopleCount,
            rate: this.state.rate
        }
        console.log(space);
        axios.put('http://localhost:5000/api/space/' + this.props.spaceId, space)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Space has been changed!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#60e004'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in creating!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#e00404'
                    })
                }
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
                                                    Update The Space
                                                </p>
                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    {/* {JSON.stringify(this.state)} */}
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Space Name : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control "
                                                            value={this.state.name}
                                                            onChange={this.onChangeName}
                                                        /><p />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Description : </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.description}
                                                            onChange={this.onChangeDescription}
                                                            selected="Payment" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black' >Location : </label>
                                                        <div>
                                                            <textarea type="text"
                                                                required
                                                                placeholder=''
                                                                className="form-control"
                                                                value={this.state.location}
                                                                onChange={this.onChangeLocation}
                                                            /><p />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Number of people: </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.peopleCount}
                                                            onChange={this.onChangePeopleCount}
                                                        /><p />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 form-group">

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
                                                </div>
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