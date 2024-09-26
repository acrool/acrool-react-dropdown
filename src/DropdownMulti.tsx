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
import {clsx} from 'clsx';
import {
    getOptionStyle,
    getIndex,
    scrollIntoViewByGroup,
    getNextIndexValue,
    getPrevIndexValue,
    getFirstIndexValue,
    filterOptions, isEmpty, removeByIndex, checkIsMobile,
} from './utils';

import styles from './dropdown.module.scss';
import {CheckIcon} from './Icon';
import {IDropdownOption, TOption} from './types';
import {isGroupOptions} from './utils';
import useLocale from './locales';
import {EKeyboardKey, HotkeyListener} from '@acrool/react-hotkey';




interface IProps<T> {
    className?: string
    style?: CSS.Properties
    locale?: string
    onClick?: (value: T[], isDiff: boolean) => void
    onEnter?: (value: T[], isDiff: boolean) => void

    onSearchFieldBlur?: (e?: FocusEvent) => void
    onSearchFieldFocus?: (e?: FocusEvent) => void
    isSearchEnable?: boolean
    isCheckedEnable?: boolean
    isAvatarEnable?: boolean
    value?: T[] // Array<number,string> 或 null
    options?: Array<TOption<T>>
    searchTextPlaceholder?: string
    isDark?: boolean
    isReverse?: boolean
    searchForwardedRef?: ForwardedRef<HTMLInputElement>
}





/**
 * 多選下拉選擇器
 * @param className
 * @param style
 * @param options
 * @param onChange 選擇視窗當項目異動時
 * @param value Input Value
 * @param searchTextPlaceholder
 * @param isReverse 上下反向模式
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
    searchTextPlaceholder = 'type keyword...',
    isSearchEnable = false,
    isCheckedEnable = true,
    isAvatarEnable = false,
    isDark = false,
    isReverse = false,
    searchForwardedRef,
}: IProps<T>) => {
    const {i18n} = useLocale(locale);
    const [keyword, setKeyword] = useState<string>('');
    const listRef = useRef<HTMLUListElement>(null);

    const defaultValue = value && value.length > 0 ? value[0]: undefined;

    const [focusValue, setFocusValue] = useState<T|undefined>(defaultValue);
    const [isComposing, setIsComposing] = useState(false);


    const t = !isEmpty(value);
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


    const _handleOnEnter = () => {
        if (!isComposing) {
            if(focusValue){
                handleOnEnter(focusValue);
            }
            return;
        }
    };

    /**
     * 清除
     */
    const handleOnClean = () => {
        if(!isComposing && !isEmpty(keyword)) {
            setKeyword('');
        }
    };

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
    const handleOnEnter = useCallback((newValue: T) => {
        const index = value?.findIndex(rowVal => rowVal === newValue) ?? -1;
        let formatValues: T[] = [];
        const convertValue = value ?? [];
        if(index >= 0){
            formatValues = removeByIndex(convertValue, index);
        }else{
            formatValues = [...convertValue, newValue];
        }


        const isDiff = JSON.stringify(formatValues) !== JSON.stringify(value);
        if(onEnter){
            onEnter(formatValues, isDiff);
        }

    }, [onEnter, JSON.stringify(value)]);


    /**
     * 處理點擊項目
     */
    const handleOnClick = useCallback((e: React.MouseEvent, newValue?: T) => {
        e.stopPropagation();
        e.preventDefault();

        const index = value?.findIndex(rowVal => rowVal === newValue) ?? -1;
        let formatValues: T[] = [];
        const convertValue = value ?? [];
        if(index >= 0){
            formatValues = removeByIndex(convertValue, index);
        }else if(typeof newValue !== 'undefined'){
            formatValues = [...convertValue, newValue];
        }

        const isDiff = JSON.stringify(formatValues) !== JSON.stringify(value);
        if(onClick){
            onClick(formatValues, isDiff);
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
    const renderOptionsButton = (row: IDropdownOption<T>) => {

        const isActive = value?.includes(row.value) ?? false;
        const isFocus = focusValue === row.value;

        return <li
            role="option"
            className={clsx(styles.listItem, {[styles.listItemActive]: isActive})}
            key={`option-${row.value}`}
            onMouseDown={(e) => handleOnClick(e, row.value)}
            aria-selected={isFocus ? true: undefined}
            onMouseOver={() => setFocusValue(row.value)}
        >
            {isCheckedEnable && <div className={styles.listItemChecked}>
                {isActive && <CheckIcon/>}
            </div>
            }
            {isAvatarEnable && <div className={styles.listItemAvatar} style={getOptionStyle({avatarUrl: row.avatarUrl, color: row.color})}/>}
            <div className={clsx(styles.listItemText, {[styles.listItemTextPlaceholder]: row.value === ''})}>{row.text}</div>
        </li>;
    };

    /**
     * 產生選單列表
     */
    const renderOptions = useCallback(() => {

        const elOptions = filteredOptions
            ?.filter(option => isGroupOptions(option) ? !isEmpty(option.children): true)
            .map(option => {
                if(isGroupOptions(option)) {
                    return <li key={`group_${option.groupName}`} role="group">
                        <strong className={styles.listGroupName}>{option.groupName}</strong>
                        <ul className={styles.listGroupChildren} role="none">
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
                className={styles.listItem}
                onClick={(e) => handleOnClick(e,)}
            >
                <div className={clsx(styles.listItemText, styles.listItemTextNoData)}>{i18n('com.dropdown.noData', {def: 'No data'})}</div>
            </div>);

        }

        return elOptions;

    }, [filteredOptions, value, focusValue]);



    return (
        <div className={clsx(styles.root, className, {[styles.darkTheme]: isDark, [styles.reverse]: isReverse})} style={style}>
            {/*搜尋框*/}
            <input className={clsx(styles.textField, {[styles.textFieldHidden]: !isSearchEnable})}
                type="text"
                // ref={setForwardedRef(ref, searchFieldRef)}
                ref={searchForwardedRef}
                value={keyword}
                onChange={handleSetKeyword}
                placeholder={searchTextPlaceholder}
                tabIndex={-1}
                onBlur={onSearchFieldBlur}
                onFocus={onSearchFieldFocus}
                // onKeyDown={handleOnSearchInputKeyDown}
                autoFocus={!checkIsMobile()}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
            />

            {/* Options */}
            <ul className={styles.list} ref={listRef} role="listbox">
                {renderOptions()}
            </ul>

            <HotkeyListener hotKey={EKeyboardKey.Enter} onKeyDown={_handleOnEnter} ignoreFormField stopPropagation preventDefault/>
            <HotkeyListener hotKey={EKeyboardKey.ArrowUp} onKeyDown={handleMove(isReverse ? 'down': 'up')} ignoreFormField stopPropagation preventDefault/>
            <HotkeyListener hotKey={EKeyboardKey.ArrowDown} onKeyDown={handleMove(isReverse ? 'up' : 'down')} ignoreFormField stopPropagation preventDefault/>

            {isSearchEnable && <HotkeyListener hotKey="Escape" onKeyDown={handleOnClean} ignoreFormField stopPropagation/>}

        </div>

    );
};

export default DropdownMulti;


