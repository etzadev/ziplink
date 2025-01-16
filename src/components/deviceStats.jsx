import { PieChart, ResponsiveContainer, Cell, Pie } from "recharts";
import { PropTypes } from "prop-types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const Device = ({ stats }) => {
  const deviceCount = stats.reduce((acc, item) => {
    acc[item.device] ? (acc[item.device] += 1) : (acc[item.device] = 1);

    return acc;
  }, {});

  const result = Object.entries(deviceCount).map(([device, count]) => ({
    device,
    count,
  }));

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <PieChart width={700} height={400}>
        <Pie
          data={result}
          labelLine={false}
          label={({ device, percent }) =>
            `${device}: ${(percent * 100).toFixed(0)}%`
          }
          dataKey="count"
        >
          {result.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

Device.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
};
