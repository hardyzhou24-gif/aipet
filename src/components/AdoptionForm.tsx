import { ArrowLeft, Key, Building2, Check, ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { submitAdoption } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function AdoptionForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [ownership, setOwnership] = useState('own');
  const [hasPets, setHasPets] = useState('no');
  const [housingType, setHousingType] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!id || !housingType || !reason) {
      setError('请填写所有必填字段');
      return;
    }
    setSubmitting(true);
    setError(null);
    const result = await submitAdoption({
      pet_id: id,
      housing_type: housingType,
      ownership,
      reason,
      has_pets: hasPets === 'yes',
    });
    setSubmitting(false);
    if (result.success) {
      alert('申请已成功提交！我们将尽快与您联系。');
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm transition-colors duration-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">领养申请</h2>
        </div>
      </header>

      <div className="px-6 pb-6 pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary">基本信息</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white">家庭环境</span>
          <span className="text-xs font-medium text-slate-400">养宠经验</span>
        </div>
        <div className="relative h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-2/3 rounded-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(25,120,229,0.4)]"></div>
        </div>
      </div>

      <main className="flex-1 px-5 pb-32 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">家庭环境</h1>
          <p className="text-slate-500 dark:text-slate-400">帮助我们了解新伙伴将会居住的环境。</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-3">
            {error && <div className="text-red-500 text-sm font-bold bg-red-50 dark:bg-red-500/10 p-3 rounded-lg">{error}</div>}
            <label className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider ml-1">住房类型 <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                value={housingType}
                onChange={(e) => setHousingType(e.target.value)}
                className="w-full appearance-none rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 p-4 pr-12 text-base font-medium text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all cursor-pointer"
              >
                <option disabled value="">请选择住房类型</option>
                <option value="apartment">公寓</option>
                <option value="house">带院子的独栋房屋</option>
                <option value="townhouse">联排别墅</option>
                <option value="condo">共管公寓</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider ml-1">房屋所有权</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOwnership('own')}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-2xl border p-4 transition-all shadow-sm",
                  ownership === 'own'
                    ? "border-primary bg-blue-50 dark:bg-primary/20 text-primary"
                    : "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800"
                )}
              >
                <Key size={20} />
                <span className="font-semibold text-sm">自有</span>
              </button>
              <button
                type="button"
                onClick={() => setOwnership('rent')}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-2xl border p-4 transition-all shadow-sm",
                  ownership === 'rent'
                    ? "border-primary bg-blue-50 dark:bg-primary/20 text-primary"
                    : "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800"
                )}
              >
                <Building2 size={20} />
                <span className="font-semibold text-sm">租赁</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider ml-1">为什么要领养？</label>
              <span className="text-xs text-primary font-medium bg-blue-50 px-2 py-0.5 rounded-full dark:bg-primary/20">必填</span>
            </div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full min-h-[140px] resize-none rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 p-4 text-base font-normal text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none shadow-sm transition-all"
              placeholder="请简要告诉我们您的领养动机、日常生活安排，以及为什么您认为自己是非常合适的人选..."
            ></textarea>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider ml-1">目前有其他宠物吗？</label>
            <button
              type="button"
              onClick={() => setHasPets('yes')}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition-colors w-full text-left",
                hasPets === 'yes' ? "border-primary" : "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800"
              )}
            >
              <div className="flex grow flex-col">
                <p className={cn("text-base font-semibold leading-normal", hasPets === 'yes' && "text-primary")}>是的，我有宠物</p>
                <p className="text-slate-400 text-sm font-normal leading-normal">选择此项如果您目前拥有狗、猫等</p>
              </div>
              <div className={cn(
                "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                hasPets === 'yes' ? "bg-primary border-primary" : "border-slate-200"
              )}>
                {hasPets === 'yes' && <Check size={14} className="text-white" />}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setHasPets('no')}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition-colors w-full text-left",
                hasPets === 'no' ? "border-primary" : "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800"
              )}
            >
              <div className="flex grow flex-col">
                <p className={cn("text-base font-semibold leading-normal", hasPets === 'no' && "text-primary")}>不，我没有宠物</p>
                <p className="text-slate-400 text-sm font-normal leading-normal">首次养宠或目前未饲养宠物</p>
              </div>
              <div className={cn(
                "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                hasPets === 'no' ? "bg-primary border-primary" : "border-slate-200"
              )}>
                {hasPets === 'no' && <Check size={14} className="text-white" />}
              </div>
            </button>
          </div>
        </form>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200/50 dark:border-white/5">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full rounded-full bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:active:scale-100 active:scale-[0.98] transition-all text-white h-14 text-lg font-bold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
        >
          <span>{submitting ? '提交中...' : '提交申请'}</span>
          {!submitting && <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
}
