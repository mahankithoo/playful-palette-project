
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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Search, 
  Edit, 
  Trash, 
  ChevronsRight, 
  ChevronsLeft 
} from 'lucide-react';
import StudentFilters from '@/components/students/StudentFilters';
import StudentTableActions from '@/components/students/StudentTableActions';
import { Pagination } from '@/components/ui/pagination';

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  
  // Mock student data
  const students = [
    { id: '1001', name: 'Ankit Aryal', class: '10', contact: '9862417757', address: 'Sainamaina-5' },
    { id: '1002', name: 'Sarah Johnson', class: '10', contact: '9876543210', address: 'Sainamaina-5' },
    { id: '1003', name: 'Michael Brown', class: '9', contact: '9856432109', address: 'Sainamaina-3' },
    { id: '1004', name: 'Emily Davis', class: '11', contact: '9867543219', address: 'Sainamaina-2' },
    { id: '1005', name: 'David Wilson', class: '10', contact: '9854321098', address: 'Sainamaina-4' },
    { id: '1006', name: 'Sophia Miller', class: '12', contact: '9843210987', address: 'Sainamaina-1' },
    { id: '1007', name: 'James Taylor', class: '11', contact: '9832109876', address: 'Sainamaina-6' },
  ];
  
  const totalPages = 30; // Mock total pages
  
  const handleSelectAllStudents = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(students.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };
  
  const handleSelectStudent = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
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
        <h2 className="text-2xl font-bold tracking-tight">Students</h2>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
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
            <StudentTableActions />
          </div>
        </div>
        
        {showFilters && <StudentFilters />}
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={students.length > 0 && selectedStudents.length === students.length}
                    onCheckedChange={handleSelectAllStudents}
                  />
                </TableHead>
                <TableHead className="w-12">S.N.</TableHead>
                <TableHead className="w-24">UID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => handleSelectStudent(student.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.contact}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete">
                        <Trash className="h-4 w-4" />
                      </Button>
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

export default Students;
