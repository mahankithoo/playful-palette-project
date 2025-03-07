
import React from 'react';
import { 
  Users, 
  UserCog, 
  BookOpen, 
  BookText, 
  CalendarCheck2, 
  Bell, 
  Calendar, 
  GraduationCap, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = React.useState('Students');

  const menuItems = [
    { name: 'Students', icon: Users },
    { name: 'Teachers', icon: UserCog },
    { name: 'Classes', icon: BookOpen },
    { name: 'Subjects', icon: BookText },
    { name: 'Attendance', icon: CalendarCheck2 },
    { name: 'Notices', icon: Bell },
    { name: 'Events', icon: Calendar },
    { name: 'Result', icon: GraduationCap },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`bg-sidebar relative z-30 flex flex-col border-r border-border/60 shadow-sm transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <div className="flex items-center justify-center p-4 border-b border-border/60 h-16">
        {isOpen ? (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            <span className="text-lg font-semibold">E</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="text-sm font-semibold">E</span>
          </div>
        )}
        {isOpen && <span className="ml-2 text-lg font-semibold">EduAdmin</span>}
      </div>

      <button 
        className="absolute -right-3 top-16 bg-card shadow-md border border-border/60 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                className={`sidebar-item w-full ${activeItem === item.name ? 'active' : ''}`}
                onClick={() => setActiveItem(item.name)}
              >
                <item.icon size={18} />
                {isOpen && <span>{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border/60 flex items-center">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <span className="text-sm font-semibold">JD</span>
        </div>
        {isOpen && (
          <div className="ml-2 truncate">
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-muted-foreground">Administrator</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
