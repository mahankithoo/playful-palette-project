
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface NoticeFiltersProps {
  onFilterChange: (filterType: string, value: string) => void;
}

const NoticeFilters: React.FC<NoticeFiltersProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-auto">
        <Select onValueChange={(value) => onFilterChange('category', value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="exams">Exams</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-auto">
        <Select onValueChange={(value) => onFilterChange('date', value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default NoticeFilters;
