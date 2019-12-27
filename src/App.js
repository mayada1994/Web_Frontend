import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HomePage from "./components/home-page/home-page";
import Login from "./components/login/login";
import axios from "axios";

const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#ae3d63'
            }
        }
    },
)

axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth-token');

function App() {
    return (
        <MuiThemeProvider theme={theme}>
        <Router>
            <Route path="/admin">
                <Login/>
            </Route>
            <Route exact path="/">
                <HomePage/>
            </Route>
        </Router>
        </MuiThemeProvider>
    );
}

export default App;
