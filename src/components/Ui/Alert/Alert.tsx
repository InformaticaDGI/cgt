import { AlertCircleIcon, AlertTriangleIcon, CheckIcon, InfoIcon, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import styled from "styled-components"

let alertContainer: HTMLDivElement | null = null

function ensureAlertContainer() {
    if (!alertContainer) {
        alertContainer = document.createElement("div")
        alertContainer.id = "global-alert-container"
        alertContainer.style.position = "fixed"
        alertContainer.style.top = "0"
        alertContainer.style.right = "0"
        alertContainer.style.width = "300px"
        alertContainer.style.height = "100px"
        alertContainer.style.zIndex = "1000"
        alertContainer.style.display = "flex"
        alertContainer.style.alignItems = "center"
        alertContainer.style.justifyContent = "center"
        alertContainer.style.gap = "12px"
        document.body.appendChild(alertContainer)
    }
    return alertContainer
}

export function renderGlobalAlert(element: React.ReactNode): () => void {
    // @ts-ignore
    ensureAlertContainer()
    import("react-dom").then(ReactDOM => {
        if (alertContainer) {
            ReactDOM.createPortal(element, alertContainer)
        }
    })
    return () => {
        unmountGlobalAlert()
    }
}

export function unmountGlobalAlert() {
    if (alertContainer) {
        import("react-dom").then(() => {
            if (alertContainer) {
                document.body.removeChild(alertContainer)
            }
            alertContainer = null
        });
    }
}

type AlertProps = {
    variant: "success" | "error" | "warning" | "info" | "default"
    title?: string
    description?: string
    children?: React.ReactNode
    onClose?: () => void
}

export const useAlert = (props: AlertProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [alertProps] = useState<AlertProps>(props)
    const [unmount, setUnmount] = useState<(() => void) | null>(null)

    const show = () => {
        setIsOpen(true)
    }

    const hide = () => {
        setIsOpen(false)
        if (unmount) {
            unmount()
            setUnmount(null)
        } else {
            unmountGlobalAlert()
        }
    }

    useEffect(() => {
        if (isOpen && alertProps) {
            const unmountFn = renderGlobalAlert(
                <Alert
                    {...alertProps}
                    isOpen={isOpen}
                    show={() => setIsOpen(true)}
                    hide={hide}
                />
            )
            setUnmount(() => unmountFn)
        }
        // Clean up on unmount
        return () => {
            if (unmount) unmount()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, alertProps])

    return { show, hide, isOpen }
}

const Alert = ({ variant, title, description, children, onClose, isOpen, show, hide }: AlertProps & { isOpen: boolean, show: () => void, hide: () => void }) => {
    useEffect(() => {
        if (isOpen) show()
        else hide()
    }, [isOpen])

    return <AlertWrapper variant={variant}>
        <AlertIcon>
            {variant === "success" && <CheckIcon />}
            {variant === "error" && <XIcon />}
            {variant === "warning" && <AlertTriangleIcon />}
            {variant === "info" && <InfoIcon />}
            {variant === "default" && <AlertCircleIcon />}
        </AlertIcon>
        <AlertContent>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </AlertContent>
        {children}
        <AlertCloseButton onClick={hide}>
            <XIcon size={16} />
        </AlertCloseButton>
    </AlertWrapper>
}

const AlertCloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
    cursor: pointer;
`

const AlertIcon = styled.div`
    width: 24px;
    height: 24px;
`

const AlertContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const AlertTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
`

const AlertDescription = styled.p`
    font-size: 14px;
    font-weight: 400;
`

const AlertWrapper = styled.div<AlertProps>`
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    transition: all 0.3s ease;
    background-color: ${({ variant }) => variant === "success" ? "var(--alert-success)" : variant === "error" ? "var(--alert-error)" : variant === "warning" ? "var(--alert-warning)" : variant === "info" ? "var(--alert-info)" : "var(--alert-default)"};
`