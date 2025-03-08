
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  thumbnail?: string;
}

interface NoticeCardProps {
  notice: Notice;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice }) => {
  const navigate = useNavigate();
  
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get the badge color based on category
  const getBadgeVariant = (category: string) => {
    switch (category.toLowerCase()) {
      case 'events':
        return 'default';
      case 'exams':
        return 'destructive';
      case 'sports':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleViewNotice = () => {
    navigate(`/notices/${notice.id}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm text-muted-foreground">
            {formatDate(notice.date)}
          </div>
          <Badge variant={getBadgeVariant(notice.category)}>
            {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
          </Badge>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {notice.description.length > 150 
                ? `${notice.description.substring(0, 150)}...` 
                : notice.description}
              {notice.description.length > 150 && (
                <Button variant="link" className="px-0 h-auto" onClick={handleViewNotice}>Read more</Button>
              )}
            </p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Posted by: {notice.author}
              </div>
              <Button variant="outline" size="sm" onClick={handleViewNotice}>
                View Details
              </Button>
            </div>
          </div>
          
          {notice.thumbnail && (
            <div className="hidden sm:block flex-shrink-0 w-24 h-24 bg-muted rounded overflow-hidden">
              <img 
                src={notice.thumbnail} 
                alt="Notice thumbnail" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
