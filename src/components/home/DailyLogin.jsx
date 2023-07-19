import React, { Component } from "react";
import close from "../../assets/images/close_ic.svg";
import progress from "../../assets/images/progress_bar.svg";
import coinbox from "../../assets/images/coin_box.svg";
import coin from "../../assets/images/coins.png";
import diamond from "../../assets/images/diamonds.png";
import golden from "../../assets/images/golden-tick.svg";
import BountyServices from "../../services/BountyServices";


class DailyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      bountyList: [],
      selectedDay: "",
      nextRank: {},
      characterRewardList: [],
      userCharId: '',
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
    this.setState({ selectedDay: dayDetails.dayNo, userCharId: this.state.characterRewardList?.userCharacterId }, () => {

    });
  }
  getBounty(userName) {
    let obj = []
    BountyServices.getbounty(userName).then((res) => {
      res.data.userCharacterList.forEach((ele) => {

        if (ele.active === true) {
          console.log('ele', ele)
          this.setState({ characterRewardList: ele }, () => {
            obj = ele
          })

        }
      })
      this.setState({
        // characterRewardList:res.data,
        dailyRewards: res.data
      }, () => {
        console.log('this.state.bountyList.rewards.dailyRewards[0].rewardCollected', res.data.rewards.dailyRewards[0].rewardCollected)
        console.log('obj', res.data)
        if (res.data.rewards.dailyRewards[0].rewardCollected) {
          this.props.history.push("/welcomebackscreen");
        }
        sessionStorage.setItem("dailyLogin", JSON.stringify(obj));
        sessionStorage.setItem('totalDailyLogin', JSON.stringify(res.data))
      });

    });
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
      BountyServices.postuserBounty(obj).then((res) => {
        if (res) {
          this.props.history.push("/welcomebackscreen");
        }
      });
    }
    // this.props.history.push("/welcomebackscreen");
  }
  render() {
    return (
      <div className="logo-head-text">
        <label className="mb-0 mt-2">hi {this.state.userName} !</label>
        <h5 className="mb-0">Daily Login Bounty </h5>
        <div className="login pad-l-6 pad-r-6">
          <div className="header">Apprentice</div>
          <button type="button" onClick={this.navToHome} className="close_btn">
            <img src={close} alt={close}></img>
          </button>
          <div className="ht_scroll m-n20">
            <div className="row p-l-1 p-r-1">
              <divc className="col-8">
                <h5 className="text-left mb-0 fs-12">Streak</h5>
                <h5 className="text-left mb-0 fs-12">Bounty</h5>
              </divc>
              <div className="col-4 text-right p-r-0 coin_box-m">
                <img
                  src={coinbox}
                  alt={coinbox}
                  className="cursor img-fluid w-40 m-r-2"
                ></img>
              </div>
            </div>
            <div className="p-l-1 p-r-1">
              <img src={progress} className="img-fluid"></img>
            </div>
            {console.log('this.state.characterRewardList', this.state.characterRewardList.chCurrentRank)}
            {this.state.characterRewardList && (

              <div className="day-list">
                <ul>
                  {this.state.characterRewardList?.chCurrentRank?.daywiseRules.map(
                    (item, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => this.getDayDetails(item)}
                          className={(item.rewardCollected || (item.id === this.state.selectedDay)) ? "grey_out" : ""}
                        >
                          <h5>({item.dayNo})</h5>
                          <div className="row">
                            <div className="col-4">
                              <img src={coin}></img>

                              <h5>{item.coinsLimt}</h5>
                            </div>
                            <div className="col-1">
                              {item.rewardCollected && <img src={golden}></img>}
                            </div>

                            <div className="col-4">
                              <img src={diamond}></img>
                              <h5>{item.crystalLimit}</h5>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <h5 className="fs-14 mb-1 mt-0">Special Bounty in 14 days!</h5>
        <h5 className="fs-14 mb-0">
          Rank up for more rewards. Your next rank-
          <span>{this.state.nextRank.rankname}</span>
        </h5>
        <button
          type="button"
          className={this.state.selectedDay ? "img_btn" : "img_btn_brown btn-w125 btn-h64"}
          onClick={() => this.claimReward()}
        >
          Claim
        </button>
      </div>
    );
  }
}

export default DailyLogin;
