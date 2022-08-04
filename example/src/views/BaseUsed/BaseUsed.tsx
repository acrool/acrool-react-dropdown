import React, {useState} from 'react';
import {Dropdown, Timepicker, DateTimepicker, RangeDatepicker, IRangeDateValue} from 'bear-react-dropdown';




const BaseUsed = () => {
    const [myDateTime, setMyDateTime] = useState('');
    const [myDate, setMyDate] = useState('');
    const [myTime, setMyTime] = useState('');
    const [myRangeDate, setMyRangeDate] = useState<IRangeDateValue>({startDate: undefined, endDate: undefined});

    const options = [
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
        {text: 'Nick Yang', value: '14'},
        {text: 'Wayne Chen', value: '15'},
        {text: 'NtdGamers電玩咖', value: '16'},
        {text: 'Kwun Hung Mak', value: '17'},
        {text: 'Daro Hang', value: '18'},
        {text: 'Monica Camilleri', value: '19'},
    ];

    return (
        <div>
            <input type="text" value={myDate} onChange={(event) => setMyTime(event.target.value)}/>
            <div className="d-flex flex-row my-2">
                <Dropdown value={myDate} onChange={setMyDate} options={options} locale="zh-CN" className="mr-3"/>
                <Dropdown value={myDate} onChange={setMyDate} options={options} locale="zh-CN" isDark/>
            </div>





        </div>
    );

};

export default BaseUsed;
