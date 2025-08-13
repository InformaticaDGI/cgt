import React, { useState, useMemo, useEffect, useRef } from 'react';
import styled from 'styled-components';

export const SearchableSelect = ({ options, value, onChange, placeholder, style }: SearchableSelectProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const optionsListRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     setSearchTerm('');
    //     setHighlightedIndex(-1);
    // }, [value]);

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
        onChange?.(selectedValue);
        setIsOpen(false);
        setSearchTerm('');
        inputRef.current?.blur();
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
                e.preventDefault();
                setSearchTerm('');
                setHighlightedIndex(-1);
                onChange?.('');
                break;
            default:
                break;
        }
    };

    const displayValue = useMemo(() => {
        if (isOpen && searchTerm.length > 0) return searchTerm;
        const option = options.find(option => option.value === value)?.label || '';
        return option;
    }, [options, value, searchTerm]);

    return (
        <$Container style={style}>
            <$InputContainer isOpen={isOpen}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={displayValue}
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
                        filteredOptions.map((option, index) => (
                            <$OptionItem
                                key={option.value}
                                isHighlighted={index === highlightedIndex}
                                onClick={() => handleSelect(option.value)}
                                onMouseDown={(e) => e.preventDefault()} // Prevents blur before click
                            >
                                {option.label}
                            </$OptionItem>
                        ))
                    ) : (
                        <$NoResults>No results found</$NoResults>
                    )}
                </$OptionsList>
            )}
        </$Container>
    );
};

type SearchableSelectProps = {
    options: { value: string, label: string }[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    style?: React.CSSProperties;
};

const $Container = styled.div`
    position: relative;
    width: 100%;
`;

const $InputContainer = styled.div<{ isOpen: boolean }>`
    position: relative;
    width: 100%;
    input {
        width: 100%;
        height: 40px;
        border-radius: ${props => props.isOpen ? 'var(--border-radius) var(--border-radius) 0 0' : 'var(--border-radius)'};
        border: 1px solid var(--primary);
        padding: 0 12px;
        color: var(--text-secondary);
        background-color: var(--input-background);
        outline: none;
        transition: border-color 0.2s;
        font-size: var(--input-font-size);
        cursor: pointer;
        &:focus {
            border-color: var(--primary);
            background-color: var(--input-background-focus);
        }
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

const $OptionItem = styled.li<{ isHighlighted?: boolean }>`
    padding: 10px 12px;
    cursor: pointer;
    font-size: 0.9em; /* Slightly smaller font size */
    color: ${props => props.isHighlighted ? 'var(--white)' : 'var(--text-secondary)'};
    background-color: ${props => props.isHighlighted ? 'var(--primary-light)' : 'transparent'};

    &:hover {
        background-color: var(--primary-light);
        color: var(--white);
    }
`;

const $NoResults = styled.li`
    padding: 10px 12px;
    font-size: 0.9em; /* Slightly smaller font size */
    color: var(--text-secondary); /* Less black color */
    text-align: center;
`;
