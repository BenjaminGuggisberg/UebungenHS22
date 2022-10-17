import React from "react";
import Countdown from "./Countdown";
import "./App.css"


function App() {

    return(<>
            <Countdown countdown="50"/><hr/><br/>
            <Countdown countdown="30"/><hr/><br/>
            <Countdown countdown="5"/><hr/><br/>
            </>);
}

export default App;
