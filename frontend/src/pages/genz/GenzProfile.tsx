import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useYouthModeStore } from '../../store/youthModeStore';
import { LogIn, UserPlus, LogOut, Shield, Award, MapPin } from 'lucide-react';

export default function GenzProfile() {
  const { xp, level, isYouthMode } = useYouthModeStore();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('genz_user'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('genz_user') || '{}'));
  const [isRegister, setIsRegister] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [pac, setPac] = useState('PAC Banjarnegara');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    // Dummy validation
    const mockUser = { name: username === 'windy' ? 'Mas Windy' : username, pac: 'PAC Banjarnegara', username };
    localStorage.setItem('genz_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoggedIn(true);
    triggerToast('🔑 Login sukses! Selamat datang kembali, Kader!');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !password) return;

    const newUser = { name, pac, username };
    localStorage.setItem('genz_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoggedIn(true);
    triggerToast('🎉 Pendaftaran Sukses! Kamu resmi menjadi Kader Muda!');
  };

  const handleLogout = () => {
    localStorage.removeItem('genz_user');
    setIsLoggedIn(false);
    setUser({});
    triggerToast('👋 Berhasil Keluar.');
  };

  const PAC_LIST = [
    'PAC Banjarnegara', 'PAC Batur', 'PAC Wanadadi', 'PAC Madukara', 
    'PAC Purwareja Klampok', 'PAC Karangkobar', 'PAC Kalibening'
  ];

  return (
    <div className={`container mx-auto px-4 py-8 max-w-md min-h-[80vh] flex flex-col justify-center ${isYouthMode ? 'text-white' : 'text-brand-dark'}`}>
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-brand-red to-orange-500 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm">
          {toastMessage}
        </div>
      )}

      {isLoggedIn ? (
        // Profile Screen
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 rounded-2xl border shadow-xl ${isYouthMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-brand-red to-orange-500 p-1 mb-3">
              <div className={`w-full h-full rounded-full flex items-center justify-center text-3xl font-extrabold ${isYouthMode ? 'bg-zinc-900' : 'bg-white text-brand-dark'}`}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-brand-red font-semibold text-sm">Kader Muda - Level {level}</p>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-xl flex items-center gap-3 ${isYouthMode ? 'bg-zinc-850' : 'bg-gray-50'}`}>
              <MapPin className="text-brand-red" size={20} />
              <div>
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Wilayah PAC</span>
                <span className="font-semibold text-sm">{user.pac}</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-center gap-3 ${isYouthMode ? 'bg-zinc-850' : 'bg-gray-50'}`}>
              <Award className="text-brand-red" size={20} />
              <div>
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Total Pencapaian</span>
                <span className="font-semibold text-sm">{xp} XP</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-8 py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-brand-red transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Keluar
          </button>
        </motion.div>
      ) : (
        // Login & Register Screen
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border shadow-xl ${isYouthMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {isRegister ? 'Gabung PAC' : 'Masuk Kader'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {isRegister ? 'Daftar sebagai Kader Muda Banjarnegara' : 'Masuk ke akun kadermu untuk lacak XP'}
            </p>
          </div>

          <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-transparent border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">PAC Kecamatan</label>
                  <select
                    value={pac}
                    onChange={e => setPac(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red ${isYouthMode ? 'bg-zinc-900 text-white' : 'bg-white text-brand-dark'}`}
                  >
                    {PAC_LIST.map((p, idx) => (
                      <option key={idx} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-transparent border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {isRegister ? <UserPlus size={18} /> : <LogIn size={18} />}
              {isRegister ? 'Daftar Sekarang' : 'Masuk'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-brand-red font-bold hover:underline"
            >
              {isRegister ? 'Sudah punya akun? Masuk disini' : 'Belum gabung? Daftar PAC disini'}
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
