const PasswordInput =(props)=>{
    const {inputFunc} = props;
    return (
        <input type={'password'} onChange={event => inputFunc(event)}
               className={'form-control rounded-pill my-1'} placeholder={'Password'}/>
    )
}

export default PasswordInput;