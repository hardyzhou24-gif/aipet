import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Upload, Image as ImageIcon, CheckCircle, PawPrint, MapPin, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function UploadPet() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [name, setName] = useState('');
    const [type, setType] = useState('dog');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('boy');
    const [location, setLocation] = useState('杭州, 中国');
    const [fee, setFee] = useState('免费领养');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Status states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // If perfectly secure, block unauth users
    if (!user) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center items-center text-slate-900 dark:text-white p-6">
                <p className="font-bold mb-4 text-center">发布宠物前，请先登录您的账号。</p>
                <button onClick={() => navigate('/login')} className="px-6 py-3 bg-primary text-white rounded-full font-bold shadow-md w-full max-w-xs">前往登录</button>
            </div>
        );
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !breed || !age || !description || !imagePreview) {
            setError('请填写所有必填信息，并上传一张宠物照片。');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        // Simulate network
        await new Promise(resolve => setTimeout(resolve, 800));

        const petId = 'pet_' + Date.now();
        const newPet = {
            id: petId,
            name,
            type,
            breed,
            age,
            gender: gender === 'boy' ? 'Boy' : 'Girl',
            location,
            distance: '1 km',
            fee: fee === '免费领养' || !fee ? null : fee,
            image: imagePreview,
            description,
            tags: [],
            shelter: {
                name: user.user_metadata?.full_name || '热心个人发布',
                address: location,
                distance: '1 km',
                logo: ''
            },
            created_at: new Date().toISOString()
        };

        const existingStr = localStorage.getItem('MOCK_UPLOADED_PETS');
        const existing = existingStr ? JSON.parse(existingStr) : [];
        existing.push(newPet);
        localStorage.setItem('MOCK_UPLOADED_PETS', JSON.stringify(existing));

        setIsSubmitting(false);
        setShowSuccess(true);

        // Auto redirect after success display
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-sans pb-12 relative overflow-hidden">
            {/* Success Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-24 h-24 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-6"
                        >
                            <CheckCircle size={48} className="fill-current" />
                        </motion.div>
                        <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">发布成功！</h2>
                        <p className="text-slate-500 text-center">感谢您的爱心，这只小可爱很快就会遇见它的新主人。</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="px-6 py-6 sticky top-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md z-30 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold tracking-tight text-center flex-1">发布送养信息</h1>
                <div className="w-10"></div>
            </header>

            <main className="px-6 mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-500/10 text-red-500 p-4 rounded-2xl font-bold text-sm">
                            {error}
                        </div>
                    )}

                    {/* Image Upload Area */}
                    <div className="w-full relative group">
                        <input
                            type="file"
                            accept="image/*"
                            id="pet-image"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="pet-image"
                            className={`flex flex-col items-center justify-center w-full aspect-video rounded-3xl border-2 border-dashed overflow-hidden cursor-pointer transition-colors ${imagePreview ? 'border-primary' : 'border-slate-300 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <ImageIcon size={28} />
                                    </div>
                                    <span className="font-bold text-sm">点击上传宠物高光瞬间照 *</span>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
                        <div className="flex items-center gap-2 mb-2 text-primary">
                            <PawPrint size={18} />
                            <h3 className="font-bold text-sm">基础档案</h3>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2">昵称 *</label>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="例如: 奥利奥..." className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl px-4 py-3 font-semibold text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent dark:border-slate-700" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2">种类 *</label>
                                <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl px-4 py-3 font-semibold text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent dark:border-slate-700 appearance-none">
                                    <option value="dog">狗狗</option>
                                    <option value="cat">猫咪</option>
                                    <option value="rabbit">兔子</option>
                                    <option value="bird">鸟类</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2">品种 *</label>
                                <input value={breed} onChange={e => setBreed(e.target.value)} type="text" placeholder="例如: 柯基" className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl px-4 py-3 font-semibold text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent dark:border-slate-700" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2">年龄 *</label>
                                <input value={age} onChange={e => setAge(e.target.value)} type="text" placeholder="例如: 2个月" className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl px-4 py-3 font-semibold text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent dark:border-slate-700" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2">性别</label>
                                <div className="flex bg-slate-50 dark:bg-slate-900 rounded-2xl p-1 border border-transparent dark:border-slate-700 h-[46px]">
                                    <button type="button" onClick={() => setGender('boy')} className={`flex-1 rounded-xl text-sm font-bold transition-colors ${gender === 'boy' ? 'bg-white dark:bg-slate-700 text-blue-500 shadow-sm' : 'text-slate-400'}`}>男孩</button>
                                    <button type="button" onClick={() => setGender('girl')} className={`flex-1 rounded-xl text-sm font-bold transition-colors ${gender === 'girl' ? 'bg-white dark:bg-slate-700 text-pink-500 shadow-sm' : 'text-slate-400'}`}>女孩</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Extra Info */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">
                                <DollarSign size={14} /> 领养费用
                            </label>
                            <input value={fee} onChange={e => setFee(e.target.value)} type="text" placeholder="留空代表免费领养，或输入定金金额" className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl px-4 py-3 font-semibold text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent dark:border-slate-700" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">
                                <MapPin size={14} /> 萌宠当前所在地
                            </label>
                            <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl px-4 py-3 font-semibold text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent dark:border-slate-700" />
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                        <label className="block text-xs font-bold text-slate-500 mb-2">宠物故事跟性格描述 *</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="请描述一下这只小可爱的性格、来历，以及它需要一个什么样的新家..."
                            rows={4}
                            className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl px-4 py-3 font-medium text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent dark:border-slate-700 resize-none leading-relaxed"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                发布中...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Upload size={18} />
                                立即发布送养
                            </span>
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}
