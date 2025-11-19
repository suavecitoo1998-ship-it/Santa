
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Copy, Code, Globe, Download } from 'lucide-react';
import { WishItem } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishItem[];
  totalPrice: number;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, items, totalPrice }) => {
  const [activeTab, setActiveTab] = useState<'share' | 'code'>('share');
  const [copySuccess, setCopySuccess] = useState(false);

  const generateListText = () => {
    let text = "🎄 *Ma Liste au Père Noël* 🎅\n\n";
    items.forEach((item, index) => {
      const status = item.purchased ? "✅ (Déjà pris !)" : "🎁";
      text += `${index + 1}. ${item.title} - ${item.price ? item.price + '€' : '?? €'} ${status}\n`;
      if (item.url) text += `   Lien: ${item.url}\n`;
    });
    text += `\n💰 *Total estimé : ${totalPrice} €*\n\n`;
    text += "J'ai été très sage !";
    return text;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateListText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateListText());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 bg-red-600 text-white flex justify-between items-center">
              <h2 className="text-3xl font-bold handwritten">Envoyer ma lettre 📮</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b-2 border-gray-100">
              <button
                onClick={() => setActiveTab('share')}
                className={`flex-1 py-4 font-bold text-lg flex items-center justify-center gap-2 ${activeTab === 'share' ? 'text-red-600 border-b-4 border-red-600 bg-red-50' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <MessageCircle size={20} /> Partager la Liste
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex-1 py-4 font-bold text-lg flex items-center justify-center gap-2 ${activeTab === 'code' ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Code size={20} /> Exporter l'App
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto">
              {activeTab === 'share' ? (
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 text-center mb-6">
                    Comment veux-tu envoyer ta liste au Père Noël (ou à tes proches) ?
                  </p>
                  
                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <MessageCircle size={28} /> Envoyer sur WhatsApp
                  </button>

                  <button
                    onClick={handleCopy}
                    className={`w-full py-4 ${copySuccess ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'} border-2 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all`}
                  >
                    {copySuccess ? <span className="flex items-center gap-2">Copié ! ✅</span> : <><Copy size={24} /> Copier le texte</>}
                  </button>

                  <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200 text-yellow-800 text-sm mt-4">
                    <strong>Note importante :</strong> Cette option envoie le texte de ta liste. Si tu veux partager l'application interactive, regarde l'onglet "Exporter l'App".
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
                    <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">
                      <Globe size={24} /> Mettre l'app en ligne
                    </h3>
                    <p className="text-blue-700 mb-4">
                      Pour que tes amis puissent utiliser l'application, tu dois l'héberger. C'est gratuit et facile.
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-blue-800 font-medium">
                      <li>Télécharge le code ci-dessous.</li>
                      <li>Crée un compte sur <strong>Vercel.com</strong> ou <strong>Netlify.com</strong>.</li>
                      <li>Dépose le dossier du projet.</li>
                      <li>Ils te donneront un lien (ex: <em>mon-noel.vercel.app</em>) à partager !</li>
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 border-2 border-gray-200 rounded-2xl flex items-start gap-4 hover:bg-gray-50 transition-colors">
                        <div className="bg-gray-200 p-3 rounded-full">
                            <Download size={24} className="text-gray-700"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-gray-800">Option 1: Télécharger</h4>
                            <p className="text-gray-600 text-sm">
                                Si tu es sur Stackblitz/Bolt, cherche le bouton "Download Project" (souvent une icône de nuage ☁️ en haut).
                            </p>
                        </div>
                    </div>
                    
                    <div className="p-4 border-2 border-gray-200 rounded-2xl flex items-start gap-4 hover:bg-gray-50 transition-colors">
                         <div className="bg-gray-200 p-3 rounded-full">
                            <Code size={24} className="text-gray-700"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-gray-800">Option 2: Copier le code</h4>
                            <p className="text-gray-600 text-sm">
                                Tous les fichiers sont prêts (package.json, etc.). Tu peux les copier un par un sur ton ordinateur.
                            </p>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
