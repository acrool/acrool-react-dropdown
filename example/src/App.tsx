import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {Dropdown, DropdownMulti} from 'bear-react-dropdown';

import './App.css';
import 'bear-react-dropdown/dist/index.css';


function App() {
    const [value, setValue] = useState<string|null>('0');
    const [multiValue, setMultiValue] = useState<Array<string|null>|null>(null);

    const options1 = [
        {text: 'Jack Wu', value: '1'},
        {text: 'Imagine Chiu', value: '2'},
        {text: 'Jason Dinwiddie', value: '3'},
        {text: 'Gloria Lu', value: '4'},
    ];

    const options2 = [
        {text: 'Select option item...', value: ''},
        {text: 'Jack Wu', value: '1'},
        {text: 'Imagine Chiu', value: '2'},
        {text: 'Jason Dinwiddie', value: '3'},
        {text: 'Gloria Lu', value: '4'},
    ];

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Dropdown value={value} onChange={setValue} options={options1} isDark className="mr-3"/>
                <DropdownMulti value={multiValue} onChange={setMultiValue} options={options2} isDark/>

                <p>
          Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
