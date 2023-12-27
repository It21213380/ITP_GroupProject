import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const PaymentInformationUpdate = () => {

    const uid = JSON.parse(localStorage.getItem("userSession"))?._id
    const [input, setInput] = useState({})
    const [dataReady, setDataReady] = useState(false)

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/EmpPayDetail/' + uid)
            .then(async res => {
                if (res.status === 200) {
                    setInput(res.data)
                } else {
                    console.log('res', res)
                }
            })
            .catch(e => console.log('e', e))
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()

        axios
            .put('http://localhost:5000/api/EmpPayDetail/'+input._id, input)
            .then(async res => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Details are updated!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#60e004'
                    })
                    window.location.href = "/serviceDashBoard/payment-info"
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'We faced a problem',
                        text: 'Coudn\'t update details',
                    })
                }
                console.log('res', res)
            })
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-between'>
                    <div className='p-3 border'>
                        <h4 className='display-6'>Your Payment Information</h4>

                        <p>Setup your payment information to be eligible for payment.
                            We use this data only for payment purposes and you can delete
                            them from the website anytime you want.</p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* {JSON.stringify(input)} */}
                            <label className='block mb-2 text-lg font-medium '>
                                Account holder's name :
                            </label>
                            <input type="text"
                                required
                                className="form-control "
                                value={input.accHolderName}
                                onChange={e => setInput({ ...input, accHolderName: e.target.value })}
                            /><p />

                            <label className='block mb-2 text-lg font-medium '>
                                Account Number :
                            </label>
                            <input type="text"
                                required
                                className="form-control "
                                value={input.accNumber}
                                onChange={e => setInput({ ...input, accNumber: e.target.value })}
                            /><p />

                            <label className='block mb-2 text-lg font-medium '>
                                Bank Name :
                            </label>
                            <input type="text"
                                required
                                className="form-control "
                                value={input.bankName}
                                onChange={e => setInput({ ...input, bankName: e.target.value })}
                            /><p />

                            <label className='block mb-2 text-lg font-medium '>
                                Bank Branch Name :
                            </label>
                            <input type="text"
                                required
                                className="form-control "
                                value={input.bankBranchName}
                                onChange={e => setInput({ ...input, bankBranchName: e.target.value })}
                            /><p />

                            <input type='submit' className="form-control btn btn-success" value={"Update"}
                                onClick={(e) => handleUpdate(e)}
                            />

                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default PaymentInformationUpdate