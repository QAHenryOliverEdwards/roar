import {useState} from "react";
import GenericInput from "../components/root/GenericInput";
import loginFunc from "../functions/loginFunc";
import {Button} from "react-bootstrap";

const Login =(props)=>{

    const {setLoginFunc} = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const inputUsername = (event) =>{
        setUsername(event.target.value)
    }

    const inputPassword = (event)=>{
        setPassword(event.target.value)
    }

    return (
        <div className={'container-fluid mt-3 '}>
            <h3 className={'title text-center'}>Login</h3>
            <GenericInput type={'text'} inputFunc={inputUsername} placeholder={'Username'}/>
            <GenericInput type={'password'} inputFunc={inputPassword} placeholder={'Password'}/>
            <Button variant={'secondary'} onClick={()=>{loginFunc(username, password, setLoginFunc)}}
                    className={'rounded-pill form-control'}>Login</Button>
        </div>
    )
}

export default Login;