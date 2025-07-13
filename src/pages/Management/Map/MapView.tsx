import Header from "../../../components/Header/Header";
import { Flex } from "../../../components/Layout/Flex"
import MapViewer from "../../../components/MapViewer/MapViewer";
import FilterTool from "../../../components/Prebuilt/FilterTool";

const MapView = () => {
    return <Flex direction="column" gap="12px" padding="16px" align="stretch" height="100vh">
        <Flex direction="column" style={{ flex: 1 }} justify="start" align="start" gap="12px">
            <Header />
            <FilterTool />
        </Flex>
        <Flex style={{ flex: 2 }}>
            <MapViewer />
        </Flex>
    </Flex>

}

export default MapView;