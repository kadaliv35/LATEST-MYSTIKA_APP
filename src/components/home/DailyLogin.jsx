import React, { Component } from "react";
import close from "../../assets/images/close_ic.svg";
// import progress from "../../assets/images/progress_bar.svg";
import coinbox from "../../assets/images/coin_box.svg";
import coin from "../../assets/images/coins.png";
import diamond from "../../assets/images/diamonds.png";
import golden from "../../assets/images/golden-tick.svg";
import BountyServices from "../../services/BountyServices";
import ProgressBar from "@ramonak/react-progress-bar";

class DailyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      bountyList: [],
      selectedDay: "",
      nextRank: {},
      characterRewardList: [],
      userCharId: "",
      dailyRewards: [],
    };
    this.claimReward = this.claimReward.bind(this);
    this.navToHome = this.navToHome.bind(this);
    this.getDayDetails = this.getDayDetails.bind(this);
  }
  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userName = user["sub"];
    this.setState({ userName: userName }, () => {
      this.getBounty(this.state.userName);
    });
  }
  getDayDetails(dayDetails) {
    this.setState(
      {
        selectedDay: dayDetails.dayNo,
        userCharId: this.state.characterRewardList?.userCharacterId,
      },
      () => { }
    );
  }
  getBounty(userName) {
    let obj = [];
    BountyServices.getbounty(userName)
      .then((res) => {
        res.data.userCharacterList.forEach((ele) => {
          if (ele.active === true) {
            // console.log('ele', ele)
            this.setState({ characterRewardList: ele }, () => {
              obj = ele;
            });
          }
        });
        this.setState(
          {
            dailyRewards: res.data.rewards.dailyRewards,
          },
          () => {
            console.log("obj", res.data);
            sessionStorage.setItem("dailyLogin", JSON.stringify(obj));
            sessionStorage.setItem("totalDailyLogin", JSON.stringify(res.data));
          }
        );
      })
      .catch((err) => console.error(err));
  }


  navToHome() {
    this.props.history.push("/welcomebackscreen");
  }
  claimReward() {
    if (this.state.selectedDay && this.state.userCharId) {
      let obj = {
        userCharId: this.state.userCharId,
        day: this.state.selectedDay,
      };
      BountyServices.postuserBounty(obj)
        .then((res) => {
          if (res) {
            this.props.history.push("/welcomebackscreen");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  dailyRewardStatus = (day) => {
    let Active = false;
    for (let i = 0; i < this.state.dailyRewards.length; i++) {
      if (this.state.dailyRewards[i].dayNo === day) {
        Active = true;
      }
    }
    console.log(Active);
    return Active;
  };

  rewardCollected = (day) => {
    let isCollected = false;
    for (let i = 0; i < this.state.dailyRewards.length; i++) {
      if (
        this.state.dailyRewards[i].dayNo === day &&
        this.state.dailyRewards[i].rewardCollected
      ) {
        isCollected = true;
      }
    }
    return isCollected;
  };

  render() {
    const daysDiv = [];
    if (this.state.characterRewardList) {
      const streakBountydayLimit =
        this.state.characterRewardList?.chCurrentRank?.streakBountydayLimit;
      if (streakBountydayLimit) {
        for (let i = 1; i <= streakBountydayLimit; i++) {
          i > 5
            ? (i === 1 || i % 3 === 1 || i === streakBountydayLimit) &&
            daysDiv.push(<p key={i}>Day {i}</p>)
            : daysDiv.push(<p key={i}>Day {i}</p>);
        }
      }
    }
    return (
      <div className="logo-head-text">
        <label className="mb-0 mt-2">hi {this.state.userName} !</label>
        <h5 className="mb-0">Daily Login Bounty </h5>
        <div className="login-big">
          <div className="header text-white">Apprentice</div>
          <button type="button" onClick={this.navToHome} className="close_btn">
            <img src={close} alt={close}></img>
          </button>
          <div className="body">
            <div className="d-flex mt-3 justify-content-around align-items-start w-75">
              <h5 className="fs-15">Streak <br /> Bounty </h5>
              <img
                src={coinbox}
                alt={coinbox}
                className="cursor img-fluid w-10"
              ></img>
            </div>
            <div className="joyBarSm">
              <ProgressBar
                completed={
                  this.state.dailyRewards.length
                    ? this.state.dailyRewards.length
                    : 0
                }
                className="bars"
                animateOnRender={true}
                isLabelVisible={false}
                height="5px"
                width="435px"
                bgColor="#7FC31C"
                maxCompleted={
                  this.state.characterRewardList?.chCurrentRank
                    ?.streakBountydayLimit
                }
              />
            </div>
            <div className="daysDiv">{daysDiv}</div>
            {this.state.characterRewardList && (
              <div className="day-list">
                <ul>
                  {this.state.characterRewardList?.chCurrentRank?.daywiseRules.map(
                    (item, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            this.dailyRewardStatus(item.dayNo) &&
                              this.rewardCollected(item.dayNo)
                              ? ""
                              : this.getDayDetails(item)
                          }
                          className={`${this.dailyRewardStatus(item.dayNo) &&
                              this.rewardCollected(item.dayNo)
                              ? "grey_out"
                              : ""
                            } 
                          ${!this.rewardCollected(item.dayNo) &&
                              this.dailyRewardStatus(item.dayNo)
                              ? "bg_yellow"
                              : ""
                            } "dLoginImgs"`}
                        >
                          <h5>Day {item.dayNo}</h5>
                          <div className="row">
                            <div className="col-2 ml-1">
                              <img src={coin} alt="coin" className="h-50"></img>
                              <h5 className="text-center">{item.coinsLimt}</h5>
                            </div>
                            <div className="col-1">
                              {this.rewardCollected(item.dayNo) && (
                                <img
                                  className="h-50 w-50"
                                  alt="golden"
                                  src={golden}
                                ></img>
                              )}
                            </div>

                            <div className="col-2">
                              <img src={diamond} alt="diamond"></img>
                              <h5 className="text-center">
                                {item.crystalLimit}
                              </h5>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            )}
            <div>
              <h5 className="fs-14 mb-1 mt-0">Special Bounty in 14 days!</h5>
              <h5 className="fs-14 mb-0">
                Rank up for more rewards. Your next rank-
                <span>{this.state.nextRank.rankname}</span>
              </h5>
              <button
                type="button"
                className={
                  this.state.selectedDay
                    ? "img_btn"
                    : "img_btn_brown btn-w125 btn-h64"
                }
                onClick={() => this.claimReward()}
              >
                Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DailyLogin;
