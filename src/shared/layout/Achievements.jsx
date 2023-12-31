import React, { Component } from 'react'
import Modals from '../../commonUtils/Modals'
import closeImg from "../../assets/images/close_ic.svg";
import achievements from "../../assets/images/achievements.png";
import Bars from '../../commonUtils/Bars';
import coins from '../../assets/images/coinsFrame.png'
import crystal from '../../assets/images/crystalFrame.png'
import xpoints from '../../assets/images/xpPoints.png'

export default class Achievements extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openAchivementPop: true
        }
    }

    componentWillMount() {
    }
    closeAchievements() {
        this.setState({ openAchivementPop: false })
    }
    render() {
        const data = this.props.data
        const open = this.props.open
        const close = this.props.close

        return (
            <div>
                <Modals
                    open={open}
                    header={
                        <div>
                            <h5 className="text-white font-bold mt-2">Achievements</h5>
                            <button
                                type="button"
                                className="close_btn"
                                onClick={() => close()}
                            >
                                <img alt='' src={closeImg} ></img>
                            </button>
                        </div>
                    }
                    body={
                     <div className="text-center">
                            <div className="ach">
                                <div className="achiev-head">
                                    <div className="achiev-head-left">
                                        <img alt='' src={achievements} ></img>
                                    </div>
                                    <div className="achiev-head-right">
                                        <p className='text-center'>Track your epic progress and earn rewards for <br></br>your brave accomplishments here.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center modal-body-scroll'>
                            {data.map((item, index) => {
                                return (
                                    <div className='achiev-right'>
                                        <div className="frame">
                                            <h5>{item.achivementName}</h5>
                                            <h6 className="label">{item.achivementDescription}</h6>
                                            <div className="bar">
                                                <Bars completed={0} maxComplted={item.maxValue} />
                                                <p>0/{item.maxValue}</p>
                                            </div>
                                            <div className="rewards">
                                                <div>
                                                    {item.rewardCoins && <span>
                                                        <img src={coins} alt={coins} />
                                                        <p>{item.rewardCoins}</p>
                                                    </span>}
                                                    {item.rewardCrystals && <span>
                                                        <img src={crystal} alt={crystal} />
                                                        <p>{item.rewardCrystals}</p>
                                                    </span>}
                                                    {item.rewardXpPoints && <span>
                                                        <img src={xpoints} alt={xpoints} />
                                                        <p>{item.rewardXpPoints}</p>
                                                    </span>}
                                                </div>
                                            </div>
                                            <button onClick={() => console.log("hello")} className={item.enable ? "img_btn_home" : "img_btn_brown"} disabled={!item.enable}>
                                                Claim
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    }

                />

            </div>
        )
    }
}
