const LoginInput =(props)=>{
    const {inputFunc} = props;
    return (
        <input type={'text'} onChange={event => inputFunc(event)}
               className={'form-control rounded-pill my-1'} placeholder={'Username'}/>
    )
}

export default LoginInput;