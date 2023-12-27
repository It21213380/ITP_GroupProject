import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as Swal from "sweetalert2";
import { Carousel, Modal } from "react-bootstrap";
import EditTour from "./tourpackage-edit.component";
import Cloudinary_Image from '../features/cloudinaryAssests';

export const Tour = props => (
    <tr className='text-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <div class="justify-between grid grid-cols-4 gap-1 p-3 m-1 shadow-xl shadow-slate-300 hover:shadow-lg hover:shadow-cyan-500-100 hover:duration-300 rounded-lg max-w-sm lg:max-w-full lg:flex">
            <div class="col-span-3">
                <div class="">
                    <div class=" border-gray-400 bg-white flex flex-col">
                        <div class="">
                            <div class="text-gray-900 font-bold text-3xl "> {props.tour.name}</div>

                            <p class="pl-1 text-sm text-yellow-400 font-bold flex items-center">
                                Premium Service
                            </p>
                            <p class="text-gray-900 text-lg ">Date : {props.tour.date.substring(0, 10)}</p>

                            <div class="text-gray-900 text-xl  flex">
                                <div class="flex">
                                    From : <p className='p-1 ml-2 text-lg font-bold bg-blue-200 rounded-lg'>{props.tour.fromLocation}</p>
                                </div>
                                <div class="ml-5 flex">
                                    To : <p className='p-1 ml-2 text-lg font-bold bg-green-200 rounded-lg'>{props.tour.toLocation}</p>
                                </div>
                            </div>
                        </div>
                        <div class=" items-center">
                            <div class="text-base ">
                                <p class="text-gray-600 text-xl flex">
                                    Transportation mode :
                                    <p className='ml-2 text-lg font-bold'>
                                        {props.tour.transportMode}
                                    </p>
                                </p>

                                <p class="flex text-gray-900  text-xl"> Tour Price (Per person) : <p className='ml-2 text-lg font-bold'>{props.tour.price} LKR</p></p>

                            </div>
                            <div class="text-gray-900 font-thin text-base">
                                <p class="text-gray-600 text-xl flex">
                                    Description :
                                    <p className='ml-2 text-lg font-bold'>
                                        {props.tour.description}
                                    </p>
                                </p>
                                <p />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <div class="flex mt-1 justify-end ">
                            <div class="">
                                <button className='items-center px-2 py-2 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-full hover:bg-blue-200' onClick={() => { props.gotoUpdateTour(props.tour._id) }}>
                                    <div class="ml-2">
                                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            <div class="">
                                <button className='items-center px-2 py-2 ml-2 text-sm font-medium text-white duration-100 bg-red-500 rounded-full shadow-lg shadow-black hover:bg-red-200'
                                    onClick={() => { props.deleteTour(props.tour._id) }}
                                >
                                    <div class="ml-2">
                                        <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-3'>
                <Carousel>
                    {props.tour?.images?.length > 0 && props.tour.images.map(imgId =>
                        <Carousel.Item interval={5000}>
                            <Cloudinary_Image public_id={imgId.toString()} />
                        </Carousel.Item>
                    )}
                </Carousel>
            </div>

        </div >
    </tr>
)

