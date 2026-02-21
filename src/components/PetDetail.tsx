import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Heart, Share2, Info, Clock, Shield, User } from 'lucide-react';
import { getPetById, type Pet as ApiPet } from '../lib/api';
import { PETS } from '../constants';

export default function PetDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [likedPets, setLikedPets] = useState<string[]>(() => {
        const saved = localStorage.getItem('likedPets');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleLike = () => {
        if (!pet) return;
        setLikedPets(prev => {
            const newLikes = prev.includes(pet.id) ? prev.filter(pId => pId !== pet.id) : [...prev, pet.id];
            localStorage.setItem('likedPets', JSON.stringify(newLikes));
            return newLikes;
        });
    };

    useEffect(() => {
        async function fetchPet() {
            try {
                setLoading(true);
                if (id) {
                    const data = await getPetById(id);
                    if (data) {
                        setPet(data);
                    } else {
                        setPet(PETS.find((p) => p.id === id));
                    }
                }
            } catch (err) {
                if (id) setPet(PETS.find((p) => p.id === id));
            } finally {
                setLoading(false);
            }
        }
        fetchPet();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-primary animate-spin"></div>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">未找到宠物</h2>
                <p className="text-slate-500 mb-6">抱歉，我们无法找到您正在寻找的宠物。</p>
                <button onClick={() => navigate(-1)} className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg">返回</button>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans pb-28 relative">
            {/* Visual Header / Banner */}
            <div className="relative w-full h-[45vh] bg-slate-200 dark:bg-slate-800">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

                {/* Top bar items */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 pt-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 active:scale-95 transition-all shadow-lg"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex gap-3">
                        <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 active:scale-95 transition-all shadow-lg">
                            <Share2 size={24} />
                        </button>
                        <button
                            onClick={toggleLike}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 group ${pet && likedPets.includes(pet.id)
                                    ? 'bg-white text-red-500'
                                    : 'bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-red-500'
                                }`}
                        >
                            <Heart size={24} className={pet && likedPets.includes(pet.id) ? 'fill-current' : 'group-hover:fill-current'} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Sheet */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                className="relative -mt-8 bg-background-light dark:bg-background-dark rounded-t-[40px] px-6 pt-8 pb-8 z-20"
            >
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{pet.name}</h1>
                    <div className="text-2xl font-bold text-primary">{pet.fee || '免费'}</div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium mb-6">
                    <MapPin size={16} className="text-primary" />
                    <span>{pet.location}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 mx-1"></span>
                    <span>{pet.distance}</span>
                </div>

                {/* Stats Row */}
                <div className="flex justify-between gap-4 mb-8">
                    <div className="flex-1 bg-blue-50 dark:bg-slate-800/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-blue-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">性别</span>
                        <span className="text-base font-bold text-slate-900 dark:text-white">{pet.gender}</span>
                    </div>
                    <div className="flex-1 bg-emerald-50 dark:bg-slate-800/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-emerald-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">年龄</span>
                        <span className="text-base font-bold text-slate-900 dark:text-white">{pet.age}</span>
                    </div>
                    <div className="flex-1 bg-amber-50 dark:bg-slate-800/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-amber-100 dark:border-slate-800 truncate">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">品种</span>
                        <span className="text-base font-bold text-slate-900 dark:text-white truncate w-full text-center">{pet.breed}</span>
                    </div>
                </div>

                {/* Shelter Info */}
                {pet.shelter && pet.shelter.name && (
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden shadow-inner border border-slate-200">
                                {pet.shelter.logo ? (
                                    <img src={pet.shelter.logo} alt={pet.shelter.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400"><User /></div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-base">{pet.shelter.name}</h4>
                                <p className="text-xs font-medium text-slate-500">{pet.shelter.address || '认证机构'}</p>
                            </div>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                            <Shield size={20} />
                        </button>
                    </div>
                )}

                {/* About */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">关于 {pet.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                        {pet.description || '这只可爱的小动物正在寻找它永远的家。如果你能给它一个充满爱的环境，它一定会成为你最忠实的伙伴。赶快来带它回家吧！'}
                    </p>
                </div>

                {/* Tags */}
                {pet.tags && pet.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {pet.tags.map((tag: string, idx: number) => (
                            <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold px-4 py-2 rounded-full text-xs box-border border border-slate-200 dark:border-slate-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

            </motion.div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 w-full p-6 bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-white/5 z-50">
                <div className="flex gap-4 items-center max-w-md mx-auto">
                    <button className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-inner">
                        <Clock size={28} />
                    </button>
                    <Link
                        to={`/adopt/${pet.id}`}
                        className="flex-1 rounded-2xl bg-primary hover:bg-blue-600 active:scale-[0.98] transition-all text-white h-16 text-lg font-bold shadow-xl shadow-blue-500/30 flex items-center justify-center"
                    >
                        领养我
                    </Link>
                </div>
            </div>
        </div>
    );
}
