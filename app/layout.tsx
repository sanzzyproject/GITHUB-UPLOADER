import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { GithubProvider } from "@/lib/github-context"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "githubupps",
  description: "Upload files to GitHub easily",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "githubupps",
  },
  formatDetection: {
    telephone: false,
  },
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
