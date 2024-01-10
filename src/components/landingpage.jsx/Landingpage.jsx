import ProgressBar from "@ramonak/react-progress-bar";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import archangel from "../../assets/images/char_archangel.png";
import assassin from "../../assets/images/char_assassin.png";
import warrior from "../../assets/images/char_warrior.png";
import ArchVideo from "../../assets/images/character1.png";
import WarVideo from "../../assets/images/character2.png";
import AsinVideo from "../../assets/images/character3.png";
import close from "../../assets/images/close_ic.svg";
import coin from "../../assets/images/coin_1.svg";
import coins from "../../assets/images/coins_new.svg";
import combatImg from "../../assets/images/combat.png";
import crystals from "../../assets/images/crystals.png";
import Enemy1 from "../../assets/images/enemy1.png";
import Enemy2 from "../../assets/images/enemy2.png";
import Enemy3 from "../../assets/images/enemy3.png";
import Enemy4 from "../../assets/images/enemy4.png";
import Enemy5 from "../../assets/images/enemy5.png";
import Quen from "../../assets/images/queen.svg";
import Bars from "../../commonUtils/Bars";
import Modals from "../../commonUtils/Modals";
import MapService from "../../services/MapService";

const elementImages = {
  Water: require("../../assets/images/water.png"),
  Air: require("../../assets/images/air.png"),
  Earth: require("../../assets/images/earth.png"),
  Fire: require("../../assets/images/fire.png"),
  Lighting: require("../../assets/images/lightning.png"),
};


const EnemyImages = [Enemy1, Enemy2, Enemy3, Enemy4, Enemy5];

