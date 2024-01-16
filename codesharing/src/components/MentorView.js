const MentorView = ({ blockId, receivedMessage}) => {
    console.log(receivedMessage);
    return <>
    {
    receivedMessage.block_id === blockId ?
        <div>{receivedMessage.received_message}</div>:
        <div></div>
        }
    </>
}

export default MentorView;

