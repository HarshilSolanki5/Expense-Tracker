import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// No changes to the CustomTooltip component itself, just how it's called
const CustomTooltip = ({ active, payload, label, tooltipLabelKey }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {/* Use the dynamic key here */}
          {payload[0].payload[tooltipLabelKey] ? `${payload[0].payload[tooltipLabelKey]}: ` : `${label}: `}
        </p>
        <p className="text-sm text-gray-600">
          Amount:
          <span className="text-sm font-medium text-gray-900">
             {/* Using addThousandsSeparator would be a nice touch here if you import it */}
            {payload[0].payload.amount}
          </span>
        </p>
      </div>
    );
  }
  return null;
};


// MODIFIED: Accept new props: xAxisDataKey and tooltipLabelKey
const CustomBarChart = ({ data, xAxisDataKey, tooltipLabelKey }) => {

    const getBarColor = (index) => {
      return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            // MODIFIED: Use the dynamic prop for the dataKey
            dataKey={xAxisDataKey}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke='none' // Corrected typo from 'strock' to 'stroke'
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          {/* MODIFIED: Pass the dynamic key to our custom tooltip */}
          <Tooltip content={<CustomTooltip tooltipLabelKey={tooltipLabelKey} />} />

          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`} // Use a more robust key
                fill={getBarColor(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;