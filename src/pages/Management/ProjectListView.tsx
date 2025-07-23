import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import { Flex } from "../../components/Layout/Flex";
import { Grid, GridItem } from "../../components/Layout/Grid";
import FilterTool from "../../components/Prebuilt/FilterTool";
import Progress from "../../components/Ui/Progress/Progress";
import Text from "../../components/Ui/Text/Text";

const ListItem = () => {
    return <Flex $width='100%' $height='100%' $justify='center' $align='start' $backgroundColor='#ffffff' style={{ borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
        <Flex $width='100%' $height='100%' $justify='center' $align='start'>
            <Progress value={50} maxWidth="100%" max={100} color="var(--primary)" backgroundColor="#F3F4F6" />
        </Flex>
        <Grid $width='100%' $columns="repeat(17, 1fr)" $padding='0.9rem' $gap='4rem' >
            <GridItem $colSpan={5} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'center', alignItems: 'start' }}>
                <Text $fontSize='14px' $fontWeight='500' $color='var(--secondary)' style={{ fontWeight: '600' }}>Manos a la Siembra</Text>
                <Text $fontSize='14px' $fontWeight='500' $color='var(--text-secondary)' style={{ fontWeight: '500', fontSize: '11px', lineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>Manos a la Siembra es una iniciativa educativa y productiva que busca fomentar la educación agroecológica y la cultura del trabajo en las instituciones educativas de Venezuela.</Text>
            </GridItem>

            <GridItem $colSpan={5} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'center', alignItems: 'start' }}>
                <Text $fontSize='14px' $fontWeight='500' $color='#2D3748' style={{ fontWeight: '600', fontSize: '12px' }}>T1 - SECRETAÍA PARA LA TRANSFORMACIÓN ECONÓMICA Y SOCIAL</Text>
                <Text $fontSize='14px' $fontWeight='500' $color='var(--text-secondary)' style={{ fontWeight: '500', fontSize: '12px' }}>ALGUARISA</Text>
            </GridItem>
            <GridItem $colSpan={3} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'center', alignItems: 'start' }}>
                <Flex $width='100%' $justify='center' $align='center' $direction='row' $gap='0.2rem'>
                    <Flex $width='80%' $height='35%' $justify='center' $align='center' $direction='column' $gap='0.2rem' style={{ borderRadius: '10px', padding: '0.4rem', border: '1px solid var(--text-secondary)', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
                        <Text $fontSize='12px' $fontWeight='500'>Juan Germán Roscio</Text>
                    </Flex>
                    <Flex $width='20%' $height='35%' $justify='center' $align='center' $direction='column' $gap='0.2rem' style={{ borderRadius: '25px', padding: '0.4rem', border: '1px solid var(--text-secondary)', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
                        <Text $fontSize='12px' $fontWeight='500'>+7</Text>
                    </Flex>
                </Flex>
                <Flex $width='100%' $justify='center' $align='center' $direction='row' $gap='0.2rem'>
                    <Flex $width='80%' $height='35%' $justify='center' $align='center' $direction='column' $gap='0.2rem' style={{ borderRadius: '10px', padding: '0.4rem', border: '1px solid var(--text-secondary)', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
                        <Text $fontSize='12px' $fontWeight='500'>San Juan</Text>
                    </Flex>
                    <Flex $width='20%' $height='35%' $justify='center' $align='center' $direction='column' $gap='0.2rem' style={{ borderRadius: '25px', padding: '0.4rem', border: '1px solid var(--text-secondary)', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
                        <Text $fontSize='12px' $fontWeight='500'>+28</Text>
                    </Flex>
                </Flex>
            </GridItem>
            <GridItem $colSpan={4} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'center', alignItems: 'end' }}>
                <Flex $width='100%' $justify='space-between' $align='center' $direction='row' $gap='0.2rem'>
                    <GridItem $colSpan={2} style={{ display: 'flex', flexDirection: 'row', gap: '0.2rem', justifyContent: 'center', alignItems: 'center' }}>
                        <Text $fontSize='12px' $fontWeight='500' $color="var(--text-secondary)" style={{ borderRadius: '10px' }}>{new Date().toLocaleDateString('es-VE', { day: 'numeric', month: 'long' })}</Text>
                        <Text $fontSize='12px' $fontWeight='500' $color="var(--text-secondary)" style={{ borderRadius: '10px' }}> hasta </Text>
                        <Text $fontSize='12px' $fontWeight='500' $color="var(--text-secondary)" style={{ borderRadius: '10px' }}>{new Date('2025-07-28').toLocaleDateString('es-VE', { day: 'numeric', month: 'long' })}</Text>
                    </GridItem>
                    <Flex $width='30%' $height='80%' $justify='center' $align='center' $direction='column' $gap='0.2rem' style={{ borderRadius: '10px', padding: '0.4rem', backgroundColor: '#FF7F00' }}>
                        <Text $fontSize='14px' $fontWeight='600' $color='#ffffff' style={{ backgroundColor: 'var(--color-primary)', borderRadius: '10px', fontSize: '12px' }}>En progreso</Text>
                    </Flex>
                </Flex>

                <Flex $align="end" $direction="column" $gap={"4px"}>
                    <Flex $width='100%' $justify='end' $align='center' $direction='row' $gap='0.2rem'>
                        <Text style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', textAlign: 'justify' }}>Dias restantes: {14}</Text>
                    </Flex>
                    <Progress value={50} maxWidth="100%" max={100} color="var(--primary)" backgroundColor="#F3F4F6" />
                </Flex>
            </GridItem>

        </Grid>
    </Flex>
}

const ProjectsListView = () => {

    return (
        <Flex $width='100%' $height='100%' $justify='center' $align='start' $padding='1rem'>
            <Header />
            <FilterTool />
            <Flex $width='100%' $height='100%' $justify='center' $align='start' $padding='1rem'>
                {Array.from({ length: 10 }).map((_, index) => (
                    <ListItem key={index} />
                ))}
            </Flex>
        </Flex>
    )
}

export default ProjectsListView;