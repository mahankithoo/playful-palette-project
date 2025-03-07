
import React from 'react';
import { Search, Bell, MessageSquare, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-border/60 bg-background/95 backdrop-blur-sm z-20">
      <div className="flex-1 flex items-center">
        <h1 className="text-xl font-semibold lg:text-2xl animate-fade-in">
          Welcome, <span className="text-primary">Admin</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative w-64 hidden md:block animate-slide-down">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8 bg-muted/50 border-border/50 focus:border-primary transition-all"
          />
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-muted/80 transition-colors relative animate-scale-in">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-muted/80 transition-colors animate-scale-in">
            <MessageSquare size={20} />
          </button>
          
          <button className="p-2 rounded-full hover:bg-muted/80 transition-colors animate-scale-in">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
