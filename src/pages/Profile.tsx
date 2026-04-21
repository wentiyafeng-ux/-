/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User as UserIcon, Wallet, CreditCard, Box, MessageSquare, MapPin, Ticket, Headphones, Settings, History, Calendar, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { motion } from 'motion/react';

export default function Profile() {
  const { user } = useApp();

  const orderTabs = [
    { label: '待付款', icon: Wallet, count: 0 },
    { label: '待发货', icon: CreditCard, count: 0 },
    { label: '待收货', icon: Box, count: 1 },
    { label: '待评价', icon: MessageSquare, count: 0 },
  ];

  const menuItems = [
    { label: '我的预约', icon: Calendar, value: '酿造工坊记录' },
    { label: '定制记录', icon: History, value: 'DIY 历史' },
    { label: '收货地址', icon: MapPin, value: '管理配送地址' },
    { label: '领券中心', icon: Ticket, value: '4 张可用' },
    { label: '联系客服', icon: Headphones, value: '9:00 - 21:00' },
    { label: '设置中心', icon: Settings, value: '' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header Info */}
      <section className="bg-xmu-blue px-6 pt-12 pb-20 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 backdrop-blur-3xl" />
        <div className="relative z-10 flex items-center gap-6 text-white">
          <div className="w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 backdrop-blur-md">
             <img src="https://picsum.photos/seed/xmu-user/200" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black italic">{user?.name || '具体问题具体分析'}</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-craft-gold text-xmu-blue px-2 py-0.5 rounded-full">LV.2 酿造学徒</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">积分: 1,280</span>
            </div>
          </div>
        </div>
      </section>

      {/* Order Status Cards */}
      <section className="px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 grid grid-cols-4 gap-2">
          {orderTabs.map((tab) => (
            <button key={tab.label} className="relative flex flex-col items-center gap-3 active:scale-95 transition-transform">
               <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 transition-colors">
                  <tab.icon className="w-6 h-6" />
               </div>
               <span className="text-[10px] font-bold text-gray-500">{tab.label}</span>
               {tab.count > 0 && (
                 <div className="absolute top-0 right-2 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-black animate-bounce">
                    {tab.count}
                 </div>
               )}
            </button>
          ))}
        </div>
      </section>

      {/* Menu List */}
      <section className="px-6 py-8">
         <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
            {menuItems.map((item, idx) => (
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={item.label} 
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors group"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-xmu-blue transition-colors">
                       <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-black text-gray-800">{item.label}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.value}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                 </div>
              </motion.button>
            ))}
         </div>
      </section>
      
      {/* Footer Branding */}
      <section className="text-center pb-8 opacity-20">
         <div className="text-[10px] font-black uppercase tracking-[10px]">XMU BREWING LAB</div>
         <div className="text-[8px] font-bold mt-2">© 2026 具体问题具体分析队</div>
      </section>
    </div>
  );
}
