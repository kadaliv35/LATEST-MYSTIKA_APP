import React from 'react';
import close from "../../assets/images/close_ic.svg";
import coinsBag from "../../assets/images/coinsBag.png";
import cardsBag from "../../assets/images/cardsBag.png";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useEffect } from 'react';
import { useState } from 'react';
import blog from "../../assets/images/blogs.svg";
import coinFrame from '../../assets/images/coinsFrame.png'
import crystalFrame from '../../assets/images/crystalFrame.png'
import joyFrame from '../../assets/images/joyFrame.png'
import Modals from '../../commonUtils/Modals';

var data = []

function DailyQuest({
  hideDQpop,
  toDayQuest,
  claimDailyQuestRewards
}) {
  const [quests, setQuests] = useState([])
  useEffect(() => {
    data = toDayQuest
    data[0].quest.image = blog
    data[1].quest.image = coinsBag
    data[2].quest.image = cardsBag
    console.log({ data })
  }, [])
  return (
    <div>
      <Modals open={true}
        header={
          <div>
            <h5 className="text-white">Daily Quest</h5>
            <button
              type="button"
              className="close_btn"
              onClick={hideDQpop}
            >
              <img src={close}></img>
            </button>
          </div>
        }
        body={
          <div className="frame text-center">
            <br />
            <h5 className="">
              COMPLETE THE FOLLOWING QUESTS WITHIN 24HRS TO RECIEVE A BOUNTY
            </h5>
            <div className="col text-center">
              <div className="day-list">
                <ul>
                  {toDayQuest && toDayQuest.map((item, index) => {
                    return (
                      <li key={index}>
                        {[item.quest].map((ele, ind) => {
                          return (
                            <span key={ind}>
                              <p className='num'>{index}</p>
                              <span className='title'>{ele.questDescription}</span>
                              <br />
                              <img src={ele.image} />
                              <p className='footer text-green'>Pending</p>
                            </span>
                          )
                        })}
                      </li>
                    );
                  })}
                </ul>
                <span>
                  <img className='frameImg' src={coinFrame} />
                  <img className='frameImg' src={crystalFrame} />
                  <img className='frameImg' src={joyFrame} />
                </span>
              </div>
            </div>
            <button
              type="button"
              // className="img_btn_home"
              className={

                "img_btn"
                // : "img_btn_brown btn-w125 btn-h64"
              }
              onClick={() =>
                claimDailyQuestRewards
              }
            >
              submit
            </button>
          </div>
        }
      />
    </div>
  )
}
export default DailyQuest;
