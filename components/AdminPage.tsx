import React, { useState, useEffect, useMemo } from 'react';
import type { Plan } from '../types';
import * as api from '../lib/data';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { PlanForm } from './PlanForm';
import { PencilSquareIcon } from './icons/PencilSquareIcon';
import { TrashIcon } from './icons/TrashIcon';

interface AdminPageProps {
  onBack: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formDuration, setFormDuration] = useState<1 | 3>(1);

  const forceUpdate = () => setPlans(api.getPlans());

  useEffect(() => {
    setPlans(api.getPlans());
  }, []);

  const { oneMonthPlans, threeMonthPlans } = useMemo(() => ({
    oneMonthPlans: plans.filter(p => p.duration === 1).sort((a,b) => a.volume - b.volume),
    threeMonthPlans: plans.filter(p => p.duration === 3).sort((a,b) => a.volume - b.volume),
  }), [plans]);

  const handleAddPlan = (duration: 1 | 3) => {
    setEditingPlan(null);
    setFormDuration(duration);
    setFormOpen(true);
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setFormDuration(plan.duration as 1 | 3);
    setFormOpen(true);
  };

  const handleDeletePlan = (planId: string) => {
    if (window.confirm('آیا از حذف این پلن اطمینان دارید؟')) {
      api.deletePlan(planId);
      forceUpdate();
    }
  };

  const handleSavePlan = (planData: Omit<Plan, 'id'>) => {
    if (editingPlan) {
      api.updatePlan({ ...planData, id: editingPlan.id });
    } else {
      api.addPlan(planData);
    }
    forceUpdate();
    setFormOpen(false);
    setEditingPlan(null);
  };

  const PlanTable: React.FC<{ title: string; plans: Plan[]; duration: 1 | 3 }> = ({ title, plans, duration }) => (
    <div className="bg-slate-800/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <button
          onClick={() => handleAddPlan(duration)}
          className="flex items-center gap-2 bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
        >
          <PlusIcon />
          <span>افزودن پلن</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-3 text-slate-400">حجم (GB)</th>
              <th className="p-3 text-slate-400">قیمت (تومان)</th>
              <th className="p-3 text-slate-400">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id} className="border-b border-slate-800 hover:bg-slate-800">
                <td className="p-3">{plan.volume}</td>
                <td className="p-3">{plan.basePrice.toLocaleString('en-US')}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEditPlan(plan)} className="text-yellow-400 hover:text-yellow-300" aria-label="ویرایش">
                    <PencilSquareIcon />
                  </button>
                  <button onClick={() => handleDeletePlan(plan.id)} className="text-red-500 hover:text-red-400" aria-label="حذف">
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
        <ChevronLeftIcon />
        <span>بازگشت به صفحه اصلی</span>
      </button>

      <h2 className="text-4xl font-extrabold text-white text-center">پنل مدیریت پلن‌ها</h2>

      <div className="space-y-8">
        <PlanTable title="پلن‌های ۱ ماهه" plans={oneMonthPlans} duration={1} />
        <PlanTable title="پلن‌های ۳ ماهه" plans={threeMonthPlans} duration={3} />
      </div>

      {isFormOpen && (
        <PlanForm
          onClose={() => setFormOpen(false)}
          onSave={handleSavePlan}
          initialPlan={editingPlan}
          duration={formDuration}
        />
      )}
    </div>
  );
};

export default AdminPage;
