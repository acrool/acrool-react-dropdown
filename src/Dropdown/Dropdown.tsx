import React, {useState, useRef, useEffect, useCallback, RefObject, startTransition, useMemo} from 'react';
import dayjs from 'dayjs';
import CSS from 'csstype';
import elClassNames from './el-class-names';
import cx from 'classnames';
import {isEmpty} from 'bear-jsutils/equal';
import {getTimeList, getTimeFormat} from '../utils';
import translateI18n from '../locales';

import './styles.css';


interface IDropdownOption  {
    value: string;
    text: string;
    avatarUrl?: string,
}


interface IProps {
    className?: string;
    style?: CSS.Properties;
    // value?: string;
    onChange?: (value: string) => void;
    onClickOk?: () => void;
    locale?: string,
    isVisibleSearchText?: boolean,
    value?: string|number;
    options?: IDropdownOption[];
    searchTextPlaceholder?: string


    isDark?: boolean,
}

const {hourList, minuteList, secondList} = getTimeList();

const unitHeight = 32;
const halfHeight = (32 * 6) / 2;







/**
 * 時間選擇器
 * @param className
 * @param style
 * @param onChange 選擇視窗當項目異動時
 * @param onClickOk 選擇視窗按下OK時
 * @param value Input Value
 * @param locale
 * @param isDark 暗黑模式
 */
const Dropdown = ({
    className,
    style,
    options = [{text: '', value: '', avatarUrl: ''}],
    value='',
    onChange,
    searchTextPlaceholder = 'type keyword...',
    isVisibleSearchText = false,
    isDark = false,
}: IProps) => {
    const [keyword, setKeyword] = useState<string>('');
    const textRef = useRef<HTMLInputElement>(null);

    /**
     * 開啟自動 focus 再輸入框
     */
    useEffect(() => {
        if(isVisibleSearchText && textRef?.current !== null){
            textRef.current.focus();
        }

    }, []);


    const handleSetKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setKeyword(e.target.value);
        });
    }, []);

    /**
     * 處理控制 Picker顯示隱藏
     */
    // const handleVisiblePanel = useCallback((isVisible = false) => {
    //     setIsVisiblePanel(isVisible);
    //
    //     setTimeout(() => {
    //         if(isVisible){
    //             document.addEventListener('click', handleClickOutSite);
    //         }else{
    //             document.removeEventListener('click', handleClickOutSite);
    //         }
    //     }, 0);
    //
    //
    // }, []);



    /**
     * 處理點擊遮罩
     */
        // const handleClickOutSite = useCallback((evt: MouseEvent) => {
        //     if (menuRef && menuRef.current && menuRef.current.contains(evt.target as Node)) return;
        //
        //     handleVisiblePanel(false);
        // }, [menuRef]);
        //
        //
    const handleOnClick = useCallback((value: string) => {
            if (onChange) {
                onChange(value);
            }
            // setIsVisiblePanel(false);


        }, [onChange, value]);

    const renderOptions = useCallback((keyword: string) => {
        return options
            .filter(row => {
                if(keyword?.length > 0){
                    return row.text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                }
                return true;
            })
            .map((row) => {
                return (
                    <button
                        type="button"
                        className={elClassNames.dropdownItem}
                        key={`option-${row.value}`}
                        onClick={() => handleOnClick(String(row.value))}
                >
                    {/*{row.avatarUrl && <OptionAvatar image={row.avatarUrl} size={26}/>}*/}
                    <div className={elClassNames.dropdownText}>{row.text}</div>
                </button>);
            });
    }, [options]);



    return (
        <div className={cx(elClassNames.root, className, {'dark-theme': isDark})} style={style}>
            <input className={elClassNames.textField}
                  type="text"
                  value={keyword}
                  onChange={handleSetKeyword}
                  placeholder={searchTextPlaceholder}
            />

            <div className={elClassNames.dropdownList}>
                {renderOptions(keyword)}
            </div>
        </div>

    );
};

export default Dropdown;

