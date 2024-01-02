import React, {forwardRef, useEffect, useId} from 'react';
import styled, {css} from 'styled-components';

import useEscClose from '@/utils/hooks/useEscClose';



interface IProps extends FCChildrenProps {
    position?: 'top'|'bottom'
    isVisible?: boolean
    onClose?: (e?: KeyboardEvent) => void
    tabIndex?: number
}

const ModalWrapper = forwardRef<HTMLDivElement, IProps>(({
    position = 'top',
    isVisible = true,
    children,
    onClose,
    tabIndex = -1
}, ref) => {
    useEscClose('ModalWrapper', onClose);

    return <ModalWrapperRoot
        isVisible={isVisible}
        tabIndex={tabIndex}
    >
        <Container ref={ref} position={position}>
            {children}
        </Container>

        {/* @TODO: 要包到 Input 內的話，會導致這個遮罩判斷不到外部 */}
        {/*<ModalBgMask/>*/}
    </ModalWrapperRoot>;
});

export default ModalWrapper;




const Container = styled.div<{
    position: 'top'|'bottom',
}>`
    position: absolute;
    left: 0;
    transition: opacity .3s ease;
    width: auto;
    min-width: 100%;
    z-index: 4;

    ${props => props.position === 'top' && css`
        bottom: calc(100% - 1px);
    `}
    ${props => props.position === 'bottom' && css`
        top: calc(100% - 1px);
    `}
`;

const ModalWrapperRoot = styled.div<{
    isVisible: boolean,
}>`
    visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
    opacity: ${props => (props.isVisible ? 1 : 0)};
    z-index: ${props => (props.isVisible ? 10 : -1)};
    pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
`;
