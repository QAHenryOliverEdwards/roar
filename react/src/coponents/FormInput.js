const FormInput =(props)=>{
    const {inputFunc, type, placeholder} = props;
    return (
        <input type={type} onChange={event => inputFunc(event)}
        className={'form-control rounded-pill my-1'} placeholder={placeholder}/>
    )
}

export default FormInput;