
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import AttendanceChart from '@/components/charts/AttendanceChart';
import TopAttendantList from '@/components/attendance/TopAttendantList';
import AttendanceControls from '@/components/attendance/AttendanceControls';
import { Helmet } from 'react-helmet';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const Attendance: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Attendance | EduAdmin</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Attendance</h1>
          
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg cursor-pointer">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigateDate('prev')}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center px-2 py-1">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {format(currentDate, "dd MMM yyyy")}
                  </span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigateDate('next')}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={currentDate}
                onSelect={handleDateSelect}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
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
