import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditCusTicket from "./custicket-edit.component";

const Ticket = props => (
    <div class="grid grid-cols-4 gap-2">
        <div class="col-span-3">
            <div class=" p-3 max-w-sm w-full lg:max-w-full lg:flex">
                <div class=" border-b-2 border-t-2 border-x-black border-l-2  h-48 lg:h-auto lg:w-48 flex-none bg-cover lg:rounded-t-none lg:rounded-l bg-gradient-to-r from-blue-400 text-center overflow-hidden" title="Woman holding a mug">
                </div>
                <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div class="">
                        <div class="text-gray-900 font-bold text-3xl "> {props.ticket.firstName} {props.ticket.lastName}</div>

                        <p class="text-sm text-gray-600 flex items-center">
                            Premium Airline only
                        </p>
                        <p class="text-gray-900 text-xl ">Passport ID : {props.ticket.passportID}</p>

                        <div class="text-gray-900 text-xl  flex">
                            <div class="flex">
                                From : <p className='ml-2 text-lg font-bold'>Sri Lanka</p>
                            </div>
                            <div class="ml-5 flex">
                                To : <p className='ml-2 text-lg font-bold'>{props.ticket.toLocation}</p>
                            </div>
                        </div>
                    </div>
                    <div class=" items-center">
                        <div class="text-base ">
                            <p class="text-gray-600 text-xl flex"> Flight Date: <p className='ml-2 text-lg font-bold'>{props.ticket.bookingDate.substring(0, 10)}</p> </p>

                            <p class="flex text-gray-900  text-xl"> Mobile Number:  <p className='ml-2 text-lg font-bold'>{props.ticket.phoneNumber}</p></p>

                        </div>
                        <div class="text-gray-900 font-thin text-base">
                            Thank you for choosing to fly with us. We're excited to have you on board and look forward to providing you with a comfortable and enjoyable flight experience. Our airline is committed to ensuring your safety and comfort throughout your journey. Please take a moment to review the information on this ticket, including your flight details, departure and arrival times, and baggage allowance.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-1 ...">
            <div class="flex justify-center m-44">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdateTicket(props.ticket._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                            </svg>
                        </div>
                        <div class="">
                            Update
                        </div>
                    </button>
                </div>
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
        </div>
    </div >
)

export class CusTicketList extends Component {
    constructor(props) {
        super(props);
        this.deleteTicket = this.deleteTicket.bind(this);
        this.gotoUpdateTicket = this.gotoUpdateTicket.bind(this);
        this.state = {
            id: "",
            ticket: [],
            searchTicket: "",
            show: false
        };
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable() {
        axios.get('http://localhost:5000/api/ticket/')
            .then(response => {
                this.setState({ ticket: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoUpdateTicket = (id) => {
        // alert("go to Ticket");
        this.setState({
            id: id,
            show: true
        })
        console.log("Ticket id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshTable();
    }

    deleteTicket(id) {
        axios.delete('http://localhost:5000/api/ticket/' + id)
            .then(res => {
                console.log(res);
                alert("Ticket Deleted");
            });
        this.setState({
            ticket: this.state.ticket.filter(el => el._id !== id)
        })
    }

    ticketList() {
        return this.state.ticket.map(currentticket => {
            return <Ticket
                ticket={currentticket}
                deleteTicket={this.deleteTicket}
                gotoUpdateTicket={this.gotoUpdateTicket}
                key={currentticket._id}
            />;
        })
    }

    searchTicketList() {
        return this.state.ticket.map((currentticket) => {
            if (
                this.state.searchTicket == currentticket.passportID
            ) {
                return (

                    <div class="grid grid-cols-4 gap-2">
                        <div class="col-span-3">
                            <div class=" p-3 max-w-sm w-full lg:max-w-full lg:flex">
                                <div class=" border-b-2 border-t-2 border-x-black border-l-2  h-48 lg:h-auto lg:w-48 flex-none bg-cover lg:rounded-t-none lg:rounded-l bg-gradient-to-r from-blue-400 text-center overflow-hidden" title="Woman holding a mug">
                                </div>
                                <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                    <div class="">
                                        <div class="text-gray-900 font-bold text-3xl "> {currentticket.firstName} {currentticket.lastName}</div>

                                        <p class="text-sm text-gray-600 flex items-center">
                                            Premium Airline only
                                        </p>
                                        <p class="text-gray-900 text-xl ">Passport ID : {currentticket.passportID}</p>

                                        <div class="text-gray-900 text-xl  flex">
                                            <div class="flex">
                                                From : <p className='ml-2 text-lg font-bold'>Sri Lanka</p>
                                            </div>
                                            <div class="ml-5 flex">
                                                To : <p className='ml-2 text-lg font-bold'>{currentticket.toLocation}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" items-center">
                                        <div class="text-base ">
                                            <p class="text-gray-600 text-xl flex"> Flight Date: <p className='ml-2 text-lg font-bold'>{currentticket.bookingDate.substring(0, 10)}</p> </p>

                                            <p class="flex text-gray-900  text-xl"> Mobile Number:  <p className='ml-2 text-lg font-bold'>{currentticket.phoneNumber}</p></p>

                                        </div>
                                        <div class="text-gray-900 font-thin text-base">
                                            Thank you for choosing to fly with us. We're excited to have you on board and look forward to providing you with a comfortable and enjoyable flight experience. Our airline is committed to ensuring your safety and comfort throughout your journey. Please take a moment to review the information on this ticket, including your flight details, departure and arrival times, and baggage allowance.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-1 ...">
                            <div class="flex justify-center m-44">
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdateTicket(currentticket._id) }}>
                                        <div class="">
                                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg>
                                        </div>
                                        <div class="">
                                            Update
                                        </div>
                                    </button>
                                </div>
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200'
                                        onClick={() => {
                                            //Delete the selected record
                                            axios
                                                .delete(
                                                    "http://localhost:5000/api/ticket/" + currentticket._id
                                                )
                                                .then(() => {
                                                    alert("Ticket Remove Success");
                                                    //Get data again after delete
                                                    axios
                                                        .get("http://localhost:5000/api/ticket")
                                                        .then((res) => {
                                                            console.log(res.data);
                                                            this.setState({
                                                                ticket: res.data,
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
                                </div>
                            </div>
                        </div>
                    </div >

                    // <tr className='text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    //     <td className='w-10 px-6 py-4 overflow-x-auto text-xl font-bold'>{currentticket.firstName}</td>
                    //     <td className='px-6 py-4'>{currentticket.lastName}</td>
                    //     <td className='px-6 py-4'>{currentticket.passportID}</td>
                    //     <td className='px-6 py-4'>{currentticket.phoneNumber}</td>
                    //     <td className='px-6 py-4'>{currentticket.bookingDate.substring(0, 10)}</td>
                    //     <td className='px-6 py-4'>{currentticket.toLocation}</td>
                    //     <td className='px-6 py-4'>{currentticket.price}</td>
                    //     <td className='px-6 py-4'>
                    //         <div class="flex justify-center">
                    //             <div class="">
                    //                 {
                    //                     <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdateTicket(currentticket._id) }}>
                    //                         <div class="">
                    //                             <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //                                 <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                    //                             </svg>
                    //                         </div>
                    //                         <div class="">
                    //                             Update
                    //                         </div>
                    //                     </button>
                    //                 }
                    //             </div>
                    //             {"  "}
                    //             <div class="">
                    //                 {
                    //                     <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200'
                    //                         onClick={() => {
                    //                             //Delete the selected record
                    //                             axios
                    //                                 .delete(
                    //                                     "http://localhost:5000/api/ticket/" + currentticket._id
                    //                                 )
                    //                                 .then(() => {
                    //                                     alert("Ticket Remove Success");
                    //                                     //Get data again after delete
                    //                                     axios
                    //                                         .get("http://localhost:5000/api/ticket")
                    //                                         .then((res) => {
                    //                                             console.log(res.data);
                    //                                             this.setState({
                    //                                                 ticket: res.data,
                    //                                             });
                    //                                         })
                    //                                         .catch((err) => console.log(err));
                    //                                 })
                    //                                 .catch((err) => {
                    //                                     alert(err);
                    //                                 });
                    //                         }}
                    //                     >
                    //                         <div class="">
                    //                             <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    //                             </svg>
                    //                         </div>
                    //                         <div class="">
                    //                             Remove
                    //                         </div>
                    //                     </button>
                    //                 }
                    //             </div>
                    //         </div>
                    //     </td>
                    // </tr>

                );
            }
        });
    }

    exportTicket = () => {
        console.log("Exporting Ticket PDF")
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Ticket List Details";
        const headers = [["First Name", "Last Name", "Passport ID", "Phone Number", "Booking Date", "Flight To", "Price"]];
        const ticket = this.state.ticket.map(
            Ticket => [
                Ticket.firstName,
                Ticket.lastName,
                Ticket.passportID,
                Ticket.phoneNumber,
                Ticket.bookingDate.substring(0, 10),
                Ticket.toLocation,
                Ticket.price,
            ]
        );
        let content = {
            startY: 50,
            head: headers,
            body: ticket
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Ticket-Details.pdf")
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
                                            <div class="">
                                                <h3>My Tickets</h3>
                                            </div>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/createCustomerTicket"}>
                                                        <div class="flex">
                                                            <div class="">
                                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                                </svg>
                                                            </div>
                                                            <div class="">
                                                                Book a Ticket
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </button>
                                                <button class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportTicket()}>
                                                    <div class="">
                                                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                        Download PDF
                                                    </div>
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Passport ID"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchTicket: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                {/* <table className='w-full h-full overflow-y-auto text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">First Name</th>
                                            <th className="p-2 tbhead">Last Name</th>
                                            <th className="p-2 tbhead">Passport ID</th>
                                            <th className="p-2 tbhead">Phone Number</th>
                                            <th className="p-2 tbhead">Booking Date</th>
                                            <th className="p-2 tbhead">To Location</th>
                                            <th className="p-2 tbhead">Price</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.searchTicket == "" ? this.ticketList() : this.searchTicketList()}
                                    </tbody>
                                </table> */}
                                <tbody>
                                    {this.state.searchTicket == "" ? this.ticketList() : this.searchTicketList()}
                                </tbody>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    <Modal.Body className={"custom-modal-body-login p-0 mb-5"}>
                                        <EditCusTicket classId={this.state.id} key={this.state.id} ticketId={this.state.id} close={this.closeModalBox} />
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
