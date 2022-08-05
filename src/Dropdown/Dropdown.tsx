import React, {useState, useRef, useEffect, useCallback, RefObject, startTransition, useMemo} from 'react';
import CSS from 'csstype';
import elClassNames from './el-class-names';
import cx from 'classnames';
import {isNotEmpty} from 'bear-jsutils/equal';

import './styles.css';


interface IDropdownOption  {
    value: string;
    text: string;
    avatarUrl?: string,
}


interface IProps {
    className?: string;
    style?: CSS.Properties;

    onChange?: (value: string) => void;
    isSearchEnable?: boolean,
    value?: string|number;
    options?: IDropdownOption[];
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
const Dropdown = ({
    className,
    style,
    options = [],
    value,
    onChange,
    searchTextPlaceholder = 'type keyword...',
    isSearchEnable = false,
    isDark = false,
}: IProps) => {
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
            const activeIndex = options?.findIndex(row => String(row.value) === String(value));

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
    const handleOnClick = useCallback((value: string) => {
        if (onChange) {
            onChange(value);
        }

    }, [onChange]);


    /**
     * 產生選單
     */
    const renderOptions = useCallback((keyword: string, value?: string|number) => {
        const formatOption = options
            .filter(row => {
                if(keyword?.length > 0){
                    return row.text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                }
                return true;
            })
            .map((row) => {
                const isActive = value && String(value) === String(row.value);
                return (
                    <button
                        type="button"
                        className={cx(elClassNames.listItem, {[elClassNames.listItemActive]: isActive})}
                        key={`option-${row.value}`}
                        onClick={() => handleOnClick(String(row.value))}
                    >
                        {row.avatarUrl && <div className={elClassNames.listItemAvatar} style={{backgroundImage: `url(${row.avatarUrl})`}}/>}
                        <div className={elClassNames.listItemText}>{row.text}</div>
                    </button>);
            });


        if(formatOption.length > 0){
            return formatOption;
        }

        return (<div
            key="no-data"
            className={elClassNames.listItem}
            onClick={() => handleOnClick(String(''))}
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
                {renderOptions(keyword, value)}
            </div>
        </div>

    );
};

export default Dropdown;

