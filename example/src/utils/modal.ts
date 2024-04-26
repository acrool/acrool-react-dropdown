import {removeByIndex} from 'bear-jsutils/array';

// 控制開啟的光箱列表
export let modalList: string[] = [];


export const openModal = (key: string) => {
    // console.log('opebnKey', key, modalList);
    modalList.push(key);
};

export const closeModal = (key: string)  => {
    // console.log('closeKey', key, modalList);
    const currIndex = modalList.findIndex(keyRow => keyRow === key);
    modalList = removeByIndex(modalList, currIndex);

};

export const getCurrent = () => {
    if(modalList.length === 0){
        return undefined;
    }
    return modalList[modalList.length - 1];
};
