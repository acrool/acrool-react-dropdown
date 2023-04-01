import {IDropdownGroupOption, IDropdownOption, TOption} from './types';

/**
 * 檢查傳入類型
 * @param options
 */
export const isGroupOptions = <T>(options: TOption<T>): options is IDropdownGroupOption<T> => {
    return (options as IDropdownGroupOption<T>).groupName !== undefined;
};


/**
 * 過濾項目
 * @param options
 * @param filterKeyword
 */
export const filterOptions = <T>(options: IDropdownOption<T>[], filterKeyword: string): IDropdownOption<T>[] => {
    if(filterKeyword?.length > 0){
        return options.filter(row => {
            return String(row.text).toLowerCase().indexOf(filterKeyword.toLowerCase()) !== -1;
        });
    }
    return options;
};




/**
 * 判定是否為空
 * @param value
 * @returns {boolean}
 */
export function isEmpty(value: any): boolean {
    return (
        value === undefined
        || value === null
        || (typeof value === 'string' && value.trim().length === 0)
    );
}



/**
 * 刪除陣列中的一筆資料 (immutable)
 * ps: 不用先複製, 方法內會複製出來
 * ex: [1,2,3] -> [1,3]
 *
 * @param arrayData
 * @param index
 */
export function removeByIndex<T>(arrayData: T[], index: number): T[] {
    if(index === -1 || index > arrayData.length - 1) return arrayData;
    return [...arrayData.slice(0, index), ...arrayData.slice(index + 1)];
}
