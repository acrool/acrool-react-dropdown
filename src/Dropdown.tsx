import React, {useState, useRef, useEffect, useCallback, startTransition} from 'react';
import CSS from 'csstype';
import elClassNames from './el-class-names';
import cx from 'classnames';
import {isEmpty, getOptionStyle} from './utils';

import './styles.css';
import {CheckIcon} from './Icon';
import {IDropdownOption, TOfNull, TOption, IDropdownGroupOption} from './types';
import {filterOptions, isGroupOptions} from './utils';
import HotKey from './HotKey';


interface IProps<T> {
    className?: string;
    style?: CSS.Properties

    onChange?: (value: TOfNull<T>) => void;
    onClick?: (value: TOfNull<T>) => void;
    isSearchEnable?: boolean,
    isCheckedEnable?: boolean,
    isAvatarEnable?: boolean,
    value?: TOfNull<T>;
    options?: TOption<TOfNull<T>>[];
    // options?: IDropdownOption<TOfNull<T>>[] | IDropdownGroupOption<TOfNull<T>>[];
    searchTextPlaceholder?: string
    isDark?: boolean,
}




const unitHeight = 30;
const maxItem = 15;
const halfHeight = (30 * maxItem) / 2;

/**
 * 時間選擇器
 * @param className
 * @param style
 * @param options
 * @param onChange 選擇視窗當項目異動時
 * @param value Input Value
 * @param searchTextPlaceholder
 * @param isVisibleSearchText
 * @param isDark 暗黑模式
 */
