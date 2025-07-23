import { Flex } from "../Layout/Flex" 
import Text from "../Ui/Text/Text"

export default function MapLoader () {
    return (
        <Flex 
          $position='absolute'
          $justify='center'
          $align='center'
          $backgroundColor='blackAlpha.400'
          $height='100vh'
          $width='100vw' 
          $zIndex={10030}>
      <Text style={{ fontSize: '12px', color: '#5A787A', fontWeight: '600' }}>Cargando...</Text>
      </Flex>
    )
}