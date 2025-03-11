
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
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
  BarChart4,
  Download,
  Upload,
  Edit,
  Trash,
  Search
} from 'lucide-react';
import { TablePagination } from '@/components/ui/table-pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";

const ResultsClass: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { className, section } = location.state || { className: '8', section: 'B' };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  
  // Mock subjects
  const subjects = [
    "Mathematics", 
    "Science", 
    "English", 
    "Social Studies", 
    "Computer Science", 
    "Physical Education", 
    "Arts", 
    "Music"
  ];
  
  // Mock student data with marks for each subject
  const students = [
    { 
      id: '1', 
      name: 'Ankit Aryal', 
      rollNo: '101',
      marks: [85, 78, 92, 88, 95, 89, 76, 82],
      percentage: '85.6%',
      gpa: '3.8',
      term: '1st'
    },
    { 
      id: '2', 
      name: 'Rahul Sharma', 
      rollNo: '102',
      marks: [92, 88, 90, 94, 89, 91, 87, 93],
      percentage: '90.5%',
      gpa: '4.0',
      term: '1st'
    },
    { 
      id: '3', 
      name: 'Priya Singh', 
      rollNo: '103',
      marks: [78, 82, 85, 79, 88, 75, 80, 84],
      percentage: '81.4%',
      gpa: '3.6',
      term: '1st'
    },
    { 
      id: '4', 
      name: 'Amit Kumar', 
      rollNo: '104',
      marks: [90, 85, 88, 92, 94, 87, 89, 91],
      percentage: '89.5%',
      gpa: '3.9',
      term: '1st'
    },
    { 
      id: '5', 
      name: 'Neha Patel', 
      rollNo: '105',
      marks: [75, 78, 82, 80, 85, 79, 76, 81],
      percentage: '79.5%',
      gpa: '3.4',
      term: '1st'
    },
    { 
      id: '6', 
      name: 'Sanjay Gupta', 
      rollNo: '106',
      marks: [88, 90, 85, 87, 92, 84, 89, 91],
      percentage: '88.3%',
      gpa: '3.8',
      term: '1st'
    },
    { 
      id: '7', 
      name: 'Anjali Verma', 
      rollNo: '107',
      marks: [95, 92, 88, 91, 94, 89, 93, 90],
      percentage: '91.5%',
      gpa: '4.0',
      term: '1st'
    },
  ];

  const totalItems = students.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  const handleDeleteSelected = () => {
    toast.success(`Deleted ${selectedRows.length} items successfully`);
    setSelectedRows([]);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/results')}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <h2 className="text-xl font-bold tracking-tight">Class {className} Section {section}</h2>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/results/charts')} variant="outline">
              <BarChart4 className="h-4 w-4 mr-2" />
              Show Chart
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between gap-4 items-center">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {selectedRows.length > 0 && (
              <Button variant="outline" className="flex items-center gap-1" onClick={handleDeleteSelected}>
                <Trash className="h-4 w-4" />
                Delete ({selectedRows.length})
              </Button>
            )}
            <Button size="sm" variant="outline" className="flex gap-1">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button size="sm" variant="outline" className="flex gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
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
                <TableHead className="text-center">Roll No</TableHead>
                {subjects.map((subject, idx) => (
                  <TableHead key={idx} className="text-center whitespace-nowrap">
                    {subject}
                  </TableHead>
                ))}
                <TableHead className="text-center">%</TableHead>
                <TableHead className="text-center">GPA</TableHead>
                <TableHead className="text-center">Term</TableHead>
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
                  <TableCell className="text-center">{student.rollNo}</TableCell>
                  {student.marks.map((mark, idx) => (
                    <TableCell key={idx} className="text-center">{mark}</TableCell>
                  ))}
                  <TableCell className="text-center">{student.percentage}</TableCell>
                  <TableCell className="text-center">{student.gpa}</TableCell>
                  <TableCell className="text-center">{student.term}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
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

export default ResultsClass;
