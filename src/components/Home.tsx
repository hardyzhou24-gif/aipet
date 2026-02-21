import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Heart, Menu, Bell, Filter, PawPrint, User } from 'lucide-react';
import { getPets, type Pet as ApiPet } from '../lib/api';
import { PETS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const CATEGORIES = [
    { id: 'all', label: '全部' },
    { id: 'dog', label: '狗狗' },
    { id: 'cat', label: '猫咪' },
    { id: 'rabbit', label: '兔子' },
    { id: 'bird', label: '鸟类' },
];

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [pets, setPets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('home');
    const [likedPets, setLikedPets] = useState<string[]>(() => {
        const saved = localStorage.getItem('likedPets');
        return saved ? JSON.parse(saved) : [];
    });
    const { user } = useAuth();
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const displayedPets = pets.filter(p => activeTab === 'liked' ? likedPets.includes(p.id) : true);

    const toggleLike = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setLikedPets(prev => {
            const newLikes = prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id];
            localStorage.setItem('likedPets', JSON.stringify(newLikes));
            return newLikes;
        });
    };

    useEffect(() => {
        async function loadPets() {
            try {
                setLoading(true);
                const data = await getPets(activeCategory === 'all' ? undefined : activeCategory);
                let loadedPets = [];

                if (data && data.length > 0) {
                    loadedPets = data;
                } else {
                    // Fallback to local data
                    loadedPets = activeCategory === 'all'
                        ? PETS
                        : PETS.filter(p => p.type === activeCategory)
                }

                // Append local mocked uploaded pets
                const localStr = localStorage.getItem('MOCK_UPLOADED_PETS');
                if (localStr) {
                    const localUploads = JSON.parse(localStr);
                    const filteredLocal = activeCategory === 'all'
                        ? localUploads
                        : localUploads.filter((p: any) => p.type === activeCategory);
                    loadedPets = [...filteredLocal, ...loadedPets];
                }

                setPets(loadedPets);
            } catch (err) {
                console.error(err);
                setPets(PETS);
            } finally {
                setLoading(false);
            }
        }
        loadPets();
    }, [activeCategory]);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-sans pb-24">
            {/* Header */}
            <header className="px-6 pt-12 pb-6 sticky top-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md z-30">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-4 items-center">
                        {user ? (
                            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center border-2 border-primary/50 shadow-sm overflow-hidden">
                                <span className="font-bold text-lg">{user.email?.charAt(0).toUpperCase()}</span>
                            </div>
                        ) : (
                            <Link to="/login" className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm text-slate-500">
                                <User size={24} />
                            </Link>
                        )}
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">目前位置</p>
                            <div className="flex items-center gap-1 font-bold">
                                <MapPin size={16} className="text-primary" />
                                <span>杭州, 中国</span>
                            </div>
                        </div>
                    </div>
                    <button className="relative p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                        <Bell size={20} className="text-slate-700 dark:text-slate-300" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                    </button>
                </div>

                {/* Search */}
                <div className="flex gap-4">
                    <div className="relative flex-1 group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="搜索你喜欢的宠物..."
                            className="w-full bg-white dark:bg-slate-800 rounded-2xl py-4 pl-12 pr-4 border-0 ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-primary shadow-sm transition-all outline-none"
                        />
                    </div>
                    <button className="p-4 rounded-2xl bg-primary text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center">
                        <Filter size={20} />
                    </button>
                </div>
            </header>

            <main className="px-6">
                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-6 mb-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden"
                >
                    <div className="absolute right-[-20%] bottom-[-20%] w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 w-2/3">
                        <h2 className="text-2xl font-bold mb-2">加入领养大家庭</h2>
                        <p className="text-blue-100 text-sm mb-4">今天领养，你的生活会充满快乐.</p>
                        <button className="bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow hover:bg-slate-50 transition active:scale-95">了解更多</button>
                    </div>
                </motion.div>

                {/* Categories */}
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 mb-6 -mx-6 px-6 snap-x">
                    {CATEGORIES.map((cat, i) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`snap-start flex flex-col items-center gap-2 min-w-[72px] transition-all transform hover:scale-105 active:scale-95 ${activeCategory === cat.id ? 'opacity-100' : 'opacity-60'}`}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${activeCategory === cat.id ? 'bg-primary text-white shadow-blue-500/30 shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800'}`}>
                                <PawPrint size={28} />
                            </div>
                            <span className={`text-xs font-bold ${activeCategory === cat.id ? 'text-primary' : 'text-slate-500'}`}>{cat.label}</span>
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-end mb-6">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {activeTab === 'liked' ? '我喜欢的' : '推荐宠物'}
                    </h3>
                    {activeTab === 'home' && <button className="text-sm font-semibold text-primary">查看全部</button>}
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <AnimatePresence>
                            {displayedPets.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="col-span-2 text-center py-12 text-slate-500 dark:text-slate-400 font-medium"
                                >
                                    {activeTab === 'liked' ? '还没有喜欢的宠物哦，快去添加吧！' : '没有找到相关的宠物。'}
                                </motion.div>
                            ) : displayedPets.map((pet, idx) => (
                                <motion.div
                                    key={pet.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                                >
                                    <Link to={`/pet/${pet.id}`} className="block bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-md border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow group relative">
                                        <button
                                            onClick={(e) => toggleLike(e, pet.id)}
                                            className={`absolute top-5 right-5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${likedPets.includes(pet.id)
                                                ? 'bg-white text-red-500 shadow-md'
                                                : 'bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500'
                                                }`}
                                        >
                                            <Heart size={16} className={likedPets.includes(pet.id) ? "fill-current" : ""} />
                                        </button>
                                        <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative">
                                            <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            {pet.fee && <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-primary shadow-sm">{pet.fee}</div>}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1 truncate">{pet.name}</h4>
                                            <p className="text-xs text-slate-500 font-medium mb-3 truncate">{pet.breed} • {pet.age}</p>
                                            <div className="flex items-center gap-1 text-slate-400 text-xs">
                                                <MapPin size={12} className="text-primary/70" />
                                                <span className="truncate">{pet.distance}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            {/* Custom Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl font-bold text-sm tracking-wide whitespace-nowrap"
                    >
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upload FAB */}
            {user && (
                <Link to="/upload" className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-full flex flex-col items-center justify-center shadow-lg shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all z-40 border-2 border-white/20">
                    <span className="text-3xl leading-[20px] mb-0.5 font-light">+</span>
                    <span className="text-[10px] font-bold">发布</span>
                </Link>
            )}

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center z-50">
                <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
                    <Menu size={24} />
                    <span className="text-[10px] font-bold">首页</span>
                </button>
                <button onClick={() => setActiveTab('liked')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'liked' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
                    <Heart size={24} className={activeTab === 'liked' ? "fill-current" : ""} />
                    <span className="text-[10px] font-bold">喜欢</span>
                </button>
                <button onClick={() => showToast('暂无新消息')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                    <Bell size={24} />
                    <span className="text-[10px] font-bold">消息</span>
                </button>
                <Link to={user ? "/profile" : "/login"} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
                    <User size={24} />
                    <span className="text-[10px] font-bold">我的</span>
                </Link>
            </nav>
        </div>
    );
}
