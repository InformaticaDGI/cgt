import React from "react";
import styled from "styled-components";

const SwitchContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  display: none;
`;

const SwitchSlider = styled.div<{ checked: boolean }>`
  position: relative;
  width: 40px;
  height: 20px;
  background-color: ${(props) => (props.checked ? "#4caf50" : "#ccc")};
  border-radius: 10px;
  transition: background-color 0.2s;

  &:before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: ${(props) => (props.checked ? "22px" : "2px")};
    transition: left 0.2s;
  }
`;

const SwitchLabel = styled.span`
  margin-left: 8px;
  color: var(--text-secondary);
`;

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  return (
    <SwitchContainer>
      <SwitchInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <SwitchSlider checked={checked} />
      <SwitchLabel>{label}</SwitchLabel>
    </SwitchContainer>
  );
};

export default Switch;
