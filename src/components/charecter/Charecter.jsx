import React, { Component } from "react";
// import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import close from '../../assets/images/close_ic.svg';
// import Quen from '../../assets/images/queen.svg';
// import queen from '../../assets/images/queen.png';
import insta from "../../assets/images/instgram.svg";
import fb from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/t.svg";
import Pintrest from "../../assets/images/P.svg";
import crown from "../../assets/images/crown.svg";
import cup from "../../assets/images/gold_cup.svg";
import sProfile from "../../assets/images/user_1.svg";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import close from "../../assets/images/close_ic.svg";
import warrior from "../../assets/images/char_warrior.png";
import archangel from "../../assets/images/char_archangel.png";
import assassin from "../../assets/images/char_assassin.png";
import LoginService from "../../services/LoginService";
import crystal from "../../assets/images/crystals.png";
import Modals from "../../commonUtils/Modals";
import axios from "axios";
import { BASE_URL } from "../../commonUtils/Base";

class Charecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: true,
      charecterStat: [],
      charecterAttr: [],
      charecterDtls: [],
      charecterRank: [],
      userCharacterList: [],
    };
    this.closePop = this.closePop.bind(this);
  }

  getMasterCharacters() {
    LoginService.getMasterCharacters()
      .then((res) => {
        if (res.data) {
          // this.setState({characterList :res.data})
          res.data.forEach((ele, index) => {
            const obj = {
              id: ele.characterId,
              value: ele.characterName,
              label: ele.characterName,
            };
            this.state.characterList.push(obj);
          });
          this.setState({ characterList: this.state.characterList });
        }
      })
      .catch((err) => console.error(err));
  }

  componentWillMount() {
    const data = JSON.parse(sessionStorage.getItem("dailyLogin"));
    const rewards = JSON.parse(sessionStorage.getItem("totalDailyLogin"));
    console.log({ rewards });
    this.setState(
      {
        questsCompleted: data?.noOfQuestCompleted,
        enemiesDefeated: data?.noOfEneminesDefited,
        goalsAchieved: data?.goalsAchived,
        charecterDtls: data?.charecterId,
        charecterRank: data?.chCurrentRank,
        userCharacterList: rewards?.userCharacterList,
        selectedHeroData: [],
      },
      () => {}
    );
    this.setState({ userid: rewards.userId }, () => {});
  }

  closePop() {
    this.setState({ popUp: false });
  }

  selectHero = (type, id) => {
    this.setState(
      { showHeroModal: true, selectedHeroName: type, selectedHeroId: id },
      () => {
        let list = this.state.userCharacterList.filter(
          (item, index) => index === this.state.selectedHeroId
        );
        this.setState({ selectedHeroData: list });
      }
    );
  };

  closeModal = () => {
    this.setState({ showHeroModal: false });
  };

  proceedToChnge = (charId) => {
    axios
      .post(
        BASE_URL +
          "/character/enableNewCharacter/" +
          this.state.userid +
          "/" +
          charId
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        } else {
          // alert(res.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // alert(charId)
    this.setState({ showHeroModal: false });
  };

  heroImg = () => {
    if (this.state.selectedHeroName === "archangel") {
      return archangel;
    } else if (this.state.selectedHeroName === "warrior") {
      return warrior;
    } else if (this.state.selectedHeroName === "assassin") {
      return assassin;
    }
  };

  render() {
    return (
      <div className="main">
        <div className="main-middleP">
          <div className="rect_large_content">
            <h3 className="">
              <span className="text-green">Characters</span>
            </h3>

            <div>
              {this.state.userCharacterList
                .filter((item, index) => item.active === true)
                .map((item, index) => {
                  return (
                    <div className="images" key={index}>
                      {/* {alert(item?.characterId?.characterName)} */}
                      {item.charecterId.characterName === "Archangel" ? (
                        ""
                      ) : (
                        <div className="profile">
                          <img alt=''
                            src={archangel}
                            alt=""
                            onClick={() => this.selectHero("archangel", 2)}
                          ></img>
                        </div>
                      )}
                      {item.charecterId.characterName === "ASSASSIN" ? (
                        ""
                      ) : (
                        <div className="profile">
                          <img alt=''
                            src={assassin}
                            alt=""
                            onClick={() => this.selectHero("assassin", 1)}
                          ></img>
                        </div>
                      )}
                      {item.charecterId.characterName === "WARRIOR" ? (
                        ""
                      ) : (
                        <div className="profile">
                          <img alt=''
                            src={warrior}
                            alt=""
                            onClick={() => this.selectHero("warrior", 0)}
                          ></img>
                        </div>
                      )}
                    </div>
                  );
                })}
              {this.state.userCharacterList
                .filter((item, index) => item.active === true)
                .map((item, index) => {
                  return (
                    <div className="pages" key={index}>
                      <div className="innerPages">
                        <p>Class - {item.charecterId.characterName}</p>
                        <p>Total Experience Points Earned - 0</p>
                        <p>Level - {item.chCurrentRank.rankOrder}</p>
                        <p>Rank - {item.chCurrentRank.rankname}</p>
                        <p>Enemies Defeated - 0</p>
                        <p>Goals Defated - 0</p>
                      </div>
                      <div className="innerPages">
                        <h6 className="text-white">Character Stats:</h6>
                        <p>Power - {item.charecterSats.valor}</p>
                        <p>Speed - {item.charecterSats.speed}</p>
                        <p>Intelligence - {item.charecterSats.intelligence}</p>
                        <h6 className="text-white">Character Attributes:</h6>
                        <p>Life - {item.chAttributes.currentLife}</p>
                        <p>Damage - {item.chAttributes.damage}</p>
                        <p>Armor - {item.chAttributes.amor}</p>
                      </div>
                      <div className="innerPages">
                        <h6 className="text-white">Activity Log:</h6>
                        <p>Quests Completed: {this.state.questsCompleted}</p>
                        <p>Total Time Invested In Success:</p>
                        <p>
                          Total Enemies Defeated: {this.state.enemiesDefeated}
                        </p>
                        <p>Total Goals Achieved: {this.state.goalsAchieved}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <Modals
          size={"md"}
          open={this.state.showHeroModal}
          header={<p>Character</p>}
          body={
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="row">
                <div className="col text-center">
                  <img alt=''
                    src={this.heroImg()}
                    className="w-30 h-25"
                    alt={this.heroImg()}
                  />
                  {this.state.userCharacterList
                    .filter(
                      (item, index) => index === this.state.selectedHeroId
                    )
                    .map((item, index) => {
                      return (
                        <div key={index}>
                          <h6 className="">{item.charecterId.characterName}</h6>
                          {!item.active && (
                            <div>
                              <h6 className="smallHeading">
                                DO YOU WISH TO SWITCH TO{" "}
                                {item.charecterId.characterName} FOR 500{" "}
                                <img alt='' src={crystal} className="w-20" />{" "}
                              </h6>
                              <h6 className="smallHeading">
                                SPECIAL ABILITIES{" "}
                                {item.charecterId.characterName} CAN EXPLORE ANY
                                AREA FASTER, HEALS QUICKLY. STRONG AGAINIST LORD
                                OF FEAR.
                              </h6>
                            </div>
                          )}
                          <div className="d-flex flex-row justify-content-around pages">
                            <div className="innerPages">
                              <h6 className="text-white">CHARACTER STATS:</h6>
                              <p>POWER - {item.charecterSats.valor}</p>
                              <p>SPEED - {item.charecterSats.speed}</p>
                              <p>
                                INTELLIGENCE - {item.charecterSats.intelligence}
                              </p>
                            </div>
                            <div className="innerPages">
                              <h6>CHARACTER ATTRIBUTES:</h6>
                              <p>LIFE - {item.chAttributes.currentLife}</p>
                              <p>ATTACK - {item.chAttributes.damage}</p>
                              <p>DEFENCE - {item.chAttributes.amor}</p>
                              <p>
                                LIFE REGENERATION -{" "}
                                {item.chAttributes.lifeRegen}
                              </p>
                            </div>
                          </div>
                          <div className="">
                            {this.state.userCharacterList
                              .filter(
                                (item, index) =>
                                  index === this.state.selectedHeroId
                              )
                              .map((item, index) => {
                                return (
                                  <div key={index}>
                                    {!item.active && (
                                      <button
                                        className="img_btn_home"
                                        onClick={() =>
                                          this.proceedToChnge(
                                            item.userCharacterId
                                          )
                                        }
                                      >
                                        Indeed
                                      </button>
                                    )}
                                    <button
                                      className="img_btn_brown"
                                      onClick={this.closeModal}
                                    >
                                      {item.active ? "Cancel" : "Not Now"}
                                    </button>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}
export default Charecter;
