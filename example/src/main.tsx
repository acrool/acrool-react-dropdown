import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import {GridThemeProvider} from '@acrool/react-grid';
import '@acrool/react-grid/dist/index.css';
import '@acrool/react-dropdown/dist/index.css';
import '@acrool/react-picker/dist/index.css';


const AppProvider = () => {
    return <GridThemeProvider>
        <App />
    </GridThemeProvider>;
};


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <AppProvider/>
    // </React.StrictMode>,
);
