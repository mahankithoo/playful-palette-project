
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface GenderData {
  name: string;
  value: number;
  color: string;
}

const COLORS = ['#4285F4', '#EA4335'];

const GenderDistribution: React.FC = () => {
  const [data, setData] = useState<GenderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setData([
        { name: 'Boys', value: 5400, color: COLORS[0] },
        { name: 'Girls', value: 4600, color: COLORS[1] },
      ]);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  
  return (
    <div className="stats-card h-full overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <h3 className="text-base font-semibold mb-4">Total Students by Gender</h3>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-[220px]">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="h-[220px] flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                animationDuration={800}
                animationBegin={300}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} (${((Number(value) / total) * 100).toFixed(1)}%)`, 'Students']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f1f1f1'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="flex flex-col gap-2">
            {data.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
            <div className="mt-2 text-center">
              <span className="text-2xl font-bold">2500</span>
              <p className="text-xs text-muted-foreground">more boys than girls</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenderDistribution;
