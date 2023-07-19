import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../../commonUtils/PrivateRoute";
import Home from "../../components/home/DailyLogin";
import Landingpage from "../../components/landingpage.jsx/Landingpage";
import Header from "../header/Header";
import HowToPlay from "../../components/howtoplay/HowToPlay";
import LearningTraven from "../../components/learningtraven/LearningTraven";
import RoadMaps from "../../components/roadmaps/RoadMaps";
import Goals from "../../components/goals/Goals";
import ContactUs from "../../components/contactus/ContactUs";
import sProfile from "../../assets/images/user_1.svg";
import hand from "../../assets/images/hand.svg";
import coin from "../../assets/images/coin_1.svg";
import coins from "../../assets/images/coins_new.svg";
import crystal from "../../assets/images/crystal.svg";
import crystals from "../../assets/images/crystals.png";
import logo from "../../assets/images/logo.svg";
import progress from "../../assets/images/progress_small.svg";
import progressLg from "../../assets/images/progress_lg.png";
import progressRed from "../../assets/images/progress_red.svg";
import queen from "../../assets/images/queen.svg";
import insta from "../../assets/images/instgram.svg";
import fb from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/t.svg";
import Pintrest from "../../assets/images/P.svg";
import crown from "../../assets/images/crown.svg";
import cup from "../../assets/images/gold_cup.svg";
import achievements from "../../assets/images/achievements.png";
import coinsFrm from "../../assets/images/coins_frame.png";
import crystalFrm from "../../assets/images/crystal_frame.png";
import sunFrm from "../../assets/images/sun_coin_frame.png";
import sunCoin from "../../assets/images/sun_coin.png";
import star from "../../assets/images/star_coin.png";
import queenCoin from "../../assets/images/queen_coin.png";
import groupCoin from "../../assets/images/group_coins.png";
import crystalCoin from "../../assets/images/crystal_coin.png";
import compassCoin from "../../assets/images/compass_coin.png";
import liquidCoin from "../../assets/images/liquid_coin.png";
import bagCoin from "../../assets/images/bag_coin.png";
import magicCoin from "../../assets/images/magic_coin.png";
import gostCoin from "../../assets/images/gost_coin.png";
import letterCoin from "../../assets/images/letter_coin.png";
import AchivementServices from "../../services/AchivementServices";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import close from "../../assets/images/close_ic.svg";
import diamond from "../../assets/images/diamonds.png";
import golden from "../../assets/images/golden-tick.svg";
import QuestServices from "../../services/QuestServices";
import TreasureQuest from "../../components/Quest/TreasureQuest";
import DailyQuest from "../../components/Quest/DailyQuest";
import Login from "../../components/login/Login";
import HailHero from "../../components/howtoplay/HailHero";
import DailyLogin from "../../components/home/DailyLogin";
import Charecter from '../../components/charecter/Charecter'
import ProgressBar from "@ramonak/react-progress-bar";
import Modals from "../../commonUtils/Modals";
import Carousel from "react-bootstrap/Carousel";
import Popups from './PopupModel.json';
import treasure from '../../assets/images/treasure.png'
import bag from '../../assets/images/bag.png'
import crystalTreasure from '../../assets/images/crystalTreasure.png'
import Store from "./Store";
import Bars from "../../commonUtils/Bars";

