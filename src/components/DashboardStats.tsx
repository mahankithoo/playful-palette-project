
import React from 'react';
import { Users, UserCog, UserX, UserMinus } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '10,000',
      icon: Users,
      color: 'bg-blue-50 text-blue-500',
      growth: '+3.5%',
    },
    {
      title: 'Total Teachers',
      value: '2,000',
      icon: UserCog,
      color: 'bg-green-50 text-green-500',
      growth: '+2.1%',
    },
    {
      title: 'Absent Students',
      value: '250',
      icon: UserX,
      color: 'bg-red-50 text-red-500',
      growth: '-0.8%',
    },
    {
      title: 'Absent Teachers',
      value: '25',
      icon: UserMinus,
      color: 'bg-orange-50 text-orange-500',
      growth: '-1.2%',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {stats.map((stat, index) => (
        <div 
          key={stat.title} 
          className="stats-card animate-slide-up" 
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon size={20} />
            </div>
          </div>
          <div className="text-xs font-medium mt-2">
            <span className={stat.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {stat.growth} since last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
