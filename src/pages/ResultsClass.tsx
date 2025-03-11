
import React, { useState } from 'react';
import Layout from '@/components/Layout';
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
  BarChart4,
  Download,
  Upload,
  Edit,
  Trash
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultsClass: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { className, section } = location.state || { className: '8', section: 'B' };
  
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
          <div className="text-sm text-muted-foreground">
            Showing results for {students.length} students
          </div>
          <div className="flex gap-2">
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
        
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableRow key={student.id}>
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
      </div>
    </Layout>
  );
};

export default ResultsClass;
