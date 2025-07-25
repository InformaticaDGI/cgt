import React from 'react';
import { Input } from '../Ui/Input/Input';
import { FormControl } from '../Ui/FormControl/FormControl';
import { Button } from '../Ui/Button/Button';
import { MunicipalitySelect } from "../Prebuilt/MunicipalitySelect";
import { ParrishSelect } from "../Prebuilt/ParrishSelect";
import { CommunityCircuitSelect } from "../Prebuilt/CommunityCircuit";
import { CommunitySelect } from "../Prebuilt/CommunitySelect";

interface ActivityFormData {
  name: string;
  startDate: string;
  endDate: string;
  municipalityId: string;
  parishId: string;
  circuitId: string;
  communityId: string;
}

interface ActivityFormProps {
  formData: ActivityFormData;
  onFormChange: (data: ActivityFormData) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  submitError: string;
}

/**
 * Componente para el formulario de creación/edición de actividades
 */
export const ActivityForm: React.FC<ActivityFormProps> = ({
  formData,
  onFormChange,
  onSubmit,
  isSubmitting,
  submitError
}) => {
  const handleInputChange = (field: keyof ActivityFormData, value: string) => {
    let updatedData = { ...formData, [field]: value };
    
    // Resetear campos dependientes cuando cambia un select padre
    if (field === 'municipalityId') {
      updatedData = {
        ...updatedData,
        parishId: '',
        circuitId: '',
        communityId: ''
      };
    } else if (field === 'parishId') {
      updatedData = {
        ...updatedData,
        circuitId: '',
        communityId: ''
      };
    } else if (field === 'circuitId') {
      updatedData = {
        ...updatedData,
        communityId: ''
      };
    }
    
    onFormChange(updatedData);
  };

  return (
    <div style={{ padding: "40px" }}>
      {submitError && (
        <div style={{ 
          backgroundColor: "#f8d7da", 
          color: "#721c24", 
          padding: "10px 15px", 
          borderRadius: "4px", 
          marginBottom: "20px" 
        }}>
          {submitError}
        </div>
      )}
      
      <FormControl label="Nombre de la actividad" required>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Ingrese el nombre de la actividad"
          style={{ height: "40px", fontSize: "16px" }}
        />
      </FormControl>
      
      <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
        <FormControl label="Fecha de inicio" required style={{ flex: 1 }}>
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            style={{ height: "40px", fontSize: "16px" }}
          />
        </FormControl>
        
        <FormControl label="Fecha de finalización" required style={{ flex: 1 }}>
          <Input
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            style={{ height: "40px", fontSize: "16px" }}
          />
        </FormControl>
      </div>
      
      <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
        <FormControl label="Municipio" required style={{ flex: 1 }}>
          <MunicipalitySelect
            value={formData.municipalityId}
            onChange={(value) => handleInputChange('municipalityId', value)}
          />
        </FormControl>
        
        <FormControl label="Parroquia" required style={{ flex: 1 }}>
          <ParrishSelect
            municipalityId={formData.municipalityId}
            value={formData.parishId}
            onChange={(value) => handleInputChange('parishId', value)}
          />
        </FormControl>
      </div>
      
      <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
        <FormControl label="Circuito" required style={{ flex: 1 }}>
          <CommunityCircuitSelect
            parishId={formData.parishId}
            value={formData.circuitId}
            onChange={(value) => handleInputChange('circuitId', value)}
          />
        </FormControl>
        
        <FormControl label="Comunidad" required style={{ flex: 1 }}>
          <CommunitySelect
            circuitId={formData.circuitId}
            value={formData.communityId}
            onChange={(value) => handleInputChange('communityId', value)}
          />
        </FormControl>
      </div>
      
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
        <Button 
          $variant="primary"
          onClick={onSubmit} 
          disabled={isSubmitting}
          style={{ padding: "10px 30px", fontSize: "16px" }}
        >
          {isSubmitting ? "Guardando..." : "Guardar Actividad"}
        </Button>
      </div>
    </div>
  );
};

export type { ActivityFormData };
