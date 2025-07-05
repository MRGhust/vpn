import React, { useState } from 'react';
import type { User } from '../types';
import type { Page } from '../App';
import * as api from '../lib/data';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigate: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = api.findUser(email, password);

    if (user) {
      onLogin(user);
    } else {
      setError('ایمیل یا رمز عبور نامعتبر است.');
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md bg-slate-800/50 rounded-xl p-8 space-y-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">ورود به حساب کاربری</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-400 text-center">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">ایمیل</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">رمز عبور</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg hover:opacity-95 transition-opacity">
            ورود
          </button>
        </form>
        <p className="text-center text-slate-400">
          حساب کاربری ندارید؟{' '}
          <button onClick={() => onNavigate('signup')} className="font-semibold text-cyan-400 hover:text-cyan-300">
            ثبت‌نام کنید
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
