import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "../component/payment_form"



//you have to write your public key, you will get from strip 
const PUBLIC_KEY = ""

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<section className="container">
			<Elements stripe={stripeTestPromise}>
				<PaymentForm />
			</Elements>
		</section>
	)
}
