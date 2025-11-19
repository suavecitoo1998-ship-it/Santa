import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { AddItemFormProps } from '../types';

const AddWishForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onAdd(title, price, url);
    setTitle('');
    setPrice('');
    setUrl('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-6 border-4 border-dashed border-red-300 rounded-2xl text-red-200 hover:text-red-100 hover:bg-red-900/20 hover:border-red-200 transition-all flex items-center justify-center gap-3 font-bold text-3xl handwritten"
      >
        <PlusCircle size={32} /> Ajouter un cadeau
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border-4 border-green-800/10 animate-in fade-in slide-in-from-bottom-4">
      <h3 className="text-4xl text-green-800 handwritten font-bold mb-6 text-center">New Wish</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nom du cadeau (ex: Vélo rouge)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
          autoFocus
        />
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Prix (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-1/3 p-4 text-xl border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
          />
          <input
            type="url"
            placeholder="Lien URL (http://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-2/3 p-4 text-xl border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors font-bold text-lg"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg transition-transform active:scale-95 font-bold text-xl"
          >
            Ajouter
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddWishForm;