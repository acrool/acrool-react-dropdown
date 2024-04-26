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
import {clsx} from 'clsx';
import {
    getOptionStyle,
    getIndex,
    scrollIntoViewByGroup,
    getNextIndexValue,
    getPrevIndexValue,
    getFirstIndexValue,
    filterOptions, isEmpty, removeByIndex,
} from './utils';

import './styles.css';
import {CheckIcon} from './Icon';
import {IDropdownOption, TOfNull, TOption} from './types';
import {isGroupOptions} from './utils';
import useLocale from './locales';




interface IProps<T> {
    className?: string
    style?: CSS.Properties
    locale?: string
    onClick?: (value: TOfNull<TOfNull<T>[]>) => void
    onEnter?: (value: TOfNull<TOfNull<T>[]>) => void

    onSearchFieldBlur?: (e?: FocusEvent) => void
    onSearchFieldFocus?: (e?: FocusEvent) => void
    onSearchFieldEsc?: (e?: React.KeyboardEvent) => void
    isSearchEnable?: boolean
    isAutoFocusSearchField?: boolean
    isCheckedEnable?: boolean
    isAvatarEnable?: boolean
    value?: TOfNull<T[]> // Array<number,string> 或 null
    options?: Array<TOption<TOfNull<T>>>
    searchTextPlaceholder?: string
    isDark?: boolean
    searchForwardedRef?: ForwardedRef<HTMLInputElement>
}





/**
 * 時間選擇器
 * @param className
 * @param style
 * @param options
 * @param onChange 選擇視窗當項目異動時
 * @param value Input Value
 * @param searchTextPlaceholder
 * @param isDark 暗黑模式
 */
const DropdownMulti = <T extends unknown>({
    className,
    style,
    locale = 'en-US',
    options,
    value,
    onClick,
    onEnter,
    onSearchFieldBlur,
    onSearchFieldFocus,
    onSearchFieldEsc,
    searchTextPlaceholder = 'type keyword...',
    isSearchEnable = false,
    isAutoFocusSearchField = true,
    isCheckedEnable = true,
    isAvatarEnable = false,
    isDark = false,
    searchForwardedRef,
}: IProps<T>) => {
    const {i18n} = useLocale(locale);
    const [keyword, setKeyword] = useState<string>('');
    const listRef = useRef<HTMLUListElement>(null);
    const [focusValue, setFocusValue] = useState<TOfNull<T>>(!isEmpty(value) && value.length > 0 ? value[0]: null);
    const [isComposing, setIsComposing] = useState(false);


    const filteredOptions = useMemo(() => filterOptions(options, keyword), [JSON.stringify(options), keyword]);



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
     * 清空搜尋關鍵字
     */
    const handleOnSearchInputKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isComposing) {
            e.preventDefault();
            e.stopPropagation();
            handleOnEnter(focusValue);
            return;
        }
        if(e.key === 'ArrowUp' && !isComposing){
            e.preventDefault();
            e.stopPropagation();
            handleMove('up')();
            return;
        }
        if(e.key === 'ArrowDown' && !isComposing){
            e.preventDefault();
            e.stopPropagation();
            handleMove('down')();
            return;
        }
        if (e.key === 'Escape' && !isComposing) {
            e.preventDefault();
            e.stopPropagation();

            if(isEmpty(keyword)){
                onSearchFieldEsc && onSearchFieldEsc();
                return;
            }else{
                setKeyword('');
                return;
            }
        }

        if(!isSearchEnable && !e.metaKey && e.key !== 'Tab'){
            e.preventDefault();
            e.stopPropagation();
            return;
        }

    }, [isComposing, keyword, focusValue, isSearchEnable]);


    



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
    const handleOnEnter = useCallback((newValue: TOfNull<T>) => {
        const index = value?.findIndex(rowVal => rowVal === newValue) ?? -1;
        let formatValues: TOfNull<T>[]|null = null;
        const convertValue = value ?? [];
        if(index >= 0){
            formatValues = removeByIndex(convertValue, index);
        }else{
            formatValues = [...convertValue, newValue];
        }
        if(formatValues?.length === 0){
            formatValues = null;
        }

        // 異動才觸發 onChange
        if(JSON.stringify(formatValues) !== JSON.stringify(value)){
            onEnter && onEnter(formatValues);
        }
        
    }, [onEnter, JSON.stringify(value)]);


    /**
     * 處理點擊項目
     */
    const handleOnClick = useCallback((e: React.MouseEvent, newValue: TOfNull<T>) => {
        e.stopPropagation();
        e.preventDefault();

        const index = value?.findIndex(rowVal => rowVal === newValue) ?? -1;
        let formatValues: TOfNull<T>[]|null = null;
        const convertValue = value ?? [];
        if(index >= 0){
            formatValues = removeByIndex(convertValue, index);
        }else{
            formatValues = [...convertValue, newValue];
        }
        if(formatValues?.length === 0){
            formatValues = null;
        }

        // 異動才觸發 onChange
        if(JSON.stringify(formatValues) !== JSON.stringify(value)){
            onClick(formatValues);
        }

    }, [onClick, value]);


    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
    };


    /**
     * 渲染子層 (兩種顯示方式子層顯示方式相同)
     * @param row
     */
    const renderOptionsButton = (row: IDropdownOption<TOfNull<T>>) => {

        const isActive = value?.includes(row.value) ?? false;
        const isFocus = focusValue === row.value;

        return <li
            role="option"
            className={clsx(elClassNames.listItem, {[elClassNames.listItemActive]: isActive})}
            key={`option-${row.value}`}
            onMouseDown={(e) => handleOnClick(e, row.value)}
            aria-selected={isFocus ? true: undefined}
            onMouseOver={() => setFocusValue(row.value)}
        >
            {isCheckedEnable && <div className={elClassNames.listItemChecked}>
                {isActive && <CheckIcon/>}
            </div>
            }
            {isAvatarEnable && <div className={elClassNames.listItemAvatar} style={getOptionStyle({avatarUrl: row.avatarUrl, color: row.color})}/>}
            <div className={clsx(elClassNames.listItemText, {[elClassNames.listItemTextPlaceholder]: row.value === ''})}>{row.text}</div>
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
                onClick={(e) => handleOnClick(e,null)}
            >
                <div className={clsx(elClassNames.listItemText, elClassNames.listItemTextNoData)}>{i18n('com.dropdown.noData', {def: 'No data'})}</div>
            </div>);

        }

        return elOptions;

    }, [filteredOptions, value, focusValue]);



    return (
        <div className={clsx(elClassNames.root, className, {'dark-theme': isDark})} style={style}>
            {/*搜尋框*/}
            <input className={clsx(elClassNames.textField, {[elClassNames.textFieldHidden]: !isSearchEnable})}
                type="text"
                // ref={setForwardedRef(ref, searchFieldRef)}
                ref={searchForwardedRef}
                value={keyword}
                onChange={handleSetKeyword}
                placeholder={searchTextPlaceholder}
                tabIndex={-1}
                onBlur={onSearchFieldBlur}
                onFocus={onSearchFieldFocus}
                onKeyDown={handleOnSearchInputKeyDown}
                autoFocus={isAutoFocusSearchField}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
            />

            {/* Options */}
            <ul className={elClassNames.list} ref={listRef} role="listbox">
                {renderOptions()}
            </ul>

        </div>

    );
};

export default DropdownMulti;


