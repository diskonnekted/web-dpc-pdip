import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Music, ChevronUp, ChevronDown, Send, X } from 'lucide-react';
import { useYouthModeStore } from '../../store/youthModeStore';

const DUMMY_VIDEOS = [
  {
    id: 1,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Gotong Royong di Era Digital',
    author: '@marhaen_muda',
    likes: 1240,
    comments: [
      { user: '@budi_pdi', text: 'Bener banget! Digitalisasi gotong royong mantap!' },
      { user: '@siti_muda', text: 'Bermanfaat sekali kontennya kak.' }
    ]
  },
  {
    id: 2,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Literasi Digital Anti Scam!',
    author: '@windy_tech',
    likes: 3450,
    comments: [
      { user: '@jokobnr', text: 'Penting nih buat emak-emak biar ga ketipu scam' },
      { user: '@lutfi_digital', text: 'Terima kasih edukasinya DPC!' }
    ]
  }
];

const MarhaenFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedList, setLikedList] = useState<number[]>([]);
  const [commentsData, setCommentsData] = useState(DUMMY_VIDEOS);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const { isYouthMode, addXp } = useYouthModeStore();

  const activeVideo = commentsData[currentIndex];
  const isLiked = likedList.includes(activeVideo.id);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0 && currentIndex < DUMMY_VIDEOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const nextVideo = () => {
    if (currentIndex < DUMMY_VIDEOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikedList(prev => prev.filter(id => id !== activeVideo.id));
      setCommentsData(prev => prev.map(v => v.id === activeVideo.id ? { ...v, likes: v.likes - 1 } : v));
    } else {
      setLikedList(prev => [...prev, activeVideo.id]);
      setCommentsData(prev => prev.map(v => v.id === activeVideo.id ? { ...v, likes: v.likes + 1 } : v));
      addXp(20);
      triggerToast('💎 Menonton & Menyukai Video: +20 XP!');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addXp(30);
    triggerToast('🔗 Link disalin! Share ke medsos: +30 XP!');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentsData(prev => prev.map(v => {
      if (v.id === activeVideo.id) {
        return {
          ...v,
          comments: [...v.comments, { user: '@kamu_kader', text: newComment }]
        };
      }
      return v;
    }));

    setNewComment('');
    addXp(15);
    triggerToast('💬 Berkomentar konstruktif: +15 XP!');
  };

  return (
    <div className={`h-[calc(100vh-80px)] w-full flex justify-center bg-black overflow-hidden ${isYouthMode ? '' : 'bg-gray-100'}`} onWheel={handleScroll}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 z-50 bg-gradient-to-r from-brand-red to-orange-500 text-white font-bold px-6 py-3 rounded-full shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-md h-full bg-black">
        {/* Navigation Buttons for convenience */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
          <button 
            onClick={prevVideo}
            disabled={currentIndex === 0}
            className="p-2 bg-zinc-800/80 hover:bg-brand-red text-white rounded-full disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronUp size={24} />
          </button>
          <button 
            onClick={nextVideo}
            disabled={currentIndex === DUMMY_VIDEOS.length - 1}
            className="p-2 bg-zinc-800/80 hover:bg-brand-red text-white rounded-full disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronDown size={24} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full h-full relative"
          >
            {/* Video Player */}
            <video 
              src={activeVideo.url}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Overlay UI */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
            
            {/* Right Sidebar Actions */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center pointer-events-auto text-white z-30">
              <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
                <div className={`p-3 rounded-full transition-colors ${isLiked ? 'bg-brand-red text-white shadow-lg' : 'bg-zinc-800/50 group-hover:bg-brand-red'}`}>
                  <Heart fill={isLiked ? "white" : "none"} />
                </div>
                <span className="text-xs font-bold">{activeVideo.likes}</span>
              </button>

              <button onClick={() => setIsCommentOpen(true)} className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-zinc-800/50 rounded-full group-hover:bg-gray-600 transition-colors">
                  <MessageCircle />
                </div>
                <span className="text-xs font-bold">{activeVideo.comments.length}</span>
              </button>

              <button onClick={handleShare} className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-zinc-800/50 rounded-full group-hover:bg-gray-600 transition-colors">
                  <Share2 />
                </div>
                <span className="text-xs font-bold">Share</span>
              </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-16 right-16 pointer-events-auto text-white z-30">
              <h3 className="font-bold text-lg mb-1">{activeVideo.author}</h3>
              <p className="text-sm mb-3">{activeVideo.title}</p>
              <div className="flex items-center gap-2 text-sm bg-black/40 w-max px-3 py-1 rounded-full">
                <Music size={14} className="animate-spin-slow" />
                <span>Original Audio - Marhaenistik</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comment Modal / Drawer */}
        <AnimatePresence>
          {isCommentOpen && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-0 bg-zinc-900 text-white rounded-t-2xl z-50 flex flex-col max-h-[70%] border-t border-zinc-800"
            >
              <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800">
                <h3 className="font-bold">Komentar</h3>
                <button onClick={() => setIsCommentOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeVideo.comments.map((c, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xs text-brand-red font-bold">{c.user}</span>
                    <p className="text-sm text-gray-200 mt-0.5">{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="p-4 border-t border-zinc-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Tulis pendapatmu..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
                />
                <button type="submit" className="p-2 bg-brand-red rounded-lg text-white hover:bg-red-700">
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarhaenFeed;
