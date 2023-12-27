import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const PaymentInformationView = ({ data }) => {

    const navigator = useNavigate()

    const handleUpdateBtn = () => {
        navigator("/serviceDashBoard/payment-info/update")
    }

    const handleDeleteBtn = () => {
        Swal.fire({
            title: 'Are you sure you want to delete your payment details?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Code to execute if the user confirms
                axios.delete('http://localhost:5000/api/EmpPayDetail/' + data._id)
                // window.location.href = "/serviceDashBoard/payment-info/"

            } else {
                // Code to execute if the user cancels
                // (optional, you can remove this part if not needed)
                console.log("Deletion canceled");
            }
        });
    };


    return (
        <>
            <div className='container'>
                <div className='row justify-content-between'>
                    <div className='p-3 border'>
                        <h4 className='display-6'>Your Payment Information</h4>

                        <p>Setup your payment information to be eligible for payment.
                            We use this data only for payment purposes and you can delete
                            them from the website anytime you want.</p>

                        <label className='block mb-2 text-lg font-medium '>
                            Account holder's name : {data.accHolderName}
                        </label>


                        <label className='block mb-2 text-lg font-medium '>
                            Account Number :{data.accNumber}
                        </label>


                        <label className='block mb-2 text-lg font-medium '>
                            Bank Name : {data.bankName}
                        </label>


                        <label className='block mb-2 text-lg font-medium '>
                            Bank Branch Name : {data.bankBranchName}
                        </label>


                        <h3>{data.approved ? "Eligible for payment" : "Not Eligible for payment"}</h3>

                        <button
                            onClick={(() => handleUpdateBtn())}
                            className='btn btn-success'
                        >
                            Update details
                        </button>

                        <button
                            onClick={(() => handleDeleteBtn())}
                            className='btn btn-success'
                        >
                            Delete details
                        </button>
                    </div>
                </div >
            </div >
        </>
    )
}

export default PaymentInformationView