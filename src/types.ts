import {ReactNode} from 'react';

export interface IDropdownOption<T>  {
    value: T
    text: string|ReactNode
    searchTags?: string[]
    avatarUrl?: string
    color?: string
}

export interface IDropdownGroupOption<T>  {
    groupName: string,
    children: IDropdownOption<T>[],
}

export type TOption<T> = IDropdownOption<T> | IDropdownGroupOption<T>

