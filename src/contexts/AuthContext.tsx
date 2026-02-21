import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            return { error: error?.message ?? null };
        } catch (err: any) {
            console.error('SignIn fetch error:', err);
            return { error: '网络连接异常，无法连接到验证服务器。请检查您的网络或者代理设置。' };
        }
    };

    const signUp = async (email: string, password: string, fullName: string, phone: string) => {
        try {
            const data: Record<string, string> = {};
            if (fullName) data.full_name = fullName;
            if (phone) data.phone = phone;

            // 只有当存在有效附加信息时才构造 options 对象
            const hasData = Object.keys(data).length > 0;

            const payload: any = { email, password };
            if (hasData) {
                payload.options = { data };
            }

            const { error } = await supabase.auth.signUp(payload);
            return { error: error?.message ?? null };
        } catch (err: any) {
            console.error('SignUp fetch error:', err);
            return { error: '网络连接异常，无法连接到验证服务器。请检查您的网络或者代理设置。' };
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
