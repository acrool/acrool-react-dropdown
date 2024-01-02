import {isEmpty} from 'bear-jsutils/equal';
import {Dropdown, IDropdownOption, isGroupOptions, TOption, elClassNames} from 'bear-react-dropdown';
import React, {ForwardedRef, forwardRef, useCallback, useMemo, useState, useRef, useEffect} from 'react';
import styled, {css} from 'styled-components';

import Avatar from './_components/Avatar';
import ModalWrapper from './_components/ModalBgMask/ModalWrapper';
import Icon from '@/library/bear-react-icon';
import useClickOutSite from '@/utils/hooks/useClickOutSite';
import {setRef, setForwardedRef, forwardRefOfGenerics} from '@/utils/copyRef';
import {EKeyboardKey} from '@/config/keyboard';
import {Flex} from 'bear-react-grid';



export interface IProps<T> extends FCProps {
    title?: string
    name?: string
    value?: T|null
    options?: TOption<T>[]
    disabled?: boolean
    onChange?: (value: T) => void
    errorMessage?: string
    remarkMessage?: string
    placeholder?: string
    isSearchEnable?: boolean
    isAvatarEnable?: boolean
    isLink?: boolean
}



/**
 * 下拉選單元件
 *
 * @param style
 * @param className
 * @param title 標題
 * @param options 下拉選單項目
 * @param disabled 是否禁用
 * @param value
 * @param onChange
 * @param ref
 */
