
export type TOfNull<T> = T|null;


export interface IDropdownOption<T>  {
    value: T;
    text: string;
    avatarUrl?: string,
}


export interface IDropdownGroupOption<T>  {
    groupName: string,
    children: IDropdownOption<T>[],
}

export type TOption<T> = IDropdownOption<T>|  IDropdownGroupOption<T>

