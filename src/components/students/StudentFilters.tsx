
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const StudentFilters: React.FC = () => {
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
          <label className="text-sm font-medium">Class</label>
          <Select defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Classes</SelectItem>
              <SelectItem value="10">Class 10</SelectItem>
              <SelectItem value="11">Class 11</SelectItem>
              <SelectItem value="12">Class 12</SelectItem>
              <SelectItem value="9">Class 9</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Section</label>
          <Select defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sections</SelectItem>
              <SelectItem value="A">Section A</SelectItem>
              <SelectItem value="B">Section B</SelectItem>
              <SelectItem value="C">Section C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select defaultValue="active">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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

export default StudentFilters;
