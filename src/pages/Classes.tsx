
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
import ClassFilters from '@/components/classes/ClassFilters';
import ClassTableActions from '@/components/classes/ClassTableActions';
import { Pagination } from '@/components/ui/pagination';

const Classes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  
  // Mock class data
  const classes = [
    { id: '1', name: 'Nursery', section: 'D', classTeacher: 'Ankit Aryal', contact: '9862417757' },
    { id: '2', name: 'Ten', section: 'C', classTeacher: 'Ankit Aryal', contact: '9862417757' },
    { id: '3', name: 'Seven', section: 'A', classTeacher: 'Ankit Aryal', contact: '9862417757' },
    { id: '4', name: 'Eight', section: 'B', classTeacher: 'Ankit Aryal', contact: '9862417757' },
    { id: '5', name: 'Nine', section: 'A', classTeacher: 'Ankit Aryal', contact: '9862417757' },
    { id: '6', name: 'Six', section: 'B', classTeacher: 'Ankit Aryal', contact: '9862417757' },
    { id: '7', name: 'Five', section: 'D', classTeacher: 'Ankit Aryal', contact: '9862417757' },
    { id: '8', name: 'Three', section: 'C', classTeacher: 'Ankit Aryal', contact: '9862417757' },
  ];
  
  const totalPages = 30; // Mock total pages
  
  const handleSelectAllClasses = (checked: boolean) => {
    if (checked) {
      setSelectedClasses(classes.map(classItem => classItem.id));
    } else {
      setSelectedClasses([]);
    }
  };
  
  const handleSelectClass = (classId: string, checked: boolean) => {
    if (checked) {
      setSelectedClasses(prev => [...prev, classId]);
    } else {
      setSelectedClasses(prev => prev.filter(id => id !== classId));
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
        <h2 className="text-2xl font-bold tracking-tight">Classes</h2>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
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
            <ClassTableActions />
          </div>
        </div>
        
        {showFilters && <ClassFilters />}
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={classes.length > 0 && selectedClasses.length === classes.length}
                    onCheckedChange={handleSelectAllClasses}
                  />
                </TableHead>
                <TableHead className="w-12">S.N.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classItem, index) => (
                <TableRow key={classItem.id} className="cursor-pointer" onClick={() => console.log(`Navigate to students of class ${classItem.name}`)}>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedClasses.includes(classItem.id)}
                      onCheckedChange={(checked) => handleSelectClass(classItem.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{classItem.name}</TableCell>
                  <TableCell>{classItem.section}</TableCell>
                  <TableCell>{classItem.classTeacher}</TableCell>
                  <TableCell>{classItem.contact}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
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

export default Classes;
