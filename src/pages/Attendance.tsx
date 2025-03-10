
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import AttendanceChart from '@/components/charts/AttendanceChart';
import TopAttendantList from '@/components/attendance/TopAttendantList';
import AttendanceControls from '@/components/attendance/AttendanceControls';
import { Helmet } from 'react-helmet';

const Attendance: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Attendance | EduAdmin</title>
      </Helmet>
      
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Attendance</h1>
        
        <AttendanceControls />
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="stats-card">
            <AttendanceChart />
          </div>
          
          <div className="stats-card">
            <TopAttendantList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
