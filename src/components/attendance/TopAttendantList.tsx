
import React, { useState, useEffect } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Attendant {
  id: number;
  name: string;
  percentage: number;
  days: number;
  avatar: string;
  class: string;
  section: string;
}

const TopAttendantList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const [filteredAttendants, setFilteredAttendants] = useState<Attendant[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");
  
  const classes = ["all", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const sections = ["all", "A", "B", "C", "D"];
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setAttendants([
        { 
          id: 1, 
          name: 'Brooklyn Simmons', 
          percentage: 100, 
          days: 30,
          avatar: 'https://i.pravatar.cc/150?img=1',
          class: '10',
          section: 'A'
        },
        { 
          id: 2, 
          name: 'Cody Fisher', 
          percentage: 100, 
          days: 30,
          avatar: 'https://i.pravatar.cc/150?img=2',
          class: '10',
          section: 'B'
        },
        { 
          id: 3, 
          name: 'Marvin McKinney', 
          percentage: 98.7, 
          days: 29,
          avatar: 'https://i.pravatar.cc/150?img=3',
          class: '9',
          section: 'A'
        },
        { 
          id: 4, 
          name: 'Arlene McCoy', 
          percentage: 97, 
          days: 28,
          avatar: 'https://i.pravatar.cc/150?img=4',
          class: '9',
          section: 'B'
        },
        { 
          id: 5, 
          name: 'Kristin Watson', 
          percentage: 96.6, 
          days: 28,
          avatar: 'https://i.pravatar.cc/150?img=5',
          class: '8',
          section: 'A'
        },
        { 
          id: 6, 
          name: 'Savannah Nguyen', 
          percentage: 95, 
          days: 25,
          avatar: 'https://i.pravatar.cc/150?img=6',
          class: '8',
          section: 'B'
        },
      ]);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter attendants based on selected class and section
    let filtered = [...attendants];
    
    if (selectedClass !== "all") {
      filtered = filtered.filter(student => student.class === selectedClass);
    }
    
    if (selectedSection !== "all") {
      filtered = filtered.filter(student => student.section === selectedSection);
    }
    
    // Sort by percentage (highest first)
    filtered.sort((a, b) => b.percentage - a.percentage);
    
    // Take top 6 or less
    setFilteredAttendants(filtered.slice(0, 6));
  }, [attendants, selectedClass, selectedSection]);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Top 6 Attendant</h3>
        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View All</DropdownMenuItem>
            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem>Print Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[120px] h-8 text-xs">
            <SelectValue placeholder="All Classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {classes.filter(c => c !== "all").map(cls => (
              <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="w-[120px] h-8 text-xs">
            <SelectValue placeholder="All Sections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sections</SelectItem>
            {sections.filter(s => s !== "all").map(section => (
              <SelectItem key={section} value={section}>Section {section}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAttendants.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No students found for the selected filters
            </div>
          ) : (
            filteredAttendants.map((attendant) => (
              <div key={attendant.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border">
                    <img src={attendant.avatar} alt={attendant.name} />
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{attendant.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Class {attendant.class} Section {attendant.section} | {attendant.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium">{attendant.days} days</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TopAttendantList;
