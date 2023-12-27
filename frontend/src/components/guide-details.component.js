import React, { Component } from 'react';
import axios from 'axios';
import 'jspdf-autotable';
import "react-datepicker/dist/react-datepicker.css"
// import EditEmployee  from './employee-edit.component';
// import ScheduleRequestDetails from './scheduleRequest-details.component';

const GuidePack = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        {/* <td>{props.employee._id}</td> */}
        <td className='px-6 py-4'>{props.guidepack.guideName}</td>
        <td className='px-6 py-4'>{props.guidepack.touristArea}</td>
        <td className='px-6 py-4'>{props.guidepack.langType}</td>
        <td className='px-6 py-4'>{props.guidepack.vehicleType}</td>
        <td className='px-6 py-4'>{props.guidepack.price}</td>
    </tr>
)

const Guide = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        {/* <td>{props.employee._id}</td> */}
        <td className='px-6 py-4'>{props.guide.guideName}</td>
        <td className='px-6 py-4'>{props.guide.email}</td>
        <td className='px-6 py-4'>{props.guide.langType}</td>
        <td className='px-6 py-4'>{props.guide.serviceType}</td>
        <td className='px-6 py-4'>{props.guide.mobileNumber}</td>
        <td className='px-6 py-4'>{props.guide.address}</td>
        <td className='px-6 py-4'>{props.guide.nic}</td>
    </tr>
)

export class GuidePackDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guidepack: [],
            guide: [],
            searchGuidePack: props.guId,
            show: false
        };
    }

    componentDidMount() {
        this.refreshGuideDetails();
        this.refreshList();
    }

    refreshGuideDetails() {
        axios.get('http://localhost:5000/api/guide/')
            .then(response => {
                this.setState({ guide: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    refreshList() {
        axios.get('http://localhost:5000/api/guidepackage/')
            .then(response => {
                this.setState({ guidepack: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    guideList() {
        return this.state.guide.map(currentguide => {
            return <Guide guide={currentguide} key={currentguide._id} />;
        })
    }

    guidePackList() {
        return this.state.guidepack.map(currentguidepack => {
            return <GuidePack guidepack={currentguidepack} key={currentguidepack._id} />;
        })
    }

    searchGuideList() {
        return this.state.guide.map((currentguide) => {
            if (
                this.state.searchGuidePack === currentguide.guideName
            ) {
                return (
                    <div class="">
                        <div class="col-span-4 block p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-70">
                            <h5 class="mb-2 text-4xl  tracking-tight text-teal-900 ">{currentguide.guideName}</h5>
                            <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">email : {currentguide.email}</p>
                            <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">Service Type : {currentguide.serviceType}</p>
                            <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">Language Type : {currentguide.langType}</p>
                            <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">NIC : {currentguide.nic}</p>
                            <div class="grid grid-cols-2 gap-4 justify-between">
                                <div class="">
                                    <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">Address : {currentguide.address}</p>
                                </div>
                                <div class="">
                                    <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">Contact Number : {currentguide.mobileNumber}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-black rounded-full mt-3 h-1">
                            <br />
                        </div>
                    </div>
                );
            }
        });
    }

    searchGuidePackList() {
        return this.state.guidepack.map((currentguidepack) => {
            if (
                this.state.searchGuidePack === currentguidepack.guideName
            ) {
                return (
                    <div className='mt-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <div class="">
                            <div class="col-span-4 block p-10 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-70">
                                <div class="grid grid-cols-2 gap-4 justify-between">
                                    <div class="">
                                        <h5 class="mb-2 text-4xl  tracking-tight text-teal-900 ">{currentguidepack.touristArea}</h5>
                                    </div>
                                    <div class="">
                                        <p class="text-red-600 uppercase font-semibold ml-44 mb-2 text-2xl  tracking-tight ">{currentguidepack.price} per person</p>
                                    </div>
                                </div>
                                <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">Mode Of Transport: {currentguidepack.vehicleType}</p>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <div>
                                    {this.state.searchGuidePack === "" ? this.guideList() : this.searchGuideList()}
                                </div>
                                <div class="">
                                    {this.state.searchGuidePack === "" ? this.guidePackList() : this.searchGuidePackList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

