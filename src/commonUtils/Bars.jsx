import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'

const Bars = (props) => {
    const completed = props.completed
    const size = props.size
    return (
        <div>
            <div className={size === "nan" ? "joyBarLg" : "joyBar"}>
                <ProgressBar completed={completed} isLabelVisible={false} height={size === "nan" ? "15px" : "10px"} bgColor="#7FC31C" width={size === "nan" ? "250px" : "190px"} className="bars" animateOnRender={true} />
            </div>
        </div>
    )
}

export default Bars