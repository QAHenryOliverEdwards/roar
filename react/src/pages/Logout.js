import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import logoutFunc from "../functions/logoutFunc";

const Logout = (props) => {

    const {setLoginFunc} = props;

    const [loggedOut, setLoggedOut] = useState(null)

    if (loggedOut === null) {
        return (
            <Button variant={'secondary'} onClick={() => {
                logoutFunc(setLoggedOut, setLoginFunc)
            }}>
                Click to logout
            </Button>
        )
    } else if (loggedOut === true) {
        return (
            <h1>Successful logout</h1>
        )
    } else if (loggedOut === false) {
        return (
            <div>
                <h1>Unsuccessful logout try again</h1>
                <Button variant={'secondary'} onClick={() => {
                    logoutFunc(setLoggedOut, setLoginFunc)
                }}>
                    Click to logout</Button>
            </div>
        )
    }
}

export default Logout;