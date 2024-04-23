import React, { useState } from 'react';
import Axios from 'axios';

export const Counter = () => {


    /* Axios.get */
    useState(0)
    let [x, setX] = useState(0)
    return <div>
        {x}
        <button onClick={() => setX(x +1)}> Increment </button>
        <button onClick={() => setX(x -1)}> Decrement </button>
    </div>
}


export default Counter;