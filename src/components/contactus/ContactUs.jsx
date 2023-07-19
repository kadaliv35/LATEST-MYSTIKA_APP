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

  class ContactUs extends Component {
    constructor(props) {
      super(props);
      this.state = {
        popUp: true,
      }
      this.closePop = this.closePop.bind(this)
     
    }
  
  
    closePop() {
      this.setState({ popUp: false })
    }
  
  
    render() {
      return (
        <div className='main'>
       
          <div className='main-middleP'>
            <div className='rect_large'>
           
              <h1 className='text-red'>ContactUs</h1>
            </div>
          </div>
       
        </div>
      )
    }
}
export default ContactUs;
