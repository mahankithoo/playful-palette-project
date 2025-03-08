
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Event {
  id: number;
  date: string;
  title: string;
  classes: string[];
}

const EventsList: React.FC = () => {
  // Sample events data
  const events: Event[] = [
    {
      id: 1,
      date: '2023-02-04',
      title: 'Essay writing',
      classes: ['7', '8', '9']
    },
    {
      id: 2,
      date: '2023-02-04',
      title: 'Drawing',
      classes: ['1', '2', '3']
    },
    {
      id: 3,
      date: '2023-02-11',
      title: 'Sports Day',
      classes: ['All']
    },
    {
      id: 4,
      date: '2023-02-18',
      title: 'Science Exhibition',
      classes: ['9', '10']
    }
  ];

  // Format date to display
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    return {
      day: day,
      month: date.toLocaleString('default', { month: 'short' })
    };
  };

  return (
    <div className="space-y-4">
      {events.map(event => {
        const { day, month } = formatDate(event.date);
        
        return (
          <div key={event.id} className="flex items-start gap-3 border-b pb-4">
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium">{day}th</div>
              <div className="text-xs text-muted-foreground">{month}</div>
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-medium">{event.title}</h4>
              <p className="text-xs text-muted-foreground">
                Class {event.classes.join(',')}
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full p-1 hover:bg-muted">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete Event
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}
    </div>
  );
};

export default EventsList;
