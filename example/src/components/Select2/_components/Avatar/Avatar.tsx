import {isEmpty} from 'bear-jsutils/equal';
import styled, {css} from 'styled-components';


interface IProps extends FCChildrenProps {
    size?: number|'100%'
    imageSize?: string
    image?: string|null
    color?: string
    grayscale?: number
    name?: string
}

function isAZ09(str) {
    // 使用正則表達式判斷
    let reg = new RegExp('[A-Za-z0-9]+');
    return str.match(reg) !== null;
}


/**
 * Block Title
 */
const Avatar = ({
    style,
    className,
    size = 30,
    imageSize = 'cover',
    image,
    color,
    name,
    grayscale,
    children,
}: IProps) => {

    const shortName = name?.slice(0, isAZ09(name) ? 2: 1).toLocaleUpperCase();
    return <AvatarRoot
        style={{
            backgroundImage: image ? `url('${image}')`: undefined,
            backgroundColor: color ? color : isEmpty(image) ? '#232323': undefined,
            ...style,
        }}
        className={className}
        size={size}
        grayscale={grayscale}
        imageSize={imageSize}
    >
        {isEmpty(image) && shortName}
        {children}
    </AvatarRoot>;
};

export default Avatar;






const AvatarRoot = styled.div<{
    size: number|'100%',
    grayscale?: number,
    imageSize?: string,
}>`
    background: center no-repeat;
    background-size: ${props => props.imageSize};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${props => typeof props.size === 'number' ? `${props.size}px`: props.size};
    height: ${props => typeof props.size === 'number' ? `${props.size}px`: props.size};
    white-space: nowrap;
    filter: drop-shadow(rgba(0, 0, 0, 0.3) 0px 2px 6px);
    box-shadow: rgb(0 0 0 / 73%) -1px 1px 4px 0px;

  ${props => props.grayscale && css`
    filter: grayscale(${props.grayscale}%), drop-shadow(rgba(0, 0, 0, 0.3) 0px 2px 6px);;
  `}
`;
