
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import Notices from "./pages/Notices";
import NoticeDetail from "./pages/NoticeDetail";
import Events from "./pages/Events";
import Attendance from "./pages/Attendance";
import AttendanceSheet from "./pages/AttendanceSheet";
import Results from "./pages/Results";
import ResultsClass from "./pages/ResultsClass";
import ResultsCharts from "./pages/ResultsCharts";
import PublishResults from "./pages/PublishResults";
import ViewResults from "./pages/ViewResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/:id" element={<NoticeDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendance/sheet" element={<AttendanceSheet />} />
          <Route path="/results" element={<Results />} />
          <Route path="/results/class" element={<ResultsClass />} />
          <Route path="/results/charts" element={<ResultsCharts />} />
          <Route path="/results/publish" element={<PublishResults />} />
          <Route path="/results/view" element={<ViewResults />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
