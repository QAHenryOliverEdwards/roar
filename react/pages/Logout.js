import {useState} from "react";
import {Button, Spinner} from "react-bootstrap";
import logoutFunc from "../functions/logoutFunc";
import redirectFuncAndTimeout from "../functions/redirectFuncAndTimeout";
import useTimer from "../functions/useTimer";
import LogoutButton from "../components/logout/LogoutButton";

const Logout = (props) => {

    const {setLoginFunc} = props;

    const [loggedOut, setLoggedOut] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const redirectTimer = useTimer(6000, 100)

    if (loggedOut === null) {
        return (
            <div className={'container'}>
                <div className={'row py-2'}>
                    <div className={'col-4'}/>
                    <div className={'col-4 pt-3 border border-light rounded-3'}>
                        <h3 className={'logout-text text-center'}>Click the button to logout</h3>
                        <div className={'row py-4'}>
                            <div className={'col-4'}/>
                            <Button variant={'secondary'} onClick={() => {
                                logoutFunc(setLoggedOut)
                            }} className={'col-4'} id={'logout-button'}>Logout</Button>
                            <div className={'col-4'}/>
                        </div>
                    </div>
                    <div className={'col-4'}/>
                </div>
            </div>
        )
    } else if (loggedOut === true) {
        if (redirect === false) {
            const timeoutPromiseValue = redirectFuncAndTimeout(setRedirect, redirect, 5000)
            return  (
                <div className={'container'}>
                    <div className={'row py-2'}>
                        <div className={'col-4'}/>
                        <div className={'col-4 pt-3 border border-light rounded-3'}>
                            <Spinner animation={'border'} variant={'warning'}/>
                            <div className={'row py-4'}>
                                <p className={'post-name'}>You have successfully logged out, redirecting in {redirectTimer}ms
                                click here to <LogoutButton redirectFunc={setRedirect} innerText={'logout'}/> now</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (redirect === true) {
            setLoginFunc(false)
            return (
                <div/>
            )
        }
    } else if (loggedOut === false) {
        return (
            <div>
                <h1>Unsuccessful logout try again</h1>
                <Button variant={'secondary'} onClick={() => {
                    console.log(setLoggedOut)
                }}>Click to try again</Button>
            </div>
        )
    }
}

export default Logout;