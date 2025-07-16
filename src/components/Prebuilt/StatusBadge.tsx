import styled from "styled-components"
import Text from "../Ui/Text/Text";

export type Stage = 'pending' | 'in_progress' | 'completed' | 'cancelled'

const StageValues: Record<Stage, string> = {
    pending: "Pendiente",
    in_progress: "En progreso",
    completed: "Completado",
    cancelled: "Cancelado"
}

const StatusColors: Record<Stage, string> = {
    pending: "#9f9f9f",
    in_progress: "#FF7F00",
    completed: "var(--primary)",
    cancelled: "#DC2626"
}

const StatusBadge = ({ variant = "pending" }: { variant?: Stage }) => {


    return (
        <$StyledBadge $variant={variant}>
            <Text style={{ fontSize: '12px', fontWeight: '600', color: '#ffffff' }}>{StageValues[variant]}</Text>
        </$StyledBadge>
    )
}

export default StatusBadge

const $StyledBadge = styled.div<{ $variant?: Stage }>`
    display: flex;
    background: ${props => StatusColors[props.$variant || "pending"]};
    padding: 4px 15px;
    border-radius: 0.8rem;
`;

