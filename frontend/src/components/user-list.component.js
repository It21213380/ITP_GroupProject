import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditUser from './user-edit.component';


const User = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='px-6 py-4'>{props.user.firstName}</td>
        <td className='px-6 py-4'>{props.user.lastName}</td>
        <td className='px-6 py-4'>{props.user.nic}</td>
        <td className='px-6 py-4'>{props.user.dob}</td>
        <td className='px-6 py-4'>{props.user.email}</td>
        <td className='px-6 py-4'>{props.user.langType}</td>
        <td className='px-6 py-4'>{props.user.telNo}</td>
        <td className='px-6 py-4'>
            <div className="flex justify-center">
                <div className="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdateUser(props.user._id) }}>

                        <div className=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                            <div className="">
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                </svg>
                            </div>
                        </div>

                    </button>
                </div>
                <div className="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deleteUser(props.user._id) }}>
                        <div className="grid grid-cols-2 gap-1 hover:text-black">
                            <div className="">
                                <svg className="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class UserList extends Component {

    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this);
        this.gotoUpdateUser = this.gotoUpdateUser.bind(this);

        this.state = {
            user: [],
            searchUser: "",
            show: false
        };
    }

    refreshList() {
        axios.get('http://localhost:5000/api/user/')
            .then(response => {
                this.setState({ user: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    componentDidMount() {
        this.refreshList();
    }

    gotoUpdateUser = (id) => {
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

    deleteUser(id) {

        axios.delete('http://localhost:5000/api/user/' + id).then(response => {
            console.log(response.status)
            // this.refreshTable();

            // if (response.status == 200) {
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Successful',
            //         text: "User has been deleted!!",
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
            //         text: "User has not been deleted!!",
            //         background: '#fff',
            //         confirmButtonColor: '#eb220c',
            //         iconColor: '#60e004'
            //     })
            // }


        })


    }

    userList() {
        return this.state.user.map(currentuser => {
            return <User user={currentuser} deleteUser={this.deleteUser} gotoUpdateUser={this.gotoUpdateUser} key={currentuser._id} />;
        })
    }

    searchUserList() {
        return this.state.user.map((currentuser) => {
            if (
                // this.state.searchUser == currentuser.username
                this.state.searchUser === currentuser.firstName || currentuser.firstName.toLowerCase().includes(this.state.searchUser.toLowerCase()) ||
                this.state.searchUser === currentuser.lastName || currentuser.lastName.toLowerCase().includes(this.state.searchUser.toLowerCase())

            ) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='px-6 py-4'>{currentuser.firstName}</td>
                        <td className='px-6 py-4'>{currentuser.lastName}</td>
                        <td className='px-6 py-4'>{currentuser.nic}</td>
                        <td className='px-6 py-4'>{currentuser.email}</td>
                        <td className='px-6 py-4'>{currentuser.langType}</td>
                        <td className='px-6 py-4'>{currentuser.telNo}</td>
                        <td className='flex justify-center px-6 py-4 '>
                            {
                                <div className="">
                                    <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdateUser(currentuser._id) }}>

                                        <div className=" grid grid-cols-2 gap-1">
                                            <div className="">
                                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                        </div>

                                    </button>
                                </div>
                            }
                            {"  "}
                            {
                                <div className="">
                                    <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-200'
                                        onClick={() => {
                                            //Delete the selected record
                                            this.deleteUser(currentuser._id);
                                        }}>
                                        <div className=" grid grid-cols-2 gap-1">
                                            <div className="">
                                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
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


    exportUser = () => {
        console.log("Export PDF")


        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "User List Report ";
        const headers = [["First name", "Last name", "NIC", "Email", "Languages", "Mobile number"]];

        const emp = this.state.user.map(
            User => [
                User.firstName,
                User.lastName,
                User.nic,
                User.email,
                User.langType,
                User.telNo
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
        doc.save("User-list.pdf")
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className="grid grid-cols-1 gap-4 content-start">
                                <table className=''>
                                    <tr>

                                        <div className="flex">
                                            <div className="">
                                                <h3>User Details</h3>
                                            </div>
                                            <div className="">
                                                <span
                                                    className="ml-1 inline-block whitespace-nowrap rounded-2xl bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700 bg-green-400">
                                                    User
                                                </span>
                                            </div>
                                        </div>
                                        <td className='flex justify-end gap-2'>
                                            <div className="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/createUser"}>
                                                        Add User
                                                    </Link></button>
                                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportUser()}>

                                                    Download Report Here
                                                </button>
                                            </div>
                                            <div className="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by User Name"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchUser: e.target.value
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
                                            <th className="p-2 border-black tbhead ">First Name</th>
                                            <th className="p-2 tbhead">Last Name</th>
                                            <th className="p-2 tbhead">NIC</th>
                                            <th className="p-2 tbhead"></th>
                                            <th className="p-2 tbhead">Email</th>
                                            <th className="p-2 tbhead">Language(s)</th>
                                            <th className="p-2 tbhead">Mobile</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchUser == "" ? this.userList() : this.searchUserList()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <EditUser guId={this.state.id} key={this.state.id} close={this.closeModalBox} />
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