class Layout extends Component {
  constructor(props) {
    super(props);
    //console.log("parent",props);
    this.state = {
      styles: {
        contentDiv: {
          display: "flex",
        },
        headerTitle: "mystika ",
        subHeaderList: "",
      },
      userData: {},
      rewardsData: {},
      openAchivementPop: false,
      userAchivements: {},
      allAchivemets: [],
      enableAchivements: [],
      treasureChest: [],
      isOpenTreQuest: false,
      isOpenDailyQuest: false,
      toDayQuest: [],
      timeUp: false,
      min: 0,
      sec: 0,
      buttonName: "",
      rankname: "",
      needHelp: false,
      isOpenDailyLogin: false,
      heroPage: "MAP",
      storePopup: false
    };
    this.navigateRoute = this.navigateRoute.bind(this);
    this.goToAchievements = this.goToAchievements.bind(this);
    this.claimReward = this.claimReward.bind(this);
    // this.getAllTresureQuest = this.getAllTresureQuest.bind(this);
    this.continueTime = this.continueTime.bind(this);
    this.getToTresureQuest = this.getToTresureQuest.bind(this);
    this.gotoDailyQuest = this.gotoDailyQuest.bind(this);
    this.claimTreasureQuest = this.claimTreasureQuest.bind(this);
  }
  componentWillMount() {
    const data = JSON.parse(sessionStorage.getItem("dailyLogin"));
    const rewards = JSON.parse(sessionStorage.getItem("totalDailyLogin"));
    const userAchivements = rewards.achivementStats;
    const enableAchivements = rewards.achivements;
    this.state.treasureChest.push(rewards?.treasureChest)
    const userRank = rewards?.userCharacterList[0]?.chCurrentRank?.rankname
    const url = new URL(window.location.href);
    const endPath = url.pathname.split('/').pop();
    // alert(endPath)
    this.navigationButtons(endPath)
    this.setState(
      {
        userData: data,
        rewardsData: rewards,
        userAchivements: userAchivements,
        enableAchivements: enableAchivements,
        treasureChest: this.state.treasureChest,
        toDayQuest: rewards?.todaysQuests,
        rankname: userRank,
        chAttributes: data?.chAttributes
      },
      () => {
        console.log({ data })
        console.log("userId", rewards.userId);
        this.setState(
          {
            min: this.state.treasureChest[0]?.duration,
            sec: 0,
          },
          () => {
            this.continueTime();
          }
        );
      }
    );
  }

  claimTreasureQuest(TcId) {
    this.setState({ isOpenTreQuest: false })
    alert(TcId)
    QuestServices.updatedTChestStatus(TcId).then((res) => {
      console.log("res", res);
    });
  }
  claimDailyQuestRewards() {
    this.hideDQpop()
    QuestServices.claimDailyQuestRewards().then((res) => {
      console.log({ res })
    });
  }

  getToTresureQuest() {
    if (this.state.timeUp) {
      this.setState({ isOpenTreQuest: true });
    }
  }
  gotoDailyQuest() {
    this.setState({ isOpenDailyQuest: true }, () => {
      console.log("==========================");
    });
  }

  openDailyLogin = () => {
    this.props.history.push("/dailylogin")
  }

  continueTime() {
    this.timerInterval = setInterval(() => {
      const { min, sec } = this.state;
      if (sec === 0) {
        if (min === 0) {
          clearInterval(this.timerInterval);
          this.setState({ timeUp: true });
        } else {
          this.setState({ min: min - 1, sec: 59 }, () => { });
        }
      } else {
        this.setState({ sec: sec - 1 }, () => { });
      }
    }, 1000);
  }

  navigationButtons(path) {
    let route = ""
    if (path === "howtoplay") {
      route = "PLAY"
    } else if (path === "learningtraven") {
      route = "LEARNING"
    } else if (path === "roadmaps") {
      route = "ROADMAP"
    } else if (path === "goals") {
      route = "GOALS"
    } else if (path === "charecter") {
      route = "CHARECTER"
    } else if (path === "contactus") {
      route = "CONTACTUS"
    } else if (path === "landingpage") {
      route = "MAP"
    }
    this.setState({ buttonName: route })
  }

  navigateRoute(value) {
    if (value === "PLAY") {
      this.props.history.push("/howtoplay");
      // window.location.reload();
    } else if (value === "LEARNING") {
      this.props.history.push("/learningtraven");
    } else if (value === "ROADMAP") {
      this.props.history.push("/roadmaps");
    } else if (value === "GOALS") {
      this.props.history.push("/goals");
    } else if (value === "CHARECTER") {
      this.props.history.push("/charecter");
    } else if (value === "CONTACTUS") {
      this.props.history.push("/contactus");
    } else if (value === "") {
      this.props.history.push("/")
    } else if (value === "MAP") {
      this.props.history.push("/landingpage")
    }
    window.location.reload();
  }

  hideTQpop = () => {
    this.setState({ isOpenTreQuest: false });
  };

