/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Palette, User, ShoppingCart, Search, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cart } = useApp();
  const location = useLocation();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/diy', icon: Palette, label: '定制' },
    { path: '/cart', icon: ShoppingCart, label: '购物车' },
    { path: '/profile', icon: User, label: '我的' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-16 industrial-grid bg-gray-50">
      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-0 w-full h-16 bg-white shadow-sm z-50 items-center justify-between px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-xmu-blue rounded-lg flex items-center justify-center text-white font-serif font-black text-2xl">厦</div>
          <span className="font-serif font-black text-xl tracking-tight text-xmu-blue">厦园精酿</span>
        </Link>
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`text-sm font-bold transition-colors hover:text-xmu-blue ${location.pathname === item.path ? 'text-xmu-blue' : 'text-gray-400'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Mobile Top Header (Search Bar placeholder for Home) */}
      {location.pathname === '/' ? (
        <header className="md:hidden flex h-16 bg-white border-b border-gray-100 items-center px-4 sticky top-0 z-50 gap-4">
          <div className="flex-1 h-10 bg-gray-100 rounded-full flex items-center px-4 gap-2 text-gray-400">
            <Search className="w-4 h-4" />
            <span className="text-xs">搜索商品或活动</span>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </div>
        </header>
      ) : (
        <header className="md:hidden flex h-16 bg-white border-b border-gray-100 items-center justify-between px-6 sticky top-0 z-50 text-xmu-blue font-black font-serif text-lg">
          厦园精酿
        </header>
      )}

      <main className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full h-16 bg-white border-t border-gray-100 flex items-center justify-around z-50">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === item.path ? 'text-xmu-blue' : 'text-gray-400'}`}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${location.pathname === item.path ? 'bg-xmu-blue/5' : ''}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
