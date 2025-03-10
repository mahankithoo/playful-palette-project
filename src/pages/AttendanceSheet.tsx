
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save, Calendar } from 'lucide-react';
import StudentAttendanceSheet from '@/components/attendance/StudentAttendanceSheet';
import TeacherAttendanceSheet from '@/components/attendance/TeacherAttendanceSheet';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const AttendanceSheet: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Check if we're showing teacher or student attendance
  const isTeacherAttendance = location.state?.type === 'teacher';
  const classInfo = location.state?.class;
  const sectionInfo = location.state?.section;
  
  // Redirect if no class/section is selected for student attendance
  useEffect(() => {
    if (!isTeacherAttendance && (!classInfo || !sectionInfo)) {
      navigate('/attendance');
    }
  }, [isTeacherAttendance, classInfo, sectionInfo, navigate]);
  
  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: `Attendance has been saved successfully for ${isTeacherAttendance ? 'teachers' : `Class ${classInfo} Section ${sectionInfo}`}.`,
      });
      navigate('/attendance');
    }, 1500);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
      setCalendarOpen(false);
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>
          {isTeacherAttendance ? "Teacher's Attendance" : "Student's Attendance"} | EduAdmin
        </title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/attendance')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            
            <h1 className="text-2xl font-bold">
              {isTeacherAttendance 
                ? "Teacher's Attendance" 
                : `Class ${classInfo} Section ${sectionInfo} Attendance`}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <div className="flex items-center bg-muted/30 px-3 py-1.5 rounded-lg cursor-pointer">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {format(currentDate, "dd MMM yyyy")}
                  </span>
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
            
            <Button onClick={handleSave} disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700">
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Attendance
            </Button>
          </div>
        </div>
        
        <div className="stats-card">
          {isTeacherAttendance ? (
            <TeacherAttendanceSheet />
          ) : (
            <StudentAttendanceSheet classInfo={classInfo} sectionInfo={sectionInfo} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceSheet;
