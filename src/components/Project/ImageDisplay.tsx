import styled from "styled-components"
import { Flex } from "../Layout/Flex"

const ImageDisplay = ({ projectImages }: { projectImages: any }) => {


    return (
        <Flex $direction="row" $gap="16px">
            <ImageDisplayItem src={projectImages.startImageUrl} />
            <ImageDisplayItem src={projectImages.middleImageUrl} />
            <ImageDisplayItem src={projectImages.endImageUrl} />
        </Flex>
    )

}

export default ImageDisplay;

const ImageDisplayItem = ({ src }: { src: string }) => {
    return (
        <Flex $direction="row" $gap="16px">
            <Image src={src} alt="Project Image" />
        </Flex>
    )
}

const Image = styled.img`
    width: 200px;
    height: 180px;
    object-fit: cover;
`
