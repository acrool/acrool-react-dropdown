import React, {useState} from 'react';
import {Dropdown, DropdownMulti, IDropdownGroupOption} from 'bear-react-dropdown';
import styled from 'styled-components/macro';
import {asset} from '../../config/utils';




const BaseUsed = () => {
    const [value, setValue] = useState('');
    const [multiValue, setMultiValue] = useState<Array<string|number>>([]);
    const [isVisible1, setIsVisible1] = useState(true);

    const options1 = [
        {text: 'Jack Wu', value: '1'},
        {text: 'Imagine Chiu', value: '2'},
        {text: 'Jason Dinwiddie', value: '3'},
        {text: 'Gloria Lu', value: '4'},
        {text: 'Adam Bolton', value: '5'},
        {text: 'Stanley McQueen', value: '6'},
        {text: 'Bryson White', value: '7'},
        {text: 'Joe Bieber', value: '8'},
        {text: 'Gabriel Hampden', value: '9'},

        {text: 'Adrian Huang', value: '10'},
        {text: 'Felix Huang', value: '11'},
        {text: 'Gary Chien', value: '12'},
        {text: 'Keira Hsiao', value: '13'},
        {text: 'Morris Wang', value: '14'},
        {text: 'Nick Yang', value: '15'},
        {text: 'Wayne Chen', value: '16'},

        {text: 'NtdGamers電玩咖', value: '17'},
        {text: 'Kwun Hung Mak', value: '18'},
        {text: 'Daro Hang', value: '19'},
        {text: 'Monica Camilleri', value: '20'},

        {text: 'Drian Huang', value: '21'},
        {text: 'Alix Huang', value: '22'},
        {text: 'Ary Chien', value: '23'},
        {text: 'Eira Hsiao', value: '24'},
        {text: 'Orris Wang', value: '25'},
        {text: 'Ick Yang', value: '26'},
        {text: 'Ayne Chen', value: '27'},

        {text: 'TdGamers', value: '28'},
        {text: 'Hung Mak', value: '29'},
        {text: 'Aro Hang', value: '30'},
        {text: 'Onica Camilleri', value: '31'},

    ];
    const options2 = [
        {text: 'Select option item...', value: '', avatarUrl: ''},
        {text: 'Jack Wu', value: '1', avatarUrl: asset('/images/avatar/female-1.jpg')},
        {text: 'Imagine Chiu', value: '2', avatarUrl: asset('/images/avatar/female-2.jpg')},
        {text: 'Jason Dinwiddie', value: '3', avatarUrl: asset('/images/avatar/female-3.jpg')},
        {text: 'Gloria Lu', value: '4', avatarUrl: asset('/images/avatar/female-4.jpg')},
    ];
    const groupOptions1: IDropdownGroupOption[] = [
        {
            groupName: 'Yahoo',
            children: [
                {text: 'Jack Wu', value: '1', avatarUrl: asset('/images/avatar/female-1.jpg')},
            ]
        },
        {
            groupName: 'Google',
            children: [
                {text: 'Imagine Chiu', value: '2', avatarUrl: asset('/images/avatar/female-2.jpg')},
                {text: 'Jason Dinwiddie', value: '3', avatarUrl: asset('/images/avatar/female-3.jpg')},
            ]
        },
        {
            groupName: 'Bearests',
            children: [
                {text: 'Gloria Lu', value: '4', avatarUrl: asset('/images/avatar/female-4.jpg')},
            ]
        },


    ];

    return (
        <div>
            <div className="d-flex flex-row my-2">
                <input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
                <Button type="button" onClick={() => setIsVisible1(curr => !curr)}>Switch IsVisible</Button>
                <input type="text" value={JSON.stringify(multiValue)}/>
            </div>


            <div className="d-flex flex-row my-2">
                <Dropdown value={value} onChange={setValue} options={groupOptions1} isSearchEnable className="mr-3"/>
                <Dropdown value={value} onChange={setValue} options={groupOptions1} isSearchEnable isDark className="mr-3"/>
                <DropdownMulti value={multiValue} onChange={setMultiValue} options={groupOptions1} className="mr-3"/>
                <DropdownMulti value={multiValue} onChange={setMultiValue} options={groupOptions1} isDark className="mr-3"/>
            </div>



            {isVisible1 && (
                <div className="d-flex flex-row my-2">
                    <Dropdown value={value} onChange={setValue} options={options1} isSearchEnable className="mr-3"/>
                    <Dropdown value={value} onChange={setValue} options={options1} isSearchEnable isDark className="mr-3"/>
                    <DropdownMulti value={multiValue} onChange={setMultiValue} options={options1} className="mr-3"/>
                    <DropdownMulti value={multiValue} onChange={setMultiValue} options={options1} isDark className="mr-3"/>
                </div>
            )}



            <div className="d-flex flex-row my-2">
                <Dropdown value={value} onChange={setValue} options={[]} className="mr-3"/>
                <Dropdown value={value} onChange={setValue} options={[]} isDark/>
            </div>

            <div className="d-flex flex-row my-2">
                <Dropdown value={value} onChange={setValue} options={options1} isSearchEnable isCheckedEnable={false} className="mr-3"/>
                <Dropdown value={value} onChange={setValue} options={options1} isSearchEnable isCheckedEnable={false} isDark/>
            </div>


            <div className="d-flex flex-row my-2">
                <InputGroup className="mr-3">
                    <input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>

                    <InputDropdown>
                        <Dropdown value={value} onChange={setValue} options={options2}/>
                    </InputDropdown>
                </InputGroup>

                <InputGroup>
                    <input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>

                    <InputDropdown>
                        <Dropdown isCheckedEnable={false} onChange={setValue} options={options2} isDark/>
                    </InputDropdown>
                </InputGroup>

            </div>




        </div>
    );

};

export default BaseUsed;



const InputDropdown = styled.div`
    position: absolute;
  z-index: 50;
  top: 25px;
  left: 0;
  right: 0;
`;

const InputGroup = styled.div`
    position: relative;
`;

const Button = styled.button`
  background-color: rgba(0, 224, 112, 0.8);
  color: #fff;
`;