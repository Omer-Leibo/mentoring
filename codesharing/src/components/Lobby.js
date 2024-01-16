import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Lobby = () => {
    const [codeBlocks, setCodeBlocks] = useState([])

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
