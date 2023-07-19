import React, { Component } from "react";
import sProfile from "../../assets/images/user_1.svg";
import hand from "../../assets/images/hand.svg";
import coin from "../../assets/images/coin_1.svg";
import coins from "../../assets/images/coins_new.svg";
import crystal from "../../assets/images/crystal.svg";
import logo from "../../assets/images/logo.svg";
import progress from "../../assets/images/progress_small.svg";

function Header() {
  return (
    <div className="main">
      <div className="header">
        <div className="text-white header-left">
          <ul>
            <li>
              <img src={sProfile}></img>
              <div className="content">
                <span>
                  Hi <img src={hand}></img>
                </span>{" "}
                <label>John doe !</label>
              </div>
            </li>
            <li>
              <img src={coin}></img>
              <div className="content">
                <span>Coins</span> <label className="fs-18">100</label>
              </div>
            </li>
            <li>
              <img src={crystal}></img>
              <div className="content">
                <span>Crystals</span> <label className="fs-18">100</label>
              </div>
            </li>
          </ul>
        </div>
        <div className="text-white header-right">
          <div className="logo">
            <img src={logo}></img>
          </div>
          <ul className="mb-0">
            <li className="progress-relative">
              <h5 className="fs-14 mb-0">Joy Points</h5>
              <img src={progress} className="w-progress"></img>
              <h5 className="fs-14 mt-2">150/200</h5>
            </li>
            <li className="text-center">
              <img src={sProfile} className="prof"></img>
              <button type="button" className="img_btn_home">
                Daily Login
              </button>
              <span className="dropdown">
                {/* <button className="ml-2 img_btn_brown dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Daily Quest
                    </button> */}
                <button type="button" className="img_btn_brown">
                  Daily Quest
                </button>
                {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div> */}
              </span>
              {/* <button type="button" className="img_btn_brown ml-2" >Daily Login</button> */}
            </li>
            <li className="progress-relative">
              <h5 className="fs-14 mb-0">Joy Points</h5>
              <img src={progress} className="w-progress"></img>
              <h5 className="fs-14 mt-2">150/200</h5>
              <h5 className="fs-14">Class: Warrior</h5>
              <h5 className="fs-14">Rank: Apprentice</h5>
            </li>
            <li className="">
              <div className="coin_box text-left">
                <img src={coins}></img>
                <h5 className="fs-16 mb-0 w-progress pl-3">20 : 15</h5>
              </div>
              <div className="coin_box text-left">
                <img src={crystal}></img>
                <h5 className="fs-14 mb-0 w-progress pl-3">Store</h5>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
