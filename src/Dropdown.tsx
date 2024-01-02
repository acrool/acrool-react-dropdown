import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    startTransition,
    useMemo,
    ForwardedRef,
    ChangeEvent, FocusEvent
} from 'react';
import CSS from 'csstype';
import elClassNames from './el-class-names';
import cx from 'clsx';
import {
    getOptionStyle,
    getIndex,
    scrollIntoViewByGroup,
    getNextIndexValue,
    getPrevIndexValue,
    getFirstIndexValue,
    filterOptions2, isEmpty,
} from './utils';

import './styles.css';
import {CheckIcon} from './Icon';
import {IDropdownOption, TOfNull, TOption} from './types';
import {filterOptions, isGroupOptions} from './utils';
import HotKey from './HotKey';
import {setForwardedRef, forwardRefOfGenerics} from './copyRef';


interface IProps<T> {
    className?: string
    style?: CSS.Properties

    onChange?: (value: TOfNull<T>) => void
    onClick?: (value: TOfNull<T>) => void
    onSearchFieldBlur?: (e?: FocusEvent) => void
    onSearchFieldFocus?: (e?: FocusEvent) => void
    onSearchFieldEsc?: (e?: React.KeyboardEvent) => void
    isSearchEnable?: boolean
    isAutoFocusSearchField?: boolean
    isCheckedEnable?: boolean
    isAvatarEnable?: boolean
    value?: TOfNull<T>
    options?: Array<TOption<TOfNull<T>>>
    // options?: IDropdownOption<TOfNull<T>>[] | IDropdownGroupOption<TOfNull<T>>[];
    searchTextPlaceholder?: string
    isDark?: boolean
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
 * @param ref
 */
const Dropdown = <T extends unknown>({
    className,
    style,
    options,
    value,
    onChange,
    onClick,
    onSearchFieldBlur,
    onSearchFieldFocus,
    onSearchFieldEsc,
    searchTextPlaceholder = 'type keyword...',
    isSearchEnable = false,
    isAutoFocusSearchField = true,
    isCheckedEnable = true,
    isAvatarEnable = false,
    isDark = false,
}: IProps<T>, ref?: ForwardedRef<HTMLInputElement>) => {
    const [keyword, setKeyword] = useState<string>('');
    const searchFieldRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [focusValue, setFocusValue] = useState<TOfNull<T>>(null);


    const filteredOptions = useMemo(() => filterOptions2(options, keyword), [JSON.stringify(options), keyword]);


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
        if(typeof value !== 'undefined'){
            // 預設Focus為選中項目
            setFocusValue(value);
        }
    }, [value]);


    useEffect(() => {
        // 移動到Focus位置
        startTransition(() => {
            if (typeof focusValue !== 'undefined' && listRef.current) {
                const {groupIndex, itemIndex} = getIndex(filteredOptions, focusValue);

                if(groupIndex >= 0){
                    scrollIntoViewByGroup(listRef.current, groupIndex, itemIndex);
                }

            }
        });
        
    }, [focusValue, filteredOptions]);


    /**
     * 設定搜尋關鍵字
     */
    const handleSetKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
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
     * 清空搜尋關鍵字
     */
    const handleOnSearchInputKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            return;
        }
        if (e.key === 'Escape') {
            e.stopPropagation();
            e.preventDefault();
            if(isEmpty(keyword)){
                onSearchFieldEsc();
                return;
            }else{
                setKeyword('');
                return;
            }
        }

    }, [keyword]);


    



    /**
     * 處理上下移動
     */
    const handleMove = useCallback((direction: 'up'|'down') => {
        return () => {
            startTransition(() => {
                // 設定新的位置
                setFocusValue(curr => {
                    const {groupIndex, itemIndex} = getIndex(filteredOptions, curr);


                    if(itemIndex >= 0){
                        // 群組Options
                        if(direction === 'up'){
                            return getPrevIndexValue(filteredOptions, groupIndex, itemIndex);
                        }else if(direction === 'down'){
                            return getNextIndexValue(filteredOptions, groupIndex, itemIndex);
                        }
                    }

                    return getFirstIndexValue(filteredOptions);
                });

            });
        };
    }, [focusValue, filteredOptions]);


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
            onMouseDown={() => handleOnClick(row.value)}
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
     * 產生選單列表
     */
    const renderOptions = useCallback(() => {

        const elOptions = filteredOptions
            ?.map(option => {
                if(isGroupOptions(option)) {
                    return <li key={`group_${option.groupName}`} role="group">
                        <strong className={elClassNames.listGroupName}>{option.groupName}</strong>
                        <ul className={elClassNames.listGroupChildren} role="none">
                            {
                                option.children
                                    .map(row => renderOptionsButton(row))
                            }
                        </ul>
                    </li>;
                }

                return renderOptionsButton(option);

            });



        if(!elOptions || elOptions?.length === 0){
            // 無資料回傳
            return (<div
                key="no-data"
                className={elClassNames.listItem}
                onMouseDown={() => handleOnClick(null)}
            >
                <div className={cx(elClassNames.listItemText, elClassNames.listItemTextNoData)}>No data</div>
            </div>);

        }

        return elOptions;

    }, [filteredOptions, value, focusValue]);



    return (
        <div className={cx(elClassNames.root, className, {'dark-theme': isDark})} style={style}>
            {isSearchEnable &&
                // 搜尋框
                <input className={elClassNames.textField}
                    type="text"
                    ref={setForwardedRef(ref, searchFieldRef)}
                    value={keyword}
                    onChange={handleSetKeyword}
                    placeholder={searchTextPlaceholder}
                    tabIndex={-1}
                    onBlur={onSearchFieldBlur}
                    onFocus={onSearchFieldFocus}
                    onKeyDown={handleOnSearchInputKeyDown}
                    autoFocus={isAutoFocusSearchField}
                />
            }

            {/* Options */}
            <ul className={elClassNames.list} ref={listRef} role="listbox">
                {renderOptions()}
            </ul>

            <HotKey hotKey="enter" fn={handleSetValue} enableOnTags={['INPUT']}/>
            <HotKey hotKey="space" fn={handleSetValue}/>
            <HotKey hotKey="up" fn={handleMove('up')} enableOnTags={['INPUT']}/>
            <HotKey hotKey="down" fn={handleMove('down')} enableOnTags={['INPUT']}/>
        </div>

    );
};

export default forwardRefOfGenerics(Dropdown);


