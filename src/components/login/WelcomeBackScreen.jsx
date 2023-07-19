import React, { Component } from 'react';
import close from '../../assets/images/close_ic.svg';
import queen from '../../assets/images/queen.png';

class WelcomeBackScreen extends Component {
    constructor(props) {
        super(props);
            this.state={

            }
            this.gotoLogin = this.gotoLogin.bind(this);
        }


gotoLogin(){
    this.props.history.push("/landingpage");
}  


    render() {
        return (
            <div className="welcome">
                <div className="welcome-left">

                </div>
                <div className="welcome-right">
                    <div className='frame text-center'>
                        <div className='header'>
                            Mystika
                        </div>
                        <button type="button" className="close_btn" onClick={() => this.gotoLogin()}>
                        <img src={close}></img>
                        </button>
                        <h4>Welcome to <br></br>Mystika</h4>
                        <p>Greetings honored adventurer! A cordial welcome to Mystika, 
                            land of mystery and treasure. Discover what you are truly 
                            capable of accomplishing and amuse the emperor with your Valar 
                            Intelligence and Speed. I am Gnalia, the Oracle and I foresee a 
                            great victory in your endeavor.
                        </p>
                        <img src={queen}></img>
                         
                {/* <div className="col-12 d-flex mt-1 p-l-5 m-l-1 text-center">
                       <button type="button" className="img_btn m-r-2" onClick={() => this.gotoLogin()}>Verify</button> 
                       </div> */}
                    </div>
                </div>
           
                     
            </div>
        );
    }
}

export default WelcomeBackScreen;