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
  appearance: none; /* Oculta la flecha nativa en la mayoría de los navegadores */
  -webkit-appearance: none; /* Para Safari y Chrome */
  -moz-appearance: none; /* Para Firefox */
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px 40px 10px 15px; /* Más espacio a la derecha para el icono */
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  outline: none; /* Elimina el borde de enfoque predeterminado */
  width: 100%; /* Para que ocupe el ancho de su contenedor */

  &:focus {
    border-color: #007bff; /* Color de borde al enfocar */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  /* Estilos para las opciones (dependen del navegador, pero puedes intentar estilizarlas) */
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




const Select = styled.select`
  appearance: none;
  width: 290px;
  border: 1px solid #98F4E3;
  border-radius: 15px;
  padding: 12px;
  background:rgba(240, 253, 250, 0.5);
  transition: 0.4s;
  color: #2D3748;
  font-size: 14px;
  font-weight: 600;

  &::before, after {
    --size: 0.3rem;
    position: absolute;
    content: "";
    right: 1rem;
    pointer-events: none;
  }

  &::before {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid black;
    top: 40%;
  }

  &::after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid black;
    top: 55%;
}

`

export default FilterBody
