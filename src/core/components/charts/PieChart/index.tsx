//@TODO: refazer esse componente pois tive que usar IA pra tipagem da certo (entendi nda kkkkk)
import {
  Cell,
  Legend,
  Pie,
  PieChart as PieChartComponent,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import { useWidth } from '../../../hooks/useWidth';

interface PieChartData {
  name: string;
  value: number | (() => number);
  color: string;
}

const renderTooltipContent = (
  props: TooltipProps<ValueType, NameType> & { total: number }
) => {
  const { payload, total } = props;

  if (payload && payload.length > 0) {
    return (
      <div className='rounded-md bg-white px-2 text-gray-800 shadow-md'>
        {payload.map((entry, index) => {
          // Explicit numeric conversion and fallbacks
          const name = String(entry.name ?? 'Unknown');
          const value = Number(entry.value ?? 0);
          const color = String(entry.payload?.color ?? '#000');

          return (
            <p key={`tooltip-${index}`}>
              <span style={{ color }}>
                <strong>{name}</strong>: {value} (
                {total > 0
                  ? ((value / Number(total)) * 100).toFixed(2)
                  : '0.00'}
                %)
              </span>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

interface PieChartProps {
  title: string;
  data: PieChartData[];
  total: number | (() => number);
}

export function PieChart({ title, data, total }: PieChartProps) {
  const width = useWidth();
  const resolvedTotal = Number(typeof total === 'function' ? total() : total);

  const resolvedData = data.map(item => ({
    ...item,
    value: Number(typeof item.value === 'function' ? item.value() : item.value),
  }));

  return (
    <div className='container rounded-md bg-white p-4 text-center'>
      <h2
        className='text-lg font-bold text-white'
        style={{
          background: '#1c093d',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        {title}
      </h2>
      <ResponsiveContainer width='100%' height={380}>
        <PieChartComponent>
          <Pie
            style={{
              filter: 'drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.6))',
            }}
            data={resolvedData}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={width > 450 ? 150 : 111}
            fill='#8884d8'
            dataKey='value'
          >
            {resolvedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={props =>
              renderTooltipContent({ ...props, total: resolvedTotal })
            }
          />
          <Legend
            align='center'
            verticalAlign='bottom'
            wrapperStyle={{
              background: '#1c093d',
              padding: '10px',
              borderRadius: '5px',
            }}
          />
        </PieChartComponent>
      </ResponsiveContainer>
    </div>
  );
}
