import styled from "styled-components"

const FilterBody = () => {

    return (
        <div>
            <Select>
                <option>Seleccione una opcion...</option>
            </Select>
        </div>
    )
}


const Select = styled.select`
  width: 290px;
  border: 1px solid #98F4E3;
  border-radius: 15px;
  padding: 12px;
  background:rgba(240, 253, 250, 0.5);
  transition: 0.4s;
  color: #2D3748;
  font-size: 14px;
  font-weight: 600;

  &::picker-icon {
   color: #999;
  }

`

export default FilterBody
