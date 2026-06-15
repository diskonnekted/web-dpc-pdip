
import { motion } from 'framer-motion';
import { Trophy, Star, PlayCircle, HeartHandshake, BookOpen, Users, Zap, Award } from 'lucide-react';
import { useYouthModeStore } from '../../store/youthModeStore';
import { Link } from 'react-router-dom';

const GenzHome = () => {
  const { xp, level, isYouthMode } = useYouthModeStore();

  const userBadges = [
    { name: 'First Blood', desc: 'Rekrut 1 KTA', icon: <Award size={20} className="text-red-500" /> },
    { name: 'Explorer', desc: 'Lapor TPS', icon: <Award size={20} className="text-blue-400" /> },
  ];

  const leaderboard = [
    { rank: 1, name: 'Siti Rahma', PAC: 'PAC Batur', level: 15, xp: 4500, avatar: '/avatar_siti.png' },
    { rank: 2, name: 'Budi Santoso', PAC: 'PAC Wanadadi', level: 12, xp: 3200, avatar: '/avatar_budi.png' },
    { rank: 3, name: 'Mas Windy', PAC: 'PAC Banjarnegara', level: level, xp: xp, isUser: true, avatar: '/avatar_windy.png' },
    { rank: 4, name: 'Lia Ananda', PAC: 'PAC Purwareja Klampok', level: 9, xp: 1850, avatar: '/avatar_lia.png' },
    { rank: 5, name: 'Aditya Pratama', PAC: 'PAC Madukara', level: 8, xp: 1500, avatar: '/avatar_aditya.png' }
  ].sort((a, b) => b.xp - a.xp); // Dynamic sort so user moves up if they gain XP!

  const recentActivities = [
    { user: '@siti_rahma', action: 'menyelesaikan kuis', detail: 'Digital Activist', time: '2 menit lalu', xp: '+500 XP' },
    { user: '@rendy_bnr', action: 'mendaftar relawan', detail: 'Tanam 1000 Pohon Dieng', time: '10 menit lalu', xp: '+50 XP' },
    { user: '@lia_ananda', action: 'menyukai video', detail: 'Literasi Digital Anti Scam!', time: '15 menit lalu', xp: '+20 XP' }
  ];

  return (
    <div className={`container mx-auto px-4 py-8 max-w-5xl min-h-[80vh] ${isYouthMode ? 'text-white' : 'text-brand-dark'}`}>
      
      {/* Community Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Kader Muda Bergabung', val: '1,425', desc: 'Anak muda Banjarnegara', icon: <Users className="text-blue-500" size={24} /> },
          { title: 'Total Gotong-Royong', val: '124 Aksi', desc: 'Pendidikan & Lingkungan', icon: <HeartHandshake className="text-pink-500" size={24} /> },
          { title: 'Kaderisasi Aktif', val: '840 Lulus', desc: 'Modul Marhaen Academy', icon: <BookOpen className="text-green-500" size={24} /> }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-2xl border flex items-center justify-between shadow-sm ${isYouthMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-150'}`}
          >
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">{stat.title}</span>
              <h3 className="text-3xl font-extrabold mt-1">{stat.val}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{stat.desc}</p>
            </div>
            <div className={`p-3 rounded-xl ${isYouthMode ? 'bg-zinc-850' : 'bg-gray-50'}`}>{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column (User Card & Quick Actions) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* User Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-6 md:p-8 shadow-xl border ${isYouthMode ? 'bg-zinc-900/80 backdrop-blur-xl border-zinc-800' : 'bg-white border-gray-150'}`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-red to-orange-500 p-1 flex-shrink-0">
                <img src="/avatar_windy.png" alt="Mas Windy Avatar" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-zinc-900" />
              </div>
              <div className="flex-1 text-center md:text-left w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h1 className="text-3xl font-extrabold mb-1">Mas Windy (Kamu)</h1>
                  <span className="px-3 py-1 bg-brand-red/20 text-brand-red font-bold text-xs rounded-full w-max mx-auto md:mx-0">Kader PAC Banjarnegara</span>
                </div>
                <p className="text-brand-red font-bold mb-3 mt-1">Level {level} - Kader Muda</p>
                
                {/* XP Bar */}
                <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-4 mb-2 overflow-hidden border dark:border-zinc-700">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(xp % 1000) / 10}%` }}
                    className="bg-brand-red h-4 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-right font-medium">{xp} / 2000 XP to next level</p>
              </div>
            </div>

            {/* Badges Section */}
            <div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Trophy className="text-yellow-500" size={20}/> Pencapaianmu</h2>
              <div className="grid grid-cols-2 gap-4">
                {userBadges.map((badge, i) => (
                  <div key={i} className={`p-4 rounded-xl flex items-center gap-3 ${isYouthMode ? 'bg-zinc-800/40 border border-zinc-800' : 'bg-gray-50 border border-gray-100'}`}>
                    <div className={`p-2 rounded-full ${isYouthMode ? 'bg-zinc-800' : 'bg-white shadow-sm'}`}>
                      {badge.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm leading-tight">{badge.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links / Navigation */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Star className="text-yellow-500" size={20}/> Mulai Gotong Royong Digital</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/genz/feed" className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${isYouthMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 hover:border-brand-red/50' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
                <PlayCircle size={32} className="text-brand-red mb-3" />
                <h3 className="font-bold text-lg mb-1 leading-snug">Marhaen Feed</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Tonton & share edukasi politik pendek.</p>
              </Link>
              
              <Link to="/genz/care" className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${isYouthMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 hover:border-brand-red/50' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
                <HeartHandshake size={32} className="text-brand-red mb-3" />
                <h3 className="font-bold text-lg mb-1 leading-snug">Gen Z Care</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Dapatkan lowongan UMKM & konseling gratis.</p>
              </Link>

              <Link to="/genz/academy" className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${isYouthMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 hover:border-brand-red/50' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
                <BookOpen size={32} className="text-brand-red mb-3" />
                <h3 className="font-bold text-lg mb-1 leading-snug">Marhaen Academy</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Uji pengetahuan politikmu & klaim XP.</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (Leaderboard & Live Feed) */}
        <div className="space-y-8">
          
          {/* Leaderboard Widget */}
          <div className={`p-6 rounded-2xl border shadow-sm ${isYouthMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-150'}`}>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Trophy className="text-yellow-500" size={20}/> Top Ranks Banjarnegara</h2>
            <div className="space-y-4">
              {leaderboard.map((lead, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
                    lead.isUser 
                      ? 'bg-brand-red/10 border border-brand-red/35' 
                      : ''
                  }`}
                >
                  <span className={`w-6 text-center font-bold text-sm ${
                    i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-gray-500'
                  }`}>
                    #{i + 1}
                  </span>
                  <img src={lead.avatar} alt={lead.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{lead.name}</h4>
                    <p className="text-[10px] text-gray-500">{lead.PAC}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-brand-red">{lead.xp} XP</span>
                    <p className="text-[9px] text-gray-400">Lv {lead.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Feed Widget */}
          <div className={`p-6 rounded-2xl border shadow-sm ${isYouthMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-150'}`}>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Zap className="text-brand-red animate-pulse" size={20}/> Aktivitas Kader</h2>
            <div className="space-y-4">
              {recentActivities.map((act, i) => (
                <div key={i} className="text-xs space-y-1">
                  <div className="flex justify-between items-start gap-1">
                    <span className="font-bold text-brand-red">{act.user}</span>
                    <span className="text-[9px] text-gray-400">{act.time}</span>
                  </div>
                  <p className="text-gray-650 dark:text-gray-300 font-medium">
                    {act.action} <span className="font-bold underline">{act.detail}</span>
                  </p>
                  <span className="inline-block bg-green-500/10 text-green-500 font-bold px-1.5 py-0.5 rounded text-[10px]">
                    {act.xp}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GenzHome;
