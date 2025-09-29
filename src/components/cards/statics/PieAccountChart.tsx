import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, PieLabelRenderProps } from "recharts";

type MyPieLabelProps = PieLabelRenderProps & {
  name?: string;
  value?: number;
  percent?: number; // 일부 타입 정의에 없어서 선택으로 확장
};

const data = [
  { name: "피자", value: 400 },
  { name: "치킨", value: 300 },
  { name: "햄버거", value: 300 },
  { name: "떡볶이", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieAccountChart() {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(props: MyPieLabelProps) =>
            `${props.name} ${(props.percent ?? 0 * 100).toFixed(0)}%`
          }
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
