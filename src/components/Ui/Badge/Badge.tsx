import styled from "styled-components"
import Text from "../Text/Text";
import useTerritorialSecretaryById from "../../../hooks/useTerritorialSecretaryById";
import { TRANSFORMATIONS } from "../../../utils/libs";

export type StatusInfo = "economy" | "ecology" | "social" | "services" | "policy" | "security"

const Statuses = {
    social: "Social",
    economy: "Economia",
    ecology: "Ecologia",
    services: "Servicios",
    policy: "Política",
    security: "Seguridad"
}

const COLORS: Record<StatusInfo, string> = {
    social: "#FF6B35",      // Naranja cálido y moderno
    economy: "#FFD93D",      // Amarillo dorado vibrante
    ecology: "#4ECDC4",      // Teal claro que complementa el primario
    services: "#6C5CE7",     // Púrpura moderno
    policy: "#E74C3C",       // Rojo coral suave
    security: "#00B894"      // Verde esmeralda moderno
}

const Badge = ({ parentId }: { parentId: string }) => {

    const { data, isLoading, isError } = useTerritorialSecretaryById(parentId)

    if (isLoading) return <Text style={{ fontSize: '12px', fontWeight: '600', color: "#ffffff" }}>Cargando...</Text>

    if (isError) return <Text style={{ fontSize: '12px', fontWeight: '600', color: "#ffffff" }}>Error</Text>

    const type = TRANSFORMATIONS[data?.id || '']

    return (
        <$StyledBadge $variant={type}>
            <Text style={{ fontSize: '12px', fontWeight: '600', color: "#ffffff" }}>{Statuses[type]}</Text>
        </$StyledBadge>
    )
}

export default Badge

const $StyledBadge = styled.div<{ $variant?: StatusInfo }>`
    display: flex;
    background: ${props => COLORS[props.$variant || 'social']};
    padding: 8px 30px;
    border-radius: 0.5rem;
`;

