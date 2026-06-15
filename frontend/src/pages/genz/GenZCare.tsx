
import { motion } from 'framer-motion';
import { Briefcase, HeartPulse, ShieldCheck, Leaf } from 'lucide-react';
import { useYouthModeStore } from '../../store/youthModeStore';

const GenZCare = () => {
  const { isYouthMode } = useYouthModeStore();

  const issues = [
    {
      id: 1,
      title: 'Berdikari Ekonomi',
      desc: 'Info lowongan kerja UMKM, gig worker & startup lokal.',
      icon: <Briefcase size={32} className="text-blue-500" />,
      action: 'Lihat Lowongan'
    },
    {
      id: 2,
      title: 'Kedaulatan Digital',
      desc: 'Edukasi anti-scam, data privacy, dan aman bersosmed.',
      icon: <ShieldCheck size={32} className="text-red-500" />,
      action: 'Ikut Pelatihan'
    },
    {
      id: 3,
      title: 'Keadilan Psikologis',
      desc: 'Direktori psikolog pro-bono & hotline kesehatan mental.',
      icon: <HeartPulse size={32} className="text-pink-500" />,
      action: 'Cari Bantuan'
    },
    {
      id: 4,
      title: 'Sosio-Ekologis',
      desc: 'Aksi tanam pohon, clean-up, & peduli lingkungan.',
      icon: <Leaf size={32} className="text-green-500" />,
      action: 'Gabung Aksi'
    }
  ];

  return (
    <div className={`container mx-auto px-4 py-12 max-w-5xl min-h-[80vh] ${isYouthMode ? 'text-white' : 'text-brand-dark'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Gen Z Care</h1>
        <p className={`text-lg max-w-2xl mx-auto ${isYouthMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Narasi Marhaenisme yang diterjemahkan menjadi aksi nyata. Pilih isu yang paling relate dengan kamu dan mari bergerak bersama.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {issues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${
              isYouthMode 
                ? 'bg-zinc-900/80 backdrop-blur-md border-zinc-800 hover:border-brand-red/50 shadow-lg shadow-black/20' 
                : 'bg-white border-gray-200 hover:shadow-xl'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-xl ${isYouthMode ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                {issue.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{issue.title}</h2>
                <p className={`mb-6 ${isYouthMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {issue.desc}
                </p>
                <button className={`font-bold px-6 py-2 rounded-lg transition-colors ${
                  isYouthMode ? 'bg-brand-red hover:bg-red-700 text-white' : 'bg-brand-red hover:bg-red-800 text-white'
                }`}>
                  {issue.action}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GenZCare;
