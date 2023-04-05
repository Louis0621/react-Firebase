import React, {useRef, useState} from 'react'
function RefTutorial() {
    const inputRef = useRef(null);
    const [name, setName] = useState("Anonymous");
    const onClick = ()=>{
        setName(inputRef.current.value);
        inputRef.current.value = ''
    }
    return (
        <div>
            <h1>{name}</h1>
            <input type="text" placeholder='Ex...' ref={inputRef}></input>
            <button onClick = {onClick}>Change Name</button>
        </div>
    )
}

export default RefTutorial
