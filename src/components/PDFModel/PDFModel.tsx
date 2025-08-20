import { Page, Text, View, Document, StyleSheet, Image, Svg, G, Defs, Polygon, Path, Font } from '@react-pdf/renderer';
import { type ReactNode } from 'react';
import gobLogo from '../../assets/por-amor-a-guarico.png';
import type { Stage } from '../Prebuilt/StatusBadge';
import { formatCurrencyBdv } from '../Prebuilt/CurrencyInput';
// Constante para la altura del header (calculada: SVG height + logo height + padding)
const HEADER_HEIGHT = 145; // 79.114 + 33.84 + 32

// Create styles
Font.register({
    family: 'CanvaSansRegular',
    src: `${window.location.origin}/CanvaSansRegular.ttf`
});
Font.register({
    family: 'CanvaSansBold',
    src: `${window.location.origin}/CanvaSansBold.ttf`
});

const body = StyleSheet.create({
    title: {
        fontSize: '14px',
        color: "#058473",
    },
    projectNumber: {
        fontSize: '10px',
        color: "#058473",
        fontFamily: 'CanvaSansBold'
    },
    textNoImage: {
        fontSize: '10px',
        color: "#2d2d2d",
        fontFamily: 'CanvaSansRegular'
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        fontFamily: 'CanvaSansRegular',
        paddingTop: HEADER_HEIGHT,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    content: {
        padding: 16,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
        gap: '4px'
    },
    image: {
        width: '100%',
        height: '250px',
        objectFit: 'cover',
        borderRadius: 10,
        border: '1px solid #bfbfbf',
    }
});

const kpiTable = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '33.33%', // Define el ancho de la columna (20% para 5 columnas iguales)
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f2f2f2',
        padding: 5,
        textAlign: 'center',
    },
    tableCol: {
        width: '33.33%', // Mismo ancho para las celdas de datos
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        textAlign: 'center',
    },
    tableCellHeader: {
        margin: 'auto',
        fontSize: 10,
        fontWeight: 'bold',
    },
    tableCell: {
        margin: 'auto',
        fontSize: 9,
    },
});

const activityTable = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '33.33%', // Define el ancho de la columna (20% para 5 columnas iguales)
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f2f2f2',
        padding: 5,
        textAlign: 'center',
    },
    tableCol: {
        width: '33.33%', // Mismo ancho para las celdas de datos
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        textAlign: 'center',
    },
    tableCellHeader: {
        margin: 'auto',
        fontSize: 10,
        fontWeight: 'bold',
    },
    tableCell: {
        margin: 'auto',
        fontSize: 9,
    },
});


type PDFModelProps = {
    projectToken: string,
    status: Stage,
    projectName: string
    projectDescription: string,
    startDate: string,
    endDate: string,
    territorialSecretary: string,
    municipality: string,
    parish: string,
    community: string,
    circuit: string,
    coordinate: string
    budgetSource: string,
    budgetInVES: string,
    budgetInUSD: string,
    qualifiedLabor: string
    unqualifiedLabor: string,
    directLabor: string,
    indirectLabor: string,
    maleLabor: string,
    femaleLabor: string,
    beneficitPopulation: string,
    beneficitChildren: string,
    kpiInstances: any[],
    activities: any[],
    projectImage: any
}

// Create Document Component
const PDFModel = (props: PDFModelProps) => {

    const {
        activities,
        beneficitChildren,
        beneficitPopulation,
        budgetInUSD,
        budgetInVES,
        budgetSource,
        circuit,
        community,
        coordinate,
        directLabor,
        endDate,
        femaleLabor,
        indirectLabor,
        kpiInstances,
        maleLabor,
        municipality,
        parish,
        projectDescription,
        projectName,
        projectToken,
        qualifiedLabor,
        startDate,
        status,
        territorialSecretary,
        unqualifiedLabor,
        projectImage
    } = props;




    return <Document>
        <Page size="A4" style={body.page}>
            <Header />
            <View style={body.content}>
                <Text style={body.projectNumber}>NRO DE FICHA DEL PROYECTO: {projectToken}</Text>
                <Status status={status} />
                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Title>INFORMACIÓN DEL PROYECTO</Title>
                        <Article title='NOMBRE DEL PROYECTO' content={projectName} />
                        <Article title='DESCRIPCIÓN DEL PROYECTO' minHeight="60px" content={projectDescription} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Title>FECHA DEL PROYECTO</Title>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            <Article title='FECHA DE INICIO' content={new Date(startDate).toLocaleDateString("es-VE")} />
                            <Article title='FECHA DE CULMINACIÓN' content={new Date(endDate).toLocaleDateString("es-VE")} />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Title>UBICACIÓN GEOGRAFICA</Title>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            <Article title='SECRETARIA TERRITORIAL' content={territorialSecretary} />
                            <Article title='MUNICIPIO' content={municipality} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            <Article title='PARROQUIA' content={parish} />
                            <Article title='COMUNIDAD' content={community} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            <Article title='CIRCUITO' content={circuit} />
                            <Article title='COORDENADAS' content={coordinate} />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} break>
                        <Title>RECURSOS DEL PROYECTO</Title>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            <Article title='TIPO DE RECURSO' content={budgetSource} />
                            <Article title='MONTO (VES)' content={`${formatCurrencyBdv(budgetInVES)} Bs.`} />
                            <Article title='MONTO (USD)' content={`${formatCurrencyBdv(budgetInUSD)} $`} />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} >
                        <Title>CANTIDAD DE PERSONAL</Title>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            <Article title='CALIFICADO' content={qualifiedLabor} />
                            <Article title='NO CALIFICADO' content={unqualifiedLabor} />
                            <Article title='DIRECTA' content={directLabor} />
                            <Article title='INDIRECTA' content={indirectLabor} />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} >
                        <Title>DISTRIBUCIÓN POR GENERO</Title>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            <Article title='HOMBRES' content={maleLabor} />
                            <Article title='MUJERES' content={femaleLabor} />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            {/* Encabezado de la tabla */}
                            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '6px' }}>
                                <ArticleHeader title='METAS' />
                                <View style={kpiTable.table}>
                                    <View style={kpiTable.tableRow}>
                                        <View style={kpiTable.tableColHeader}>
                                            <Text style={kpiTable.tableCellHeader}>META</Text>
                                        </View>
                                        <View style={kpiTable.tableColHeader}>
                                            <Text style={kpiTable.tableCellHeader}>UNIDAD DE MEDIDA</Text>
                                        </View>
                                        <View style={kpiTable.tableColHeader}>
                                            <Text style={kpiTable.tableCellHeader}>VALOR ESPERADO</Text>
                                        </View>

                                    </View>

                                    {/* Filas de datos */}
                                    {kpiInstances?.map((item) => (
                                        <View style={kpiTable.tableRow} key={item.id}>
                                            <View style={kpiTable.tableCol}>
                                                <Text style={kpiTable.tableCell}>{item.kpi.name}</Text>
                                            </View>
                                            <View style={kpiTable.tableCol}>
                                                <Text style={kpiTable.tableCell}>{item.kpi.measurement.name} ({item.kpi.measurement.symbol})</Text>
                                            </View>
                                            <View style={kpiTable.tableCol}>
                                                <Text style={kpiTable.tableCell}>{item.expected}</Text>
                                            </View>

                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} break>
                        <Title>POBLACIÓN BENEFICIADA</Title>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            <Article title='GENERAL' content={beneficitPopulation} />
                            <Article title='MENORES A 18 AÑOS' content={beneficitChildren} />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', width: '100%' }}>
                            {/* Encabezado de la tabla */}
                            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '6px' }}>
                                <ArticleHeader title='ACTIVIDADES' />
                                <View style={activityTable.table}>
                                    <View style={activityTable.tableRow}>
                                        <View style={activityTable.tableColHeader}>
                                            <Text style={activityTable.tableCellHeader}>ACTIVIDAD</Text>
                                        </View>
                                        <View style={activityTable.tableColHeader}>
                                            <Text style={activityTable.tableCellHeader}>UNIDAD DE MEDIDA</Text>
                                        </View>
                                        <View style={activityTable.tableColHeader}>
                                            <Text style={activityTable.tableCellHeader}>CANTIDAD</Text>
                                        </View>

                                    </View>

                                    {/* Filas de datos */}
                                    {activities?.map((item) => {

                                        const kpiResultTotal = item.kpiResults?.reduce?.((acc: number, curr: any) => acc + curr.value, 0) || 0;
                                        const kpiResultMeasurement = item.kpiResults?.[0]?.kpiInstance?.kpi?.measurement || '';

                                        return <View style={activityTable.tableRow} key={item.id}>
                                            <View style={activityTable.tableCol}>
                                                <Text style={activityTable.tableCell}>{item.name}</Text>
                                            </View>
                                            <View style={activityTable.tableCol}>
                                                <Text style={activityTable.tableCell}>{kpiResultMeasurement?.name} ({kpiResultMeasurement?.symbol})</Text>
                                            </View>
                                            <View style={activityTable.tableCol}>
                                                <Text style={activityTable.tableCell}>{kpiResultTotal}</Text>
                                            </View>
                                        </View>
                                    })}

                                </View>
                            </View>
                        </View>
                    </View>
                    {/** FOTOS DEL PROYECTO */}
                    <View style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '6px', marginTop: '10px' }}>
                        <Title>FOTOS DEL PROYECTO</Title>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' }}>
                            {/** INICIO */}
                            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '6px' }}>
                                <ArticleHeader title='INICIO' />
                                {projectImage?.startImageUrl !== "" ? <Image
                                    style={body.image}
                                    source={projectImage?.startImageUrl}
                                /> : <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', backgroundColor: '#f3fcfa', borderRadius: '10px' }}><Text style={body.textNoImage}>No hay Imagen</Text></View>}
                            </View>
                            {/** DURANTE */}
                            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '6px' }}>
                                <ArticleHeader title='DURANTE' />
                                {projectImage?.middleImageUrl !== "" ? <Image
                                    style={body.image}
                                    source={projectImage?.middleImageUrl}
                                /> : <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', backgroundColor: '#f3fcfa', borderRadius: '10px' }}><Text style={body.textNoImage}>No hay Imagen</Text></View>}
                            </View>
                            {/** DESPUES */}
                            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '6px' }}>
                                <ArticleHeader title='DESPUES' />
                                {projectImage?.endImageUrl !== "" ? <Image
                                    style={body.image}
                                    source={projectImage?.endImageUrl}
                                /> : <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', backgroundColor: '#f3fcfa', borderRadius: '10px' }}><Text style={body.textNoImage}>No hay Imagen</Text></View>}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Footer />
        </Page>
    </Document >
};

