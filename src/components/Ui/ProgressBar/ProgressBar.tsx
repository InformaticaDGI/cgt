import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = '8px',
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  borderRadius = '4px',
  showPercentage = true,
  animated = true
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <ProgressContainer>
      <ProgressTrack
        height={height}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
      >
        <ProgressFill
          progress={normalizedProgress}
          color={color}
          borderRadius={borderRadius}
          animated={animated}
        />
      </ProgressTrack>
      {showPercentage && (
        <ProgressText>
          {Math.round(normalizedProgress)}%
        </ProgressText>
      )}
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const ProgressTrack = styled.div<{
  height: string;
  backgroundColor: string;
  borderRadius: string;
}>`
  flex: 1;
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{
  progress: number;
  color: string;
  borderRadius: string;
  animated: boolean;
}>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${props => props.color};
  border-radius: ${props => props.borderRadius};
  transition: ${props => props.animated ? 'width 0.3s ease-in-out' : 'none'};
  position: relative;
  
  ${props => props.animated && `
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    background-size: 20px 20px;
    animation: progress-animation 1s linear infinite;
  `}
  
  @keyframes progress-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 20px 0;
    }
  }
`;

const ProgressText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  min-width: 35px;
  text-align: right;
`;

export default ProgressBar;
