
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Lock } from 'lucide-react';
import { useYouthModeStore } from '../../store/youthModeStore';

const MarhaenAcademy = () => {
  const { isYouthMode } = useYouthModeStore();

  const courses = [
    { id: 1, title: 'Marhaen 101', duration: '5 min', xp: 200, locked: false, progress: 100 },
    { id: 2, title: 'Digital Activist', duration: '10 min', xp: 500, locked: false, progress: 30 },
    { id: 3, title: 'Community Organizer', duration: '15 min', xp: 800, locked: true, progress: 0 },
    { id: 4, title: 'Policy Maker Muda', duration: '20 min', xp: 1000, locked: true, progress: 0 }
  ];

  return (
    <div className={`container mx-auto px-4 py-12 max-w-4xl min-h-[80vh] ${isYouthMode ? 'text-white' : 'text-brand-dark'}`}>
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
    </div>
  );
};

export default MarhaenAcademy;
