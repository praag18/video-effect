import React from 'react'

const Ranges = ({ label, onChange, value, max, min, steps }) => {
    return (
        <label style={{ display: "flex", justifyContent: "center", flexDirection: "column", fontFamily: "monospace" }}>
            {
                label === "Blur Passes" ? <span>{label + "(" + value + ")"}</span> : <span>{label}</span>
            }

            <input style={{ width: "450px" }}
                type="range"
                min={min}
                max={max}
                step={steps}
                value={value}
                onChange={e => label.includes("blur") ? onChange(e.target.value) : onChange(parseFloat(e.target.value))} />
        </label>
    )
}

export default Ranges
