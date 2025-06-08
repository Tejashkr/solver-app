import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { Background } from "@/components/background";

export const metadata: Metadata = {
  title: "AI Problem Solver",
  description: "Solve any problem with AI-powered assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#170b2e', color: '#e5e5e5' }}>
        <Background />
        <Toaster position="top-center" toastOptions={{ 
          style: { 
            backgroundColor: '#231945',
            color: '#e2d9f8',
            borderRadius: '0.75rem',
            border: '1px solid rgba(137, 83, 253, 0.2)'
          },
        }} />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
