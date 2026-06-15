
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, Lock, X, Check, AlertCircle } from 'lucide-react';
import { useYouthModeStore } from '../../store/youthModeStore';

const QUIZ_QUESTIONS: Record<number, { question: string; options: string[]; answerIndex: number }[]> = {
  1: [
    { question: 'Siapakah pencetus istilah Marhaenisme?', options: ['Bung Karno', 'Moh. Hatta', 'Sutan Sjahrir', 'Tan Malaka'], answerIndex: 0 },
    { question: 'Siapa sosok petani kecil di Bandung yang menginspirasi nama Marhaenisme?', options: ['Pak Tani', 'Aki Marhaen', 'Mbah Marhaen', 'Mang Apin'], answerIndex: 1 },
    { question: 'Apa inti dari ajaran ideologi Marhaenisme?', options: ['Kapitalisme liberal', 'Sosialisme Indonesia yang menentang penindasan', 'Feodalisme modern', 'Monarki konstitusional'], answerIndex: 1 }
  ],
  2: [
    { question: 'Apa langkah utama untuk melindungi data dari scam online?', options: ['Langsung klik link kiriman', 'Verifikasi pengirim dan jangan bagikan kode OTP', 'Kirim foto KTP ke nomor tidak dikenal', 'Abaikan semua anjuran keamanan'], answerIndex: 1 },
    { question: 'Metode apa yang paling efektif untuk menyuarakan aspirasi politik di kalangan Gen Z?', options: ['Memasang baliho besar', 'Menggunakan media sosial dengan narasi kreatif', 'Membagikan brosur cetak', 'Mengadakan rapat formal berjam-jam'], answerIndex: 1 },
    { question: 'Apa arti Berdikari di bidang ekonomi digital bagi Gen Z?', options: ['Membeli barang impor', 'Kemandirian berkreasi & mendukung UMKM digital lokal', 'Bergantung pada platform asing', 'Tidak mau memakai teknologi'], answerIndex: 1 }
  ]
};

const MarhaenAcademy = () => {
  const { isYouthMode, addXp } = useYouthModeStore();
  const [courses, setCourses] = useState([
    { id: 1, title: 'Marhaen 101', duration: '5 min', xp: 200, locked: false, progress: 0 },
    { id: 2, title: 'Digital Activist', duration: '10 min', xp: 500, locked: true, progress: 0 },
    { id: 3, title: 'Community Organizer', duration: '15 min', xp: 800, locked: true, progress: 0 },
    { id: 4, title: 'Policy Maker Muda', duration: '20 min', xp: 1000, locked: true, progress: 0 }
  ]);

  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleStartCourse = (id: number) => {
    if (!QUIZ_QUESTIONS[id]) {
      triggerToast('⚠️ Materi kursus ini sedang disiapkan oleh tim mentor!');
      return;
    }
    setActiveCourseId(id);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const activeQuiz = activeCourseId ? QUIZ_QUESTIONS[activeCourseId] : null;
  const isCorrect = activeQuiz && selectedAnswer === activeQuiz[currentQuestion].answerIndex;

  const handleNext = () => {
    if (!activeQuiz || activeCourseId === null) return;

    if (currentQuestion < activeQuiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Completed the course!
      setCourses(prev => {
        const nextIdx = prev.findIndex(c => c.id === activeCourseId) + 1;
        return prev.map((c, i) => {
          if (c.id === activeCourseId) {
            return { ...c, progress: 100 };
          }
          if (i === nextIdx) {
            return { ...c, locked: false };
          }
          return c;
        });
      });

      const finishedCourse = courses.find(c => c.id === activeCourseId);
      if (finishedCourse) {
        addXp(finishedCourse.xp);
        triggerToast(`🎉 Selamat! Anda menyelesaikan ${finishedCourse.title} dan mendapatkan +${finishedCourse.xp} XP!`);
      }
      setActiveCourseId(null);
    }
  };

  return (
    <div className={`container mx-auto px-4 py-12 max-w-4xl min-h-[80vh] ${isYouthMode ? 'text-white' : 'text-brand-dark'}`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-brand-red rounded-lg text-white">
          <BookOpen size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Marhaen Academy</h1>
          <p className={isYouthMode ? 'text-gray-400' : 'text-gray-500'}>Belajar politik dengan gaya Gen Z. Cepat, interaktif, berdampak.</p>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <motion.div 
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl flex flex-col md:flex-row md:items-center gap-6 border ${
              isYouthMode 
                ? 'bg-zinc-900 border-zinc-800' 
                : 'bg-white border-gray-200'
            } ${course.locked ? 'opacity-50 grayscale' : ''}`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold">{course.title}</h2>
                {course.locked && <Lock size={16} className="text-gray-400" />}
                {course.progress === 100 && <CheckCircle size={18} className="text-green-500" />}
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className={isYouthMode ? 'text-gray-400' : 'text-gray-500'}>⏱️ {course.duration}</span>
                <span className="text-brand-red font-bold">💎 +{course.xp} XP</span>
              </div>
            </div>

            <div className="w-full md:w-48">
              <div className="flex justify-between text-xs mb-1 font-bold">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-2.5 mb-4">
                <div 
                  className={`h-2.5 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-brand-red'}`} 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <button 
                onClick={() => handleStartCourse(course.id)}
                disabled={course.locked}
                className={`w-full py-2 rounded-lg font-bold text-sm transition-colors ${
                  course.locked 
                    ? 'bg-gray-300 dark:bg-zinc-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-brand-dark text-white hover:bg-brand-red'
                }`}
              >
                {course.progress === 100 ? 'Review Ulang' : course.progress > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quiz Modal overlay */}
      <AnimatePresence>
        {activeCourseId !== null && activeQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl relative border ${
                isYouthMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-gray-200 text-brand-dark'
              }`}
            >
              <button 
                onClick={() => setActiveCourseId(null)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
              >
                <X size={20} />
              </button>

              <div className="mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-brand-red">Pertanyaan {currentQuestion + 1} dari {activeQuiz.length}</span>
                <h2 className="text-xl font-bold mt-1">{activeQuiz[currentQuestion].question}</h2>
              </div>

              <div className="space-y-3 mt-6">
                {activeQuiz[currentQuestion].options.map((option, index) => {
                  let buttonStyle = isYouthMode ? 'bg-zinc-850 border-zinc-700 hover:bg-zinc-800' : 'bg-gray-50 border-gray-200 hover:bg-gray-100';
                  
                  if (showFeedback) {
                    if (index === activeQuiz[currentQuestion].answerIndex) {
                      buttonStyle = 'bg-green-500/20 border-green-500 text-green-500';
                    } else if (index === selectedAnswer) {
                      buttonStyle = 'bg-red-500/20 border-red-500 text-red-500';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-xl border font-medium transition-all flex justify-between items-center ${buttonStyle}`}
                    >
                      <span>{option}</span>
                      {showFeedback && index === activeQuiz[currentQuestion].answerIndex && <Check size={18} className="text-green-500" />}
                      {showFeedback && index === selectedAnswer && index !== activeQuiz[currentQuestion].answerIndex && <X size={18} className="text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-col items-center gap-4"
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {isCorrect ? (
                      <span className="text-green-500 flex items-center gap-1"><CheckCircle size={16} /> Jawaban Tepat!</span>
                    ) : (
                      <span className="text-red-500 flex items-center gap-1"><AlertCircle size={16} /> Jawaban Kurang Tepat!</span>
                    )}
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
                  >
                    {currentQuestion < activeQuiz.length - 1 ? 'Pertanyaan Berikutnya' : 'Selesaikan Kuis'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarhaenAcademy;
