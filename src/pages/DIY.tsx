/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Palette, Check, ChevronRight, ShoppingCart, User, School, MessageSquare, Calendar, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants.ts';
import { useApp } from '../context/AppContext.tsx';

type Step = 1 | 2 | 3;

export default function DIY() {
  const { addToCart } = useApp();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    name: '',
    dept: '',
    message: '',
    year: '2026',
    isAnonymous: false,
    selectedBeer: '4' // Default to Phoenix Blossom
  });

  const selectedBeer = PRODUCTS.find(p => p.id === form.selectedBeer) || PRODUCTS[3];

  const years = ['2026', '2025', '2024', '2023', '2022'];

  const handleNext = () => {
    if (step < 3) setStep((s) => (s + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleFinish = () => {
    addToCart({
      ...selectedBeer,
      name: `${selectedBeer.name} (定制版)`,
      price: selectedBeer.price + 5, // Customization fee
    });
    alert('已加入购物车！');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header */}
      <section className="bg-white px-6 py-8 text-center space-y-2 border-b border-gray-100">
        <h1 className="text-2xl font-black italic text-xmu-blue">毕业限定 · 定制专属酒瓶</h1>
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-gray-400">
          <Palette className="w-3 h-3" />
          <span>每一瓶酒，都是时光的刻度</span>
        </div>
      </section>

      {/* Steps Indicator */}
      <section className="px-6 py-6 bg-white flex items-center justify-between">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex-1 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step >= num ? 'bg-xmu-blue text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {step > num ? <Check className="w-4 h-4" /> : num}
            </div>
            {num < 3 && (
              <div className={`flex-1 h-0.5 mx-2 ${step > num ? 'bg-xmu-blue' : 'bg-gray-100'}`} />
            )}
          </div>
        ))}
      </section>

      <div className="p-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-xmu-blue rounded-full" />
                第一步：选择定制酒款
              </div>
              <div className="grid grid-cols-1 gap-4">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setForm({ ...form, selectedBeer: p.id })}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      form.selectedBeer === p.id 
                        ? 'border-xmu-blue bg-blue-50/50 shadow-lg' 
                        : 'border-white bg-white shadow-sm'
                    }`}
                  >
                    <img src={p.image} className="w-16 h-20 object-cover rounded-lg shadow-sm" alt={p.name} />
                    <div className="flex-1 text-left">
                      <div className="font-bold text-gray-800">{p.name}</div>
                      <div className="text-xs text-gray-400">基础价: ¥{p.price}</div>
                    </div>
                    {form.selectedBeer === p.id && <div className="w-6 h-6 bg-xmu-blue rounded-full flex items-center justify-center text-white"><Check className="w-4 h-4" /></div>}
                  </button>
                ))}
              </div>
              <div className="p-4 bg-blue-50 text-blue-600 rounded-xl text-xs font-medium">
                * 1瓶起订，满6瓶享校园内包邮服务。
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-xmu-blue rounded-full" />
                第二步：填写酒标信息
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2 px-1">
                    <User className="w-3 h-3" /> 姓名/昵称 (限10字)
                  </label>
                  <input 
                    type="text" 
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="例如：张小明"
                    className="w-full p-4 bg-gray-50 border border-transparent focus:border-xmu-blue rounded-xl outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2 px-1">
                    <School className="w-3 h-3" /> 学院/届别 (限15字)
                  </label>
                  <input 
                    type="text" 
                    value={form.dept}
                    onChange={(e) => setForm({...form, dept: e.target.value})}
                    placeholder="例如：新闻传播学院2026届"
                    className="w-full p-4 bg-gray-50 border border-transparent focus:border-xmu-blue rounded-xl outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2 px-1">
                    <MessageSquare className="w-3 h-3" /> 留言寄语 (限30字)
                  </label>
                  <textarea 
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="写下你想对厦园/自己说的话..."
                    className="w-full p-4 bg-gray-50 border border-transparent focus:border-xmu-blue rounded-xl outline-none transition-all text-sm h-24 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2 px-1">
                      <Calendar className="w-3 h-3" /> 毕业年份
                    </label>
                    <select 
                      value={form.year}
                      onChange={(e) => setForm({...form, year: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-transparent focus:border-xmu-blue rounded-xl outline-none transition-all text-sm appearance-none"
                    >
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2 px-1">
                      匿名定制
                    </label>
                    <div className="flex items-center h-[52px]">
                       <button 
                        onClick={() => setForm({...form, isAnonymous: !form.isAnonymous})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${form.isAnonymous ? 'bg-xmu-blue' : 'bg-gray-200'}`}
                       >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.isAnonymous ? 'left-7' : 'left-1'}`} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-xmu-blue rounded-full" />
                最后一步：预览酒瓶效果
              </div>
              
              <div className="relative flex flex-col items-center">
                 {/* Bottle Preview */}
                 <div className="w-64 h-[400px] bg-[#111] rounded-[2rem] shadow-2xl relative border-[4px] border-white/10 overflow-hidden flex flex-col items-center justify-end p-6">
                    <div className="absolute top-0 w-20 h-1/2 bg-[#0a0a0a] rounded-t-3xl -translate-y-16" />
                    <div className="w-full h-2/3 bg-white rounded-lg shadow-inner overflow-hidden relative p-4 flex flex-col text-center">
                       <div className="text-[10px] font-black text-xmu-blue opacity-50 mb-2">XMU BREWING LAB</div>
                       <div className="text-lg font-serif font-black text-xmu-blue border-b border-xmu-blue/10 pb-2 mb-4">
                          {selectedBeer.name}
                       </div>
                       
                       <div className="space-y-3 flex-1 flex flex-col justify-center">
                          <div className="text-[10px] text-gray-400">专属定制：</div>
                          <div className="text-xs font-black text-gray-800">{form.name || '定制姓名'}</div>
                          <div className="text-[8px] font-bold text-gray-400 opacity-60">{form.dept || '学院专业'}</div>
                          <div className="italic text-[9px] text-gray-500 max-w-[120px] mx-auto mt-4 leading-normal font-light">
                             “{form.message || '毕业季定制寄语，封存厦园记忆'}”
                          </div>
                       </div>
                       
                       <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between items-end">
                          <div className="text-[8px] font-mono text-gray-400 uppercase">CLASS OF {form.year}</div>
                          <div className="w-6 h-6 border bg-gray-50 flex items-center justify-center text-[6px]">LOGO</div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                       <span className="text-[10px] text-gray-400 font-bold uppercase">定制费</span>
                       <span className="text-lg font-black text-xmu-blue">¥5.00</span>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                       <span className="text-[10px] text-gray-400 font-bold uppercase">合计预估</span>
                       <span className="text-lg font-black text-xmu-blue">¥{selectedBeer.price + 5}</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 z-50">
        <div className="max-w-2xl mx-auto flex gap-4">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="px-8 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold transition-all transform active:scale-95"
            >
              上一步
            </button>
          )}
          {step < 3 ? (
            <button 
              onClick={handleNext}
              className="flex-1 py-4 bg-xmu-blue text-white rounded-2xl font-bold shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              下一步 <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={handleFinish}
              className="flex-1 py-4 bg-xmu-dark text-white rounded-2xl font-bold shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              加入购物车结算 <ShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
