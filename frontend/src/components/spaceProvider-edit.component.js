import React, { Component } from 'react';
import axios from 'axios';
// import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class EditSpaceProvider extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeLangType = this.onChangeLangType.bind(this);
        this.onChangeTelNo = this.onChangeTelNo.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            id:props.guId,
            username: '',
            email: '',
            langType: '',
            telNo: '',
            address: '',
            nic: '',
            password: '',
            company: ''
        }
    }

    //mounting retrived data to text areas
    componentDidMount() {
        axios.get('http://localhost:5000/api/spaceProvider/' + this.state.id)
            .then(response => {
                console.log(this.props.ticketId);
                this.setState({
                    username: response.data.username,
                    email: response.data.email,
                    langType: response.data.langType,
                    telNo: response.data.telNo,
                    address: response.data.address,
                    password: response.data.password,
                    company: response.data.company,
                    nic: response.data.nic,
                })
            })
            .catch(function (error) {
                console.log("Error in mounting" + error);
            })
    }

   
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeLangType(e) {
        this.setState({
            langType: e.target.value
        });
    }
    onChangeTelNo(e) {
        this.setState({
            telNo: e.target.value
        });
    }
    onChangeAddress(e) {

        this.setState({
            address: e.target.value,
        });  

    }
    onChangeNIC(e) {
        this.setState({
            nic: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const spaceProvider = {
            username: this.state.username,
            email: this.state.email,
            langType: this.state.langType,
            telNo: this.state.telNo,
            address: this.state.address,
            password: this.state.password,
            company: this.state.company,
            nic: this.state.nic,
        }

        console.log(spaceProvider);
      
        axios.put('http://localhost:5000/api/spaceProvider/' + this.state.id, spaceProvider)
            .then(res => {
                console.log(res);
                // if (res.status === 200) {
                //     // this.refreshTable();
                //     this.props.close();
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Successful',
                //         text: 'SpaceProvider details has been updated!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#60e004'
                //     })

                // } else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Error',
                //         text: 'There was an error updating Your SpaceProvider!',
                //         background: '#fff',
                //         confirmButtonColor: '#133EFA',
                //         iconColor: '#e00404'
                //     })
                // }
            })
    }
    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <div className="formdiv">
                                        <form className=' rounded-lg' onSubmit={this.onSubmit}>
                                            <div class="">
                                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                    Update SpaceProvider Package Details
                                                </p>
                                                <div className="grid grid-cols-2 gap-4 form-group">

                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 '>SpaceProvider Name </label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control "
                                                            value={this.state.username}
                                                            onChange={this.onChangeUsername}
                                                        /><p />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 '>Email</label>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.email}
                                                            onChange={this.onChangeEmail}
                                                        /><p />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 ' >Mobile Naumber</label>
                                                        <div>
                                                            <input type="text"
                                                                placeholder=''
                                                                className="form-control"
                                                                value={this.state.telNo}
                                                                onChange={this.onChangeTelNo}
                                                            /><p />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 '>Address</label>
                                                        <input textarea="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.address}
                                                            onChange={this.onChangeAddress}
                                                        /><p />
                                                    </div>
                                               

                                                   
                                                </div><p />

                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 ' >NIC</label>
                                                        <div>
                                                            <input type="text"
                                                               
                                                                placeholder=''
                                                                className="form-control"
                                                                value={this.state.nic}
                                                                onChange={this.onChangeNIC}
                                                            /><p />
                                                        </div>
                                                    </div>
                                                    
                                               

                                                   
                                                </div><p />

                                                <div className="text-center align-middle form-group">
                                                    <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update" />
                                                </div>
                                            </div>
                                        </form>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}