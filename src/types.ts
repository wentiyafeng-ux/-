/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FlavorProfile {
  aroma: number;   // 香气
  bitterness: number; // 苦度
  body: number;    // 酒体
  malt: number;    // 麦芽度
  color: number;   // 色泽
}

export type Category = 'all' | 'daily' | 'emotion' | 'premium' | 'cultural';

export interface Product {
  id: string;
  name: string;
  subName: string;
  price: number;
  image: string;
  abv: number;
  ibu: number;
  category: Category;
  description: string;
  flavor: FlavorProfile;
  isPreorder?: boolean;
}

export interface Events {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  spots: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