const Status = ({ status }: { status: Stage }) => {
    const values: Record<Stage, { color: string, tag: string }> = {
        pending: { color: "#9f9f9f", tag: "Pendiente" },
        in_progress: { color: "#FF7F00", tag: "En progreso" },
        completed: { color: "var(--primary)", tag: "Completado" },
        cancelled: { color: "#DC2626", tag: "Cancelado" }
    }
    return <View style={{
        color: "#ffffff",
        fontSize: '8px',
        fontFamily: 'CanvaSansBold',
        borderRadius: "6px",
        backgroundColor: values[status].color,
        padding: '4px'
    }}>
        <Text >
            {values[status].tag}
        </Text>
    </View>
}

const Article = ({ title, content, minHeight = '30px' }: { title: string, content: string, minHeight?: string }) => {
    return <View style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        width: '100%'
    }}>
        <ArticleHeader title={title} />
        <View style={{ backgroundColor: '#f3fcfa', color: '#2d2d2d', padding: '4px', borderRadius: '8px', minHeight }}>
            <Text style={{ padding: '4px', textAlign: 'justify', fontSize: '8px' }}>{content}</Text>
        </View>
    </View>
}

const ArticleHeader = ({ title }: { title: string }) => {
    return <View style={{ backgroundColor: '#00b59e', color: '#ffffff', padding: '6px 10px', width: '100%', borderRadius: '4px' }}>
        <Text style={{ fontSize: '8px', fontFamily: 'CanvaSansBold' }}>{title}</Text>
    </View>
}

const Title = ({ children }: { children: ReactNode }) => {
    return <Text style={{
        fontSize: '10px',
        color: '#058473',
        fontFamily: 'CanvaSansBold'
    }}>
        {children}
    </Text>
}

const Footer = () => {
    return (
        <View fixed style={{
            backgroundColor: "#00b59e",
            color: '#ffffff',
            fontSize: '8px',
            fontFamily: 'CanvaSansBold',
            width: '100%',
            position: 'absolute',
            bottom: 0,
        }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: '8px', height: '30px', width: '100%' }}>
                {/* <Text>Referencia Electronica: F8J2-K9L7-Q6P4-T3R1</Text> */}
                <Text>Ficha generada de forma electrónica por el Sistema CGT.</Text>
            </View>
        </View>
    )
}


