import Header from "../../components/Header/Header";
import { Flex } from "../../components/Layout/Flex";
import ListItem from "../../components/List/ListItem";
import Text from "../../components/Ui/Text/Text";
import useProjects from "../../hooks/useProjects";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import { Grid, GridItem } from "../../components/Layout/Grid";
import ProjectFilter from "../../components/Prebuilt/ProjectFilter";
import Pagination from "../../components/Prebuilt/Pagination";
import { useSearchParams } from "react-router";
import { useAppStore } from "../../store/store";

const ProjectsListView = () => {

    const [searchParams] = useSearchParams();
    const { municipalityId, parrishId, secretaryParentId, secretarialTerritoryId  } = useAppStore()
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') ?? '') : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') ?? '') : 10;
    const { data: { data: projects, pagination } } = useProjects({ page, limit, include: 'parish.municipality,secretary', parishId: parrishId || undefined, municipalityId: municipalityId || undefined, secretaryId: secretaryParentId || undefined, territorialSecretaryId: secretarialTerritoryId || undefined });

    return (
        <Flex $height='100%' $direction="column" $width='85vw' $justify='center' $align='stretch' $padding='1rem' style={{ position: 'relative' }}>
            <Header />
            <Card $isSelectable={false} $gap="0.7rem">
                <CardBody>
                    <ProjectFilter />
                </CardBody>
            </Card>
            <Grid $columns="repeat(20, 1fr)" $gap="1rem" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1rem' }}>
                <GridItem $colSpan={3}>
                    <Text $fontSize='16px' $fontWeight='500' $color='var(--text-secondary)'>Progreso</Text>
                </GridItem>
                <GridItem $colSpan={5}>
                    <Text $fontSize='16px' $fontWeight='500' $color='var(--text-secondary)'>Información</Text>
                </GridItem>
                <GridItem $colSpan={6}>
                    <Text $fontSize='16px' $fontWeight='500' $color='var(--text-secondary)'>Ubicación</Text>
                </GridItem>
                <GridItem $colSpan={6}>
                    <Text $fontSize='16px' $fontWeight='500' $color='var(--text-secondary)'>Estado</Text>
                </GridItem>
            </Grid>
            <Flex $width='100%' $height='100%' $justify='center' $align='start' $padding='1rem'>
                {projects.map((project) => (
                    <ListItem key={project.id} project={project} />
                ))}
                <Pagination hasNext={pagination.hasNext} hasPrev={pagination.hasPrev} currentPage={pagination.page} totalPages={pagination.totalPages} rowsPerPage={pagination.limit} />
            </Flex>
        </Flex>
    )
}

export default ProjectsListView;