
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

interface Teacher {
  id: number;
  name: string;
  designation: string;
  avatar: string;
  present: boolean;
}

const TeacherAttendanceSheet: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get teachers
    const timer = setTimeout(() => {
      // Sample teacher data
      const designations = [
        'Mathematics Teacher', 
        'English Teacher', 
        'Science Teacher', 
        'History Teacher',
        'Geography Teacher',
        'Computer Science Teacher',
        'Physical Education Teacher',
        'Art Teacher',
        'Music Teacher',
        'Biology Teacher',
        'Chemistry Teacher',
        'Physics Teacher'
      ];
      
      // Generate random teacher data
      const generatedTeachers = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: `Teacher ${index + 1}`,
        designation: designations[index],
        avatar: `https://i.pravatar.cc/150?img=${index + 40}`,
        present: true
      }));
      
      setTeachers(generatedTeachers);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleAttendance = (id: number) => {
    setTeachers(prev => 
      prev.map(teacher => 
        teacher.id === id ? { ...teacher, present: !teacher.present } : teacher
      )
    );
  };
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    teacher.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const markAllPresent = () => {
    setTeachers(prev => prev.map(teacher => ({ ...teacher, present: true })));
  };
  
  const markAllAbsent = () => {
    setTeachers(prev => prev.map(teacher => ({ ...teacher, present: false })));
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teacher..."
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
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead className="text-right">Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    No teachers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTeachers.map(teacher => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border">
                          <img src={teacher.avatar} alt={teacher.name} />
                        </Avatar>
                        <span className="font-medium">{teacher.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {teacher.designation}
                    </TableCell>
                    <TableCell className="text-right">
                      <Checkbox 
                        checked={teacher.present} 
                        onCheckedChange={() => toggleAttendance(teacher.id)}
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

export default TeacherAttendanceSheet;
