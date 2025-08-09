import React, { useState, useEffect } from 'react';
import { Modal } from '../Ui/Modal/Modal';
import { Button } from '../Ui/Button/Button';
import { FormControl } from '../Ui/FormControl/FormControl';
import { Input } from '../Ui/Input/Input';
import { Flex } from '../Layout/Flex';
import Text from '../Ui/Text/Text';
import { FaPlus, FaTrash } from 'react-icons/fa';
import type { Activity } from '../../hooks/useActivities';
import { $TextArea } from '../Ui/TextArea/TextArea';
import { useProjectKPIs, useUpdateActivityKPIs, type KPI, type KPIInstance, type KPIResult } from '../../hooks/useActivityKPIs';
import { FaPaperclip } from 'react-icons/fa6';
import ImageSelector from '../ImageSelector/ImageSelector';
import { useUploadFiles } from '../../hooks/mutations/useUploadFiles';
import ProgressBar from '../Ui/ProgressBar/ProgressBar';

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
  const [startFiles, setStartFiles] = useState<File[]>([]);
  const [middleFiles, setMiddleFiles] = useState<File[]>([]);
  const [endFiles, setEndFiles] = useState<File[]>([]);

  // Estado para manejar los valores de todos los KPIs
  const [kpiValues, setKpiValues] = useState<Record<string, string>>({});
  const [observations, setObservations] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Consultar KPIs disponibles y las instancias existentes
  const { data: kpiData } = useProjectKPIs(isOpen ? projectId : undefined);
  const { mutateAsync: uploadFiles, isPending: isUploading } = useUploadFiles((progress) => {
    setUploadProgress(progress);
  });

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
  const formatNumber = (value: string): string => {
    const onlyNumbers = value.replace(/[^\d]/g, '');
    return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Desformatear número para guardar
  const unformatNumber = (value: string): string => {
    return value.replace(/\./g, '');
  };

  // Agregar un KPI a la lista seleccionada
  const handleAddKPI = () => {
    if (!currentKPI || !currentValue) return;
    
    const kpi = availableKPIs.find(k => k.id === currentKPI);
    if (!kpi) return;
    
    // Verificar si ya existe este KPI en la lista seleccionada
    if (selectedKPIs.some(k => k.id === currentKPI)) {
      setError('Este KPI ya está en la lista');
      return;
    }
    
    // Crear una nueva instancia de KPI con los datos seleccionados
    const newKPI: KPIInstance = {
      id: kpi.id,
      kpiId: kpi.id, // Usar el id como kpiId
      value: currentValue,
      expected: '100',
      kpi: {
        id: kpi.id,
        name: kpi.name,
        measurementId: '',
        areaId: ''
      }
    };
    
    setSelectedKPIs([...selectedKPIs, newKPI]);
    
    // Actualizar la lista de KPIs disponibles
    setAvailableKPIs(availableKPIs.filter(k => k.id !== currentKPI));
    
    setCurrentKPI('');
    setCurrentValue('');
    setError('');
  };

  // Eliminar un KPI de la lista seleccionada
  const handleRemoveKPI = (index: number) => {
    const kpiToRemove = selectedKPIs[index];
    
    // Si el KPI eliminado tiene un kpi asociado, devolverlo a la lista de disponibles
    if (kpiToRemove.kpi) {
      setAvailableKPIs([...availableKPIs, kpiToRemove.kpi]);
    }
    
    const newSelectedKPIs = [...selectedKPIs];
    newSelectedKPIs.splice(index, 1);
    setSelectedKPIs(newSelectedKPIs);
  };

  // Actualizar valor de un KPI
  const handleUpdateKPIValue = (kpiId: string, value: string) => {
    setSelectedKPIs(
      selectedKPIs.map(kpi => {
        if (kpi.kpiId === kpiId) {
          return { ...kpi, value: unformatNumber(value) };
        }
        return kpi;
      })
    );
  };

  // Guardar cambios
  const handleSave = async () => {
    if (!activity) return;

    try {
      setUploadProgress(0);
      const formData = new FormData();
      startFiles.forEach(file => {
        formData.append('startFiles', file);
      });
      middleFiles.forEach(file => {
        formData.append('middleFiles', file);
      });
      endFiles.forEach(file => {
        formData.append('endFiles', file);
      });

      // Filtrar KPIs con valor distinto de 0 y convertir al formato esperado
      const kpiResults: KPIResult[] = Object.entries(kpiValues)
        .filter(([_, value]) => value && value !== '0' && value !== '')
        .map(([kpiId, value]) => ({
          kpiInstanceId: kpiId,
          value: +unformatNumber(value)
        }));

      console.log('Guardando datos:', {
        scheduledActivityId: activity.id,
        kpiResults,
        observations
      });

      const updateActivityResponse = await updateActivity({
        scheduledActivityId: activity.id,
        kpiResults,
        observations
      });
      
      await uploadFiles({
        activityId: updateActivityResponse.id,
        formData
      });
      handleClose();
    } catch (err) {
      console.error('Error al guardar los cambios:', err);
      setError('Ocurrió un error al guardar los cambios. Por favor, intente nuevamente.');
    }
  };

  // Asegurarse de que el modal se cierre correctamente
  const handleModalClose = () => {
    console.log('Modal cerrado desde X');
    // Llamar directamente a onClose para evitar problemas de estado
    setTimeout(() => {
      onClose();
    }, 0);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
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
              kpiData.kpis.map((kpi: KPI, index: number) => (
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
                      value={formatNumber(kpiValues[kpi.id] || '0')}
                      onChange={(e) => handleKPIValueChange(kpi.id, e.target.value.replace(/\D/g, ''))}
                      style={{
                        width: '120px',
                        textAlign: 'right',
                        height: '36px',
                        padding: '0 10px'
                      }}
                    />
                    <Text $fontSize="14px" $color="gray">{kpi.unit || 'unid'}</Text>
                  </div>
                </div>
              ))
            ) : (
              <Text $color="gray" $fontSize="14px" style={{ textAlign: 'center', padding: '20px' }}>
                No hay Metas disponibles para este proyecto
              </Text>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #eee" }}>
                      <th style={{ textAlign: "left", padding: "8px", fontSize: "14px", fontWeight: "500" }}>KPI</th>
                      <th style={{ textAlign: "center", padding: "8px", fontSize: "14px", fontWeight: "500", width: "120px" }}>Valor</th>
                      <th style={{ textAlign: "center", padding: "8px", width: "50px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedKPIs.map((kpi, index) => (
                      <tr 
                        key={kpi.kpiId}
                        style={{
                          borderBottom: "1px solid #f0f0f0",
                          backgroundColor: index % 2 === 0 ? "#fafafa" : "white"
                        }}
                      >
                        <td style={{ padding: "10px 8px", fontSize: "14px" }}>
                          {kpi.kpi?.name}
                        </td>
                        <td style={{ padding: "6px 8px" }}>
                          <Input
                            type="text"
                            value={formatNumber(kpi.value)}
                            onChange={(e) => handleUpdateKPIValue(kpi.kpiId, e.target.value)}
                            placeholder="0"
                            style={{ height: "36px", fontSize: "14px", width: "100%" }}
                          />
                        </td>
                        <td style={{ padding: "6px 8px", textAlign: "center" }}>
                          <button
                            onClick={() => handleRemoveKPI(index)}
                            style={{ 
                              background: "none", 
                              border: "none", 
                              cursor: "pointer", 
                              color: "#dc3545",
                              padding: "5px",
                              borderRadius: "3px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            title="Eliminar"
                          >
                            <FaTrash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <Text $fontSize="12px" $color="gray" style={{ marginTop: '8px' }}>
            Solo se guardarán las Metas con valor distinto de 0
          </Text>
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

          {/* Barra de progreso de subida */}
          {isUploading && uploadProgress > 0 && (
            <Flex $direction="column" $gap="8px">
              <Text $fontSize="14px" $fontWeight="500">
                Subiendo imágenes...
              </Text>
              <ProgressBar 
                progress={uploadProgress} 
                height="12px"
                color="#10b981"
                animated={true}
              />
            </Flex>
          )}

        {/* Botones de acción */}
        <Flex $justify="flex-end" $gap="10px">
          <Button 
            variant="default"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary"
            onClick={handleSave}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Guardar Cambios
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};
