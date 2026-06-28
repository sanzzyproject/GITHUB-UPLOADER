"use client"

import { Uploader } from "@/components/dashboard/uploader"
import { SettingsPanel } from "@/components/dashboard/settings-panel"
import { Explorer } from "@/components/dashboard/explorer"
import { Repositories } from "@/components/dashboard/repositories"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, FolderGit2, Settings, UploadCloud, BookMarked } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="font-bold text-lg hidden sm:inline">GitHub Uploader</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="upload" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <TabsList className="flex w-max min-w-full sm:min-w-0 sm:grid sm:grid-cols-4 h-auto p-1">
                <TabsTrigger value="upload" className="flex gap-2 py-2 px-4">
                  <UploadCloud className="h-4 w-4" /> <span className="hidden sm:inline">Upload</span>
                </TabsTrigger>
                <TabsTrigger value="explorer" className="flex gap-2 py-2 px-4">
                  <FolderGit2 className="h-4 w-4" /> <span className="hidden sm:inline">Explorer</span>
                </TabsTrigger>
                <TabsTrigger value="repositories" className="flex gap-2 py-2 px-4">
                  <BookMarked className="h-4 w-4" /> <span className="hidden sm:inline">Repositories</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex gap-2 py-2 px-4">
                  <Settings className="h-4 w-4" /> <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="upload" forceMount className="data-[state=inactive]:hidden fade-in-50 animate-in slide-in-from-bottom-2 duration-300">
              <Uploader />
            </TabsContent>
            
            <TabsContent value="explorer" forceMount className="data-[state=inactive]:hidden fade-in-50 animate-in slide-in-from-bottom-2 duration-300">
              <Explorer />
            </TabsContent>

            <TabsContent value="repositories" forceMount className="data-[state=inactive]:hidden fade-in-50 animate-in slide-in-from-bottom-2 duration-300">
              <Repositories />
            </TabsContent>
            
            <TabsContent value="settings" forceMount className="data-[state=inactive]:hidden fade-in-50 animate-in slide-in-from-bottom-2 duration-300">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <Toaster />
    </div>
  )
}
