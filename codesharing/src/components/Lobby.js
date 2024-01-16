import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Lobby = () => {
    const [codeBlocks, setCodeBlocks] = useState([])
    
    const Blocks = [
      {id: 1, title: 'Async case', code:'async function fetchData() {}', solution: ''},
      {id: 2, title: 'Event handling', code:'function handleClick(e) {}',  solution: ''},
      {id: 3, title: 'Conditional rendering', code:'function renderConditionally() {}',  solution: ''},
      {id: 4, title: 'Hello World', code:'function helloWorld() {}', solution: ''},
    ]

    useEffect(() => {
      Blocks.map((block) => (
        axios.post("http://localhost:12345/post", block)
          .then(result => console.log(result))
          .catch(error => console.log(error))
      ))
    }, []);

    useEffect(() => {
        axios.get("http://localhost:12345/api/v1/code_blocks")
            .then(result => setCodeBlocks(result.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((block) => (
          <li key={block.id}>
            <Link to={`/blocks/${block.id}`}>{block.title}</Link>
          </li>
            ))}
      </ul>
        </div>
    );
};

export default Lobby;