const Header = () => {
    return <View fixed style={{ position: 'absolute', top: 0, width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Waves />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0px 16px' }}>
            <CGTLOGO />
            <GOBLOGO />
        </View>
    </View>
}

const Waves = () => {
    return <Svg
        viewBox="0 0 595.276 79.114">
        <Path style={{ fill: "#088473;" }} d="M0,0v40.253c0.018,1.517,0.017,4.299,0,5.844v6.441c30.87,9.628,61.13,17.653,89.548,20.82
        c58.881,6.617,109.863-7.368,160.684-21.99C211.2,33.52,170.972,10.556,133.621,0H0z"/>
        <Path style={{ fill: "#1CB09C;" }} d="M595.276,28.772V0h-10.674h-450.98c37.351,10.556,77.578,33.52,116.611,51.368
        c18.219,8.331,36.179,15.55,53.462,19.866c59.995,15.039,111.8-4.524,167.875-6.891c44.303-1.752,91.169,7.205,123.706,14.77V35.705
        V28.772z"/>
    </Svg>


}

const CGTLOGO = () => {
    return <Svg
        viewBox="0 0 63 33.84" style={{ width: '2.22cm', height: '1.2cm' }}>
        <G>
            <Defs>
                <Polygon points="0,33.84 63,33.84 63,0 0,0 0,33.84 		" />
            </Defs>
            <clipPath id="SVGID_2_">
                <use style={{ overflow: "visible;" }} />
            </clipPath>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M13.321,19.227c-1.822,0-3.416-0.329-4.783-0.988
       c-1.366-0.658-2.425-1.575-3.176-2.751c-0.751-1.175-1.126-2.538-1.126-4.089c0-1.534,0.274-2.943,0.822-4.227
       c0.548-1.284,1.32-2.393,2.315-3.326C8.369,2.911,9.55,2.19,10.917,1.682c1.366-0.508,2.868-0.763,4.504-0.763
       c1.704,0,3.214,0.301,4.53,0.9c1.316,0.601,2.294,1.468,2.935,2.602l-4.302,3.326c-0.371-0.65-0.852-1.154-1.443-1.513
       c-0.59-0.359-1.29-0.538-2.1-0.538c-0.708,0-1.354,0.129-1.936,0.388c-0.582,0.258-1.084,0.625-1.506,1.1
       c-0.422,0.476-0.751,1.038-0.987,1.688c-0.236,0.65-0.354,1.367-0.354,2.15c0,0.685,0.152,1.284,0.455,1.802
       c0.304,0.517,0.729,0.917,1.278,1.2s1.185,0.425,1.911,0.425c0.692,0,1.371-0.158,2.037-0.475c0.666-0.317,1.303-0.834,1.911-1.551
       l3.517,3.326c-1.08,1.301-2.281,2.205-3.606,2.714C16.438,18.972,14.957,19.227,13.321,19.227L13.321,19.227z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M31.517,19.227c-1.822,0-3.416-0.329-4.783-0.988
       c-1.366-0.658-2.425-1.575-3.176-2.751c-0.751-1.175-1.126-2.538-1.126-4.089c0-1.534,0.274-2.943,0.822-4.227
       c0.548-1.284,1.328-2.393,2.341-3.326c1.012-0.935,2.214-1.655,3.606-2.164c1.392-0.508,2.931-0.763,4.618-0.763
       c1.856,0,3.454,0.288,4.795,0.863s2.425,1.43,3.252,2.563l-4.276,3.276c-0.574-0.733-1.181-1.238-1.822-1.514
       c-0.641-0.274-1.383-0.412-2.227-0.412c-0.776,0-1.476,0.129-2.1,0.388c-0.624,0.259-1.16,0.625-1.607,1.101
       c-0.447,0.475-0.789,1.037-1.025,1.688s-0.354,1.368-0.354,2.151c0,0.684,0.156,1.284,0.468,1.801
       c0.312,0.517,0.759,0.917,1.341,1.2c0.582,0.283,1.278,0.425,2.087,0.425c0.675,0,1.35-0.112,2.025-0.337
       c0.675-0.226,1.366-0.613,2.075-1.163l2.252,4.201c-0.928,0.667-2.008,1.18-3.239,1.538C34.234,19.047,32.917,19.227,31.517,19.227
       L31.517,19.227z M33.693,16.25l1.342-6.652h5.188l-1.518,7.553L33.693,16.25L33.693,16.25L33.693,16.25z"/>
            <Polygon style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} points="44.755,18.826 47.361,5.896 42.173,5.896 43.11,1.319 
       59.457,1.319 58.521,5.896 53.333,5.896 50.727,18.826 44.755,18.826 44.755,18.826 	"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M6.446,26.922c-0.289,0-0.565-0.042-0.827-0.124
       c-0.262-0.083-0.473-0.189-0.631-0.319l0.238-0.532c0.148,0.116,0.331,0.213,0.55,0.29s0.442,0.116,0.671,0.116
       c0.194,0,0.351-0.021,0.47-0.063c0.12-0.042,0.208-0.1,0.264-0.172c0.056-0.071,0.085-0.153,0.085-0.245
       c0-0.112-0.04-0.203-0.122-0.271c-0.081-0.068-0.186-0.123-0.314-0.163c-0.129-0.041-0.271-0.078-0.428-0.111
       c-0.157-0.033-0.314-0.074-0.47-0.124c-0.157-0.049-0.3-0.111-0.431-0.187c-0.13-0.076-0.235-0.177-0.314-0.304
       c-0.079-0.127-0.119-0.288-0.119-0.485c0-0.2,0.054-0.384,0.161-0.551S5.5,23.375,5.72,23.274c0.22-0.1,0.499-0.149,0.838-0.149
       c0.222,0,0.442,0.027,0.661,0.084s0.409,0.137,0.571,0.242l-0.217,0.533c-0.166-0.099-0.336-0.172-0.513-0.219
       c-0.176-0.048-0.345-0.071-0.507-0.071c-0.187,0-0.34,0.022-0.46,0.068s-0.207,0.106-0.262,0.182
       c-0.055,0.076-0.082,0.159-0.082,0.251c0,0.112,0.04,0.203,0.119,0.271c0.079,0.068,0.183,0.122,0.312,0.161
       c0.129,0.038,0.272,0.075,0.431,0.11c0.158,0.035,0.315,0.076,0.47,0.124c0.155,0.048,0.298,0.109,0.428,0.185
       c0.13,0.075,0.235,0.176,0.314,0.301c0.079,0.125,0.119,0.284,0.119,0.478c0,0.196-0.054,0.379-0.161,0.546s-0.272,0.3-0.494,0.4
       S6.784,26.922,6.446,26.922L6.446,26.922z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M8.893,23.589c-0.123,0-0.225-0.039-0.304-0.116
       C8.51,23.396,8.47,23.301,8.47,23.188c0-0.105,0.04-0.196,0.119-0.273c0.079-0.078,0.18-0.116,0.304-0.116
       c0.123,0,0.225,0.036,0.304,0.107c0.079,0.072,0.119,0.165,0.119,0.277S9.277,23.391,9.2,23.47
       C9.122,23.549,9.02,23.589,8.893,23.589L8.893,23.589z M8.565,26.869v-2.816h0.655v2.816H8.565L8.565,26.869L8.565,26.869z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M10.97,26.906c-0.24,0-0.467-0.031-0.682-0.093S9.901,26.678,9.77,26.59
       l0.254-0.501c0.127,0.08,0.278,0.146,0.454,0.197c0.176,0.051,0.354,0.076,0.534,0.076c0.204,0,0.353-0.026,0.447-0.081
       s0.14-0.13,0.14-0.225c0-0.077-0.032-0.136-0.095-0.177c-0.063-0.04-0.146-0.071-0.248-0.092c-0.102-0.021-0.216-0.041-0.341-0.059
       s-0.25-0.041-0.375-0.071c-0.125-0.029-0.239-0.073-0.341-0.132c-0.102-0.058-0.185-0.136-0.248-0.234
       c-0.063-0.099-0.095-0.23-0.095-0.396c0-0.176,0.051-0.329,0.153-0.461c0.102-0.132,0.246-0.235,0.431-0.309
       c0.185-0.074,0.404-0.111,0.658-0.111c0.187,0,0.378,0.022,0.573,0.066s0.359,0.104,0.489,0.182L11.9,24.765
       c-0.13-0.077-0.264-0.131-0.402-0.161c-0.137-0.029-0.273-0.045-0.407-0.045c-0.197,0-0.345,0.029-0.444,0.088
       c-0.099,0.058-0.148,0.132-0.148,0.224c0,0.084,0.032,0.147,0.095,0.19c0.063,0.042,0.146,0.074,0.248,0.097
       c0.102,0.023,0.216,0.044,0.341,0.063s0.249,0.044,0.373,0.074c0.123,0.029,0.237,0.072,0.341,0.126
       c0.104,0.055,0.188,0.132,0.251,0.229c0.063,0.099,0.095,0.228,0.095,0.386c0,0.179-0.052,0.333-0.156,0.461
       c-0.104,0.129-0.25,0.229-0.439,0.301C11.46,26.87,11.234,26.906,10.97,26.906L10.97,26.906z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M12.439,24.58v-0.527h1.881v0.527H12.439L12.439,24.58L12.439,24.58z
        M13.876,26.906c-0.31,0-0.55-0.08-0.719-0.24c-0.169-0.16-0.254-0.395-0.254-0.704v-2.531h0.655v2.51
       c0,0.134,0.035,0.237,0.106,0.312c0.071,0.074,0.169,0.11,0.296,0.11c0.144,0,0.264-0.038,0.359-0.115l0.19,0.469
       c-0.081,0.063-0.178,0.111-0.291,0.143S13.993,26.906,13.876,26.906L13.876,26.906z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M16.276,26.906c-0.314,0-0.587-0.062-0.822-0.188
       s-0.416-0.295-0.544-0.512c-0.129-0.216-0.193-0.465-0.193-0.746s0.062-0.53,0.188-0.746c0.125-0.217,0.298-0.387,0.518-0.512
       s0.471-0.188,0.753-0.188c0.275,0,0.52,0.061,0.735,0.183c0.215,0.121,0.384,0.29,0.507,0.509c0.123,0.218,0.185,0.477,0.185,0.775
       c0,0.024-0.001,0.055-0.003,0.092s-0.004,0.069-0.008,0.098H15.24v-0.438h2.003l-0.264,0.137c0.004-0.158-0.029-0.3-0.098-0.425
       c-0.069-0.124-0.163-0.221-0.283-0.29c-0.12-0.068-0.261-0.103-0.423-0.103c-0.159,0-0.3,0.034-0.425,0.103
       c-0.125,0.069-0.221,0.166-0.288,0.293c-0.067,0.127-0.1,0.272-0.1,0.438v0.105c0,0.169,0.038,0.318,0.114,0.448
       c0.076,0.131,0.184,0.231,0.325,0.304s0.305,0.108,0.492,0.108c0.158,0,0.301-0.026,0.428-0.079s0.24-0.131,0.338-0.232
       l0.359,0.411c-0.13,0.147-0.292,0.261-0.484,0.338C16.742,26.867,16.522,26.906,16.276,26.906L16.276,26.906z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M18.242,26.869v-2.816h0.629v0.754l-0.116-0.227
       c0.095-0.18,0.233-0.318,0.415-0.417c0.182-0.098,0.39-0.147,0.626-0.147c0.264,0,0.493,0.065,0.687,0.195s0.322,0.33,0.386,0.602
       l-0.254-0.096c0.088-0.207,0.238-0.376,0.449-0.506s0.456-0.195,0.735-0.195c0.225,0,0.425,0.044,0.6,0.132
       c0.174,0.088,0.311,0.224,0.41,0.406c0.099,0.183,0.148,0.417,0.148,0.701v1.614H22.3V25.34c0-0.25-0.055-0.437-0.166-0.56
       s-0.269-0.185-0.473-0.185c-0.145,0-0.272,0.032-0.383,0.095c-0.111,0.063-0.197,0.158-0.259,0.282
       c-0.062,0.125-0.092,0.28-0.092,0.467v1.43h-0.655V25.34c0-0.25-0.055-0.437-0.166-0.56s-0.269-0.185-0.473-0.185
       c-0.145,0-0.272,0.032-0.383,0.095c-0.111,0.063-0.197,0.158-0.259,0.282c-0.062,0.125-0.093,0.28-0.093,0.467v1.43H18.242
       L18.242,26.869L18.242,26.869z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M24.652,26.906c-0.211,0-0.396-0.036-0.555-0.108
       c-0.159-0.072-0.281-0.172-0.367-0.301c-0.086-0.128-0.13-0.273-0.13-0.435c0-0.158,0.038-0.301,0.114-0.428
       c0.076-0.126,0.2-0.227,0.373-0.301c0.173-0.073,0.402-0.11,0.687-0.11h0.819v0.438h-0.771c-0.222,0-0.373,0.036-0.452,0.108
       c-0.079,0.072-0.119,0.162-0.119,0.271c0,0.116,0.048,0.209,0.143,0.279s0.227,0.105,0.396,0.105c0.162,0,0.307-0.037,0.436-0.11
       c0.129-0.074,0.223-0.183,0.283-0.327l0.106,0.396c-0.063,0.165-0.176,0.294-0.338,0.385C25.113,26.86,24.906,26.906,24.652,26.906
       L24.652,26.906z M25.54,26.869v-0.575l-0.032-0.116v-0.996c0-0.193-0.059-0.344-0.177-0.451c-0.118-0.107-0.297-0.161-0.536-0.161
       c-0.155,0-0.308,0.024-0.46,0.074c-0.151,0.049-0.282,0.118-0.391,0.205l-0.259-0.479c0.155-0.116,0.336-0.204,0.544-0.264
       s0.425-0.09,0.65-0.09c0.412,0,0.729,0.099,0.951,0.296c0.222,0.196,0.333,0.499,0.333,0.907v1.65H25.54L25.54,26.869L25.54,26.869
       z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M29.651,26.906c-0.271,0-0.515-0.061-0.732-0.18s-0.387-0.287-0.51-0.504
       c-0.123-0.216-0.185-0.47-0.185-0.762c0-0.288,0.062-0.541,0.185-0.76c0.123-0.218,0.293-0.387,0.51-0.506
       c0.217-0.12,0.461-0.18,0.732-0.18c0.236,0,0.447,0.052,0.634,0.156c0.187,0.104,0.335,0.262,0.444,0.475
       c0.109,0.212,0.164,0.484,0.164,0.814c0,0.327-0.053,0.598-0.158,0.812c-0.106,0.214-0.251,0.373-0.436,0.477
       S29.898,26.906,29.651,26.906L29.651,26.906z M29.73,26.347c0.159,0,0.3-0.036,0.425-0.108c0.125-0.071,0.225-0.176,0.301-0.311
       c0.076-0.136,0.114-0.291,0.114-0.467c0-0.18-0.038-0.335-0.114-0.467s-0.176-0.233-0.301-0.306s-0.267-0.108-0.425-0.108
       s-0.3,0.036-0.425,0.108s-0.225,0.174-0.301,0.306c-0.076,0.132-0.114,0.287-0.114,0.467c0,0.176,0.038,0.331,0.114,0.467
       c0.076,0.135,0.176,0.239,0.301,0.311C29.43,26.311,29.572,26.347,29.73,26.347L29.73,26.347z M30.592,26.869v-0.665l0.016-0.748
       l-0.053-0.749v-1.751h0.666v3.913H30.592L30.592,26.869L30.592,26.869z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M33.408,26.906c-0.314,0-0.587-0.062-0.822-0.188
       c-0.234-0.125-0.416-0.295-0.544-0.512c-0.129-0.216-0.193-0.465-0.193-0.746s0.063-0.53,0.188-0.746
       c0.125-0.217,0.298-0.387,0.518-0.512c0.22-0.125,0.471-0.188,0.753-0.188c0.275,0,0.52,0.061,0.734,0.183
       c0.215,0.121,0.384,0.29,0.507,0.509c0.123,0.218,0.185,0.477,0.185,0.775c0,0.024-0.001,0.055-0.003,0.092
       s-0.005,0.069-0.008,0.098h-2.352v-0.438h2.003l-0.264,0.137c0.003-0.158-0.029-0.3-0.098-0.425
       c-0.069-0.124-0.163-0.221-0.283-0.29c-0.12-0.068-0.261-0.103-0.423-0.103c-0.159,0-0.3,0.034-0.425,0.103
       c-0.125,0.069-0.221,0.166-0.288,0.293c-0.067,0.127-0.1,0.272-0.1,0.438v0.105c0,0.169,0.038,0.318,0.114,0.448
       c0.076,0.131,0.184,0.231,0.325,0.304c0.141,0.072,0.305,0.108,0.491,0.108c0.159,0,0.301-0.026,0.428-0.079
       s0.24-0.131,0.338-0.232l0.359,0.411c-0.13,0.147-0.291,0.261-0.484,0.338C33.874,26.867,33.655,26.906,33.408,26.906
       L33.408,26.906z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M38.598,26.922c-0.285,0-0.548-0.047-0.787-0.14
       c-0.24-0.094-0.448-0.227-0.626-0.398c-0.178-0.172-0.316-0.373-0.415-0.602s-0.148-0.481-0.148-0.759
       c0-0.278,0.049-0.531,0.148-0.76c0.099-0.229,0.238-0.429,0.417-0.602c0.18-0.172,0.389-0.305,0.629-0.397
       c0.24-0.094,0.502-0.14,0.787-0.14c0.303,0,0.579,0.052,0.83,0.155s0.462,0.258,0.634,0.461l-0.444,0.417
       c-0.137-0.145-0.289-0.252-0.454-0.324s-0.344-0.108-0.534-0.108c-0.194,0-0.371,0.032-0.531,0.095
       c-0.16,0.063-0.299,0.153-0.417,0.27c-0.118,0.116-0.211,0.253-0.277,0.411c-0.067,0.158-0.1,0.332-0.1,0.522
       c0,0.189,0.034,0.363,0.1,0.521c0.067,0.158,0.159,0.296,0.277,0.412c0.118,0.115,0.257,0.205,0.417,0.269
       c0.16,0.063,0.337,0.095,0.531,0.095c0.19,0,0.368-0.036,0.534-0.108c0.166-0.071,0.317-0.182,0.454-0.329l0.444,0.417
       c-0.173,0.203-0.384,0.358-0.634,0.464S38.904,26.922,38.598,26.922L38.598,26.922z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M41.753,26.906c-0.285,0-0.542-0.062-0.769-0.188
       c-0.227-0.125-0.406-0.296-0.536-0.515c-0.13-0.218-0.196-0.466-0.196-0.743c0-0.285,0.065-0.534,0.196-0.749
       c0.13-0.214,0.308-0.384,0.534-0.509s0.483-0.188,0.772-0.188c0.292,0,0.552,0.062,0.779,0.188
       c0.227,0.125,0.405,0.295,0.534,0.509c0.129,0.215,0.193,0.464,0.193,0.749c0,0.281-0.064,0.53-0.193,0.746
       c-0.129,0.217-0.308,0.387-0.536,0.512C42.301,26.844,42.042,26.906,41.753,26.906L41.753,26.906z M41.753,26.347
       c0.162,0,0.307-0.036,0.433-0.108c0.127-0.071,0.226-0.176,0.299-0.311c0.072-0.136,0.108-0.291,0.108-0.467
       c0-0.18-0.036-0.335-0.108-0.467s-0.172-0.233-0.299-0.306s-0.27-0.108-0.428-0.108s-0.301,0.036-0.428,0.108
       s-0.227,0.174-0.301,0.306s-0.111,0.287-0.111,0.467c0,0.176,0.037,0.331,0.111,0.467c0.074,0.135,0.174,0.239,0.301,0.311
       C41.457,26.311,41.598,26.347,41.753,26.347L41.753,26.347z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M43.898,26.869v-2.816h0.629v0.765l-0.111-0.237
       c0.095-0.18,0.237-0.318,0.425-0.417c0.188-0.098,0.406-0.147,0.653-0.147c0.229,0,0.431,0.044,0.605,0.132
       c0.174,0.088,0.313,0.224,0.417,0.406c0.104,0.183,0.156,0.417,0.156,0.701v1.614h-0.661V25.34c0-0.25-0.058-0.437-0.174-0.56
       c-0.116-0.123-0.282-0.185-0.497-0.185c-0.155,0-0.292,0.032-0.412,0.095c-0.12,0.063-0.212,0.158-0.277,0.282
       c-0.065,0.125-0.098,0.282-0.098,0.473v1.424H43.898L43.898,26.869L43.898,26.869z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M47.138,24.58v-0.527h1.881v0.527H47.138L47.138,24.58L47.138,24.58z
        M48.575,26.906c-0.31,0-0.55-0.08-0.719-0.24s-0.254-0.395-0.254-0.704v-2.531h0.655v2.51c0,0.134,0.035,0.237,0.106,0.312
       s0.169,0.11,0.296,0.11c0.145,0,0.264-0.038,0.359-0.115l0.19,0.469c-0.081,0.063-0.178,0.111-0.291,0.143
       C48.806,26.89,48.691,26.906,48.575,26.906L48.575,26.906z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M49.759,26.869v-2.816h0.629v0.775l-0.074-0.227
       c0.081-0.19,0.213-0.335,0.396-0.436c0.183-0.1,0.407-0.15,0.671-0.15v0.628c-0.025-0.004-0.049-0.006-0.074-0.008
       c-0.025-0.002-0.047-0.003-0.069-0.003c-0.254,0-0.454,0.072-0.603,0.216c-0.148,0.145-0.222,0.364-0.222,0.66v1.36H49.759
       L49.759,26.869L49.759,26.869z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M53.162,26.906c-0.285,0-0.542-0.062-0.769-0.188
       c-0.227-0.125-0.406-0.296-0.536-0.515c-0.13-0.218-0.196-0.466-0.196-0.743c0-0.285,0.065-0.534,0.196-0.749
       c0.13-0.214,0.308-0.384,0.534-0.509c0.225-0.125,0.483-0.188,0.772-0.188c0.292,0,0.552,0.062,0.779,0.188
       c0.227,0.125,0.405,0.295,0.534,0.509c0.129,0.215,0.193,0.464,0.193,0.749c0,0.281-0.064,0.53-0.193,0.746
       c-0.129,0.217-0.307,0.387-0.536,0.512C53.71,26.844,53.451,26.906,53.162,26.906L53.162,26.906z M53.162,26.347
       c0.162,0,0.307-0.036,0.433-0.108c0.127-0.071,0.226-0.176,0.299-0.311c0.072-0.136,0.108-0.291,0.108-0.467
       c0-0.18-0.036-0.335-0.108-0.467s-0.172-0.233-0.299-0.306s-0.27-0.108-0.428-0.108s-0.301,0.036-0.428,0.108
       s-0.227,0.174-0.301,0.306s-0.111,0.287-0.111,0.467c0,0.176,0.037,0.331,0.111,0.467c0.074,0.135,0.174,0.239,0.301,0.311
       C52.866,26.311,53.007,26.347,53.162,26.347L53.162,26.347z"/>
            <Polygon style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} points="55.308,26.869 55.308,22.956 55.963,22.956 55.963,26.869 
       55.308,26.869 55.308,26.869 	"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M4.647,33.234c-0.271,0-0.515-0.06-0.732-0.179
       c-0.217-0.12-0.387-0.288-0.51-0.504c-0.123-0.217-0.185-0.471-0.185-0.763c0-0.288,0.062-0.541,0.185-0.759
       c0.123-0.219,0.293-0.387,0.51-0.507c0.217-0.119,0.461-0.179,0.732-0.179c0.236,0,0.447,0.052,0.634,0.155
       s0.335,0.262,0.444,0.475s0.164,0.484,0.164,0.814c0,0.327-0.053,0.599-0.158,0.812c-0.106,0.215-0.251,0.374-0.436,0.478
       S4.893,33.234,4.647,33.234L4.647,33.234z M4.726,32.676c0.159,0,0.3-0.036,0.425-0.108s0.225-0.176,0.301-0.312
       c0.076-0.135,0.114-0.29,0.114-0.467c0-0.179-0.038-0.335-0.114-0.467s-0.176-0.233-0.301-0.306
       c-0.125-0.071-0.267-0.107-0.425-0.107s-0.3,0.036-0.425,0.107C4.176,31.089,4.075,31.19,4,31.322
       c-0.076,0.132-0.114,0.288-0.114,0.467c0,0.177,0.038,0.332,0.114,0.467c0.076,0.136,0.176,0.239,0.301,0.312
       S4.568,32.676,4.726,32.676L4.726,32.676z M5.588,33.197v-0.664l0.016-0.749l-0.053-0.749v-1.751h0.666v3.913H5.588L5.588,33.197
       L5.588,33.197z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M8.404,33.234c-0.314,0-0.587-0.062-0.822-0.188
       c-0.234-0.124-0.416-0.295-0.544-0.511c-0.129-0.217-0.193-0.465-0.193-0.747c0-0.281,0.063-0.529,0.188-0.746
       c0.125-0.216,0.298-0.387,0.518-0.512c0.22-0.124,0.471-0.187,0.753-0.187c0.275,0,0.52,0.061,0.734,0.182
       c0.215,0.121,0.384,0.291,0.507,0.509c0.123,0.218,0.185,0.477,0.185,0.775c0,0.024-0.001,0.056-0.003,0.093
       C9.726,31.939,9.724,31.973,9.72,32H7.368v-0.438h2.003L9.107,31.7c0.003-0.158-0.029-0.3-0.098-0.425s-0.163-0.222-0.283-0.29
       s-0.261-0.103-0.423-0.103c-0.159,0-0.3,0.034-0.425,0.103s-0.221,0.166-0.288,0.293c-0.067,0.126-0.1,0.272-0.1,0.438v0.105
       c0,0.169,0.038,0.318,0.114,0.448s0.184,0.231,0.325,0.303c0.141,0.072,0.305,0.108,0.491,0.108c0.159,0,0.301-0.026,0.428-0.079
       s0.24-0.13,0.338-0.232l0.359,0.412c-0.13,0.147-0.291,0.26-0.484,0.337C8.87,33.195,8.651,33.234,8.404,33.234L8.404,33.234z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M13.609,33.25c-0.289,0-0.554-0.046-0.795-0.14
       c-0.241-0.093-0.452-0.226-0.632-0.398c-0.18-0.172-0.319-0.372-0.417-0.601c-0.099-0.229-0.148-0.481-0.148-0.76
       c0-0.277,0.049-0.53,0.148-0.759c0.099-0.229,0.239-0.43,0.42-0.602s0.393-0.306,0.634-0.398c0.241-0.093,0.51-0.14,0.806-0.14
       c0.31,0,0.591,0.051,0.843,0.153c0.252,0.102,0.464,0.251,0.637,0.448l-0.433,0.422c-0.145-0.145-0.3-0.251-0.468-0.319
       c-0.167-0.068-0.351-0.103-0.552-0.103c-0.197,0-0.378,0.031-0.542,0.095s-0.306,0.153-0.425,0.269
       c-0.12,0.116-0.213,0.254-0.28,0.412c-0.067,0.158-0.1,0.332-0.1,0.521c0,0.187,0.034,0.359,0.1,0.52
       c0.067,0.16,0.16,0.298,0.28,0.414s0.261,0.206,0.423,0.269c0.162,0.063,0.342,0.096,0.539,0.096c0.183,0,0.36-0.029,0.531-0.087
       c0.171-0.059,0.334-0.156,0.489-0.293l0.386,0.512c-0.19,0.154-0.412,0.271-0.666,0.351S13.874,33.25,13.609,33.25L13.609,33.25z
        M15.052,32.781l-0.645-0.09v-1.377h0.645V32.781L15.052,32.781L15.052,32.781z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M17.219,33.234c-0.314,0-0.587-0.062-0.822-0.188
       c-0.234-0.124-0.416-0.295-0.544-0.511c-0.129-0.217-0.193-0.465-0.193-0.747c0-0.281,0.063-0.529,0.188-0.746
       c0.125-0.216,0.298-0.387,0.518-0.512c0.22-0.124,0.471-0.187,0.753-0.187c0.275,0,0.52,0.061,0.735,0.182
       c0.215,0.121,0.384,0.291,0.507,0.509c0.123,0.218,0.185,0.477,0.185,0.775c0,0.024-0.001,0.056-0.003,0.093
       c-0.002,0.036-0.004,0.069-0.008,0.097h-2.352v-0.438h2.003L17.922,31.7c0.004-0.158-0.029-0.3-0.098-0.425
       c-0.069-0.125-0.163-0.222-0.283-0.29c-0.12-0.068-0.261-0.103-0.423-0.103c-0.159,0-0.3,0.034-0.425,0.103
       s-0.221,0.166-0.288,0.293c-0.067,0.126-0.1,0.272-0.1,0.438v0.105c0,0.169,0.038,0.318,0.114,0.448s0.184,0.231,0.325,0.303
       c0.141,0.072,0.305,0.108,0.491,0.108c0.159,0,0.301-0.026,0.428-0.079s0.24-0.13,0.338-0.232l0.359,0.412
       c-0.13,0.147-0.292,0.26-0.484,0.337C17.685,33.195,17.465,33.234,17.219,33.234L17.219,33.234z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M20.057,33.234c-0.24,0-0.467-0.03-0.682-0.092s-0.388-0.137-0.518-0.225
       l0.254-0.501c0.127,0.081,0.278,0.146,0.454,0.198c0.176,0.051,0.354,0.076,0.534,0.076c0.204,0,0.353-0.027,0.447-0.082
       s0.14-0.129,0.14-0.224c0-0.077-0.032-0.137-0.095-0.177c-0.063-0.041-0.146-0.071-0.248-0.093
       c-0.102-0.021-0.216-0.04-0.341-0.058s-0.25-0.042-0.375-0.071c-0.125-0.03-0.239-0.074-0.341-0.132
       c-0.102-0.058-0.185-0.137-0.248-0.234c-0.063-0.099-0.095-0.23-0.095-0.396c0-0.177,0.051-0.33,0.153-0.462
       c0.102-0.132,0.246-0.234,0.431-0.309c0.185-0.073,0.404-0.11,0.658-0.11c0.187,0,0.378,0.021,0.573,0.065
       c0.195,0.044,0.359,0.104,0.489,0.183l-0.259,0.501c-0.13-0.078-0.264-0.132-0.402-0.161c-0.137-0.03-0.273-0.045-0.407-0.045
       c-0.197,0-0.345,0.029-0.444,0.087c-0.099,0.058-0.148,0.133-0.148,0.225c0,0.084,0.032,0.147,0.095,0.189
       c0.063,0.042,0.146,0.074,0.248,0.098c0.102,0.022,0.216,0.044,0.341,0.063s0.249,0.044,0.373,0.073
       c0.123,0.03,0.237,0.072,0.341,0.127s0.188,0.131,0.251,0.229c0.063,0.099,0.095,0.227,0.095,0.385c0,0.18-0.052,0.333-0.156,0.462
       c-0.104,0.128-0.25,0.229-0.439,0.3C20.547,33.198,20.321,33.234,20.057,33.234L20.057,33.234z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M21.526,30.909v-0.527h1.881v0.527H21.526L21.526,30.909L21.526,30.909z
        M22.963,33.234c-0.31,0-0.55-0.08-0.719-0.24c-0.169-0.159-0.254-0.395-0.254-0.704v-2.531h0.655v2.511
       c0,0.134,0.035,0.237,0.106,0.311c0.071,0.074,0.169,0.111,0.296,0.111c0.144,0,0.264-0.039,0.359-0.116l0.19,0.47
       c-0.081,0.063-0.178,0.11-0.291,0.143C23.194,33.219,23.079,33.234,22.963,33.234L22.963,33.234z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M24.475,29.917c-0.123,0-0.225-0.038-0.304-0.116
       c-0.079-0.077-0.119-0.172-0.119-0.284c0-0.105,0.04-0.197,0.119-0.274s0.181-0.116,0.304-0.116c0.123,0,0.225,0.036,0.304,0.108
       c0.079,0.072,0.119,0.164,0.119,0.276c0,0.113-0.039,0.209-0.116,0.288C24.703,29.878,24.601,29.917,24.475,29.917L24.475,29.917z
        M24.147,33.197v-2.815h0.655v2.815H24.147L24.147,33.197L24.147,33.197z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M26.943,33.234c-0.285,0-0.542-0.062-0.769-0.188
       c-0.227-0.124-0.406-0.296-0.536-0.514c-0.13-0.218-0.196-0.466-0.196-0.744c0-0.284,0.065-0.534,0.196-0.748
       c0.13-0.215,0.308-0.385,0.534-0.51c0.225-0.124,0.483-0.187,0.772-0.187c0.292,0,0.552,0.062,0.779,0.187
       c0.227,0.125,0.405,0.295,0.534,0.51c0.129,0.214,0.193,0.464,0.193,0.748c0,0.282-0.064,0.53-0.193,0.747
       c-0.129,0.216-0.307,0.387-0.536,0.511C27.49,33.172,27.231,33.234,26.943,33.234L26.943,33.234z M26.943,32.676
       c0.162,0,0.307-0.036,0.433-0.108s0.226-0.176,0.299-0.312c0.072-0.135,0.108-0.29,0.108-0.467c0-0.179-0.036-0.335-0.108-0.467
       s-0.172-0.233-0.299-0.306c-0.127-0.071-0.27-0.107-0.428-0.107s-0.301,0.036-0.428,0.107c-0.127,0.072-0.227,0.174-0.301,0.306
       s-0.111,0.288-0.111,0.467c0,0.177,0.037,0.332,0.111,0.467c0.074,0.136,0.174,0.239,0.301,0.312S26.787,32.676,26.943,32.676
       L26.943,32.676z M26.493,29.996l0.713-0.723h0.782l-0.925,0.723H26.493L26.493,29.996L26.493,29.996z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M29.088,33.197v-2.815h0.629v0.765l-0.111-0.237
       c0.095-0.18,0.237-0.318,0.425-0.417c0.188-0.099,0.406-0.147,0.653-0.147c0.229,0,0.431,0.044,0.605,0.132
       c0.174,0.088,0.313,0.223,0.417,0.406c0.104,0.183,0.156,0.416,0.156,0.701v1.613h-0.661v-1.529c0-0.249-0.058-0.436-0.174-0.559
       c-0.116-0.123-0.282-0.185-0.497-0.185c-0.155,0-0.292,0.031-0.412,0.095c-0.12,0.063-0.212,0.157-0.277,0.282
       c-0.065,0.125-0.098,0.282-0.098,0.472v1.424H29.088L29.088,33.197L29.088,33.197z"/>
            <Polygon style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} points="34.97,33.197 34.97,30.086 33.744,30.086 33.744,29.506 
       36.883,29.506 36.883,30.086 35.657,30.086 35.657,33.197 34.97,33.197 34.97,33.197 	"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M38.373,33.234c-0.314,0-0.587-0.062-0.822-0.188
       c-0.234-0.124-0.416-0.295-0.544-0.511c-0.129-0.217-0.193-0.465-0.193-0.747c0-0.281,0.063-0.529,0.188-0.746
       c0.125-0.216,0.298-0.387,0.518-0.512c0.22-0.124,0.471-0.187,0.753-0.187c0.275,0,0.52,0.061,0.734,0.182
       c0.215,0.121,0.384,0.291,0.507,0.509c0.123,0.218,0.185,0.477,0.185,0.775c0,0.024-0.001,0.056-0.003,0.093
       c-0.002,0.036-0.005,0.069-0.008,0.097h-2.352v-0.438h2.003L39.076,31.7c0.004-0.158-0.029-0.3-0.098-0.425
       c-0.069-0.125-0.163-0.222-0.283-0.29c-0.12-0.068-0.261-0.103-0.423-0.103c-0.159,0-0.3,0.034-0.425,0.103
       s-0.221,0.166-0.288,0.293c-0.067,0.126-0.1,0.272-0.1,0.438v0.105c0,0.169,0.038,0.318,0.114,0.448
       c0.076,0.13,0.184,0.231,0.325,0.303c0.141,0.072,0.305,0.108,0.491,0.108c0.159,0,0.301-0.026,0.428-0.079s0.24-0.13,0.338-0.232
       l0.359,0.412c-0.13,0.147-0.292,0.26-0.484,0.337C38.839,33.195,38.62,33.234,38.373,33.234L38.373,33.234z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M40.339,33.197v-2.815h0.629v0.774l-0.074-0.227
       c0.081-0.189,0.213-0.335,0.396-0.435c0.183-0.101,0.407-0.15,0.671-0.15v0.627c-0.025-0.003-0.049-0.006-0.074-0.008
       c-0.025-0.001-0.048-0.002-0.069-0.002c-0.254,0-0.454,0.071-0.602,0.216c-0.148,0.145-0.222,0.364-0.222,0.659v1.36H40.339
       L40.339,33.197L40.339,33.197z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M42.506,33.197v-2.815h0.629v0.774l-0.074-0.227
       c0.081-0.189,0.213-0.335,0.396-0.435c0.183-0.101,0.407-0.15,0.671-0.15v0.627c-0.025-0.003-0.049-0.006-0.074-0.008
       c-0.025-0.001-0.047-0.002-0.069-0.002c-0.254,0-0.454,0.071-0.602,0.216s-0.222,0.364-0.222,0.659v1.36H42.506L42.506,33.197
       L42.506,33.197z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M45,29.917c-0.123,0-0.225-0.038-0.304-0.116
       c-0.079-0.077-0.119-0.172-0.119-0.284c0-0.105,0.04-0.197,0.119-0.274c0.079-0.077,0.181-0.116,0.304-0.116
       c0.123,0,0.224,0.036,0.304,0.108c0.079,0.072,0.119,0.164,0.119,0.276c0,0.113-0.039,0.209-0.116,0.288
       C45.229,29.878,45.127,29.917,45,29.917L45,29.917z M44.672,33.197v-2.815h0.655v2.815H44.672L44.672,33.197L44.672,33.197z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M45.719,30.909v-0.527H47.6v0.527H45.719L45.719,30.909L45.719,30.909z
        M47.156,33.234c-0.31,0-0.55-0.08-0.719-0.24c-0.169-0.159-0.254-0.395-0.254-0.704v-2.531h0.655v2.511
       c0,0.134,0.035,0.237,0.106,0.311c0.071,0.074,0.169,0.111,0.296,0.111c0.145,0,0.264-0.039,0.359-0.116l0.19,0.47
       c-0.081,0.063-0.178,0.11-0.291,0.143C47.387,33.219,47.272,33.234,47.156,33.234L47.156,33.234z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M49.497,33.234c-0.285,0-0.542-0.062-0.769-0.188
       c-0.227-0.124-0.406-0.296-0.536-0.514c-0.13-0.218-0.196-0.466-0.196-0.744c0-0.284,0.065-0.534,0.196-0.748
       c0.13-0.215,0.308-0.385,0.534-0.51c0.225-0.124,0.483-0.187,0.772-0.187c0.292,0,0.552,0.062,0.779,0.187
       c0.227,0.125,0.405,0.295,0.534,0.51c0.129,0.214,0.193,0.464,0.193,0.748c0,0.282-0.064,0.53-0.193,0.747
       c-0.129,0.216-0.307,0.387-0.536,0.511C50.045,33.172,49.786,33.234,49.497,33.234L49.497,33.234z M49.497,32.676
       c0.162,0,0.307-0.036,0.433-0.108s0.226-0.176,0.299-0.312c0.072-0.135,0.108-0.29,0.108-0.467c0-0.179-0.036-0.335-0.108-0.467
       s-0.172-0.233-0.299-0.306c-0.127-0.071-0.27-0.107-0.428-0.107c-0.158,0-0.301,0.036-0.428,0.107
       c-0.127,0.072-0.227,0.174-0.301,0.306s-0.111,0.288-0.111,0.467c0,0.177,0.037,0.332,0.111,0.467
       c0.074,0.136,0.174,0.239,0.301,0.312C49.202,32.64,49.342,32.676,49.497,32.676L49.497,32.676z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M51.643,33.197v-2.815h0.629v0.774l-0.074-0.227
       c0.081-0.189,0.213-0.335,0.396-0.435c0.183-0.101,0.407-0.15,0.671-0.15v0.627c-0.025-0.003-0.049-0.006-0.074-0.008
       c-0.025-0.001-0.048-0.002-0.069-0.002c-0.254,0-0.454,0.071-0.602,0.216s-0.222,0.364-0.222,0.659v1.36H51.643L51.643,33.197
       L51.643,33.197z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M54.137,29.917c-0.123,0-0.225-0.038-0.304-0.116
       c-0.079-0.077-0.119-0.172-0.119-0.284c0-0.105,0.04-0.197,0.119-0.274s0.181-0.116,0.304-0.116c0.123,0,0.225,0.036,0.304,0.108
       c0.079,0.072,0.119,0.164,0.119,0.276c0,0.113-0.039,0.209-0.116,0.288C54.366,29.878,54.264,29.917,54.137,29.917L54.137,29.917z
        M53.81,33.197v-2.815h0.655v2.815H53.81L53.81,33.197L53.81,33.197z"/>
            <Path style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} d="M56.188,33.234c-0.211,0-0.396-0.036-0.555-0.108
       c-0.159-0.071-0.281-0.172-0.367-0.3c-0.086-0.129-0.13-0.273-0.13-0.436c0-0.158,0.038-0.301,0.114-0.427
       c0.076-0.127,0.2-0.228,0.373-0.301c0.173-0.074,0.402-0.111,0.687-0.111h0.819v0.438h-0.771c-0.222,0-0.373,0.036-0.452,0.107
       c-0.079,0.072-0.119,0.163-0.119,0.271c0,0.116,0.048,0.21,0.143,0.28s0.227,0.105,0.396,0.105c0.162,0,0.307-0.037,0.436-0.111
       c0.129-0.073,0.223-0.183,0.283-0.327l0.106,0.396c-0.063,0.166-0.176,0.294-0.338,0.386
       C56.649,33.188,56.441,33.234,56.188,33.234L56.188,33.234z M57.076,33.197v-0.574l-0.032-0.116V31.51
       c0-0.193-0.059-0.344-0.177-0.451c-0.118-0.106-0.297-0.16-0.536-0.16c-0.155,0-0.308,0.024-0.46,0.073
       c-0.152,0.05-0.282,0.118-0.391,0.206l-0.259-0.479c0.155-0.116,0.336-0.204,0.544-0.264c0.208-0.061,0.425-0.09,0.65-0.09
       c0.412,0,0.729,0.098,0.951,0.295c0.222,0.197,0.333,0.499,0.333,0.907v1.65H57.076L57.076,33.197L57.076,33.197z"/>
            <Polygon style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} points="58.545,33.197 58.545,29.284 59.2,29.284 59.2,33.197 
       58.545,33.197 58.545,33.197 	"/>
            <Polygon style={{ clipPath: "url(#SVGID_2_)", fill: "#088473" }} points="61.036,21.692 0.516,21.692 1.694,20.493 62.142,20.493 
       61.036,21.692 	"/>
        </G>
    </Svg>
}

const GOBLOGO = () => {
    return <Image src={gobLogo} style={{ width: '2.02cm', height: '1.89cm' }} />
}

export default PDFModel