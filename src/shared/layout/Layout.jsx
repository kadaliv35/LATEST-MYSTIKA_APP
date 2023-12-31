import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landingpage from "../../components/landingpage.jsx/Landingpage";
import HowToPlay from "../../components/howtoplay/HowToPlay";
import LearningTraven from "../../components/learningtraven/LearningTraven";
import RoadMaps from "../../components/roadmaps/RoadMaps";
import Goals from "../../components/goals/Goals";
import ContactUs from "../../components/contactus/ContactUs";
import hand from "../../assets/images/hand.svg";
import coin from "../../assets/images/coin_1.svg";
import coins from "../../assets/images/coins_new.svg";
import crystal from "../../assets/images/crystal.svg";
import crystals from "../../assets/images/crystals.png";
import logo from "../../assets/images/logo.svg";
import queen from "../../assets/images/queen.svg";
import insta from "../../assets/images/instgram.svg";
import fb from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/t.svg";
import Pintrest from "../../assets/images/P.svg";
import crown from "../../assets/images/crown.svg";
import cup from "../../assets/images/gold_cup.svg";
import AchivementServices from "../../services/AchivementServices";
import close from "../../assets/images/close_ic.svg";
import QuestServices from "../../services/QuestServices";
import TreasureQuest from "../../components/Quest/TreasureQuest";
import DailyQuest from "../../components/Quest/DailyQuest";
import Login from "../../components/login/Login";
import Charecter from "../../components/charecter/Charecter";
import ProgressBar from "@ramonak/react-progress-bar";
import Modals from "../../commonUtils/Modals";
import Carousel from "react-bootstrap/Carousel";
import Popups from "./PopupModel.json";
import Store from "./Store";
import Bars from "../../commonUtils/Bars";
import Achievements from "./Achievements";
import creadituser from "../../assets/images/creditsuser.png";
import vector from "../../assets/images/Vector.png";
import TermsC from "../../assets/images/terms&c.png";
// import themeMusic from "https://mystikauistuff.s3.ap-northeast-1.amazonaws.com/audio.mp3";
import LeaderBoards from "./LeaderBoards";
import warrior from "../../assets/images/char_warrior.png";
import archangel from "../../assets/images/char_archangel.png";
import assassin from "../../assets/images/char_assassin.png";
import lifebuy from "../../assets/images/red.png";
import dsblifebuy from "../../assets/images/gray.png";

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
      storePopup: false,
      leaderPopup: false,
      mapLeads: false,
      ldType: "daily",
      settingsOpen: false,
      termsConditions: false,
      audioPlay: false,
      lifeBuy: false,
      userRankOrder: 0,
      openCredits: false,
    };
    this.navigateRoute = this.navigateRoute.bind(this);
    this.goToAchievements = this.goToAchievements.bind(this);
    this.claimReward = this.claimReward.bind(this);
    // this.getAllTresureQuest = this.getAllTresureQuest.bind(this);
    this.continueTime = this.continueTime.bind(this);
    this.getToTresureQuest = this.getToTresureQuest.bind(this);
    this.gotoDailyQuest = this.gotoDailyQuest.bind(this);
    this.claimTreasureQuest = this.claimTreasureQuest.bind(this);
    this.achievementsChest = this.achievementsChest.bind(this);
    this.getAllAchivement = this.getAllAchivement.bind(this);
  }
  componentWillMount() {
    const data = JSON.parse(sessionStorage.getItem("dailyLogin"));
    const rewards = JSON.parse(sessionStorage.getItem("totalDailyLogin"));
    const audio = sessionStorage.getItem("audioPlay");
    const userAchivements = rewards.achivementStats;
    const enableAchivements = rewards.achivements;
    this.state.treasureChest.push(rewards?.treasureChest);
    const userRank = rewards?.userCharacterList[0]?.chCurrentRank?.rankname;

    const url = new URL(window.location.href);
    const endPath = url.pathname.split("/").pop();
    // alert(endPath)
    console.log({ data, rewards });
    this.navigationButtons(endPath);
    let i = rewards?.userCharacterList?.findIndex((x) => x.active === true);
    const user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(user["sub"])
    let username = user["sub"];
    this.setState({ userName: username });

    // alert(audio)
    let rankOrder = rewards?.userCharacterList[i].chCurrentRank?.rankOrder;
    this.setState(
      {
        userData: data,
        rewardsData: rewards,
        userAchivements: userAchivements,
        enableAchivements: enableAchivements,
        treasureChest: this.state.treasureChest,
        toDayQuest: rewards?.todaysQuests,
        rankname: userRank,
        chAttributes: data?.chAttributes,
        xpPoints: rewards?.userCharacterList[i].xpPoints,
        xpPointsTotal: rewards?.userCharacterList[i].finalXpPoints,
        userCharacterList: rewards?.userCharacterList,
        userId: rewards.userId,
        audioPlay: audio,
        usedPortionCount:
          rewards?.userCharacterList[i].userHealthPortionUtilityCount,
      },
      () => {
        console.log({ data, rewards });
        console.log("userId", rewards.userId);
        console.log(rewards?.userCharacterList[i], "RankOrder", { rankOrder });
        this.getPortionCoins(rankOrder);
        this.setState(
          {
            min: this.state.treasureChest[0]?.duration,
            sec: 0,
          },
          () => {
            this.state.userCharacterList
              .filter((item) => item.active === true)
              .map((item) => {
                return this.setState({
                  charRole: item.charecterId.characterName,
                  userRankOrder: item.chCurrentRank.rankOrder,
                });
              });
            this.continueTime();
            this.getHealthDetails();
          }
        );
      }
    );
  }

  getHealthDetails() {
    if (
      this.state.rewardsData.rewards.coinsCount > 100 &&
      this.state.usedPortionCount < this.state.maxPotionCount
    ) {
      this.setState({ lifeBuy: true });
    }
  }

  claimTreasureQuest(TcId) {
    this.setState({ isOpenTreQuest: false });
    // alert(TcId)
    QuestServices.updatedTChestStatus(this.state.userId, TcId)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.error(err));
  }

  achievementsChest(TcId) { }

  claimDailyQuestRewards() {
    this.hideDQpop();
    QuestServices.claimDailyQuestRewards()
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.error(err));
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
    this.props.history.push("/dailylogin");
  };

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
    let route = "";
    if (path === "howtoplay") {
      route = "PLAY";
    } else if (path === "learningtraven") {
      route = "LEARNING";
    } else if (path === "roadmaps") {
      route = "ROADMAP";
    } else if (path === "goals") {
      route = "GOALS";
    } else if (path === "charecter") {
      route = "CHARECTER";
    } else if (path === "contactus") {
      route = "CONTACTUS";
    } else if (path === "landingpage") {
      route = "MAP";
    }
    this.setState({ buttonName: route });
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
      this.props.history.push("/");
    } else if (value === "MAP") {
      this.props.history.push("/landingpage");
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
    this.setState({ openAchivementPop: false });
  };
  getAllAchivement() {
    AchivementServices.getAlLAchivements()
      .then((res) => {
        console.log(res.data, "Achievements");
        this.setState({ allAchivemets: res.data }, () => { });
      })
      .catch((err) => console.error(err));
  }

  claimReward(achivementId) {
    AchivementServices.claimReward(
      this.state.userData.userCharacterId,
      achivementId
    )
      .then((res) => { })
      .catch((err) => console.error(err));
  }

  getPortionCoins(rankOrder) {
    AchivementServices.getPortionCoins(rankOrder)
      .then((res) => {
        console.log({ res });
        this.setState({ maxPotionCount: res.data.utilityLimit });
      })
      .catch((err) => console.error({ err }));
  }

  openQuest() {
    this.setState({ isOpenDailyQuest: true });
  }

  navigateScreens = (name) => {
    this.navigateRoute(name);
  };

  openTutorial = () => {
    this.setState({ needHelp: !this.state.needHelp });
    if (this.state.heroPage === "PLAY") {
    }
  };

  openStore = () => {
    this.setState({ storePopup: !this.state.storePopup });
  };

  openLeaderboards = (type) => {
    this.setState({ leaderPopup: !this.state.leaderPopup }, () => {
      if (type === "close") {
        this.setState({ mapLeads: false });
      }
    });
  };

  openLeadMap = () => {
    this.setState({ mapLeads: true });
  };

  ldBoards = (type) => {
    this.setState({ ldType: type });
  };

  settingsFunction() {
    this.setState({ settingsOpen: !this.state.settingsOpen });
  }

  openTermsCond() {
    this.setState({ termsConditions: !this.state.termsConditions });
  }

  playMusic() {
    this.setState({ audioPlay: !this.state.audioPlay }, () => {
      sessionStorage.setItem("audioPlay", this.state.audioPlay);
    });
  }

  increaseHealt() {
    if (
      this.state.maxPotionCount > this.state.usedPortionCount &&
      this.state.rewardsData.rewards.coinsCount > 100
    ) {
      AchivementServices.buyPotionCoins(this.state.userData.userCharacterId)
        .then((res) => {
          console.log({ res });
        })
        .catch((err) => console.error({ err }));
    } else {
      alert("Please make sure you have enough gold coins");
    }
  }

  render() {
    const { buttonName } = this.state;
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
                        <img 
                          className="logo"
                          src={
                            this.state.charRole === "Warrior"
                              ? warrior
                              : this.state.charRole === "Assassin"
                                ? assassin
                                : archangel
                          }
                          alt="player-charector"
                        ></img>
                        <div className="content">
                          <span>
                            Hi <img  src={hand} alt="hand"></img>
                          </span>{" "}
                          <label>{this.state.userName} !</label>
                        </div>
                      </li>
                      <li className="header-left-inventory">
                        <li>
                          <img  src={coin} alt="coin"></img>
                          <div className="content">
                            <span>Coins</span>{" "}
                            <label className="fs-18">
                              {this.state.rewardsData.rewards.coinsCount}
                            </label>
                          </div>
                        </li>
                        <li>
                          <img  src={crystals} alt="crystal"></img>
                          <div className="content">
                            <span>Crystals</span>{" "}
                            <label className="fs-18">
                              {this.state.rewardsData.rewards.crystalsCount}
                            </label>
                          </div>
                        </li>
                      </li>
                    </ul>
                  </div>
                  <Achievements
                    data={this.state.allAchivemets}
                    open={this.state.openAchivementPop}
                    close={() => this.closeAchievements()}
                  />
                  <div className="text-white header-right">
                    <div className="logo">
                      <img  src={logo} alt="logo"></img>
                    </div>
                    <ul className="mb-0">
                      <li className="progress-relative hdr_top">
                        <h5 className="fs-14 mb-0">Life Bar</h5>
                        <div className="lifeBar">
                          <ProgressBar
                            completed={
                              this.state.chAttributes?.currentLife
                                ? this.state.chAttributes?.currentLife
                                : 0
                            }
                            maxCompleted={this.state.chAttributes?.maxLife}
                            isLabelVisible={false}
                            height="10px"
                            bgColor="#BD2908"
                            width="190px"
                            className="bars"
                            animateOnRender={true}
                          />
                        </div>
                        <h5 className="fs-14 mt-2">
                          {parseInt(this.state.chAttributes?.currentLife) +
                            "/" +
                            this.state.chAttributes?.maxLife}
                        </h5>
                        <div className="lifeBar-purchase">
                          <div className="lifeBar-purchase-points"></div>
                          <img
                            src={
                              this.state.rewardsData.rewards.coinsCount > 100 &&
                                this.state.usedPortionCount <
                                this.state.maxPotionCount
                                ? lifebuy
                                : dsblifebuy
                            }
                            onClick={() => {
                              this.increaseHealt();
                            }}
                            alt="lifebuy"
                            className="life_img"
                          />
                          <div className="lifeBar-purchase-price">
                            {this.state.usedPortionCount}/
                            {this.state.maxPotionCount}
                            <span>
                              <img src={coin} alt="coin" className="coins" />
                              <b>100</b>
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="text-center">
                        <img
                          className="prof"
                          src={
                            this.state.charRole === "Warrior"
                              ? warrior
                              : this.state.charRole === "Assassin"
                                ? assassin
                                : archangel
                          }
                          alt="player-charector"
                        ></img>
                        <button
                          type="button"
                          className="img_btn_home"
                          onClick={() => this.openDailyLogin()}
                        >
                          Daily Login
                        </button>
                        <span className="dropdown">
                          <button
                            type="button"
                            className="img_btn_brown"
                            onClick={() => this.gotoDailyQuest()}
                          >
                            Daily Quest
                          </button>
                        </span>
                        {/* <button type="button" className="img_btn_brown ml-2" >Daily Login</button> */}
                      </li>
                      <li className="progress-relative">
                        <h5 className="fs-14 mb-0">XP Points</h5>
                        {/* <div className="joyBar">
                          <ProgressBar completed={50} isLabelVisible={false} height="10px" bgColor="#7FC31C" width="190px" className="bars" animateOnRender={true} />
                        </div> */}
                        <Bars
                          completed={this.state.xpPoints}
                          maxCompleted={200}
                        />
                        {/* <img  src={progress} className="w-progress"></img> */}
                        <h5 className="fs-14 mt-2">
                          {this.state.xpPoints}/{this.state.xpPointsTotal}
                        </h5>
                        <h5 className="fs-14">Class: Warrior</h5>
                        <h5 className="fs-14">Rank: {this.state.rankname}</h5>
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
                          <img
                            src={crystal}
                            alt={crystal}
                            onClick={() => {
                              this.openStore();
                            }}
                          ></img>
                          <h5 className="fs-14 mb-0 w-progress pl-3">Store</h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {this.state.audioPlay && (
                    <audio loop autoPlay controls>
                      <source src={"https://mystikauistuff.s3.ap-northeast-1.amazonaws.com/audio.mp3"} type="audio/mpeg"></source>
                    </audio>
                  )}
                </div>
                <div className="main-leftP">
                  <div className="rect">
                    {this.state.settingsOpen === false ? (
                      <ul>
                        <li>
                          <button
                            className={`img_btn_trans ${this.state.buttonName === "MAP" ? "activeBtn" : ""
                              }`}
                            type="button"
                            onClick={() => this.navigateScreens("MAP")}
                          >
                            Map
                          </button>
                        </li>
                        <li>
                          <button
                            className={`img_btn_trans ${this.state.buttonName === "PLAY"
                                ? "activeBtn"
                                : ""
                              }`}
                            type="button"
                            onClick={() => this.navigateScreens("PLAY")}
                          >
                            How To Play
                          </button>
                        </li>
                        <li>
                          <button
                            className={`img_btn_trans ${this.state.buttonName === "LEARNING"
                                ? "activeBtn"
                                : ""
                              }`}
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
                            className={`img_btn_trans ${this.state.buttonName === "GOALS"
                                ? "activeBtn"
                                : ""
                              }`}
                            type="button"
                            onClick={() => this.navigateScreens("GOALS")}
                          >
                            Goals
                          </button>
                        </li>
                        <li>
                          <button
                            className={`img_btn_trans ${this.state.buttonName === "CHARECTER"
                                ? "activeBtn"
                                : ""
                              }`}
                            type="button"
                            onClick={() => this.navigateScreens("CHARECTER")}
                          >
                            Character
                          </button>
                        </li>
                        <li>
                          <button
                            className={`img_btn_trans ${this.state.buttonName === "CONTACTUS"
                                ? "activeBtn"
                                : ""
                              }`}
                            type="button"
                            onClick={() => this.settingsFunction()}
                          >
                            Settings
                          </button>
                        </li>
                      </ul>
                    ) : (
                      <ul>
                        <button
                          type="button"
                          className="close_btn"
                          onClick={() => this.settingsFunction()}
                        >
                          <img src={close} alt={close}></img>
                        </button>
                        <li>
                          <button
                            onClick={() => this.playMusic()}
                            className={
                              this.state.audioPlay
                                ? "img_btn_home_sm"
                                : "img_btn_brown_sm"
                            }
                          >
                            {this.state.audioPlay ? "Music On" : "Music Off"}
                          </button>
                        </li>
                        <li
                          onClick={() =>
                            this.setState({
                              openCredits: !this.state.openCredits,
                            })
                          }
                        >
                          {" "}
                          <img src={vector} alt="vector" /> Credits
                        </li>
                        {
                          <div className="credits">
                            <li>
                              <img src={creadituser} alt="creditsuser" />
                              ANIRUDH (GAME DESIGNER){" "}
                            </li>
                            <li>
                              <img src={creadituser} alt="creditsuser" />
                              SURYAKRANTHI (ARCHITECT){" "}
                            </li>
                            <li>
                              <img src={creadituser} alt="creditsuser" />
                              RAMESH BONTA (ARCHITECT){" "}
                            </li>
                            <li>
                              <img src={creadituser} alt="creditsuser" />
                              KADALI (WEB-DEVELOPER){" "}
                            </li>
                            <li>
                              <img src={creadituser} alt="creditsuser" />
                              VINOD (MOBILE-DEVELOPER){" "}
                            </li>
                            <li>
                              <img src={creadituser} alt="creditsuser" />
                              MANIDEEP (BACKEND){" "}
                            </li>
                            <li onClick={() => this.openTermsCond()}>
                              {" "}
                              <img src={TermsC} alt="termsC" /> TERMS AND
                              CONDITIONS
                            </li>
                          </div>
                        }
                        <li className="logout_btn">
                          <button
                            className={`img_btn_trans ${this.state.buttonName === "LOGOUT"
                                ? "activeBtn"
                                : ""
                              }`}
                            type="button"
                            onClick={() => this.navigateScreens("")}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                    {!this.state.settingsOpen && (
                      <div className="social">
                        <button type="button" className="img_btn_social">
                          <a target="_blank" href="https://www.instagram.com/mystika.greaterquests/" rel="noreferrer">
                            <img src={insta} alt="insta"></img>
                          </a>
                        </button>
                        <button type="button" className="img_btn_social">
                          <a target="_blank" href="https://www.facebook.com/MystikaGreaterQuests?mibextid=ZbWKwL" rel="noreferrer">
                            <img src={fb} alt="fb"></img>
                          </a>
                        </button>
                        <button type="button" className="img_btn_social">
                          <a target="_blank" href="https://twitter.com/i/flow/login?redirect_after_login=%2Fmystlka" rel="noreferrer">
                            <img src={twitter} alt="teitter"></img>
                          </a>
                        </button>
                        <button type="button" className="img_btn_social">
                          <a target="_blank" href="https://in.pinterest.com/mystika_creativity/" rel="noreferrer">
                            <img src={Pintrest} alt="pintrest"></img>
                          </a>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="main-rightP text-center">
                  <div className=" prf">
                    <img
                      className=""
                      onClick={() => this.openTutorial()}
                      src={queen}
                      alt={queen}
                    ></img>
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
                    <img
                      className=""
                      src={crown}
                      alt={crown}
                      onClick={() => this.openLeaderboards()}
                    ></img>
                  </div>
                  <h5 className="mt-2">Leaderboards</h5>
                </div>
              </div>
            </div>
          </div>
          <LeaderBoards
            openPop={this.state.leaderPopup}
            mapLeads={this.state.mapLeads}
            closePop={() => this.openLeaderboards("close")}
          />
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
          <Store
            openModel={this.state.storePopup}
            openStore={() => this.openStore()}
          />
          <Modals
            open={this.state.termsConditions}
            header={
              <div>
                <h5>TERMS & CONDITIONS</h5>

                <button
                  type="button"
                  className="close_btn"
                  onClick={() => this.openTermsCond()}
                >
                  <img src={close} alt={close}></img>
                </button>
              </div>
            }
            body={
              <div className="modal-body frame text-center Terms">
                <p>
                  Welcome to the gamified website/App that turns your personal,
                  academic, and career goals into an RPG game (Mystika). These
                  terms and conditions (the "Terms") apply to your use of the
                  Website/App and the services offered through it. By using the
                  Website, you agree to be bound by these Terms. If you do not
                  agree to these Terms, please do not use the Website.
                </p>
                <br />
                <h5>Account Information:</h5>
                <br />
                <p>
                  You must create an account to participate in the game aspect
                  of the Website. When you create an account, you may be asked
                  to provide certain information, including a player name, which
                  will be used to identify you within the Website. Your real
                  name will not be revealed or displayed on the Website.
                </p>
                <br />
                <h5>Gameplay and Rewards:</h5>
                <br />
                <p>
                  The Website allows you to set personal or academic goals and
                  track your progress toward those goals through an RPG game.
                  You can unlock achievements, earn coins and crystals, and
                  compare your progress with other players through leaderboards.
                  These rewards are intended to provide motivation and
                  recognition for your progress toward your goals.
                </p>
                <br />
                <h5>User Conduct:</h5>
                <br />
                <p>
                  You agree to use the Website only for lawful purposes and in a
                  manner that does not infringe the rights of or restrict or
                  inhibit the use and enjoyment of the Website by any third
                  party. Prohibited conduct includes, but is not limited to,
                  using the Website to transmit or post harmful, threatening,
                  defamatory, obscene, or otherwise illegal material.
                </p>
                <br />
                <h5>Intellectual Property:</h5>
                <br />
                <p>
                  The Website/App and its contents, including but not limited to
                  text, graphics, logos, icons, images, and software, are the
                  property of the Website or its licensors and are protected by
                  copyright and other intellectual property laws. You may not
                  reproduce, distribute, modify, or create derivative works from
                  the Website without the prior written consent of the Website.
                </p>
                <br />
                <h5>Warranties and Limitations of Liability:</h5>
                <br />
                <p>
                  The Website is provided "as is" without any representation or
                  warranty, express or implied. The Website makes no
                  representations or warranties in relation to the accuracy or
                  completeness of the information found on the Website. To the
                  maximum extent permitted by applicable law, the Website will
                  not be liable for any indirect or consequential loss or damage
                  whatsoever arising from or in connection with the use of the
                  Website.
                </p>
                <br />
                <h5>Modifications to the Terms:</h5>
                <br />
                <p>
                  The Website reserves the right to modify these Terms at any
                  time. Any such changes will be posted on the Website, and your
                  continued use of the Website after such changes have been
                  posted will indicate your acceptance of the modified Terms.
                </p>
                <br />
                <h5>Governing Law:</h5>
                <br />
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of the jurisdiction in which the Website is
                  based.
                </p>
                <br />
                <h5>Contact Information:</h5>
                <br />
                <p>
                  If you have any questions or concerns regarding these Terms,
                  please contact us at [insert contact information].
                </p>
                <br />
                <h5>Real-Life Achievements:</h5>
                <br />
                <p>
                  Please note that there is no way for the Website to verify
                  your real-life achievements. It is expected that you be honest
                  in tracking your progress toward your goals through the
                  Website. The virtual rewards that you or any other player
                  receives are based solely on the activities that are reported
                  to have been completed in the game world of Mystika. The
                  Website does not guarantee real-life success, but it can serve
                  as a helpful tool to assist you in accomplishing your personal
                  or academic goals.
                </p>
                <br />
                <h5>Target Audience:</h5>
                <br />
                <p>
                  The Website is primarily targeted toward high school students,
                  but adults may also make use of it.
                </p>
                <br />
                <h5>Map Activities:</h5>
                <br />
                <p>
                  The map activities in the game world of Mystika are not
                  directly linked to real-life activities. However, it is highly
                  recommended that you engage in real-life tasks and activities
                  while participating in the game.
                </p>
              </div>
            }
          />
          <Modals
            open={this.state.needHelp}
            header={
              <div>
                {Popups?.map((item, index) => {
                  const learning =
                    buttonName === "LEARNING"
                      ? item.LEARNING
                      : buttonName === "MAP"
                        ? item.MAP
                        : buttonName === "CHARECTER"
                          ? item.CHARECTER
                          : item.PLAY;
                  return <h5 key={index}>{learning.head}</h5>;
                })}
                <button
                  type="button"
                  className="close_btn"
                  onClick={this.openTutorial}
                >
                  <img  src={close} alt={close}></img>
                </button>
              </div>
            }
            body={
              <div className="modal-body frame text-center hailHero">
                {Popups?.map((item, index) => {
                  const learning =
                    buttonName === "LEARNING"
                      ? item.LEARNING
                      : buttonName === "MAP"
                        ? item.MAP
                        : buttonName === "CHARECTER"
                          ? item.CHARECTER
                          : item.PLAY;
                  return (
                    <div key={index}>
                      <h4 className="text-green">{learning?.body.heading}</h4>
                      <Carousel>
                        <Carousel.Item>
                          <span className="text-light">
                            {learning?.body.text}
                          </span>
                        </Carousel.Item>
                        <Carousel.Item>
                          <span className="text-light">
                            {learning?.body.text2}
                          </span>
                        </Carousel.Item>
                        <Carousel.Item>
                          <span className="text-light">
                            {learning?.body.text3}
                          </span>
                          {learning?.body?.text4 ? learning.body.text4 : ""}
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
                  );
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
