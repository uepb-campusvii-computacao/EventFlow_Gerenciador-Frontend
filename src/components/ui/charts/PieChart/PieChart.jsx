import PropTypes from 'prop-types';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import useWidth from '../../../../hooks/useWidth';

const renderTooltipContent = ({ payload }, total) => {
  if (payload && payload.length > 0) {
    return (
      <div className='rounded-md bg-white px-2 text-gray-800 shadow-md'>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`}>
            <span style={{ color: entry.color }}>
              <strong>{entry.name}</strong>: {entry.value} (
              {((entry.value / total) * 100).toFixed(2)}%)
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PieChartComponent = ({ title, data, total }) => {
  const width = useWidth();

  return (
    <div className='container rounded-md bg-white p-4 text-center'>
      <h2
        className='text-lg font-bold text-white'
        style={{ background: '#1c093d', padding: '10px', borderRadius: '5px' }}
      >
        {title}
      </h2>
      <ResponsiveContainer width='100%' height={380}>
        <PieChart>
          <Pie
            style={{ filter: 'drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.6))' }}
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={width > 450 ? 150 : 111}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={props => renderTooltipContent(props, total)} />
          <Legend
            align='center'
            verticalAlign='bottom'
            wrapperStyle={{
              background: '#1c093d',
              padding: '10px',
              borderRadius: '5px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

PieChartComponent.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
};

export default PieChartComponent;
