import React, { Component } from "react";
// import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import close from '../../assets/images/close_ic.svg';
// import Quen from '../../assets/images/queen.svg';
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
// import ReactBootstrapCarousel from "react-bootstrap-carousel";
// import 'bootstrap/dist/css/bootstrap.min.css';

import door from "../../assets/images/door.svg";
import decks from "../../assets/images/decks.png";
import blog from "../../assets/images/blogs.svg";
import blogNotes from "../../assets/images/notes_blog.png";
import blogCt1 from "../../assets/images/blog_ct1.png";
import blogCt2 from "../../assets/images/blog_ct2.png";
import blogCt3 from "../../assets/images/blog_ct3.png";
import blogCt4 from "../../assets/images/blog_ct4.png";
import blogNt1 from "../../assets/images/blog_nt1.png";
import blogFire from "../../assets/images/blog_fire.png";
import coinFrame from "../../assets/images/coinsFrame.png";
import crystalFrame from "../../assets/images/crystalFrame.png";
import xpFrame from "../../assets/images/xpPoints.png";
import xp from "../../assets/images/xp.png";
import coin from "../../assets/images/coins.png";
import crystal from "../../assets/images/crystals.png";
import blogBook from "../../assets/images/blog_book.png";
import video from "../../assets/images/videos.svg";
import survey from "../../assets/images/surves.svg";
import Video_p1 from "../../assets/images/video_p1.png";
import LearningTravenService from "../../services/LearningTravenService";
import close from "../../assets/images/close_ic.svg";
import Modals from "../../commonUtils/Modals";
import Bars from "../../commonUtils/Bars";

