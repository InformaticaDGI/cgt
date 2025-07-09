import styled from "styled-components"

const FilterBody = () => {

    return (
        <div>
            <StyledSelectWrapper>
                <StyledSelect>
                    <option value="">Selecciona una opción</option>
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                </StyledSelect>
                <SelectArrow />
            </StyledSelectWrapper>
        </div>
    )
}

// Tu icono SVG. Puedes importarlo o definirlo como una cadena.
// Para este ejemplo, usaremos un SVG simple.
const CustomArrowIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
  </svg>
`;

const StyledSelectWrapper = styled.div`
  position: relative;
  display: inline-block; /* O block si quieres que ocupe todo el ancho */
  width: fit-content; // Ajusta el ancho al contenido o establece uno fijo
`;

const StyledSelect = styled.select`
  appearance: none; 
  -webkit-appearance: none; 
  -moz-appearance: none; 
  color: #2D3748;
  transition: 0.4s;
  background-color: rgba(240, 253, 250, 0.5);
  padding: 12px;
  border-radius: 15px;
  border: 1px solid #98F4E3;
  padding: 10px 80px 10px 15px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  outline: none; 
  width: 100%;

  &:focus {
    border-color: #007bff; /* Color de borde al enfocar */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  option {
    padding: 10px;
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 15px; /* Posiciona el icono a la derecha */
  transform: translateY(-50%);
  pointer-events: none; /* Permite hacer clic en el select a través del icono */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555; /* Color del icono */

  /* Inyecta el SVG como fondo o directamente si el navegador lo permite */
  &::after {
    content: url('data:image/svg+xml;utf8,${encodeURIComponent(CustomArrowIcon)}');
    display: block;
    width: 24px; // Tamaño de tu icono
    height: 24px; // Tamaño de tu icono
    line-height: 1; /* Asegura que el icono no añada espacio extra */
  }
`;

export default FilterBody
