import {useState} from "react";
import LoginInput from "../coponents/LoginInput";
import PasswordInput from "../coponents/PasswordInput";
import LoginTitle from "../coponents/LoginTitle";
import RegisterButton from "../coponents/RegisterButton";
import LoginButton from "../coponents/LoginButton";

const LoginRegister =(props)=>{

    const {setLoginFunc} = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const inputUsername = (event) =>{
        setUsername(event.target.value)
    }

    const inputPassword = (event)=>{
        setPassword(event.target.value)
    }

    const registerRedirectFunc =()=>{
        console.log('redirecting soon')
    }

    const loginFunc = async ()=>{
        let response = await fetch('http://127.0.0.1:8082/users/login', {
            method: 'POST',
            headers: {
                'username': username,
                'password': password
            }
        });
        let auth_key = await response.text();
        if (auth_key !== 'INVALID') {
            sessionStorage.setItem('auth-roar', auth_key);
            console.log('Successfully logged in');
            setLoginFunc(true);
        } else {
            console.log('Unsuccessful attempt');
        }
    }

    return (
        <div className={'container-fluid mt-3 col-lg-6 col-sm-12'}>
            <LoginTitle/>
            <LoginInput inputFunc={inputUsername}/>
            <PasswordInput inputFunc={inputPassword}/>
            <LoginButton loginFunc={loginFunc}/>
            <div className={'separator post-text'}>Or</div>
            <RegisterButton redirectFunc={registerRedirectFunc}/>
        </div>
    )
}

export default LoginRegister;