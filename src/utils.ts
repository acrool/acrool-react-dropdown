import {IDropdownGroupOption, IDropdownOption, TOption, TOfNull, TOfNullArray, TNullOfNullOrArray} from './types';

/**
 * 檢查Option類型
 * @param options
 */
export const isGroupOptions = <T>(options: TOption<T>): options is IDropdownGroupOption<T> => {
    return (options as IDropdownGroupOption<T>).groupName !== undefined;
};

/**
 * 檢查Options類型
 * @param options
 */
export const isGroup = <T>(options: TOption<T>[]): options is IDropdownGroupOption<T>[] => {
    return (options as IDropdownGroupOption<T>[])[0].groupName !== undefined;
};

/**
 * 檢查Value類型
 * @param value
 */
export const isMultiValue = <T>(value: TNullOfNullOrArray<T>): value is TOfNullArray<T>=> {
    return typeof value === 'object' || null;
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


/**
 * 產生 Item 相關的 style 參數
 * @param args
 */
export function getOptionStyle(args?: {avatarUrl?: string, color?: string}): React.CSSProperties{
    return {
        backgroundImage: args?.avatarUrl ? `url(${args.avatarUrl})`: 'auto',
        backgroundColor: args?.color
    };
}





interface IGetIndexReturn {itemIndex: number, groupIndex?: number}

/**
 * 取得 Index 位置
 * @param options
 * @param value
 */
export function getIndex<T>(options: IDropdownOption<TOfNull<T>>[] | IDropdownGroupOption<TOfNull<T>>[], value: T): IGetIndexReturn{
    let itemIndex: number = null;
    if(isGroup(options)){
        const groupIndex = options.findIndex((row, gIndex) => {
            const optionIndex = row.children.findIndex((childRow, childIndex) => {
                const isActive = childRow.value === value;
                if(isActive){
                    itemIndex = childIndex; // 順便紀錄項目位置
                    return true;
                }
                return false;
            });
            return optionIndex >= 0;
        });

        return {
            groupIndex,
            itemIndex
        };
    }

    itemIndex = options.findIndex((row, gIndex) => row.value === value);

    return {
        itemIndex
    };
}


/**
 * 取得 下一個 Index 位置 group
 * @param options
 * @param groupIndex
 * @param itemIndex
 */
export function getNextIndexValueByGroup<T>(options: IDropdownGroupOption<TOfNull<T>>[], groupIndex: number, itemIndex: number): T{
    if(itemIndex === null && options.length > 0 && options[0].children.length > 0){
        return options[0].children[0]?.value;
    }

    const lastItemIndex = options[groupIndex].children.length - 1;
    const lastGroupIndex = options.length - 1;

    // 如果是最後一個群組項目Index，那則往下一個 group 的第一個 index 尋找
    if(groupIndex < lastGroupIndex && itemIndex === lastItemIndex){
        const nextGroupOption = options[groupIndex + 1];
        return nextGroupOption.children[0]?.value;
    }

    const childOption = options[groupIndex]?.children[itemIndex+1];
    return childOption?.value ?? options[groupIndex].children[itemIndex].value;
}


/**
 * 取得 上一個 Index 位置 by group
 * @param options
 * @param groupIndex
 * @param itemIndex
 */
export function getPrevIndexValueByGroup<T>(options: IDropdownGroupOption<TOfNull<T>>[], groupIndex: number, itemIndex: number): T{
    if(itemIndex === null && options.length > 0 && options[0].children.length > 0){
        return options[0].children[0]?.value;
    }

    // 如果是最前面第一個群組項目Index，那則往上一個 group 的第一個 index 尋找
    if(groupIndex > 0 && itemIndex === 0){
        const prevGroupOption = options[groupIndex - 1];
        const lastItemIndex = prevGroupOption.children.length - 1;
        return prevGroupOption.children[lastItemIndex]?.value;
    }

    const childOption = options[groupIndex]?.children[itemIndex-1];
    return childOption?.value ?? options[groupIndex].children[itemIndex].value;
}

/**
 * 取得 上一個 Index 位置by group
 * @param options
 * @param itemIndex
 */
export function getPrevIndexValue<T>(options: IDropdownOption<TOfNull<T>>[], itemIndex: number): T{
    // 如果是最前面第一個群組項目Index，那則往上一個 group 的第一個 index 尋找
    if(itemIndex > 0){
        return options[itemIndex - 1]?.value;
    }
    return options[itemIndex]?.value;
}

/**
 * 取得 下一個 Index 位置by group
 * @param options
 * @param itemIndex
 */
export function getNextIndexValue<T>(options: IDropdownOption<TOfNull<T>>[], itemIndex: number): T{
    // 如果是最前面第一個群組項目Index，那則往上一個 group 的第一個 index 尋找
    const lastItemIndex = options.length - 1;
    if(itemIndex < lastItemIndex){
        return options[itemIndex + 1]?.value;
    }
    return options[itemIndex]?.value;
}


/**
 * 取得 Index 位置
 * @param ul
 * @param itemIndex
 */
export function scrollIntoView<T>(ul: HTMLUListElement, itemIndex: number): void{
    const selectedElement = ul.childNodes[itemIndex] as HTMLElement;
    if (selectedElement) {
        selectedElement.scrollIntoView({behavior: 'auto', block: 'nearest'});
    }
}


/**
 * 取得 Index 位置 by Group mode
 * @param ul
 * @param groupIndex
 * @param itemIndex
 */
export function scrollIntoViewByGroup<T>(ul: HTMLUListElement, groupIndex: number, itemIndex: number): void{
    const selectedElement = ul.childNodes[groupIndex] as HTMLElement;
    if (selectedElement) {
        const selectedChildElement = selectedElement.getElementsByTagName('ul')[0]
            .childNodes[itemIndex] as HTMLElement;
        if(selectedChildElement){
            selectedChildElement.scrollIntoView({behavior: 'auto', block: 'nearest'});
        }
    }
}





/**
 * 取得 Index 位置 by Group mode
 * @param values
 * @param newValue
 */
export function modifyChecked<T>(values: TOfNullArray<T>, newValue: T): TOfNullArray<T>{
    const index = values?.findIndex(rowVal => rowVal === newValue) ?? -1;
    let formatValues: TOfNull<T>[]|null = null;
    const convertValue = values ?? [];
    if(index >= 0){
        formatValues = removeByIndex(convertValue, index);
    }else{
        formatValues = [...convertValue, newValue];
    }
    if(formatValues?.length === 0){
        formatValues = null;
    }
    return formatValues;

}





