import React from 'react';
import type { Plan } from '../types';

interface PlanCardProps {
  plan: Plan;
  discount: number;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, discount }) => {
  const discountedPrice = plan.basePrice * (1 - discount);
  const hasDiscount = discount > 0;

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fa-IR')} تومان`;
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col text-center shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex-grow">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text mb-2">
          {plan.volume} گیگابایت
        </h3>
        <p className="text-slate-400 mb-6">{plan.duration} ماهه</p>
        
        {hasDiscount && (
          <p className="text-lg text-slate-500 line-through">
            {formatPrice(plan.basePrice)}
          </p>
        )}
        <p className={`text-3xl font-extrabold mb-6 ${hasDiscount ? 'text-green-400' : 'text-white'}`}>
          {formatPrice(discountedPrice)}
        </p>
      </div>
      <a
        href="https://t.me/samvpn_robot"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        خرید سرویس
      </a>
    </div>
  );
};
