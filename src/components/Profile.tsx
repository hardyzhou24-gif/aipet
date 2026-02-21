import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, User as UserIcon, LogOut, Settings, Heart, Bell, Settings2, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center items-center text-slate-900 dark:text-white">
                <p className="font-bold mb-4">如果您看到此页面，请先登录。</p>
                <button onClick={() => navigate('/login')} className="px-6 py-2 bg-primary text-white rounded-full font-bold shadow-md">前往登录</button>
            </div>
        );
    }

    const { full_name, phone } = user.user_metadata || {};

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-sans pb-24">
            {/* Header */}
            <header className="px-6 pt-12 pb-6 sticky top-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md z-30 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold tracking-tight">个人中心</h1>
                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition">
                    <Settings2 size={24} className="text-slate-700 dark:text-slate-300" />
                </button>
            </header>

            <main className="px-6">
                {/* Profile Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mt-2 mb-10">
                    <div className="relative mb-6">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-1 shadow-xl shadow-blue-500/20">
                            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-inner">
                                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-600">
                                    {user.email?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{full_name || '探索者'}</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">{user.email}</p>
                    {phone && (
                        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{phone}</p>
                        </div>
                    )}
                </motion.div>

                {/* Info List */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-md border border-slate-100 dark:border-slate-700 space-y-1 mb-6">
                    <button onClick={() => navigate('/', { state: { tab: 'liked' } })} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors active:scale-[0.98]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 text-red-500 flex items-center justify-center">
                                <Heart size={22} className="fill-current" />
                            </div>
                            <span className="font-bold text-lg">我喜欢的宠物</span>
                        </div>
                        <ArrowLeft size={18} className="text-slate-300 rotate-180" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors active:scale-[0.98]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-500 flex items-center justify-center">
                                <UserIcon size={22} />
                            </div>
                            <span className="font-bold text-lg">完善资料</span>
                        </div>
                        <span className="text-xs font-bold bg-primary text-white px-2 py-1 rounded-full mr-2">送积分</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors active:scale-[0.98]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                                <HelpCircle size={22} />
                            </div>
                            <span className="font-bold text-lg">帮助与客服</span>
                        </div>
                        <ArrowLeft size={18} className="text-slate-300 rotate-180" />
                    </button>
                </motion.div>

                {/* Sign Out Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <button onClick={handleSignOut} className="w-full bg-white dark:bg-slate-800 text-red-500 font-bold py-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3 active:scale-95 transition-transform hover:bg-red-50 dark:hover:bg-red-500/10">
                        <LogOut size={22} />
                        退出登录
                    </button>
                </motion.div>
            </main>
        </div>
    );
}
