import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, Hexagon } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-store";
import { CartDrawer } from "./cart-drawer";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { items, toggleCart } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30">
      <header className="fixed top-0 w-full z-50 glass-panel border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Hexagon className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors animate-pulse" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
              </div>
              <span className="text-2xl font-display font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-secondary">
                BOND<span className="text-primary">X</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Store</NavLink>
              <NavLink href="/about">Mission</NavLink>
              <button
                onClick={toggleCart}
                className="relative p-2 text-foreground/80 hover:text-primary transition-colors group"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-black bg-primary rounded-full shadow-[0_0_10px_rgba(0,243,255,0.6)] animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
                <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 px-6"
          >
            <nav className="flex flex-col space-y-6 text-xl font-display uppercase tracking-widest">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Store
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                Mission
              </Link>
              <button onClick={() => { setIsMobileMenuOpen(false); toggleCart(); }} className="flex items-center gap-2 text-primary">
                Cart ({cartCount})
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <CartDrawer />
      
      <footer className="bg-card border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Hexagon className="w-6 h-6 text-primary/50" />
              <span className="font-display font-bold text-muted-foreground">BONDX SYSTEMS</span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              © 2077 BondX Industries. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href}>
      <div className={`
        relative px-2 py-1 text-sm font-medium font-mono uppercase tracking-wider cursor-pointer
        transition-colors duration-200
        ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-white'}
      `}>
        {children}
        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute left-0 right-0 -bottom-1 h-px bg-primary shadow-[0_0_10px_rgba(0,243,255,0.8)]"
          />
        )}
      </div>
    </Link>
  );
}
