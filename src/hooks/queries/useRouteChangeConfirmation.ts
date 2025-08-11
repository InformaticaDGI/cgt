import { useEffect, useRef } from 'react';
import { useBlocker } from 'react-router-dom';
import Swal from 'sweetalert2';

export const useRouteChangeConfirmation = (
  shouldBlock: boolean = true,
  onConfirm: () => void,
  message: string = '¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.'
) => {
  const blocker = useBlocker(shouldBlock);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    if (blocker.state === 'blocked' && !isProcessingRef.current) {
      isProcessingRef.current = true;
      
      Swal.fire({
        title: 'Confirmar salida',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Resetear el formulario
          onConfirm();
          // Continuar con la navegación
          blocker.proceed();
        } else {
          // Cancelar la navegación
          blocker.reset();
        }
        isProcessingRef.current = false;
      });
    }
  }, [blocker, message, onConfirm]);

  return {
    isBlocked: blocker.state === 'blocked',
    proceed: blocker.proceed,
    reset: blocker.reset
  };
};