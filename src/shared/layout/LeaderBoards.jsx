import React, { useEffect } from 'react'
import Modals from '../../commonUtils/Modals'
import close from "../../assets/images/close_ic.svg";
import Silver from '../../assets/images/silverCup.png'
import Bronze from '../../assets/images/bronze.png'
import Platinum from '../../assets/images/platinum.png'
import Gold from '../../assets/images/goldCup.png'
import crystals from "../../assets/images/crystals.png";
import { useState } from 'react';
import BountyServices from '../../services/BountyServices';

const LeaderBoards = ({ openPop, closePop }) => {

    const [ldType, setLdType] = useState("daily")
    const [mapLeads, setMapLeads] = useState(false)
    const [dayData, setDayData] = useState({})
    const [weekData, setWeekData] = useState({})
    const [openRanks, setOpenRanks] = useState({});

    useEffect(() => {
        getDailyRank()
        getWeeklyRank()
    }, [])

    function getDailyRank() {
        BountyServices.getDailyRank().then((res) => {
            let response = res?.data
            setDayData(response)
            console.log({ dayData })
        }).catch((err) => {
            console.error({ err })
        })
    }

    function getWeeklyRank() {
        BountyServices.getWeeklyRank().then((res) => {
            let response = res.data
            setWeekData(response)
            console.log({ weekData })
        }).catch((err) => {
            console.log({ err })
        })
    }

    const ldBoards = (type) => {
        setLdType(type)
    }

    const openLeadMap = () => {
        setMapLeads(true)
    }

    const toggleRank = (rank) => {
        setOpenRanks((prevState) => ({
            ...prevState,
            [rank]: !prevState[rank],
        }));
    };

    // const leaderBoardList = 

    return (
        <div className="leadermodel">
            <Modals
                open={openPop}
                header={
                    <div>
                        <h5>LeaderBoards</h5>
                        <button
                            type="button"
                            className="close_btn"
                            onClick={() => closePop()}
                        >
                            <img src={close} alt={close}></img>
                        </button>
                    </div>
                }
                body={
                    <div className="text-center modal-body-scroll">
                        {mapLeads ?
                            <div className='mt-5 px-3'>
                                <p className='py-2'>GET INTO LEADERBOARDS WITH YOUR RELENTLESS EFFORT AND BE AMONG THE BEST TO EARN BONUS REWARDS!</p>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className={ldType === "daily" ? "img_btn_home" : "img_btn_brown"}
                                        onClick={() => ldBoards("daily")}
                                    >
                                        DAILY
                                    </button>
                                    <button
                                        type="button"
                                        className={ldType === "weekly" ? "img_btn_home" : "img_btn_brown"}
                                        onClick={() => ldBoards("weekly")}                      >
                                        WEEKLY
                                    </button>
                                </div>
                                <div className="frame">
                                    <div className="d-flex justify-content-center flex-column frame">
                                        <p>RESETS IN: 14:30</p>
                                        <div className="d-flex justify-content-around ml-5">
                                            <div className="d-flex">
                                                <img src={Bronze} className="h-50" alt='bronze' />
                                                <div>
                                                    <p>BRONZE</p>
                                                    <p>41-100</p>
                                                    <p>20 <img src={crystals} alt='crystal' className="h-25 w-25" /> </p>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <img src={Silver} className="h-50" alt='silver' />
                                                <div>
                                                    <p>SILVER</p>
                                                    <p>21-40</p>
                                                    <p>20 <img src={crystals} className="h-25 w-25" alt='crystals' /> </p>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <img src={Gold} className="h-50" alt='gold' />
                                                <div>
                                                    <p>GOLD</p>
                                                    <p>11-20</p>
                                                    <p>20 <img src={crystals} className="h-25 w-25" alt='crystals' /> </p>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <img src={Platinum} className="h-50" alt='platinum' />
                                                <div>
                                                    <p>PLATINUM</p>
                                                    <p>01-10</p>
                                                    <p>20 <img src={crystals} className="h-25 w-25" alt='crystals' /> </p>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className='lboard'>
                                            {Object.entries(ldType === "daily" ? dayData : weekData).map(([rank, characters], index) => (
                                                <li key={index}>
                                                    <h4 className='lboard-headings' onClick={() => toggleRank(rank)} style={{ cursor: 'pointer' }}>{rank}:</h4>
                                                    {openRanks[rank] &&
                                                        <ul className='lboard-divs'>
                                                            <li className='lboard-divs-head'>
                                                                <h6>Player</h6>
                                                                <h6>Rank</h6>
                                                                <h6>XP</h6>
                                                                <h6>Category</h6>
                                                            </li>
                                                            {characters && characters.map((character, characterIndex) => (
                                                                <li key={characterIndex} className='lboard-divs-sub'>
                                                                    <span>
                                                                        {character.userName}
                                                                    </span>
                                                                    <span>
                                                                        {character.rank}
                                                                    </span>
                                                                    <span>
                                                                        {character.totalXpPoints}
                                                                    </span>
                                                                    <span>
                                                                        {character.caterory}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            : <div className='mt-5'>
                                <h5>YOU WENT TO THE LEADERBOARDS</h5>
                                <p>YOUR SERVICE TO THE EMPORER IS DAILY NOTED.</p>
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="d-flex">
                                        <img src={Silver} alt='silver' />
                                        <div>
                                            <p>SILVER</p>
                                            <p>RANK - #3</p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <img src={crystals} className="h-25 w-25" alt='crystals'></img>
                                        <span>50</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="img_btn_home"
                                        onClick={() => openLeadMap()}
                                    >
                                        Delighted
                                    </button>
                                </div>
                            </div>}
                    </div>
                }
            />
        </div>
    )
}

export default LeaderBoards