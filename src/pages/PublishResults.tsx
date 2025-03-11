
import React, { useState } from 'react';
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
  ChevronLeft, 
  Search, 
  Eye, 
  CheckCircle,
  Trash,
} from 'lucide-react';
import { TablePagination } from '@/components/ui/table-pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import PublishConfirmDialog from '@/components/results/PublishConfirmDialog';
import { toast } from "sonner";

type ResultStatus = 'Pending' | 'Under Review' | 'Verified' | 'Published';

interface ResultItem {
  id: string;
  className: string;
  section: string;
  classTeacher: string;
  submittedDate: string;
  status: ResultStatus;
}

const PublishResults: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [resultToPublish, setResultToPublish] = useState<ResultItem | null>(null);
  
  const navigate = useNavigate();
  
  // Mock submitted results data
  const [submittedResults, setSubmittedResults] = useState<ResultItem[]>([
    { 
      id: '1', 
      className: '10', 
      section: 'A', 
      classTeacher: 'Mr. Sharma', 
      submittedDate: '25-Feb-2025',
      status: 'Pending' 
    },
    { 
      id: '2', 
      className: '9', 
      section: 'B', 
      classTeacher: 'Ms. Verma', 
      submittedDate: '26-Feb-2025',
      status: 'Under Review' 
    },
    { 
      id: '3', 
      className: '12', 
      section: 'C', 
      classTeacher: 'Mr. Kumar', 
      submittedDate: '27-Feb-2025',
      status: 'Verified' 
    },
    { 
      id: '4', 
      className: '8', 
      section: 'A', 
      classTeacher: 'Ms. Gupta', 
      submittedDate: '28-Feb-2025',
      status: 'Published' 
    },
    { 
      id: '5', 
      className: '11', 
      section: 'B', 
      classTeacher: 'Mr. Singh', 
      submittedDate: '1-Mar-2025',
      status: 'Pending' 
    },
  ]);

  const totalItems = submittedResults.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getStatusColor = (status: ResultStatus) => {
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

  const handleView = (resultId: string) => {
    const result = submittedResults.find(r => r.id === resultId);
    if (result) {
      navigate('/results/view', { 
        state: { 
          resultId,
          className: result.className,
          section: result.section,
          status: result.status
        } 
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setAllSelected(checked);
    if (checked) {
      setSelectedRows(submittedResults.map(result => result.id));
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

  const handleDeleteResult = (id: string) => {
    setSubmittedResults(submittedResults.filter(result => result.id !== id));
    toast.success("Result deleted successfully");
  };

  const handleStatusChange = (id: string, newStatus: ResultStatus) => {
    if (newStatus === 'Published') {
      const result = submittedResults.find(r => r.id === id);
      if (result) {
        setResultToPublish(result);
        setPublishDialogOpen(true);
      }
    } else {
      setSubmittedResults(submittedResults.map(result => 
        result.id === id ? { ...result, status: newStatus } : result
      ));
      toast.success(`Status updated to ${newStatus}`);
    }
  };

  const confirmPublish = () => {
    if (resultToPublish) {
      setSubmittedResults(submittedResults.map(result => 
        result.id === resultToPublish.id ? { ...result, status: 'Published' } : result
      ));
      toast.success(`Results for Class ${resultToPublish.className} Section ${resultToPublish.section} published successfully`);
      setPublishDialogOpen(false);
      setResultToPublish(null);
    }
  };

  const handlePublishAll = () => {
    if (selectedRows.length > 0) {
      setSubmittedResults(submittedResults.map(result => 
        selectedRows.includes(result.id) ? { ...result, status: 'Published' } : result
      ));
      toast.success(`${selectedRows.length} results published successfully`);
      setSelectedRows([]);
    } else {
      toast.error("Please select at least one result to publish");
    }
  };

  const handleDeleteSelected = () => {
    setSubmittedResults(submittedResults.filter(result => !selectedRows.includes(result.id)));
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
            <h2 className="text-xl font-bold tracking-tight">Publish Results</h2>
          </div>
          <div className="flex gap-2">
            {selectedRows.length > 0 && (
              <>
                <Button onClick={handleDeleteSelected} variant="outline" className="flex items-center gap-1">
                  <Trash className="h-4 w-4" />
                  Delete ({selectedRows.length})
                </Button>
                <Button onClick={handlePublishAll}>
                  Publish Selected
                </Button>
              </>
            )}
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
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="8">Class 8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-32">
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search class teachers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="border rounded-md overflow-hidden shadow">
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
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submittedResults.map((result) => (
                <TableRow key={result.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <Checkbox 
                      checked={selectedRows.includes(result.id)}
                      onCheckedChange={(checked) => handleSelectRow(result.id, checked as boolean)}
                      aria-label={`Select row ${result.id}`}
                    />
                  </TableCell>
                  <TableCell>{result.className}</TableCell>
                  <TableCell>{result.section}</TableCell>
                  <TableCell>{result.classTeacher}</TableCell>
                  <TableCell>{result.submittedDate}</TableCell>
                  <TableCell>
                    <Select 
                      value={result.status}
                      onValueChange={(value) => handleStatusChange(result.id, value as ResultStatus)}
                    >
                      <SelectTrigger className="w-32 h-8 px-2">
                        <Badge variant="outline" className={`${getStatusColor(result.status)} border-0 w-full flex justify-center`}>
                          {result.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Verified">Verified</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(result.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {result.status === 'Published' && (
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteResult(result.id)}>
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      )}
                      {result.status !== 'Published' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleStatusChange(result.id, 'Published')}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Publish
                        </Button>
                      )}
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

        <PublishConfirmDialog
          isOpen={publishDialogOpen}
          onClose={() => setPublishDialogOpen(false)}
          onConfirm={confirmPublish}
          className={resultToPublish?.className}
          section={resultToPublish?.section}
        />
      </div>
    </Layout>
  );
};

export default PublishResults;
