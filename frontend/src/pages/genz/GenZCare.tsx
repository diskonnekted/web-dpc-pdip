
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, HeartPulse, ShieldCheck, Leaf, X, CheckCircle, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useYouthModeStore } from '../../store/youthModeStore';

const GenZCare = () => {
  const { isYouthMode, addXp } = useYouthModeStore();
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [scamAnswered, setScamAnswered] = useState(false);
  const [isScamCorrect, setIsScamCorrect] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleActionClick = (id: number) => {
    setActiveModalId(id);
    setScamAnswered(false);
  };

  const handleApplyJob = (title: string) => {
    addXp(50);
    triggerToast(`💼 Berhasil mendaftar di "${title}": +50 XP!`);
    setActiveModalId(null);
  };

  const handleScamAnswer = (correct: boolean) => {
    setIsScamCorrect(correct);
    setScamAnswered(true);
    if (correct) {
      addXp(50);
      triggerToast(`🛡️ Jawaban Tepat! Anda lolos modul Literasi Digital: +50 XP!`);
    }
  };

  const handleRegisterVolunteer = (title: string) => {
    addXp(50);
    triggerToast(`🌱 Terdaftar sebagai relawan "${title}": +50 XP!`);
    setActiveModalId(null);
  };

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
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-brand-red to-orange-500 text-white font-bold px-6 py-3 rounded-full shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

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
                <button 
                  onClick={() => handleActionClick(issue.id)}
                  className={`font-bold px-6 py-2 rounded-lg transition-colors ${
                    isYouthMode ? 'bg-brand-red hover:bg-red-700 text-white' : 'bg-brand-red hover:bg-red-800 text-white'
                  }`}
                >
                  {issue.action}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Modals */}
      <AnimatePresence>
        {activeModalId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl relative border max-h-[90vh] overflow-y-auto ${
                isYouthMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-gray-200 text-brand-dark'
              }`}
            >
              <button 
                onClick={() => setActiveModalId(null)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
              >
                <X size={20} />
              </button>

              {/* Berdikari Ekonomi Modal */}
              {activeModalId === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-500"><Briefcase /> Portal Kerja Berdikari</h2>
                  <p className="text-sm text-gray-400 mb-6">Mendukung UMKM & usaha lokal di Kabupaten Banjarnegara dengan mempertemukan gig-workers lokal.</p>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Social Media Admin', biz: 'Kopi Marhaen Banjarnegara', salary: 'Rp 1.5 - 2.5 jt' },
                      { title: 'Desainer Grafis Freelance', biz: 'Batik Tulis Gumelem', salary: 'Project-based' },
                      { title: 'Content Creator TikTok', biz: 'Kuliner Dawet Ayu', salary: 'Rp 2 jt / bln' }
                    ].map((job, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border flex justify-between items-center ${isYouthMode ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                        <div>
                          <h4 className="font-bold">{job.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{job.biz}</p>
                          <span className="text-xs text-brand-red font-bold mt-1 inline-block">{job.salary}</span>
                        </div>
                        <button 
                          onClick={() => handleApplyJob(job.title)}
                          className="px-4 py-1.5 bg-brand-red text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Lamar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kedaulatan Digital Modal */}
              {activeModalId === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-500"><ShieldCheck /> Cek Literasi Keamanan Digital</h2>
                  <p className="text-sm text-gray-400 mb-6">Kuis kilat 1 pertanyaan untuk membuktikan kamu tangguh dari scam dan penipuan online.</p>
                  
                  {!scamAnswered ? (
                    <div className="space-y-4">
                      <p className="font-medium text-lg">Kamu menerima file "Undangan_Pernikahan.apk" di WhatsApp dari nomor tidak dikenal. Apa tindakanmu?</p>
                      <button 
                        onClick={() => handleScamAnswer(false)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${isYouthMode ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-750' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                      >
                        A. Klik & install untuk melihat siapa yang menikah.
                      </button>
                      <button 
                        onClick={() => handleScamAnswer(true)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${isYouthMode ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-750' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                      >
                        B. Hapus pesan tersebut segera dan jangan menginstalnya karena berbahaya.
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      {isScamCorrect ? (
                        <div className="flex flex-col items-center gap-3">
                          <CheckCircle className="text-green-500" size={64} />
                          <h3 className="text-2xl font-bold text-green-500">Hebat! Kamu Aman!</h3>
                          <p className="text-gray-400">File APK tersebut adalah malware pencuri OTP. Kamu berhasil menghindarinya!</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <X className="text-red-500 bg-red-500/20 p-2 rounded-full" size={64} />
                          <h3 className="text-2xl font-bold text-red-500">Bahaya! HP Kamu Bisa Diretas</h3>
                          <p className="text-gray-400">Menginstal file .apk palsu dari WA bisa membuat peretas mencuri SMS OTP perbankan Anda.</p>
                        </div>
                      )}
                      <button 
                        onClick={() => setActiveModalId(null)}
                        className="mt-6 px-6 py-2 bg-brand-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Selesai
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Keadilan Psikologis Modal */}
              {activeModalId === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-pink-500"><HeartPulse /> Layanan Konseling Pro-Bono</h2>
                  <p className="text-sm text-gray-400 mb-6">DPC PDIP Banjarnegara bekerjasama dengan psikolog profesional untuk memberikan layanan konsultasi kesehatan mental gratis.</p>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Dr. Linda Lestari, M.Psi', spec: 'Spesialis Depresi & Kecemasan Remaja', wa: '0812-3456-7890' },
                      { name: 'Rahmat Hidayat, S.Psi', spec: 'Konseling Karir & Tekanan Sosial', wa: '0812-9876-5432' }
                    ].map((doc, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-2 ${isYouthMode ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                        <div>
                          <h4 className="font-bold">{doc.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{doc.spec}</p>
                        </div>
                        <a 
                          href={`https://wa.me/${doc.wa.replace('-', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => {
                            addXp(10);
                            triggerToast('💬 Menghubungi hotline konseling: +10 XP!');
                          }}
                          className="w-full text-center py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          Hubungi Konselor <ExternalLink size={12} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sosio-Ekologis Modal */}
              {activeModalId === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-500"><Leaf /> Relawan Sosio-Ekologis</h2>
                  <p className="text-sm text-gray-400 mb-6">Ikuti gerakan gotong-royong nyata untuk menjaga alam dan kelestarian Banjarnegara.</p>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Tanam 1000 Pohon Dieng', date: 'Minggu, 21 Juni 2026', loc: 'Kawasan Wisata Dieng' },
                      { title: 'Clean-Up Sungai Serayu', date: 'Sabtu, 27 Juni 2026', loc: 'Pinggiran Sungai Serayu' }
                    ].map((act, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-3 ${isYouthMode ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                        <div>
                          <h4 className="font-bold">{act.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><Calendar size={12} /> {act.date}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><MapPin size={12} /> {act.loc}</p>
                        </div>
                        <button 
                          onClick={() => handleRegisterVolunteer(act.title)}
                          className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          Daftar Relawan
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenZCare;
