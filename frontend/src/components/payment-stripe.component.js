import React, { useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './payment-form.component';
import Swal from 'sweetalert2';
import axios from 'axios';

const StripeComponent = ({ amount, currency, serviceType, serviceId }) => {
    const stripePromise = loadStripe(
        "pk_test_51MzuSNSJkstseoqJuMlVMGH2XydblsO1K8nqdE7qjeVVQK2ugvoPGYcpZNmpGevDS0HXeJNGEnt6cuuTj1yEkQyW00kQylwffe"
    );

    const [paymentData, setPaymentData] = useState({ 
        amount, 
        currency, 
        userId: JSON.parse(localStorage.getItem("userSession"))?._id || null ,
        service : {
            type: serviceType,
            id: serviceId
        }
    })

    const handlePayment = () => {
        axios.post(`http://localhost:5000/api/payment/add`, paymentData)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Payment completed!',
                })
                // navigate out
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry, we faced an issue',
                    text: 'Please refresh and try again!',
                })
                console.log(error);
            })
    }

    return (
        <Elements stripe={stripePromise}>
            {/* {JSON.stringify(paymentData)} */}
            <PaymentForm
                handlePayment={handlePayment}
                paymentData={paymentData}
                setPaymentData={setPaymentData}
            />
        </Elements>
    );
}

export default StripeComponent;
