/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Truck, Store, MapPin, Heart, Headphones } from 'lucide-react';
import { PRODUCTS } from '../constants.ts';
import { useApp } from '../context/AppContext.tsx';
import FlavorRadarChart from '../components/RadarChart.tsx';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  
  const product = PRODUCTS.find(p => p.id === id);

  const [sku, setSku] = useState<'single' | 'six' | 'case'>('single');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return <div className="p-12 text-center text-gray-400 font-bold">商品未找到</div>;

  const skuOptions = [
    { id: 'single', label: '单瓶装', multiplier: 1, desc: '330ml/瓶' },
    { id: 'six', label: '6瓶提', multiplier: 5.8, desc: '特惠组合' }, 
    { id: 'case', label: '12瓶箱', multiplier: 11, desc: '成箱包邮' },
  ];

  const currentPrice = product.price * (skuOptions.find(s => s.id === sku)?.multiplier || 1) * quantity;

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-40 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Product Images Carousel (Single image for demo) */}
        <section className="relative aspect-square md:aspect-[16/9] overflow-hidden bg-white shadow-sm">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold">1 / 4</div>
        </section>

        {/* Basic Info */}
        <section className="bg-white p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                 <span>规格: {product.subName}</span>
                 <span className="w-1 h-1 bg-gray-300 rounded-full" />
                 <span>酒精度: {product.abv}%</span>
              </div>
            </div>
            <div className="text-right">
               <div className="text-xs text-gray-400 font-bold line-through">¥{(product.price * 1.2).toFixed(2)}</div>
               <div className="text-2xl font-black text-xmu-blue">¥{product.price}</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold border-t border-gray-50 pt-4">
             <span>销量: 1,280+</span>
             <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">库存充足</span>
          </div>
        </section>

        {/* Detailed Info Tabs (Simplified) */}
        <section className="mt-4 bg-white p-6 space-y-6">
           <div className="space-y-2">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-l-4 border-xmu-blue pl-3">口味说明</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                 {product.description}
              </p>
           </div>
           
           <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">风味雷达图</div>
              <div className="max-w-[200px] w-full">
                 <FlavorRadarChart data={product.flavor} />
              </div>
           </div>
        </section>

        {/* Multi-item specs (Manual Selection) */}
        <section className="mt-4 bg-white p-6 space-y-6">
           <div className="space-y-4">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">规格选择</h3>
              <div className="grid grid-cols-3 gap-3">
                 {skuOptions.map((opt) => (
                   <button
                    key={opt.id}
                    onClick={() => setSku(opt.id as any)}
                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                      sku === opt.id 
                        ? 'border-xmu-blue bg-blue-50/50' 
                        : 'border-gray-100 bg-white opacity-60'
                    }`}
                   >
                     <span className="text-xs font-black">{opt.label}</span>
                     <span className="text-[10px] text-gray-400">{opt.desc}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="flex items-center justify-between pt-4">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">购买数量</h3>
              <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl font-black text-gray-500">-</button>
                 <span className="text-sm font-black w-8 text-center">{quantity}</span>
                 <button onClick={() => setQuantity(quantity + 1)} className="text-xl font-black text-xmu-blue">+</button>
              </div>
           </div>
        </section>

        {/* Logistics */}
        <section className="mt-4 bg-white p-6 mb-32">
           <div className="flex items-center justify-around">
              <div className="flex flex-col items-center gap-1 opacity-40">
                 <Truck className="w-5 h-5" />
                 <span className="text-[10px] font-bold">送货上门</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-40">
                 <Store className="w-5 h-5" />
                 <span className="text-[10px] font-bold">门店自提</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-40">
                 <MapPin className="w-5 h-5" />
                 <span className="text-[10px] font-bold">校园闪存</span>
              </div>
           </div>
        </section>
      </div>

      {/* Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-xl border-t border-gray-100 z-50">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
           <div className="flex gap-4 px-2">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex flex-col items-center gap-1"
              >
                 <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                 <span className="text-[8px] font-bold text-gray-500 uppercase">收藏</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                 <Headphones className="w-5 h-5 text-gray-400" />
                 <span className="text-[8px] font-bold text-gray-500 uppercase">客服</span>
              </button>
           </div>
           
           <div className="flex-1 flex gap-2">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black text-xs md:text-sm active:scale-95 transition-all"
              >
                 加入购物车
              </button>
              <button 
                className="flex-[1.5] py-4 bg-xmu-blue text-white rounded-2xl font-black text-xs md:text-sm shadow-xl shadow-blue-900/40 active:scale-95 transition-all text-center"
              >
                 立即购买 ¥{currentPrice.toFixed(0)}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