  hideDQpop = () => {
    this.setState({ isOpenDailyQuest: false });
  };

  goToAchievements() {
    this.setState({ openAchivementPop: true }, () => {
      this.getAllAchivement();
    });
  }
  closeAchievements = () => {
    this.setState({ openAchivementPop: false })
  }
  getAllAchivement() {
    AchivementServices.getAlLAchivements().then((res) => {
      this.setState({ allAchivemets: res.data }, () => {
        this.state.allAchivemets.forEach((ele) => {
          ele.enable = false;
          if (this.state.enableAchivements.length > 0) {
            this.state.enableAchivements.forEach((item) => {
              if (ele.achivementId === item.enableAchivements) {
                ele.enable = true;
              }
            });
          }
        });
      });
    });
  }

  claimReward(achivementId) {
    AchivementServices.claimReward(
      this.state.userData.userCharacterId,
      achivementId
    ).then((res) => { });
  }

  openQuest() {
    this.setState({ isOpenDailyQuest: true })
  }

  navigateScreens = (name) => {
    this.navigateRoute(name)
  }

  openTutorial = () => {
    this.setState({ needHelp: !this.state.needHelp })
    if (this.state.heroPage === "PLAY") {
    }
  }

  openStore = () => {
    // alert(this.state.storePopup)
    this.setState({ storePopup: !this.state.storePopup })
  }

