import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import AdEditInquiry from './adInquiry-edit.component';

const Inquiry = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='w-10 px-6 py-4'>{props.inquiry.CusName}</td>
        <td className='px-6 py-4'>{props.inquiry.type}</td>
        <td className='px-6 py-4 '> <p className='h-16 overflow-y-auto'>{props.inquiry.description}</p></td>
        <td className='px-6 py-4'>{props.inquiry.contactNum}</td>
        <td className='px-6 py-4'>{props.inquiry.address}</td>
        <td className='px-6 py-4'>{props.inquiry.date.substring(0, 10)}</td>
        <td className='px-6 py-4'>{props.inquiry.status}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center p-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdateInquiry(props.inquiry._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                            </svg>
                        </div>
                    </button>
                </div>
                <div class="">
                    <button className='inline-flex items-center p-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deleteInquiry(props.inquiry._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class AdInquiryList extends Component {
    constructor(props) {
        super(props);
        this.deleteInquiry = this.deleteInquiry.bind(this);
        this.gotoUpdateInquiry = this.gotoUpdateInquiry.bind(this);
        this.state = {
            id: "",
            inquiry: [],
            searchInquiry: "",
            show: false
        };
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable() {
        axios.get('http://localhost:5000/api/inquiry/')
            .then(response => {
                this.setState({ inquiry: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoUpdateInquiry = (id) => {
        // alert("go to inquiry");
        this.setState({
            id: id,
            show: true
        })
        console.log("Inquiry id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshTable();
    }

    deleteInquiry(id) {
        axios.delete('http://localhost:5000/api/inquiry/' + id)
            .then(res => {
                console.log(res);
                alert("Inquiry Deleted Successfully");
            });

        this.setState({
            inquiry: this.state.inquiry.filter(el => el._id !== id)
        })
    }

    inquiryList() {
        return this.state.inquiry.map(currentinquiry => {
            return <Inquiry
                inquiry={currentinquiry}
                deleteInquiry={this.deleteInquiry}
                gotoUpdateInquiry={this.gotoUpdateInquiry}
                key={currentinquiry._id}
            />;
        })
    }


    searchInquiryList() {
        return this.state.inquiry.map((currentinquiry) => {
            if (
                // this.state.searchInquiry === currentinquiry.type
                this.state.searchInquiry === currentinquiry.type || currentinquiry.type.toLowerCase().includes(this.state.searchInquiry.toLowerCase())
            ) {
                return (
                    <tr className='text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='w-10 px-6 py-4 overflow-x-auto text-xl font-bold'>{currentinquiry.CusName}</td>
                        <td className='px-6 py-4'>{currentinquiry.category}</td>
                        <td className='px-6 py-4'>{currentinquiry.type}</td>
                        <td className='px-6 py-4 '> <p className='h-32 overflow-y-auto'>{currentinquiry.description}</p></td>
                        <td className='px-6 py-4'>{currentinquiry.contactNum}</td>
                        <td className='px-6 py-4'>{currentinquiry.address}</td>
                        <td className='px-6 py-4'>{currentinquiry.date.substring(0, 10)}</td>
                        <td className='px-6 py-4'>{currentinquiry.status}</td>
                        <td className='px-6 py-4'>
                            <div class="flex justify-center">
                                <div class="">
                                    {
                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdateInquiry(currentinquiry._id) }}>
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                            <div class="">
                                                Update
                                            </div>
                                        </button>
                                    }
                                </div>
                                {"  "}
                                <div class="">
                                    {
                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200'
                                            onClick={() => {
                                                //Delete the selected record
                                                axios
                                                    .delete(
                                                        "http://localhost:5000/api/inquiry/" + currentinquiry._id
                                                    )
                                                    .then(() => {
                                                        alert("Inquiry delete Success");
                                                        //Get data again after delete
                                                        axios
                                                            .get("http://localhost:5000/api/inquiry")
                                                            .then((res) => {
                                                                console.log(res.data);
                                                                this.setState({
                                                                    inquiry: res.data,
                                                                });
                                                            })
                                                            .catch((err) => console.log(err));
                                                    })
                                                    .catch((err) => {
                                                        alert(err);
                                                    });
                                            }}
                                        >
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <div class="">
                                                Delete
                                            </div>
                                        </button>
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                );
            }
        });
    }

    exportInquiry = () => {
        console.log("Exporting PDF")
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Inquiry List Report";
        const headers = [["Customer Name", "Type", "Description", "Contact Number", "Address", "Date", "Status"]];
        const inquiry = this.state.inquiry.map(
            Inquiry => [
                Inquiry.CusName,
                Inquiry.type,
                Inquiry.description,
                Inquiry.contactNum,
                Inquiry.address,
                Inquiry.date.substring(0, 10),
                Inquiry.status
            ]
        );
        let content = {
            startY: 50,
            head: headers,
            body: inquiry
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Inquiry-list.pdf")
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
                                                    <h3>Inquiries Catalogue</h3>
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
                                                <button class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportInquiry()}>
                                                    <div class="">
                                                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                        Download printable report
                                                    </div>
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Type"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchInquiry: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full h-full overflow-y-auto text-sm text-left text-gray-500 table-fixed dark:text-black' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Customer Name</th>
                                            <th className="p-2 tbhead">Type</th>
                                            <th className="p-2 tbhead">Description</th>
                                            <th className="p-2 tbhead">Contact Number</th>
                                            <th className="p-2 tbhead">Address</th>
                                            <th className="p-2 tbhead">Date</th>
                                            <th className="p-2 tbhead">Status</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.searchInquiry === "" ? this.inquiryList() : this.searchInquiryList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    <Modal.Body className={"custom-modal-body-login p-0 mb-5"}>
                                        <AdEditInquiry classId={this.state.id} key={this.state.id} inquiryId={this.state.id} close={this.closeModalBox} />
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