import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PaymentInformation = () => {

    const [input, setInput] = useState({})
    const [dataReady, setDataReady] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post()
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
                        <form onSubmit={(e) => handleSubmit()}>
                            {JSON.stringify(input)}
                            <label className='block mb-2 text-lg font-medium '>
                                Account holder's name :
                            </label>
                            <input type="text"
                                required
                                className="form-control "
                                value={input.accHolderName}
                                onChange={e => setInput({...input , accHolderName: e.target.value })}
                            /><p />

                            <label className='block mb-2 text-lg font-medium '>
                                Account Number :
                            </label>
                            <input type="text"
                                required
                                className="form-control "
                                value={input.accNumber}
                                onChange={e => setInput({...input , accNumber: e.target.value })}
                            /><p />

                            <label className='block mb-2 text-lg font-medium '>
                                Bank Name :
                            </label>
                            <input type="text"
                                required
                                className="form-control "
                                value={input.bankName}
                                onChange={e => setInput({...input , bankName: e.target.value })}
                            /><p />

                            <label className='block mb-2 text-lg font-medium '>
                                Bank Branch Name :
                            </label>
                            <input type="text"
                                required
                                className="form-control "
                                value={input.bankBranchName}
                                onChange={e => setInput({...input , bankBranchName: e.target.value })}
                            /><p />

                            <input type='submit' className="form-control btn btn-success"/>

                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default PaymentInformation