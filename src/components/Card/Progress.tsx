import { Cell, Pie, ResponsiveContainer, PieChart } from "recharts"

const Progress = ({ progress = 75, size = 200, strokeWidth = 20, color = '#FF0000', backgroundColor = '#FFFFFF' }) => {
  // Aseguramos que el progreso esté entre 0 y 100
  const actualProgress = Math.min(100, Math.max(0, progress));

  // Datos para el gráfico de pastel: el progreso y el resto (lo que falta para 100)
  const data = [
    { name: 'Progress', value: actualProgress },
    { name: 'Remaining', value: 100 - actualProgress },
  ];

  // Calculamos el radio interior para que sea un "donut"
  const innerRadius = (size / 2) - strokeWidth;
  const outerRadius = size / 2;

  return (
    <ResponsiveContainer width={size} height={size} style={{ pointerEvents: 'none' }}>
      <PieChart width={size} height={size} >
        <Pie
          data={data}
          cx="50%" // Centro X
          cy="50%" // Centro Y
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={90} // Inicia en la parte superior
          endAngle={-270} // Termina según el progreso
          paddingAngle={0} // Espacio entre segmentos (lo dejamos en 0 para un solo anillo)
          dataKey="value"
          isAnimationActive={false} // Desactivar animación si prefieres una carga estática
        >
          {/* El primer Cell es para el progreso */}
          {/* El segundo Cell es para el resto del círculo (fondo) */}
          <Cell key="progress-segment" fill={color} stroke="none" />
          <Cell key="remaining-segment" fill={backgroundColor} stroke="none" />
        </Pie>
        {/* Puedes añadir texto en el centro si lo deseas, por ejemplo el porcentaje */}
        <text x="53%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#333" fontSize="20px" fontWeight={'600'}>
          {`${actualProgress}%`}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Progress;