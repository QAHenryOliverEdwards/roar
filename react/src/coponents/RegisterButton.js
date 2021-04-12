import {Button} from "react-bootstrap";

const RegisterButton = (props) => {
    const {redirectFunc} = props;
    return (
        <Button variant={'secondary'} onClick={() => (redirectFunc())}
                className={'rounded-pill form-control my-1'}>Register</Button>
    )
}

export default RegisterButton;