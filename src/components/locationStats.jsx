import { PropTypes } from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const Location = ({ stats }) => {
  const cityCount = stats.reduce((acc, item) => {
    acc[item.city] ? (acc[item.city] += 1) : (acc[item.city] = 1);

    return acc;
  }, {});

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={cities.slice(0, 5)} margin={{ top: 20 }} width={700}>
        <XAxis dataKey="city" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip labelStyle={{ color: "green" }} />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

Location.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
};
