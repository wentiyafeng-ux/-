/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar as CalendarIcon, MapPin, Users, Ticket } from 'lucide-react';
import { EVENTS } from '../constants.ts';
import { motion } from 'motion/react';

export default function Events() {
  return (
    <div className="p-4 space-y-8 pb-24">
      <section className="space-y-2">
        <h1 className="text-3xl italic">线下预约与活动</h1>
        <p className="text-gray-500 font-light">不仅仅是饮酒，更是关于发酵文化的深度探索。</p>
      </section>

      {/* Featured Event / Date Selection - Simplified */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-xmu-red rounded-full flex items-center justify-center text-white">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg">预约酿造参与课</h2>
            <p className="text-sm text-gray-400">选择时段与名额</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-6">
          {['周五', '周六', '周日', '周一'].map((day, i) => (
            <div key={day} className={`text-center p-2 rounded-2xl border transition-all ${i === 1 ? 'border-xmu-red bg-xmu-red/5' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>
              <div className="text-[10px] uppercase font-bold">{day}</div>
              <div className="text-lg font-serif">2{i+1}</div>
            </div>
          ))}
        </div>
        <button className="w-full py-4 bg-xmu-dark text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors">
          查看可选时段
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl px-2">热门活动</h3>
        {EVENTS.map((event) => (
          <motion.div 
            key={event.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="relative h-48">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-xmu-red shadow-lg">
                报名进行中
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h4 className="text-xl">{event.title}</h4>
              <div className="grid grid-cols-1 gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-xmu-red" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-xmu-red" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-xmu-red" />
                  剩余名额: <span className="font-bold text-xmu-red">{event.spots}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-400">报名费:</span>
                  <span className="text-2xl font-serif text-xmu-red ml-2">¥{event.price}</span>
                </div>
                <button className="px-6 py-2 bg-xmu-red text-white rounded-full font-bold shadow-lg shadow-red-100 flex items-center gap-2">
                  <Ticket className="w-4 h-4" /> 立即报名
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
