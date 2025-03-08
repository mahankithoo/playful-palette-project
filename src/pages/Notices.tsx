
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import NoticeFilters from '@/components/notices/NoticeFilters';
import NoticeCategoryFilter from '@/components/notices/NoticeCategoryFilter';
import NoticeCard from '@/components/notices/NoticeCard';

interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  thumbnail?: string;
}

const Notices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  // Sample notices data
  const notices: Notice[] = [
    {
      id: 1,
      title: 'Annual function preparations to start',
      description: 'This is the description for the given notice. The text will be small in this section... Students from all classes are expected to participate in the upcoming annual function. Various cultural activities will be organized.',
      date: '2023-04-25',
      category: 'events',
      author: 'Ankit',
      thumbnail: '/lovable-uploads/ce667c29-0975-496e-9958-2fa5aa1081cb.png'
    },
    {
      id: 2,
      title: 'Mid-term examination dates',
      description: 'This is the description for the given notice. The text will be small in this section... The mid-term examinations will commence from 15th May. All students are advised to prepare accordingly.',
      date: '2023-04-28',
      category: 'exams',
      author: 'Ankit'
    },
    {
      id: 3,
      title: 'Sports day announcement',
      description: 'This is the description for the given notice. The text will be small in this section... The annual sports day will be held on 10th June. All students are encouraged to participate.',
      date: '2023-05-02',
      category: 'sports',
      author: 'Ankit',
      thumbnail: '/lovable-uploads/ce667c29-0975-496e-9958-2fa5aa1081cb.png'
    }
  ];

  // Filter notices based on search term and category
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddNotice = () => {
    // In a real app, this would navigate to a form to add a new notice
    console.log("Add new notice clicked");
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Notices</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notices..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button className="ml-auto" onClick={handleAddNotice}>
              <Plus className="h-4 w-4 mr-2" />
              Add Notice
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))
              ) : (
                <div className="text-center p-8 border rounded-lg">
                  <p className="text-muted-foreground">No notices found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-3">Notices by Category</h3>
              <NoticeCategoryFilter 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notices;
