import { ArrowLeft, User, Mail, Phone, Lock, EyeOff, Eye, PawPrint, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 自动填充可能从 Login 页面重定向过来的邮箱
    if (location.state?.email) {
      setEmail(location.state.email);
      setError('检测到您还未注册，请先完成注册。');
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('请提供邮箱和密码');
      return;
    }
    if (!terms) {
      setError('请仔细阅读并同意服务条款');
      return;
    }

    setLoading(true);
    setError(null);
    const result = await signUp(email, password, fullname, phone);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      alert('注册成功！');
      navigate('/');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#1978e5_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col min-h-screen sm:min-h-[800px] sm:h-auto sm:my-8 bg-white/80 dark:bg-slate-900/90 sm:backdrop-blur-xl sm:rounded-xl shadow-none sm:shadow-2xl overflow-y-auto">
        <header className="flex items-center justify-between p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 px-8 pb-8 pt-2 flex flex-col">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 text-primary">
              <PawPrint size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">创建账号</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">加入我们的爱宠社区，寻找你的新朋友。</p>
          </div>

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm font-bold bg-red-50 dark:bg-red-500/10 p-3 rounded-lg">{error}</div>}

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-900 dark:text-white ml-4" htmlFor="fullname">姓名</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={20} />
                </div>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 rounded-full border-0 bg-background-light dark:bg-background-dark/50 text-slate-900 dark:text-white ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all placeholder:text-slate-400"
                  id="fullname"
                  placeholder="您的姓名（选填）"
                  type="text"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-900 dark:text-white ml-4" htmlFor="email">邮箱地址 <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={20} />
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 rounded-full border-0 bg-background-light dark:bg-background-dark/50 text-slate-900 dark:text-white ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all placeholder:text-slate-400"
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-900 dark:text-white ml-4" htmlFor="phone">手机号码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Phone size={20} />
                </div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 rounded-full border-0 bg-background-light dark:bg-background-dark/50 text-slate-900 dark:text-white ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all placeholder:text-slate-400"
                  id="phone"
                  placeholder="+86 1XX XXXX XXXX（选填）"
                  type="tel"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-900 dark:text-white ml-4" htmlFor="password">密码 <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-4 rounded-full border-0 bg-background-light dark:bg-background-dark/50 text-slate-900 dark:text-white ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all placeholder:text-slate-400"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                />
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="relative flex items-start py-2 pl-4">
              <div className="flex h-6 items-center">
                <input
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-background-dark/50"
                  id="terms"
                  name="terms"
                  type="checkbox"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label className="font-medium text-slate-900 dark:text-white" htmlFor="terms">我已阅读并同意服务条款和隐私政策</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full bg-primary px-3.5 py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-600 disabled:opacity-50 disabled:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all active:scale-[0.98]"
            >
              {loading ? '注册中...' : '创建账号'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>已有账号？ <Link className="font-bold text-primary hover:text-blue-700 ml-1 hover:underline" to="/login">登录</Link></p>
          </div>
        </main>
      </div>
    </div>
  );
}
