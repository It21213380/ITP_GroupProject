import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/*
    name,
    fromLocation,
    toLocation,
    description,
    transportMode,
    price,
    date,
*/

const Tour = props => (
    <tr className='text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='w-10 px-6 py-4 overflow-x-auto text-xl font-bold'>{props.tour.name}</td>
        <td className='px-6 py-4'>{props.tour.fromLocation}</td>
        <td className='px-6 py-4'>{props.tour.toLocation}</td>
        <td className='px-6 py-4 '><p className='h-40 overflow-y-auto break-normal'>{props.tour.description}</p></td>
        <td className='px-6 py-4'>{props.tour.transportMode}</td>
        <td className='px-6 py-4'>{props.tour.price}</td>
        <td className='px-6 py-4'>{props.tour.date.substring(0, 10)}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deleteTicket(props.ticket._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div class="">
                            Delete
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class TourList extends Component {
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

    // //Modal box
    // closeModalBox = () => {
    //     this.setState({ show: false })
    //     this.refreshTable();
    // }

    deleteTour(id) {
        axios.delete('http://localhost:5000/api/tour/' + id)
            .then(res => {
                console.log(res);
                alert("Deleted");
            });

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
        return this.state.tour.map((currenttour) => {
            if (
                this.state.searchTour == currenttour.toLocation
            ) {
                return (
                    <tr className='text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='w-10 px-6 py-4 overflow-x-auto text-xl font-bold'>{currenttour.name}</td>
                        <td className='px-6 py-4'>{currenttour.fromLocation}</td>
                        <td className='px-6 py-4'>{currenttour.toLocation}</td>
                        <td className='px-6 py-4 '><p className='h-40 overflow-y-auto break-normal'>{currenttour.description}</p></td>
                        <td className='px-6 py-4'>{currenttour.transportMode}</td>
                        <td className='px-6 py-4'>{currenttour.price}</td>
                        <td className='px-6 py-4'>{currenttour.date.substring(0, 10)}</td>
                        <td className='px-6 py-4'>
                            <div class="flex justify-center">
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200'
                                        onClick={() => {
                                            //Delete the selected record
                                            axios
                                                .delete(
                                                    "http://localhost:5000/api/tour/" + currenttour._id
                                                )
                                                .then(() => {
                                                    alert("Tour Package delete Success");
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
                                        }}                        >
                                        <div class="">
                                            <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                        <div class="">
                                            Delete
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                );
            }
        });
    }

    exportTour = () => {
        console.log("Exporting Tour packages PDF")
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Tour Packages List Details";
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
            body: tour
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("TourPackages-Details.pdf")
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
                                            <div class="flex">
                                                <div class="">
                                                    <h3>Tour Packages</h3>
                                                </div>
                                                <div class="">
                                                    <span
                                                        class="ml-1 inline-block whitespace-nowrap rounded-2xl bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700 bg-green-400">
                                                        Admin
                                                    </span>
                                                </div>
                                            </div>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportTour()}>
                                                    <div class="">
                                                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                        Download Report
                                                    </div>
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by To location"
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
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Tour Name</th>
                                            <th className="p-2 tbhead">Starting From</th>
                                            <th className="p-2 tbhead">Destination</th>
                                            <th className="p-2 tbhead">Description</th>
                                            <th className="p-2 tbhead">Mode of transport</th>
                                            <th className="p-2 tbhead">Price (Rs: )</th>
                                            <th className="p-2 tbhead">Date</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.searchTour == "" ? this.tourList() : this.searchTourList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
