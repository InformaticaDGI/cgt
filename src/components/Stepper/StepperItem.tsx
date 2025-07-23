import { MdChevronRight } from "react-icons/md";
import styled from "styled-components";

const StepperItem = ({ onClick, isLast = false, icon, isActive = false, isDone = false, children }: { onClick?: () => void, isLast?: boolean, icon?: React.ReactNode, isActive?: boolean, isDone?: boolean, children: React.ReactNode }) => {

    return (
        <>
            <StyledStepperItem $is_active={isActive} $is_done={isDone} onClick={onClick}>
                <StepperItemWrapper>
                    {icon && icon}
                    {children}
                </StepperItemWrapper>
            </StyledStepperItem>
            {!isLast && <StyledStepperIcon>
                <MdChevronRight style={{ color: "#acacac", width: "2.5em", height: "2.5em" }} />
            </StyledStepperIcon>}
        </>
    )
}

const StepperItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.2em;
    font-weight: 500;
`


const StyledStepperIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 3em;
`

const StyledStepperItem = styled.div<{ $is_active?: boolean, $is_done?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    background-color: ${({ $is_active, $is_done }) => $is_active ? "var(--primary)" : $is_done ? "#dcfce7" : "transparent"};
    color: ${({ $is_active, $is_done }) => $is_active ? "var(--background)" : $is_done ? "#15803d" : "#acacac"};
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    cursor: ${({ $is_active, $is_done }) => ($is_active === false && $is_done === false) ? "not-allowed" : "pointer"};

    &:hover {
        background-color: ${({ $is_done }) => $is_done && "#caf1d8"};
    }
`

export default StepperItem;