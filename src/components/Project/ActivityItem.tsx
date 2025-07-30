import React from 'react';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import type { Activity } from '../../hooks/useActivities';
import Text from '../Ui/Text/Text';

interface ActivityItemProps {
  activity: Activity;
  isLast: boolean;
}

/**
 * Componente para mostrar un item individual de actividad
 */
export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isLast }) => {
  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
  };

  return (
    <div style={{ 
      padding: "16px 8px", 
      borderBottom: isLast ? "none" : "1px solid #eee",
      transition: "background 0.2s",
      cursor: "pointer",
      position: "relative"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Text $fontSize="14px" $fontWeight="500">
            {activity.name}
          </Text>
          <div style={{ display: "flex", gap: "30px", fontSize: "14px", color: "#666" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FaCalendarAlt size={12} color="#16a085" />
              <span>Inicio: {formatDate(activity.startDate)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FaClock size={12} color="#e74c3c" />
              <span>Fin: {formatDate(activity.endDate)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
