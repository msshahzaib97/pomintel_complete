import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HarvestActivityDataPoint } from '../../../types';
import { HARVEST_COUNTRY_COLORS } from '../../../constants';


interface HarvestActivityChartProps {
  data: HarvestActivityDataPoint[];
  selectedCountry: string; 
}

const HarvestActivityChart: React.FC<HarvestActivityChartProps> = ({ data, selectedCountry }) => {
  const countries = Object.keys(HARVEST_COUNTRY_COLORS);

  return (
    <div className="h-96 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> {/* gray-200 */}
          <XAxis dataKey="month" stroke="#6b7280" /> {/* gray-500 */}
          <YAxis 
            stroke="#6b7280" /* gray-500 */
            label={{ value: "Harvest Activity (%)", angle: -90, position: 'insideLeft', fill: '#4b5563', dy:70, dx:-5, fontSize:12 }} /* gray-600 */
            />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} /* white, gray-200 border */
            labelStyle={{ color: '#1f2937' }} /* gray-800 */
            itemStyle={{ color: '#374151' }} /* gray-700 */
            formatter={(value: number) => [`${value}%`, undefined]}
          />
          <Legend wrapperStyle={{ color: '#374151' }} /> {/* gray-700 */}
          {countries.map((country) => {
            if (selectedCountry === 'all' || selectedCountry.toLowerCase() === country.toLowerCase()) {
              return <Bar key={country} dataKey={country} fill={HARVEST_COUNTRY_COLORS[country]} />;
            }
            return null;
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HarvestActivityChart;