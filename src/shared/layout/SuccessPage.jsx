import axios from 'axios'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function SuccessPage() {
    useEffect(() => {
        success()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const history = useHistory()
    const success = (props) => {
        axios.post('http://ec2-13-231-237-83.ap-northeast-1.compute.amazonaws.com:8080/payment/create-payment-intent', { amount: 1099, featureRequest: "test" }).then((res) => {
            console.log({ res })
            history.push("/landingpage")
        }).catch((err) => {
            console.error({ err })
            history.push("/landingpage")
        })
    }

    return (
        <div className='success_cont'>
            <h3>
                Payment Successfull
            </h3>
        </div>
    )
}

export default SuccessPage