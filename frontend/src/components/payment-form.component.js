import { CardNumberElement, CardExpiryElement, CardCvcElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const PaymentForm = ({ handlePayment, paymentData, setPaymentData }) => {

  const [dataReady, setDataReady] = useState(false)

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet, or elements are not available
      return;
    }

    if (paymentData.userId === null) {
      Swal.fire({
        icon: 'info',
        title: 'You are not logged in!',
        text: 'Please login to continue payment',
      })
    }

    try {
      const cardElement = elements.getElement(CardNumberElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: paymentData?.name,
          address: {
            line1: paymentData.streetAddress, // Set the street address
            city: paymentData.city, // Set the city
            state: paymentData.state, // Set the state
            postal_code: paymentData.postalCode, // Set the postal code
          }
        }
      });
      
      
      if (error) {
        console.log('Payment failed:', error);
      } else {
        console.log('Payment succeeded:', paymentMethod);
        
        // post success events
        setPaymentData({ ...paymentData, paymentId: paymentMethod.id })

        if(!paymentData?.paymentId) 
          return

        handlePayment()
      }
    }
    catch (e) {
      console.log('e', e)
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="row">
        <h6 class="text-uppercase">Personal Information</h6>
        <div class="row mt-3">
          <div class="col-md">
            <div class="inputbox mt-3 mr-2">
              <label>Name on Card</label>
              <input type="text" name="name" class="form-control" required="required"
                value={paymentData?.nameOnCard} onChange={e => setPaymentData({ ...paymentData, nameOnCard: e.target.value })}
              />
            </div>
          </div>
        </div>
        <hr className="my-4"/>
        <h6 class="text-uppercase mt-4">Card Information</h6>
        <div class="row mt-3">
          <div className="col-md-6">
            <label>
              Card Number
            </label>
            <CardNumberElement className="form-control" />
          </div>
          <div className="col-md-6"><label>
            Expiration Date
          </label>
            <CardExpiryElement className="form-control" />
          </div>
          <div className="col-md-6" styles={{ width: "100%" }}><label>
            CVC
          </label>
            <CardCvcElement className="form-control" />
          </div>
        </div>
        <hr className="my-4"/>
        <h6 class="text-uppercase">Billing Address</h6>
        <div class="row mt-3">
        </div>
        <div class="row mt-2">
          <div class="col-sm-6">
            <div class="inputbox mt-3">
              <span>Street Address</span>
              <input type="text" name="name" class="form-control" required="required"
                value={paymentData?.streetAddress} onChange={e => setPaymentData({ ...paymentData, streetAddress: e.target.value })}
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="inputbox mt-3">
              <span>City</span>
              <input type="text" name="name" class="form-control" required="required"
                value={paymentData?.city} onChange={e => setPaymentData({ ...paymentData, city: e.target.value })}
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="inputbox mt-3">
              <span>State/Province</span>
              <input type="text" name="name" class="form-control" required="required"
                value={paymentData?.state} onChange={e => setPaymentData({ ...paymentData, state: e.target.value })}
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="inputbox mt-3">
              <span>Postal code</span>
              <input type="text" name="name" class="form-control" required="required"
                value={paymentData?.postalCode} onChange={e => setPaymentData({ ...paymentData, postalCode: e.target.value })}
              />
            </div>
          </div>
          <div class="mt-4 mb-4 d-flex text-right">
            <input className="btn btn-success px-3 display-3"
              type="submit"
              value="Pay"
            />
          </div>
        </div>
      </div>
    </form >
  );
};

export default PaymentForm