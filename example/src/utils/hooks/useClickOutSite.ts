import {useCallback, useEffect, useId,useRef, useState} from 'react';


/**
 * 取得適合的顯示位置
 * @param el
 */
export const getVisiblePosition = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const top = rect.top;
    const windowsHalfTop = window.innerHeight / 2;
    if(top > windowsHalfTop){
        return 'top';
    }
    return 'bottom';
};


/**
 * 點擊非主Element, 進行點擊取消
 * (非遮罩做法)
 */
const useClickOutSite = <T extends HTMLElement>() => {
    // 主體
    const mainElRef = useRef<T|null>(null);

    // 顯示控制
    const [isVisible, setIsVisible] = useState(false);


    /**
     * 處理點擊遮罩後的動作
     */
    const handleClickOutSite = useCallback((evt: MouseEvent) => {
        if (mainElRef && mainElRef.current && mainElRef.current.contains(evt.target as Node)) return;

        controlVisible(false);
    }, [mainElRef]);


    /**
     * 處理控制顯示隱藏
     */
    const controlVisible = useCallback((isVisible = false) => {
        setIsVisible(isVisible);

        setTimeout(() => {
            if(isVisible){
                document.addEventListener('click', handleClickOutSite);
            }else{
                document.removeEventListener('click', handleClickOutSite);
            }
        }, 0);
    }, [handleClickOutSite]);

    /**
     * 取得顯示位置
     */
    const getPosition = useCallback(() => {
        if(mainElRef.current){
            return getVisiblePosition(mainElRef.current);
        }
        return 'bottom';
    }, [mainElRef.current]);



    return {
        mainElRef,
        isVisible,
        setIsVisible: controlVisible,
        getPosition
    };

};

export default useClickOutSite;
