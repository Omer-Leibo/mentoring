import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {socket} from "../socket";
import MentorView from "../components/MentorView";
import StudentView from "../components/StudentView";
import axios from "axios";


const Block = () => {
    const [isMentor, setIsMentor] = useState({'block_id':0, 'is_mentor':false});
    const {blockId} = useParams();
    const [block, setBlock] = useState({title: `title ${blockId}`, code: `code ${blockId}`});
    const [receivedMessage, setReceivedMessage] = useState({block_id: 0, received_message: ""});
    const [codeValue, setCodeValue] = useState({block_id: 0, code: ""})
    const setCodeChange = (e) => {
        const codeChange = e.target.value;
        const msg = {'block_id': blockId, 'code': codeChange}
        setCodeValue(msg);
        socket.emit("code-change", msg);
    }

    socket.on("receive_message", (data) => {
        setReceivedMessage({'block_id':data.block_id, 'received_message':data.code });
    })

    useEffect(() => {
        axios.get(`http://localhost:5050/api/v1/blocks/${blockId}`)
            .then(result => setBlock(result.data))
            .catch(error => console.error(error))
        axios.get("http://localhost:5050/api/v1/is_mentor", {params: {block_id: blockId}})
            .then(result => setIsMentor({'block_id':result?.data?.block_id, 'is_mentor':result?.data?.is_mentor}))
    }, []);

    return <>
        {isMentor.is_mentor ?
             <MentorView blockId={blockId} receivedMessage={receivedMessage}/>:
             <StudentView
                block={block}
                codeValue={codeValue}
                setCodeChange={setCodeChange}/>
        }

    </>
}
export default Block;