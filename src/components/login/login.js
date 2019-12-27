import React, {useState} from "react";
import './login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as config from '../../configs/development';
import { useHistory } from "react-router-dom";


function Login() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const logIn = () => {
        axios.post(config.api.baseUrl + 'admin/login', { login: login, password: password })
            .then(res => {
                axios.defaults.headers.common['Authorization'] = res.data;
                localStorage.setItem('auth-token', res.data);
                history.push('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <form>
            <TextField id="login" label="Login" variant="outlined" size="small" value={login}
                       onChange={handleLoginChange}/>
            <TextField id="password" label="Password" variant="outlined" size="small" value={password}
                       onChange={handlePasswordChange} type="password"/>
            <Button className="formButton" variant="contained" color="primary" onClick={logIn}>
                Log In
            </Button>
        </form>
    )
}

export default Login;
