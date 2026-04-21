/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Events } from './types.ts';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '芙蓉小麦',
    subName: '330ml',
    price: 18,
    image: 'https://picsum.photos/seed/furong-wheat/600/800',
    abv: 4.5,
    ibu: 12,
    category: 'daily',
    description: '厦园经典，口感清新。采用传统德式小麦配方，麦香浓郁。',
    flavor: { aroma: 8, bitterness: 2, body: 4, malt: 5, color: 3 }
  },
  {
    id: '2',
    name: '凌云 IPA',
    subName: '330ml',
    price: 22,
    image: 'https://picsum.photos/seed/lingyun-ipa/600/800',
    abv: 6.2,
    ibu: 45,
    category: 'daily',
    description: '追求卓越，酒花香气十足，苦度均衡，适合进阶精酿爱好者。',
    flavor: { aroma: 9, bitterness: 8, body: 6, malt: 4, color: 5 }
  },
  {
    id: '3',
    name: '建南波特',
    subName: '330ml',
    price: 25,
    image: 'https://picsum.photos/seed/jiannan-porter/600/800',
    abv: 5.8,
    ibu: 25,
    category: 'daily',
    description: '深沉优雅，烘焙麦芽带来的巧克力与咖啡香气，回味无穷。',
    flavor: { aroma: 7, bitterness: 4, body: 9, malt: 8, color: 10 }
  },
  {
    id: '4',
    name: '凤凰花开',
    subName: '500ml',
    price: 35,
    image: 'https://picsum.photos/seed/phoenix-blossom/600/800',
    abv: 5.0,
    ibu: 20,
    category: 'emotion',
    description: '毕业限定款，将离别的酸甜化作红色的艾尔酒液，支持个性化定制。',
    flavor: { aroma: 8, bitterness: 3, body: 7, malt: 9, color: 8 }
  }
];

export const EVENTS: Events[] = [
  {
    id: 'e1',
    title: '酿造参与课：第一期小麦啤',
    date: '2026-05-12 14:00',
    location: '翔安校区精酿实验室',
    price: 299,
    image: 'https://picsum.photos/seed/event1/800/400',
    spots: 12,
    description: '亲手参与投料、糖化、煮沸过程，探索发酵的奥秘。'
  },
  {
    id: 'e2',
    title: '海边品酒会：夏日微醺',
    date: '2026-06-05 19:00',
    location: '白城沙滩 2 号店',
    price: 99,
    image: 'https://picsum.photos/seed/event2/800/400',
    spots: 30,
    description: '在海风中品鉴厦园四大经典，与主创团队面对面交流。'
  }
];
