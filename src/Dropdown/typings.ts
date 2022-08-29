
export interface IDropdownOption  {
    value: string;
    text: string;
    avatarUrl?: string,
}


export interface IDropdownGroupOption  {
    groupName: string,
    children: IDropdownOption[],
}

export type TOption = IDropdownOption|  IDropdownGroupOption

