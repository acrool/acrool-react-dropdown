import {TOption} from "../../dist";

export const options: TOption<string>[] = [
    {text: 'Apple', value: 'A'},
    {text: 'Basic', value: 'B'},
    {text: 'Cat & Car', value: 'C'},
    {text: 'Dog & Desk', value: 'D'},
    {text: 'Element', value: 'E'},
    {text: 'Firefox', value: 'F'},
    {text: 'Google', value: 'G'},
];


export const groupOptions: TOption<string>[] = [
    {text: 'Apple', value: 'A'},
    {text: 'Basic', value: 'B'},
    {
        groupName: 'Item',
        children: [
            {text: 'Cat & Car', value: 'C'},
            {text: 'Dog & Desk', value: 'D'},
        ]
    },
    {text: 'Element', value: 'E'},
    {
        groupName: 'Chrome',
        children: [
            {text: 'Firefox', value: 'F'},
            {text: 'Google', value: 'G'},
        ]
    },
    {
        groupName: 'None Children',
        children: []
    },
];
