
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const SubjectFilters: React.FC = () => {
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
          <label className="text-sm font-medium">Subject Type</label>
          <Select defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Select subject type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="theoretical">Theoretical</SelectItem>
              <SelectItem value="practical">Practical</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Class Level</label>
          <Select defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Select class level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="middle">Middle</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
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

export default SubjectFilters;
