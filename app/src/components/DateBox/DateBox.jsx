import React from 'react'
import './datebox.css'

const DateBox = ({text, name, max, onChange, disabled}) =>
{
    return(
        <div>
            <label>{text}</label><br/>
            <input 
                type="datetime-local" 
                onChange={onChange}
                max={max}
                name={name}
                className="input-date"
                disabled={disabled}
            />
        </div>
    )
}

export default DateBox