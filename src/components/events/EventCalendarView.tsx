
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EventCalendarViewProps {
  currentMonth: number;
  currentYear: number;
}

interface CalendarEvent {
  id: number;
  date: string;
  title: string;
  classes: string[];
}

const EventCalendarView: React.FC<EventCalendarViewProps> = ({ currentMonth, currentYear }) => {
  // Sample events data
  const events: CalendarEvent[] = [
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
    },
    {
      id: 5,
      date: '2023-02-27',
      title: 'Parents Meeting',
      classes: ['All']
    },
    {
      id: 6,
      date: '2023-02-28',
      title: 'Annual Day Rehearsal',
      classes: ['7', '8', '9', '10']
    }
  ];

  // Days of the week header
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Generate the calendar days
  const getDaysInMonth = (month: number, year: number) => {
    // get all days in the specified month
    const date = new Date(year, month, 1);
    const days = [];
    
    // Add days from previous month to start the calendar from Sunday
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevMonthDay = daysInPrevMonth - i;
      days.push({
        date: new Date(year, month - 1, prevMonthDay),
        isCurrentMonth: false,
        events: []
      });
    }
    
    // Add days of current month
    while (date.getMonth() === month) {
      const currentDate = new Date(date);
      // Get events for this date
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateString);
      
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        events: dayEvents
      });
      date.setDate(date.getDate() + 1);
    }
    
    // Add days from next month to complete the calendar grid
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
    const remainingDays = 6 - lastDayOfMonth;
    
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        events: []
      });
    }
    
    return days;
  };
  
  const calendarDays = getDaysInMonth(currentMonth, currentYear);
  
  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Function to render event tooltip content
  const renderEventTooltip = (events: CalendarEvent[]) => {
    return (
      <div className="space-y-2 p-2">
        {events.map(event => (
          <div key={event.id} className="text-sm">
            <div className="font-medium">{event.title}</div>
            <div className="text-xs text-muted-foreground">
              Class {event.classes.join(',')}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center py-2 text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, index) => {
          const hasEvents = day.events.length > 0;
          const isToday = day.date.toDateString() === new Date().toDateString();
          
          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`
                      h-20 border rounded-lg p-1 overflow-hidden
                      ${day.isCurrentMonth ? 'bg-card' : 'bg-muted/40 text-muted-foreground'}
                      ${isToday ? 'ring-2 ring-primary' : ''}
                      ${hasEvents ? 'cursor-pointer hover:bg-muted/50' : ''}
                    `}
                  >
                    <div className="text-right text-sm p-1">
                      {day.date.getDate()}
                    </div>
                    
                    {hasEvents && (
                      <div className="flex flex-col gap-1 mt-1">
                        {day.events.slice(0, 2).map(event => (
                          <div 
                            key={event.id} 
                            className="text-[10px] bg-primary/10 text-primary rounded px-1 py-0.5 truncate"
                          >
                            {event.title}
                          </div>
                        ))}
                        {day.events.length > 2 && (
                          <div className="text-[10px] text-muted-foreground">
                            +{day.events.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                {hasEvents && (
                  <TooltipContent className="p-0 max-w-[200px]">
                    {renderEventTooltip(day.events)}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendarView;
