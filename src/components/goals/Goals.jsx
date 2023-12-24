import React, { Component } from "react";
// import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import close from '../../assets/images/close_ic.svg';
// import Quen from '../../assets/images/queen.svg';
// import queen from '../../assets/images/queen.png';
import insta from "../../assets/images/instgram.svg";
import fb from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/t.svg";
import goalsPF from "../../assets/images/goal_profile.png";
import Progress from "../../assets/images/progress_small.svg";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import close from "../../assets/images/close_ic.svg";
import goal from "../../assets/images/goal.svg";
import decks from "../../assets/images/decks.png";
import GoalServices from "../../services/GoalServices";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import lordGult from '../../assets/images/LordGult.png'
import Modals from '../../commonUtils/Modals'
import coins from '../../assets/images/coins.png'
import crystal from '../../assets/images/crystals.png'
import velocity from '../../assets/images/velocity.png'
import speed from '../../assets/images/speed.png'
import intelligence from '../../assets/images/intelligence.png'
import queen from '../../assets/images/queen.png'


class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: true,
      mainPageFlag: false,
      listGoalsFlag: false,
      userData: {},
      allDeckList: [],
      deckList: [],
      currentIndex: 0,
      lengthofdeckCard: 0,
      time: "",
      isStartTime: false,
      isStopTime: false,
      min: 0,
      sec: 0,
      goalTitle: "",
      isTimerRunning: false,
      isCompleted: false,
      goalDescription: "",
      submitedGoalList: [],
      goalCreatedSucessfully: false,
      goalCompleteByUser: false,
      isbuyGoalCard: false,
      isBuyDeck: false,
      cardsPopup: false,
      decksPopup: false
    };
    this.closePop = this.closePop.bind(this);
    this.navGoalsFlag = this.navGoalsFlag.bind(this);
    this.formGoals = this.formGoals.bind(this);
    this.beginTimer = this.beginTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.contineTimer = this.contineTimer.bind(this);
    this.goalCompleteByUser = this.goalCompleteByUser.bind(this);
    this.buyGoalCard = this.buyGoalCard.bind(this);
    this.buyNewDeck = this.buyNewDeck.bind(this);
  }
  componentWillMount() {
    this.setState({ listGoalsFlag: true }, () => {
      const userData = JSON.parse(sessionStorage.getItem("dailyLogin"));
      this.setState({ userData: userData }, () => {
        this.getDecks(this.state.userData.userCharacterId);
      });
    });
  }

  goalCompleteByUser(cardID, userCharId) {
    GoalServices.goalCompleteByUser(cardID, userCharId).then((res) => {
      if (res) {
        console.log("res", res);
        this.setState({ goalCompleteByUser: true, errorData: res.data });
      }
    }).catch((err) => console.error(err))
  }

  buyGoalCard() {
    let obj = {
      deckId: this.state.allDeckList[0].deckId,
      Category: this.state.cardType,
    };
    GoalServices.buyGoalCard(obj).then((res) => {
      this.setState({ isbuyGoalCard: true, errorData: res.data });
    }).catch((err) => console.error(err))
  }
  buyNewDeck() {
    let obj = {
      userId: this.state.userData.userCharacterId,
      category: "speed",
      deckName: "sra",
    };
    GoalServices.buyNewDeck(obj).then((res) => {
      this.setState({ isBuyDeck: true });
    }).catch((err) => console.error(err))
  }
  contineTimer() {
    this.setState({ isStopTime: false, isStartTime: true }, () => {
      this.timerInterval = setInterval(() => {
        const { min, sec } = this.state;

        if (sec === 0) {
          if (min === 0) {
            clearInterval(this.timerInterval);
            this.setState(
              { isTimerRunning: false, isStopTime: false, isStartTime: true },
              () => {
                this.goalCompleteByUser(
                  this.state.submitedGoalList.goalId,
                  this.state.userData.userCharacterId
                );
              }
            );
          } else {
            this.setState({ min: min - 1, sec: 59 }, () => { });
          }
        } else {
          this.setState({ sec: sec - 1 }, () => { });
        }
      }, 1000);
    });
  }

  beginTimer(ind) {
    this.setState({ isStartTime: true }, () => {
      const list = this.state.deckList.filter((item, index) => index === ind);
      const requestObj = [list].map((item) => {
        let obj = {};
        obj.goalName = this.state.goalTitle;
        obj.goalTitle = item[0].goalId;
        obj.categoryId = item[0].category.goalsCategoryId;
        obj.discreption = this.state.goalDescription;
        obj.timeDuration = this.state.time;
        obj.cardId = item[0].goalId;
        return obj;
      });
      GoalServices.createGoal(requestObj[0]).then((res) => {
        if (res) {
          var heure = this.state.time + "";
          var min = heure.substring(0, 2);
          var sec = heure.substring(3, 5);
          this.setState(
            { min: min, sec: sec, submitedGoalList: res.data },
            () => {
              this.setState({ isTimerRunning: true }, () => {
                this.timerInterval = setInterval(() => {
                  const { min, sec } = this.state;
                  if (sec === 0) {
                    if (min === 0) {
                      clearInterval(this.timerInterval);
                      this.setState({ isTimerRunning: false }, () => {
                        this.goalCompleteByUser(
                          this.state.submitedGoalList.goalId,
                          this.state.userData.userCharacterId
                        );
                      });
                    } else {
                      this.setState({ min: min - 1, sec: 59 }, () => { });
                    }
                  } else {
                    this.setState({ sec: sec - 1 }, () => { });
                  }
                }, 1000);
              });
            }
          );
        }
      }).catch((err) => console.error(err))
    })
  }

  pauseTimer() {
    this.setState({ isStartTime: false, isStopTime: true });
    clearInterval(this.timerInterval);
  }
  navGoalsFlag(ind) {
    console.log("++++++++++++");
    this.setState({ listGoalsFlag: true }, () => {
      const curdeckList = [...this.state.deckList];

      // if(currentIndex >= 0){
      const currentIndex = ind - 1 < curdeckList.length ? ind - 1 : 0;
      if (ind !== 0 && ind < curdeckList.length) {
        const list = this.state.deckList.filter(
          (item, index) => index === currentIndex
        );

        console.log("list", list);
        if (list[0]?.goalDuration !== null) {
          if (list[0]?.completed === false) {
            this.setState({
              // deckList: deckList,
              currentIndex: currentIndex,
              goalTitle: list[0]?.goalTitle,
              time: list[0]?.goalDuration,
              goalDescription: list[0]?.goalDescription,
            });
          } else {
            this.setState(
              {
                goalTitle: list[0]?.goalTitle,
                time: list[0]?.goalDuration,
                goalDescription: list[0]?.goalDescription,
                //listGoalsFlag:false,
                mainPageFlag: true,
                currentIndex: currentIndex,
              },
              () => {
                this.setState({
                  // deckList: deckList,
                  currentIndex: currentIndex,
                });
              }
            );
          }
        } else if (list[0]?.goalDuration === null) {
          console.log("correct right");
          this.setState({
            // deckList: deckList,
            currentIndex: currentIndex,
            goalTitle: "",
            time: "",
            goalDescription: "",
            mainPageFlag: false,
          });
        }
        // }
      }
    });
  }
  formGoals(ind) {
    console.log("ind+++", ind);
    const { currentIndex } = this.state;
    this.setState({ listGoalsFlag: true }, () => {
      const curdeckList = [...this.state.deckList];

      // const currentIndex = ind;
      // console.log('currentIndex',currentIndex)
      // if(currentIndex >= 0){
      const currentIndex = ind + 1 < curdeckList.length ? ind + 1 : 0;
      const list = this.state.deckList.filter(
        (item, index) => index === currentIndex
      );

      console.log("list++", list);
      if (list[0]?.goalDuration !== null) {
        if (list[0]?.completed === false) {
          this.setState({
            currentIndex: currentIndex,
            goalTitle: list[0]?.goalTitle,
            time: list[0]?.goalDuration,
            goalDescription: list[0]?.goalDescription,
          });
        } else {
          this.setState({
            goalTitle: list[0]?.goalTitle,
            time: list[0]?.goalDuration,
            goalDescription: list[0]?.goalDescription,
            // listGoalsFlag:false,
            currentIndex: currentIndex,
            mainPageFlag: true,
          });
        }
      } else if (list[0]?.goalDuration === null) {
        console.log("correct right");
        this.setState({
          // deckList: deckList,
          currentIndex: currentIndex,
          goalTitle: "",
          time: "",
          goalDescription: "",
          mainPageFlag: false,
        });
      }
      // }
    });
  }
  closePop() {
    this.setState({ popUp: false });
  }

  closeGoalComplete = () => {
    this.setState(
      {
        goalCompleteByUser: false,
        isStartTime: false,
        isStopTime: false,
        isbuyGoalCard: false,
        isBuyDeck: false,
      },
      () => {
        if (!this.state.isbuyGoalCard || !this.state.isBuyDeck) {
          this.getDecks(this.state.userData.userCharacterId);
        }
      }
    );
  };

  getDecks(userId) {
    GoalServices.getDecks(userId).then((res) => {
      this.setState(
        { deckList: res.data[0].goalCards, allDeckList: res.data },
        () => {
          console.log("allDeckList", this.state.allDeckList[0].deckId);
          this.setState(
            { lengthofdeckCard: this.state.deckList.length },
            () => {
              if (this.state.deckList[0].goalDuration !== null) {
                if (this.state.deckList[0].completed === false) {
                  this.setState({
                    goalTitle: this.state.deckList[0].goalTitle,
                    time: this.state.deckList[0].goalDuration,
                    goalDescription: this.state.deckList[0].goalDescription,
                  });
                } else {
                  this.setState({
                    goalTitle: this.state.deckList[0].goalTitle,
                    time: this.state.deckList[0].goalDuration,
                    goalDescription: this.state.deckList[0].goalDescription,
                    //listGoalsFlag:false,
                    mainPageFlag: true,
                  });
                }
              } else if (this.state.deckList[0].goalDuration === null) {
                this.setState({
                  goalTitle: "",
                  time: "",
                  goalDescription: "",
                  mainPageFlag: false,
                });
              }
            }
          );
        }
      );
    }).catch((err) => console.error(err))
  }

  deckSelection = (item) => {
    this.setState({ deckList: item.goalCards });
  };

  currentCards = () => {
    const { currentIndex } = this.state
    if (currentIndex > 11) {
      return "Intelligence"
    }
    if (currentIndex > 5) {
      return "Velocity"
    }
    else {
      return "Speed"
    }
  }

  openCards = () => {
    this.setState({ cardsPopup: !this.state.cardsPopup })
  }

  openDecks = () => {
    this.setState({ decksPopup: !this.state.decksPopup })
  }

  selectCard = (type) => {
    this.setState({ cardType: type })
  }

  render() {
    const { currentIndex, lengthofdeckCard, isTimerRunning, min, sec } =
      this.state;
    return (
      <div className="main">
        <div className="main-middleP">
          <div className="rect_large_content">
            <div className="row p-l-2">
              <div className="col-3 goals-left p-r-0">
                <img alt='' src={goal}></img>
                <h5 className="text-green fs-20">Goals</h5>
                <label className="text-white fs-14 d-block">
                  Accomplish your goals with these cards
                </label>
                <div className="mt-1">
                  <button
                    type="button"
                    className="img_btn_home btn-w125 btn-h64"
                    onClick={() => this.openCards()}
                  >
                    Buy a card
                  </button>
                  <span>
                    <button
                      type="button"
                      className="img_btn_home btn-w125 btn-h64"
                      onClick={() => this.openDecks()}
                    >
                      Buy a deck
                    </button>
                    <label className="text-center text-white d-block p-l-5">
                      20 cards (max)
                    </label>
                  </span>
                </div>
                <div className="mt-1 deck">
                  <h5 className="fs-16 text-white">Decks</h5>
                  {this.state.allDeckList.map((itmes, index) => {
                    return (
                      <span key={index}>
                        <img alt=''
                          src={decks}
                          onClick={() => this.deckSelection(itmes)}
                        ></img>
                      </span>
                    );
                  })}

                  {/* <span><img alt='' src={decks}></img></span>
                  <span><img alt='' src={decks}></img></span> */}
                </div>
              </div>

              {/* {this.state.mainPageFlag && (
                <div className='col-7'>
                  <div className='row'>
                    <div className="col-5 p-l-0 goals-middle">
                    </div>
                    <div className='col-7 goals-right p-r-0 p-l-5'>
                      <div className="slider cursor" >
                        <label><span>Task:</span> Lorem ipsum dolor sit amet</label>
                        <label><span>Time:</span> 10:50</label>
                        <label>Description:</label>
                        <p>Ut et varius quis mi senectus. Ultrices integer eget nisl gravida vitae. Volutpat purus integer natoque neque fermentum tincidunt tellus. Et dui dictum ullamcorper molestie vel duis. Ornare nunc ipsum mattis urna amet amet. Facilisi id odio netus tempus vitae elit diam. ipsum mattis urna amet amet. Facilisi id odio netus tempus vitae elit diam. Facilisi id odio netus tempus vitae elit diam.</p>
                        <label className='text-green'>completed on 28 jan, 2023</label>
                      </div>
                      <div className='text-center arrow'>
                        <h5 className='text-white fs-12 mb-1 mt-1'>7 /10 Cards</h5>
                        <img alt='' className="cursor m-r-2" src={left}></img>
                        <img alt='' className="cursor" src={right} onClick={this.navGoalsFlag}></img>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}

              {/* {this.state.goalCompleteByUser &&( */}
              <Modals
                open={this.state.cardsPopup}
                header={
                  <div>
                    <h5>GET A GOAL CARD</h5>
                    <button
                      type="button"
                      className="close_btn"
                      onClick={() => this.openCards()}
                    >
                      <img alt='' src={close}></img>
                    </button>
                  </div>
                }
                body={
                  <div className="text-center">
                    <span>CONTINUE A NEW TASK WITH THIS MAGIC CARD PICK THE CARD YOU WANT TO PLAY WITH 100 <img alt='' src={coins} /> </span>
                    <div className="d-flex justify-content-around mt-5">
                      <div>
                        <img alt='' src={speed} onClick={() => this.selectCard("speed")} />
                        <h5>Speed</h5>
                      </div>
                      <div>
                        <img alt='' src={velocity} onClick={() => this.selectCard("velocity")} />
                        <h5>Velocity</h5>
                      </div>
                      <div>
                        <img alt='' src={intelligence} onClick={() => this.selectCard("intelligence")} />
                        <h5>Intelligence</h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mt-4">
                      <img alt='' src={queen} />
                      <button
                        type="button"
                        className="img_btn_home ml-5"
                        onClick={this.buyGoalCard}
                      >
                        Indeed
                      </button>
                    </div>
                  </div>
                }
                footer={
                  <div className="text-center">
                  </div>
                }
              />
              <Modals
                open={this.state.decksPopup}
                header={
                  <div>
                    <h5>GET A GOAL DECK</h5>
                    <button
                      type="button"
                      className="close_btn"
                      onClick={() => this.openDecks()}
                    >
                      <img alt='' src={close}></img>
                    </button>
                  </div>
                }
                body={
                  <div className="text-center">
                    <span>TAKE YOUR GOALS To THE NEXT LEVEL WITH A BRAND NEW GOAL DECK
                      <br />
                      DO YOU WANT TO PURCHASE THE DECK FOR 30 <img alt='' src={crystal} className="h-25" /> </span>
                    <div>
                      <img alt='' src={decks} className="h-25 w-25" />
                    </div>

                    <div className="d-flex justify-content-start mt-4">
                      <img alt='' src={queen} />
                      <button
                        type="button"
                        className="img_btn_home"
                        onClick={this.buyNewDeck}
                      >
                        Indeed
                      </button>
                    </div>
                  </div>
                }
                footer={
                  <div></div>
                }
              />

              <Modals
                open={this.state.goalCompleteByUser}
                header={
                  <div>
                    <h5 className="text-white">Goal</h5>
                    <button
                      type="button"
                      className="close_btn"
                      onClick={() => this.closeGoalComplete()}
                    >
                      <img alt='' src={close}></img>
                    </button>
                  </div>
                }
                body={
                  <div className="frame text-center">
                    {/* <h4 className="">
          
            </h4> */}
                    <p>Goal Completed Successfully</p>

                    <button
                      type="button"
                      className="img_btn_home"
                      onClick={this.closeGoalComplete}
                    >
                      Ok
                    </button>
                  </div>
                }
              />
              <Modals
                open={this.state.isbuyGoalCard}
                header={
                  <div>
                    <h5 className="text-white">Goal Card</h5>
                    <button
                      type="button"
                      className="close_btn"
                      onClick={() => this.closeGoalComplete()}
                    >
                      <img alt='' src={close}></img>
                    </button>
                  </div>
                }
                body={
                  <div className="frame text-center">
                    {/* <h4 className="">
          
            </h4> */}
                    <p></p>


                    <button
                      type="button"
                      className="img_btn_home"
                      onClick={this.closeGoalComplete}
                    >
                      Ok
                    </button>
                  </div>
                }
              />
              {/* )} */}

              <Modals open={this.state.isBuyDeck}
                header={
                  <div>
                    <h5 className="modal-header">Deck</h5>
                    <button
                      type="button"
                      className="close_btn"
                      onClick={() => this.closeGoalComplete()}
                    >
                      <img alt='' src={close}></img>
                    </button>
                  </div>
                }
                body={
                  <div className="frame text-center">
                    {/* <h4 className="">
          
            </h4> */}
                    <p></p>

                    <button
                      type="button"
                      className="img_btn_home"
                      onClick={this.closeGoalComplete}
                    >
                      Ok
                    </button>
                  </div>
                }
              />
              {/* )} */}

              {this.state.listGoalsFlag && this.state.deckList.length > 0 && (
                <div className="col-8">
                  <div className="row">
                    <div className="col-5 p-l-0 goals-middle">
                      <img alt='' id="lordGult" src={lordGult} alt="lrd og guilt" />
                      <label>Lord of Gult</label>
                    </div>
                    <div className="col-7 goals-right p-r-0 p-l-5">
                      {this.state.mainPageFlag === false && (
                        <div className="slider p-l-2 p-r-2">
                          <div className="form">
                            <div className="form-group mb-0">
                              <label>Task</label>
                              <input
                                value={this.state.goalTitle}
                                type="text"
                                className="form-control form-control-small"
                                placeholder="Enter Task"
                                onChange={(e) => {
                                  this.setState({ goalTitle: e.target.value });
                                }}
                              ></input>
                            </div>
                            <div className="form-group mb-0">
                              <label>Time</label>
                              <input
                                value={this.state.time}
                                type="time"
                                className="form-control form-control-small"
                                placeholder="Enter Time"
                                onChange={(e) => {
                                  this.setState(
                                    { time: e.target.value },
                                    () => { }
                                  );
                                }}
                              ></input>
                            </div>
                            <div className="form-group mb-0">
                              <label>Description</label>
                              <textarea
                                rows="2"
                                cols="4"
                                className="form-control form-control-large"
                                placeholder="Enter Text"
                                value={this.state.goalDescription}
                                onChange={(e) => {
                                  this.setState({
                                    goalDescription: e.target.value,
                                  });
                                }}
                              ></textarea>
                            </div>
                            <div className="d-flex flex-row justify-content-around align-items-center">
                              <div className="">
                                <div className="text-center">
                                  {(!this.state.isStartTime &&
                                    this.state.isStopTime) ||
                                    (this.state.isStartTime &&
                                      !this.state.isStopTime) ||
                                    (!this.state.isStartTime &&
                                      !this.state.isStopTime && (
                                        <button
                                          type="button"
                                          className="img_btn_home btn-w85 btn-h44 mt-2"
                                          onClick={() => {
                                            this.beginTimer(currentIndex);
                                          }}
                                        >
                                          Begin
                                        </button>
                                      ))}
                                </div>
                                <div className="text-center">
                                  {this.state.isStartTime && (
                                    <button
                                      type="button"
                                      className="img_btn_home btn-w85 btn-h44 mt-2"
                                      onClick={() => {
                                        this.pauseTimer();
                                      }}
                                    >
                                      pause
                                    </button>
                                  )}
                                  {this.state.isStopTime && (
                                    <button
                                      type="button"
                                      className="img_btn_home btn-w85 btn-h44 mt-2"
                                      onClick={() => {
                                        this.contineTimer();
                                      }}
                                    >
                                      continue
                                    </button>
                                  )}
                                </div>
                                <div className="text-center arrow">
                                  <h5 className="text-white fs-12 mb-1 mt-1">
                                    {currentIndex === 0
                                      ? currentIndex + 1
                                      : currentIndex + 1}{" "}
                                    /{this.state.deckList.length} Cards
                                  </h5>
                                  <img alt=''
                                    className="cursor m-r-2"
                                    src={left}
                                    alt="left"
                                    onClick={() => this.navGoalsFlag(currentIndex)}
                                  ></img>
                                  <img alt=''
                                    className="cursor"
                                    src={right}
                                    alt="right"
                                    onClick={() => this.formGoals(currentIndex)}
                                  ></img>
                                </div>
                              </div>
                              <div className="d-flex flex-column justify-content-center align-items-center">
                                {isTimerRunning && (
                                  <div className="text-center">
                                    {min}:{sec < 10 ? "0" + sec : sec}
                                  </div>
                                )}
                                <span className={`"imageGrp" ${this.currentCards()}`}>
                                  <p className="cardName">{this.currentCards()}</p>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.mainPageFlag && (
                        <div className="slider cursor">
                          <label>
                            <span>Task:</span> {this.state.goalTitle}
                          </label>
                          <label>
                            <span>Time:</span> {this.state.time}
                          </label>
                          <label>Description:</label>
                          <p>{this.state.goalDescription}</p>
                          <label className="text-green">
                            completed on 28 jan, 2023
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* {this.state.cardPageFlag && (
                    this.state.deckList.map((ele,index)=>{
                      
                    return (
                      ele.goalCards.map((item,ind) =>{
                        return(
                <div className='col-7'>
                 {console.log('lllllllllllllll')}
                  <div className='row'>
                    <div className="col-5 p-l-0 goals-middle">
                      <img alt='' className="img_pro" src={goalsPF}></img>
                      <h5>Lord od Guilt</h5>
                      <div className="">
                        <h5 className='text-white fs-10 mb-1 mt-1 text-right'>100 / 150</h5>
                        <img alt='' className='prog_bar' src={Progress}></img>
                      </div>
                    </div>
                    <div className='col-7 goals-right p-r-0 p-l-5'>
                      <div className="slider p-l-2 p-r-2">
                        <div className='form'>
                          <div className='form-group mb-0'>
                            <label>Task</label>
                            <input type="text" className='form-control form-control-small' placeholder='Enter Task'></input>
                          </div>
                          <div className='form-group mb-0'>
                            <label>Time</label>
                            <input type="time" className='form-control form-control-small' placeholder='Enter Time'></input>
                          </div>
                          <div className='form-group mb-0'>
                            <label>Description</label>
                            <textarea rows="2" cols="4" className='form-control form-control-large' placeholder='Enter Text'></textarea>
                          </div>
                          <div className='text-center'>
                            <button type="button" className="img_btn_home btn-w85 btn-h44 mt-2">Begin</button>
                          </div>
                        </div>
                      </div>
                      <div className='text-center arrow'>
                        <h5 className='text-white fs-12 mb-1 mt-1'>{ind+1} /{ele.goalCards.lengthh}  Cards</h5>
                        <img alt='' className="cursor m-r-2" src={left}></img>
                        <img alt='' className="cursor" src={right} onClick={this.formGoals}></img>
                      </div>
                    </div>
                  </div>
                </div>
                 )

                })
                    )
              })
              )} */}
            </div>
            {/* <h1 className='text-red'>Goals</h1> */}
          </div>
        </div>
      </div >
    );
  }
}
export default Goals;
