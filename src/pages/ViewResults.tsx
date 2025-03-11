
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
  Download,
  CheckCircle,
  Search
} from 'lucide-react';
import { TablePagination } from '@/components/ui/table-pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import PublishConfirmDialog from '@/components/results/PublishConfirmDialog';
import { toast } from "sonner";

const ViewResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { className = '8', section = 'B', status = 'Under Review' } = location.state || {};
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  
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

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Published':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  const handlePublishResult = () => {
    setPublishDialogOpen(true);
  };

  const confirmPublish = () => {
    toast.success(`Results for Class ${className} Section ${section} published successfully`);
    setPublishDialogOpen(false);
    navigate('/results/publish');
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/results/publish')}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <h2 className="text-xl font-bold tracking-tight">Class {className} Section {section}</h2>
            <Badge variant="outline" className={`${getStatusColor(status)} border-0`}>
              {status}
            </Badge>
          </div>
          <div className="flex gap-3">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            {status !== 'Published' && (
              <Button className="flex items-center gap-1" onClick={handlePublishResult}>
                <CheckCircle className="h-4 w-4" />
                Publish Result
              </Button>
            )}
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
                <TableHead className="w-24 text-center">Actions</TableHead>
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
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm">
                      Review
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

        <PublishConfirmDialog
          isOpen={publishDialogOpen}
          onClose={() => setPublishDialogOpen(false)}
          onConfirm={confirmPublish}
          className={className}
          section={section}
        />
      </div>
    </Layout>
  );
};

export default ViewResults;