class LearningTraven extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: true,
      index: 0,
      mainPageFlag: false,
      blogCateoryFlag: false,
      listOfBlogs: false,
      vieBlog: false,
      createBlog: false,
      videosCateoryFlag: false,
      listOfVideos: false,
      viewVideo: false,
      embedId: "obLxIdghoEA",
      allBlogs: [],
      selectedBlogList: [],
      min: "",
      sec: "",
      isTimerRunning: false,
      isPause: false,
      isContinueTime: false,
      data: ["Strength", "Plan", "Future", "Passion", "Resource"],
      course: "",
      title: "",
      subTitle: "",
      keywords: "",
      stregthBlogList: [],
      futureBlogList: [],
      passionBlogList: [],
      blogList: [],
      planBlogList: [],
      allVedios: [],
      futureVedioList: [],
      passionVedioList: [],
      StrengthVedioList: [],
      plansVedioList: [],
      vedioList: [],
      blogCreate: false,
      blogRead: false,
      surveyCateoryFlag: false,
    };
    this.closePop = this.closePop.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.navTravensBlogs = this.navTravensBlogs.bind(this);
    this.navTravensVidoes = this.navTravensVidoes.bind(this);
    this.navBlogs = this.navBlogs.bind(this);
    this.navVideos = this.navVideos.bind(this);
    // this.readBlog = this.readBlog.bind(this);
    this.viewVideo = this.viewVideo.bind(this);
    this.postBlog = this.postBlog.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.submit = this.submit.bind(this);
    this.navFuture = this.navFuture.bind(this);
    this.navPassion = this.navPassion.bind(this);
    this.navPlanVideos = this.navPlanVideos.bind(this);
    this.navFutureVedios = this.navFutureVedios.bind(this);
    this.navPassionVedio = this.navPassionVedio.bind(this);
    this.getBlogCategoriesList = this.getBlogCategoriesList.bind(this);
  }
  componentWillMount() {
    this.setState({ mainPageFlag: true });
    this.getBlogCategoriesList();
  }
  handleSelect(selectedIndex, e) {
    this.setState({ index: selectedIndex });
  }
  navTravensBlogs() {
    this.setState({ mainPageFlag: false, blogCateoryFlag: true }, () => {
      LearningTravenService.getAllBlogsBasedOnCategoryID()
        .then((res) => {
          this.setState({ allBlogs: res.data }, () => {
            this.state.allBlogs.forEach((ele) => {
              if (ele?.category?.categoryName === "Strengths") {
                this.state.stregthBlogList.push(ele);
              } else if (ele?.category?.categoryName === "Future") {
                this.state.passionBlogList.push(ele);
              } else if (ele?.category?.categoryName === "Passion") {
                this.state.passionBlogList.push(ele);
              } else if (ele?.category?.categoryName === "Plan") {
                this.state.planBlogList.push(ele);
              }
            });
          });
        })
        .catch((err) => console.error(err));
    });
  }

  openSurveys = () => {
    this.setState({ mainPageFlag: false, surveyCateoryFlag: true }
      , () => {
        this.getBlogCategoriesList();
      });
  };

  getBlogCategoriesList() {
    LearningTravenService.getAllBlogCategories()
      .then((res) => {
        console.log({ res });
        this.setState({ surveyList: res.data });
      });
  }

  navGoBack = () => {
    this.setState({
      mainPageFlag: false,
      blogCateoryFlag: true,
      listOfBlogs: false,
      viewBlog: false,
      createBlog: false,
    });
  };
  navMainPage = () => {
    this.setState({
      mainPageFlag: true,
      blogCateoryFlag: false,
      listOfBlogs: false,
      viewBlog: false,
      createBlog: false,
      surveyCateoryFlag: false
    });
  };

  navTravensVidoes() {
    this.setState({ mainPageFlag: false, videosCateoryFlag: true }, () => {
      LearningTravenService.getAllVideos()
        .then((res) => {
          this.setState({ allVedios: res.data }, () => {
            this.state.allVedios.forEach((ele) => {
              if (ele?.category?.categoryName === "Strengths") {
                this.state.StrengthVedioList.push(ele);
              } else if (ele?.category?.categoryName === "Future") {
                this.state.futureVedioList.push(ele);
              } else if (ele?.category?.categoryName === "Passion") {
                this.state.passionVedioList.push(ele);
              } else if (ele?.category?.categoryName === "Plan") {
                this.state.plansVedioList.push(ele);
              }
            });
          });
        })
        .catch((err) => console.error(err));
    });
  }
  navBlogs() {
    this.setState({
      blogCateoryFlag: false,
      listOfBlogs: true,
      blogList: this.state.stregthBlogList,
    });
    // LearningTravenService.getAllBlogsBasedOnCategoryID().then((res) => {
    //   this.setState({allBlogs :res.data},()=>{
    //     this.state.allBlogs.forEach((ele) =>{
    //       if(ele?.category?.categoryName === 'Strengths'){
    //         this.state.stregthBlogList.push(ele);
    //       }else if(ele?.category?.categoryName === 'Future'){
    //           this.state.passionBlogList.push(ele);
    //       }
    //       else if(ele?.category?.categoryName === 'Passion'){
    //           this.state.passionBlogList.push(ele);
    //       }
    //       else if(ele?.category?.categoryName === 'Plan'){
    //         this.state.planBlogList.push(ele);
    //     }
    //     })
    //   })

    // });
  }
  navPlans() {
    this.setState(
      {
        blogCateoryFlag: false,
        listOfBlogs: true,
        blogList: this.state.planBlogList,
      },
      () => { }
    );
  }
  navFuture() {
    this.setState(
      {
        blogCateoryFlag: false,
        listOfBlogs: true,
        blogList: this.state.futureBlogList,
      },
      () => { }
    );
  }

  navPassion() {
    this.setState(
      {
        blogCateoryFlag: false,
        listOfBlogs: true,
        blogList: this.state.passionBlogList,
      },
      () => { }
    );
  }

  navVideos() {
    this.setState({
      videosCateoryFlag: false,
      listOfVideos: true,
      vedioList: this.state.StrengthVedioList,
    });
    // LearningTravenService.getAllVideos().then((res) => {
    //   console.log(res.data);
    // });
  }
  navPlanVideos() {
    this.setState({
      videosCateoryFlag: false,
      listOfVideos: true,
      vedioList: this.state.plansVedioList,
    });
  }
  navFutureVedios() {
    this.setState({
      videosCateoryFlag: false,
      listOfVideos: true,
      vedioList: this.state.futureVedioList,
    });
  }
  navPassionVedio() {
    this.setState({
      videosCateoryFlag: false,
      listOfVideos: true,
      vedioList: this.state.passionVedioList,
    });
  }
  readBlog = (id) => {
    this.setState({ listOfBlogs: false, viewBlog: true });
    LearningTravenService.getBlogDetailsById(id)
      .then((res) => {
        this.setState({ selectedBlogList: res.data });
      })
      .catch((err) => console.error(err));
  };

  sra = (id) => {
    console.log("id", id);
  };
  submit() {
    let obj = {
      title: this.state.title,
      subTitle: this.state.subTitle,
      keywords: this.state.keywords,
      contentText: this.state.description,
      category: 3,
    };
    LearningTravenService.createBlog(obj)
      .then((res) => {
        if (res) {
          this.setState({
            blogCreate: true,
            title: "",
            subTitle: "",
            keywords: "",
            description: "",
          });
        }
      })
      .catch((err) => console.error(err));
  }

  startTimer() {
    var min = 4;
    var sec = 0;
    this.setState(
      { min: min, sec: sec, isTimerRunning: true, isPause: true },
      () => {
        this.timerInterval = setInterval(() => {
          const { min, sec } = this.state;
          if (sec === 0) {
            if (min === 0) {
              clearInterval(this.timerInterval);
              this.setState({ isTimerRunning: false, blogRead: true });
            } else {
              this.setState({ min: min - 1, sec: 59 }, () => { });
            }
          } else {
            this.setState({ sec: sec - 1 }, () => { });
          }
        }, 1000);
      }
    );
  }

  handleColourList = (e) => {
    this.setState({ course: e.target.value }, () => { });
  };

  pauseTimer() {
    this.setState({
      isStartTime: false,
      isStopTime: true,
      isPause: false,
      isContinueTime: true,
    });
    clearInterval(this.timerInterval);
  }

  continueTimer() {
    this.setState(
      {
        isStopTime: false,
        isStartTime: true,
        isContinueTime: false,
        isPause: true,
      },
      () => {
        this.timerInterval = setInterval(() => {
          const { min, sec } = this.state;

          if (sec === 0) {
            if (min === 0) {
              clearInterval(this.timerInterval);
              this.setState({
                isTimerRunning: false,
                isStopTime: false,
                isStartTime: true,
              });
            } else {
              this.setState({ min: min - 1, sec: 59 }, () => { });
            }
          } else {
            this.setState({ sec: sec - 1 }, () => { });
          }
        }, 1000);
      }
    );
  }

  postBlog() {
    this.setState({ blogCateoryFlag: false, createBlog: true }, () => {
      LearningTravenService.getAllBlogsBasedOnCategoryID()
        .then((res) => {
          this.setState({ allBlogs: res.data }, () => {
            this.state.allBlogs.forEach((ele) => {
              if (ele?.category?.categoryName === "Strengths") {
                console.log("Strengths", ele);
                this.state.stregthBlogList.push(ele);
              } else if (ele?.category?.categoryName === "Future") {
                this.state.futureBlogList.push(ele);
              } else if (ele?.category?.categoryName === "Passion") {
                this.state.passionBlogList.push(ele);
              } else if (ele?.category?.categoryName === "Plan") {
                this.state.planBlogList.push(ele);
              }
            });
          });
        })
        .catch((err) => console.error(err));
    });
  }
  viewVideo(id) {
    this.setState({ listOfVideos: false, viewVideo: true });
    LearningTravenService.getVideoDetails(id)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.error(err));
  }
  closePop() {
    this.setState({ popUp: false });
  }

  closeBlogComplete = () => {
    this.setState({ blogCreate: false });
  };

  closeBlogRead = () => {
    this.setState({ blogRead: false });
  };

  render() {
    return (
      <div className="main">
        <div className="main-middleP">
          <div className="rect_large_content">
            {this.state.mainPageFlag && (
              <div className="door pt-3">
                <img alt='' src={door} onClick={() => this.navMainPage()}></img>
                <h5>Learning Tavern</h5>
                <label>
                  adventurer, quench your thirst for knowledge here.
                </label>
                <Carousel className="">
                  <Carousel.Item>
                    <ul>
                      <li>
                        <img alt=''
                          src={blog}
                          onClick={this.navTravensBlogs}
                        ></img>
                        <h5 className="mb-3">blogs</h5>
                        <label>{this.state.allBlogs.length} blogs read</label>
                      </li>
                      <li>
                        <img alt=''

                          src={video}
                          onClick={this.navTravensVidoes}
                        ></img>
                        <h5 className="mb-3">videos</h5>
                        <label>0 videos watched</label>
                      </li>
                      <li>
                        <img alt='' src={survey} onClick={this.openSurveys}></img>
                        <h5>surveys & questionnaires</h5>
                        <label>0 surveys taken</label>
                      </li>

                    </ul>
                  </Carousel.Item>
                </Carousel>
              </div>
            )}

            <Modals
              open={this.state.blogCreate}
              header={
                <div>
                  <h5 className="text-white">Goal</h5>
                  <button
                    type="button"
                    className="close_btn"
                    onClick={() => this.closeBlogComplete()}
                  >
                    <img alt='' src={close}></img>
                  </button>
                </div>
              }
              body={
                <div className="frame text-center">
                  <p>Goal Completed Successfully</p>

                  <button
                    type="button"
                    className="img_btn_home"
                    onClick={this.closeBlogComplete}
                  >
                    Ok
                  </button>
                </div>
              }
            />
            <Modals
              open={this.state.blogRead}
              // open={true}
              header={
                <div>
                  <h5 className="text-white">Congratulations !</h5>
                  <button
                    type="button"
                    className="close_btn"
                    onClick={() => this.closeBlogRead()}
                  >
                    <img alt='' src={close}></img>
                  </button>
                </div>
              }
              body={
                <div className="frame text-center">
                  <h5 className="reward-title">You've Read a Blog.</h5>
                  <h5>You Obtained</h5>

                  <div className="reward-container">
                    <div className="reward-container-sub">
                      <img  className="rewardImg" src={coinFrame} alt="coin" />
                      <h5>Coins</h5>
                      <span>
                        <img alt='' src={coin} />
                        <b>10</b>
                      </span>
                    </div>
                    <div className="reward-container-sub">
                      <img 
                        className="rewardImg"
                        src={crystalFrame}
                        alt="crystal"
                      />
                      <h5>Crystals</h5>
                      <span>
                        <img alt='' src={crystal} />
                        <b>10</b>
                      </span>
                    </div>
                    <div className="reward-container-sub">
                      <img  className="rewardImg" src={xpFrame} alt="xp" />
                      <h5>XP Points</h5>
                      <span>
                        <img alt='' src={xp} />
                        <b>10</b>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="img_btn_home"
                    onClick={this.closeBlogComplete}
                  >
                    Ok
                  </button>
                </div>
              }
            />

            {this.state.blogCateoryFlag && (
              <div className="door">
                <div className="row">
                  <div className="col-7 pt-4 text-center">
                    <img alt='' src={door} onClick={() => this.navMainPage()}></img>
                    <img alt='' src={decks} onClick={() => this.navGoBack()}></img>
                    <h5>Learning Tavern-Blogs</h5>
                    <label className="mb-0">
                      unravel the hidden knowledge of the ancients.
                    </label>
                    <label>read these blogs to craft your career.</label>
                  </div>
                  <div className="col-5 text-right p-r-4">
                    <button
                      type="button"
                      className="img_btn_home fs-13"
                      onClick={this.postBlog}
                    >
                      SUBMIT A BLOG
                    </button>
                    <img alt='' src={blogNotes}></img>
                  </div>
                </div>
                <Carousel>
                  <Carousel.Item>
                    <ul>
                      <li>
                        <img alt='' src={blogCt1} onClick={this.navBlogs}></img>
                        <h5 className="fs-14">STRENGTH</h5>
                      </li>
                      <li>
                        <img alt='' src={blogCt2} onClick={this.navPlans}></img>
                        <h5 className="fs-14">PLAN</h5>
                      </li>
                      <li>
                        <img alt='' src={blogCt3} onClick={this.navFuture}></img>
                        <h5 className="fs-14">FUTURE</h5>
                      </li>
                      <li>
                        <img alt='' src={blogCt4} onClick={this.navPassion}></img>
                        <h5 className="fs-14">PASSION</h5>
                      </li>
                    </ul>
                  </Carousel.Item>
                </Carousel>
              </div>
            )}
            {this.state.listOfBlogs && (
              <div className="door">
                <div className="row">
                  <div className="col-7 pt-4 text-center">
                    <img alt='' src={door} onClick={() => this.navMainPage()}></img>
                    <img alt='' src={decks} onClick={() => this.navGoBack()}></img>
                    <img alt='' src={blogFire}></img>
                    <h5 className="text-white">Learning Tavern-Blogs</h5>
                    <label>unravel the hidden knowledge of the ancients.</label>
                  </div>

                  <div className="col-5 text-right"></div>
                </div>

                <Carousel>
                  <Carousel.Item>
                    <ul>
                      {this.state.blogList.map((items, index) => {
                        return (
                          <li key={index}>
                            <img alt=''
                              src={blogNt1}
                              onClick={() => {
                                this.readBlog(items.blogId);
                              }}
                            ></img>
                            <h5 className="fs-13">{items.blogTitle}</h5>
                          </li>
                        );
                      })}
                      
                    </ul>
                  </Carousel.Item>
                </Carousel>               
              </div>
            )}
            {this.state.viewBlog && (
              <div className="door">
                <div className="row">
                  <div className="col-7  pt-4 text-center">
                    <img alt='' src={door} onClick={() => this.navMainPage()}></img>
                    <img alt='' src={decks} onClick={() => this.navGoBack()}></img>
                    <img alt='' src={blogFire}></img>
                    <h5 className="text-white">Learning Tavern-Blogs</h5>
                    <label>unravel the hidden knowledge of the ancients.</label>
                  </div>
                  <div className="col-5 text-right">
                    {!this.state.isPause && !this.state.isContinueTime && (
                      <div className="d-flex">
                        <button
                          className="img_btn_brown m-r-2"
                          type="button"
                          onClick={() => {
                            this.startTimer();
                          }}
                        >
                          Start Reading...
                        </button>{" "}
                        <img alt='' src={blogBook} className="w-h-40 mt-3"></img>
                        <span className="mt-4 text-white fs-12">
                          4 min read
                        </span>
                      </div>
                    )}
                    {this.state.isPause && !this.state.isContinueTime && (
                      <div className="d-flex">
                        <button
                          className="img_btn_brown m-r-2"
                          type="button"
                          onClick={() => {
                            this.pauseTimer();
                          }}
                        >
                          Pause
                        </button>{" "}
                        <img alt='' src={blogBook} className="w-h-40 mt-3"></img>
                        <span className="mt-4 text-white fs-12">
                          4 min read
                        </span>
                      </div>
                    )}
                    {!this.state.isPause && this.state.isContinueTime && (
                      <div className="d-flex">
                        <button
                          className="img_btn_brown m-r-2"
                          type="button"
                          onClick={() => {
                            this.continueTimer();
                          }}
                        >
                          Start Reading...
                        </button>{" "}
                        <img alt='' src={blogBook} className="w-h-40 mt-3"></img>
                        <span className="mt-4 text-white fs-12">
                          4 min read
                        </span>
                      </div>
                    )}
                    {this.state.isTimerRunning && (
                      <div className="text-center">
                        <span className="mt-4 text-white fs-12">
                          {this.state.min}:
                          {this.state.sec < 10 ? "" : this.state.sec}
                        </span>
                      </div>
                    )}
                    <div className="d-flex">
                      <Bars
                        completed={this.state.min * this.state.sec}
                        maxCompleted={4 * 60}
                      />
                    </div>
                  </div>
                </div>
                <div className="rect_bg_medium">
                  <div className="row p-3">
                    <div className="col-3">
                      <img alt='' className="w-100" src={blogNt1}></img>
                    </div>
                    <div className="col-9">
                      <h5 className="text-green fs-20">
                        {this.state.selectedBlogList.blogTitle}
                      </h5>
                      <p className="text-white text-left">
                        {this.state.selectedBlogList.blogContent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {this.state.createBlog && (
              <div className="door">
                <div className="row">
                  <div className="col-7 pt-4 text-center">
                    <img alt='' src={door} onClick={() => this.navMainPage()}></img>
                    <img alt='' src={decks} onClick={() => this.navGoBack()}></img>
                    <h5 className="text-white">Learning Tavern-Blogs</h5>
                    <label>submit your own blog</label>
                  </div>
                  <div className="col-5 text-right">
                    <img alt='' src={blogNotes}></img>
                    <div className="">
                      <button
                        type="button"
                        className="img_btn_home"
                        onClick={this.submit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rect_bg_medium">
                  <div className="row p-4">
                    <div className="col-4">
                      <input
                        type="text"
                        className="form-control-name form-control"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={(e) => {
                          this.setState({ title: e.target.value });
                        }}
                      ></input>
                    </div>
                    <div className="col-4">
                      <input
                        type="text"
                        className="form-control-name form-control"
                        placeholder="Sub-Title"
                        value={this.state.subTitle}
                        onChange={(e) => {
                          this.setState({ subTitle: e.target.value });
                        }}
                      ></input>
                    </div>
                    <div className="col-4">
                      <input
                        type="file"
                        className="form-control-name form-control"
                        placeholder="Sub-Title"
                      ></input>
                    </div>
                    <div className="col-12 mt-3">
                      <select
                        className="form-control form-control-large"
                        placeholder="Select Colour"
                        onChange={(e) => {
                          this.handleColourList(e);
                        }}
                        value={this.state.course}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {this.state.data.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 mt-3">
                      <input
                        type="text"
                        className="form-control form-control-large"
                        placeholder="Keywords (15 max)"
                        value={this.state.keywords}
                        onChange={(e) => {
                          this.setState({ keywords: e.target.value });
                        }}
                      ></input>
                    </div>
                    <div className="col-12 mt-3">
                      <input
                        type="text"
                        className="form-control form-control-large"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={(e) => {
                          this.setState({ description: e.target.value });
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {this.state.videosCateoryFlag && (
              <div className="door">
                <div className="row">
                  <div className="col-7 text-center">
                    <img alt='' src={door} onClick={() => this.navMainPage()}></img>
                    <h5>Learning Tavern-Videos</h5>
                  </div>
                  <div className="col-5 text-right p-r-4">
                    <button
                      type="button"
                      className="img_btn_home fs-13"
                      onClick={this.postBlog}
                    >
                      SUBMIT A BLOG
                    </button>
                    <img alt='' src={blogNotes}></img>
                  </div>
                </div>
                <label>
                  adventurer, quench your thirst for knowledge here.
                </label>
                <Carousel>
                  <Carousel.Item>
                    <ul>
                      <li>
                        <img alt='' src={blogCt1} onClick={this.navVideos}></img>
                        <h5 className="fs-13">STRENGTH</h5>
                      </li>
                      <li>
                        <img alt='' src={blogCt2} onClick={this.navPlanVideos}></img>
                        <h5 className="fs-13">PLAN</h5>
                      </li>
                      <li>
                        <img alt='' src={blogCt3} onClick={this.navFutureVedios}></img>
                        <h5 className="fs-13">FUTURE</h5>
                      </li>
                      <li>
                        <img alt='' src={blogCt4} onClick={this.navPassionVedio}></img>
                        <h5 className="fs-13">PASSION</h5>
                      </li>
                    </ul>
                  </Carousel.Item>
                </Carousel>
              </div>
            )}
            {this.state.surveyCateoryFlag && (
              <div className="door">
                <div>
                  <div className="col-7 text-center">
                    <img alt='' src={door} onClick={() => this.navMainPage()}></img>
                    <h5>Learning Tavern-Survey's</h5>
                  </div>
                  <div className="col-5 text-right p-r-4">
                    <button
                      type="button"
                      className="img_btn_home fs-13"
                      onClick={this.postBlog}
                    >
                      SUBMIT A BLOG
                    </button>
                    <img alt='' src={blogNotes}></img>
                  </div>
                </div>
                <Carousel>
                  <Carousel.Item>
                    <ul>
                      {this.state.surveyList.map((item, index) => {
                        return <li>
                          <a href={index === 0 ? 'http://www.literacynet.org/mi/assessment/' :
                            index === 1 ? 'https://irp.cdn-website.com/b7f3c5df0fb54b91898015cb34c63f18/files/uploaded/RESUME%20WORKSHEET.pdf' :
                              index === 2 ? 'https://bigfuture.collegeboard.org/college-search' :
                                index === 3 ? 'https://www.commonapp.org/' : 'https://www.smscholarships.com/partner/search.cfm?id=90&iframe=false'} target="_blank" rel="noreferrer">
                            <img src={index === 0 ? blogCt1 : index === 1 ? blogCt2 : index === 2 ? blogCt3 : index === 3 ? blogCt4 : index === 4 && blogFire} alt="images" />
                          </a>
                          <p>{item.categoryName}</p>
                        </li>;
                      })}
                    </ul>
                  </Carousel.Item>
                </Carousel>
              </div>
            )}
            {this.state.listOfVideos && (
              <div className="door">
                <img alt='' src={door} onClick={() => this.navMainPage()}></img>
                <h5>Learning Tavern-Vidoes</h5>
                <label>
                  adventurer, quench your thirst for knowledge here.
                </label>
                <Carousel>
                  <Carousel.Item>
                    {console.log("vedioList", this.state.vedioList)}
                    <ul>
                      {this.state.vedioList.map((item, ind) => {
                        return (
                          <li key={ind}>
                            <img alt=''
                              src={Video_p1}
                              onClick={() => {
                                this.viewVideo(item.videoId);
                              }}
                            ></img>
                            <h5>VIDEO {ind + 1}</h5>
                          </li>
                        );
                      })}
                    </ul>
                  </Carousel.Item>
                </Carousel>
              </div>
            )}
            {this.state.viewVideo && (
              <div className="door">
                <img alt='' src={door} onClick={() => this.navMainPage()}></img>
                <h5>Learning Tavern-Video</h5>
                <label>read about lorem ipsum dollor</label>
                <div>
                  <iframe
                    width="500"
                    height="170"
                    src={`https://www.youtube.com/embed/${this.state.embedId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
                <label>10 blogs read</label>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default LearningTraven;
