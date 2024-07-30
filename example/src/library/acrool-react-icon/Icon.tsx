import IconSvg, {IIconSvgProps} from '@acrool/react-iconsvg';
import React from 'react';
import styled, {css} from 'styled-components';

import {TIconCode} from './SvgSymbol';


const idPrefix = 'icon_';


interface IProps extends IIconSvgProps {
    code: TIconCode
}

/**
 * IconSvg
 * https://github.com/imagine10255/bear-react-iconsvg
 */
const Icon = (props: IProps) => {

    return <ThemeIconSvg
        {...props}
        idPrefix={idPrefix}
        symbolsPath=""
    />;
};

export default Icon;



const ThemeIconSvg = styled(IconSvg)`
  ${props => props.color === 'primary' && css`
      --iconsvg-color: var(--primary-color) !important;
  `}
  ${props => props.color === 'secondary' && css`
    --iconsvg-color: var(--secondary-color) !important;
  `}
`;
