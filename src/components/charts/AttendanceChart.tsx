
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceChart: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setData([
        { name: 'Mon', present: 9600, absent: 400 },
        { name: 'Tue', present: 9550, absent: 450 },
        { name: 'Wed', present: 9700, absent: 300 },
        { name: 'Thu', present: 9400, absent: 600 },
        { name: 'Fri', present: 9650, absent: 350 },
        { name: 'Sat', present: 9800, absent: 200 },
      ]);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="stats-card h-full overflow-hidden animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Attendance</h3>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-chart-blue"></div>
            <span className="text-xs text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-chart-red"></div>
            <span className="text-xs text-muted-foreground">Absent</span>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-[220px]">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: -20,
                bottom: 5,
              }}
              barGap={2}
              barSize={14}
            >
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tickMargin={8}
              />
              <YAxis 
                hide={true}
              />
              <Tooltip
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f1f1f1'
                }}
                formatter={(value) => [`${value}`, 'Students']}
              />
              <Bar 
                dataKey="present" 
                fill="#4285F4" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={300}
              />
              <Bar 
                dataKey="absent" 
                fill="#EA4335" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AttendanceChart;
