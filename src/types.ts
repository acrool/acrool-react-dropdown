import {ReactNode} from 'react';

export interface IDropdownOption<T>  {
    value: T
    text: string
    nodeText?: ReactNode
    searchTags?: string[]
    avatarUrl?: string
    color?: string
    isHidden?: boolean
}

export interface IDropdownGroupOption<T>  {
    groupName: string,
    children: IDropdownOption<T>[],
}

export type TOption<T> = IDropdownOption<T> | IDropdownGroupOption<T>

