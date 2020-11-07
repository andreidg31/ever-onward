import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';

import {useEffect, useState} from 'react';
import {Button, Form, FormControl, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [user, setUser] = useState(
        localStorage.getItem('currentUser')
            ? JSON.parse(localStorage.getItem('currentUser'))
            : ''
    );

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }, [user])

    function logout() {
        localStorage.removeItem('currentUser');
        setUser('');
    }

    return (
        <div className="App">
            <Router>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/profile"> Profile </Nav.Link>
                        {!user && <Nav.Link href="/login">Login</Nav.Link> }
                        {!user && <Nav.Link href="/register">Register</Nav.Link> }
                        {user && <Button onClick={() => logout()}>Logout</Button>}
                    </Nav>
                    <Form inline="inline">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>

                    </Form>
                </Navbar>
                <div>
                    <Switch>
                        {!user
                            ? <Redirect exact from="/trips" to="/login"/>
                            : 
                            <div>
                                <Redirect exact from="/login" to="/home" />
                                <Redirect exact from="/register" to="/home" />
                            </div>
                        }
                        <Route path="/profile">
                            <Profile user={user} />
                        </Route>
                        <Route path="/home">
                            <Home user={user} />
                        </Route>

                        {!user &&
                            <div>
                                <Route path="/login">
                                    <Login user={user} setUser={setUser}/>
                                </Route>

                                <Route path="/register">
                                    <Register/>
                                </Route>
                            </div>
                        }
                        

                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