const Select2 = <T extends unknown>({
    style,
    className,
    options,
    disabled = false,
    value,
    onChange,
    placeholder,
    isSearchEnable = false,
    isAvatarEnable = false,
    isLink = false,
}: IProps<T>, ref?: ForwardedRef<HTMLButtonElement>) => {


    const searchFieldRef = useRef<HTMLInputElement>(null);
    const {mainElRef, getPosition} = useClickOutSite<HTMLButtonElement>();

    const [isButtonFocus, setIsButtonFocus] = useState(false);
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const [isVisible, setIsVisible] = useState(false);



    console.log('isSearchFocus', isSearchFocus, 'isButtonFocus', isButtonFocus, 'isVisible', isVisible, searchFieldRef);



    /**
     * 處理值改變
     */
    const handleOnChange = useCallback((currentValue: T) => {
        if(onChange){
            onChange(currentValue);
        }
        setIsVisible(false);

        console.log('xx');
        setTimeout(() => {
            mainElRef.current.focus();

        }, 0);

        // setTimeout(() => {
        // }, 0);
    }, [onChange]);


    /**
     * 處理當Dropdown項目點擊
     * @param currentValue
     */
    const handleOnDropdownLiClick = (currentValue: T) => {
        console.log('---[Dropdown] onClick');

        mainElRef.current.focus();
        setIsVisible(false);

        if(onChange){
            onChange(currentValue);
        }
    };


    /**
     * 處理當Dropdown按下鍵盤的Enter
     * @param currentValue
     */
    const handleOnDropdownLiEnter = (currentValue: T) => {
        console.log('---[Dropdown] onEnter');
        mainElRef.current.focus();
        setIsVisible(false);

        if(onChange){
            onChange(currentValue);
        }
    };


    const getText = useMemo(() => {
        let current: IDropdownOption<T>|undefined;
        options?.findIndex((row) => {
            if(row){
                if(isGroupOptions(row)){
                    current = row.children.find(row => row.value === value);
                    return typeof current !== 'undefined';
                }
                current = row.value === value ? row: undefined;
            }

            return typeof current !== 'undefined';
        });

        return current ?
            <Flex className="align-items-center">
                {isAvatarEnable && <Avatar color={current.color} image={current.avatarUrl} size={15} className="mr-1"/>}
                {current.text}
            </Flex>
            :placeholder;


    }, [value, options, placeholder]);


    /**
     * 處理開啟 Dropdown
     */
    const handleOpenDropdown = useCallback(() => {
        setIsVisible(true);
    }, []);


    /**
     * 處理開啟 Dropdown
     */
    const handleButtonFocus = useCallback(() => {
        console.log('---[button] focus');

        setIsButtonFocus(true);

    }, []);

    /**
     * 處理開啟 Dropdown
     */
    const handleSearchFocus = useCallback(() => {
        console.log('---[search] focus', isButtonFocus);

        // console.log('search focus');
        // setIsSearchFocus(true);

        // if(isButtonFocus === false){
        //     setIsVisible(false);
        // }
    }, [isButtonFocus]);

    /**
     * 處理開啟 Dropdown
     */
    const handleSearchBlur = useCallback(() => {
        console.log('---[search] blur', isButtonFocus);

        // console.log('[search blur]');
        // setIsSearchFocus(false);

        // if(isButtonFocus === false){
        //     mainElRef.current.focus();
        //     setIsButtonFocus(true);
        //     setIsVisible(false);
        // }
        setTimeout(() => {
            if (document.activeElement !== mainElRef.current) {
                // setIsSearchFocus(true);
                setIsVisible(false);
                setIsButtonFocus(false);
            }
        }, 0);

    }, [isButtonFocus]);

    /**
     * 處理開啟 Dropdown
     */
    const handleSearchEsc = useCallback(() => {
        // console.log('[search esc]');
        mainElRef.current.focus();
        setIsVisible(false);


    }, [isButtonFocus]);

    /**
     * 處理開啟 Dropdown
     */
    const handleButtonBlur = useCallback(() => {
        console.log('---[button] blur');
        // handleCloseDropdown(true)();
        //     if(document.activeElement.className === elClassNames.textField){

        // setIsButtonFocus(false);

        setTimeout(() => {
            console.log('---[button] blur', document.activeElement.className);
            if(document.activeElement !== searchFieldRef.current){
                // setIsSearchFocus(true);
                setIsVisible(false);
                setIsButtonFocus(false);
            }

        }, 0);

    }, []);

    /**
     * 處理關閉 Dropdown
     */
    const handleCloseDropdown = useCallback((ignoreInSearch?: boolean) => {
        return () => {
            // if(ignoreInSearch){
            // setTimeout(() => {
            //     console.log('document.activeElement.className', document.activeElement, document.activeElement.className !== elClassNames.textField);
            if(isButtonFocus){
                setIsVisible(false);
                setIsButtonFocus(false);
            }
            // }, 0);
            // }
        };

    }, [isButtonFocus]);


    /**
     * 處理關閉 Dropdown
     */
    const handleCloseDropdown2 = useCallback((e: KeyboardEvent) => {
        setIsVisible(false);

        mainElRef.current.focus();


    }, []);

    /**
     * 處理兩次點擊觸發 blur
     */
    const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // if(isButtonFocus){
        setIsVisible(curr => {
            if(curr){
                mainElRef.current.focus();
            }

            return !curr;
        });

        // }
        // setIsVisible(curr => {
        //     if(curr){
        //         e.preventDefault();
        //         return false;
        //     }
        //     return true;
        // })
    }, []);


    const placeholderOptions: TOption<T>[] = useMemo(() => {
        if(placeholder){
            const placeholderOption: IDropdownOption<T> = {text: placeholder, value: null};
            return options ? [placeholderOption].concat(options as IDropdownOption<T>[]): [placeholderOption];
        }
        return options;

    }, [value, options, placeholder]);



    // const handleSearchFieldFocus = useCallback(() => {
    //     openModal('Select2SearchField');
    //
    // }, []);
    //
    // const handleSearchFieldBlur = useCallback(() => {
    //     closeModal('Select2SearchField');
    //
    // }, []);



    return (<Select2Root
        disabled={disabled}
        isLink={isLink}
        className={className} style={style}
        isFocus={isButtonFocus || isVisible}
    >

        {/* Select */}
        <SelectButton
            type="button"
            ref={setForwardedRef(ref, mainElRef)}
            // onClick={handleDoubleClick}
            onMouseDown={handleDoubleClick}
            onFocus={handleButtonFocus}
            onBlur={handleButtonBlur}

            onKeyDown={e => {
                // console.log('e.key', e.code, e.key);
                // 除了 Tab 以外都要阻止原本的行為跟冒泡
                if(![EKeyboardKey.Tab, EKeyboardKey.Escape].includes(e.key as EKeyboardKey) && e.metaKey) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if(['ArrowUp','ArrowDown','Enter'].includes(e.key) || e.code === 'Space') {
                    handleOpenDropdown();
                }
                return false;
            }}

            disabled={disabled}
            // isCursorAuto={!isLink}
        >
            <DisplayText className="flex-grow-1 text-left text-ellipsis flex-grow-1" isPlaceholder={isEmpty(value)}>{getText}</DisplayText>
            {!isLink && (
                <ArrowDownIcon code="angle_down" size={16} color="#fff"/>
            )}
        </SelectButton>


        {/* 下拉選單 */}
        {isVisible &&
            <ModalWrapper
                // ref={mainElRef}
                position={getPosition()}
                // onClose={handleCloseDropdown2}
            >
                <Dropdown
                    isDark
                    searchForwardedRef={searchFieldRef}
                    options={placeholderOptions}
                    value={value}
                    isAvatarEnable={isAvatarEnable}
                    isSearchEnable={isSearchEnable}
                    isCheckedEnable
                    searchTextPlaceholder="type keyword..."
                    onEnter={handleOnDropdownLiEnter}
                    onClick={handleOnDropdownLiClick}
                    onSearchFieldEsc={handleSearchEsc}

                    onSearchFieldFocus={handleSearchFocus}
                    onSearchFieldBlur={handleSearchBlur}
                />
            </ModalWrapper>
        }

        {/*{isButtonFocus && !isVisible && <>*/}
        {/*    <Hotkey hotKey="down" fn={handleOpenDropdown}/>*/}
        {/*    /!*<Hotkey hotKey="enter" fn={handleOpenDropdown}/>*!/*/}
        {/*    /!*<Hotkey hotKey="space" fn={handleOpenDropdown}/>*!/*/}
        {/*</>}*/}

    </Select2Root>

    );
};


export default forwardRefOfGenerics(Select2);






const DisplayText = styled.span<{
    isPlaceholder: boolean,
}>`
    color: ${props => props.isPlaceholder ? 'var(--form-placeholder-color)' :'var(--form-color)'};
`;


const ArrowDownIcon = styled(Icon)`
    flex: 0 0 auto;
    margin-left: 5px;
`;


const SelectButton = styled.button`
  justify-content: flex-start;
  white-space:nowrap;
  overflow: hidden;
  color: #fff;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;



`;





const Select2Root = styled.div<{
    disabled?: boolean,
    isLink?: boolean,
    isFocus?: boolean,
}>`
    position: relative;
    display: flex;

    height: var(--form-height);

    width: 100%;

    font-size: 14px;

    font-weight: 400;
    line-height: 21px;

    background: 0 0;
    background-clip: padding-box;

    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-bottom: 0;
    border: 1px solid #444;
    padding: 1px 10px;

    ${props => props.isLink && css`
          height: auto;
          padding: 0;
          border: none;
    `}

    ${props => props.isFocus && css`
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    `}


    ${props => props.disabled && css`
        opacity: .7;
        pointer-events: none;
    `}
`;
