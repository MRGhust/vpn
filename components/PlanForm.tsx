import React, { useState, useEffect } from 'react';
import type { Plan } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';

interface PlanFormProps {
  initialPlan: Plan | null;
  duration: 1 | 3;
  onSave: (planData: Omit<Plan, 'id'>) => void;
  onClose: () => void;
}

export const PlanForm: React.FC<PlanFormProps> = ({ initialPlan, duration, onSave, onClose }) => {
  const [volume, setVolume] = useState('');
  const [basePrice, setBasePrice] = useState('');

  useEffect(() => {
    if (initialPlan) {
      setVolume(initialPlan.volume.toString());
      setBasePrice(initialPlan.basePrice.toString());
    }
  }, [initialPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const planData = {
      duration,
      volume: parseInt(volume, 10),
      basePrice: parseInt(basePrice, 10),
    };
    if (!isNaN(planData.volume) && !isNaN(planData.basePrice)) {
      onSave(planData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-slate-800 rounded-2xl w-full max-w-md flex flex-col shadow-2xl shadow-purple-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">
            {initialPlan ? 'ویرایش پلن' : 'افزودن پلن جدید'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <XMarkIcon />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="volume" className="block text-sm font-medium text-slate-300 mb-2">حجم (GB)</label>
            <input
              id="volume"
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
           <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-2">قیمت (تومان)</label>
            <input
              id="price"
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-slate-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              انصراف
            </button>
            <button type="submit" className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
