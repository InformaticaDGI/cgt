import styled from "styled-components"
import Text from "../Ui/Text/Text";

export type Stage = "pending" | "inProgress" | "completed"

const StageValues: Record<Stage, string> = {
    pending: "Pendiente",
    inProgress: "En progreso",
    completed: "Completado"
}

const StatusColors: Record<Stage, string> = {
    pending: "#FFA500",
    inProgress: "#FF4500",
    completed: "#25C330"
}

const StatusBadge = ({ variant = "pending" }: { variant?: Stage }) => {


    return (
        <$StyledBadge $variant={variant}>
            <Text style={{ fontSize: '12px', fontWeight: '600', color: "#ffffff" }}>{StageValues[variant]}</Text>
        </$StyledBadge>
    )
}

export default StatusBadge

const $StyledBadge = styled.div<{ $variant?: Stage }>`
    display: flex;
    background: ${props => StatusColors[props.$variant || "pending"]};
    padding: 8px 30px;
    border-radius: 0.5rem;
`;

