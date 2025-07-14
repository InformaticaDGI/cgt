import { PiMapPinArea } from "react-icons/pi";
import { Flex } from "../Layout/Flex";
import { Button } from "../Ui/Button/Button";
import Text from "../Ui/Text/Text";
import { useNavigate } from "react-router";

const LocateToMap = () => {

    const router = useNavigate()

    const handleOpenMap = () => {
        router('/mapa')
    }

    return (
        <Button $variant="primary" onClick={handleOpenMap}>
            <Flex $direction="row" $justify="center" $align="center" $gap="8px">
                <PiMapPinArea color="white" size={20} />
                <Text style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>Ver Localización</Text>
            </Flex>
        </Button>
    )
}

export default LocateToMap;