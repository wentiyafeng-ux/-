/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.tsx';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import DIY from './pages/DIY.tsx';
import Profile from './pages/Profile.tsx';
import Cart from './pages/Cart.tsx';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diy" element={<DIY />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}
