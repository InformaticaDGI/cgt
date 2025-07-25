import styled from "styled-components"

export const Select = ({ options, value, onChange, placeholder, style }: SelectProps) => {
    return <$StyledSelect value={value} onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => onChange?.(evt.target.value)} style={style}>
        <option value="">{placeholder || 'Seleccione una opción'}</option>
        {options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
    </$StyledSelect>
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
    background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 20 20' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M5.516 7.548a1 1 0 0 1 1.415-.032L10 10.293l3.07-2.777a1 1 0 1 1 1.383 1.447l-3.777 3.414a1 1 0 0 1-1.32 0L5.548 8.963a1 1 0 0 1-.032-1.415z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 20px 20px;
    padding-right: 36px;
    cursor: pointer;

    &:focus {
        border-color: var(--primary);
        background-color: var(--input-background-focus);
    }
`