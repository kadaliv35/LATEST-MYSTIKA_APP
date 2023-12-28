import React, { Component } from "react";
// import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import close from '../../assets/images/close_ic.svg';
// import Quen from '../../assets/images/queen.svg';
// import queen from '../../assets/images/queen.png';
import insta from "../../assets/images/instgram.svg";
import fb from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/t.svg";
import Pintrest from "../../assets/images/P.svg";
// import crown from '../../assets/images/crown.svg';
// import cup from '../../assets/images/gold_cup.svg';
import sProfile from "../../assets/images/user_1.svg";

class HowToPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: true,
    };
    this.closePop = this.closePop.bind(this);
  }

  closePop() {
    this.setState({ popUp: false });
  }

  render() {
    return (
      <div className="main">
        <div className="main-middleP">
          <div className="rect_large_content">
            <h3 className="pt-5">
              Welcome to the{" "}
              <span className="text-green">World of Mystika!</span>
            </h3>
            <h5 className="mb-1">1. Gravida gravida eu libero amet turpis</h5>
            <p>
              Blandit magna magnis malesuada enim pellentesque aliquet nisl.
              Lacus sit aliquam interdum gravida faucibus. Tellus blandit vitae
              pellentesque tellus. Ligula turpis sollicitudin lectus odio id
              ullamcorper. In id sollicitudin vitae nec tellus hendrerit egestas
              habitant suscipit.{" "}
              <span className="text-green">
                Tristique sed ac id pellentesque risus aliquet lacinia tristique
                augue.
              </span>{" "}
              In integer fermentum libero gravida ultrices semper nulla vitae
              faucibus. Sit ut hac mauris eu eget ornare curabitur turpis ut.
            </p>
            <h5 className="mt-2 mb-1">2. Tincidunt adipiscing tincidun</h5>
            <p>
              Blandit magna magnis malesuada enim pellentesque aliquet nisl.
              Lacus sit aliquam interdum gravida faucibus. Tellus blandit vitae
              pellentesque tellus. Ligula turpis sollicitudin lectus odio id
              ullamcorper.
            </p>
            <h5 className="mt-2 mb-1">3. In tortor quis</h5>
            <p>
              Blandit magna magnis malesuada enim pellentesque aliquet nisl.
              Lacus sit aliquam interdum gravida faucibus. Tellus blandit vitae
              pellentesque tellus. Ligula turpis sollicitudin lectus odio id
              ullamcorper.
            </p>
            <h5 className="mt-2 mb-1">4. Fusce dictum dictum felis vitae</h5>
            <p>
              Blandit magna magnis malesuada enim pellentesque aliquet nisl.{" "}
              <span className="text-green">
                Lacus sit aliquam interdum gravida faucibus.
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default HowToPlay;
