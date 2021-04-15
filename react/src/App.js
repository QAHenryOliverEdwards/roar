import 'bootstrap/dist/css/bootstrap.css';
import './css/roar.css';
import './css/fonts.css';
import Homepage from "./pages/Homepage";
import {useCallback, useEffect, useState} from "react";
import LoginRegister from "./pages/LoginRegister";

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState([]);

    const checkLoggedIn = useCallback(()=>{
        let auth = sessionStorage.getItem('auth-roar');
        if (auth && (auth !== 'INVALID')) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [])

    const getPageToDisplay = useCallback(()=>{
        if (loggedIn) {
            setPage([<Homepage setLogoutFunc={setLoggedIn}/>]);
        } else {
            setPage([<LoginRegister setLoginFunc={setLoggedIn}/>]);
        }
    }, [loggedIn])

    useEffect(()=>{
        checkLoggedIn();
        getPageToDisplay();
    }, [checkLoggedIn, getPageToDisplay])
    return (
        <div>
            {page}
        </div>
    )
}

export default App;
