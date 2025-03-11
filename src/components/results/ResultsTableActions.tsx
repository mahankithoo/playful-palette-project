
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download,
  Upload,
  Plus,
  FileUp,
  FileDown
} from 'lucide-react';

const ResultsTableActions: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" className="flex gap-1">
        <Upload className="h-4 w-4" />
        Import
      </Button>
      <Button size="sm" variant="outline" className="flex gap-1">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <Button size="sm" className="flex gap-1">
        <Plus className="h-4 w-4" />
        Add New
      </Button>
    </div>
  );
};

export default ResultsTableActions;
