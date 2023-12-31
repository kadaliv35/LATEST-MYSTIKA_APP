import React from 'react'
import treasure from '../../assets/images/treasure.png'
import bag from '../../assets/images/bag.png'
import crystalTreasure from '../../assets/images/crystalTreasure.png'
import Modals from "../../commonUtils/Modals";
import close from "../../assets/images/close_ic.svg";
import crystal from "../../assets/images/crystal.svg";
import crystals from "../../assets/images/crystals.png";
import coin from "../../assets/images/coin_1.svg";
import { useState } from 'react';
import coupon7 from '../../assets/images/coupon7.png'
import coupon5 from '../../assets/images/coupon5.png'
import coupon6 from '../../assets/images/coupon6.png'
import coupon10 from '../../assets/images/coupon10.png'
import collegeBook from '../../assets/images/collegeBook.png'
import merchendise from '../../assets/images/merchendise.png'
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";


const Store = (props) => {

    let stripePromiss;


    const getStripe = () => {
        if (!stripePromiss) {
            stripePromiss = loadStripe('pk_test_51Nl8GySHVh0kvU8q8BMqkbihq86Dq2k30zAUnJJ7Qb0TanEh51HxJZByWyVudbKNK16Z9iO4GRWsSTY9eWIEVxtA00rYzVnQZZ')
        }
        return stripePromiss;
    }

    const [amount, setAmount] = useState("")

    let plan = {
        price: 'price_1Nl9vLSHVh0kvU8qz5R9dfgW',
        quantity: 1
    }

    let checkoutOptions = {
        lineItems: [plan],
        mode: "subscription",
        successUrl: `${window.location.origin}/successpage`,
        cancelUrl: `${window.location.origin}/landingpage`,
    }

    const redirectToCheckout = async () => {
        // sessionStorage.setItem("selectedCommunity", JSON.stringify(selectedCommunity));
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        console.log('+++++++++++error++++++++++++', error);
    }



    const [selectedItem, setSelectedItem] = useState(false)
    const [fieldName, setFieldName] = useState("")
    const [activeField, setActiveField] = useState("box")

    const { openModel } = props
    const { openStore } = props
    const Stripe = useStripe()
    const usElements = useElements()


    function openFiled(type) {
        setSelectedItem(true)
        setFieldName(type)
    }

    const setActive = (type) => {
        setActiveField(type)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!Stripe || !usElements) {
            return;
        }
        const clientSecret = await fetchPayment()
    }

    const goBack = () => {
        setSelectedItem(false)
        setAmount("")
        setFieldName("")
    }

    const fetchPayment = async () => {
        const token = JSON.parse(sessionStorage.getItem('token'));

        const response = await fetch(`http://ec2-13-231-237-83.ap-northeast-1.compute.amazonaws.com:8080payment/savePaymentDeatils`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(token)
            },
            body: JSON.stringify({
                "amount": amount,
                "featureRequest": "test"
            })
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                const billingDetails = {
                    email: 'jenny.rosen@example.com',
                };

                console.log('response object:', responseJson.client_secret)

                console.log('response object:', responseJson.client_secret)

                const { paymentIntent, error } = await Stripe.createPayment(responseJson.client_secret, {
                    paymentMethodType: 'Card',
                    paymentMethodData: {
                        billingDetails,
                    }
                });
                console.log('loggg', paymentIntent);
                if (error) {
                    console.log('Payment confirmation error', error)
                    alert('Payment confirmation error' + error.message);
                } else if (paymentIntent) {
                    alert('Success from promise', paymentIntent);
                }

                return responseJson.client_secret;
            })
            .catch((error) => {
                console.error(error);
            })

    }

    return (
        <Modals
            open={openModel}
            header={
                <div>
                    <h5 className='mt-2'>Store</h5>
                    <button
                        type="button"
                        className="close_btn"
                        onClick={openStore}
                    >
                        <img  src={close} alt={close}></img>
                    </button>
                </div>
            }
            body={
                <div className='mt-5'>
                    {!selectedItem ?
                        <div className="store">
                            <div className="store-head">
                                <img  src={crystal}
                                    alt={crystal} className="store-head-icon" />
                                <p>Place where your rewards can be redeemed!</p>
                                <div>
                                    <button
                                        type="button"
                                        className={activeField === "box" ? "img_btn_home" : "img_btn_brown"}
                                        onClick={() => setActive("box")}
                                    >
                                        Treasure Box
                                    </button>
                                    <button
                                        type="button"
                                        className={activeField === "bonus" ? "img_btn_home" : "img_btn_brown"}
                                        onClick={() => setActive("bonus")}
                                    >
                                        Bonuses
                                    </button>
                                    <button
                                        type="button"
                                        className={activeField === "backpack" ? "img_btn_home" : "img_btn_brown"}
                                        onClick={() => setActive("backpack")}
                                    >
                                        BackPack
                                    </button>
                                </div>
                            </div>
                            <div className="store-body">
                                {activeField === "box" ? <div className="store-body-sub">
                                    <div className="store-body-btns">
                                        <img   className="imageBtns" src={bag} alt={bag} />
                                        <br />
                                        <span>Bag of Coins {"   "} 300 <img   src={coin} alt={coin} className="endImg" /> </span>
                                        <button
                                            type="button"
                                            className="img_btn_home"
                                            onClick={() => {
                                                openFiled("coinsBag")
                                                setAmount("2.99")
                                            }}
                                        >
                                            $2.99
                                        </button>
                                    </div>
                                    <div className="store-body-btns">
                                        <span className="text-green">Popular 20% more</span>
                                        <img   className="imageBtns" src={treasure} alt={treasure} />
                                        <br />
                                        <span>Stash of Coins {"   "} 1800 <img   src={coin} alt={coin} className="endImg" /> </span>
                                        <button
                                            type="button"
                                            className="img_btn_home"
                                            onClick={() => {
                                                openFiled("coinsStash")
                                                setAmount("15.99")
                                            }}
                                        >
                                            $15.99

                                        </button>
                                    </div>
                                    <div className="store-body-btns">
                                        <img   className="imageBtns" src={bag} alt={bag} />
                                        <br />
                                        <span>Bag of Crystals {"   "} 30 <img   src={crystals} alt={crystals} className="endImg" /> </span>
                                        <button
                                            type="button"
                                            className="img_btn_home"
                                            onClick={() => {
                                                openFiled("crystlBag")
                                                setAmount("2.99")
                                            }}
                                        >
                                            $2.99

                                        </button>
                                    </div>
                                    <div className="store-body-btns">
                                        <span className="text-green">More Owned 20% more</span>
                                        <img   className="imageBtns" src={crystalTreasure} alt={crystalTreasure} />
                                        <br />
                                        <span>Stash of Crystals {"   "} 180 <img  src={crystals} alt={crystals} className="endImg" /> </span>
                                        <button
                                            type="button"
                                            className="img_btn_home"
                                            onClick={() => {
                                                openFiled("crystlStash")
                                                setAmount("15.99")
                                            }}
                                        >
                                            $15.99

                                        </button>
                                    </div>
                                </div>
                                    : activeField === "bonus" ?
                                        <div className="d-flex flex-column">
                                            <div className="store-body-sub">
                                                <div className="store-body-info">
                                                    <span>
                                                        Career and Academic Assessment:
                                                    </span>
                                                    <span>
                                                        Find your appropriate career paths based on cognitive ability, personality, and interests. Research those jobs online looking at job information, and projections of salary, growth or decline, and job openings. With the job identified, determining the academic path and college major is simple.
                                                    </span>
                                                </div>
                                                <div className="store-body-info">
                                                    <span>
                                                        College Planning Platform:
                                                    </span>
                                                    <span>
                                                        Manage the entire application process online. Be able to compare your GPA and test scores to that of the college freshman class. Access college research information, application deadlines, and required essays.
                                                    </span>
                                                </div>
                                                <div className="store-body-info">
                                                    <span>
                                                        College Aid Platform:
                                                    </span>
                                                    <span>
                                                        Determine financial aid eligibility both need and merit. Compare colleges side-by-side to see the net result to the family in terms of cost. Prepare a four-year payment plan so there are no surprises.
                                                    </span>
                                                </div>
                                                <div className="store-body-info">
                                                    <span>
                                                        Tom’s Book, Plan for College - Prepare for Life:
                                                    </span>
                                                    <span>
                                                        A comprehensive guide to planning for college and implementing an application strategy.
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="store-body-sub">
                                                <div className="store-body-merch text-center">
                                                    <p className="text-green">MORE OWNED</p>
                                                    <img alt=''  src={coupon7} className='h-50 w-75' />
                                                    <p className="text-white">
                                                        7% OFF COUPON COLLEGE PLANNING PLATFORM
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="img_btn_home w-75 h-25"
                                                    >
                                                        5000 <img alt=''  src={coin} className='h-25 w-25' />
                                                    </button>
                                                </div>
                                                <div className="store-body-merch text-center">
                                                    <p className="text-green">POPULAR</p>
                                                    <img alt=''  src={coupon5} className='h-50 w-75' />
                                                    <p className="text-white">
                                                        5% OFF COUPON COUNSELLING
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="img_btn_home w-75 h-25"
                                                    >
                                                        5000 <img alt=''  src={crystals} className='h-25 w-25' />
                                                    </button>

                                                </div>
                                                <div className="store-body-merch text-center">
                                                    <img alt=''  src={coupon10} className='h-50 w-75' />
                                                    <p className="text-white">
                                                        10% OFF COUPON COLLEGE AID PLATFORM
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="img_btn_home w-75 h-25"
                                                    >
                                                        2500 <img alt=''  src={coin} className='h-25 w-25' />
                                                    </button>

                                                </div>
                                                <div className="store-body-merch text-center">
                                                    <img alt=''  src={coupon6} className='h-50 w-75' />
                                                    <p className="text-white">
                                                        6% OFF COUPON ASSESSMENT
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="img_btn_home w-75 h-25"
                                                    >
                                                        300 <img alt=''  src={crystals} className='h-25 w-25' />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="d-flex flex-column">
                                            <div className="store-body-sub">
                                                <div className="store-body-info">
                                                    <span>
                                                        Career and Academic Assessment:
                                                    </span>
                                                    <span>
                                                        Find your appropriate career paths based on cognitive ability, personality, and interests. Research those jobs online looking at job information, and projections of salary, growth or decline, and job openings. With the job identified, determining the academic path and college major is simple.
                                                    </span>
                                                </div>
                                                <div className="store-body-info">
                                                    <span>
                                                        College Planning Platform:
                                                    </span>
                                                    <span>
                                                        Manage the entire application process online. Be able to compare your GPA and test scores to that of the college freshman class. Access college research information, application deadlines, and required essays.
                                                    </span>
                                                </div>
                                                <div className="store-body-info">
                                                    <span>
                                                        College Aid Platform:
                                                    </span>
                                                    <span>
                                                        Determine financial aid eligibility both need and merit. Compare colleges side-by-side to see the net result to the family in terms of cost. Prepare a four-year payment plan so there are no surprises.
                                                    </span>
                                                </div>
                                                <div className="store-body-info">
                                                    <span>
                                                        Tom’s Book, Plan for College - Prepare for Life:
                                                    </span>
                                                    <span>
                                                        A comprehensive guide to planning for college and implementing an application strategy.
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="store-body-sub">
                                                <div className="store-body-merch text-center">
                                                    <p className="text-green">MORE OWNED</p>
                                                    <img alt=''  src={collegeBook} className='h-50 w-75' />
                                                    <p className="text-white">
                                                        PLAN FOR COLLEGE (BOOK)
                                                    </p>
                                                </div>
                                                <div className="store-body-merch text-center">
                                                    <p className="text-green">POPULAR</p>
                                                    <img alt=''  src={merchendise} className='h-50 w-75' />
                                                    <p className="text-white">
                                                        MERCHANDISE
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div> :
                        <div className="store">
                            <p className='store-checkout-heading'>A wise choice 'Adventurer!</p>
                            <div className='store-checkout'>
                                {fieldName === "coinsBag" ?
                                    <div className='store-checkout-child'>
                                        <img  className="imageBtns" src={bag} alt={bag} />
                                        <br />
                                        <span>Bag of Coins {"   "} 300 <img  src={coin} alt={coin} className="endImg" /> </span>
                                        <br />
                                        <div className='store-checkout-child-btns'>
                                            <button className='img_btn_home' onClick={() => redirectToCheckout()}>$2.99</button>
                                            <button className='img_btn_brown' onClick={goBack}>Cancel</button>
                                        </div>
                                    </div>
                                    : fieldName === "coinsStash" ?
                                        <div className='store-checkout-child'>
                                            <img  className="imageBtns" src={treasure} alt={treasure} />
                                            <br />
                                            <span>Stash of Coins {"   "} 1800 <img  src={coin} alt={coin} className="endImg" /> </span>
                                            <br />
                                            <div className='store-checkout-child-btns'>
                                                <button className='img_btn_home' onClick={() => redirectToCheckout()}>$15.99</button>
                                                <button className='img_btn_brown' onClick={goBack}>Cancel</button>
                                            </div>
                                        </div>
                                        : fieldName === "crystlBag" ?
                                            <div className='store-checkout-child'>
                                                <img   className="imageBtns" src={bag} alt={bag} />
                                                <br />
                                                <span>Bag of Crystals {"   "} 30 <img   src={crystals} alt={crystals} className="endImg" /> </span>
                                                <br />
                                                <div className='store-checkout-child-btns'>
                                                    <button className='img_btn_home' onClick={() => redirectToCheckout()}>$2.99</button>
                                                    <button className='img_btn_brown' onClick={goBack}>Cancel</button>
                                                </div>
                                            </div>
                                            : fieldName === "crystlStash" ?
                                                <div className='store-checkout-child'>
                                                    <img   className="imageBtns" src={crystalTreasure} alt={crystalTreasure} />
                                                    <br />
                                                    <span>Stash of Crystals {"   "} 180 <img   src={crystals} alt={crystals} className="endImg" /> </span>
                                                    <br />
                                                    <div className='store-checkout-child-btns'>
                                                        <button className='img_btn_home' onClick={() => redirectToCheckout()}>$15.99</button>
                                                        <button className='img_btn_brown' onClick={goBack}>Cancel</button>
                                                    </div>
                                                </div>
                                                : <></>}
                                
                            </div>
                        </div>}
                </div>
            }
        />
    )
}

export default Store
