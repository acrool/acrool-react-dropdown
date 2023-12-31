import {useHotkeys} from 'react-hotkeys-hook';

type TAvailableTags = 'INPUT' | 'TEXTAREA' | 'SELECT';

export interface IHotKey {
    hotKey: string
    fn: (e: KeyboardEvent) => void
    enableOnTags?: TAvailableTags[]
    isPreventDefault?: boolean
}



const HotKey = ({
    hotKey,
    fn,
    enableOnTags,
    isPreventDefault = true,
}: IHotKey) => {
    useHotkeys<HTMLElement>(hotKey, (e) => {
        // e.stopPropagation();

        if(isPreventDefault){
            e.preventDefault();
        }

        fn(e);
    }, {enableOnTags: enableOnTags}, [fn]);


    return null;
};

export default HotKey;


