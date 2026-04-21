/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { ShoppingBag, Palette, GraduationCap, Zap, Plus, Search, Bell, List, Clock } from 'lucide-react';
import { PRODUCTS } from '../constants.ts';
import { useApp } from '../context/AppContext.tsx';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Home() {
  const { addToCart } = useApp();
  const [activeTab, setActiveTab] = useState('全部');
  const products = PRODUCTS;

  const quickActions = [
    { label: '全部商品', icon: List, path: '/', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: '毕业定制', icon: Palette, path: '/diy', color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: '预约体验', icon: Zap, path: '/', color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: '我的订单', icon: Clock, path: '/profile', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  const tabs = ['全部', '经典款', '限定款', '礼盒装'];

  const filteredProducts = activeTab === '全部' 
    ? products 
    : products.filter(p => {
        if (activeTab === '限定款') return p.category === 'emotion';
        if (activeTab === '经典款') return p.category === 'daily';
        return true;
      });

  return (
    <div className="space-y-6 pb-24 bg-gray-50 min-h-screen">
      {/* Search Header for Desktop */}
      <section className="hidden md:block px-8 py-4 bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex-1 h-12 bg-gray-100 rounded-full flex items-center px-6 gap-3 text-gray-400">
            <Search className="w-5 h-5" />
            <input type="text" placeholder="搜索商品或活动" className="bg-transparent border-none focus:outline-none text-sm w-full" />
          </div>
          <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
        </div>
      </section>

      {/* Banner Carousel */}
      <section className="px-4 md:px-8 mt-4 md:mt-0">
        <div className="relative h-[180px] md:h-[350px] rounded-[2rem] overflow-hidden shadow-xl">
          <img 
            src="https://picsum.photos/seed/xmu-banner/1200/600" 
            alt="Banner" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent p-6 md:p-12 flex flex-col justify-center text-white">
            <h2 className="text-2xl md:text-5xl font-black mb-2">凤凰花开毕业限定</h2>
            <p className="text-xs md:text-lg opacity-80 max-w-md">开启毕业慢递计划，将四年的时光封存进红色艾尔。</p>
            <Link to="/diy" className="mt-4 px-6 py-2 bg-xmu-blue text-white rounded-full text-xs md:text-sm font-bold w-fit shadow-lg shadow-blue-900/40">立即定制</Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-6 md:px-8 grid grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.label} to={action.path} className="flex flex-col items-center gap-2 group">
            <div className={`w-14 h-14 md:w-20 md:h-20 ${action.bg} ${action.color} rounded-2xl flex items-center justify-center shadow-sm group-active:scale-95 transition-transform`}>
              <action.icon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="text-[10px] md:text-sm font-bold text-gray-600 tracking-tight">{action.label}</span>
          </Link>
        ))}
      </section>

      {/* Category Tabs */}
      <section className="px-4 md:px-8 overflow-x-auto whitespace-nowrap no-scrollbar flex gap-4 border-b border-gray-100 bg-white pt-2 sticky top-16 md:top-20 z-30">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-xmu-blue' : 'text-gray-400'}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-xmu-blue rounded-full" />
            )}
          </button>
        ))}
      </section>

      {/* Product List */}
      <section className="px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <motion.div 
            layout
            key={product.id}
            className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 group"
          >
            <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-black text-gray-800 line-clamp-1">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{product.subName}</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">有货</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-black text-xmu-blue">¥{product.price}</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="w-8 h-8 bg-xmu-blue text-white rounded-xl flex items-center justify-center hover:bg-xmu-dark transition-colors shadow-lg shadow-blue-900/20 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Lab Intro Section */}
      <section className="mx-4 md:mx-8 p-8 bg-xmu-blue text-white rounded-[2rem] overflow-hidden relative shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 backdrop-blur-3xl" />
        <GraduationCap className="w-12 h-12 text-craft-gold mb-4" />
        <h2 className="text-3xl font-black italic mb-2 tracking-tight underline decoration-craft-gold decoration-4 underline-offset-8">厦园精酿实验室</h2>
        <p className="text-blue-100/80 font-light leading-relaxed mb-6 max-w-xl">
          诞生于厦门大学化学化工学院，融合前沿发酵工艺与校园文化底蕴，每一罐精酿都是科学与艺术的跨界表达。
        </p>
        <div className="flex gap-8 border-t border-white/10 pt-6">
          <div>
            <div className="text-2xl font-black text-craft-gold">14+</div>
            <div className="text-[10px] uppercase tracking-widest text-blue-300/60">专利技术</div>
          </div>
          <div>
            <div className="text-2xl font-black text-craft-gold">0.1℃</div>
            <div className="text-[10px] uppercase tracking-widest text-blue-300/60">控温精度</div>
          </div>
        </div>
      </section>
    </div>
  );
}
