import React, { Component } from 'react';
import axios from 'axios';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import { GuidePackDetails } from './guide-details.component';

const GuidePack = props => (
    <div class=" grid grid-cols-6 gap-4 my-2 " onClick={() => { props.gotoGuidePackDetails(props.guidepack.guideName) }}>
        <div class="">
        </div>
        <div class="col-span-4 block p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-70">
            <h5 class="mb-2 text-3xl  tracking-tight text-gray-900 ">Guided By {props.guidepack.guideName}</h5>
            <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">Area : {props.guidepack.touristArea}</p>
            <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">Language Type : {props.guidepack.langType}</p>
            <div class="grid grid-cols-2 gap-4 justify-between">
                <div class="">
                    <p class="mb-2 text-2xl  tracking-tight text-gray-900 ">Mode Of Transport : {props.guidepack.vehicleType}</p>
                </div>
                <div class=""><br />
                    <p class="text-red-600 uppercase font-semibold  mb-2 text-2xl  tracking-tight ">{props.guidepack.price} LKR Per person</p>
                </div>
            </div>
        </div>
        <div class="">
        </div>
    </div>
)

export class GuidePackList extends Component {

    constructor(props) {
        super(props);


        this.gotoGuidePackDetails = this.gotoGuidePackDetails.bind(this);

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

    gotoGuidePackDetails = (guideName) => {
        this.setState({
            guideName: guideName,
            show: true

        })
        console.log("LIst id is :" + guideName);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }

    guidePackList() {
        return this.state.guidepack.map(currentguidepack => {
            return <GuidePack guidepack={currentguidepack} gotoGuidePackDetails={this.gotoGuidePackDetails} key={currentguidepack.guideName} />;
        })
    }

    // searchGuidePackList() {
    //     return this.state.guidepack.map((currentguidepack) => {
    //         if (
    //             this.state.searchGuidePack === currentguidepack.touristArea
    //         ) {
    //             return (
    //                 <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
    //                     <td className='px-6 py-4'>{currentguidepack.guideName}</td>
    //                     <td className='px-6 py-4'>{currentguidepack.touristArea}</td>
    //                     <td className='px-6 py-4'>{currentguidepack.langType}</td>
    //                     <td className='px-6 py-4'>{currentguidepack.vehicleType}</td>
    //                     <td className='px-6 py-4'>{currentguidepack.price}</td>
    //                 </tr>

    //             );
    //         }
    //     });
    // }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className=" sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className=''>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className=''>
                                    <tr>
                                        <th className='drop-shadow-md'>
                                            <h3>Guide Pack Details</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            {/* <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Employee ID"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchGuidePack: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div> */}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            {this.state.searchGuidePack === "" ? this.guidePackList() : this.searchGuidePackList()}

                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <GuidePackDetails guId={this.state.guideName} key={this.state.guideName} close={this.closeModalBox} />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

