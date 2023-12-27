import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

export class CreateSpace extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangePeopleCount = this.onChangePeopleCount.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
        this.handleImgsUploads = this.handleImgsUploads.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            description: '',
            location: '',
            peopleCount: '',
            images: '',
            rate: ''
        }
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

    async handleImgsUploads(e) {

        //getting images into a object
        const imgs = [...e?.target?.files]
        if (!imgs) return
        console.log(imgs)
        
        this.setState({
            images: imgs
        })

        console.log(this.state.images)
    }

    async onSubmit(e) {
        e.preventDefault();

        const rawImages = this.state.images
        let b64files = []

        // convertion to base64
        async function getb64FileList(fileList) {
            function getb64(file) {
                const fileReader = new FileReader();
                return new Promise((resolve, reject) => {
                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                        resolve(fileReader.result);
                    };
                    fileReader.onerror = (error) => {
                        reject(error);
                    };
                });
            }

            console.log('b64files', typeof b64files)
            console.log('fileList', typeof fileList)
            if (Array.isArray(fileList))
                await Promise.all(
                    fileList.map(async file =>
                        b64files.push(await getb64(file))
                    )
                )
            else return []
        }

        await getb64FileList(rawImages)

        const space = {
            name: this.state.name,
            description: this.state.description,
            location: this.state.location,
            peopleCount: this.state.peopleCount,
            rate: this.state.rate,
            images: b64files
        }
        console.log(space);

        Swal.fire({
            icon: 'info',
            title: 'Creating Space ',
            text: 'Please wait...',
        })
        await axios
            .post('http://localhost:5000/api/space/add', space)
            .then(async res => {
                if (res.status === 200) {
                    this.clearData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Space has been placed!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#60e004'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'We faced a problem',
                        text: 'Coudn\'t create the space',
                    })
                }
                console.log('res', res)
            })
    }

    clearData = () => {
        this.setState({
            name: '',
            description: '',
            location: '',
            peopleCount: '',
            rate: ''
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
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit} enctype="multipart/form-data">
                                        <div className="">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Place an Space
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div className="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Space Name : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control "
                                                        value={this.state.name}
                                                        onChange={this.onChangeName}
                                                    /><p />
                                                </div>
                                                <div className="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Add Images : </label>
                                                    <input type="file"
                                                    required
                                                        multiple
                                                        placeholder=''
                                                        className="form-control "
                                                        onChange={this.handleImgsUploads}
                                                    /><p />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div className="">
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
                                                    <label htmlFor="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Location address: </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.location}
                                                        onChange={this.onChangeLocation}
                                                    /><p />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div className="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black' >No. of people : </label>
                                                    <div>
                                                        <input type="number"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.peopleCount}
                                                            onChange={this.onChangePeopleCount}
                                                        /><p />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>Payment Rate: </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.rate}
                                                        onChange={this.onChangeRate}
                                                    /><p />
                                                </div>
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Create" />
                                                <Link className='font-semibold text-white no-underline' to={"/space"}>
                                                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' >
                                                        Cancel
                                                    </button>
                                                </Link>
                                                {JSON.stringify(this.state.images)}
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