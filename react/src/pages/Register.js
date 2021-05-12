import {useState} from "react";
import GenericInput from "../components/root/GenericInput";
import {Button, Row} from "react-bootstrap";
import registerFunc from "../functions/registerFunc";
import getViewportSize from "../functions/getViewportSize";

const Register = (props) => {

    const {setLoginFunc} = props;

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const viewportSize = getViewportSize()

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

    if (viewportSize === 'sm' ||viewportSize ===  'xs') {
        return (
            <div className={'container-fluid mt-3 '}>
                <div className={'border border-light rounded-3 py-3'}>
                    <h3 className={'title text-center'}>Register</h3>
                    <GenericInput type={'text'} inputFunc={inputUsername} placeholder={'Username'} nameTag={'username'}/>
                    <GenericInput type={'text'} inputFunc={inputName} placeholder={'Name'} nameTag={'name'}/>
                    <GenericInput type={'text'} inputFunc={inputEmail} placeholder={'Email'} nameTag={'email'}/>
                    <GenericInput type={'password'} inputFunc={inputPassword} placeholder={'Password'}
                                  nameTag={'password'}/>
                    <Button variant={'secondary'} onClick={() => {
                        registerFunc(username, name, email, password, setLoginFunc)
                    }}
                            className={'rounded-pill form-control'} id={'register-button'}>Register</Button>
                </div>
            </div>
        )
    } else if (viewportSize === 'md' || viewportSize ===  'lg' || viewportSize ===  'xl') {
        return (
            <div className={'container-fluid mt-3'}>
                <Row className={'py-2'}>
                    <div className={'col-3'}/>
                    <div className={'col-6 border border-light rounded-3 py-3'}>
                        <h3 className={'title text-center'}>Register</h3>
                        <GenericInput type={'text'} inputFunc={inputUsername} placeholder={'Username'} nameTag={'username'}/>
                        <GenericInput type={'text'} inputFunc={inputName} placeholder={'Name'} nameTag={'name'}/>
                        <GenericInput type={'text'} inputFunc={inputEmail} placeholder={'Email'} nameTag={'email'}/>
                        <GenericInput type={'password'} inputFunc={inputPassword} placeholder={'Password'}
                                      nameTag={'password'}/>
                        <Button variant={'secondary'} onClick={() => {
                            registerFunc(username, name, email, password, setLoginFunc)
                        }}
                                className={'rounded-pill form-control'} id={'register-button'}>Register</Button>
                    </div>
                    <div className={'col-3'}/>
                </Row>
            </div>
        )
    }
}

export default Register;