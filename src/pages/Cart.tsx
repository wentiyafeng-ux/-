/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Ticket, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useApp();
  const [selectedItems, setSelectedItems] = useState<string[]>(cart.map(i => i.id));
  
  const subtotal = cart
    .filter(item => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedItems.length === cart.length) setSelectedItems([]);
    else setSelectedItems(cart.map(i => i.id));
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 space-y-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-800 mb-2">购物车还是空的</h2>
          <p className="text-gray-400 text-sm font-medium">去商城看看有没有心仪的口味吧</p>
        </div>
        <Link to="/" className="bg-xmu-blue text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-900/20">
          去逛逛
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-40">
      {/* Header */}
      <section className="bg-white px-6 py-8 border-b border-gray-100 flex items-center justify-between sticky top-0 z-40">
         <h1 className="text-2xl font-black italic text-xmu-blue underline decoration-craft-gold underline-offset-4 decoration-4">购物车结算</h1>
         <span className="text-xs font-bold text-gray-400">共 {cart.length} 件商品</span>
      </section>

      {/* Shop Group (Simplified as one group) */}
      <section className="p-4 space-y-4">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
           <div className="px-6 py-4 bg-gray-50/50 flex items-center gap-2 border-b border-gray-50">
              <CheckCircle2 className="w-4 h-4 text-xmu-blue" />
              <span className="text-xs font-black text-gray-800 uppercase tracking-widest">厦园精酿自营专区</span>
           </div>
           
           <div className="divide-y divide-gray-50">
             <AnimatePresence>
               {cart.map((item) => (
                 <motion.div 
                   key={item.id}
                   layout
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="p-6 flex gap-4"
                 >
                   {/* Checkbox */}
                   <button 
                    onClick={() => toggleSelect(item.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all shrink-0 self-center ${
                      selectedItems.includes(item.id) ? 'bg-xmu-blue border-xmu-blue text-white' : 'border-gray-200'
                    }`}
                   >
                     {selectedItems.includes(item.id) && <Plus className="w-4 h-4 rotate-45" />} {/** Using Plus for a simpler check look or similar */}
                   </button>

                   <div className="w-20 h-24 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   </div>

                   <div className="flex-1 flex flex-col justify-between min-w-0">
                     <div>
                       <div className="flex justify-between items-start gap-2">
                         <h3 className="text-sm font-black text-gray-800 line-clamp-1">{item.name}</h3>
                         <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{item.subName}</p>
                     </div>
                     <div className="flex justify-between items-center mt-2">
                       <span className="text-lg font-black text-xmu-blue">¥{item.price}</span>
                       <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                         <button 
                           onClick={() => updateQuantity(item.id, -1)}
                           className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors text-gray-400"
                         >
                           <Minus className="w-3 h-3" />
                         </button>
                         <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                         <button 
                           onClick={() => updateQuantity(item.id, 1)}
                           className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors text-xmu-blue"
                         >
                           <Plus className="w-3 h-3" />
                         </button>
                       </div>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
           </div>
        </div>

        {/* Coupons Entrance */}
        <button className="w-full bg-white px-6 py-5 rounded-3xl flex items-center justify-between shadow-sm border border-gray-100 group transition-all active:scale-[0.98]">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                 <Ticket className="w-5 h-5" />
              </div>
              <div className="text-left">
                 <div className="text-xs font-black text-gray-800">优惠券/抵用券</div>
                 <div className="text-[10px] text-gray-400">目前有 4 张可用礼券</div>
              </div>
           </div>
           <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-xmu-blue transition-colors" />
        </button>
      </section>

      {/* Bottom Fixed Bar */}
      <div className="fixed bottom-16 md:bottom-2 left-0 right-0 p-4 md:p-6 z-50">
         <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-full p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 pl-4">
               <button 
                onClick={toggleAll}
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                  selectedItems.length === cart.length ? 'bg-xmu-blue border-xmu-blue text-white' : 'border-gray-200'
                }`}
               >
                 {selectedItems.length === cart.length && <Plus className="w-4 h-4 rotate-45" />}
               </button>
               <span className="text-xs font-bold text-gray-500">全选</span>
            </div>
            
            <div className="flex-1 text-right flex flex-col">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">实付金额 (元)</span>
               <span className="text-2xl font-black text-xmu-blue leading-none mt-1">¥{subtotal.toFixed(0)}</span>
            </div>
            
            <button className="px-8 py-4 bg-xmu-blue text-white rounded-full font-black text-sm shadow-xl shadow-blue-900/40 active:scale-95 transition-all">
               结算 ({selectedItems.length})
            </button>
         </div>
      </div>
    </div>
  );
}
