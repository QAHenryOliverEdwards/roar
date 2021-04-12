import {Button} from "react-bootstrap";

const LogoutButton =(props)=>{
    const {setLogoutFunc, style} = props;
    return (
        <Button variant={'secondary'} onClick={()=>(setLogoutFunc(false), sessionStorage.setItem('auth-roar', ''))}
        className={'rounded-pill'}>Logout</Button>
    )
}

export default LogoutButton;