import styled from 'styled-components';


export default function Logo() {

    return (
        <LogoWrapper>
            <Image src='/cgtblanco2.svg' />
        </LogoWrapper>
    )
}

const LogoWrapper = styled.div`
            display: flex;
            justify-content: center;
            flex-direction: row;
            gap: 8px;
            align-items: center;
    `;

const Image = styled.img`
        width: 128px;
        height: auto;
        filter: drop-shadow(0 0 0.04rem #ffffff);
    `;
