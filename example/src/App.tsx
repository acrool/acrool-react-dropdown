import {useState, useMemo} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {Dropdown, DropdownMulti, TOption, IDropdownOption} from 'bear-react-dropdown';
import {groupBy} from 'bear-jsutils/array';

import './App.css';
import 'bear-react-dropdown/dist/index.css';
import {data} from './config/data';


function App() {
    const [value, setValue] = useState<string|null>('4');
    const [multiValue, setMultiValue] = useState<Array<string|null>|null>(null);

    const options1 = data.map(row => {
        return {text: row.name, value: String(row.id)};
    });

    const options2 = data.map(row => {
        return {
            text: row.name,
            value: row.id,
        };
    });

    const groupData = groupBy(data, row => row.role);
    const options3 = Object.keys(groupData)
        .map(groupKey => {
            const curr = groupData[groupKey];
            return {
                groupName: groupKey,
                children: curr.map(row => {
                    return {
                        text: row.name,
                        value: row.id,
                        avatarUrl: row.avatar
                    };
                }),
            };
        });


    const placeholderOptions: TOption<any>[] = useMemo(() => {
        const placeholderOption: IDropdownOption<string|null> = {text: 'placeholder...', value: null};
        return [placeholderOption].concat(options3 as any);

    }, [value, options3]);


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
            <div className="card" style={{display: 'flex', gap: '10px'}}>
                <Dropdown value={value} onChange={setValue} options={null} isDark />
                {/*<DropdownMulti value={multiValue} onChange={setMultiValue} options={options1} isDark/>*/}
                <Dropdown value={value} onChange={setValue} options={undefined} isDark/>
                <Dropdown value={value} onChange={setValue} options={options3} isDark isAvatarEnable />
                <Dropdown value={value} onChange={setValue} options={options2} isDark isAvatarEnable />
                <Dropdown value={value} onChange={setValue} options={placeholderOptions} isDark isSearchEnable />
                {/*<DropdownMulti value={multiValue} onChange={setMultiValue} options={options3} isDark/>*/}

            </div>
            <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
