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
    return price.toLocaleString('en-US'); // Use latin numerals with commas as in the image
  };

  return (
    <a
      href="https://t.me/samvpn_robot"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col justify-center text-center shadow-lg hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 group min-h-[90px]"
    >
      {hasDiscount && (
        <p className="text-sm text-slate-500 line-through">
          {formatPrice(plan.basePrice)} تومان
        </p>
      )}
      <div className={`font-bold text-xl flex items-baseline justify-center gap-x-2 flex-wrap ${hasDiscount ? 'text-green-400' : 'text-white'}`}>
        <span className="text-yellow-400 text-2xl" aria-hidden="true">⚡</span>
        <span>{plan.volume}GB</span>
        <span className="text-slate-600 font-light">|</span>
        <span>{formatPrice(discountedPrice)}</span>
        <span className="text-slate-400 text-base font-medium">تومان</span>
      </div>
    </a>
  );
};
