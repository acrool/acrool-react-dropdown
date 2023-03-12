import {IDropdownGroupOption, IDropdownOption, TOption} from './typings';

/**
 * 檢查傳入類型
 * @param options
 */
export const isGroupOptions = <T>(options: TOption<T>): options is IDropdownGroupOption<T> => {
    return (options as IDropdownGroupOption<T>).groupName !== undefined;
}


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
}
