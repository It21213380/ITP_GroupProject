import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditGuidePackage from './guidePackAdmin-edit.component';


const GuidePack = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        {/* <td>{props.employee._id}</td> */}
        <td className='px-6 py-4'>{props.guidepack.guideName}</td>
        <td className='px-6 py-4'>{props.guidepack.touristArea}</td>
        <td className='px-6 py-4'>{props.guidepack.langType}</td>
        <td className='px-6 py-4'>{props.guidepack.vehicleType}</td>
        <td className='px-6 py-4'>{props.guidepack.price}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdateGuidePack(props.guidepack._id) }}>

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
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deleteGuidePack(props.guidepack._id) }}>
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

export class GuidePackAdminList extends Component {

    constructor(props) {
        super(props);

        this.deleteGuidePack = this.deleteGuidePack.bind(this);
        this.gotoUpdateGuidePack = this.gotoUpdateGuidePack.bind(this);

        this.state = {
            guidepack: [],
            searchGuidePack: "",
            show: false
        };
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


    componentDidMount() {
        this.refreshList();
    }

    gotoUpdateGuidePack = (id) => {
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

    deleteGuidePack(id) {

        axios.delete('http://localhost:5000/api/guidepackage/' + id).then(response => {
            console.log(response.status)

            // if (response.status == 200) {
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Successful',
            //         text: "Guide Pack has been deleted!!",
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
            //         text: "Guide Pack has not been deleted!!",
            //         background: '#fff',
            //         confirmButtonColor: '#eb220c',
            //         iconColor: '#60e004'
            //     })
            // }


        })


    }

    guidePackList() {
        return this.state.guidepack.map(currentguidepack => {
            return <GuidePack guidepack={currentguidepack} deleteGuidePack={this.deleteGuidePack} gotoUpdateGuidePack={this.gotoUpdateGuidePack} key={currentguidepack._id} />;
        })
    }

    searchGuidePackList() {
        return this.state.guidepack.map((currentguidepack) => {
            if (
                this.state.searchGuidePack ==
                currentguidepack.guideName
            ) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='px-6 py-4'>{currentguidepack.guideName}</td>
                        <td className='px-6 py-4'>{currentguidepack.touristArea}</td>
                        <td className='px-6 py-4'>{currentguidepack.langType}</td>
                        <td className='px-6 py-4'>{currentguidepack.vehicleType}</td>
                        <td className='px-6 py-4'>{currentguidepack.price}</td>
                        <td className='flex justify-center px-6 py-4 '>
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdateGuidePack(currentguidepack._id) }}>
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
                                            this.deleteGuidePack(currentguidepack._id);
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


    exportGuidePacks = () => {
        console.log("Export PDF")


        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Guide Pack List Report ";
        const headers = [["Guide Name", "Tourist Area", "Language Type", "Vehicle Type", "Price"]];

        const gud = this.state.guidepack.map(
            GuidePack => [
                GuidePack.guideName,
                GuidePack.touristArea,
                GuidePack.langType,
                GuidePack.vehicleType,
                GuidePack.price
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: gud
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("GuidePack-list.pdf")
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
                                                <h3>Guide Pack Details</h3>
                                            </div>
                                            <div class="">
                                                <span
                                                    class="ml-1 inline-block whitespace-nowrap rounded-2xl bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700 bg-green-400">
                                                    Admin
                                                </span>
                                            </div>
                                        </div>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/createGuidePack"}>
                                                        Add Guide Pack
                                                    </Link></button>
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportGuidePacks()}>

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
                                                            searchGuidePack: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Guide Name</th>
                                            <th className="p-2 tbhead">Tourist Area</th>
                                            <th className="p-2 tbhead">Language Type</th>
                                            <th className="p-2 tbhead">vehicle Type</th>
                                            <th className="p-2 tbhead">price</th>

                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchGuidePack == "" ? this.guidePackList() : this.searchGuidePackList()}
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
                                        <EditGuidePackage guId={this.state.id} key={this.state.id} close={this.closeModalBox} />
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

