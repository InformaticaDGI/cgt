import styled from "styled-components"

export const Select = ({ options, value, onChange, placeholder, style }: SelectProps) => {
    return (
        <$Container style={style}>
            <$StyledSelect value={value} onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => onChange?.(evt.target.value)}>
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
            </$StyledSelect>
            <$ArrowIcon />
        </$Container>
    );
}

type SelectProps = {
    options: { value: string, label: string }[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    style?: React.CSSProperties
}

const $StyledSelect = styled.select`
    width: 100%;
    height: 40px;
    border-radius: var(--border-radius);
    border: 1px solid var(--primary);
    padding: 0 12px;
    color: var(--text-secondary);
    background-color: var(--input-background);
    outline: none;
    transition: border-color 0.2s;
    font-size: var(--input-font-size);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 36px; /* Space for the custom arrow */
    cursor: pointer;

    &:focus {
        border-color: var(--primary);
        background-color: var(--input-background-focus);
    }
`

const $Container = styled.div`
    position: relative;
    width: 100%;
`;

const $ArrowIcon = styled.div`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--text-secondary);
`;