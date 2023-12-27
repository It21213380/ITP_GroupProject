import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

import EditPayment from './payment-edit.component';


const Payment = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='w-10 px-2 py-2'>{props.payment?.nameOnCard}</td>
        <td className='px-2 py-2'>
            {props.payment?.service?.type}<br />{props.payment?.service?.id}
        </td>
        <td className='px-2 py-2 '> {props.payment?.paymentId}</td>
        <td className='px-2 py-2 '> {`${parseFloat(props.payment?.amount) / 100} ${props.payment?.currency?.toString().toUpperCase()}`}</td>
        <td className='px-2 py-2'>{props.payment?.streetAddress}</td>
        <td className='px-2 py-2'>{props.payment?.city}</td>
        <td className='px-2 py-2'>{props.payment?.state}</td>
        <td className='px-2 py-2'>{props.payment?.postalCode}</td>

        <td className='px-2 py-2'>
            <div className="flex justify-center">
                {/* <div className="">
                    <button className='inline-flex items-center p-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdatePayment(props.payment?._id) }}>
                        <i className='bi bi-pencil fs-4' />
                    </button>
                </div> */}
                <div className="">
                    <button className='inline-flex items-center p-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deletePayment(props.payment?._id) }}>
                        <i className='bi bi-trash fs-4 ' />
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class UserPaymentList extends Component {
    constructor(props) {
        super(props);
        this.deletePayment = this.deletePayment.bind(this);
        this.gotoUpdatePayment = this.gotoUpdatePayment.bind(this);
        this.state = {
            id: "",
            userSession: JSON.parse(localStorage.getItem("userSession")),
            payment: [],
            searchPayment: "",
            show: false
        };
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable() {
        axios.get('http://localhost:5000/api/payment/user/'+ this.state.userSession?._id)
            .then(response => {
                this.setState({ payment: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoUpdatePayment = (id) => {
        // alert("go to space");
        this.setState({
            id: id,
            show: true
        })
        console.log("Payment id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshTable();
    }

    deletePayment(id) {
        axios.delete('http://localhost:5000/api/payment/' + id)
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'The space has been removed!'
                })
            })
            .catch(e => {
                console.log('e', e)
                Swal.fire({
                    icon: 'danger',
                    title: 'Delete failed'
                })
            })

        this.setState({
            payment: this.state.payment.filter(el => el._id !== id)
        })
    }

    userPaymentList() {
        return this.state.payment.map(currentpayment => {
            return <Payment
                payment={currentpayment}
                deletePayment={this.deletePayment}
                gotoUpdatePayment={this.gotoUpdatePayment}
                key={currentpayment._id}
            />;
        })
    }

    searchUserPaymentList() {
        const searchedPayment = this.state.payment.filter(payment =>
            payment.amount.toString().toLowerCase().includes(this.state.searchPayment.toLowerCase()) ||
            payment.city.toLowerCase().includes(this.state.searchPayment.toLowerCase()) ||
            payment.state.toLowerCase().includes(this.state.searchPayment.toLowerCase()) ||
            payment.postalCode.toLowerCase().includes(this.state.searchPayment.toLowerCase()) ||
            payment.streetAddress.toLowerCase().includes(this.state.searchPayment.toLowerCase())
        )

        return searchedPayment.map(currentpayment => {
            return <Payment
                payment={currentpayment}
                deletePayment={this.deletePayment}
                gotoUpdatePayment={this.gotoUpdatePayment}
                key={currentpayment._id}
            />;
        })
    }

    exportPayment = () => {
        console.log("Exporting PDF")
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Payment List Report";
        const headers = [["Name", "Service", "Payment ID", "Amount", "Street Address", "City", "State", "Postal Code"]];
        const payment = this.state.payment.map(
            Payment => [
                Payment.nameOnCard,
                Payment.service.type + " " + Payment.service.id,
                Payment.paymentId,
                Payment.amount,
                Payment.streetAddress,
                Payment.city,
                Payment.state,
                Payment.postalCode,
            ]
        );
        let content = {
            startY: 50,
            head: headers,
            body: payment
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Payment-list.pdf")
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className="grid grid-cols-1 gap-4 content-start">
                                <table>
                                    <tr>
                                        <th className='drop-shadow-md'>
                                            <h3>My Payments.</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div className="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                {/* <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" /> */}
                                                {/* <Link className='font-semibold text-white no-underline' to={"/createPayment"}>
                                                    <div className="flex">
                                                        <div className="">
                                                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                            </svg>
                                                        </div>
                                                        <div className="">
                                                            Create a new Payment
                                                        </div>
                                                    </div>
                                                </Link> */}
                                                <button
                                                    className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                    onClick={() => this.exportPayment()}
                                                >
                                                    <div className="">
                                                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>
                                                    </div>
                                                    <div className="">
                                                        Download printable report
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Type"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchPayment: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className=' h-full overflow-y-auto text-sm text-left text-gray-500 table-fixed dark:text-black' >
                                    <thead className='p-5 text-xs text-light uppercase border bg-gray-50 dark:bg-gray-700 '>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Card holder Name</th>
                                            <th className="p-2 tbhead">Service</th>
                                            <th className="p-2 tbhead">Payment Id</th>
                                            <th className="p-2 tbhead">Amount</th>
                                            <th className="p-2 tbhead">Street address</th>
                                            <th className="p-2 tbhead">City</th>
                                            <th className="p-2 tbhead">State</th>
                                            <th className="p-2 tbhead">Postal code</th>
                                            <th className="p-2 tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.searchPayment === "" ? this.userPaymentList() : this.searchUserPaymentList()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    <Modal.Body className={"custom-modal-body-login p-0 mb-5"}>
                                        <EditPayment classId={this.state.id} key={this.state.id} spaceId={this.state.id} close={this.closeModalBox} />
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