import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

import { createContext, useState } from 'react';

function App() {

  const [isAuth, setAuthentication] = useState(false);
  const [user, setUser] = useState({
    email: '', 
    password: ''
  });

  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/trips">trips</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          { user.email === '' && <Redirect exact from="/trips" to="/login" />}

          <Route path="/about">

          </Route>

          <Route path="/login">
            <Login user={user} setUser={setUser}/>
          </Route>

          <Route path ="/signup">
            <SignUp />
          </Route>

          <Route path="/">
            <Home isAuth={isAuth} user={user}/>
          </Route>

        </Switch>
      </div>
     </Router>
    </div>
  );
}

export default App;
