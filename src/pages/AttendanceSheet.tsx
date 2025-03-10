
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save } from 'lucide-react';
import StudentAttendanceSheet from '@/components/attendance/StudentAttendanceSheet';
import TeacherAttendanceSheet from '@/components/attendance/TeacherAttendanceSheet';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';

const AttendanceSheet: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  return (
    <Layout>
      <Helmet>
        <title>
          {isTeacherAttendance ? "Teacher's Attendance" : "Student's Attendance"} | EduAdmin
        </title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
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
          
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Attendance
          </Button>
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
