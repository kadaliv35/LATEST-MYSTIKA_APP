import React from 'react';
import close from "../../assets/images/close_ic.svg";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import coins from "../../assets/images/coins_new.svg";
import coin from "../../assets/images/coin_1.svg";
import crystal from "../../assets/images/crystals.png";
import queen from "../../assets/images/queen.svg";
import Modals from '../../commonUtils/Modals';


function TreasureQuest
  ({ treasureChest,
    hideTQpop,
    claimTreasureQuest
  }

  ) {
  return (
    <div>
      <Modals open={true}
        header={
          <div>
            <h5 className="text-white mt-3">Treasure Quest</h5>
            <button
              type="button"
              className="close_btn"
              onClick={hideTQpop}
            >
              <img  src={close} alt='close'></img>
            </button>
          </div>
        }
        body={
          <div className="modal-body frame text-center">
            {/* <h4 className="">
          
            </h4> */}

            <div className="col text-center">
              <div className="day-list">
                {treasureChest && treasureChest.map((item, index) => {
                  return (
                    <span key={index}>
                      <img  src={coins} className='chestImg mb-5' alt='chest' />
                      <br />
                      <span><img  className='treasureImg' src={coin} alt='coin' /> {"10 coins"}</span>
                      <span><img  className='treasureImg' src={crystal} alt='crystal' /> {"10 crystals"}</span>
                      <div className='treasureBtm mt-5'>
                        <img  src={queen} alt='queen' />
                        <button
                          type="button"
                          // className="img_btn_home"
                          className={
                            item.enable
                              ? "img_btn"
                              : "img_btn_home btn-w125 btn-h64"
                          }
                          onClick={() =>
                            claimTreasureQuest(item.treasureChestId)
                          }
                        >
                          submit
                        </button>
                      </div>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
}
export default TreasureQuest
