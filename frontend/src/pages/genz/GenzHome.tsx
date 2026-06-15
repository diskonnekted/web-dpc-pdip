
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Shield, PlayCircle, HeartHandshake, BookOpen } from 'lucide-react';
import { useYouthModeStore } from '../../store/youthModeStore';
import { Link } from 'react-router-dom';

const GenzHome = () => {
  const { xp, level, isYouthMode } = useYouthModeStore();

  const badges = [
    { name: 'First Blood', desc: 'Rekrut 1 KTA', icon: <Target size={24} className="text-red-500" /> },
    { name: 'Explorer', desc: 'Lapor TPS', icon: <Shield size={24} className="text-blue-400" /> },
  ];

  return (
    <div className={`container mx-auto px-4 py-8 max-w-4xl min-h-[80vh] ${isYouthMode ? 'text-white' : 'text-brand-dark'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 md:p-8 shadow-xl ${isYouthMode ? 'bg-zinc-900/80 backdrop-blur-xl border border-zinc-800' : 'bg-white'}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-red to-orange-500 p-1">
            <div className={`w-full h-full rounded-full flex items-center justify-center text-4xl font-bold ${isYouthMode ? 'bg-zinc-900 text-white' : 'bg-white text-brand-dark'}`}>
              MW
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-1">Mas Windy</h1>
            <p className="text-brand-red font-semibold mb-3">Level {level} - Kader Muda</p>
            
            {/* XP Bar */}
            <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-4 mb-2 overflow-hidden border dark:border-zinc-700">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(xp % 1000) / 10}%` }}
                className="bg-brand-red h-4 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-right">{xp} / 2000 XP to next level</p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy className="text-yellow-500"/> Pencapaian (Badges)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, i) => (
              <div key={i} className={`p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 ${isYouthMode ? 'bg-zinc-800/50' : 'bg-gray-50 border border-gray-100'}`}>
                <div className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-md">
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{badge.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Star className="text-yellow-500"/> Aktivitas Selanjutnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/genz/feed" className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${isYouthMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 hover:border-brand-red/50' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
              <PlayCircle size={32} className="text-brand-red mb-3" />
              <h3 className="font-bold text-lg mb-1">Marhaen Feed</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tonton & share edukasi politik terkini.</p>
            </Link>
            
            <Link to="/genz/care" className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${isYouthMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 hover:border-brand-red/50' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
              <HeartHandshake size={32} className="text-brand-red mb-3" />
              <h3 className="font-bold text-lg mb-1">Gen Z Care</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Aksi nyata untuk isu Gen Z & literasi digital.</p>
            </Link>

            <Link to="/genz/academy" className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${isYouthMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 hover:border-brand-red/50' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
              <BookOpen size={32} className="text-brand-red mb-3" />
              <h3 className="font-bold text-lg mb-1">Marhaen Academy</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tingkatkan XP dengan belajar Marhaenisme.</p>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GenzHome;
