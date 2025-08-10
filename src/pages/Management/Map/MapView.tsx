import Header from "../../../components/Header/Header";
import { Flex } from "../../../components/Layout/Flex"
import { GobMap } from "../../../components/Map/map.components";
import FilterTool from "../../../components/Prebuilt/FilterTool";

const MapView = () => {
    return <Flex $direction="column" $gap="12px" $padding="1rem" $align="stretch" $height="100vh" style={{ width: '85vw', position: 'relative' }}>
        <Flex $direction="column" style={{ flex: 1 }} $justify="start" $align="start" $gap="12px">
            <Header />
            <FilterTool />
        </Flex>
        <Flex>
            <GobMap />
        </Flex>
    </Flex>

}

export default MapView;