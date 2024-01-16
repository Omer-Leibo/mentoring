import * as React from "react";
import {useState} from "react";
import {Route, Routes,} from "react-router-dom";
import Lobby from './components/Lobby';
import Block from "./routes/Block";

function App() {
    const [codeChange, setCodeChange] = useState([]);
    const onSetCodeChange = (value) => setCodeChange(previous => [...previous, value]);

    return (
        <div className="App">
            <Routes>
                <Route exact path="/" exact element={<Lobby/>}/>
                <Route path="blocks/:blockId" element={<Block />}/>
            </Routes>
            {codeChange}
        </div>
    );
}

export default App;