  render() {
    const { buttonName } = this.state
    return (
      <Router>
        <div className="w-100">
          <div className="header">
            <div className="w-100">
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
                          <label>{this.state.userData.userName} !</label>
                        </div>
                      </li>
                      <li>
                        <img src={coin}></img>
                        <div className="content">
                          <span>Coins</span>{" "}
                          <label className="fs-18">
                            {this.state.rewardsData.rewards.coinsCount}
                          </label>
                        </div>
                      </li>
                      <li>
                        <img src={crystals}></img>
                        <div className="content">
                          <span>Crystals</span>{" "}
                          <label className="fs-18">
                            {this.state.rewardsData.rewards.crystalsCount}
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Modal isOpen={this.state.openAchivementPop}>
                      <div className="modal-header text-black-sec font-bold">Achievements</div>
                      <button
                        type="button"
                        className="close_btn"
                        onClick={() => this.closeAchievements()}
                      >
                        <img src={close}></img>
                      </button>
                      <div className="modal-body frame text-center modal-body-scroll">
                        <div className="ach">
                          <div className="achiev-head">
                            <div className="achiev-head-left">
                              <img src={achievements}></img>
                            </div>
                            <div className="achiev-head-right">
                              <p>Track your epic progress and earn rewards for <br></br>your brave accomplishments here.</p>
                            </div>
                          </div>
                        </div>
                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={sunCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Master Leaner</h5>
                              <label>Earn 10000 XP</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={30} />
                                </div>
                                <label className="text-white fs-13">30/10000 XP</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={star}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Zen Adventurer</h5>
                              <label>Reach level 50 with a Character</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={2} />
                                </div>
                                <label className="text-white fs-13">2/50</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={queenCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Exuberant hustler</h5>
                              <label>Reach Exemplar rank with all characters</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={1} />
                                </div>
                                <label className="text-white fs-13">1/3</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>


                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={groupCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Treasure hunter</h5>
                              <label>Earn 5000 coins</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={8} />
                                </div>
                                <label className="text-white fs-13">8/50000</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={crystalCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Gem collector</h5>
                              <label>Earn 500 coins</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={8} />
                                </div>
                                <label className="text-white fs-13">8/500</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>


                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={compassCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Legendary explorer</h5>
                              <label>Explore all areas in the map</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={3 / 9} />
                                </div>
                                <label className="text-white fs-13">3/9</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>


                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={bagCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Travel Marvel</h5>
                              <label>Travel to all the areas in the map</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={2} />
                                </div>
                                <label className="text-white fs-13">2/9</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>




                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={liquidCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Master of Elements</h5>
                              <label>Win 100 elements battles</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={3} />
                                </div>
                                <label className="text-white fs-13">8/50</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>




                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={magicCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Flawless Goal-seeker</h5>
                              <label>Complete 100 goal cards</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={3} />
                                </div>
                                <label className="text-white fs-13">8/100</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>



                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={magicCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Fierce Claw</h5>
                              <label>Defeat 100 enemies</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={3} />
                                </div>
                                <label className="text-white fs-13">5/100</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>



                        <div className="achiev">
                          <div className="achiev-left">
                            <img src={magicCoin}></img>
                          </div>
                          <div className="achiev-right">
                            <div className="frame">
                              <h5>Epic Quester</h5>
                              <label>Complete 50 daily quests</label>
                              <div className="progres text-center pl-5 pr-5">
                                <div className="bar">
                                  <Bars size={"lg"} completed={3} />
                                </div>
                                <label className="text-white fs-13">5/50</label>
                              </div>
                              <ul>
                                <li>
                                  <img src={coinsFrm}></img>
                                  <label>20</label>
                                </li>
                                <li>
                                  <img src={crystalFrm}></img>
                                  <label>10</label>
                                </li>
                                <li>
                                  <img src={sunFrm}></img>
                                  <label>10</label>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="img_btn_home"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        </div>




                        {/* <h4 className="">
          
            </h4> */}

                        <div className="col text-center">
                          <div className="day-list">
                            {/* <ul>
                              {this.state.allAchivemets.map((item, index) => {
                                return (
                                  <li
                                    className={!item.enable ? "grey_out" : ""}
                                  >
                                    <h5>({item.achivementName})</h5>
                                    <h5>({item.achivementDescription})</h5>
                                    {item.parameter === "COINS" ? (
                                      <span>
                                        {this.state.userAchivements.earnedCoins}
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "CRYSTALS" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .earnedCrystals
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "EXPLORED_AREAS" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .maxNoOfExploreAllAreasInMap
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "LEVEL" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .maxNoOfExploreAllAreasInMap
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "RANK" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .maxRankForExuberantHustlerl
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "TRAVELD_AREAS" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .maxNoOfTravelAllAreasInMap
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "ELEMENT_BATTLES" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .noOfElementWins
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "ENEMIES" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .noOfDefetedEnemies
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "HEALTH_POTIONS" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .noOfHealtheProtionsUsed
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "DAILY_QUESTS" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .noOfDailyQuestsCompleted
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "TREASURE_CHEST" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .noOfTimesTreasureChestOpened
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "LOGIN_HOURS" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .firstLoggedInTime
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {item.parameter === "GOALS" ? (
                                      <span>
                                        {
                                          this.state.userAchivements
                                            .noOfCompletedGoalCrads
                                        }
                                        /{item.maxValue}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    <button
                                      type="button"
                                      // className="img_btn_home"
                                      className={
                                        item.enable
                                          ? "img_btn"
                                          : "img_btn_brown btn-w125 btn-h64"
                                      }
                                      onClick={() =>
                                        this.claimReward(item.achivementId)
                                      }
                                    >
                                      submit
                                    </button>
                                  </li>
                                );
                              })}
                            </ul> */}
                          </div>
                        </div>

                        {/* <button
                  className="btn btn-bdr active fs-12"
                  onClick={this.hideCharcterpop}
                >
                  Cancel
                </button> */}
                      </div>

                      {/* <h4 className="">
                        
                          </h4> */}

                      {/* <button
                              type="button"
                              className="img_btn_home"
                            >
                              submit
                            </button> */}
                    </Modal>
                  </div>
                  <div className="text-white header-right">
                    <div className="logo">
                      <img src={logo}></img>
                    </div>
                    <ul className="mb-0">
                      <li className="progress-relative hdr_top">
                        <h5 className="fs-14 mb-0">Life Bar</h5>
                        <div className="lifeBar">
                          <ProgressBar completed={this.state.chAttributes.currentLife} isLabelVisible={false} height="10px" bgColor="#BD2908" width="190px" className="bars" animateOnRender={true} />
                        </div>
                        {/* <img src={progressRed} className="w-progress progressRed"></img> */}
                        <h5 className="fs-14 mt-2">{this.state.chAttributes.currentLife + "/" + this.state.chAttributes.maxLife}</h5>
                      </li>
                      <li className="text-center">
                        <img src={sProfile} className="prof"></img>
                        <button type="button" className="img_btn_home" onClick={() => this.openDailyLogin()}>
                          Daily Login
                        </button>
                        <span className="dropdown">
                          {/* <button className="ml-2 img_btn_brown dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Daily Quest
                    </button> */}
                          <button
                            type="button"
                            className="img_btn_brown"
                            onClick={() => this.gotoDailyQuest()}
                          >
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
                        {/* <div className="joyBar">
                          <ProgressBar completed={50} isLabelVisible={false} height="10px" bgColor="#7FC31C" width="190px" className="bars" animateOnRender={true} />
                        </div> */}
                        <Bars completed={50} />
                        {/* <img src={progress} className="w-progress"></img> */}
                        <h5 className="fs-14 mt-2">0/200</h5>
                        <h5 className="fs-14">Class: Warrior</h5>
                        <h5 className="fs-14">
                          Rank: {this.state.rankname}
                        </h5>
                      </li>
                      <li className="">
                        <div className="coin_box text-left">
                          <img
                            src={coins}
                            alt={coins}
                            onClick={() => {
                              this.getToTresureQuest();
                            }}
                          ></img>
                          <h5 className="fs-16 mb-0 w-progress pl-3">
                            {this.state.min}:
                            {this.state.sec < 10
                              ? "0" + this.state.sec
                              : this.state.sec}
                          </h5>
                        </div>
                        <div className="coin_box text-left">
                          <img src={crystal}
                            alt={crystal}
                            onClick={() => {
                              this.openStore()
                            }}
                          ></img>
                          <h5 className="fs-14 mb-0 w-progress pl-3">Store</h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="main-leftP">
                  <div className="rect">
                    <ul>
                      <li>
                        <button
                          className={`img_btn_trans ${this.state.buttonName === "MAP" ? 'activeBtn' : ''}`}
                          type="button"
                          onClick={() => this.navigateScreens("MAP")}
                        >
                          Map
                        </button>
                      </li>
                      <li>
                        <button
                          className={`img_btn_trans ${this.state.buttonName === "PLAY" ? 'activeBtn' : ''}`}
                          type="button"
                          onClick={() => this.navigateScreens("PLAY")}
                        >
                          How To Play
                        </button>
                      </li>
                      <li>
                        <button
                          className={`img_btn_trans ${this.state.buttonName === "LEARNING" ? 'activeBtn' : ''}`}
                          type="button"
                          onClick={() => this.navigateScreens("LEARNING")}
                        >
                          Learning Tavern
                        </button>
                      </li>
                      {/* <li>
                        <button
                          className={`img_btn_trans ${this.state.buttonName === "" ? 'activeBtn' : ''}`}
                          type="button"
                          onClick={() => this.navigateScreens("ROADMAP")}
                        >
                          Roadmaps
                        </button>
                      </li> */}
                      <li>
                        <button
                          className={`img_btn_trans ${this.state.buttonName === "GOALS" ? 'activeBtn' : ''}`}
                          type="button"
                          onClick={() => this.navigateScreens("GOALS")}
                        >
                          Goals
                        </button>
                      </li>
                      <li>
                        <button
                          className={`img_btn_trans ${this.state.buttonName === "CHARECTER" ? 'activeBtn' : ''}`}
                          type="button"
                          onClick={() => this.navigateScreens("CHARECTER")}
                        >
                          Character
                        </button>
                      </li>
                      <li>
                        <button
                          className={`img_btn_trans ${this.state.buttonName === "CONTACTUS" ? 'activeBtn' : ''}`}
                          type="button"
                          onClick={() => this.navigateScreens("CONTACTUS")}
                        >
                          Contact Us
                        </button>
                      </li>
                      <li>
                        <button
                          className={`img_btn_trans ${this.state.buttonName === "LOGOUT" ? 'activeBtn' : ''}`}
                          type="button"
                          onClick={() => this.navigateScreens("")}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                    <div className="social">
                      <button type="button" className="img_btn_social">
                        <img src={insta}></img>
                      </button>
                      <button type="button" className="img_btn_social">
                        <img src={fb}></img>
                      </button>
                      <button type="button" className="img_btn_social">
                        <img src={twitter}></img>
                      </button>
                      <button type="button" className="img_btn_social">
                        <img src={Pintrest}></img>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="main-rightP text-center">
                  <div className=" prf">
                    <img className="" onClick={() => this.openTutorial()} src={queen} alt={queen}></img>
                  </div>
                  <div className="sqr_frame mt-4 cursor">
                    <img
                      className="pt-3"
                      src={cup}
                      alt={cup}
                      onClick={this.goToAchievements}
                    ></img>
                  </div>
                  <h5 className="mt-2">Achievements</h5>
                  <div className="sqr_frame mt-4 cursor">
                    <img className="" src={crown} alt={crown}></img>
                  </div>
                  <h5 className="mt-2">Leaderboards</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="mainbody">
            <div style={this.state.styles.contentMargin}>
              <Switch>
                <Route
                  path="/landingpage"
                  exact={true}
                  component={Landingpage}
                />
                <Route path="/howtoplay" exact={true} component={HowToPlay} />
                <Route
                  path="/learningtraven"
                  exact={true}
                  component={LearningTraven}
                />
                <Route path="/roadmaps" exact={true} component={RoadMaps} />
                <Route path="/goals" exact={true} component={Goals} />
                <Route path="/charecter" exact={true} component={Charecter} />
                <Route path="/contactus" exact={true} component={ContactUs} />
                <Route path="/" exact={true} component={Login} />
              </Switch>

            </div>
          </div>
          {this.state.isOpenTreQuest && (
            <TreasureQuest
              treasureChest={this.state.treasureChest}
              hideTQpop={this.hideTQpop}
              claimTreasureQuest={this.claimTreasureQuest}
            />
          )}
          {/* {this.state.needHelp && (
            <HailHero
              hidePop={this.openTutorial}
            />
          )} */}
          <Store openModel={this.state.storePopup} openStore={() => this.openStore()} />
          <Modals
            open={this.state.needHelp}
            header={
              <div>
                {Popups?.map((item, index) => {
                  const learning =
                    buttonName === "LEARNING" ? item.LEARNING :
                      buttonName === "MAP" ? item.MAP :
                        buttonName === "CHARECTER" ? item.CHARECTER : item.PLAY
                  return (
                    <h5 key={index}>{learning.head}</h5>
                  )
                })}
                <button
                  type="button"
                  className="close_btn"
                  onClick={this.openTutorial}
                >
                  <img src={close} alt={close}></img>
                </button>
              </div>
            }
            body={
              <div className="modal-body frame text-center hailHero">
                {Popups?.map((item, index) => {
                  const learning =
                    buttonName === "LEARNING" ? item.LEARNING :
                      buttonName === "MAP" ? item.MAP :
                        buttonName === "CHARECTER" ? item.CHARECTER : item.PLAY
                  return (
                    <div key={index}>
                      <h4 className="text-green" >{learning?.body.heading}</h4>
                      <Carousel>
                        <Carousel.Item>
                          <span className="text-light">{learning?.body.text}</span>
                        </Carousel.Item>
                        <Carousel.Item>
                          <span className="text-light">{learning?.body.text2}</span>
                        </Carousel.Item>
                        <Carousel.Item>
                          <span className="text-light">{learning?.body.text3}</span>
                          {learning?.body?.text4 ? learning.body.text4 : ''}
                        </Carousel.Item>
                      </Carousel>
                      <button
                        type="button"
                        className="img_btn_home"
                        onClick={this.openTutorial}
                      >
                        Delighted
                      </button>
                    </div>
                  )
                })}
              </div>
            }
          />
          {this.state.isOpenDailyQuest && (
            <DailyQuest
              toDayQuest={this.state.toDayQuest}
              hideDQpop={this.hideDQpop}
              claimDailyQuestRewards={this.claimDailyQuestRewards}
            />
          )}
        </div>
      </Router>
      // <div>
      //     <h1>layout</h1>
      // </div>
    );
  }
}

export default Layout;
