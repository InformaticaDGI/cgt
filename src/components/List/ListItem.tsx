import { Grid, GridItem } from "../Layout/Grid"
import { Flex } from "../Layout/Flex"
import Progress from "../Ui/Progress/Progress"
import Text from "../Ui/Text/Text"
import StatusBadge from "../Prebuilt/StatusBadge"
import type { Project } from "../../hooks/useProjects"
import styled from "styled-components"
import { Link } from "react-router"
import useSecretaryById from "../../hooks/useSecretaryById"
import useMunicipality from "../../hooks/useMunicipality"
import CircularProgress from "../Ui/CircularProgress/CircularProgress"


const ListItem = ({ project }: { project: Project }) => {

    const { name, observations, status, initialDate, overallProjectProgress, finalDate, progressByTime, daysRemaining, parish, benefitedPopulation, secretary } = project

    console.log(overallProjectProgress)

    const { data: rootSecretary } = useSecretaryById(secretary.parentId)
    const { data: municipality } = useMunicipality(parish.municipalityId)



    return <StyledListItem as={Link} to={`/proyectos/${project.id}`} style={{ textDecoration: 'none', userSelect: 'none' }}>
        <Grid $width='100%' $columns="repeat(20, 1fr)" $padding='0.9rem' $gap='1rem' style={{ borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
            <GridItem $colSpan={3} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'center', alignItems: 'start' }}>
                <Flex $width='100%' $justify='center' $align='start' $direction='column' $gap='0.2rem' $paddingX='0.8rem'>
                    <CircularProgress progress={overallProjectProgress} size={60} strokeWidth={3} color="var(--primary)" backgroundColor="#F3F4F6" />
                </Flex>
            </GridItem>
            <GridItem $colSpan={5} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'start', alignItems: 'start' }}>
                <Text $fontSize='14px' $fontWeight='500' $color='var(--secondary)' style={{ fontWeight: '600' }}>{name}</Text>
                <Text $fontSize='14px' $fontWeight='500' $color='var(--text-secondary)' style={{ fontWeight: '500', fontSize: '11px', lineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{observations}</Text>
            </GridItem>

            <GridItem $colSpan={6} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'start', alignItems: 'start' }}>
                <Text $fontSize='14px' $fontWeight='500' $color='#2D3748' style={{ fontWeight: '600', fontSize: '12px' }}>{rootSecretary?.name}</Text>
                <Text $fontSize='14px' $fontWeight='500' $color='var(--text-secondary)' style={{ fontWeight: '500', fontSize: '12px' }}>{secretary.name}</Text>
                <Text $fontSize='14px' $fontWeight='500' $color='var(--text-secondary)' style={{ fontWeight: '500', fontSize: '12px' }}>{municipality?.name} · {parish.name}</Text>
            </GridItem>

            <GridItem $colSpan={6} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', justifyContent: 'end', alignItems: 'end' }}>
                <Flex $flex={1} $justify='space-between' $align='center' $direction='row' $gap='0.2rem' style={{ textWrap: 'nowrap' }}>
                    <Flex $direction="row" $gap='0.2rem' $justify='start' $align='center'>
                        <Text $fontSize='12px' $fontWeight='500' $color="var(--text-secondary)" style={{ borderRadius: '10px' }}>{new Date(initialDate).toLocaleDateString('es-VE', { day: 'numeric', month: 'long' })}</Text>
                        <Text $fontSize='12px' $fontWeight='500' $color="var(--text-secondary)" style={{ borderRadius: '10px' }}> hasta </Text>
                        <Text $fontSize='12px' $fontWeight='500' $color="var(--text-secondary)" style={{ borderRadius: '10px' }}>{new Date(finalDate).toLocaleDateString('es-VE', { day: 'numeric', month: 'long' })}</Text>
                    </Flex>
                    <Flex $flex={1} $justify='end' $align='center' $direction='row' $gap='0.2rem' style={{ textWrap: 'nowrap' }}>
                        <Text $fontSize='12px' $fontWeight='500' $color="var(--text-secondary)" style={{ borderRadius: '10px' }}>{daysRemaining} dias para finalizar</Text>
                    </Flex>
                </Flex>
                <Flex $width='100%' $justify='center' $align='center' $direction='row' $gap='0.2rem'>
                    <Progress value={progressByTime} stroke={4} maxWidth="100%" max={100} color="var(--primary)" backgroundColor="#F3F4F6" />
                </Flex>

                <Flex $align="end" $direction="column" $gap={"4px"}>

                    <Flex $width='100%' $justify='space-between' $align='center' $direction='row' $gap='0.2rem'>
                        <Text style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', textAlign: 'justify' }}>{benefitedPopulation} personas beneficiadas</Text>
                        <StatusBadge variant={status} />
                    </Flex>
                </Flex>
            </GridItem>

        </Grid>
    </StyledListItem>

}

const StyledListItem = styled.div`
    width: 100%;
    &:hover {
        cursor: pointer;
        transform: scale(1.01);
        transition: all 0.3s ease;
    }
`

export default ListItem


