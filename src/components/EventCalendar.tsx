
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface CalendarDay {
  date: number;
  currentMonth: boolean;
  hasEvent?: boolean;
  isToday?: boolean;
}

const EventCalendar: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  
  // Generate calendar days
  const generateCalendarDays = (): CalendarDay[] => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    let dayOfWeek = firstDayOfMonth.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Monday start
    
    const days: CalendarDay[] = [];
    
    // Add days from previous month
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        currentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        currentMonth: true,
        hasEvent: [5, 12, 19, 25].includes(i),
        isToday: i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
      });
    }
    
    // Add days from next month
    const daysNeeded = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= daysNeeded; i++) {
      days.push({
        date: i,
        currentMonth: false
      });
    }
    
    return days;
  };
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const days = generateCalendarDays();
  
  return (
    <div className="stats-card h-full overflow-hidden animate-slide-up" style={{ animationDelay: '0.6s' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Event Calendar</h3>
        <div className="flex items-center gap-2">
          <button 
            className="rounded-full p-1 hover:bg-muted/80 transition-colors"
            onClick={goToPreviousMonth}
          >
            <ChevronLeft size={16} className="text-muted-foreground" />
          </button>
          <span className="text-sm font-medium">
            {MONTHS[currentMonth]} {currentYear}
          </span>
          <button 
            className="rounded-full p-1 hover:bg-muted/80 transition-colors"
            onClick={goToNextMonth}
          >
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map(day => (
          <div key={day} className="text-xs text-muted-foreground text-center py-1 font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div 
            key={index}
            className={`
              text-xs text-center py-1 rounded-sm transition-all relative
              ${day.currentMonth ? 'font-medium' : 'text-muted-foreground/50'}
              ${day.isToday ? 'bg-primary/10 text-primary font-bold' : ''}
              ${day.hasEvent && !day.isToday ? 'font-bold' : ''}
            `}
          >
            {day.date}
            {day.hasEvent && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-3 border-t border-border/60 pt-3">
        <h4 className="text-xs font-medium mb-2">Upcoming Events</h4>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-xs">May 5 - Annual Function</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs">May 12 - Science Exhibition</span>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
