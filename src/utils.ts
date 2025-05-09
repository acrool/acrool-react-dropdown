import {IDropdownGroupOption, IDropdownOption, TOption} from './types';

/**
 * 檢查傳入類型
 * @param options
 */
export const isGroupOptions = <T>(options?: TOption<T>): options is IDropdownGroupOption<T> => {
    return !!(options && 'groupName' in options);
};


/**
 * 過濾文字
 * @param text
 * @param filterKeyword
 */
const filterString = (text: string, filterKeyword: string) => {
    return String(text).toLowerCase().indexOf(filterKeyword.toLowerCase()) !== -1;
};

/**
 * 過濾文字列表 (Tags)
 * @param tags
 * @param filterKeyword
 */
const filterStringTags = (tags: string[], filterKeyword: string) => {
    return tags.filter(tag => filterString(tag, filterKeyword)).length > 0;
};


export function matchAZ09(str: string): boolean {
    const regex = /^[a-z0-9]+$/;
    return regex.test(str);
}



/**
 * 依輸入關鍵字過濾項目
 * @param options
 * @param filterKeyword
 */
export const filterOptions = <T>(options?: Array<TOption<T>>, filterKeyword = ''): Array<TOption<T>> => {
    if(filterKeyword?.length === 0) {
        return options ?? [];
    }

    return options?.reduce((curr: Array<TOption<T>>, option) => {
        if(isGroupOptions(option)){
            const filteredChildren = filterOptions(option.children, filterKeyword);

            if(filteredChildren.length > 0){
                return [
                    ...curr,
                    {
                        groupName: option.groupName,
                        children: (filteredChildren as Array<IDropdownOption<T>>),
                    }
                ];
            }
            return curr;
        }

        const originTags = !isEmpty(option.searchTags) ? option.searchTags : [option.text];
        if(filterStringTags(originTags, filterKeyword)){
            return [...curr, option];
        }
        return curr;

        // return curr;
    }, []) ?? [];
};


// /**
//  * 過濾項目
//  * @param options
//  * @param filterKeyword
//  */
// export const filterOptions = <T>(options: IDropdownOption<T>[], filterKeyword: string): IDropdownOption<T>[] => {
//     if(filterKeyword?.length > 0){
//         return options.filter(row => {
//             return String(row.text).toLowerCase().indexOf(filterKeyword.toLowerCase()) !== -1;
//         });
//     }
//     return options;
// };



type Empty = null | undefined | false | '' | 0;

/**
 * 判断是否为空
 * @param value
 * @param checkOption
 * @returns {boolean}
 */
export function isEmpty<T>(value: T, checkOption?: {
    isZero?: boolean,
    isFalse?: boolean,
}): value is Extract<T, Empty> {
    const defaultCheckOption = {
        isZero: checkOption?.isZero ?? true,
        isFalse: checkOption?.isFalse ?? true,
    };
    return (
        value === undefined
        || value === null
        || (defaultCheckOption.isFalse && (value === false || value === 'false'))
        || (defaultCheckOption.isZero && (value === 0 || value === '0'))
        || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
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





interface IGetIndexReturn {itemIndex: number, groupIndex: number}

/**
 * 取得 Index 位置
 * @param options
 * @param value
 */
export function getIndex<T>(options?: Array<TOption<T>>, value?: T): IGetIndexReturn{
    let itemIndex: number = -1;
    const groupIndex = options?.findIndex((row, layerIndex) => {
        if(isGroupOptions(row)){
            const optionIndex = row.children.findIndex((childRow, childIndex) => {
                const isActive = childRow.value === value;
                if(isActive){
                    itemIndex = childIndex; // 順便紀錄項目位置
                    return true;
                }
                return false;
            });
            return optionIndex >= 0;
        }

        // 一般層級
        const isActive = row.value === value;
        if(isActive){
            itemIndex = layerIndex; // 順便紀錄項目位置
            return true;
        }
        return false;
    }) ?? -1;

    return {
        groupIndex,
        itemIndex
    };
}


/**
 * 取得 下一個 Index 位置 group
 * @param options
 * @param groupIndex
 * @param itemIndex
 */
export function getNextIndexValue<T>(options: Array<TOption<T>>, groupIndex: number, itemIndex: number): T{
    const typeCurrOpt = options[groupIndex];
    const typeNextOpt = options[groupIndex + 1];

    const typeLastIndex = options.length - 1;

    // group
    if(isGroupOptions(typeCurrOpt)){
        const currLastIndex = typeCurrOpt?.children.length - 1;

        // 如果是最後一個群組項目Index，那則往下一個 group 的第一個 index 尋找
        if(groupIndex < typeLastIndex && itemIndex === currLastIndex) {
            const nextOptions = options[groupIndex + 1];
            if(isGroupOptions(nextOptions)){
                return nextOptions.children[0]?.value;
            }
            return nextOptions[0]?.value;
        }
        return (typeCurrOpt.children[itemIndex + 1] ?? typeCurrOpt.children[itemIndex])?.value;
    }


    if(isGroupOptions(typeNextOpt)){
        return typeNextOpt.children[0]?.value;
    }

    return (typeNextOpt ?? typeCurrOpt)?.value;
}


/**
 * 取得 上一個 Index 位置
 * @param options
 * @param groupIndex
 * @param itemIndex
 */
export function getPrevIndexValue<T>(options: TOption<T>[], groupIndex: number, itemIndex: number): T{
    const typeCurrOpt = options[groupIndex];
    const typePrevOpt = options[groupIndex - 1];

    // Group
    if(isGroupOptions(typeCurrOpt)) {
        if(groupIndex > 0 && itemIndex === 0){
            const prevOption = options[groupIndex - 1];
            if(isGroupOptions(prevOption)) {
                const lastItemIndex = prevOption.children.length - 1;
                return prevOption.children[lastItemIndex]?.value;
            }
            return prevOption?.value;
        }

        return (typeCurrOpt.children[itemIndex - 1] ?? typeCurrOpt.children[itemIndex])?.value;
    }

    if(isGroupOptions(typePrevOpt)){
        const prevGroupOptionLastIndex = typePrevOpt.children.length - 1;
        return typePrevOpt.children[prevGroupOptionLastIndex]?.value;
    }

    return (typePrevOpt ?? typeCurrOpt)?.value;
}

/**
 * 取得 第一個 Index 位置
 * @param options
 */
export function getFirstIndexValue<T>(options: TOption<T>[]): T|undefined{
    const typeCurrOpt = options && options.length > 0 ? options[0]: undefined;

    // Group
    if(isGroupOptions(typeCurrOpt)) {
        return typeCurrOpt.children[0].value;
    }
    return typeCurrOpt?.value;
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
        if(selectedElement.role === 'group'){
            const selectedChildElement = selectedElement.getElementsByTagName('ul')[0]
                .childNodes[itemIndex] as HTMLElement;

            if(selectedChildElement){
                selectedChildElement.scrollIntoView({behavior: 'auto', block: 'nearest'});
            }
        }else{
            selectedElement.scrollIntoView({behavior: 'auto', block: 'nearest'});
        }

    }
}


/**
 * 判斷是否為手機裝置
 */
export function checkIsMobile(): boolean {
    try { document.createEvent('TouchEvent'); return true; } catch (e) { return false; }
}
