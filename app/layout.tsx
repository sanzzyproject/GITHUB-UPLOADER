import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { GithubProvider } from "@/lib/github-context"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub File Manager",
  description: "Manage your GitHub repositories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GithubProvider>
            {children}
          </GithubProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
