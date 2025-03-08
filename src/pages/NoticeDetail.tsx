
import React from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  thumbnail?: string;
}

const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real application, this would be fetched from an API
  // For now, we'll use mock data
  const notice: Notice = {
    id: parseInt(id || '1'),
    title: 'Annual function preparations to start',
    description: 'Students from all classes are expected to participate in the upcoming annual function. Various cultural activities will be organized. The event will take place in the school auditorium. Parents are also invited to attend this grand celebration.\n\nThe preparations will start from next week and teachers will assign specific responsibilities to students. Dance, music, drama, and other performances will be included in the program. Students interested in participating should register with their class teachers by the end of this week.\n\nRehearsals will begin from Monday and will continue until the day of the event. Students participating in performances should be ready to stay back after school hours for practice sessions.',
    date: '2023-04-25',
    category: 'events',
    author: 'Ankit',
    thumbnail: '/lovable-uploads/151d50ab-47fc-4180-938b-e679f1e9dc96.png'
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

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/notices')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Notice Details</h1>
        </div>

        <div className="bg-card rounded-lg shadow-sm border">
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{notice.title}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <Badge variant={getBadgeVariant(notice.category)}>
                    {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                  </Badge>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{formatDate(notice.date)}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <User className="mr-1 h-4 w-4" />
                    <span>Posted by: {notice.author}</span>
                  </div>
                </div>
              </div>
            </div>

            {notice.thumbnail && (
              <div className="rounded-lg overflow-hidden border bg-muted h-[300px] md:h-[400px]">
                <img 
                  src={notice.thumbnail} 
                  alt="Notice thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Notice Description</h3>
              <div className="whitespace-pre-line">
                {notice.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoticeDetail;
