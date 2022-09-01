
export type TValue = number|string

export interface IDropdownOption  {
    value: TValue;
    text: string;
    avatarUrl?: string,
}


export interface IDropdownGroupOption  {
    groupName: string,
    children: IDropdownOption[],
}

export type TOption = IDropdownOption|  IDropdownGroupOption

