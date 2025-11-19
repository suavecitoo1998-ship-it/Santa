
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Send, CandyCane } from 'lucide-react';

import Snowfall from './components/Snowfall';
import WishItemCard from './components/WishItemCard';
import AddWishForm from './components/AddWishForm';
import ShareModal from './components/ShareModal';
import { INITIAL_ITEMS } from './constants';
import { WishItem } from './types';
import { generateFunnyDescription } from './services/geminiService';

function App() {
  // Initialize state from localStorage if available, otherwise use INITIAL_ITEMS
  const [items, setItems] = useState<WishItem[]>(() => {
    try {
      const savedItems = localStorage.getItem('santa_wishlist_v1');
      if (savedItems) {
        return JSON.parse(savedItems);
      }
    } catch (e) {
      console.error("Could not load wishlist from local storage", e);
    }
    return INITIAL_ITEMS;
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('santa_wishlist_v1', JSON.stringify(items));
    } catch (e) {
      console.error("Could not save wishlist to local storage", e);
    }

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.purchased ? 0 : (item.price || 0)), 0);
    setTotalPrice(total);
  }, [items]);

  const handleToggle = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAdd = (title: string, priceStr: string, url: string) => {
    const newItem: WishItem = {
      id: Date.now().toString(),
      title,
      price: priceStr ? parseFloat(priceStr) : null,
      url,
      purchased: false,
      description: ''
    };
    setItems(prev => [newItem, ...prev]);
  };

  const handleMagicElf = async (id: string) => {
    const itemToUpdate = items.find(i => i.id === id);
    if (!itemToUpdate) return;

    setItems(prev => prev.map(item => item.id === id ? { ...item, aiLoading: true } : item));

    const newDesc = await generateFunnyDescription(itemToUpdate.title);

    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, description: newDesc, aiLoading: false } : item
    ));
  };

  const sendToSanta = () => {
    // 1. Confetti explosion
    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 2. Open the modal
    setTimeout(() => {
        setIsShareModalOpen(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#8f1a1a] pb-32">
      <Snowfall />

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        items={items}
        totalPrice={totalPrice}
      />

      <div className="max-w-5xl mx-auto pt-12 px-6 relative z-10">
        {/* Header Section */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-white p-8 rounded-3xl shadow-2xl rotate-[-2deg] border-4 border-yellow-400 relative">
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 text-7xl">🎄</div>
            <div className="absolute -bottom-8 -right-8 text-7xl">🎅</div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-red-700 handwritten mb-3 drop-shadow-sm">
              Cher Père Noël
            </h1>
            <p className="text-gray-500 font-bold text-2xl tracking-wide uppercase flex items-center justify-center gap-3">
              <CandyCane size={28} className="text-red-500" />
              Ma Liste de Souhaits
              <CandyCane size={28} className="text-red-500 transform scale-x-[-1]" />
            </p>
          </div>
        </motion.header>

        {/* Intro Text */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl mb-10 text-center shadow-lg max-w-3xl mx-auto"
        >
            <p className="text-gray-800 handwritten text-4xl leading-relaxed">
                "J'ai été très sage cette année (presque tout le temps). Voici les cadeaux que j'aimerais beaucoup recevoir..."
            </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1 flex flex-col gap-8">
             <AddWishForm onAdd={handleAdd} />
             
             <div className="bg-red-900/40 p-8 rounded-2xl text-white backdrop-blur-md border-2 border-red-400/30 shadow-xl">
                 <h3 className="text-4xl handwritten mb-4 flex items-center gap-3">
                    <Gift size={32} className="text-yellow-400" />
                    Total Souhaits
                 </h3>
                 <div className="text-6xl font-bold mb-2">{totalPrice} €</div>
                 <p className="text-red-100 text-xl opacity-90">
                    (Hors frais de port du traîneau)
                 </p>
             </div>
          </div>

          <AnimatePresence mode='popLayout'>
            {items.map((item) => (
              <WishItemCard
                key={item.id}
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onMagic={handleMagicElf}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Action Button */}
        <motion.div 
          className="fixed bottom-10 right-10 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        >
          <button
            id="send-btn"
            onClick={sendToSanta}
            className="flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white px-10 py-6 rounded-full shadow-2xl font-bold text-2xl transition-all hover:scale-105 hover:shadow-green-900/50 border-4 border-green-400"
          >
            <Send size={32} />
            Envoyer la lettre
          </button>
        </motion.div>

      </div>
      
      {/* Footer Decoration */}
      <div className="fixed bottom-0 w-full h-48 bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-30 pointer-events-none"></div>
    </div>
  );
}

export default App;
