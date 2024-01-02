import IconSvg, {IIconSvgProps} from 'bear-react-iconsvg';
import React from 'react';
import styled from 'styled-components';

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
  --primary-color: ${props => props.theme.primaryColor};
  --secondary-color: var(--primary-color2);
`;
