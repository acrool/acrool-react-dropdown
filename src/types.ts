
export type TOfNull<T> = T | null;
export type TOfNullArray<T> = TOfNull<T>[];
export type TNullOfNullOrArray<T> = TOfNullArray<T> | TOfNull<T>;
// export type TNullOfNullOrArray<T, M extends boolean> = M extends true ? TOfNullArray<T>: TOfNull<T>;


export interface IDropdownOption<T>  {
    value: T;
    text: string;
    avatarUrl?: string,
    color?: string,
}


export interface IDropdownGroupOption<T>  {
    groupName: string,
    children: IDropdownOption<T>[],
}

export type TOption<T> = IDropdownOption<T>|  IDropdownGroupOption<T>

