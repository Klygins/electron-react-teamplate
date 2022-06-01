import React from 'react';

const App = () => {
    async function clicked() {
        const result = await myApp.sayHello("Some argument");
        console.log('Result:', result)
    }

    return (
        <div>
            <button onClick={clicked}>Click Me</button>
            Hello!
        </div>
    )
}

export default App;
