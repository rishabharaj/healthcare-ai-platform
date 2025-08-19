"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { UserNav } from "@/components/user-nav"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Disease Prediction", href: "/disease-prediction" },
    { name: "Fact Verification", href: "/fact-verification" },
    { name: "Dashboard", href: "/dashboard" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-medical-teal bg-clip-text text-transparent group-hover:from-medical-teal group-hover:to-primary transition-all duration-300">
                MediAI
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-all duration-200 hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              } after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 ${
                isActive(item.href) ? "after:w-full" : "after:w-0 hover:after:w-full"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          {user ? (
            <UserNav user={user} onLogout={logout} />
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button size="sm" className="health-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-200" asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10 transition-colors duration-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href) 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!user && (
              <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
                <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40 hover:bg-primary/5" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button size="sm" className="health-gradient text-white" asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

