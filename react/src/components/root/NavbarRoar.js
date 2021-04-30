import {Navbar, Nav} from "react-bootstrap";
import {BrowserRouter, Link, Route, Redirect} from "react-router-dom";
import Switch from "react-bootstrap/Switch";
import Homepage from "../../pages/Homepage";
import About from "../../pages/About";
import Login from "../../pages/Login";
import {useState} from "react";
import Register from "../../pages/Register";
import Logout from "../../pages/Logout";

const NavbarRoar = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    if (loggedIn === false) {
        return (
            <BrowserRouter>
                <div className={'container-fluid fixed-bottom'}>
                    <Navbar className={'row'}>
                        <Nav>
                            <Nav.Item className={'col-3 text-center'}><Link to={'/home'}>Home</Link></Nav.Item>
                            <Nav.Item className={'col-3 text-center'}><Link to={'/about'}>About</Link></Nav.Item>
                            <Nav.Item className={'col-3 text-center'}><Link to={'/login'}>Login</Link></Nav.Item>
                            <Nav.Item className={'col-3 text-center'}><Link to={'/register'}>Register</Link></Nav.Item>
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
                <div className={'container-fluid fixed-bottom'}>
                    <Navbar className={'row'}>
                        <Nav>
                            <Nav.Item className={'col-4 text-center'}><Link to={'/home'}>Home</Link></Nav.Item>
                            <Nav.Item className={'col-4 text-center'}><Link to={'/about'}>About</Link></Nav.Item>
                            <Nav.Item className={'col-4 text-center'}><Link to={'/logout'}>Logout</Link></Nav.Item>
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