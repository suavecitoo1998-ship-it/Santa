import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Trash2, Wand2, Check, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WishItem } from '../types';

interface WishItemCardProps {
  item: WishItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onMagic: (id: string) => void;
}

const WishItemCard: React.FC<WishItemCardProps> = ({ item, onToggle, onDelete, onMagic }) => {
  
  const handleWantClick = (e: React.MouseEvent) => {
    // Trigger confetti only when selecting "I want" (switching to purchased/green state)
    if (!item.purchased) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x, y },
        colors: ['#22c55e', '#86efac', '#ffffff'],
        zIndex: 100,
        disableForReducedMotion: true
      });
    }
    onToggle(item.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      className={`relative flex flex-col justify-between p-6 rounded-2xl shadow-xl transition-colors duration-300 border-4 ${
        item.purchased
          ? 'bg-green-50 border-green-400'
          : 'bg-white border-red-100 hover:border-red-300'
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className={`text-3xl font-extrabold text-gray-800 leading-tight ${item.purchased ? 'line-through text-green-700 opacity-60' : ''}`}>
            {item.title}
          </h3>
          <span className="bg-green-100 text-green-800 text-xl font-bold px-4 py-2 rounded-xl border-2 border-green-200 shadow-sm whitespace-nowrap">
            {item.price ? `${item.price} €` : '?? €'}
          </span>
        </div>

        <p className={`text-xl text-gray-600 mb-8 font-semibold min-h-[4rem] leading-relaxed ${item.purchased ? 'opacity-50' : ''}`}>
          {item.aiLoading ? (
             <span className="flex items-center gap-2 text-purple-600 animate-pulse">
               <Wand2 size={24} className="animate-spin" />
               Asking the elves...
             </span>
          ) : (
            item.description || "No description yet..."
          )}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-dashed border-gray-200">
        <div className="flex gap-3">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-colors border-2 border-transparent hover:border-blue-200"
            title="Voir l'article"
          >
            <ExternalLink size={24} />
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onMagic(item.id)}
            disabled={item.aiLoading || item.purchased}
            className={`p-4 rounded-2xl transition-all border-2 border-transparent ${
              item.aiLoading 
                ? 'bg-purple-100 text-purple-400 cursor-not-allowed' 
                : 'bg-purple-50 text-purple-600 hover:bg-purple-100 hover:border-purple-200'
            }`}
            title="Magic Elf Description"
          >
            <Wand2 size={24} />
          </motion.button>
        </div>

        <div className="flex gap-3">
           <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(item.id)}
            className="p-4 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-colors border-2 border-transparent hover:border-red-200"
            title="Supprimer"
          >
            <Trash2 size={24} />
          </motion.button>

          <motion.button
            onClick={handleWantClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.85 }}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xl font-extrabold shadow-md transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
              item.purchased
                ? 'bg-green-500 text-white border-green-700 hover:bg-green-600'
                : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <AnimatePresence mode="wait">
              {item.purchased ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                >
                  <Check size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="gift"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                >
                  <Gift size={24} />
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.span
              key={item.purchased ? 'gotit' : 'want'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {item.purchased ? 'Got it!' : 'I want!'}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default WishItemCard;