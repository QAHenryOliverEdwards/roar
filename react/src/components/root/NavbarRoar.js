import {Navbar, Nav} from "react-bootstrap";
import {BrowserRouter, Link, Route, Redirect} from "react-router-dom";
import Switch from "react-bootstrap/Switch";
import Homepage from "../../pages/Homepage";
import About from "../../pages/About";
import Login from "../../pages/Login";
import {useEffect, useState} from "react";
import Register from "../../pages/Register";
import Logout from "../../pages/Logout";
import useWindowDimension from "../../functions/resize-functionality/useWindowDimension";

const NavbarRoar = () => {

    const {width, height} = useWindowDimension()

    const [loggedIn, setLoggedIn] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState()

    useEffect(() => {
        let navbarElement = document.querySelector('#nav-props');
        let navbarHeight = navbarElement.offsetHeight;
        let newHeight = height - navbarHeight;
        setNavbarHeight(newHeight);
    })

    const mint = '#00A170'

    if (loggedIn === false) {
        return (
            <BrowserRouter>
                <div className={'container-fluid fixed-bottom px-0'} style={{top: `${navbarHeight}px`}}>
                    <Navbar className={'row py-0 dark-blue-bg'} id={'nav-props'}>
                        <Nav>
                            <Nav.Item className={'col-3 text-center navbar-text'}><Link
                                to={'/home'} style={{color: mint}} id={'home'}>Home</Link></Nav.Item>
                            <Nav.Item className={'col-3 text-center navbar-text'}><Link
                                to={'/about'} style={{color: mint}} id={'about'}>About</Link></Nav.Item>
                            <Nav.Item className={'col-3 text-center navbar-text'}><Link
                                to={'/login'} style={{color: mint}} id={'login'}>Login</Link></Nav.Item>
                            <Nav.Item className={'col-3 text-center navbar-text'}><Link
                                to={'/register'} style={{color: mint}} id={'register'}>Register</Link></Nav.Item>
                        </Nav>
                    </Navbar>
                </div>
                <Switch>
                    <Route exact path={'/'}>
                        <Homepage loggedIn={loggedIn}/>
                    </Route>
                    <Route path={'/home'}>
                        <Homepage loggedIn={loggedIn}/>
                    </Route>
                    <Route path={'/about'}>
                        <About/>
                    </Route>
                    <Route path={'/login'}>
                        {loggedIn ? <Redirect to={'/home'}/> : <Login setLoginFunc={setLoggedIn}/>}
                    </Route>
                    <Route path={'/register'}>
                        {loggedIn ? <Redirect to={'/home'}/> : <Register setLoginFunc={setLoggedIn}/>}
                    </Route>
                    <Route path={'/logout'}>
                        {loggedIn ? <Logout setLoginFunc={setLoggedIn}/> : <Redirect to={'/home'}/>}
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    } else if (loggedIn === true) {
        return (
            <BrowserRouter>
                <div className={'container-fluid fixed-bottom px-0'} id={'navbar-link'}
                     style={{top: `${navbarHeight}px`}}>
                    <Navbar className={'row py-0'} id={'nav-props'}>
                        <Nav>
                            <Nav.Item className={'col-4 text-center navbar-text'}><Link
                                to={'/home'} style={{color: mint}} id={'home'}>Home</Link></Nav.Item>
                            <Nav.Item className={'col-4 text-center navbar-text'}><Link
                                to={'/about'} style={{color: mint}} id={'about'}>About</Link></Nav.Item>
                            <Nav.Item className={'col-4 text-center navbar-text'}><Link
                                to={'/logout'} style={{color: mint}} id={'logout'}>Logout</Link></Nav.Item>
                        </Nav>
                    </Navbar>
                </div>
                <Switch>
                    <Route exact path={'/'}>
                        <Homepage loggedIn={loggedIn}/>
                    </Route>
                    <Route path={'/home'}>
                        <Homepage loggedIn={loggedIn}/>
                    </Route>
                    <Route path={'/about'}>
                        <About/>
                    </Route>
                    <Route path={'/login'}>
                        {loggedIn ? <Redirect to={'/home'}/> : <Login setLoginFunc={setLoggedIn}/>}
                    </Route>
                    <Route path={'/register'}>
                        {loggedIn ? <Redirect to={'/home'}/> : <Register setLoginFunc={setLoggedIn}/>}
                    </Route>
                    <Route path={'/logout'}>
                        {loggedIn ? <Logout setLoginFunc={setLoggedIn}/> : <Redirect to={'/home'}/>}
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default NavbarRoar;