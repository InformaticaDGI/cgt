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
    setSelectedKPIs([]);
    setAvailableKPIs([]);
    setCurrentKPI('');
    setCurrentValue('');
    setObservations('');
    setError('');
    
    // Llamar a la función onClose proporcionada por el componente padre
    // Usamos setTimeout para asegurar que se ejecute después del ciclo de renderizado actual
    setTimeout(() => {
      console.log('Ejecutando onClose...');
      onClose();
    }, 0);
  };
  const [selectedKPIs, setSelectedKPIs] = useState<KPIInstance[]>([]);
  const [availableKPIs, setAvailableKPIs] = useState<KPI[]>([]);
  const [currentKPI, setCurrentKPI] = useState<string>('');
  const [currentValue, setCurrentValue] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Consultar KPIs disponibles y las instancias existentes
  const { data: kpiData } = useProjectKPIs(isOpen ? projectId : undefined);

  // Mutación para guardar las actualizaciones
  const { mutateAsync: updateActivity, isPending: isSubmitting } = useUpdateActivityKPIs();

  // Cargar KPIs disponibles cuando se abre el modal
  useEffect(() => {
    if (isOpen && kpiData) {
      // Asegurarse de que kpiData.kpis sea un array
      const availableKPIsData = Array.isArray(kpiData.kpis) ? kpiData.kpis : [];
      console.log('KPIs disponibles:', availableKPIsData);
      
      // Si hay instancias existentes para esta actividad, cargarlas
      if (activity && kpiData.instances) {
        const activityInstances = Array.isArray(kpiData.instances) 
          ? kpiData.instances.filter((instance: any) => instance.activityId === activity.id)
          : [];
        
        console.log('Instancias de actividad:', activityInstances);
        
        if (activityInstances.length > 0) {
          const selectedKPIsData = activityInstances.map((instance: any) => ({
            id: instance.id,
            kpiId: instance.kpiId,
            value: instance.value || '0',
            expected: instance.expected || '100',
            kpi: instance.kpi
          }));
          
          setSelectedKPIs(selectedKPIsData);
          
          // Filtrar los KPIs que ya están seleccionados
          const selectedIds = selectedKPIsData.map(kpi => kpi.id);
          const filteredKPIs = availableKPIsData.filter(kpi => !selectedIds.includes(kpi.id));
          setAvailableKPIs(filteredKPIs);
          
          setObservations(activity.description || '');
        } else {
          setAvailableKPIs(availableKPIsData);
          setSelectedKPIs([]);
        }
      } else {
        setAvailableKPIs(availableKPIsData);
        setSelectedKPIs([]);
      }
      
      setCurrentKPI('');
      setCurrentValue('');
      setError('');
    }
  }, [isOpen, kpiData, activity]);

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
      // Convertir los KPIs seleccionados al formato esperado por el backend
      const kpiResults: KPIResult[] = selectedKPIs
        .filter(kpi => kpi.id) // Asegurarse de que id no sea undefined
        .map(kpi => ({
          kpiInstanceId: kpi.id as string, // Forzar tipo string
          value: unformatNumber(kpi.value)
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
      handleClose();
    } catch (err) {
      setError('Error al guardar los cambios. Por favor intente nuevamente.');
      console.error('Error al guardar:', err);
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
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={`Actualizar Actividad: ${activity?.name || ''}`}
      width="800px"
    >
      <div style={{ padding: "20px" }}>
        {error && (
          <div style={{ 
            backgroundColor: "#f8d7da", 
            color: "#721c24", 
            padding: "10px 15px", 
            borderRadius: "4px", 
            marginBottom: "20px" 
          }}>
            {error}
          </div>
        )}

        <Flex $direction="column" $gap="24px">
          {/* Selector de KPI e input de valor */}
          <Flex $direction="row" $gap="16px" $align="end">
            <FormControl label="Seleccionar KPI" style={{ flex: 2 }}>
              <select
                value={currentKPI}
                onChange={(e) => setCurrentKPI(e.target.value)}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  width: '100%'
                }}
              >
                <option value="">Seleccionar KPI</option>
                {availableKPIs && availableKPIs.length > 0 ? (
                  availableKPIs.map((kpi) => (
                    <option key={kpi.id} value={kpi.id}>
                      {kpi.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No hay KPIs disponibles</option>
                )}
              </select>
            </FormControl>
            
            <FormControl label="Valor" style={{ flex: 1 }}>
              <Input
                type="text"
                value={formatNumber(currentValue)}
                onChange={(e) => setCurrentValue(formatNumber(e.target.value))}
                placeholder="0"
                style={{ height: "40px", fontSize: "16px" }}
              />
            </FormControl>
            
            <Button
              $variant="primary"
              $size="small"
              onClick={handleAddKPI}
              style={{ height: "40px", display: "flex", alignItems: "center", gap: "5px" }}
            >
              <FaPlus size={12} /> Agregar
            </Button>
          </Flex>

          {/* Lista de KPIs seleccionados */}
          <div style={{ 
            border: "1px solid #eee", 
            borderRadius: "4px", 
            padding: "16px",
            maxHeight: "300px",
            overflowY: "auto"
          }}>
            <Text $fontSize="16px" $fontWeight="500" style={{ marginBottom: "16px" }}>
              KPIs Seleccionados
            </Text>
            
            {selectedKPIs.length === 0 ? (
              <Text $fontSize="14px" style={{ color: "#777" }}>
                No hay KPIs seleccionados
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

          {/* Observaciones */}
          <FormControl label="Observaciones">
            <$TextArea
              value={observations}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setObservations(e.target.value)}
              placeholder="Ingrese observaciones adicionales"
              style={{ minHeight: "120px", fontSize: "16px" }}
            />
          </FormControl>

          {/* Botones de acción */}
          <Flex $direction="row" $justify="center" $gap="16px">
            <Button
              $variant="primary"
              onClick={handleSave}
              disabled={isSubmitting}
              style={{ padding: "10px 20px", minWidth: "150px" }}
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </Flex>
        </Flex>
      </div>
    </Modal>
  );
};
