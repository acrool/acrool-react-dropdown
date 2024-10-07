import {useCallback, useRef} from 'react';


/**
 * 處理輸入法輸入中
 */
const useComposition = () => {
    
    const compositionStatusRef = useRef<boolean>(false);

    const onCompositionFn = useCallback(() => {
        const onCompositionStart = () => {
            compositionStatusRef.current = true;
        };
        const onCompositionEnd = () => {
            compositionStatusRef.current = false;
        };

        return {onCompositionStart, onCompositionEnd};
    }, []);

    
    return {
        onCompositionFn,
        compositionStatusRef,
    };
};

export default useComposition;




