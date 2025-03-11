
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
  Eye, 
  ChevronsRight, 
  ChevronsLeft,
  BarChart4
} from 'lucide-react';
import ResultsFilters from '@/components/results/ResultsFilters';
import ResultsTableActions from '@/components/results/ResultsTableActions';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const Results: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  
  const navigate = useNavigate();
  
  // Mock students data
  const students = [
    { id: '1', name: 'Ankit Aryal', className: '10', section: 'A', gpa: '3.8', percentage: '85%', term: '1st' },
    { id: '2', name: 'Rahul Sharma', className: '10', section: 'A', gpa: '4.0', percentage: '92%', term: '1st' },
    { id: '3', name: 'Priya Singh', className: '10', section: 'B', gpa: '3.7', percentage: '84%', term: '1st' },
    { id: '4', name: 'Amit Kumar', className: '9', section: 'A', gpa: '3.5', percentage: '82%', term: '1st' },
    { id: '5', name: 'Neha Patel', className: '9', section: 'B', gpa: '3.9', percentage: '88%', term: '1st' },
    { id: '6', name: 'Vikram Aditya', className: '9', section: 'C', gpa: '3.6', percentage: '83%', term: '1st' },
    { id: '7', name: 'Anjali Verma', className: '8', section: 'A', gpa: '4.0', percentage: '91%', term: '1st' },
  ];
  
  const totalPages = 30; // Mock total pages

  const handleShowClass = () => {
    if (selectedClass && selectedSection) {
      navigate('/results/class', { 
        state: { 
          className: selectedClass, 
          section: selectedSection 
        } 
      });
    }
  };
  
  const handleShowCharts = () => {
    navigate('/results/charts');
  };
  
  const handlePublishResults = () => {
    navigate('/results/publish');
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
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Results</h2>
          <div className="flex gap-3">
            <Button onClick={handlePublishResults}>Publish Result</Button>
            <Button onClick={handleShowCharts} variant="outline">Show Chart</Button>
          </div>
        </div>
        
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
                  <SelectItem value="6">Class 6</SelectItem>
                  <SelectItem value="7">Class 7</SelectItem>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
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
                  <SelectItem value="D">Section D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative flex-1 min-w-[200px]">
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
            <ResultsTableActions />
          </div>
        </div>
        
        {showFilters && <ResultsFilters />}
        
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">UID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Term</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.className}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.gpa}</TableCell>
                  <TableCell>{student.percentage}</TableCell>
                  <TableCell>{student.term}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={handleShowClass}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            
            {displayPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            ))}
            
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Layout>
  );
};

export default Results;
