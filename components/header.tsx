'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'

export function Header() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8b56ff] via-[#5ddee6] to-transparent backdrop-blur-sm" />
      <nav className="container relative flex items-center justify-between p-4">
        <Link href="#landing">
          <Image 
            src="/images/acm_logo.png" 
            alt="ACM logo" 
            width={75} 
            height={75} 
            priority 
          />
        </Link>
        <div className="flex items-center gap-6 text-white">
          <Link href="#about" className="hover:text-primary transition-colors">about</Link>
          <Link href="#events" className="hover:text-primary transition-colors">events</Link>
          <Link href="#courses" className="hover:text-primary transition-colors">courses</Link>
          <Link href="#resources" className="hover:text-primary transition-colors">resources</Link>
          <Link href="#gallery" className="hover:text-primary transition-colors">gallery</Link>
          <Link href="#team" className="hover:text-primary transition-colors">team</Link>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </header>
  )
}