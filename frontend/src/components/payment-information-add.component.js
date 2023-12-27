import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import PaymentInformationView from './payment-information-view.component'

const PaymentInformation = () => {

    const uid = JSON.parse(localStorage.getItem("userSession"))?._id
    const [input, setInput] = useState({
        accHolderName: '',
        accNumber: '',
        bankName: '',
        bankBranchName: '',
    })
    const [data, setData] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [errors, setErrors] = useState({});


    useEffect(() => {
        axios
            .get('http://localhost:5000/api/EmpPayDetail/' + uid)
            .then(async res => {
                if (res.status === 200) {
                    setData(res.data)
                    setAddMode(false)
                    // setRender(
                    //     <PaymentInformationView uid={uid} />
                    // )
                } else {
                    setAddMode(true)
                    // setRender(
                    //     <div className='p-3 border'>
                    //         <h4 className='display-6'>Your Payment Information</h4>

                    //         <p>Setup your payment information to be eligible for payment.
                    //             We use this data only for payment purposes and you can delete
                    //             them from the website anytime you want.</p>
                    //         <form onSubmit={(e) => e.preventDefault()}>
                    //             <label className='block mb-2 text-lg font-medium '>
                    //                 Account holder's name :
                    //             </label>
                    //             <input type="text"
                    //                 required
                    //                 className="form-control "
                    //                 value={input.accHolderName}
                    //                 onChange={e => setInput({ ...input, accHolderName: e.target.value })}
                    //             /><p />

                    //             <label className='block mb-2 text-lg font-medium '>
                    //                 Account Number :
                    //             </label>
                    //             <input type="text"
                    //                 required
                    //                 className="form-control "
                    //                 value={input.accNumber}
                    //                 onChange={e => setInput({ ...input, accNumber: e.target.value })}
                    //             /><p />

                    //             <label className='block mb-2 text-lg font-medium '>
                    //                 Bank Name :
                    //             </label>
                    //             <input type="text"
                    //                 required
                    //                 className="form-control "
                    //                 value={input.bankName}
                    //                 onChange={e => setInput({ ...input, bankName: e.target.value })}
                    //             /><p />

                    //             <label className='block mb-2 text-lg font-medium '>
                    //                 Bank Branch Name :
                    //             </label>
                    //             <input type="text"
                    //                 required
                    //                 className="form-control "
                    //                 value={input.bankBranchName}
                    //                 onChange={e => setInput({ ...input, bankBranchName: e.target.value })}
                    //             /><p />

                    //             <input type='submit' className="form-control btn btn-success"
                    //                 onClick={(e) => handleSubmit(e)}
                    //             />

                    //         </form>
                    //     </div>
                    // )
                }
            })
            .catch(e => console.log('e', e))
        // setRender(<p>An error occured please refresh</p>)
    }, [])

    const validateForm = () => {
        const errors = {};

        if (!input.accHolderName.trim()) {
            errors.accHolderName = 'Account holder name is required';
        }

        if (!input.accNumber.trim()) {
            errors.accNumber = 'Account number is required';
        } else if (!/^\d+$/.test(input.accNumber)) {
            errors.accNumber = 'Account number should only contain digits';
        }

        if (!input.bankName.trim()) {
            errors.bankName = 'Bank name is required';
        }

        if (!input.bankBranchName.trim()) {
            errors.bankBranchName = 'Bank branch name is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm())
            return

        setInput({ ...input, employeeId: uid, approved: false })
        axios
            .post('http://localhost:5000/api/EmpPayDetail/add', input)
            .then(async res => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Details are saved!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#60e004'
                    })
                    window.location.reload()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'We faced a problem',
                        text: 'Coudn\'t save details',
                    })
                }
            })
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-between'>
                    {addMode === true &&
                        <div className='p-3 border'>
                            <h4 className='display-6'>Your Payment Information</h4>

                            <p>Setup your payment information to be eligible for payment.
                                We use this data only for payment purposes and you can delete
                                them from the website anytime you want.</p>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label className='block mb-2 text-lg font-medium '>
                                    Account holder's name :
                                </label>
                                <input type="text"
                                    required
                                    className={`form-control ${errors.accHolderName && 'is-invalid'}`}
                                    value={input.accHolderName}
                                    onChange={e => setInput({ ...input, accHolderName: e.target.value })}
                                /><p />

                                <label className='block mb-2 text-lg font-medium '>
                                    Account Number :
                                </label>
                                <input type="text"
                                    required
                                    className={`form-control ${errors.accNumber && 'is-invalid'}`}
                                    value={input.accNumber}
                                    onChange={e => setInput({ ...input, accNumber: e.target.value })}
                                /><p />

                                <label className='block mb-2 text-lg font-medium '>
                                    Bank Name :
                                </label>
                                <input type="text"
                                    required
                                    className={`form-control ${errors.bankName && 'is-invalid'}`}
                                    value={input.bankName}
                                    onChange={e => setInput({ ...input, bankName: e.target.value })}
                                /><p />

                                <label className='block mb-2 text-lg font-medium '>
                                    Bank Branch Name :
                                </label>
                                <input type="text"
                                    required
                                    className={`form-control ${errors.bankName && 'is-invalid'}`}
                                    value={input.bankBranchName}
                                    onChange={e => setInput({ ...input, bankBranchName: e.target.value })}
                                /><p />

                                {errors.bankBranchName && <div className="invalid-feedback">{errors.bankBranchName}</div>}


                                <input type='submit' className="form-control btn btn-success"
                                    onClick={(e) => handleSubmit(e)}
                                />

                            </form>
                        </div>
                    }
                    {addMode === false &&
                        <PaymentInformationView data={data} />
                    }
                </div >
            </div >
        </>
    )
}

export default PaymentInformation