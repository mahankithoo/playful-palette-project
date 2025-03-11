
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const ResultsFilters: React.FC = () => {
  return (
    <div className="p-4 border rounded-md bg-card animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Filters</h3>
        <Button variant="ghost" size="sm">
          <X className="h-4 w-4 mr-1" />
          Clear filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Term</label>
          <Select defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Terms</SelectItem>
              <SelectItem value="1">1st Term</SelectItem>
              <SelectItem value="2">2nd Term</SelectItem>
              <SelectItem value="3">3rd Term</SelectItem>
              <SelectItem value="4">4th Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">GPA Range</label>
          <Select defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Select GPA range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any GPA</SelectItem>
              <SelectItem value="4-5">4.0 - 5.0</SelectItem>
              <SelectItem value="3-4">3.0 - 4.0</SelectItem>
              <SelectItem value="2-3">2.0 - 3.0</SelectItem>
              <SelectItem value="1-2">1.0 - 2.0</SelectItem>
              <SelectItem value="0-1">0.0 - 1.0</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select defaultValue="published">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button>Apply Filters</Button>
      </div>
    </div>
  );
};

export default ResultsFilters;
