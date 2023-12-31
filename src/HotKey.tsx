import {useHotkeys} from 'react-hotkeys-hook';

type TAvailableTags = 'INPUT' | 'TEXTAREA' | 'SELECT';

export interface IHotKey {
    hotKey: string
    fn: (e: KeyboardEvent) => void
    enableOnTags?: TAvailableTags[]
}



const HotKey = ({
    hotKey,
    fn,
    enableOnTags,
}: IHotKey) => {
    useHotkeys<HTMLElement>(hotKey, (e) => {
        e.stopPropagation();
        fn(e);
    }, {enableOnTags: enableOnTags}, [fn]);


    return null;
};

export default HotKey;


