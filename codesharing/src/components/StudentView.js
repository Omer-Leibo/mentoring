const StudentView = ({block, codeValue, setCodeChange}) => {
    return <textarea value={codeValue.code} onChange={setCodeChange}/> 
}

export default StudentView;