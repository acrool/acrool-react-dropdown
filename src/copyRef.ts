import {Ref} from 'react';

export const setForwardedRef = <T>(
    forwardedRef: Ref<T>,
    localRef: React.MutableRefObject<T>
) => {
    return (node: T) => {
        localRef.current = node;
        if (forwardedRef) {
            if (typeof forwardedRef === 'function') {
                forwardedRef(node);
            } else if (forwardedRef) {
                (forwardedRef as {current: T}).current = node as T|null;
            }
        }
    };
};
