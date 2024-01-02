import {useEffect, useId} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

import {closeModal, getCurrent, openModal, modalList} from '@/utils/modal';




type TAvailableTags = 'INPUT' | 'TEXTAREA' | 'SELECT';

/**
 * 點擊非主Element, 進行點擊取消
 * (非遮罩做法)
 */
const useEscClose = (modalKey: string, onClose?: (e?: KeyboardEvent) => void, enableOnTags?: TAvailableTags[]) => {

    useEffect(() => {
        openModal(modalKey);

        return () => {
            closeModal(modalKey);
        };
    }, []);


    useHotkeys<HTMLDivElement>('esc', (e) => {
        console.log('close hook modalKey', modalKey, modalList);
        if(getCurrent() === modalKey){
            if(onClose) onClose(e);
        }
    }, {enableOnTags: enableOnTags ?? ['INPUT', 'TEXTAREA']}, [onClose]);

};

export default useEscClose;
