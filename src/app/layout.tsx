import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { HermesChatFab } from "@/components/hermes-chat-fab";

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
      className={`${geistMono.variable} h-full dark antialiased`}
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
              {children}
            </div>
          </main>

          {/* Hermes Agent Floating Action Button (FAB) & Copilot Chat Sheet */}
          <HermesChatFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
