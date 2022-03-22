import React, { useEffect, useState } from 'react';

function Main() {
    const [data, setData] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
       <div className="main">
           {data}
       </div>
    );
}

export default Main;
