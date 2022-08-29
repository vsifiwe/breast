import React from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Button from '@mui/material/Button';

function PaymentButton() {

    const config = {
        public_key: 'FLWPUBK_TEST-43c5c0e6828d1d0452e44df1cb470658-X',
        tx_ref: Date.now(),
        amount: 500,
        currency: 'RWF',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: 'asifiwemanzi@gmail.com',
            phonenumber: '0788427257',
            name: 'Marvella Kameca',
        },
        customizations: {
            title: 'Subscription payment',
            description: 'Payment of subscription',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    return (
        <Button
            variant="contained"
            color="error"
            onClick={() => {
                handleFlutterPayment({
                    callback: (response) => {
                        console.log(response);
                        closePaymentModal() // this will close the modal programmatically
                    },
                    onClose: () => { },
                });
            }}
        >
            Pay
        </Button>
    )
}

export default PaymentButton