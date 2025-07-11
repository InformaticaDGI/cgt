import styled from 'styled-components';
import Text from '../Ui/Text';


export default function Logo() {

    return (
        <LogoWrapper>
            <Image src='/logo.png' />
            <Text style={{fontWeight: '600', fontSize: '14px', color: '#ffffff'}}>CGT GUÁRICO</Text>
        </LogoWrapper>
    )
}

const LogoWrapper = styled.div`
            display: flex;
            padding-left: 16px;
            flex-direction: row;
            gap: 8px;
            align-items: center;
    `;

const Image = styled.img`
        width: 24px;
        height: 24px;
    `;
