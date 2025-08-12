import React, { useState, useMemo, useEffect, useRef } from 'react';
import styled from 'styled-components';

export const SearchableMultiSelect = ({ options, value, onChange, placeholder, style }: SearchableMultiSelectProps) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const optionsListRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);


    const filteredOptions = useMemo(() => {
        if (!searchTerm) {
            return options;
        }
        return options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm]);

    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(-1);
        }
    }, [searchTerm, isOpen]);

    useEffect(() => {
        if (highlightedIndex >= 0 && optionsListRef.current) {
            const item = optionsListRef.current.children[highlightedIndex] as HTMLLIElement;
            if (item) {
                item.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [highlightedIndex]);

    const handleSelect = (selectedValue: string) => {
        const newSelected = value?.includes(selectedValue)
            ? value.filter(v => v !== selectedValue)
            : [...(value || []), selectedValue];
        onChange?.(newSelected);
        setSearchTerm('');
        inputRef.current?.focus();
    };

    const handleRemove = (removedValue: string) => {
        const newSelected = value?.filter(v => v !== removedValue) || [];
        onChange?.(newSelected);
    };

    const handleSelectAll = () => {
        const currentSelected = value || [];
        const filteredValues = filteredOptions.map(option => option.value);
        
        // Check if all filtered options are already selected
        const allSelected = filteredValues.every(val => currentSelected.includes(val));
        
        if (allSelected) {
            // If all are selected, deselect all filtered options
            const newSelected = currentSelected.filter(val => !filteredValues.includes(val));
            onChange?.(newSelected);
        } else {
            // If not all are selected, select all filtered options
            const newSelected = [...new Set([...currentSelected, ...filteredValues])];
            onChange?.(newSelected);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            return;
        }

        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                    handleSelect(filteredOptions[highlightedIndex].value);
                }
                break;
            case 'Backspace':
                if (searchTerm === '' && value && value.length > 0) {
                    e.preventDefault();
                    handleRemove(value[value.length - 1]);
                }
                break;
            default:
                break;
        }
    };

    const selectedOptions = useMemo(() => {
        return options.filter(option => value?.includes(option.value));
    }, [options, value]);

    // Check if all filtered options are selected
    const allFilteredSelected = useMemo(() => {
        const currentSelected = value || [];
        const filteredValues = filteredOptions.map(option => option.value);
        return filteredValues.length > 0 && filteredValues.every(val => currentSelected.includes(val));
    }, [filteredOptions, value]);

    return (
        <$Container style={style}>
            <$InputContainer isOpen={isOpen} onClick={() => inputRef.current?.focus()}>

                {selectedOptions.map(option => (
                    <$Pill key={option.value}>
                        {option.label}
                        <$PillRemoveButton
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleRemove(option.value)}
                        >
                            &times;
                        </$PillRemoveButton>
                    </$Pill>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to allow click on options
                    onKeyDown={handleKeyDown}
                />
                <$ArrowIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </$InputContainer>
            {isOpen && (
                <$OptionsList ref={optionsListRef}>
                    {filteredOptions.length > 0 ? (
                        <>
                            <$SelectAllButton 
                                onClick={handleSelectAll}
                                isSelected={allFilteredSelected}
                            >
                                <$SelectAllIcon isSelected={allFilteredSelected}>
                                    {allFilteredSelected ? '☑' : '☐'}
                                </$SelectAllIcon>
                                {allFilteredSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
                            </$SelectAllButton>
                            <$Divider />
                            {filteredOptions.map((option, index) => (
                                <$OptionItem
                                    key={option.value}
                                    isHighlighted={index === highlightedIndex}
                                    isSelected={value?.includes(option.value)}
                                    onClick={() => handleSelect(option.value)}
                                    onMouseDown={(e) => e.preventDefault()} // Prevents blur before click
                                >
                                    {option.label}
                                </$OptionItem>
                            ))}
                        </>
                    ) : (
                        <$NoResults>No results found</$NoResults>
                    )}
                </$OptionsList>
            )}
        </$Container>
    );
};

type SearchableMultiSelectProps = {
    options: { value: string, label: string }[];
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    style?: React.CSSProperties;
};

const $Container = styled.div`
    position: relative;
    width: 100%;
`;



const $InputContainer = styled.div<{ isOpen: boolean }>`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    min-height: 40px;
    border-radius: ${props => props.isOpen ? 'var(--border-radius) var(--border-radius) 0 0' : 'var(--border-radius)'};
    border: 1px solid var(--primary);
    padding: 2px 30px 2px 2px; /* Space for arrow */
    background-color: var(--input-background);
    cursor: text;
    transition: border-color 0.2s;

    &:focus-within {
        border-color: var(--primary);
        background-color: var(--input-background-focus);
    }

    input {
        flex: 1 1 auto;
        width: auto;
        min-width: 100px;
        height: 34px;
        border: none;
        outline: none;
        padding: 0 8px;
        color: var(--text-secondary);
        background-color: transparent;
        font-size: var(--input-font-size);
    }
`;

const $Pill = styled.div`
    display: flex;
    align-items: center;
    background-color: var(--primary-light);
    color: var(--white);
    border-radius: 4px;
    padding: 4px 8px;
    margin: 2px;
    font-size: 0.85em;
    white-space: nowrap;
`;

const $PillRemoveButton = styled.button`
    background: none;
    border: none;
    color: var(--white);
    cursor: pointer;
    margin-left: 6px;
    padding: 0;
    font-size: 1.2em;
    line-height: 1;
    font-weight: bold;

    &:hover {
        opacity: 0.8;
    }
`;

const $ArrowIcon = styled.div<{ isOpen: boolean }>`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%) rotate(${props => (props.isOpen ? '180deg' : '0deg')});
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--text-secondary);
    transition: transform 0.2s;
    cursor: pointer;
`;

const $OptionsList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--input-background);
    border: 1px solid var(--primary);
    border-top: none;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const $OptionItem = styled.li<{ isHighlighted?: boolean; isSelected?: boolean }>`
    padding: 10px 12px;
    cursor: pointer;
    font-size: 0.9em;
    color: ${props => props.isHighlighted ? 'var(--white)' : 'var(--text-secondary)'};
    background-color: ${props => props.isHighlighted ? 'var(--primary-light)' : 'transparent'};
    font-weight: ${props => props.isSelected ? 'bold' : 'normal'};

    &:hover {
        background-color: var(--primary-light);
        color: var(--white);
    }
    
    ${props => props.isSelected && !props.isHighlighted && `
        background-color: #e8f0fe; /* A light blue to indicate selection */
        color: var(--primary);
    `}
`;

const $NoResults = styled.li`
    padding: 10px 12px;
    font-size: 0.9em;
    color: var(--text-secondary);
    text-align: center;
`;

const $SelectAllButton = styled.button<{ isSelected?: boolean }>`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 12px;
    background-color: ${props => props.isSelected ? 'var(--primary-light)' : 'transparent'};
    color: ${props => props.isSelected ? 'var(--white)' : 'var(--text-secondary)'};
    border: none;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--primary-light);
        color: var(--white);
    }

    &:active {
        transform: translateY(1px);
    }
`;

const $SelectAllIcon = styled.span<{ isSelected?: boolean }>`
    margin-right: 8px;
    font-size: 1.1em;
    color: ${props => props.isSelected ? 'var(--white)' : 'var(--text-secondary)'};
`;

const $Divider = styled.div`
    height: 1px;
    background-color: var(--border-color, #e0e0e0);
    margin: 4px 12px;
`;