import Header from "../../components/Header/Header";
import { Flex } from "../../components/Layout/Flex";
import ListItem from "../../components/List/ListItem";
import Text from "../../components/Ui/Text/Text";
import useProjects from "../../hooks/useProjects";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import { Grid, GridItem } from "../../components/Layout/Grid";
import ProjectFilter from "../../components/Prebuilt/ProjectFilter";
import Pagination from "../../components/Prebuilt/Pagination";
import { useSearchParams } from "react-router";

const ProjectsListView = () => {

    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') ?? '') : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') ?? '') : 10;
    const { data: { data: projects, pagination } } = useProjects({ page, limit });

    return (
        <Flex $height='100%' $direction="column" $width='85vw' $justify='center' $align='stretch' $padding='1rem' style={{ position: 'relative' }}>
            <Header />
            <Card $isSelectable={false} $gap="0.7rem">
                <CardHeader>
                    <Flex $direction="column" $justify="start" $align="start" $gap="0.9rem">
                        <Text $fontSize='24px' $fontWeight='600' $color='var(--text-tertiary)'>Proyectos</Text>
                        <Text $fontSize='16px' $fontWeight='500' $color='var(--text-secondary)'>Gestiona y supervisa todos los proyectos</Text>
                    </Flex>
                </CardHeader>
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
                <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} rowsPerPage={pagination.limit} />
            </Flex>
        </Flex>
    )
}

export default ProjectsListView;