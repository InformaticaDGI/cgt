import { AlertCircleIcon, AlertTriangleIcon, CheckIcon, InfoIcon, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

class AlertContainerSingleton {
    private static instance: HTMLDivElement | null = null;

    static getInstance(): HTMLDivElement {
        if (!AlertContainerSingleton.instance) {
            const container = document.createElement("div");
            container.id = "global-alert-container";
            container.style.position = "fixed";
            container.style.top = "0";
            container.style.right = "0";
            container.style.width = "300px";
            container.style.height = "100px";
            container.style.zIndex = "1000";
            container.style.display = "flex";
            container.style.alignItems = "center";
            container.style.justifyContent = "center";
            container.style.gap = "12px";
            document.getElementById("root")?.appendChild(container);
            AlertContainerSingleton.instance = container;
        }
        return AlertContainerSingleton.instance;
    }

    static clearInstance() {
        if (AlertContainerSingleton.instance) {
            if (AlertContainerSingleton.instance.parentNode) {
                AlertContainerSingleton.instance.parentNode.removeChild(AlertContainerSingleton.instance);
            }
            AlertContainerSingleton.instance = null;
        }
    }
}

export function renderGlobalAlert(element: React.ReactNode): () => void {
    createPortal(element, AlertContainerSingleton.getInstance())
    return () => {
        unmountGlobalAlert()
    }
}

export function unmountGlobalAlert() {
    AlertContainerSingleton.clearInstance()
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
        if (isOpen) {
            const unmountFn = renderGlobalAlert(
                <Alert
                    {...alertProps}
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

const Alert = ({ variant, title, description, children, hide }: AlertProps & { hide: () => void }) => {


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