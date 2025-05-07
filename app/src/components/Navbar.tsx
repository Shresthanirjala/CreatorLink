import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Wallet, Search, Bell, User, Menu, X, LogOut } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { publicKey, connected, disconnect } = useWallet()
  const walletButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to trigger wallet modal
  const handleWalletConnect = () => {
    // Find the wallet-adapter button and click it programmatically
    const walletAdapterButton = document.querySelector(
      ".wallet-adapter-button-trigger"
    ) as HTMLButtonElement
    if (walletAdapterButton) {
      walletAdapterButton.click()
    }
  }

  const shortenAddress = (address: string | null) => {
    if (!address) return ""
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <nav
      className={`w-full py-4 fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo and site title */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            CreatorLink
          </span>
        </Link>

        {/* Desktop navigation links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/explore"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Explore
          </Link>
          <Link
            to="/how-it-works"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            How It Works
          </Link>
          <Link
            to="/blog"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Right side navigation items */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-300 hover:bg-white/5"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-300 hover:bg-white/5"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Link to="/portfolio">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-300 hover:bg-white/5"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Hidden WalletMultiButton - used to trigger the wallet modal */}
          <div className="hidden">
            <button ref={walletButtonRef}>
              <WalletMultiButton />
            </button>
          </div>

          {/* Custom wallet button with dropdown for connected state */}
          {connected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="hidden md:flex bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105">
                  <Wallet className="h-4 w-4 mr-2" />
                  {shortenAddress(publicKey?.toString() || null)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-md border border-white/10 mt-2">
                <DropdownMenuItem
                  className="text-gray-300 hover:text-white focus:text-white cursor-pointer"
                  onClick={handleWalletConnect}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Change Wallet
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-300 hover:text-white focus:text-white cursor-pointer"
                  onClick={() => disconnect()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={handleWalletConnect}
              className="hidden md:flex bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect
            </Button>
          )}

          {/* Mobile menu toggle button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:bg-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 py-4 animate-fade-in">
          <div className="container flex flex-col gap-4">
            <Link
              to="/explore"
              className="text-gray-300 hover:text-blue-400 py-2 px-4 hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-300 hover:text-blue-400 py-2 px-4 hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/blog"
              className="text-gray-300 hover:text-blue-400 py-2 px-4 hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>

            {/* Mobile wallet buttons */}
            {connected ? (
              <div className="flex flex-col gap-2 mt-2">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Wallet className="h-4 w-4 mr-2" />
                  {shortenAddress(publicKey?.toString() || null)}
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300"
                  onClick={() => disconnect()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 mt-2"
                onClick={handleWalletConnect}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
