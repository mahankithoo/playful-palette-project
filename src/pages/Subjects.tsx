
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Search, 
  Edit, 
  Trash, 
  ChevronsRight, 
  ChevronsLeft,
  Save,
  X 
} from 'lucide-react';
import SubjectFilters from '@/components/subjects/SubjectFilters';
import SubjectTableActions from '@/components/subjects/SubjectTableActions';
import { Pagination } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Subjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{[key: string]: string}>({});
  
  // Mock subject data
  const subjects = [
    { id: '1', name: 'Math', teacher: 'Ankit Aryal', fm1: '', pm1: '', fm2: '', pm2: '', fm3: '', pm3: '', fm4: '', pm4: '' },
    { id: '2', name: 'Science', teacher: 'Ankit Aryal', fm1: '', pm1: '', fm2: '', pm2: '', fm3: '', pm3: '', fm4: '', pm4: '' },
    { id: '3', name: 'Social', teacher: 'Ankit Aryal', fm1: '', pm1: '', fm2: '', pm2: '', fm3: '', pm3: '', fm4: '', pm4: '' },
    { id: '4', name: 'Nepali', teacher: 'Ankit Aryal', fm1: '', pm1: '', fm2: '', pm2: '', fm3: '', pm3: '', fm4: '', pm4: '' },
    { id: '5', name: 'Computer', teacher: 'Ankit Aryal', fm1: '', pm1: '', fm2: '', pm2: '', fm3: '', pm3: '', fm4: '', pm4: '' },
    { id: '6', name: 'English', teacher: 'Ankit Aryal', fm1: '', pm1: '', fm2: '', pm2: '', fm3: '', pm3: '', fm4: '', pm4: '' },
    { id: '7', name: 'Opt. Math', teacher: 'Ankit Aryal', fm1: '', pm1: '', fm2: '', pm2: '', fm3: '', pm3: '', fm4: '', pm4: '' },
  ];
  
  const totalPages = 30; // Mock total pages

  const handleEdit = (subjectId: string) => {
    setEditingSubject(subjectId);
    
    // Initialize edit values from the current subject
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      setEditValues({
        fm1: subject.fm1,
        pm1: subject.pm1,
        fm2: subject.fm2,
        pm2: subject.pm2,
        fm3: subject.fm3,
        pm3: subject.pm3,
        fm4: subject.fm4,
        pm4: subject.pm4
      });
    }
  };

  const handleSave = () => {
    // In a real app, you would save the edited values to your database
    console.log('Saving values for subject', editingSubject, editValues);
    setEditingSubject(null);
  };

  const handleCancel = () => {
    setEditingSubject(null);
    setEditValues({});
  };

  const handleInputChange = (field: string, value: string) => {
    setEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const displayPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // If we have fewer pages than our max, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // If we're at the start, show more pages after current
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4);
      }
      
      // If we're at the end, show more pages before current
      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push("...");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold tracking-tight">Subjects</h2>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2 items-center w-full md:w-auto">
            <div className="w-32">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Class 1</SelectItem>
                  <SelectItem value="2">Class 2</SelectItem>
                  <SelectItem value="3">Class 3</SelectItem>
                  <SelectItem value="4">Class 4</SelectItem>
                  <SelectItem value="5">Class 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-32">
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              className={showFilters ? "bg-primary/10" : ""}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <SubjectTableActions />
          </div>
        </div>
        
        {showFilters && <SubjectFilters />}
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">S.N.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subject Teacher</TableHead>
                <TableHead colSpan={2} className="text-center">1st Term</TableHead>
                <TableHead colSpan={2} className="text-center">2nd Term</TableHead>
                <TableHead colSpan={2} className="text-center">3rd Term</TableHead>
                <TableHead colSpan={2} className="text-center">4th Term</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
              <TableRow>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead className="text-center">FM</TableHead>
                <TableHead className="text-center">PM</TableHead>
                <TableHead className="text-center">FM</TableHead>
                <TableHead className="text-center">PM</TableHead>
                <TableHead className="text-center">FM</TableHead>
                <TableHead className="text-center">PM</TableHead>
                <TableHead className="text-center">FM</TableHead>
                <TableHead className="text-center">PM</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject, index) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.teacher}</TableCell>
                  
                  {/* 1st Term */}
                  <TableCell className="text-center">
                    {editingSubject === subject.id ? (
                      <Input 
                        className="w-12 h-8 p-1 text-center" 
                        value={editValues.fm1 || ''}
                        onChange={(e) => handleInputChange('fm1', e.target.value)}
                      />
                    ) : (
                      subject.fm1
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingSubject === subject.id ? (
                      <Input 
                        className="w-12 h-8 p-1 text-center" 
                        value={editValues.pm1 || ''}
                        onChange={(e) => handleInputChange('pm1', e.target.value)}
                      />
                    ) : (
                      subject.pm1
                    )}
                  </TableCell>
                  
                  {/* 2nd Term */}
                  <TableCell className="text-center">
                    {editingSubject === subject.id ? (
                      <Input 
                        className="w-12 h-8 p-1 text-center" 
                        value={editValues.fm2 || ''}
                        onChange={(e) => handleInputChange('fm2', e.target.value)}
                      />
                    ) : (
                      subject.fm2
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingSubject === subject.id ? (
                      <Input 
                        className="w-12 h-8 p-1 text-center" 
                        value={editValues.pm2 || ''}
                        onChange={(e) => handleInputChange('pm2', e.target.value)}
                      />
                    ) : (
                      subject.pm2
                    )}
                  </TableCell>
                  
                  {/* 3rd Term */}
                  <TableCell className="text-center">
                    {editingSubject === subject.id ? (
                      <Input 
                        className="w-12 h-8 p-1 text-center" 
                        value={editValues.fm3 || ''}
                        onChange={(e) => handleInputChange('fm3', e.target.value)}
                      />
                    ) : (
                      subject.fm3
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingSubject === subject.id ? (
                      <Input 
                        className="w-12 h-8 p-1 text-center" 
                        value={editValues.pm3 || ''}
                        onChange={(e) => handleInputChange('pm3', e.target.value)}
                      />
                    ) : (
                      subject.pm3
                    )}
                  </TableCell>
                  
                  {/* 4th Term */}
                  <TableCell className="text-center">
                    {editingSubject === subject.id ? (
                      <Input 
                        className="w-12 h-8 p-1 text-center" 
                        value={editValues.fm4 || ''}
                        onChange={(e) => handleInputChange('fm4', e.target.value)}
                      />
                    ) : (
                      subject.fm4
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingSubject === subject.id ? (
                      <Input 
                        className="w-12 h-8 p-1 text-center" 
                        value={editValues.pm4 || ''}
                        onChange={(e) => handleInputChange('pm4', e.target.value)}
                      />
                    ) : (
                      subject.pm4
                    )}
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {editingSubject === subject.id ? (
                        <>
                          <Button variant="ghost" size="icon" onClick={handleSave} title="Save">
                            <Save className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={handleCancel} title="Cancel">
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(subject.id)} title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Pagination className="flex justify-end">
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {displayPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <Button
                  key={index}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-primary text-primary-foreground" : ""}
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="px-2 text-muted-foreground">
                  {page}
                </span>
              )
            ))}
            
            <Button 
              variant="outline" 
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </Pagination>
      </div>
    </Layout>
  );
};

export default Subjects;
