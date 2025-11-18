import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type SingleSeriesChart = {
  labels: (string | number)[];
  values: (number | null)[];
};

type MultiSeriesChart = {
  labels: (string | number)[];
  series: Record<string, (number | null)[]>;
};

export const LineChart = ({ data }: { data: SingleSeriesChart }) => {
  const chart = {
    labels: data.labels,
    datasets: [
      {
        label: "Trend",
        data: data.values,
      },
    ],
  };

  const formattedData = data.labels.map((label, index) => ({
    label,
    value: data.values[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <RechartsLineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export const MultiLineChart = ({ data }: { data: MultiSeriesChart }) => {
  const chart = {
    labels: data.labels,
    datasets: Object.keys(data.series).map((loc) => ({
      label: loc,
      data: data.series[loc],
    })),
  };

  const formattedData = data.labels.map((label, index) => {
    const row: Record<string, string | number | null> = { label };
    Object.keys(data.series).forEach((loc) => {
      row[loc] = data.series[loc][index];
    });
    return row;
  });

  const palette = ["#1d4ed8", "#9333ea", "#16a34a", "#ea580c"];

  return (
    <ResponsiveContainer width="100%" height={360}>
      <RechartsLineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(data.series).map((loc, index) => (
          <Line
            key={loc}
            type="monotone"
            dataKey={loc}
            stroke={palette[index % palette.length]}
            strokeWidth={3}
            dot
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
