import React from "react";
import { Input } from "../Ui/Input/Input";

type CurrencyInputProps = {
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    name?: string;
    maxLength?: number;
    disabled?: boolean;
};

function formatCurrencyBdv(rawValue: string) {
    // Elimina todo lo que no sea número
    let clean = rawValue.replace(/\D/g, "");

    // Si no hay nada, muestra 0,00
    if (!clean) return "0,00";

    // Elimina ceros a la izquierda, pero deja al menos uno
    clean = clean.replace(/^0+/, "") || "0";

    // Si hay menos de 3 dígitos, rellena a la izquierda
    while (clean.length < 3) {
        clean = "0" + clean;
    }

    // Separa decimales
    const integer = clean.slice(0, -2);
    const decimal = clean.slice(-2);

    // Formatea miles
    const integerFormatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${integerFormatted},${decimal}`;
}

// Devuelve el valor crudo en centavos (ej: "123456" para 1.234,56)
function getRawValue(formattedValue: string) {
    return formattedValue.replace(/\D/g, "");
}

// Si quieres el valor en float (ej: "1234.56" para guardar en la DB)
export function getFloatValue(formattedValue: string) {
    const raw = getRawValue(formattedValue);
    if (!raw) return 0;
    const integer = raw.slice(0, -2) || "0";
    const decimal = raw.slice(-2);
    return parseFloat(`${integer}.${decimal}`);
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
    value,
    onChange,
    placeholder,
    name,
    maxLength,
    disabled
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formatted = formatCurrencyBdv(rawValue);
        onChange(formatted);
    };

    return (
        <Input
            type="text"
            inputMode="decimal"
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={maxLength}
            autoComplete="off"
            disabled={disabled}
        />
    );
};