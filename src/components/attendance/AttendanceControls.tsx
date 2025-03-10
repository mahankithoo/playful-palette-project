
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarCheck2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AttendanceControls: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const navigate = useNavigate();
  
  const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const sections = ["A", "B", "C", "D"];
  const subjects = [
    "Mathematics", 
    "English", 
    "Science", 
    "Social Studies", 
    "Computer Science", 
    "Physical Education", 
    "Art"
  ];
  
  const handleTakeAttendance = () => {
    navigate('/attendance/sheet', { 
      state: { 
        type: 'student',
        class: selectedClass, 
        section: selectedSection,
        subject: selectedSubject
      } 
    });
  };
  
  const handleTeacherAttendance = () => {
    navigate('/attendance/sheet', { 
      state: { 
        type: 'teacher'
      } 
    });
  };
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex flex-1 flex-col sm:flex-row gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="min-w-[140px]">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map(cls => (
              <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="min-w-[140px]">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map(section => (
              <SelectItem key={section} value={section}>Section {section}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="min-w-[140px]">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={handleTakeAttendance} 
          disabled={!selectedClass || !selectedSection}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <CalendarCheck2 className="h-4 w-4 mr-2" />
          Take Attendance
        </Button>
        
        <Button variant="outline" onClick={handleTeacherAttendance}>
          <Users className="h-4 w-4 mr-2" />
          Teacher's Attendance
        </Button>
      </div>
    </div>
  );
};

export default AttendanceControls;
