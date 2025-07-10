import styled from "styled-components"

export type Option = {
    label: string
    value: string
}

export type SelectProps = {
    placeholder?: string
    data: Option[]
}

const FilterBody = ({ placeholder, data }: SelectProps) => {

    return (
        <div>
            <StyledSelectWrapper>
                <StyledSelect>
                    <option value="">{placeholder}</option>
                    {data.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}
                </StyledSelect>
                <SelectArrow />
            </StyledSelectWrapper>
        </div>
    )
}


const CustomArrowIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;


const StyledSelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%; 
`;

const StyledSelect = styled.select`
  appearance: none; 
  -webkit-appearance: none; 
  -moz-appearance: none; 
  color: #555555;
  transition: 0.4s;
  background-color: rgba(240, 253, 250, 0.5);
  padding: 12px;
  border-radius: 15px;
  border: 1px solid #98F4E3;
  padding: 10px 80px 10px 15px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  outline: none; 
  width: 100%;

  &:hover {
    background: #ffffff;
  }
  option {
    padding: 10px;
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 15px; 
  transform: translateY(-50%);
  pointer-events: none; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555; 


  &::after {
    content: url('data:image/svg+xml;utf8,${encodeURIComponent(CustomArrowIcon)}');
    display: block;
    width: 16px;
    height: 16px; 
    line-height: 1; 
`;

export default FilterBody
