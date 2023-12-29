import {useHotkeys} from 'react-hotkeys-hook';

type TAvailableTags = 'INPUT' | 'TEXTAREA' | 'SELECT';

export interface IHotKey {
    hotKey: string
    fn: () => void
    enableOnTags?: TAvailableTags[]
}



const HotKey = ({
    hotKey,
    fn,
    enableOnTags
}: IHotKey) => {
    useHotkeys<HTMLElement>(hotKey, (e) => {
        e.stopPropagation();
        e.preventDefault();

        fn();
    }, {enableOnTags: enableOnTags}, [fn]);


    return null;
};

export default HotKey;


