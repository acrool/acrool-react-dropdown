
export type TOfNull<T> = T|null;


export interface IDropdownOption<T>  {
    value: T;
    text: string;
    avatarUrl?: string,
    color?: string,
}


// export interface IDropdownGroupOption<T>  {
//     groupName: string,
//     children: IDropdownOption<T>[],
// }
export interface IDropdownGroupOption<T>  {
    groupName: string,
    children: IDropdownOption<T>[],
}
// export interface IDropdownGroupOption<T> {
//     groupName: string,
//     children: Array<{
//         text: string,
//         value: T,
//         avatarUrl?: string,
//         color?: string
//     }>
// }

export type TOption<T> = IDropdownOption<T>|  IDropdownGroupOption<T>
// export type TOption<T> = IDropdownOption<TOfNull<T>>[] | IDropdownGroupOption<TOfNull<T>>[]

