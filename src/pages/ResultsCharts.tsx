
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ResultsCharts: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedTerm, setSelectedTerm] = useState('1');
  
  // Mock subjects for pass/fail data
  const subjects = ["Mathematics", "Science", "English", "Social Studies", "Computer Science", "Physical Education", "Arts", "Music"];
  
  // Mock data for pass/fail chart
  const passFailData = [
    { subject: "Mathematics", pass: 25, fail: 5 },
    { subject: "Science", pass: 22, fail: 8 },
    { subject: "English", pass: 24, fail: 6 },
    { subject: "Social Studies", pass: 20, fail: 10 },
    { subject: "Computer Science", pass: 27, fail: 3 },
    { subject: "Physical Education", pass: 28, fail: 2 },
    { subject: "Arts", pass: 21, fail: 9 },
    { subject: "Music", pass: 26, fail: 4 }
  ];
  
  // Mock data for average/highest/lowest marks
  const marksData = [
    { subject: "Mathematics", average: 25, highest: 45, lowest: 5 },
    { subject: "Science", average: 23, highest: 47, lowest: 7 },
    { subject: "English", average: 24, highest: 44, lowest: 6 },
    { subject: "Social Studies", average: 20, highest: 40, lowest: 10 },
    { subject: "Computer Science", average: 27, highest: 48, lowest: 3 },
    { subject: "Physical Education", average: 29, highest: 50, lowest: 2 },
    { subject: "Arts", average: 22, highest: 42, lowest: 9 },
    { subject: "Music", average: 25, highest: 46, lowest: 5 }
  ];
  
  // Mock data for GPA distribution
  const gpaDistributionData = [
    { name: 'A+', value: 5, fill: '#4285F4' },
    { name: 'A', value: 10, fill: '#EA4335' },
    { name: 'B+', value: 8, fill: '#FBBC05' },
    { name: 'B', value: 17, fill: '#34A853' },
    { name: 'C+', value: 5, fill: '#FF9900' },
    { name: 'C', value: 4, fill: '#9C27B0' },
    { name: 'D+', value: 3, fill: '#00ACC1' },
    { name: 'D', value: 2, fill: '#FF5722' },
    { name: 'F', value: 6, fill: '#795548' }
  ];
  
  // Mock data for top students
  const topStudents = [
    { id: 1, name: 'Brooklyn Simmons', class: 'Class 8', section: 'A', gpa: '3.95', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'Cody Fisher', class: 'Class 10', section: 'B', gpa: '3.90', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Marvin McKinney', class: 'Class 10', section: 'A', gpa: '3.85', avatar: 'https://randomuser.me/api/portraits/men/61.jpg' },
    { id: 4, name: 'Arlene McCoy', class: 'Class 9', section: 'B', gpa: '3.80', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
    { id: 5, name: 'Kathryn Watson', class: 'Class 9', section: 'A', gpa: '3.75', avatar: 'https://randomuser.me/api/portraits/women/56.jpg' }
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
            <h2 className="text-xl font-bold tracking-tight">Results Analysis</h2>
          </div>
          <div className="flex gap-3">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
                <SelectItem value="6">Class 6</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
                <SelectItem value="D">Section D</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Term</SelectItem>
                <SelectItem value="2">2nd Term</SelectItem>
                <SelectItem value="3">3rd Term</SelectItem>
                <SelectItem value="4">4th Term</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 bg-card">
            <h3 className="font-medium text-lg mb-4">Pass and Fail</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={passFailData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pass" fill="#4285F4" name="Pass" />
                <Bar dataKey="fail" fill="#EA4335" name="Fail" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="border rounded-lg p-4 bg-card">
            <h3 className="font-medium text-lg mb-4">No of students vs. GPA</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gpaDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gpaDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 bg-card">
          <h3 className="font-medium text-lg mb-4">Average Mark, Highest Mark and Lowest Mark</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={marksData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="average" stroke="#8884d8" name="Average Mark" />
              <Line type="monotone" dataKey="highest" stroke="#4CAF50" name="Highest Mark" />
              <Line type="monotone" dataKey="lowest" stroke="#F44336" name="Lowest Mark" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="border rounded-lg p-4 bg-card">
          <h3 className="font-medium text-lg mb-4">Top Students</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topStudents.map(student => (
              <div key={student.id} className="flex flex-col items-center p-4 border rounded-lg bg-background">
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="w-16 h-16 rounded-full object-cover mb-3"
                />
                <h4 className="font-medium text-center">{student.name}</h4>
                <p className="text-sm text-muted-foreground">{student.class}, {student.section}</p>
                <p className="text-primary font-bold mt-2">{student.gpa} GPA</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResultsCharts;
