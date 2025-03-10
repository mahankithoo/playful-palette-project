
import React, { useState, useEffect } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Attendant {
  id: number;
  name: string;
  percentage: number;
  days: number;
  avatar: string;
}

const TopAttendantList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setAttendants([
        { 
          id: 1, 
          name: 'Brooklyn Simmons', 
          percentage: 100, 
          days: 30,
          avatar: 'https://i.pravatar.cc/150?img=1' 
        },
        { 
          id: 2, 
          name: 'Cody Fisher', 
          percentage: 100, 
          days: 30,
          avatar: 'https://i.pravatar.cc/150?img=2' 
        },
        { 
          id: 3, 
          name: 'Marvin McKinney', 
          percentage: 98.7, 
          days: 29,
          avatar: 'https://i.pravatar.cc/150?img=3' 
        },
        { 
          id: 4, 
          name: 'Arlene McCoy', 
          percentage: 97, 
          days: 28,
          avatar: 'https://i.pravatar.cc/150?img=4' 
        },
        { 
          id: 5, 
          name: 'Kristin Watson', 
          percentage: 96.6, 
          days: 28,
          avatar: 'https://i.pravatar.cc/150?img=5' 
        },
        { 
          id: 6, 
          name: 'Savannah Nguyen', 
          percentage: 95, 
          days: 25,
          avatar: 'https://i.pravatar.cc/150?img=6' 
        },
      ]);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
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
      
      {isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {attendants.map((attendant) => (
            <div key={attendant.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border">
                  <img src={attendant.avatar} alt={attendant.name} />
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{attendant.name}</div>
                  <div className="text-xs text-muted-foreground">{attendant.percentage.toFixed(1)}%</div>
                </div>
              </div>
              <div className="text-sm font-medium">{attendant.days} days</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopAttendantList;
