import {Button} from "react-bootstrap";

const LoginButton = (props) => {
    const {loginFunc} = props;
    return (
        <Button variant={'secondary'} onClick={() => (loginFunc())}
                className={'rounded-pill form-control'}>Login</Button>
    )
}

export default LoginButton;