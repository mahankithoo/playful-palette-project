
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Filter, 
  Search, 
  Trash, 
  Eye, 
  BarChart4
} from 'lucide-react';
import ResultsFilters from '@/components/results/ResultsFilters';
import ResultsTableActions from '@/components/results/ResultsTableActions';
import { TablePagination } from '@/components/ui/table-pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const Results: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  
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
    { id: '8', name: 'Sunil Gupta', className: '10', section: 'C', gpa: '3.5', percentage: '80%', term: '1st' },
    { id: '9', name: 'Meena Kumari', className: '8', section: 'B', gpa: '3.7', percentage: '86%', term: '1st' },
    { id: '10', name: 'Rajesh Khanna', className: '9', section: 'D', gpa: '3.8', percentage: '87%', term: '1st' },
  ];
  
  const totalItems = students.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleShowClass = () => {
    if (selectedClass && selectedSection) {
      navigate('/results/class', { 
        state: { 
          className: selectedClass, 
          section: selectedSection 
        } 
      });
    } else {
      toast.error("Please select both Class and Section");
    }
  };
  
  const handleShowCharts = () => {
    navigate('/results/charts');
  };
  
  const handlePublishResults = () => {
    navigate('/results/publish');
  };

  useEffect(() => {
    if (selectedClass && selectedSection) {
      handleShowClass();
    }
  }, [selectedClass, selectedSection]);

  const handleSelectAll = (checked: boolean) => {
    setAllSelected(checked);
    if (checked) {
      setSelectedRows(students.map(student => student.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  useEffect(() => {
    // Check if all items in current view are selected
    if (students.length > 0 && selectedRows.length === students.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedRows, students]);

  const handleDeleteSelected = () => {
    toast.success(`Deleted ${selectedRows.length} items successfully`);
    setSelectedRows([]);
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
            {selectedRows.length > 0 && (
              <Button variant="outline" className="flex items-center gap-1" onClick={handleDeleteSelected}>
                <Trash className="h-4 w-4" />
                Delete ({selectedRows.length})
              </Button>
            )}
            <ResultsTableActions />
          </div>
        </div>
        
        {showFilters && <ResultsFilters />}
        
        <div className="border rounded-md overflow-x-auto shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
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
                <TableRow key={student.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <Checkbox 
                      checked={selectedRows.includes(student.id)}
                      onCheckedChange={(checked) => handleSelectRow(student.id, checked as boolean)}
                      aria-label={`Select row ${student.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.className}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.gpa}</TableCell>
                  <TableCell>{student.percentage}</TableCell>
                  <TableCell>{student.term}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleShowClass()}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          selectedItems={selectedRows.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </Layout>
  );
};

export default Results;
