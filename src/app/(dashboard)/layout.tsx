import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import ChatbotDrawer from '@/components/ChatbotDrawer';
import PageTransition from '@/components/PageTransition';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#050505] to-[#050505]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
      
      <ChatbotDrawer />
    </div>
  );
}
