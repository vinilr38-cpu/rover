import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import ChatbotDrawer from "@/components/ChatbotDrawer";
import PageTransition from "@/components/PageTransition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* Persistent Left-Locked Sidebar */}
      <Sidebar />

      {/* Fixed Top Header (Offset left by 64 = 16rem for sidebar) */}
      <Header />

      {/* Main Content Area (Offset left by 64, top by 16 for header) */}
      <main className="flex-1 pl-64 pt-16 min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#050505] to-[#050505] industrial-grid font-mono">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>

      {/* Chatbot Drawer Component */}
      <ChatbotDrawer />
    </ThemeProvider>
  );
}
