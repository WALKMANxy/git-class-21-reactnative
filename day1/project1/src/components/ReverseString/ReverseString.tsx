import React, { useEffect } from "react";


export const ReverseString = () => {

    const [input, setInput] = React.useState("");
    const [output, setOutput] = React.useState("");

    const handleClick = () => {
        setOutput(input.split("").reverse().join(""));
    }

    useEffect(() => {
        setOutput(input.split("").reverse().join(""));

    }, [input]);

    return (
        <form className="reverse-string-form"> {/* TBD */}
          <label htmlFor="input">Input:</label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

    
          
          <p>Reversed Output: {output}</p>
        </form>
      );
    };










export default ReverseString;