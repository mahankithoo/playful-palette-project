
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Download, 
  Upload, 
  Plus, 
  ChevronDown, 
  FileText,
  FileSpreadsheet,
  FilePdf
} from 'lucide-react';

const StudentTableActions: React.FC = () => {
  return (
    <>
      <Button variant="outline" className="hidden md:flex">
        <Upload className="h-4 w-4 mr-2" />
        Import
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="hidden md:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <FileText className="h-4 w-4 mr-2" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export as Excel
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FilePdf className="h-4 w-4 mr-2" />
            Export as PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Add Student
      </Button>
    </>
  );
};

export default StudentTableActions;
