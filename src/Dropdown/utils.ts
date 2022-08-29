import {IDropdownGroupOption, IDropdownOption, TOption} from './typings';

/**
 * 檢查傳入類型
 * @param options
 */
export const isGroupOptions = (options: TOption): options is IDropdownGroupOption => {
    return (options as IDropdownGroupOption).groupName !== undefined;
}


/**
 * 過濾項目
 * @param options
 * @param filterKeyword
 */
export const filterOptions = (options: IDropdownOption[], filterKeyword: string): IDropdownOption[] => {
    if(filterKeyword?.length > 0){
        return options.filter(row => {
            return row.text.toLowerCase().indexOf(filterKeyword.toLowerCase()) !== -1;
        });
    }
    return options;
}