const Dropdown = <T extends unknown>({
    className,
    style,
    options,
    value,
    onChange,
    onClick,
    searchTextPlaceholder = 'type keyword...',
    isSearchEnable = false,
    isCheckedEnable = true,
    isAvatarEnable = false,
    isDark = false,
}: IProps<T>) => {
    const [keyword, setKeyword] = useState<string>('');
    const textRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [focusValue, setFocusValue] = useState<TOfNull<T>>();
    
    // console.log('focusValue', focusValue);

    /**
     * 開啟自動 focus 再輸入框(好像重複了)
     */
    // useEffect(() => {
    //     if(isSearchEnable && textRef?.current !== null){
    //         textRef.current.focus();
    //     }
    //
    //     if(listRef.current && !isEmpty(value)){
    //
    //         const activeIndex = options?.findIndex(row => {
    //             if(isGroupOptions(row)){
    //                 return row.children.findIndex(child => {
    //                     return child.value === value;
    //                 });
    //             }else{
    //                 return row.value === value;
    //             }
    //         }) ?? -1;
    //
    //         if(activeIndex >= 0){
    //             listRef.current?.scrollTo({top: (activeIndex * unitHeight) - (halfHeight)});
    //         }
    //     }
    //
    // }, []);
    
    
    useEffect(() => {
        if(value){
            // 預設Focus為選中項目
            setFocusValue(value);
        }
    }, [value]);


    useEffect(() => {
        // 移動到Focus位置
        startTransition(() => {
            if (focusValue && listRef.current) {
                let i: number = null;
                let isGroup = false;
                const groupIndex = options.findIndex((row, gIndex) => {
                    if(isGroupOptions(row)){
                        isGroup = true;
                        const optionIndex = row.children.findIndex((childRow, childIndex) => {
                            const isActive = childRow.value === focusValue;
                            // console.log('childRow.value === value', childRow.value, focusValue, childRow.value === focusValue);
                            if(isActive){
                                i = childIndex;
                                return true;
                            }
                            return false;
                        });
                        return optionIndex >= 0;
                    }
                    return false;
                });

                // const i = options.findIndex(row => {
                //     if(isGroupOptions(row)){
                //         return row.children.findIndex(child => {
                //             return child.value === value;
                //         });
                //     }else{
                //         return row.value === value;
                //     }

                // });

                if(isGroup){
                    const selectedElement = listRef.current.childNodes[groupIndex] as HTMLElement;
                    if (selectedElement) {
                        const selectedChildElement = selectedElement.getElementsByTagName('ul')[0]
                            .childNodes[i] as HTMLElement;
                        if(selectedChildElement){
                            selectedChildElement.scrollIntoView({behavior: 'auto', block: 'nearest'});
                        }
                    }
                }else{
                    const selectedElement = listRef.current.childNodes[i] as HTMLElement;
                    if (selectedElement) {
                        selectedElement.scrollIntoView({behavior: 'auto', block: 'nearest'});
                    }
                }

            }
        });
        
    }, [focusValue]);


    /**
     * 設定搜尋關鍵字
     */
    const handleSetKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setKeyword(e.target.value);
        });
    }, []);


    /**
     * 設定選中資料
     */
    const handleSetValue = useCallback(() => {
        startTransition(() => {
            handleOnClick(focusValue);
        });
    }, [focusValue]);


    /**
     * 處理上下移動
     */
    const handleMove = useCallback((direction: 'up'|'down') => {
        return () => {
            startTransition(() => {
                // 先找到目前的項目位置
                let i: number = null;
                const groupIndex = options.findIndex((row, gIndex) => {
                    if(isGroupOptions(row)){
                        const optionIndex = row.children.findIndex((childRow, childIndex) => {
                            const isActive = childRow.value === focusValue;
                            // console.log('childRow.value === value', childRow.value, focusValue, childRow.value === focusValue);
                            if(isActive){
                                i = childIndex;
                                return true;
                            }
                            return false;
                        });
                        return optionIndex >= 0;
                    }
                    return false;
                });


                // 設定新的位置
                setFocusValue(curr => {
                    if(groupIndex >= 0){
                        const option = options[groupIndex];
                        if(isGroupOptions(option)){
                            // console.log('option.children', groupIndex, option.children);
                            const lastIndex = option.children.length - 1;
                            if(direction === 'up' && i === 0 ){
                                const upOptions = options[groupIndex -1];
                                if(upOptions && isGroupOptions(upOptions)){
                                    const newLastIndex = upOptions.children.length - 1;
                                    const x = upOptions.children[newLastIndex];
                                    return x.value;
                                }
                                return curr;

                            }else if(direction === 'down' && i === lastIndex){
                                const downOptions = options[groupIndex +1];
                                if(downOptions && isGroupOptions(downOptions)){
                                    const newLastIndex = 0;
                                    console.log('newLastIndex', newLastIndex);
                                    const x = downOptions.children[newLastIndex];
                                    return x.value;
                                }
                                return curr;
                            }
                            const childOption = option.children[direction === 'up' ? i-1 : i+1];
                            return childOption?.value;
                        }
                    }
                    //
                    // console.log('groupIndex', groupIndex);
                    // if(groupIndex !== null){
                    //     const option = options[direction === 'up' ? groupIndex-1 : groupIndex+1];
                    //     if(isGroupOptions(option)){
                    //         const childOption = option.children[direction === 'up' ? i-1 : i+1];
                    //         return childOption.value;
                    //     }else{
                    //         return option.value;
                    //     }
                    // }
                    // console.log('option', option);
                    // if(option){
                    //     if(isGroupOptions(option)){
                    //         return option.children[groupIndex].value;
                    //     }else{
                    //         return option.value;
                    //     }
                    // }

                    return curr;
                });

            });
        };
    }, [focusValue, options]);


    /**
     * 處理點擊項目
     */
    const handleOnClick = useCallback((newValue: TOfNull<T>) => {
        if (onChange && value !== newValue) {
            onChange(newValue);
        }
        if(onClick) {
            onClick(newValue);
        }

    }, [onChange, onClick, value]);





    /**
     * 渲染子層 (兩種顯示方式子層顯示方式相同)
     * @param row
     */
    const renderOptionsButton = (row: IDropdownOption<TOfNull<T>>) => {

        const isActive = value === row.value;
        const isFocus = focusValue === row.value;

        return <li
            role="option"
            className={cx(elClassNames.listItem, {[elClassNames.listItemActive]: isActive})}
            key={`option-${row.value}`}
            onClick={() => handleOnClick(row.value)}
            aria-selected={isFocus ? true: undefined}
            onMouseOver={() => setFocusValue(row.value)}
        >
            {isCheckedEnable && <div className={elClassNames.listItemChecked}>
                {isActive && <CheckIcon/>}
            </div>
            }
            {isAvatarEnable && <div className={elClassNames.listItemAvatar} style={getOptionStyle({avatarUrl: row.avatarUrl, color: row.color})}/>}
            <div className={cx(elClassNames.listItemText, {[elClassNames.listItemTextPlaceholder]: row.value === ''})}>{row.text}</div>
        </li>;
    };

    /**
     * 產生選單
     */
    const renderOptions = useCallback((keyword: string) => {
        const formatOption = options
            ?.filter(row => {
                if(isGroupOptions(row)){
                    return filterOptions(row.children.map(child => child), keyword).length > 0;
                }
                return filterOptions([row], keyword).length > 0;
            })
            .map((row) => {
                if(isGroupOptions(row)){
                    return <li key={`group_${row.groupName}`} role="group">
                        <strong className={elClassNames.listGroupName}>{row.groupName}</strong>
                        <ul className={elClassNames.listGroupChildren} role="none">
                            {
                                filterOptions(row.children, keyword)
                                    .map(row => renderOptionsButton(row)
                                    )}
                        </ul>
                    </li>;
                }

                return renderOptionsButton(row);
            });


        if(formatOption && formatOption.length > 0){
            return formatOption;
        }

        return (<div
            key="no-data"
            className={elClassNames.listItem}
            onClick={() => handleOnClick(null)}
        >
            <div className={elClassNames.listItemText}>No data</div>
        </div>);


    }, [options, value, focusValue]);



    return (
        <div className={cx(elClassNames.root, className, {'dark-theme': isDark})} style={style}>
            {isSearchEnable &&
                <input className={elClassNames.textField}
                    type="text"
                    value={keyword}
                    onChange={handleSetKeyword}
                    placeholder={searchTextPlaceholder}
                />
            }

            {/* Options */}
            <ul className={elClassNames.list} ref={listRef} role="listbox">
                {renderOptions(keyword)}
            </ul>

            <HotKey hotKey="enter" fn={handleSetValue}/>
            <HotKey hotKey="up" fn={handleMove('up')}/>
            <HotKey hotKey="down" fn={handleMove('down')}/>
        </div>

    );
};

export default Dropdown;


