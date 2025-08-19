import styled from "styled-components"
import { Flex } from "../Layout/Flex"
import { useState } from "react"
import { LuImage } from "react-icons/lu"
import Text from "../Ui/Text/Text"

const ImageDisplay = ({ projectImages }: { projectImages: any }) => {

    return (
        <Flex $direction="row" $gap="16px">
            <Flex $direction="column" $gap="8px">
                <Text $fontSize="14px" $fontWeight="500">Inicio</Text>
                <ImageDisplayItem src={projectImages?.startImageUrl} />
            </Flex>
            <Flex $direction="column" $gap="8px">
                <Text $fontSize="14px" $fontWeight="500">Durante</Text>
                <ImageDisplayItem src={projectImages?.middleImageUrl} />
            </Flex>
            <Flex $direction="column" $gap="8px">
                <Text $fontSize="14px" $fontWeight="500">Después</Text>
                <ImageDisplayItem src={projectImages?.endImageUrl} />
            </Flex>
        </Flex>
    )

}

export default ImageDisplay;

const ImageDisplayItem = ({ src }: { src: string }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <Flex $direction="row" $gap="16px">
            {!imageError && src ? (
                <Image 
                    src={src} 
                    alt="Project Image" 
                    onError={handleImageError}
                />
            ) : (
                <FallbackAvatar />
            )}
        </Flex>
    )
}

const Image = styled.img`
    width: 200px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
`

const FallbackAvatar = () => {
    return (
        <AvatarContainer>
            <AvatarIcon>
                <LuImage size={64} />
            </AvatarIcon>
        </AvatarContainer>
    )
}

const AvatarContainer = styled.div`
    width: 200px;
    height: 180px;
    background: #fafafa;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #414141;
`

const AvatarIcon = styled.div`
    margin-bottom: 8px;
    opacity: 0.8;
`