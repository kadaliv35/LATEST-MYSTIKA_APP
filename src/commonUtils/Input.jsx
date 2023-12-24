import React, { useState } from 'react';
const Input = ({ name, type, update }) => {

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value)
        update(e.target.value);
    }

    return (
        <div className='input-container'>
            <h5 className='label'>{name}</h5>
            <input
                className="input"
                type={type === "password" ? "password" : "text"}
                value={value}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export default Input;