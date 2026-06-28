"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { get, set } from 'idb-keyval'

export interface GitHubConfig {
  token: string
  username: string
  repo: string
  branch: string
  targetFolder: string
  commitMessageTemplate: string
}

export interface GithubContextType {
  config: GitHubConfig
  setConfig: (config: GitHubConfig) => void
  user: any
  repositories: any[]
  branches: string[]
  isConfigured: boolean
}

const defaultConfig: GitHubConfig = {
  token: '',
  username: '',
  repo: '',
  branch: 'main',
  targetFolder: '',
  commitMessageTemplate: 'Upload {filename}'
}

const GithubContext = createContext<GithubContextType | undefined>(undefined)

export function GithubProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<GitHubConfig>(defaultConfig)
  const [user, setUser] = useState<any>(null)
  const [repositories, setRepositories] = useState<any[]>([])
  const [branches, setBranches] = useState<string[]>([])

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const saved = await get('github-uploader-config')
        if (saved) {
          setConfigState(saved)
        }
      } catch (e) {
        console.error("Failed to load config from IndexedDB", e)
      }
    }
    loadConfig()
  }, [])

  const setConfig = async (newConfig: GitHubConfig) => {
    setConfigState(newConfig)
    try {
      await set('github-uploader-config', newConfig)
    } catch (e) {
      console.error("Failed to save config to IndexedDB", e)
    }
  }

  useEffect(() => {
    if (config.token) {
      fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${config.token}` }
      })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(console.error)
    } else {
      setUser(null)
    }
  }, [config.token])

  useEffect(() => {
    if (config.token && (config.username || user?.login)) {
      const targetUser = config.username || user?.login
      if (targetUser) {
        fetch(`https://api.github.com/users/${targetUser}/repos?per_page=100&sort=updated`, {
          headers: { Authorization: `Bearer ${config.token}` }
        })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setRepositories(data)
        })
        .catch(console.error)
      }
    } else {
      setRepositories([])
    }
  }, [config.token, config.username, user?.login])

  useEffect(() => {
    if (config.token && config.repo) {
      const owner = config.username || user?.login
      if (owner) {
        fetch(`https://api.github.com/repos/${owner}/${config.repo}/branches`, {
          headers: { Authorization: `Bearer ${config.token}` }
        })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setBranches(data.map(b => b.name))
        })
        .catch(console.error)
      }
    } else {
      setBranches([])
    }
  }, [config.token, config.repo, config.username, user?.login])

  const isConfigured = Boolean(config.token && config.repo && config.branch)

  return (
    <GithubContext.Provider value={{ config, setConfig, user, repositories, branches, isConfigured }}>
      {children}
    </GithubContext.Provider>
  )
}

export function useGithub() {
  const context = useContext(GithubContext)
  if (!context) throw new Error("useGithub must be used within GithubProvider")
  return context
}
