import React, { Component } from "react";
import logo from "../../assets/images/logo.svg";
import close from "../../assets/images/close_ic.svg";
import or from "../../assets/images/or.svg";
import key from "../../assets/images/key.svg";
import checked from "../../assets/images/checked.svg";
import apple from "../../assets/images/sign_up_apple_btn.svg";
import google from "../../assets/images/sign_up_google_btn.svg";
import facebbok from "../../assets/images/sign_up_facebook_btn.svg";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { withRouter } from "react-router-dom";
import LoginService from "../../services/LoginService";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import warrior from '../../assets/images/char_war.png';
import archangel from '../../assets/images/char_angel.png';
import assassin from '../../assets/images/char_assign.png';
import ErrorDisplaypop from "../ErrorDisplay/ErrorDisplaypop";
import Input from "../../commonUtils/Input";
import { toast } from "react-toast";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authMode: "signin",
      email: "",
      fullName: "",
      password: "",
      isRegister: false,
      forgetpass: false,
      resetPass: false,
      registerUserName: "",
      registerUserConfiPassword: "",
      registerUserPassword: "",
      registerUserEmail: "",
      userPassword: "",
      userName: "",
      useremail: "",
      tempPassword: "",
      newPassword: "",
      samePassword: "",
      isDailyUpdates: false,
      isValidEmail: false,
      isConfirmPassword: false,
      characterList: [],
      charecterSelection: false,
      userErrorpop: false,
      heroType: '',
      heroProceed: false,
      termsCheck: false,
      slectedCharacterId: 0
    };
    this.goToDashBoard = this.goToDashBoard.bind(this);
    this.gotoRegister = this.gotoRegister.bind(this);
    this.forgetPassword = this.forgetPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.sentVerficationCode = this.sentVerficationCode.bind(this);
    this.gotoLogin = this.gotoLogin.bind(this);
    this.userRegister = this.userRegister.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.confirmLogin = this.confirmLogin.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getMasterCharacters = this.getMasterCharacters.bind(this);
    this.gotoCharcterList = this.gotoCharcterList.bind(this);
  }

  goToDashBoard() {
    this.props.history.push("/home");
  }

  gotoRegister() {
    console.log('000000000');
    this.setState({ isRegister: true }, () => {
      this.getMasterCharacters();
    });
  }
  gotoCharcterList() {
    const isValid = this.validationForm();
    if (isValid) {
      this.setState({ charecterSelection: true });
    }
  }

  validationForm = () => {
    // alert(this.state.termsCheck)
    let isValid = true;
    const emailReg = /^\w+([\\.-]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/;
    if (this.state.registerUserName.length < 5) {
      isValid = false;
      alert("Username must be more than 5 charectors length");
    }
    if (this.state.registerUserPassword.length < 6 && this.state.registerUserPassword !== this.state.registerUserConfiPassword) {
      isValid = false;
      alert("Passwords are not matching");
    }
    if (emailReg.test(this.state.registerUserEmail) === false) {
      isValid = false;
      alert("Email is mandatory");
    }
    if (this.state.termsCheck === false) {
      isValid = false;
      alert("Please accept the terms & conditions");
    }
    return isValid;
  };

  getMasterCharacters() {
    LoginService.getMasterCharacters().then((res) => {
      if (res.data) {
        res.data.forEach((ele, index) => {
          const obj = {
            id: ele.characterId,
            value: ele.characterName,
            label: ele.characterName,
          };
          console.log("obj char", obj);
          this.state.characterList.push(obj);
        });
        this.setState({ characterList: this.state.characterList });
      }
    }).catch((err) => console.error(err));

  }

  forgetPassword() {
    this.setState({ forgetpass: true });
  }

  sentVerficationCode() {
    if (this.state.useremail) {
      let obj = {
        emailAddress: this.state.useremail,
      };
      LoginService.sentVerficationCode(obj).then((res) => {
        if (res) {
          this.setState({ resetPass: true });
        }
      }).catch((err) => console.error(err));
    }
  }

  resetPassword() {
    if (
      this.state.useremail &&
      this.state.tempPassword &&
      this.state.newPassword
    ) {
      let obj = {
        emailAddress: this.state.useremail,
        tempPassword: this.state.tempPassword,
        newPassword: this.state.newPassword,
      };
      LoginService.resetPassword(obj).then((res) => {
        if (res.status === 200) {
          this.setState({
            isRegister: false,
            forgetpass: false,
            resetPass: false,
            samePassword: "",
            newpassword: "",
            tempPassword: "",
            useremail: "",
          });
        }
      }).catch((err) => console.error(err));
    }
  }

  gotoLogin() {
    this.setState({ isRegister: false, forgetpass: false, resetPass: false, isConfirmPassword: false, isValidEmail: false, registerUserName: '', registerUserEmail: '', registerUserPassword: '', registerUserConfiPassword: '' });
  }

  userRegister() {
    if (
      this.state.registerUserName &&
      this.state.registerUserEmail &&
      this.state.registerUserPassword &&
      this.state.registerUserPassword === this.state.registerUserConfiPassword &&
      this.state.slectedCharacterId !== 0
    ) {
      let obj = {
        userName: this.state.registerUserName,
        emailAddress: this.state.registerUserEmail,
        password: this.state.registerUserPassword,
        selectedCharacterId: this.state.slectedCharacterId
      };
      LoginService.userRegister(obj).then((res) => {
        if (res.status === 200) {
          toast("Verification Sent To your Mail Id");
          this.setState(
            {
              isRegister: false,
              forgetpass: false,
              resetPass: false,
              registerUserName: "",
              registerUserEmail: "",
              registerUserPassword: "",
              registerUserConfiPassword: "",
              userName: "",
              userPassword: "",
              isConfirmPassword: false, isValidEmail: false,
              charecterSelection: false
            },
            () => { }
          );
        }
      }).catch((err) => console.error(err));
    } else {
      // if(!this.state.slectedCharacterId) {
      //   alert("charectorId not found")
      // }
      console.log( this.state.registerUserName,
        this.state.registerUserEmail,
        this.state.registerUserPassword,
        this.state.isValidEmail,
        this.state.isConfirmPassword,
        this.state.slectedCharacterId )
      alert("Please Enter All Input Fields");
    }
  }
  loginUser() {
    if (this.state.userName && this.state.userPassword) {
      let obj = {
        userName: this.state.userName,
        password: this.state.userPassword,
      };
      LoginService.loginUser(obj).then((res) => {
        console.log('res', res);
        if (res) {
          if (res.data.jwttoken && res.status === 200) {
            this.setState(
              { userPassword: "", userName: "", isDailyUpdates: true },
              () => {
                const token = res.data.jwttoken;
                sessionStorage.setItem(
                  "user",
                  JSON.stringify(jwt_decode(token))
                );
                sessionStorage.setItem("token", JSON.stringify(token));
                if (token) {
                  this.props.history.push("/dailylogin");
                }
                sessionStorage.setItem("buttonName", "MAP");
              }
            );
          } else {
            this.setState({ userErrorpop: true }, () => {

              // <ErrorDisplaypop res={ res} />
            });
          }
        } else {
          <ErrorDisplaypop />;
        }
      }).catch((err) => console.error(err));
    }
  }

  selectChar = (e) => {
    this.setState({ slectedCharacterId: e.target.value });

  };

  confirmLogin() {
    this.setState({ isDailyUpdates: false }, () => {
      this.props.history.push("/welcomebackscreen");
    });
  }

  hideModal() {
    this.setState({ isDailyUpdates: false });
  }

  handleEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (this.state.registerUserEmail.match(emailRegex)) {
      return true
    } else {
      return false
    }
  };


  handleConfirmPassword = (e) => {
    e.preventDefault();
    if (this.state.registerUserPassword === this.state.registerUserConfiPassword) {
      this.setState({ isConfirmPassword: true });
    }
    else {
      this.setState({ isConfirmPassword: false });
    }
  };

  hideCharcterpop = () => {
    this.setState({ charecterSelection: false }, () => {

    });
  };

  selectHero = (type, id) => {
    this.setState({ heroType: type, slectedCharacterId: id });
  };

  proceedHero = () => {
    // alert(this.state.heroType)
    this.setState({ heroProceed: !this.state.heroProceed });
  };
  proceedBack = () => {
    this.setState({ heroProceed: !this.state.heroProceed, heroType: '' });
  };

  heroSrc = () => {
    let heroType = this.state.heroType;
    if (heroType === 'warrior') {
      return warrior;
    } else if (heroType === 'archangel') {
      return archangel;
    } else if (heroType === 'assassin') {
      return assassin;
    } else {
      return;
    }
  };

  render() {
    return (
      <div>
        <div className="logo-head d-flex">
          <div>
            <Modal isOpen={this.state.isDailyUpdates} size="md">
              <ModalHeader>Daily Login </ModalHeader>
              <ModalBody>
                <div className="row ">
                  <div className="col text-center">
                    <h6 className="mt-2">"Daily User Login"</h6>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  className="btn btn-bdr active fs-12"
                  onClick={this.hideModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-bdr active fs-12"
                  onClick={this.confirmLogin}
                >
                  Confirm
                </button>
              </ModalFooter>
            </Modal>
          </div>
          <img alt="" src={logo} className="text-center"></img>
        </div>

        <div>
          <Modal isOpen={this.state.charecterSelection}>
            <div className="modal-header text-black-sec">Character</div>
            <button
              type="button"
              className="close_btn"
              onClick={() => this.hideCharcterpop()}
            >
              <img alt="" src={close}></img>
            </button>
            <div className="modal-body  frame text-center">
              <div className="char">
                <h3 className="text-success mt-5">CHOOSE YOUR HERO</h3>
                <h6 className="font-weight-light fs-20 mt-2">Role-play with one of these iconic legends. You can always unlock new character and switch.</h6>
                {this.state.heroProceed ?
                  <div>
                    <div className="profile">
                      <img alt="" src={this.heroSrc()} />
                    </div>
                  </div> :
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <div className="pl-4 pt-1 pr-4 pb-0">
                      <div className="profile">
                        <img className={this.state.slectedCharacterId === 2 ? "profile-selected" : ""} alt="" src={archangel} onClick={() => this.selectHero('archangel', 2)}></img>
                      </div>
                    </div>

                    <div className="pl-4 pt-3 pr-4 pb-0">
                      <div className="profile">
                        <img className={this.state.slectedCharacterId === 1 ? "profile-selected" : ""}  alt="" src={warrior} onClick={() => this.selectHero('warrior', 1)}></img>
                      </div>
                    </div>

                    <div className="pl-4 pt-3 pr-4 pb-0">
                      <div className="profile">
                        <img className={this.state.slectedCharacterId === 3 ? "profile-selected" : ""} alt=""  src={assassin} onClick={() => this.selectHero('assassin', 3)}></img>
                      </div>
                    </div>
                  </div>}
                <div className="row w-100">
                  {this.state.heroProceed ?
                    <div className="m-a pt-3 pl-5">
                      <button
                        type="button"
                        className={"img_btn_home"}
                        onClick={this.userRegister}
                      >
                        Indeed
                      </button>
                      <button
                        type="button"
                        className="img_btn_brown"
                        onClick={this.proceedBack}
                      >
                        Not Now
                      </button>
                    </div>
                    :
                    <div className="m-a pt-3 pl-5">
                      <button
                        type="button"
                        className={this.state.heroType ? "img_btn_home" : "img_btn_brown"}
                        onClick={this.proceedHero}
                      >
                        Proceed
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>

          </Modal>
        </div>

        {/* Login */}

        {!this.state.isRegister && !this.state.forgetpass && (
          <div className="login">
            <div className="header">Sign In</div>
            <button type="button" className="close_btn">
              {/* <img  src={close}></img> */}
            </button>
            <div className="body">
              <h5 className="text-center mt-5 pt-5">
                Turn your goals into a Role-Playing game
              </h5>
              <div className="">
                <div className="d-flex justify-content-around align-items-center">
                  <Input name="player Name" type="text" update={(value) => this.setState({ userName: value })} />
                  <Input name="password" type="password" update={(value) => this.setState({ userPassword: value })} />
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <div className="check-marked">
                    <img  src={checked} alt="check"></img>
                    <span> Remember Me</span>
                  </div>
                  <button
                    className="btn-transparent"
                    type="button"
                    onClick={() => this.forgetPassword()}
                  >
                    Forgot Password ?
                  </button>
                </div>
                <div className="col-12 text-center">
                  <button
                    className="img_btn"
                    type="button"
                    onClick={() => this.loginUser()}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!this.state.isRegister && !this.state.forgetpass && (
          <div className="row">
            <div className="container login-list text-center">
              <button
                className="btn-transparent mt-2 fs-20"
                type="button"
                onClick={() => this.gotoRegister()}
              >
                Not Register Yet ? <span className="text-green"> Register</span>
              </button>
              <div className="text-center">
                <img  className="mb-2" src={or} alt=""></img>
              </div>
            </div>
          </div>
        )}

        {/* Register User */}

        {this.state.isRegister && !this.state.forgetpass && (
          <div className="login">
            <div className="header">Register Form</div>
            <button type="button" className="close_btn">
              {/* <img  src={close}></img> */}
            </button>
            <div className="body">
              <h5 className="text-center mt-5 mb-2  pt-3">
                Behold the world of scholastic adventure.
              </h5>
              <div className="">
                <div className="d-flex justify-content-center align-items-center">
                  <Input name="player Name" type="text" update={(value) => this.setState({ registerUserName: value })} />
                  <Input name="Email" type="email" update={(value) => this.setState({ registerUserEmail: value })}  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <Input name="Password" type="password" update={(value) => this.setState({ registerUserPassword: value })} />
                  <Input name="Confirm Password" type="password" update={(value) => this.setState({ registerUserConfiPassword: value })} />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <div>
                    <input type="checkbox" onChange={() => this.setState({ termsCheck: !this.state.termsCheck })}></input>
                    <span className="text-white fs-8"> {" "}I AGREE WITH TERMS AND CONDITIONS</span>
                  </div>
                  <div>
                    <input type="checkbox"></input>
                    <span className="text-white fs-8"> {" "}SIGNUP FOR NEWSLETTER AND UPDATES</span>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button
                    type="button"
                    // className="img_btn"
                    className={(this.state.isConfirmPassword && this.state.isValidEmail) ? "img_btn" : "img_btn_brown btn-w125 btn-h64"}
                    onClick={() => this.gotoCharcterList()}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.isRegister && !this.state.forgetpass && (
          <div className="container login-list text-center">
            <button
              className="btn-transparent fs-20  mt-2"
              type="button"
              onClick={() => this.gotoLogin()}
            >
              already have an account ?{" "}
              <span className="text-green"> log in</span>
            </button>
            <div className="text-center">
              <img  alt="" className="mb-2" src={or}></img>
            </div>
          </div>
        )}

        {!this.state.forgetpass && (
          <div className={"row mt-3"}>
            <div className="container login-list text-center">
              <ul>
                <li>
                  <button className="btn-transparent" type="button">
                    <img alt=""  src={apple}></img>
                  </button>
                </li>
                <li>
                  <button className="btn-transparent" type="button">
                    <img alt=""  src={google}></img>
                  </button>
                </li>
                <li>
                  <button className="btn-transparent" type="button">
                    <img alt=""  src={facebbok}></img>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* sent email verfication code  */}

        {!this.state.isRegister &&
          this.state.forgetpass &&
          !this.state.resetPass && (
            <div className="login">
              <div className="header">Forgot Password</div>
              <button type="button" className="close_btn" onClick={() => this.gotoLogin()}>
                <img  src={close} alt="close" className="cursor-pointer"></img>
              </button>
              <div className="body">

                <h5 className="text-center mt-5 pt-3 mb-1 fs-16">
                  Enter your email address
                </h5>
                <div className="d-flex justify-content-center flex-column align-items-center">
                      <Input name="Email" type="text" update={(value) => this.setState({ useremail: value })} />
                  <div className="col-6 p-r-2">
                    <div className="form-group mb-3">
                    </div>
                  </div>
                  <div className="col-12 text-center mt-1 mb-0">
                    <h5 className="fs-16 text-white">
                      lost the key ? the scout will send you a new one <br></br>{" "}
                      forgot username ?
                    </h5>
                  </div>
                  <div className="col-12 text-center">
                    <img  className="key-img" src={key} alt="key"></img>
                  </div>
                  <div className="col-12 text-center">
                    <button
                      type="button"
                      className="img_btn"
                      onClick={() => this.sentVerficationCode()}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Reset password */}

        {this.state.resetPass && (
          <div className="login">
            <div className="header">Reset Password</div>
            <button type="button" className="close_btn">
              <img  alt="" src={close}></img>
            </button>
            {/* <h5 className="text-center">Turn your goals into a Role-Playing game</h5> */}
            <div className="row justify-content-md-center">
              <div className="col-6 p-l-1">
                <div className="form-group mb-0">
                  <div className="labl">Current Password</div>
                  <input
                    type="text"
                    className="form-control-name form-control"
                    value={this.state.tempPassword}
                    onChange={(e) => {
                      this.setState({ tempPassword: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
              <div className="col-6 p-l-1">
                <div className="form-group mb-0">
                  <div className="labl">New Password</div>
                  <input
                    type="text"
                    className="form-control-name form-control"
                    value={this.state.newPassword}
                    onChange={(e) => {
                      this.setState({ newPassword: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
              <div className="col-6 p-l-1">
                <div className="form-group mb-0">
                  <div className="labl">Confirm Password</div>
                  <input
                    type="text"
                    className="form-control-name form-control"
                    value={this.state.samePassword}
                    onChange={(e) => {
                      this.setState({ samePassword: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
              <div className="col-12 text-center">
                <button
                  type="button"
                  className="img_btn"
                  onClick={() => this.resetPassword()}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Login);
