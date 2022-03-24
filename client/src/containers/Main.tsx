import React, { useState } from 'react';

function Main() {
    const [value, setValue] = useState('');

    const login = async (data = {}) => {
        // Default options are marked with *
        console.log(JSON.stringify(data));
        const response = await fetch('http://localhost:3001/api/auth/signIn', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    // const login = () => {
    //     fetch("http://localhost:3001/api/auth/signIn", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'applications/json'
    //         },
    //         body: {userName: value }
    //     })
    //         .then((res) => console.log(res.json()))
    // }

    return (
       <div className="main">
           <label htmlFor="login">
               type login
               <input onChange={e => setValue(e.target.value)} name="login" id="login" type="text" />
           </label>

           <button onClick={() => login({userName: value, password: '221221' })}>post</button>
       </div>
    );
}

export default Main;
