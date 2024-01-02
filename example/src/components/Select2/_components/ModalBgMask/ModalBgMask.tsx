import styled, {css} from 'styled-components';

const ModalBgMask = styled.div<{
    isVisibleBg?: boolean,
}>`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    cursor: auto;

    ${props => props.isVisibleBg && css`
      background-color: rgba(0, 0, 0, 0.4);
    `};
`;

export default ModalBgMask;
