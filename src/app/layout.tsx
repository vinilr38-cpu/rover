import type { Metadata } from "next";
import { Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import ChatbotDrawer from "@/components/ChatbotDrawer";
import PageTransition from "@/components/PageTransition";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R01 // INDUSTRIAL COMMAND CENTER",
  description: "Strict Dark Industrial Telemetry and Operations Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "dark", "antialiased", geistMono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#09090B] text-[#FAFAFA] font-mono flex">
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
          <main className="flex-1 pl-64 pt-16 min-h-screen bg-[#09090B] industrial-grid">
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
              <PageTransition>
                {children}
              </PageTransition>
            </div>
          </main>

          {/* Chatbot Drawer Component */}
          <ChatbotDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
