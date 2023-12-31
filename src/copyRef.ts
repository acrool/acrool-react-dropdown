import React, {Ref} from 'react';

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



type ForwardRefFunction<T, P = {}> = (
    props: P & React.RefAttributes<T>
) => React.ReactElement | null;

export function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
): ForwardRefFunction<T, P> {
    return (props: P & React.RefAttributes<T>) => render(props, props.ref);
}
