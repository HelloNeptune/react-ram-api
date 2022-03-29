import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
    document.querySelector("#root")
);