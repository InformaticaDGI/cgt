import React, { useState } from 'react';
import styled from 'styled-components';


interface Task {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}


const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-VE', { month: 'short', day: 'numeric' });
};


const getDaysBetween = (startDate: string | Date, endDate: string | Date): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};


const Container = styled.div`
  font-family: 'Inter', sans-serif;
`;

const ChartWrapper = styled.div`
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
  overflow: hidden;
`;

const ContentFlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) { /* md:flex-row */
    flex-direction: row;
  }
`;

const TaskListSection = styled.div`
  width: 100%;
  background-color: #f9fafb; /* gray-50 */
  padding: 1rem;
  border-right: 1px solid #e5e7eb; /* border-r border-gray-200 */

  @media (min-width: 768px) { /* md:w-1/4 */
    width: 25%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem; /* text-xl */
  font-weight: 600; /* font-semibold */
  color: #374151; /* gray-700 */
  margin-bottom: 1rem;
`;

const TaskListItem = styled.div`
  padding: 0.5rem;
  font-size: 0.875rem; /* text-sm */
  color: var(--primary);
  background-color: #ffffff;
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
`;

const TaskListSpace = styled.div`
  margin-top: 0.5rem; /* space-y-2 */
  & > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

const GanttChartTimelineSection = styled.div`
  width: 100%;
  padding: 1rem;
  overflow-x: auto;

  @media (min-width: 768px) { /* md:w-3/4 */
    width: 75%;
  }
`;

const TimelineHeader = styled.div`
  display: flex;
  gap: 2px;
  border-bottom: 1px solid #d1d5db; /* border-b border-gray-300 */
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 10;
`;

const TimelineDate = styled.div`
  flex-shrink: 0;
  background-color: var(--secondary-background);
  padding: 2px;
  border-radius: 4px;
  font-size: 0.55rem; /* text-xs */
  color: #4b5563; /* gray-600 */
  text-align: center;
  width: 24px; /* Match dayWidth */
`;

const TaskBarsContainer = styled.div`
  position: relative;
`;

interface TaskBarProps {
  $left: number;
  $width: number;
  $top: number;
}

const TaskBar = styled.div<TaskBarProps>`
  position: absolute;
  height: 1.5rem; /* h-6 */
  background-color: var(--primary); /* blue-500 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 0.75rem; /* text-xs */
  font-weight: 500; /* font-medium */
  overflow: hidden;
  white-space: nowrap;
  min-width: 24px; /* Ensure minimum width for very short tasks */

  left: ${props => props.$left}px;
  width: ${props => props.$width}px;
  top: ${props => props.$top}px;
`;

const TaskBarText = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

interface CurrentDayLineProps {
  $left: number;
  $height: number;
}

const CurrentDayLine = styled.div<CurrentDayLineProps>`
  position: absolute;
  top: 0;
  top: -45px;
  left: ${props => props.$left}px;
  height: ${props => props.$height + 70}px;
  width: 24px; /* Thickness of the line */
  opacity: 0.5;
  border-radius: 4px;
  background-color: orange; /* Red color */
  z-index: 20; /* Ensure it's above task bars */
`;

const GanttChart: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([
    { id: 2, name: 'Inicio de actividades', startDate: '2025-08-01', endDate: '2025-08-05' },
    { id: 3, name: 'Remocion de pavimento', startDate: '2025-08-05', endDate: '2025-08-15' },
    { id: 4, name: 'Escarificación', startDate: '2025-08-10', endDate: '2025-08-25' },
    { id: 5, name: 'Limpieza de la superficie', startDate: '2025-08-20', endDate: '2025-09-10' },
    { id: 6, name: 'Aplicacion y compactación', startDate: '2025-09-05', endDate: '2025-09-20' },
    { id: 7, name: 'Entrega de la obra', startDate: '2025-09-18', endDate: '2025-09-25' },
  ]);


  const allDates: Date[] = tasks.flatMap(task => [new Date(task.startDate), new Date(task.endDate)]);
  const minDate: Date = new Date(Math.min(...allDates.map(date => date.getTime())));
  const maxDate: Date = new Date(Math.max(...allDates.map(date => date.getTime())));


  const totalDays: number = getDaysBetween(minDate, maxDate) + 1;


  const timelineDates: Date[] = [];
  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(minDate);
    currentDate.setDate(minDate.getDate() + i);
    timelineDates.push(currentDate);
  }


  const calculateTaskBarProps = (task: Task) => {
    const startOffsetDays = getDaysBetween(minDate, task.startDate);
    const durationDays = getDaysBetween(task.startDate, task.endDate) + 1;


    const dayWidth = 24 + 2;

    const left = startOffsetDays * dayWidth;
    const width = durationDays * dayWidth;

    return { left, width };
  };

  // Calculate the position of the current day line
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  const currentDayOffsetDays = getDaysBetween(minDate, today);
  const currentDayLineLeft = currentDayOffsetDays * 26; // 29px is dayWidth

  // Calculate the height of the current day line to span the entire chart area
  const chartHeight = tasks.length * 40; // 40px is the vertical spacing between tasks


  return (
    <Container>
      <ChartWrapper>
        <ContentFlexContainer>
          {/* Task List Section */}
          <TaskListSection>
            <SectionTitle>Actividades</SectionTitle>
            <TaskListSpace>
              {tasks.map((task: Task) => (
                <TaskListItem key={task.id}>
                  {task.name}
                </TaskListItem>
              ))}
            </TaskListSpace>
          </TaskListSection>

          {/* Gantt Chart Timeline Section */}
          <GanttChartTimelineSection>
            <SectionTitle>Linea de tiempo</SectionTitle>

            {/* Timeline Header (Dates) */}
            <TimelineHeader>
              {timelineDates.map((date: Date, index: number) => (
                <TimelineDate key={index}>
                  {formatDate(date).split(' ')[0]} {/* Month */}
                  <br />
                  {formatDate(date).split(' ')[1]} {/* Day */}
                </TimelineDate>
              ))}
            </TimelineHeader>

            {/* Task Bars */}
            <TaskBarsContainer>
              {currentDayOffsetDays >= 0 && currentDayOffsetDays < totalDays && (
                <CurrentDayLine $left={currentDayLineLeft} $height={chartHeight} />
              )}
              {tasks.map((task: Task) => {
                const { left, width } = calculateTaskBarProps(task);
                return (
                  <TaskBar
                    key={task.id}
                    $left={left}
                    $width={width}
                    $top={(task.id - 1) * 40}
                  >
                    <TaskBarText>{task.name}</TaskBarText>
                  </TaskBar>
                );
              })}
              {/* This div helps to set the total height of the relative container */}
              <div style={{ height: `${tasks.length * 40}px` }}></div>
            </TaskBarsContainer>
          </GanttChartTimelineSection>
        </ContentFlexContainer>
      </ChartWrapper>
    </Container>
  );
};

export default GanttChart;
