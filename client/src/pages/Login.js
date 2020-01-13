import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from "../img/walkthru.JPG";
import { Card, Logo, Form, Input, Button, Error } from '../components/AuthForm';
import { useAuth } from "../context/auth";

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError,setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password,setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    
    //referer state will be used in the event that a user
    //that is not yet logged in tries to log in.  The private route 
    //will first redirect them to the login page, but will set the referer
    //state to the page they were trying to access.  After they login,
    //they can then be redirected back to the page they were originally
    //trying to access.
    const referer = props.location.state.referer || '/';

    function postLogin() {
        axios.post("https://www.somePlace.com/auth/login", {
            userName,
            password
        }).then(result => {
            if (result.status === 200) {
                setAuthTokens(result.data)
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
            type="username"
            value={userName}
            onChange={e => {
                setUserName(e.target.value);
            }}
            placeholder="email"
        />

        <Input  
            type="password"
            value={password}
            onChange={e => {
                setPassword(e.target.value);
            }}
            placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
        { isError &&<Error>The username or password provided were incorrect!</Error>}
    </Card>
  );
}

export default Login;