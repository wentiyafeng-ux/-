/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Radar, RadarChart as ReRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { FlavorProfile } from '../types.ts';

interface RadarChartProps {
  data: FlavorProfile;
}

export default function FlavorRadarChart({ data }: RadarChartProps) {
  const chartData = [
    { subject: '香气', value: data.aroma, fullMark: 10 },
    { subject: '苦度', value: data.bitterness, fullMark: 10 },
    { subject: '酒体', value: data.body, fullMark: 10 },
    { subject: '麦芽度', value: data.malt, fullMark: 10 },
    { subject: '色泽', value: data.color, fullMark: 10 },
  ];

  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ReRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e5e5e5" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#1a1a1a', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Flavor"
            dataKey="value"
            stroke="#a01d22"
            fill="#a01d22"
            fillOpacity={0.5}
          />
        </ReRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
