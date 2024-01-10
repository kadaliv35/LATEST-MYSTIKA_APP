import React, { Component } from 'react';

class RoadMaps extends Component {
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

            <h1 className='text-red'>RoadMaps</h1>
          </div>
        </div>

      </div>
    )
  }
}
export default RoadMaps;
