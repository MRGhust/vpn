import React, { useState, useMemo, useEffect } from 'react';
import type { Plan } from '../types';
import { PlanCard } from './PlanCard';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import * as api from '../lib/data';

interface PurchasePageProps {
  onBack: () => void;
}

const PurchasePage: React.FC<PurchasePageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'1-month' | '3-months'>('3-months');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [allPlans, setAllPlans] = useState<Plan[]>([]);

  useEffect(() => {
    setAllPlans(api.getPlans());
  }, []);

  const { oneMonthPlans, threeMonthPlans } = useMemo(() => {
    return {
      oneMonthPlans: allPlans.filter(p => p.duration === 1).sort((a,b) => a.volume - b.volume),
      threeMonthPlans: allPlans.filter(p => p.duration === 3).sort((a,b) => a.volume - b.volume),
    };
  }, [allPlans]);


  const handleApplyDiscount = () => {
    if (discountCode.toLowerCase() === 'nazi') {
      setAppliedDiscount(0.20);
    } else {
      alert('کد تخفیف نامعتبر است.');
      setAppliedDiscount(0);
    }
  };

  const plansToShow = activeTab === '1-month' ? oneMonthPlans : threeMonthPlans;

  const tabButtonClasses = (tabName: '1-month' | '3-months') => 
    `px-6 py-3 text-lg font-bold rounded-lg transition-all duration-300 w-full ${
      activeTab === tabName 
      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
    }`;

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
        <ChevronLeftIcon />
        <span>بازگشت به صفحه اصلی</span>
      </button>

      <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">انتخاب سرویس</h2>
        
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <button onClick={() => setActiveTab('1-month')} className={tabButtonClasses('1-month')}>
            ۱ ماهه
          </button>
          <button onClick={() => setActiveTab('3-months')} className={tabButtonClasses('3-months')}>
            ۳ ماهه
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="کد تخفیف را وارد کنید"
            className="flex-grow bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
          <button onClick={handleApplyDiscount} className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            اعمال تخفیف
          </button>
        </div>
        {appliedDiscount > 0 && (
          <p className="text-center text-green-400">تخفیف ۲۰٪ با موفقیت اعمال شد!</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {plansToShow.map(plan => (
          <PlanCard key={plan.id} plan={plan} discount={appliedDiscount} />
        ))}
      </div>
    </div>
  );
};

export default PurchasePage;
