import { Mail, Lock, EyeOff, Eye, ArrowRight, Apple } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('请输入邮箱和密码');
      return;
    }
    setLoading(true);
    setError(null);
    const result = await signIn(email, password);
    setLoading(false);

    if (result.error) {
      if (result.error.toLowerCase().includes('credential') || result.error.includes('Invalid login')) {
        // 用户很可能没有注册，自动跳转去注册
        navigate('/register', { state: { email } });
      } else {
        setError(result.error === 'Email not confirmed' ? '请先验证您的邮箱' : result.error);
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans antialiased text-slate-900 dark:text-slate-100 min-h-screen flex flex-col justify-between">
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto relative px-6 py-8 sm:justify-center">
        <div className="w-full flex justify-center mb-6 mt-8">
          <div
            className="relative w-full aspect-[4/3] max-h-[300px] rounded-lg overflow-hidden shadow-lg bg-blue-100 dark:bg-blue-900/20"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAakW_rrjirvn4DOb1quCtpp1BY2JUtWxXqA-tMkDr_xkkYIA24FECpmoPN9XIBJNIFUidNGO1zlmseDshDW_udpiJG33fQ9R0NugQvALKndXDO_mkcFnJqBYWzWLZ_z3XYCB715YHmsRzYDtz-mh42G9gth8JRk4HeGG9552zqFO6s0i1vE5xLVRzL079__H15edJvLwW5_LME1JOWrGz562LXrDaxxaI4hkhyINBQX4ECsXb0Z_Pf4cVkpelg54qhUzPXZ-WzZ54')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background-light/80 to-transparent dark:from-background-dark/80"></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">欢迎回来！</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">你的新朋友正在等着你</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm font-bold bg-red-50 dark:bg-red-500/10 p-3 rounded-lg">{error}</div>}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <Mail size={20} />
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-full shadow-sm focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-800 transition-all duration-200"
              placeholder="请输入邮箱"
              type="email"
              required
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <Lock size={20} />
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full py-4 pl-12 pr-12 text-slate-900 placeholder-slate-400 bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-full shadow-sm focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-800 transition-all duration-200"
              placeholder="请输入密码"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="flex justify-end">
            <a className="text-sm font-semibold text-primary hover:text-blue-700 transition-colors" href="#">忘记密码？</a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:active:scale-100 text-white font-bold py-4 rounded-full shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>{loading ? '登录中...' : '登录'}</span>
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="relative mt-8 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background-light dark:bg-background-dark px-4 text-slate-500">或使用以下方式登录</span>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Apple size={24} className="text-slate-900 dark:text-white" />
          </button>
          <button className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <svg className="w-6 h-6 fill-current text-[#07C160]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.5,14.5a1,1,0,0,1,1,1,1,1,0,0,0,1,1,5.5,5.5,0,0,0,0-11,5.43,5.43,0,0,0-2.8.78A.94.94,0,0,1,7,6.47,7.49,7.49,0,0,1,10.5,4.5a7.5,7.5,0,0,1,0,15,7.27,7.27,0,0,1-1.68-.2,1,1,0,0,1-.66-.48L6.87,16.29a1,1,0,0,0-1.74.9L6.83,19.9a1,1,0,0,1-.21.82,1,1,0,0,1-.83.35H5.71a3.67,3.67,0,0,1-3.35-2.22,1,1,0,0,1,1.75-.86A1.69,1.69,0,0,0,5.65,19h.12L4.6,17.15A3,3,0,0,1,7.25,12.5a1,1,0,0,1,1,1v1Z"></path></svg>
          </button>
        </div>

        <div className="mt-8 text-center pb-6">
          <p className="text-slate-500 dark:text-slate-400">
            还没有账号？
            <Link className="font-bold text-primary hover:text-blue-700 ml-1" to="/register">立即注册</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
