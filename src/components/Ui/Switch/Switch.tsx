import React from "react";
import styled from "styled-components";

const SwitchContainer = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const SwitchInput = styled.input`
  display: none;
`;

const SwitchSlider = styled.div<{ checked: boolean; disabled: boolean }>`
  position: relative;
  width: 40px;
  height: 20px;
  background-color: ${(props) => {
    if (props.disabled) {
      return props.checked ? "var(--switch-disabled-active, #a5d6a7)" : "var(--switch-disabled-inactive, #e0e0e0)";
    }
    return props.checked ? "#4caf50" : "#ccc";
  }};
  border-radius: 10px;
  transition: background-color 0.2s;

  &:before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${(props) => (props.disabled ? "var(--switch-knob-disabled, #f5f5f5)" : "white")};
    top: 2px;
    left: ${(props) => (props.checked ? "22px" : "2px")};
    transition: left 0.2s;
  }
`;

const SwitchLabel = styled.span<{fontSize: string; disabled: boolean}>`
  margin-left: 8px;
  color: ${(props) => (props.disabled ? "var(--text-disabled, #999)" : "var(--text-secondary)")};
  font-size: ${({fontSize}) => fontSize || "inherit"};
`;

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  fontSize?: string;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ checked, fontSize = "16px", onChange, label, disabled = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(e.target.checked);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
  };

  return (
    <SwitchContainer disabled={disabled} onClick={handleClick}>
      <SwitchInput
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <SwitchSlider checked={checked} disabled={disabled} />
      <SwitchLabel fontSize={fontSize} disabled={disabled}>{label}</SwitchLabel>
    </SwitchContainer>
  );
};

export default Switch;
