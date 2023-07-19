import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import close from "../../assets/images/close_ic.svg";
import Quen from "../../assets/images/queen.svg";
import queen from "../../assets/images/queen.png";
import insta from "../../assets/images/instgram.svg";
import fb from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/t.svg";
import Pintrest from "../../assets/images/P.svg";
import crown from "../../assets/images/crown.svg";
import cup from "../../assets/images/gold_cup.svg";
import sProfile from "../../assets/images/user_1.svg";
import "bootstrap/dist/css/bootstrap.css";
import warrior from '../../assets/images/char_warrior.png';
import archangel from '../../assets/images/char_archangel.png';
import assassin from '../../assets/images/char_assassin.png';
import Carousel from "react-bootstrap/Carousel";
import Modals from "../../commonUtils/Modals";

class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: true,
      userCharacterList: []
    };
    this.closePop = this.closePop.bind(this);
    this.navigateRoute = this.navigateRoute.bind(this);
  }

  componentWillMount() {
    const rewards = JSON.parse(sessionStorage.getItem("totalDailyLogin"));
    this.setState({
      userCharacterList: rewards?.userCharacterList,
    })
  }

  closePop() {
    this.setState({ popUp: false });
  }
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

  render() {
    return (
      <div className="main">
        {/* <div className='header'>
          <div className='header-left'>
            Hai
          </div>
          <div className='header-right'>
            Hello
          </div>
        </div> */}
        {/* <div className='main-leftP'>
          <div className='rect'>
              <ul>
                <li>
                  <button className='img_btn_trans' type='button'  onClick={() => this.navigateRoute('PLAY')}>How To Play</button>
                </li>
                <li>
                  <button className='img_btn_trans' type='button'onClick={() => this.navigateRoute('LEARNING')}>Learning Tavern</button>
                </li>
                <li>
                  <button className='img_btn_trans' type='button' onClick={() => this.navigateRoute('ROADMAP')}>Roadmaps</button>
                </li>
                <li>
                  <button className='img_btn_trans' type='button' onClick={() => this.navigateRoute('GOALS')}>Goals</button>
                </li>
                <li>
                  <button className='img_btn_trans' type='button' onClick={() => this.navigateRoute('CHARECTER')}>Character</button>
                </li>
                <li>
                  <button className='img_btn_trans' type='button' onClick={() => this.navigateRoute('CONTACTUS')}>Contact Us</button>
                </li>
              </ul>
              <div className='social'>
              <button type='button' className='img_btn_social'><img src={insta}></img></button>
              <button type='button' className='img_btn_social'><img src={fb}></img></button>
              <button type='button' className='img_btn_social'><img src={twitter}></img></button>
              <button type='button' className='img_btn_social'><img src={Pintrest}></img></button>
              </div>
          </div>
        </div> */}
        <div className="main-middleP">
          <div className="rect_large">
            <div className="map-user_location">
              {this.state.userCharacterList.filter((item, index) => item.active === true).map((item, index) => {
                return (
                  <img src={item.charecterId.characterName === "Warrior" ? warrior : item.charecterId.characterName === "Assassin" ? assassin : archangel} key={index}></img>
                )
              })}
              <h5 className="fs-16 text-white">Player</h5>
            </div>
            <div className="map-queen_location">
              <img src={Quen}></img>
            </div>
            <div className="map-notice">
              {/* <img src={notice}></img> */}
              <h5>tutorial character for help</h5>
            </div>
          </div>
        </div>
        {/* <div className='main-rightP text-center'>
          <div className='sqr_frame mt-4'>
            <img className='pt-3' src={cup}></img>
          </div>
          <h5 className='mt-2'>Achievements</h5>
          <div className='sqr_frame mt-4'>
            <img className="" src={crown}></img>
          </div>
          <h5 className='mt-2'>Leaderboards</h5>
        </div> */}
        <Modals
          open={this.state.popUp}
          header={
            <div>
              <h6>Tutorial</h6>
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
              <p>AS YOU COMPLETE EACH QUEST. YOU WILL BE REWARDED WITH JOY POINTS AND THE MORE QUESTS YOU COMPLETE THE MORE THE EMPORER WILL BE PLEASED WITH YOU BECOME STRONGER AND MORE EQUIPPED TO TACKLE MORE DIFFICULT CHALLENGES</p>
              <button
                type="button"
                className="img_btn_home"
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
