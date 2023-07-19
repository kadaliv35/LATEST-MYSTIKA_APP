import React, { Component } from 'react';
// import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import close from '../../assets/images/close_ic.svg';
// import Quen from '../../assets/images/queen.svg';
// import queen from '../../assets/images/queen.png';
import insta from '../../assets/images/instgram.svg';
import fb from '../../assets/images/facebook.svg';
import twitter from '../../assets/images/t.svg';
import Pintrest from '../../assets/images/P.svg';
import crown from '../../assets/images/crown.svg';
import cup from '../../assets/images/gold_cup.svg';
import sProfile from '../../assets/images/user_1.svg';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import close from "../../assets/images/close_ic.svg";
import warrior from '../../assets/images/char_warrior.png';
import archangel from '../../assets/images/char_archangel.png';
import assassin from '../../assets/images/char_assassin.png';
import LoginService from "../../services/LoginService";
import crystal from '../../assets/images/crystals.png'
import Modals from '../../commonUtils/Modals';

class Charecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: true,
      charecterStat: [],
      charecterAttr: [],
      charecterDtls: [],
      charecterRank: [],
      userCharacterList: []
    }
    this.closePop = this.closePop.bind(this)

  }

  getMasterCharacters() {
    LoginService.getMasterCharacters().then((res) => {
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

  }

  componentWillMount() {
    const data = JSON.parse(sessionStorage.getItem("dailyLogin"));
    const rewards = JSON.parse(sessionStorage.getItem("totalDailyLogin"));
    console.log({ rewards })
    this.setState({
      questsCompleted: data?.noOfQuestCompleted,
      enemiesDefeated: data?.noOfEneminesDefited,
      goalsAchieved: data?.goalsAchived,
      charecterDtls: data?.charecterId,
      charecterRank: data?.chCurrentRank,
      userCharacterList: rewards?.userCharacterList,
      selectedHeroData: []
    }, () => {
    })
  }

  closePop() {
    this.setState({ popUp: false })
  }

  selectHero = (type, id) => {
    this.setState({ showHeroModal: true, selectedHeroName: type, selectedHeroId: id }, () => {
      let list = this.state.userCharacterList.filter((item, index) => index === this.state.selectedHeroId)
      this.setState({ selectedHeroData: list })
    })
  }

  closeModal = () => {
    this.setState({ showHeroModal: false })
  }

  proceedToChnge = () => {
    alert("You Dont have enough crystals to change")
    this.setState({ showHeroModal: false })
  }

  heroImg = () => {
    if (this.state.selectedHeroName === "archangel") {
      return archangel
    } else if (this.state.selectedHeroName === "warrior") {
      return warrior
    } else if (this.state.selectedHeroName === "assassin") {
      return assassin
    }
  }

  render() {
    return (
      <div className="main">
        <div className="main-middleP">
          <div className="rect_large_content">
            <h3 className="">
              <span className="text-green">Characters</span>
            </h3>

            <div>
              <div className='images'>
                <div className="profile">
                  <img src={archangel} onClick={() => this.selectHero('archangel', 2)}></img>
                  {/* <h5>Assassin</h5> */}
                </div><div className="profile">
                  <img src={assassin} onClick={() => this.selectHero('assassin', 1)}></img>
                  {/* <h5>Assassin</h5> */}
                </div><div className="profile">
                  <img src={warrior} onClick={() => this.selectHero('warrior', 0)}></img>
                  {/* <h5>Assassin</h5> */}
                </div>
              </div>
              {this.state.userCharacterList.filter((item, index) => item.active === true).map((item, index) => {
                return (
                  <div className='pages' key={index}>
                    <div className='innerPages'>
                      <p>Class - {item.charecterId.characterName}</p>
                      <p>Total Experience Points Earned - 0</p>
                      <p>Level - {item.chCurrentRank.rankOrder}</p>
                      <p>Rank - {item.chCurrentRank.rankname}</p>
                      <p>Enemies Defeated - 0</p>
                      <p>Goals Defated - 0</p>
                    </div>
                    <div className='innerPages'>
                      <h6 className='text-white'>Character Stats:</h6>
                      <p>Power - {item.charecterSats.valor}</p>
                      <p>Speed - {item.charecterSats.speed}</p>
                      <p>Intelligence - {item.charecterSats.intelligence}</p>
                      <h6 className='text-white'>Character Attributes:</h6>
                      <p>Life - {item.chAttributes.currentLife}</p>
                      <p>Damage - {item.chAttributes.damage}</p>
                      <p>Armor - {item.chAttributes.amor}</p>
                    </div>
                    <div className='innerPages'>
                      <h6 className='text-white'>Activity Log:</h6>
                      <p>Quests Completed: {this.state.questsCompleted}</p>
                      <p>Total Time Invested In Success:</p>
                      <p>Total Enemies Defeated: {this.state.enemiesDefeated}</p>
                      <p>Total Goals Achieved: {this.state.goalsAchieved}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Modals
          size={"md"}
          open={this.state.showHeroModal}
          header={<p>Character</p>}
          body={
            <div className="row ">
              <div className="col text-center">
                <img src={this.heroImg()} className='w-25' alt={this.heroImg()} />
                {this.state.userCharacterList.filter((item, index) => index === this.state.selectedHeroId).map((item, index) => {
                  return (
                    <div key={index}>
                      <h6 className="mt-2">{item.charecterId.characterName}</h6>
                      {!item.active &&
                        <div>
                          <h6 className="samllHeading">DO YOU WISH TO SWITCH TO {item.charecterId.characterName} FOR 500 <img src={crystal} className='w-20' /> </h6>
                          <h6 className="samllHeading">SPECIAL ABILITIES {item.charecterId.characterName} CAN EXPLORE ANY AREA FASTER, HEALS QUICKLY. STRONG AGAINIST LORD OF FEAR.</h6>
                        </div>
                      }
                      <div className='d-flex flex-row justify-content-around'>
                        <div className='innerPages'>
                          <h6 className='text-white'>CHARACTER STATS:</h6>
                          <p>POWER - {item.charecterSats.valor}</p>
                          <p>SPEED - {item.charecterSats.speed}</p>
                          <p>INTELLIGENCE - {item.charecterSats.intelligence}</p>
                        </div>
                        <div className='innerPages'>
                          <h6>CHARACTER ATTRIBUTES:</h6>
                          <p>LIFE - {item.chAttributes.currentLife}</p>
                          <p>ATTACK - {item.chAttributes.damage}</p>
                          <p>DEFENCE - {item.chAttributes.amor}</p>
                          <p>LIFE REGENERATION - {item.chAttributes.lifeRegen}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          }
          footer={
            <div className='row w-100'>
              <div className='m-a pt-3 pl-5'>
                {this.state.userCharacterList.filter((item, index) => index === this.state.selectedHeroId).map((item, index) => {
                  return (
                    <div key={index}>
                      {!item.active &&
                        <button
                          className="img_btn_home"
                          onClick={this.proceedToChnge}
                        >
                          Indeed
                        </button>}
                      <button
                        className="img_btn_brown"
                        onClick={this.closeModal}
                      >
                        {item.active ? "Cancel" : "Not Now"}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          }
        />
      </div>
    )
  }
}
export default Charecter;
