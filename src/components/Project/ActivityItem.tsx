import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaHourglassHalf, FaChartLine } from 'react-icons/fa';
import type { Activity } from '../../hooks/useActivities';
import Text from '../Ui/Text/Text';
import { ActivityUpdateModal } from './ActivityUpdateModal';
import './ActivityItem.css';
import { useProjectKPIs } from '../../hooks/useActivityKPIs';
import { Grid, GridItem } from '../Layout/Grid';

interface ActivityItemProps {
  activity: Activity;
  isLast: boolean;
  projectId?: string;
}

/**
 * Componente para mostrar un item individual de actividad
 */
export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isLast, projectId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hasKPIs, setHasKPIs] = useState(false);

  // Consultar KPIs para verificar si esta actividad tiene KPIs asociados
  const { data: kpiData } = useProjectKPIs(projectId);

  useEffect(() => {
    if (kpiData && kpiData.instances) {
      const activityInstances = kpiData.instances.filter(
        (instance: any) => instance.activityId === activity.id
      );
      setHasKPIs(activityInstances.length > 0);
    }
  }, [kpiData, activity.id]);

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
  };

  const handleActivityClick = () => {
    setModalOpen(true);
  };

  return (
    <div
      style={{
        padding: "16px 8px",
        borderBottom: isLast ? "none" : "1px solid #eee",
        transition: "background 0.2s",
        cursor: "pointer",
        position: "relative",
        backgroundColor: "transparent"
      }}
      onClick={handleActivityClick}
      className="activity-item"
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Text $fontSize="14px" $fontWeight="500">
            {activity.name}
          </Text>
          <Grid $columns="repeat(3, 1fr)" $paddingBottom="10px" $gap="5px" $columnsXs="repeat(1, 1fr)" $columnsSm="repeat(1, 1fr)" $columnsMd="repeat(1, 1fr)" $columnsLg="repeat(1, 1fr)" $columnsXl="repeat(1, 1fr)">
            <GridItem style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FaCalendarAlt size={12} color="#16a085" />
              <span>Inicio: {formatDate(activity.startDate)}</span>
            </GridItem>
            <GridItem style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FaClock size={12} color="#e74c3c" />
              <span>Fin: {formatDate(activity.endDate)}</span>
            </GridItem>
            <GridItem style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {activity.isCompleted ? (
                <>
                  <FaCheckCircle size={14} color="#27ae60" />
                  <span style={{ color: "#27ae60" }}>Completada</span>
                </>
              ) : (
                <>
                  <FaHourglassHalf size={14} color="#f39c12" />
                  <span style={{ color: "#f39c12" }}>En progreso</span>
                </>
              )}
            </GridItem>
            {hasKPIs && (
              <GridItem style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <FaChartLine size={14} color="#16a085" />
                <span style={{ color: "#16a085" }}>KPIs configurados</span>
              </GridItem>
            )}
          </Grid>
        </div>
      </div>

      {/* Modal de actualización */}
      <ActivityUpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        activity={activity}
        projectId={projectId}
      />
    </div>
  );
};
