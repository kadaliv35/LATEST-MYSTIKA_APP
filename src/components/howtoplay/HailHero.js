import React from 'react'
import close from "../../assets/images/close_ic.svg";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Carousel from "react-bootstrap/Carousel";
import Modals from '../../commonUtils/Modals';



function HailHero({ hidePop }) {

    return (
        <Modals
            open={true}
            header={
                <div>
                    <div className="text-white">Hail Hero</div>
                    <button
                        type="button"
                        className="close_btn"
                        onClick={hidePop}
                    >
                        <img src={close}></img>
                    </button>
                </div>
            }
            body={
                <div className="frame text-center">
                    <br />
                    <h5 className='text-green'>LEARN HOW TO PLAY</h5>
                    <Carousel>
                        <Carousel.Item>
                            <span>YOUR ADVENTURE IS NO ORDINARY ONE AND YOU ARE NO ORDINARY PERSON</span>
                        </Carousel.Item>
                        <Carousel.Item>
                            <span>THIS IS A SPACE TO BECOME WHAT YOU ARE DESTINED TO BE LEARN HOW YOU CAN HARNESS THE GAME TO ENCHANCE YOUR LIFE AND GOALS</span>
                        </Carousel.Item>
                        <Carousel.Item>
                            <span>IN THE PROCES GET TO KNOW THE AWESOME TEAM BEHIND MYSTIKA! THEY WOULD BE DELIGHTED TO HEAR FROM YOU AND YOUR THRILLING SUCCESS JOURNEY</span>
                        </Carousel.Item>
                    </Carousel>
                    <button
                        type="button"
                        className="img_btn_home"
                        onClick={hidePop}
                    >
                        Delighted
                    </button>
                </div>
            }
        />
    )
}

export default HailHero