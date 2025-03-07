
import React, { useState, useEffect } from 'react';
import { Bell, Calendar, MoreHorizontal, Paperclip } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  date: string;
  type: 'notice' | 'reminder' | 'event';
  hasAttachment?: boolean;
}

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotices([
        {
          id: 1,
          title: 'Annual function preparations to start',
          date: '05 May, 2023',
          type: 'notice',
          hasAttachment: true
        },
        {
          id: 2,
          title: 'Mid-term examination dates',
          date: '28 Apr, 2023',
          type: 'reminder'
        },
        {
          id: 3,
          title: 'Teacher development program',
          date: '15 Apr, 2023',
          type: 'event'
        },
        {
          id: 4,
          title: 'New schedule starting Monday',
          date: '10 Apr, 2023',
          type: 'notice',
          hasAttachment: true
        }
      ]);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'notice':
        return <Bell size={16} className="text-primary" />;
      case 'event':
        return <Calendar size={16} className="text-green-500" />;
      case 'reminder':
        return <Bell size={16} className="text-orange-500" />;
      default:
        return <Bell size={16} />;
    }
  };
  
  return (
    <div className="stats-card h-full overflow-hidden animate-slide-up" style={{ animationDelay: '0.5s' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Notice Board</h3>
        <button className="text-xs font-medium text-primary hover:underline">View All</button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-[220px]">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {notices.map((notice, index) => (
            <div 
              key={notice.id} 
              className="notice-card" 
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted/80">
                {getIcon(notice.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{notice.title}</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1 gap-2">
                  <span>{notice.date}</span>
                  {notice.hasAttachment && (
                    <div className="flex items-center">
                      <Paperclip size={12} />
                      <span className="ml-1">1 file</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <button className="rounded-full p-1 hover:bg-muted/80 transition-colors">
                  <MoreHorizontal size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
