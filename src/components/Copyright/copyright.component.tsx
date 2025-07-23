import {Box} from '../Layout/Box'

export default function CopyRight() {
  return <Box
    $position={'absolute'}
    $bottom={"3"}
    $left={'0'}
    $height={'20px'}
    $zIndex={1000}
    $width={'100%'}
    $display={'flex'}
    $justify={'center'}
    $align={'center'}
  >
    {/* <Stack direction='row' justify="center" align="center" spacing={2}> */}
    <img
      src='/images/logo-guarico.png'
      alt={'Login'}
    />
    <a target='_blank' href='http://informatica.guarico.gob.ve/' style={{
      textDecoration: 'none',
      fontWeight: '600',
      color: 'lightgray',
      textShadow: '5px 5px 10px #000',
      fontSize:'1rem'
    }}
    >Dirección General de Informática @ {new Date().getFullYear()}</a>
    {/* </Stack> */}
  </Box>
}