export class TourPackageList extends Component {
    constructor(props) {
        super(props);
        this.deleteTour = this.deleteTour.bind(this);
        this.gotoUpdateTour = this.gotoUpdateTour.bind(this);
        this.state = {
            id: "",
            tour: [],
            searchTour: "",
            show: false
        };
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable() {
        axios.get('http://localhost:5000/api/tour/')
            .then(response => {
                this.setState({ tour: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoUpdateTour = (id) => {
        this.setState({
            id: id,
            show: true
        })
        console.log("Tour id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshTable();
    }

    deleteTour(id) {
        axios.delete('http://localhost:5000/api/tour/' + id)
            .then(res => {
                // console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'The space has been removed!'
                })
            })
            .catch(e => {
                // console.log('e', e)
                Swal.fire({
                    icon: 'danger',
                    title: 'Delete failed'
                })
            })

        this.setState({
            tour: this.state.tour.filter(el => el._id !== id)
        })
    }

    tourList() {
        return this.state.tour.map(currenttour => {
            return <Tour
                tour={currenttour}
                deleteTour={this.deleteTour}
                gotoUpdateTour={this.gotoUpdateTour}
                key={currenttour._id}
            />;
        })
    }

    searchTourList() {
        const searchedTour = this.state.tour.filter(tour =>
            tour.name.toLowerCase().includes(this.state.searchTour.toLowerCase()) ||
            tour.toLocation.toLowerCase().includes(this.state.searchTour.toLowerCase()) ||
            tour.fromLocation.toLowerCase().includes(this.state.searchTour.toLowerCase()) ||
            tour.description.toLowerCase().includes(this.state.searchTour.toLowerCase())
        )
        if (searchedTour?.length == 0)
            return <h2 className='display-6 text-center'>No search results</h2>

        return searchedTour.map(currenttour => {
            return <Tour
                tour={currenttour}
                deleteTour={this.deleteTour}
                gotoUpdateTour={this.gotoUpdateTour}
                key={currenttour._id}
            />;
        })
    }
    /*
    searchTourList() {
        return this.state.tour.map((currenttour) => {
            if (
                this.state.searchTour == currenttour.toLocation
            ) {
                return (
                    <tr className='text-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <div class="justify-between grid grid-cols-4 gap-2 p-5 m-5 shadow-xl shadow-slate-300 hover:shadow-lg hover:shadow-cyan-500-100 hover:duration-300 rounded-lg max-w-sm lg:max-w-full lg:flex">
                            <div class="col-span-3">
                                <div class="">
                                    <div class=" border-gray-400 bg-white flex flex-col">
                                        <div class="">
                                            <div class="text-gray-900 font-bold text-3xl "> {currenttour.name}</div>

                                            <p class="pl-1 text-sm text-yellow-400 font-bold flex items-center">
                                                Premium Service
                                            </p>
                                            <p class="text-gray-900 text-lg ">Date : {currenttour.date.substring(0, 10)}</p>

                                            <div class="text-gray-900 text-xl  flex">
                                                <div class="flex">
                                                    From : <p className='p-1 ml-2 text-lg font-bold bg-blue-200 rounded-lg'>{currenttour.fromLocation}</p>
                                                </div>
                                                <div class="ml-5 flex">
                                                    To : <p className='p-1 ml-2 text-lg font-bold bg-green-200 rounded-lg'>{currenttour.toLocation}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" items-center">
                                            <div class="text-base ">
                                                <p class="text-gray-600 text-xl flex">
                                                    Transportation mode :
                                                    <p className='ml-2 text-lg font-bold'>
                                                        {currenttour.transportMode}
                                                    </p>
                                                </p>

                                                <p class="flex text-gray-900  text-xl"> Tour Price (Per person) : <p className='ml-2 text-lg font-bold'>LKR: {currenttour.price} </p></p>

                                            </div>
                                            <div class="text-gray-900 font-thin text-base">
                                                <p class="text-gray-600 text-xl flex">
                                                    Description :
                                                    <p className='ml-2 text-lg font-bold'>
                                                        {currenttour.description}
                                                    </p>
                                                </p>
                                                <p />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-1">
                                <div class="flex mt-1 justify-end ">
                                    <div class="">
                                        <button className='items-center px-2 py-2 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-full hover:bg-blue-200' onClick={() => { this.gotoUpdateTour(currenttour._id) }}>
                                            <div class="ml-2">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="">
                                        <button className='items-center px-2 py-2 ml-2 text-sm font-medium text-white duration-100 bg-red-500 rounded-full shadow-lg shadow-black hover:bg-red-200'
                                            onClick={() => {
                                                //Delete the selected record
                                                axios
                                                    .delete(
                                                        "http://localhost:5000/api/tour/" + currenttour._id
                                                    )
                                                    .then(() => {
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Successful',
                                                            text: 'The space has been removed!'
                                                        })
                                                        // alert("Tour Package delete Success");
                                                        //Get data again after delete
                                                        axios
                                                            .get("http://localhost:5000/api/tour")
                                                            .then((res) => {
                                                                console.log(res.data);
                                                                this.setState({
                                                                    tour: res.data,
                                                                });
                                                            })
                                                            .catch((err) => console.log(err));
                                                    })
                                                    .catch((err) => {
                                                        alert(err);
                                                    });
                                            }}
                                        >
                                            <div class="ml-2">
                                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </tr>
                );
            }
        });
    }
    */
    /*
        name,
        fromLocation,
        toLocation,
        description,
        transportMode,
        price,
        date,
*/
    exportTour = () => {
        console.log("Exporting PDF")
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Tour Package List Report";
        const headers = [["Tour Name", "Starting From", "Destination", "Description", "Mode of transport", "Price", "Date"]];
        const tour = this.state.tour.map(
            Tour => [
                Tour.name,
                Tour.fromLocation,
                Tour.toLocation,
                Tour.description,
                Tour.transportMode,
                Tour.price,
                Tour.date.substring(0, 10)
            ]
        );
        let content = {
            startY: 50,
            head: headers,
            body: tour,
        };
        console.log("Easdasd")

        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Tour-Packages-list.pdf")
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table>
                                    <tr>
                                        <th className='drop-shadow-md'>
                                            <h3>Packages List</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/createTour"}>
                                                        <div class="flex">
                                                            <div class="">
                                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                                </svg>
                                                            </div>
                                                            {/* This add button onlu shows for tour guidsDS*/}
                                                            <div class="">
                                                                Add New Tour Package
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </button>
                                                <button class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportTour()}>
                                                    <div class="">
                                                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                        Download Tour Packages List
                                                    </div>
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by the Destination"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchTour: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full h-full overflow-y-auto text-sm text-left text-gray-500 table-fixed dark:text-gray-400' >
                                    <tbody>
                                        {this.state.searchTour == "" ? this.tourList() : this.searchTourList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    <Modal.Body className={"custom-modal-body-login p-0 mb-5"}>
                                        <EditTour classId={this.state.id} key={this.state.id} tourId={this.state.id} close={this.closeModalBox} />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
