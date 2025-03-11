
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
  Search, 
  Eye, 
  CheckCircle,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const PublishResults: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  
  const navigate = useNavigate();
  
  // Mock submitted results data
  const submittedResults = [
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
  ];

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

  const handleView = (resultId: string) => {
    navigate('/results/view', { 
      state: { 
        resultId,
        className: submittedResults.find(r => r.id === resultId)?.className,
        section: submittedResults.find(r => r.id === resultId)?.section
      } 
    });
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
          <Button>
            Publish All
          </Button>
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
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableRow key={result.id}>
                  <TableCell>{result.className}</TableCell>
                  <TableCell>{result.section}</TableCell>
                  <TableCell>{result.classTeacher}</TableCell>
                  <TableCell>{result.submittedDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(result.status)} border-0`}>
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(result.id)}>
                        View
                      </Button>
                      {result.status !== 'Published' && (
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
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
      </div>
    </Layout>
  );
};

export default PublishResults;
