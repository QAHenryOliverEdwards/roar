import {useCallback, useEffect, useState} from "react";
import LoginInput from "../components/LoginInput";
import PasswordInput from "../components/PasswordInput";
import LoginTitle from "../components/LoginTitle";
import RegisterButton from "../components/RegisterButton";
import LoginButton from "../components/LoginButton";
import Register from "./Register";

const LoginRegister =(props)=>{

    const {setLoginFunc} = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);

    const inputUsername = (event) =>{
        setUsername(event.target.value)
    }

    const inputPassword = (event)=>{
        setPassword(event.target.value)
    }

    const registerRedirectFunc =()=>{
        setRegister(true);
    }
    
    const loginFunc = useCallback(async()=>{
            console.log(`username: ${username}, password: ${password}`)
            let response = await fetch('http://roar-env.eba-hb5rpyxz.eu-west-2.elasticbeanstalk.com/users/login', {
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
    }, [password, setLoginFunc, username])

    const constructPage = useCallback(()=>{
        console.log(`username: ${username}, password: ${password}`)
        if (!register) {
            return (
                <div className={'container-fluid mt-3 col-lg-6 col-sm-12'}>
                    <LoginTitle/>
                    <LoginInput inputFunc={inputUsername} defaultValue={username}/>
                    <PasswordInput inputFunc={inputPassword} defaultValue={password}/>
                    <LoginButton loginFunc={loginFunc}/>
                    <div className={'separator post-text'}>Or</div>
                    <RegisterButton redirectFunc={registerRedirectFunc}/>
                </div>
            )
        } else if (register) {
            return (
                <Register setLoginFunc={setLoginFunc}/>
            )
        }
    }, [loginFunc, password, register, setLoginFunc, username])

    return (
        <div>
            {constructPage()}
        </div>
    )
}

export default LoginRegister;