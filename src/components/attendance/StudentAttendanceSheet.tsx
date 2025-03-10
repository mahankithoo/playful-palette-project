
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Student {
  id: number;
  name: string;
  rollNo: string;
  avatar: string;
  status: 'P' | 'A' | 'L';
  section?: string;
}

interface StudentAttendanceSheetProps {
  classInfo: string;
  sectionInfo: string;
}

const StudentAttendanceSheet: React.FC<StudentAttendanceSheetProps> = ({ classInfo, sectionInfo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('grid');
  
  useEffect(() => {
    // Simulate API call to get students based on class and section
    const timer = setTimeout(() => {
      // Generate sections A, B for demonstration
      const sections = ['A', 'B'];
      let generatedStudents: Student[] = [];
      
      // Create students for each section
      sections.forEach(section => {
        const sectionStudents = Array.from({ length: 10 }, (_, index) => ({
          id: section === 'A' ? index + 1 : index + 100,
          name: `${['Amanda', 'Angel', 'Alexander', 'Austin', 'Aada', 'Babak', 'Baha', 'Babette', 'Badan', 'Bailee'][index % 10]} ${['Kherr', 'Johnson'][index % 2]}`,
          rollNo: `${classInfo}${section}${(index + 1).toString().padStart(2, '0')}`,
          avatar: `https://i.pravatar.cc/150?img=${(index + 10) % 70}`,
          status: 'P' as 'P' | 'A' | 'L',
          section: section
        }));
        
        generatedStudents = [...generatedStudents, ...sectionStudents];
      });
      
      setStudents(generatedStudents);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [classInfo, sectionInfo]);
  
  const updateAttendanceStatus = (id: number, status: 'P' | 'A' | 'L') => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, status } : student
      )
    );
  };
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const markAllStatus = (status: 'P' | 'A' | 'L') => {
    setStudents(prev => prev.map(student => ({ ...student, status })));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
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
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-50"
              onClick={() => markAllStatus('P')}
            >
              Mark all present
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => markAllStatus('A')}
            >
              Mark all absent
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-50"
              onClick={() => markAllStatus('L')}
            >
              Mark all late
            </Button>
          </div>
          
          <div className="flex gap-2 rounded-lg bg-secondary p-1">
            <Button 
              size="sm" 
              variant={activeTab === 'list' ? 'default' : 'ghost'} 
              className="w-9 h-9 p-0" 
              onClick={() => setActiveTab('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </Button>
            <Button 
              size="sm" 
              variant={activeTab === 'grid' ? 'default' : 'ghost'} 
              className="w-9 h-9 p-0" 
              onClick={() => setActiveTab('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="grid" className="mt-0">
          {/* Group students by section */}
          {['A', 'B'].map(section => (
            <div key={section} className="mb-8">
              <h3 className="text-lg font-semibold mb-3">{section}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredStudents
                  .filter(student => student.section === section)
                  .map(student => (
                    <div key={student.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                      <div className="mb-2">
                        <Avatar className="h-20 w-20 border">
                          <img src={student.avatar} alt={student.name} />
                        </Avatar>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{student.rollNo}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className={`rounded-full w-9 h-9 p-0 ${
                            student.status === 'P' 
                              ? 'bg-green-500 text-white hover:bg-green-600 border-green-500' 
                              : 'text-green-500 border-green-500 hover:bg-green-50'
                          }`}
                          onClick={() => updateAttendanceStatus(student.id, 'P')}
                        >
                          P
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`rounded-full w-9 h-9 p-0 ${
                            student.status === 'A' 
                              ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' 
                              : 'text-red-500 border-red-500 hover:bg-red-50'
                          }`}
                          onClick={() => updateAttendanceStatus(student.id, 'A')}
                        >
                          A
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`rounded-full w-9 h-9 p-0 ${
                            student.status === 'L' 
                              ? 'bg-amber-500 text-white hover:bg-amber-600 border-amber-500' 
                              : 'text-amber-500 border-amber-500 hover:bg-amber-50'
                          }`}
                          onClick={() => updateAttendanceStatus(student.id, 'L')}
                        >
                          L
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Roll No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Section</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground tracking-wider">Attendance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-muted-foreground">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{student.rollNo}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border">
                            <img src={student.avatar} alt={student.name} />
                          </Avatar>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{student.section}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className={`rounded-full w-8 h-8 p-0 ${
                              student.status === 'P' 
                                ? 'bg-green-500 text-white hover:bg-green-600 border-green-500' 
                                : 'text-green-500 border-green-500 hover:bg-green-50'
                            }`}
                            onClick={() => updateAttendanceStatus(student.id, 'P')}
                          >
                            P
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`rounded-full w-8 h-8 p-0 ${
                              student.status === 'A' 
                                ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' 
                                : 'text-red-500 border-red-500 hover:bg-red-50'
                            }`}
                            onClick={() => updateAttendanceStatus(student.id, 'A')}
                          >
                            A
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`rounded-full w-8 h-8 p-0 ${
                              student.status === 'L' 
                                ? 'bg-amber-500 text-white hover:bg-amber-600 border-amber-500' 
                                : 'text-amber-500 border-amber-500 hover:bg-amber-50'
                            }`}
                            onClick={() => updateAttendanceStatus(student.id, 'L')}
                          >
                            L
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAttendanceSheet;
