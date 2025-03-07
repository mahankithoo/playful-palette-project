
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import GenderDistribution from '@/components/charts/GenderDistribution';
import AttendanceChart from '@/components/charts/AttendanceChart';
import NoticeBoard from '@/components/NoticeBoard';
import EventCalendar from '@/components/EventCalendar';

const Index: React.FC = () => {
  // Add smooth page transition
  useEffect(() => {
    document.body.classList.add('animate-fade-in');
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight animate-slide-down">Dashboard</h2>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GenderDistribution />
          <AttendanceChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <NoticeBoard />
          <EventCalendar />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
