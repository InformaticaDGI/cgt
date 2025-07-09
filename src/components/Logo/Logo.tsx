import styled from 'styled-components';

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

const Text = styled.p`
            font-family: inherit;
            font-weight: bolder;
            font-size: 14px;
            color: #ffffff;
    `;



export default function Logo() {

    return (
        <LogoWrapper>
            <Image src='/logo.png' />
            <Text>CGT GUÁRICO</Text>
        </LogoWrapper>
    )
}