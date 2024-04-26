import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bear-react-grid/dist/index.css';
import {ThemeProvider} from 'styled-components';
import {GridThemeProvider} from 'bear-react-grid';


const AppProvider = () => {
    return <GridThemeProvider gridTheme={{}}>
        <App />
    </GridThemeProvider>;
};


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <AppProvider/>
    // </React.StrictMode>,
);
