import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  // Transform data to ensure numbers are properly formatted
  const chartData = budgetList.map(item => ({
    name: item.name,
    "Total Budget": Number(item.amount || 0),
    "Total Spent": Number(item.totalSpend || 0)
  }));

  return (
    <div className="border rounded-2xl p-5 w-full h-[400px]">
      <h2 className="font-bold text-lg mb-4">Budget Activity</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value) => `$${new Intl.NumberFormat().format(value)}`}
          />
          <Legend />
          <Bar dataKey="Total Spent" fill="#4845d2" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Total Budget" fill="#C3C2FF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;