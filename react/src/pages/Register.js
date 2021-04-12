import {useCallback, useState} from "react";
import RegisterTitle from "../coponents/RegisterTitle";
import FormInput from "../coponents/FormInput";
import {Button} from "react-bootstrap";

const Register = (props) => {

    const {setLoginFunc} = props;

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputUsername = (event) => {
        setUsername(event.target.value)
    }

    const inputName = (event) => {
        setName(event.target.value)
    }

    const inputEmail = (event) => {
        setEmail(event.target.value)
    }

    const inputPassword = (event) => {
        setPassword(event.target.value)
    }

    const loginFunc = useCallback(async () => {
        console.log(`username: ${username}, password: ${password}`)
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
    }, [password, setLoginFunc, username])

    const submitUserData = async () => {

        let bodyObj = {
            'username': username,
            'name': name,
            'email': email,
            'password': password
        }

        let response = await fetch('http://127.0.0.1:8082/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        })

        if (response.status === 201) {
            console.log('Successfully created');
            // setLoginUsername(username);
            // setLoginPassword(password);
            // setRegister(false);
            await loginFunc();
        } else {
            console.log('Unsuccessful!')
        }
    }

    return (
        <div className={'container-fluid mt-3 col-lg-6 col-sm-12'}>
            <RegisterTitle/>
            <FormInput inputFunc={inputUsername} type={'text'} placeholder={'Username'}/>
            <FormInput inputFunc={inputName} type={'text'} placeholder={'Name'}/>
            <FormInput inputFunc={inputEmail} type={'email'} placeholder={'Email'}/>
            <FormInput inputFunc={inputPassword} type={'password'} placeholder={'Password'}/>
            <Button variant={'secondary'} onClick={() => {
                submitUserData()
            }} className={'rounded-pill form-control'}>Submit</Button>
        </div>
    )
}

export default Register;