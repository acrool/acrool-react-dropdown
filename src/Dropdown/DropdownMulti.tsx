import React, {useState, useRef, useEffect, useCallback, RefObject, startTransition, useMemo} from 'react';
import CSS from 'csstype';
import elClassNames from './el-class-names';
import cx from 'classnames';
import {isNotEmpty} from 'bear-jsutils/equal';
import {removeByIndex} from 'bear-jsutils/array';

import './styles.css';
import {CheckIcon} from './Icon';
import {IDropdownOption, TOption, TOfNull} from './types';
import {filterOptions, isGroupOptions} from './utils';




interface IProps<T> {
    className?: string;
    style?: CSS.Properties;

    onChange?: (value: TOfNull<TOfNull<T>[]>) => void;
    isSearchEnable?: boolean,
    isCheckedEnable?: boolean,
    isAvatarEnable?: boolean,
    value?: TOfNull<TOfNull<T>[]>; // Array<number,string> 或 null
    options?: TOption<TOfNull<T>>[]; // Array<number,string, null> 或 undefined
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
const DropdownMulti = <T extends unknown>({
    className,
    style,
    options,
    value,
    onChange,
    searchTextPlaceholder = 'type keyword...',
    isSearchEnable = false,
    isCheckedEnable = true,
    isAvatarEnable = false,
    isDark = false,
}: IProps<T>) => {
    const [keyword, setKeyword] = useState<string>('');
    const textRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    /**
     * 開啟自動 focus 再輸入框
     */
    useEffect(() => {
        if(isSearchEnable && textRef?.current !== null){
            textRef.current.focus();
        }

        if(listRef.current && isNotEmpty(value)){
            const activeIndex = options?.findIndex(row => {
                if(isGroupOptions(row)){
                    return row.children.findIndex(child => {
                        return String(child.value) === String(value);
                    });
                }else{
                    return String(row.value) === String(value);
                }
            }) ?? -1;

            if(activeIndex >= 0){
                listRef.current?.scrollTo({top: (activeIndex * unitHeight) - (halfHeight)});
            }
        }

    }, []);


    const handleSetKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setKeyword(e.target.value);
        });
    }, []);


    /**
     * 處理點擊項目
     */
    const handleOnClick = (newValue: TOfNull<T>) => {
        if (onChange) {
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
                onChange(formatValues);
            }
        }
    };


    /**
     * 渲染子層 (兩種顯示方式子層顯示方式相同)
     * @param row
     */
    const renderOptionsButton = (row: IDropdownOption<TOfNull<T>>) => {

        const isActive = value?.includes(row.value) ?? false;

        return <button
            type="button"
            className={cx(elClassNames.listItem, {[elClassNames.listItemActive]: isActive})}
            key={`option-${row.value}`}
            onClick={() => handleOnClick(row.value)}
        >
            {isCheckedEnable && <div className={elClassNames.listItemChecked}>
                {isActive && <CheckIcon/>}
            </div>}

            {isAvatarEnable && <div className={elClassNames.listItemAvatar} style={row.avatarUrl ? {backgroundImage: `url(${row.avatarUrl})`}: {}}/>}
            <div className={cx(elClassNames.listItemText, {[elClassNames.listItemTextPlaceholder]: row.value === ''})}>{row.text}</div>
        </button>;
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

                    return <div key={`group_${row.groupName}`}>
                        <div className={elClassNames.listGroupName}>{row.groupName}</div>
                        <div className={elClassNames.listGroupChildren}>
                            {
                                filterOptions(row.children, keyword)
                                    .map(row => renderOptionsButton(row))
                            }
                        </div>
                    </div>;
                }

                return renderOptionsButton(row);
            });


        if(formatOption && formatOption.length > 0){
            return formatOption;
        }

        return (<div
            key="no-data"
            className={elClassNames.listItem}
            onClick={() => {}}
        >
            <div className={elClassNames.listItemText}>No data</div>
        </div>);


    }, [options]);



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

            <div className={elClassNames.list} ref={listRef}>
                {renderOptions(keyword)}
            </div>
        </div>

    );
};

export default DropdownMulti;

