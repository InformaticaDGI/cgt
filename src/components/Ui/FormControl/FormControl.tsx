import styled from "styled-components"

export const FormControl = ({ children, label, required = false, error }: FormControlProps) => {
    return <StyledFormControl>
        <label>{label} {required && <span className="required">*</span>}</label>
        <div className="form-control-content">
            {children}
        </div>
        {error && <div className="form-control-error">
            <span className="form-control-error-message">
                {error}
            </span>
        </div>}
    </StyledFormControl>
}

type FormControlProps = {
    children: React.ReactNode
    label: string
    required?: boolean
    error?: string
}

const StyledFormControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    align-items: flex-start;
    label {
        font-size: 12px;
        font-weight: 500;
        color: var(--text-secondary);
    }
    .form-control-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
    }
    .required {
        color: var(--error);
    }
    .form-control-error {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .form-control-error-message {
        font-size: 12px;
        color: var(--error);
    }
`