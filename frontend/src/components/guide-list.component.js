import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditGuide from './guide-edit.component';


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
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdateGuide(props.guide._id) }}>

                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                            <div class="">
                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                </svg>
                            </div>
                            <div class="">
                                Edit
                            </div>
                        </div>

                    </button>
                </div>
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deleteGuide(props.guide._id) }}>
                        <div class="grid grid-cols-2 gap-1 hover:text-black">
                            <div class="">
                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class GuideList extends Component {

    constructor(props) {
        super(props);

        this.deleteGuide = this.deleteGuide.bind(this);
        this.gotoUpdateGuide = this.gotoUpdateGuide.bind(this);

        this.state = {
            guide: [],
            searchGuide: "",
            show: false
        };
    }

    refreshList() {
        axios.get('http://localhost:5000/api/guide/')
            .then(response => {
                this.setState({ guide: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    componentDidMount() {
        this.refreshList();
    }

    gotoUpdateGuide = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("LIst id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }

    // deleteEmployee(id) {
    //     axios.delete('http://localhost:5000/employee/' + id)
    //         .then(res => console.log(res.data));
    //     this.setState({
    //         employee: this.state.employee.filter(el => el._id !== id)
    //     })
    // }

    deleteGuide(id) {

        axios.delete('http://localhost:5000/api/guide/' + id).then(response => {
            console.log(response.status)
            // this.refreshTable();

            // if (response.status == 200) {
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Successful',
            //         text: "Guide has been deleted!!",
            //         background: '#fff',
            //         confirmButtonColor: '#0a5bf2',
            //         iconColor: '#60e004'
            //     })

            //     this.refreshList();
            // }

            // else {
            //     Swal.fire({
            //         icon: 'Unsuccess',
            //         title: 'Unsuccessfull',
            //         text: "Guide has not been deleted!!",
            //         background: '#fff',
            //         confirmButtonColor: '#eb220c',
            //         iconColor: '#60e004'
            //     })
            // }


        })


    }

    guideList() {
        return this.state.guide.map(currentguide => {
            return <Guide guide={currentguide} deleteGuide={this.deleteGuide} gotoUpdateGuide={this.gotoUpdateGuide} key={currentguide._id} />;
        })
    }

    searchGuideList() {
        return this.state.guide.map((currentguide) => {
            if (
                this.state.searchGuide ==
                currentguide.guideName
            ) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='px-6 py-4'>{currentguide.guideName}</td>
                        <td className='px-6 py-4'>{currentguide.email}</td>
                        <td className='px-6 py-4'>{currentguide.langType}</td>
                        <td className='px-6 py-4'>{currentguide.serviceType}</td>
                        <td className='px-6 py-4'>{currentguide.mobileNumber}</td>
                        <td className='px-6 py-4'>{currentguide.address}</td>
                        <td className='px-6 py-4'>{currentguide.nic}</td>
                        <td className='flex justify-center px-6 py-4 '>
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdateGuide(currentguide._id) }}>

                                        <div class=" grid grid-cols-2 gap-1">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                            <div class="">
                                                Edit
                                            </div>
                                        </div>

                                    </button>
                                </div>
                            }
                            {"  "}
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-200'
                                        onClick={() => {
                                            //Delete the selected record
                                            this.deleteGuide(currentguide._id);
                                        }}>
                                        <div class=" grid grid-cols-2 gap-1">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <div class="">
                                                Delete
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            }
                        </td>
                    </tr>
                );
            }
        });
    }


    exportGuide = () => {
        console.log("Export PDF")


        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Guide List Report ";
        const headers = [["Guide Name", "Email", "Language Type", "Service Type", "Mobile Numaber", "Address", "NIC"]];

        const emp = this.state.guide.map(
            Guide => [
                Guide.guideName,
                Guide.email,
                Guide.langType,
                Guide.serviceType,
                Guide.mobileNumber,
                Guide.address,
                Guide.nic
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: emp
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Guide-list.pdf")
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className=''>
                                    <tr>

                                        <div class="flex">
                                            <div class="">
                                                <h3>Guide Details</h3>
                                            </div>
                                            <div class="">
                                                <span
                                                    class="ml-1 inline-block whitespace-nowrap rounded-2xl bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700 bg-green-400">
                                                    Guide
                                                </span>
                                            </div>
                                        </div>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/createGuide"}>
                                                        Add Guide
                                                    </Link></button>
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportGuide()}>

                                                    Download Report Here
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Guide Name"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchGuide: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-black' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Guide Name</th>
                                            <th className="p-2 tbhead">Email</th>
                                            <th className="p-2 tbhead">Language Type</th>
                                            <th className="p-2 tbhead">Service Type</th>
                                            <th className="p-2 tbhead">Mobile Number</th>
                                            <th className="p-2 tbhead">Address</th>
                                            <th className="p-2 tbhead">NIC</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchGuide == "" ? this.guideList() : this.searchGuideList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    {/* <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                            <Modal.Title className='items-center' >
                                               
                                            </Modal.Title>
                                        </div>
                                    </Modal.Header > */}
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <EditGuide guId={this.state.id} key={this.state.id} close={this.closeModalBox} />
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

