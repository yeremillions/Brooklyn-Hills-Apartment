'use client'

import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface TrendChartProps {
  data: number[]
  color?: string
  height?: number
}

export function TrendChart({ data, color = '#3b82f6', height = 40 }: TrendChartProps) {
  // Convert array of numbers to recharts format
  const chartData = data.map((value, index) => ({ value, index }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
