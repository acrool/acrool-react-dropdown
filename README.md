# Acrool React Dropdown

<a href="https://acrool-react-dropdown.pages.dev/" title="Acrool React Dropdown - Dropdown list with React Component">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-dropdown/main/example/public/og.webp" alt="Acrool React Dropdown Logo"/>
</a>

<p align="center">
    Drop-down menu with rich functions, including search/groups options/avatar/multi for Reactjs
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-dropdown)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-dropdown?style=for-the-badge)](https://github.com/acrool/@acrool/react-dropdown/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-dropdown?style=for-the-badge)](https://github.com/acrool/react-dropdown/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-dropdown)
[![npm](https://img.shields.io/npm/dt/@acrool/react-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-dropdown)

</div>


`^3.1.0 support react >=18.0.0 <20.0.0`


## Features

- Supports two themes (light/dark)
- Support multiple selection function
- Support groups options
- Support avatar display
- Support search search function
- Support value custom type (string, number, boolean, object...)
- Support accessibility (keyboard Tab, Arrow Top, Bottom, Enter)

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


const Example = () => {
    const [value, setValue] = useState<string|null>('');
    const [multiValue, setMultiValue] = useState<Array<string|null>|null>(null);

    const renderDropdown = () => {
        const options = [
            {text: 'Jack Wu', value: '1'},
            {text: 'Imagine Chiu', value: '2'},
            {text: 'Jason Dinwiddie', value: '3'},
            {text: 'Gloria Lu', value: '4'},
        ];
        return <Dropdown value={value} onChange={setValue} options={options}/>;
    }
    
    const renderDropdownMulti = () => {
        const options = [
            {text: 'Select option item...', value: '', avatarUrl: ''},
            {text: 'Jack Wu', value: '1', avatarUrl: asset('/images/avatar/female-1.jpg')},
            {text: 'Imagine Chiu', value: '2', avatarUrl: asset('/images/avatar/female-2.jpg')},
            {text: 'Jason Dinwiddie', value: '3', avatarUrl: asset('/images/avatar/female-3.jpg')},
            {text: 'Gloria Lu', value: '4', avatarUrl: asset('/images/avatar/female-4.jpg')},
        ];
        return <DropdownMulti value={multiValue} onChange={setMultiValue} options={options2} isDark/>;
    }
    
    return (
        <>
            {renderDropdown()}
            {renderDropdownMulti()}
        </>
    );

};
```

<img src="https://acrool-react-dropdown.pages.dev/preview.webp" alt="Acrool React Dropdown Preview" width="700"/>



## Options

if need use `null` value, options type

```json
{
    "compilerOptions": {
        "strictNullChecks": false
    }
}
```

There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-dropdown/main/play-in-example-button.svg)](https://acrool-react-dropdown.pages.dev)


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