class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: true,
      userCharacterList: [],
      openHerbsModal: false,
      activePlace: 0,
      showLocation: false,
      countdownValue: 0,
      mapPlaces: [],
      openBattle: false,
      isCombact: false,
      combactId: 0,
      showPop: true,
      enemiesList: [],
      enemyLife: 100,
      enemyMaxLife: 100,
      clashText: "Pick Your Element",
      isClashAvailable: false,
      enemyName: ""
    };
    this.closePop = this.closePop.bind(this);
    this.navigateRoute = this.navigateRoute.bind(this);
    this.handleSpanClick = this.handleSpanClick.bind(this);
    this.exploreMap = this.exploreMap.bind(this);
    this.abortExplore = this.abortExplore.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  componentWillMount() {
    const data = JSON.parse(sessionStorage.getItem("dailyLogin"));
    setTimeout(() => {
      this.setState(
        {
          showPop: false,
          chAttributes: data?.chAttributes,
        },
        () => {
          this.setState({
            heroLife: this.state.chAttributes?.currentLife,
            heroMaxLife: this.state.chAttributes?.maxLife,
          });
        }
      );
    }, 8000);
    this.getAllMap();
    const rewards = JSON.parse(sessionStorage.getItem("totalDailyLogin"));
    this.setState(
      {
        userCharacterList: rewards?.userCharacterList,
        userId: rewards.userId,
      },
      () => {
        this.state.userCharacterList
          .filter((item) => item.active === true)
          .map((item) => {
            return this.setState({ charRole: item.charecterId.characterName });
          });
        console.log(this.state.userCharacterList, "CharList");
        for (let i = 0; i < this.state.userCharacterList.length; i++) {
          if (this.state.userCharacterList[i].active === true) {
            console.log(this.state.userCharacterList[i].userCharacterId);
            this.getAssignedPlace(
              this.state.userCharacterList[i].userCharacterId
            );
            this.setState({
              characterId: this.state.userCharacterList[i].userCharacterId,
            });
            this.userEnemy(this.state.userCharacterList[i].userCharacterId);
            this.allElements();
          }
        }
      }
    );
  }

  getDefeatedEnemyImage(originalImage) {
    return originalImage.replace(".png", "Defeated.png");
  }

  combactClash(eleId) {
    this.setState({ isCombact: true, combactId: eleId });
  }

  allElements() {
    MapService.getAllElements()
      .then((res) => {
        console.log({ res });
        this.setState({ elements: res.data }, () => {
          console.warn(this.state.elements, "Elements");
        });
      })
      .catch((err) => console.error({ err }));
  }

  userEnemy(charId) {
    MapService.enemyList(charId)
      .then((res) => {
        console.log({ res }, "EnemyList");
        this.setState({ enemiesList: res.data }, () => {
          if (this.state.enemiesList.length > 0) {
            this.setEnemyImg();
            this.getVictoryPopup();
          }
        });
      })
      .catch((err) => console.error(err));
  }

  getVictoryPopup() {
    this.state.enemiesList.forEach((item, index) => {
      if (item[4]?.defeted === true) {
        this.setState({ openVictoryModel: true });
      }
    });
  }

  setEnemyImg() {
    let data = {};
    let enemiesList = this.state.enemiesList;
    if (enemiesList.length > 0) {
      if (enemiesList[0].defeted === false) {
        data = {
          image: Enemy1,
          name: enemiesList[0].enemy.name,
        };
      } else if (enemiesList[0].defeted === true) {
        this.setState({ enemy0Defeated: true });
        data = {
          image: Enemy2,
          name: enemiesList[1].enemy.name,
        };
      } else if (enemiesList[1].defeted === true) {
        this.setState({ enemy1Defeated: true });
        data = {
          image: Enemy3,
          name: enemiesList[2].enemy.name,
        };
      } else if (enemiesList[2].defeted === true) {
        this.setState({ enemy2Defeated: true });
        data = {
          image: Enemy4,
          name: enemiesList[3].enemy.name,
        };
      } else if (enemiesList[3].defeted === true) {
        this.setState({ enemy3Defeated: true });
        data = {
          image: Enemy5,
          name: enemiesList[4].enemy.name,
        };
      } else if (enemiesList[4].defeted === true) {
        this.setState({ enemy4Defeated: true });
      }
    }
    return data;
  }

  proceedClash() {
    MapService.combactClash(this.state.characterId, this.state.combactId)
      .then((res) => {
        console.log({ res }, "Combact");
        this.setState({
          enemyLife: res.data.enemyCurrentLife,
          enemyMaxLife: res.data.enemyMaxLife,
          enemyName: res.data.enemyName,
          heroLife: res.data.heroCurrentLife,
          heroMaxLife: res.data.heroMaxLife,
          isClashAvailable: true
        });
        this.props.heroLife(res.data.heroCurrentLife);
        this.userEnemy(this.state.characterId);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getAllMap() {
    MapService.getAllMap()
      .then((res) => {
        console.log({ res });
        this.setState({ mapPlaces: res.data });
      })
      .catch((err) => {
        console.error({ err });
      });
  }

  getAssignedPlace(charId) {
    MapService.getAssignedPlace(charId)
      .then((res) => {
        this.setState({ activePlace: res.data.orderNumber });
        // alert(res.data.orderNumber)
      })
      .catch((err) => {
        console.error({ err });
      });
  }

  closePop() {
    this.setState({ popUp: false });
  }

  exploreMap = () => {
    this.setState({ countdownValue: 20, showTimer: true }, () => {
      const countdownInterval = setInterval(() => {
        this.setState((prevState) => ({
          countdownValue: prevState.countdownValue - 1,
        }));

        if (this.state.countdownValue <= 0 && this.state.showTimer) {
          clearInterval(countdownInterval);
          this.userEnemy(this.state.characterId);
          MapService.saveCurrentLoc(
            this.state.characterId,
            this.state.activeSpan
          )
            .then((res) => {
              console.log({ res });
            })
            .catch((err) => {
              console.error({ err });
            });
          this.setState({
            activePlace: this.state.activeSpan,
            countdownValue: 0,
            showTimer: false,
            openBattle: true,
          }, () => this.proceedClash());
        }
      }, 1000);
    });
  };

  navigateRoute(value) {
    if (value === "PLAY") {
      this.props.history.push("/howtoplay");
    } else if (value === "LEARNING") {
      this.props.history.push("/learningtraven");
    } else if (value === "ROADMAP") {
      this.props.history.push("/roadmaps");
    } else if (value === "GOALS") {
      this.props.history.push("/goals");
    } else if (value === "CHARECTER") {
      this.props.history.push("/charecter");
    } else {
      this.props.history.push("/contactus");
    }
  }

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes} : ${remainingSeconds}`;
  };

  openHerbs = () => {
    this.setState({ openHerbsModal: !this.state.openHerbsModal });
  };

  handleSpanClick = (index) => {
    if (this.state.activeSpan !== index) {
      this.setState({ activeSpan: index, showLocation: true });
    }
  };

  abortExplore(index) {
    if (this.state.activeSpan === index) {
      this.setState({ activeSpan: null, showLocation: false }, () => {
        this.setState({
          countdownInterval: 0,
          activePlace: this.state.activePlace,
          showTimer: false,
        });
      });
    }
  }

  closeBattle = () => {
    this.setState({ openBattle: false });
  };

  closeRewards = () => {
    this.setState({ openRewardModal: false });
  };

  closeVictoryModal() {
    this.setState({ openVictoryModel: false, openRewardModal: true });
  }

  collectFinalReward() {
    MapService.claimRewards(this.state.characterId, "final")
      .then((res) => {
        if (res) {
          this.setState({ openRewardModal: false });
        }
      })
      .catch((err) => console.error({ err }));
  }

  render() {
    let enemiesList = this.state.enemiesList;
    let enemyName = this.state.enemyName;
    return (
      <div className="main">
        <div className="main-middleP">
          <div className="rect_large">
            <div
              className="rect_large-spans"
              id="container"
              style={{ position: "relative" }}
            >
              {this.state.mapPlaces.map((item, index) => (
                <span
                  key={item.orderNumber}
                  onClick={() => this.handleSpanClick(item.orderNumber)}
                  className={`span ${item.orderNumber === this.state.activeSpan
                    ? "sactive"
                    : String(item.orderNumber)
                    }`}
                >
                  {item.orderNumber === this.state.activePlace && (
                    <div className="map-user_location">
                      <img
                        src={
                          this.state.charRole === "Warrior"
                            ? warrior
                            : this.state.charRole === "Assassin"
                              ? assassin
                              : archangel
                        }
                        alt="player-charector"
                        key={item.orderNumber}
                      ></img>
                    </div>
                  )}
                  {item.orderNumber !== this.state.activePlace &&
                    item.orderNumber === this.state.activeSpan &&
                    this.state.showLocation && (
                      <div className="map-user_location">
                        <>
                          <p>{item.tittle}</p>
                          {this.state.showTimer ? (
                            <>
                              <p>
                                Time:{" "}
                                {this.formatTime(this.state.countdownValue)}
                              </p>
                              <Bars completed={this.state.countdownValue} />
                            </>
                          ) : (
                            <button
                              className="img_btn_home_sm"
                              onClick={() => this.exploreMap()}
                            >
                              Explore
                            </button>
                          )}
                          <img
                            alt="character"
                            src={
                              this.state.charRole === "Warrior"
                                ? warrior
                                : this.state.charRole === "Assassin"
                                  ? assassin
                                  : archangel
                            }
                            className="moment_img"
                            key={item.orderNumber}
                          ></img>
                          <button
                            className="img_btn_brown_sm"
                            onClick={() => this.abortExplore(item.orderNumber)}
                          >
                            Abandon
                          </button>
                        </>
                      </div>
                    )}
                </span>
              ))}
            </div>
            <div className="map-queen_location">
              <img
                src={Quen}
                alt="queen"
                onClick={() => this.openHerbs()}
              ></img>
            </div>
            {this.state.showPop && (
              <div className="map-notice">
                <h5>tutorial character for help</h5>
              </div>
            )}
          </div>
        </div>
        <Modals
          open={this.state.openBattle}
          // open={true}
          header={
            <div>
              <h5 className="mt-2">Battle</h5>
            </div>
          }
          body={
            <div className="battle mt-3 mb-3">
              <div className="battle-header">
                {enemiesList.map((enemy, index) => (
                  <div key={index}>
                    <img
                      src={EnemyImages[index]}
                      alt={enemy.name}
                      className={enemy.defeted ? "unblur" : "blur"}
                    />
                    <p className={`"font-weight-bold" ${enemy.defeted ? "text-success" : "text-warning"}`}>
                      {enemy.name} - {enemy.defeted ? "Defeated" : "Alive"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="battle-body">
                <div>
                  <img
                    key={enemyName}
                    src={enemyName === "Lord of Procrastination" ? Enemy1 : enemyName === "Lord of Guilt" ? Enemy2 : enemyName === "Lord of Fear" ? Enemy3 : enemyName === "Lord of Anxiety" ? Enemy4 : enemyName === "Lord of Anguish" ? Enemy5 : Enemy1}
                    className="battle-main_img"
                    alt={enemyName !== "" ? enemyName : "Lord of Procrastination"}
                  />
                  <p className="enemy_name">
                    {enemyName !== "" ? enemyName : "Lord of Procrastination"} {"\n"}
                    <b>
                      {this.state.enemyLife + "/" + this.state.enemyMaxLife}
                    </b>
                  </p>
                  <div className="joyBarxSm">
                    <ProgressBar
                      completed={this.state.enemyLife ? this.state.enemyLife : 0}
                      maxCompleted={this.state.enemyMaxLife}
                      isLabelVisible={false}
                      height="8px"
                      bgColor="#00fdfd"
                      width="140px"
                      className="bars"
                      animateOnRender={true}
                    />
                  </div>
                </div>
                <div className="battle-mid_container">
                  <div className="ation_imgs">
                    {this.state.elements?.map((item, index) => (
                      <div key={index} className="battle-mid_img">
                        <img
                          src={elementImages[item.elementName]}
                          alt={item.elementName}
                          onClick={() => this.combactClash(item.combatElementId)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="action">
                    {this.state.isCombact === true ? (
                      <img
                        src={combatImg}
                        className="combatImg"
                        alt="combat"
                        onClick={() =>
                          setTimeout(() => {
                            this.setState({ clashText: "Enemies Turn", isCombact: false, isClashAvailable: false }, () => {
                              this.proceedClash();
                            });
                            setTimeout(() => {
                              this.setState({ clashText: "Pick Your Element" });
                            }, 3000);
                          }, 3000)
                        }
                      />
                    ) : (
                      <p className="text-center">{String(this.state.clashText)}</p>
                    )}
                  </div>
                </div>
                <div>
                  <img className="battle-main_img"
                    src={
                      this.state.charRole === "Warrior"
                        ? WarVideo
                        : this.state.charRole === "Assassin"
                          ? AsinVideo
                          : ArchVideo
                    }
                    alt={this.state.charRole}
                  />
                  <p className="hero_name">
                    {this.state.charRole}
                    <br />
                    <b>
                      {parseInt(this.state.heroLife) + "/" + this.state.heroMaxLife}
                    </b>
                  </p>
                  <div className="lifeBarSm">
                    <ProgressBar
                      completed={this.state.heroLife ? this.state.heroLife : 0}
                      maxCompleted={this.state.heroMaxLife}
                      isLabelVisible={false}
                      height="8px"
                      bgColor="#fd0000"
                      width="140px"
                      className="bars"
                      animateOnRender={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Modals
          open={this.state.openRewardModal}
          // open={true}
          header={
            <div>
              <h6>You Obtained</h6>
              <button
                type="button"
                className="close_btn"
                onClick={() => this.closeRewards()}
              >
                <img src={close} alt={close}></img>
              </button>
            </div>
          }
          body={
            <div className="modal-body frame text-center final_reward">
              <div className="final_reward-body">
                <span>
                  <img src={coin} alt="" />
                  <p>Coins</p>
                </span>
                <span>
                  <img src={crystals} alt="" />
                  <p>Crystals</p>
                </span>
                <span>
                  <img src={coins} alt="" />
                  <p>XP</p>
                </span>
              </div>

              <div className="final_reward-button">
                <button
                  type="button"
                  className="img_btn_home"
                  onClick={() => this.collectFinalReward()}
                >
                  Delighted
                </button>
              </div>
            </div>
          }
        />
        <Modals
          open={this.state.openHerbsModal}
          header={
            <div>
              <h6 className="mt-3">Tutorial</h6>
              <button
                type="button"
                className="close_btn"
                onClick={() => this.openHerbs()}
              >
                <img src={close} alt={close}></img>
              </button>
            </div>
          }
          body={
            <div className="modal-body frame text-center hailHero">
              <h4 className="text-light mt-5 mb-5">HERBS OF THE ALCHEMIST</h4>
              <span className="text-light mt-5 mb-5 fs-16">
                AS YOU COMPLETE EACH QUEST, YOU WILL BE REWARDED WITH XP POINTS
                AND THE MORE QUESTS YOU COMPLETE. THE MORE THE EMPEROR WILL
                BECOME STRONGER AND MORE EQUIPPED TO TACKLE MORE DIFFICULT
                CHALLENGES.
              </span>
              <br />
              <button
                type="button"
                className="img_btn_home mt-5"
                onClick={() => this.openHerbs()}
              >
                ACCEPTED
              </button>
            </div>
          }
        />

        <Modals
          open={this.state.openVictoryModel}
          // open={true}
          header={
            <div>
              <h6>Quest</h6>
              <button
                type="button"
                className="close_btn"
                onClick={() => this.closeVictoryModal()}
              >
                <img src={close} alt={close}></img>
              </button>
            </div>
          }
          body={
            <div className="modal-body frame text-center">
              <h4>Congratulations Hero!</h4>
              <h5>You have successfully completed a Quest</h5>
              <p>
                Your endeavor is commendable and is duly noted by his highness,
                The Emperor.
              </p>
              <p>Pursue your endeavor for Greater Quests!</p>
              <button
                type="button"
                className="img_btn_home"
                onClick={() => this.closeVictoryModal()}
              >
                Delighted
              </button>
            </div>
          }
        />

        <Modals
          open={this.state.popUp}
          header={
            <div>
              <h6 className="mt-3">Tutorial</h6>
              <button
                type="button"
                className="close_btn"
                onClick={() => this.closePop()}
              >
                <img src={close} alt={close}></img>
              </button>
            </div>
          }
          body={
            <div className="modal-body frame text-center">
              <h5 className="mt-5">THE PORTALS SECRET</h5>
              <p className="mt-5 mb-3">
                AS YOU COMPLETE EACH QUEST. YOU WILL BE REWARDED WITH JOY POINTS
                AND THE MORE QUESTS YOU COMPLETE THE MORE THE EMPORER WILL BE
                PLEASED WITH YOU BECOME STRONGER AND MORE EQUIPPED TO TACKLE
                MORE DIFFICULT CHALLENGES
              </p>
              <button
                type="button"
                className="img_btn_home mt-3"
                onClick={this.closePop}
              >
                Delighted
              </button>
            </div>
          }
        />
      </div>
    );
  }
}
export default Landingpage;
