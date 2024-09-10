import {TOption} from '@acrool/react-dropdown';
import {data} from '../src/config/data';


export const options: TOption<string>[] = [
    ...data.slice(0, 12).map(row => ({text: row.name, value: row.id, avatarUrl: row.avatar})),
];


export const groupOptions: TOption<string>[] = [
    ...data.slice(0, 2).map(row => ({text: row.name, value: row.id, avatarUrl: row.avatar})),
    {
        groupName: 'Frontend Team',
        children: [
            ...data.slice(3, 5).map(row => ({text: row.name, value: row.id, avatarUrl: row.avatar})),
        ]
    },
    {
        groupName: 'Backend Team',
        children: [
            ...data.slice(6, 10).map(row => ({text: row.name, value: row.id, avatarUrl: row.avatar})),
        ]
    },
    {
        groupName: 'PM Team',
        children: []
    },
];
