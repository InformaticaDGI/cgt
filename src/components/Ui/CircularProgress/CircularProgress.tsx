import { Cell, Pie, PieChart } from "recharts"
import { Flex } from "../../Layout/Flex";

const CircularProgress = ({ progress = 75, size = 200, textSize = 20, strokeWidth = 20, color = '#FF0000', backgroundColor = '#FFFFFF' }) => {
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
<Flex $justify="center" $align="center" $width={size.toString()} $height={size.toString()} style={{ pointerEvents: 'none' }}>
      <PieChart width={size} height={size} >
        {/* Background circle without corner radius */}
        <Pie
          data={[{ name: 'Background', value: 100 }]}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          dataKey="value"
        >
          <Cell key="background" fill={backgroundColor} stroke="none" />
        </Pie>
        
        {/* Progress circle with corner radius */}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={90}
          endAngle={-270}
          cornerRadius={12}
          paddingAngle={0}
          dataKey="value"
        >
          <Cell key="progress-segment" fill={color} stroke="none" />
          <Cell key="remaining-segment" fill="transparent" stroke="none" />
        </Pie>
        
        {/* Puedes añadir texto en el centro si lo deseas, por ejemplo el porcentaje */}
        <text x="53%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#333" fontSize={textSize} fontWeight={'600'}>
          {`${actualProgress}%`}
        </text>
      </PieChart>
    </Flex>
  );
};

export default CircularProgress;