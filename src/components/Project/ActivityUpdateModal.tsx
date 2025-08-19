import React, { useState, useEffect } from 'react';
import { Modal } from '../Ui/Modal/Modal';
import { Button } from '../Ui/Button/Button';
import { FormControl } from '../Ui/FormControl/FormControl';
import { Input } from '../Ui/Input/Input';
import { Flex } from '../Layout/Flex';
import Text from '../Ui/Text/Text';
import type { Activity } from '../../hooks/useActivities';
import { $TextArea } from '../Ui/TextArea/TextArea';
import { useProjectKPIs, useUpdateActivityKPIs, type KPI, type KPIResult } from '../../hooks/useActivityKPIs';

interface ActivityUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
  projectId: string | undefined;
}

export const ActivityUpdateModal: React.FC<ActivityUpdateModalProps> = ({
  isOpen,
  onClose,
  activity,
  projectId
}) => {
  // Función para cerrar el modal y limpiar el estado
  const handleClose = () => {
    console.log('Cerrando modal...', { isOpen });
    // Limpiar el estado antes de cerrar
    setKpiValues({});
    setObservations('');
    setError('');

    // Llamar a la función onClose proporcionada por el componente padre
    // Usamos setTimeout para asegurar que se ejecute después del ciclo de renderizado actual
    setTimeout(() => {
      console.log('Ejecutando onClose...');
      onClose();
    }, 0);
  };

  // Estado para manejar los valores de todos los KPIs
  const [kpiValues, setKpiValues] = useState<Record<string, string>>({});
  const [observations, setObservations] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Consultar KPIs disponibles y las instancias existentes
  const { data: kpiData } = useProjectKPIs(isOpen ? projectId : undefined);

  // Mutación para guardar las actualizaciones
  const { mutateAsync: updateActivity, isPending: isSubmitting } = useUpdateActivityKPIs();


  // Inicializar los valores de los KPIs cuando se cargan los datos
  useEffect(() => {
    if (isOpen && kpiData) {
      const initialValues: Record<string, string> = {};

      // Inicializar todos los KPIs disponibles con valor '0' o el valor guardado
      kpiData.kpis.forEach((kpi: KPI) => {
        const existingKPI = kpiData.instances.find(
          (instance: any) => instance.kpiId === kpi.id && instance.activityId === activity?.id
        );
        initialValues[kpi.id] = existingKPI?.value?.toString() || '0';
      });

      setKpiValues(initialValues);
      setObservations(activity?.description || '');
      setError('');
    }
  }, [isOpen, kpiData, activity]);

  // Actualizar el valor de un KPI específico
  const handleKPIValueChange = (kpiId: string, value: string) => {
    setKpiValues(prev => ({
      ...prev,
      [kpiId]: value
    }));
  };

  // Formatear número con separadores de miles



  // Guardar cambios
  const handleSave = async () => {
    if (!activity) return;

    try {

      // // Filtrar KPIs con valor distinto de 0 y convertir al formato esperado
      const kpiResults: KPIResult[] = Object.entries(kpiValues)
        .filter(([_, value]) => value && value !== '0' && value !== '')
        .map(([kpiId, value]) => ({
          kpiInstanceId: kpiId,
          value: +value
        }));

      console.log('Guardando datos:', {
        scheduledActivityId: activity.id,
        kpiResults,
        observations
      });

      await updateActivity({
        scheduledActivityId: activity.id,
        kpiResults,
        observations
      });

      // if(startFiles.length > 0 || middleFiles.length > 0 || endFiles.length > 0){
      //   await uploadFiles({
      //     activityId: activityResult.id,
      //     formData
      //   });
      // }

      handleClose();
    } catch (err) {
      console.error('Error al guardar los cambios:', err);
      setError('Ocurrió un error al guardar los cambios. Por favor, intente nuevamente.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title='' width='600px'>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Flex $direction="column" $gap="16px">

          <Flex $direction="column" $gap="16px" $align="stretch">
          {/* Lista de KPIs */}
          <div style={{ marginBottom: '20px' }}>
            <Text $fontSize="16px" $fontWeight="500" style={{ marginBottom: '15px' }}>
              Asignar valores a las Metas
            </Text>

            <div style={{
              maxHeight: '300px',
              overflowY: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              padding: '10px'
            }}>
              {kpiData?.kpis?.length > 0 ? (
                kpiData?.kpis?.map((kpi: KPI, index: number) => (
                  <div
                    key={kpi.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 8px',
                      borderBottom: index < kpiData.kpis.length - 1 ? '1px solid #f0f0f0' : 'none',
                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
                    }}
                  >
                    <Text $fontSize="14px" style={{ flex: 1 }}>{kpi.name}</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Input
                        type="text"
                        placeholder="0"
                        value={kpiValues[kpi.id]}
                        onChange={(e) => handleKPIValueChange(kpi.id, e.target.value.replace(/\D/g, ''))}
                        style={{
                          width: '120px',
                          textAlign: 'right',
                          height: '36px',
                          padding: '0 10px'
                        }}
                      />
                      <Flex $direction="row" $gap="4px">
                        <Text $fontSize="14px" $color="gray">{kpi.measurement.name}</Text>
                        {kpi.measurement.symbol === kpi.measurement.name && <Text $fontSize="11px" $color="gray">({kpi.measurement.symbol})</Text>}
                      </Flex>
                    </div>
                  </div>
                ))
              ) : (
                <Text $color="gray" $fontSize="14px" style={{ textAlign: 'center', padding: '20px' }}>
                  No hay Metas disponibles para este proyecto
                </Text>
              )}
            </div>

              
          </div>

          {/* Campo de observaciones */}
          <div style={{ marginBottom: '20px' }}>
            <FormControl label="Observaciones">
              <$TextArea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Ingrese observaciones adicionales"
                style={{ minHeight: '80px' }}
              />
            </FormControl>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}



          {/* Botones de acción */}
          <Flex $justify="end" $gap="10px">
            <Button
              $variant="primary"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </Flex>
          </Flex>
        </Flex>
      </div>
    </Modal>
  );
};