import { useState } from "react"
import { createPortal } from "react-dom"
import { RiCloseCircleFill } from "react-icons/ri"
import styled from "styled-components"

type ModalProps = {
    children: React.ReactNode
    isOpen: boolean
    onClose: () => void
    title: string,
    width?: string,
}   

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    return {
        isOpen,
        setIsOpen,
    }
}

export const Modal = ({ children, isOpen, onClose, title, width }: ModalProps) => {

    if (!isOpen) return null

    const portal = createPortal(<ModalContainer isOpen={isOpen}>
        <ModalContent width={width}>
            <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <ModalCloseButton onClick={onClose}>
                    <RiCloseCircleFill size={24} />
                </ModalCloseButton>
            </ModalHeader>
            {children}
        </ModalContent>
    </ModalContainer>, document.getElementById('modal-root') as HTMLElement)

    return portal
}

const ModalContainer = styled.div<{
    isOpen: boolean
}>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 24px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    scale: ${({ isOpen }) => isOpen ? '1' : '0'};
    display: grid;
    place-items: center;
    transition: scale 0.3s ease-in-out;
`

const ModalContent = styled.div<{
    width?: string,
}>`
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    width: ${({ width }) => width || '400px'};
`

const ModalHeader = styled.div`
    display: flex;
    color: var(--text-secondary);
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`

const ModalTitle = styled.h2`
    font-size: 24px;
    font-weight: 600;
    color: var(--text-secondary);
`

const ModalCloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
`