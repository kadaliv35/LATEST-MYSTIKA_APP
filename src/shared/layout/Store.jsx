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

const Store = (props) => {
    const [selectedItem, setSelectedItem] = useState(false)
    const [fieldName, setFieldName] = useState("")

    const { openModel } = props
    const { openStore } = props


    function openFiled(type) {
        setSelectedItem(true)
        setFieldName(type)
    }

    return (
        <Modals
            open={openModel}
            header={
                <div>
                    <h5>Store</h5>
                    <button
                        type="button"
                        className="close_btn"
                        onClick={openStore}
                    >
                        <img src={close} alt={close}></img>
                    </button>
                </div>
            }
            body={
                <div>
                    {!selectedItem ?
                        <div className="store">
                            <div className="store-head">
                                <img src={crystal}
                                    alt={crystal} className="store-head-icon" />
                                <p>Place where your rewards can be redeemed!</p>
                                <div>
                                    <button
                                        type="button"
                                        className="img_btn_home"
                                    >
                                        Treasure Box
                                    </button>
                                    <button
                                        type="button"
                                        className="img_btn_brown"
                                    >
                                        Bonuses
                                    </button>
                                    <button
                                        type="button"
                                        className="img_btn_brown"
                                    >
                                        BackPack
                                    </button>
                                </div>
                            </div>
                            <div className="store-body">
                                <div className="store-body-sub">
                                    <div className="store-body-btns">
                                        <img className="imageBtns" src={bag} alt={bag} />
                                        <br />
                                        <span>Bag of Coins {"   "} 300 <img src={coin} alt={coin} className="endImg" /> </span>
                                        <button
                                            type="button"
                                            className="img_btn_home"
                                            onClick={() => openFiled("coinsBag")}
                                        >
                                            $2.99
                                        </button>
                                    </div>
                                    <div className="store-body-btns">
                                        <span className="text-green">Popular 20% more</span>
                                        <img className="imageBtns" src={treasure} alt={treasure} />
                                        <br />
                                        <span>Stash of Coins {"   "} 1800 <img src={coin} alt={coin} className="endImg" /> </span>
                                        <button
                                            type="button"
                                            className="img_btn_home"
                                            onClick={() => openFiled("coinsStash")}
                                        >
                                            $15.99

                                        </button>
                                    </div>
                                    <div className="store-body-btns">
                                        <img className="imageBtns" src={bag} alt={bag} />
                                        <br />
                                        <span>Bag of Crystals {"   "} 30 <img src={crystals} alt={crystals} className="endImg" /> </span>
                                        <button
                                            type="button"
                                            className="img_btn_home"
                                            onClick={() => openFiled("crystlBag")}
                                        >
                                            $2.99

                                        </button>
                                    </div>
                                    <div className="store-body-btns">
                                        <span className="text-green">More Owned 20% more</span>
                                        <img className="imageBtns" src={crystalTreasure} alt={crystalTreasure} />
                                        <br />
                                        <span>Stash of Crystals {"   "} 180 <img src={crystals} alt={crystals} className="endImg" /> </span>
                                        <button
                                            type="button"
                                            className="img_btn_home"
                                            onClick={() => openFiled("crystlStash")}
                                        >
                                            $15.99

                                        </button>
                                    </div>
                                </div>
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
                            </div>
                        </div> :
                        <div className="store">
                            <p className='store-checkout-heading'>A wise choice 'Adventurer!</p>
                            <div className='store-checkout'>
                                {fieldName === "coinsBag" ?
                                    <div className='store-checkout-child'>
                                        <img className="imageBtns" src={bag} alt={bag} />
                                        <br />
                                        <span>Bag of Coins {"   "} 300 <img src={crystals} alt={crystals} className="endImg" /> </span>
                                    </div>
                                    : fieldName === "coinsStash" ?
                                        <div className='store-checkout-child'>
                                            <img className="imageBtns" src={treasure} alt={treasure} />
                                            <br />
                                            <span>Stash of Coins {"   "} 1800 <img src={coin} alt={coin} className="endImg" /> </span>
                                        </div>
                                        : fieldName === "crystlBag" ?
                                            <div className='store-checkout-child'>
                                                <img className="imageBtns" src={bag} alt={bag} />
                                                <br />
                                                <span>Bag of Crystals {"   "} 30 <img src={crystals} alt={crystals} className="endImg" /> </span>
                                            </div>
                                            : fieldName === "crystlStash" ?
                                                <div className='store-checkout-child'>
                                                    <img className="imageBtns" src={crystalTreasure} alt={crystalTreasure} />
                                                    <br />
                                                    <span>Stash of Crystals {"   "} 180 <img src={crystals} alt={crystals} className="endImg" /> </span>
                                                </div>
                                                : <></>}
                                <button
                                    type="button"
                                    className="img_btn_home"
                                >
                                    Proceed

                                </button>
                            </div>
                        </div>}
                </div>
            }
        />
    )
}

export default Store