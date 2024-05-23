# Acrool React Dropdown

> Dropdown list with React Component


[![NPM](https://img.shields.io/npm/v/@acrool/react-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-dropdown)
[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-dropdown)
[![npm](https://img.shields.io/npm/dt/@acrool/react-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-dropdown)
[![npm](https://img.shields.io/npm/l/@acrool/react-dropdown?style=for-the-badge)](https://github.com/imagine10255/@acrool/react-dropdown/blob/main/LICENSE)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-dropdown?style=for-the-badge)](https://github.com/imagine10255/@acrool/react-dropdown/blob/main/LICENSE)

<img src="https://raw.githubusercontent.com/imagine10255/bear-react-dropdown/main/docs/dropdown.jpg" width="700"/>


## Install

```bash
yarn add @acrool/react-dropdown
```

## Usage

add in your index.tsx
```tst
import "@acrool/react-dropdown/dist/index.css";
```

then in your page
```tsx
import {Dropdown, DropdownMulti} from '@acrool/react-dropdown';


const BaseUsed = () => {
    const [value, setValue] = useState<string|null>('');
    const [multiValue, setMultiValue] = useState<Array<string|null>|null>(null);

    const options1 = [
        {text: 'Jack Wu', value: '1'},
        {text: 'Imagine Chiu', value: '2'},
        {text: 'Jason Dinwiddie', value: '3'},
        {text: 'Gloria Lu', value: '4'},
    ];
    const options2 = [
        {text: 'Select option item...', value: '', avatarUrl: ''},
        {text: 'Jack Wu', value: '1', avatarUrl: asset('/images/avatar/female-1.jpg')},
        {text: 'Imagine Chiu', value: '2', avatarUrl: asset('/images/avatar/female-2.jpg')},
        {text: 'Jason Dinwiddie', value: '3', avatarUrl: asset('/images/avatar/female-3.jpg')},
        {text: 'Gloria Lu', value: '4', avatarUrl: asset('/images/avatar/female-4.jpg')},
    ];
    
    return (
        <div>
            <Dropdown value={value} onChange={setValue} options={options1} className="mr-3"/>
            <DropdownMulti value={multiValue} onChange={setMultiValue} options={options2} isDark/>
        </div>
    );

};
```


There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-react-dropdown-1uvhiw)


## License

MIT © [imagine10255](https://github.com/imagine10255)
