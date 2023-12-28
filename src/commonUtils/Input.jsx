import React, { useState } from 'react';
const Input = ({ name, type, update }) => {

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value)
        update(e.target.value);
    }

    const handleBlur = (e) => {
        e.preventDefault();
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (value.match(emailRegex)) {
          
        } else {
          alert("a proper email address needs to be added")
        }
      };

    return (
        <div className='input-container'>
            <h5 className='label'>{name}</h5>
            <input
                className="input"
                type={type === "password" ? "password" : type === "email" ? "email" : "text"}
                value={value}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => type === "email" && handleBlur(e)}
            />
        </div>
    );
};

export default Input;
