# bear-react-dropdown

> Datepicker library based for Reactjs

<img src="./docs/dropdown.jpg" width="300"/>

[![NPM](https://img.shields.io/npm/v/bear-react-dropdown.svg)](https://www.npmjs.com/package/bear-react-dropdown)
[![npm](https://img.shields.io/npm/dm/bear-react-dropdown.svg)](https://www.npmjs.com/package/bear-react-dropdown)



## Support Version Map

React | React Scripts | Bear React Grid | 
------|:--------------|----------------:|
18    | 5.0.1         |           2.0.0 |


## Install

```bash
yarn add bear-react-dropdown
```

## Usage

add in your index.tsx
```tst
import "bear-react-dropdown/dist/index.css";

```

then in your page
```tsx
import {Datepicker, Dropdown, DateTimepicker} from 'bear-react-dropdown';


const BaseUsed = () => {
    const options1 = [
        {text: 'Jack Wu', value: '1'},
        {text: 'Imagine Chiu', value: '2'},
        {text: 'Jason Dinwiddie', value: '3'},
        {text: 'Gloria Lu', value: '4'},
    ];
    const options2 = [
        {text: 'Jack Wu', value: '1', avatarUrl: 'https://bearests.com/uploads/sample-team-avatar/igroup-frontend.jpg?v=1'},
        {text: 'Imagine Chiu', value: '2', avatarUrl: 'https://bearests.com/uploads/sample-team-avatar/igroup-frontend.jpg?v=1'},
        {text: 'Jason Dinwiddie', value: '3', avatarUrl: 'https://bearests.com/uploads/sample-team-avatar/igroup-frontend.jpg?v=1'},
        {text: 'Gloria Lu', value: '4', avatarUrl: 'https://bearests.com/uploads/sample-team-avatar/igroup-frontend.jpg?v=1'},
    ];
    
    return (
        <div>
            <Dropdown value={value} onChange={setValue} options={options1} className="mr-3"/>
            <Dropdown value={value} onChange={setValue} options={options2} isDark/>
        </div>
    );

};
```


There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9he8m8)


## License

MIT © [imagine10255](https://github.com/imagine10255)
