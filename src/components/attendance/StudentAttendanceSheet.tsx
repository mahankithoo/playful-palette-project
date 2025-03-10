
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

interface Student {
  id: number;
  name: string;
  rollNo: string;
  avatar: string;
  present: boolean;
}

interface StudentAttendanceSheetProps {
  classInfo: string;
  sectionInfo: string;
}

const StudentAttendanceSheet: React.FC<StudentAttendanceSheetProps> = ({ classInfo, sectionInfo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get students based on class and section
    const timer = setTimeout(() => {
      // Generate random student data
      const generatedStudents = Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        name: `Student ${index + 1}`,
        rollNo: `${classInfo}${sectionInfo}${(index + 1).toString().padStart(2, '0')}`,
        avatar: `https://i.pravatar.cc/150?img=${index + 10}`,
        present: true
      }));
      
      setStudents(generatedStudents);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [classInfo, sectionInfo]);
  
  const toggleAttendance = (id: number) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: true })));
  };
  
  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: false })));
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search student..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <button 
            className="text-sm text-primary hover:underline" 
            onClick={markAllPresent}
          >
            Mark all present
          </button>
          <button 
            className="text-sm text-destructive hover:underline" 
            onClick={markAllAbsent}
          >
            Mark all absent
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-[400px]">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.rollNo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border">
                          <img src={student.avatar} alt={student.name} />
                        </Avatar>
                        <span>{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Checkbox 
                        checked={student.present} 
                        onCheckedChange={() => toggleAttendance(student.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default StudentAttendanceSheet;
