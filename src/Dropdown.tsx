import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    startTransition,
    useMemo,
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
    filterOptions, isEmpty, checkIsMobile,
} from './utils';

import styles from './dropdown.module.scss';
import {CheckIcon} from './Icon';
import {IDropdownOption, TOption} from './types';
import {isGroupOptions} from './utils';
import useLocale from './locales';
import {EKeyboardKey} from './config';
import useComposition from './hooks/useComposition';




interface IProps<T> {
    className?: string
    style?: CSS.Properties
    locale?: string
    onClick?: (value: T, isDiff: boolean) => void
    onEnter?: (value: T, isDiff: boolean) => void
    onSearchFieldBlur?: (e?: FocusEvent) => void
    onSearchFieldFocus?: (e?: FocusEvent) => void
    isSearchEnable?: boolean
    isCheckedEnable?: boolean
    isAvatarEnable?: boolean
    value?: T
    options?: Array<TOption<T>>
    searchTextPlaceholder?: string
    isDark?: boolean
    isReverse?: boolean
}





/**
 * 下拉選擇器
 * @param className
 * @param style
 * @param options
 * @param onChange 選擇視窗當項目異動時
 * @param value Input Value
 * @param searchTextPlaceholder
 * @param isReverse 上下反向模式
 * @param isDark 暗黑模式
 */
const Dropdown = <T extends unknown>({
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
}: IProps<T>) => {
    const {i18n} = useLocale(locale);
    const [keyword, setKeyword] = useState<string>('');
    const listRef = useRef<HTMLUListElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const [focusValue, setFocusValue] = useState<T|undefined>(value);

    const {onCompositionFn, compositionStatusRef} = useComposition();

    const filteredOptions = useMemo(() => filterOptions(options, keyword), [JSON.stringify(options), keyword]);

    useEffect(() => {
        window.setTimeout(() => {
            if(searchRef.current){
                searchRef.current.focus();
                return;
            }
            if(rootRef.current){
                rootRef.current.focus();
                return;
            }
        }, 10);
    }, []);


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
     * 處理按鍵
     */
    const handleOnKeyDown = useCallback((e: React.KeyboardEvent) => {
        switch (e.key){
        case EKeyboardKey.Enter:
            handleOnEnter(focusValue, value)(e);
            break;

        case EKeyboardKey.ArrowUp:
            handleMove(isReverse ? 'down': 'up')(e);
            break;

        case EKeyboardKey.ArrowDown:
            handleMove(isReverse ? 'up' : 'down')(e);
            break;
        }
    }, [isReverse, focusValue, value, filteredOptions]);



    /**
     * 處理按下Enter
     */
    const handleOnEnter = useCallback((focusValue?: T, value?: T) => {

        return (e: React.KeyboardEvent) => {
            if(e.repeat) return;
            if(compositionStatusRef.current) return;

            e.stopPropagation();
            e.preventDefault();

            const isDiff = JSON.stringify(value) !== JSON.stringify(focusValue);
            if(onEnter && typeof focusValue !== 'undefined'){
                onEnter(focusValue, isDiff);
            }
        };

    }, []);


    /**
     * 清除
     */
    const handleOnClean = useCallback((e: React.KeyboardEvent) => {

        if(e.key === EKeyboardKey.Escape && !isEmpty(keyword)) {
            e.stopPropagation();
            setKeyword('');
        }
    }, [keyword]);



    /**
     * 處理上下移動
     */
    const handleMove = useCallback((direction: 'up'|'down') => {
        return (e: React.KeyboardEvent) => {
            e.stopPropagation();
            e.preventDefault();

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
    const handleOnClick = useCallback((newValue?: T) => {

        return (e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();

            const isDiff = JSON.stringify(value) !== JSON.stringify(newValue);
            if(onClick && typeof newValue !== 'undefined'){
                onClick(newValue, isDiff);
            }
        };


    }, [onClick, value]);




    /**
     * 渲染子層 (兩種顯示方式子層顯示方式相同)
     * @param row
     */
    const renderOptionsButton = (row: IDropdownOption<T>) => {

        const isActive = value === row.value;
        const isFocus = focusValue === row.value;

        return <li
            role="option"
            className={clsx(styles.listItem, {[styles.listItemActive]: isActive})}
            key={`option-${row.value}`}
            aria-selected={isFocus ? true: undefined}
            onMouseDown={handleOnClick(row.value)}
            onMouseOver={() => setFocusValue(row.value)}
        >
            {isCheckedEnable && <div className={styles.listItemChecked}>
                {isActive && <CheckIcon/>}
            </div>
            }
            {isAvatarEnable && <div className={styles.listItemAvatar} style={getOptionStyle({avatarUrl: row.avatarUrl, color: row.color})}/>}
            <div className={clsx(styles.listItemText, {[styles.listItemTextPlaceholder]: row.value === ''})}>{row.nodeText ?? row.text}</div>
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
                onClick={handleOnClick()}
            >
                <div className={clsx(styles.listItemText, styles.listItemTextNoData)}>{i18n('com.dropdown.noData', {def: 'No data'})}</div>
            </div>);

        }

        return elOptions;

    }, [filteredOptions, value, focusValue]);



    return (
        <div className={clsx(styles.root, className, {[styles.darkTheme]: isDark, [styles.reverse]: isReverse})}
            style={style}
            onKeyDown={handleOnKeyDown}
            tabIndex={0}
            ref={rootRef}
        >
            {/*搜尋框*/}
            {isSearchEnable &&
                <input className={styles.textField}
                    type="text"
                    ref={searchRef}
                    value={keyword}
                    onChange={handleSetKeyword}
                    placeholder={searchTextPlaceholder}
                    tabIndex={-1}
                    onBlur={onSearchFieldBlur}
                    onFocus={onSearchFieldFocus}
                    onKeyDown={handleOnClean}
                    autoFocus={!checkIsMobile()}
                    {...onCompositionFn()}
                />
            }

            {/* Options */}
            <ul className={styles.list} ref={listRef} role="listbox">
                {renderOptions()}
            </ul>


        </div>

    );
};

export default Dropdown;


