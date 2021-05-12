const GenericInput = (props) => {
    const {inputFunc, type, placeholder, nameTag} = props;
    return (
        <input type={type} onChange={(event) => {
            inputFunc(event)
        }}
               className={'form-control rounded-pill my-1'} placeholder={placeholder} id={`${nameTag}-input`}/>
    )
}

export default GenericInput;