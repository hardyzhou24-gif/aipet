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
        // Mock get initial session
        const savedUser = localStorage.getItem('MOCK_CURRENT_USER');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500));

        const usersStr = localStorage.getItem('MOCK_USERS');
        const users = usersStr ? JSON.parse(usersStr) : [];

        const existingUser = users.find((u: any) => u.email === email);
        if (!existingUser) {
            return { error: 'Invalid login credentials' }; // 模拟未注册
        }

        if (existingUser.password !== password) {
            return { error: '账号或密码错误' };
        }

        const mockUser: User = {
            id: email, // dummy id
            email,
            app_metadata: {},
            user_metadata: { full_name: existingUser.full_name, phone: existingUser.phone },
            aud: 'authenticated',
            created_at: new Date().toISOString()
        } as any;

        localStorage.setItem('MOCK_CURRENT_USER', JSON.stringify(mockUser));
        setUser(mockUser);
        return { error: null };
    };

    const signUp = async (email: string, password: string, fullName: string, phone: string) => {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500));

        const usersStr = localStorage.getItem('MOCK_USERS');
        const users = usersStr ? JSON.parse(usersStr) : [];

        if (users.some((u: any) => u.email === email)) {
            return { error: '该邮箱已经被注册过了' };
        }

        users.push({ email, password, full_name: fullName, phone });
        localStorage.setItem('MOCK_USERS', JSON.stringify(users));

        const mockUser: User = {
            id: email,
            email,
            app_metadata: {},
            user_metadata: { full_name: fullName, phone },
            aud: 'authenticated',
            created_at: new Date().toISOString()
        } as any;

        localStorage.setItem('MOCK_CURRENT_USER', JSON.stringify(mockUser));
        setUser(mockUser);
        return { error: null };
    };

    const signOut = async () => {
        localStorage.removeItem('MOCK_CURRENT_USER');
        setUser(null);
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
