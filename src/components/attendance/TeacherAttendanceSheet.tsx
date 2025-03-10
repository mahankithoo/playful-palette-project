
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Teacher {
  id: number;
  name: string;
  designation: string;
  avatar: string;
  status: 'P' | 'A' | 'L';
}

const TeacherAttendanceSheet: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('grid');
  
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
        name: `${['Amanda', 'Angel', 'Alexander', 'Austin', 'Aada', 'Babak', 'Baha', 'Babette', 'Badan', 'Bailee'][index % 10]} ${['Kherr', 'Johnson'][index % 2]}`,
        designation: designations[index],
        avatar: `https://i.pravatar.cc/150?img=${index + 40}`,
        status: 'P' as 'P' | 'A' | 'L'
      }));
      
      setTeachers(generatedTeachers);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  const updateAttendanceStatus = (id: number, status: 'P' | 'A' | 'L') => {
    setTeachers(prev => 
      prev.map(teacher => 
        teacher.id === id ? { ...teacher, status } : teacher
      )
    );
  };
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    teacher.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const markAllStatus = (status: 'P' | 'A' | 'L') => {
    setTeachers(prev => prev.map(teacher => ({ ...teacher, status })));
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
            placeholder="Search teacher..."
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredTeachers.map(teacher => (
              <div key={teacher.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                <div className="mb-2">
                  <Avatar className="h-20 w-20 border">
                    <img src={teacher.avatar} alt={teacher.name} />
                  </Avatar>
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{teacher.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 truncate max-w-[120px]">{teacher.designation}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className={`rounded-full w-9 h-9 p-0 ${
                      teacher.status === 'P' 
                        ? 'bg-green-500 text-white hover:bg-green-600 border-green-500' 
                        : 'text-green-500 border-green-500 hover:bg-green-50'
                    }`}
                    onClick={() => updateAttendanceStatus(teacher.id, 'P')}
                  >
                    P
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`rounded-full w-9 h-9 p-0 ${
                      teacher.status === 'A' 
                        ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' 
                        : 'text-red-500 border-red-500 hover:bg-red-50'
                    }`}
                    onClick={() => updateAttendanceStatus(teacher.id, 'A')}
                  >
                    A
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`rounded-full w-9 h-9 p-0 ${
                      teacher.status === 'L' 
                        ? 'bg-amber-500 text-white hover:bg-amber-600 border-amber-500' 
                        : 'text-amber-500 border-amber-500 hover:bg-amber-50'
                    }`}
                    onClick={() => updateAttendanceStatus(teacher.id, 'L')}
                  >
                    L
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Designation</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground tracking-wider">Attendance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-muted-foreground">
                      No teachers found
                    </td>
                  </tr>
                ) : (
                  filteredTeachers.map(teacher => (
                    <tr key={teacher.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border">
                            <img src={teacher.avatar} alt={teacher.name} />
                          </Avatar>
                          <span className="font-medium">{teacher.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        {teacher.designation}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className={`rounded-full w-8 h-8 p-0 ${
                              teacher.status === 'P' 
                                ? 'bg-green-500 text-white hover:bg-green-600 border-green-500' 
                                : 'text-green-500 border-green-500 hover:bg-green-50'
                            }`}
                            onClick={() => updateAttendanceStatus(teacher.id, 'P')}
                          >
                            P
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`rounded-full w-8 h-8 p-0 ${
                              teacher.status === 'A' 
                                ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' 
                                : 'text-red-500 border-red-500 hover:bg-red-50'
                            }`}
                            onClick={() => updateAttendanceStatus(teacher.id, 'A')}
                          >
                            A
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`rounded-full w-8 h-8 p-0 ${
                              teacher.status === 'L' 
                                ? 'bg-amber-500 text-white hover:bg-amber-600 border-amber-500' 
                                : 'text-amber-500 border-amber-500 hover:bg-amber-50'
                            }`}
                            onClick={() => updateAttendanceStatus(teacher.id, 'L')}
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

export default TeacherAttendanceSheet;
