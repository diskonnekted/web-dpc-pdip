import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Music } from 'lucide-react';
import { useYouthModeStore } from '../../store/youthModeStore';

const DUMMY_VIDEOS = [
  {
    id: 1,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Gotong Royong di Era Digital',
    author: '@marhaen_muda',
    likes: 1240,
    comments: 45
  },
  {
    id: 2,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Literasi Digital Anti Scam!',
    author: '@windy_tech',
    likes: 3450,
    comments: 120
  }
];

const MarhaenFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isYouthMode } = useYouthModeStore();

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0 && currentIndex < DUMMY_VIDEOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className={`h-[calc(100vh-80px)] w-full flex justify-center bg-black overflow-hidden ${isYouthMode ? '' : 'bg-gray-100'}`} onWheel={handleScroll}>
      <div className="relative w-full max-w-md h-full bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full h-full relative"
          >
            {/* Dummy Video Player */}
            <video 
              src={DUMMY_VIDEOS[currentIndex].url}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Overlay UI */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
            
            {/* Right Sidebar Actions */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center pointer-events-auto text-white">
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-zinc-800/50 rounded-full group-hover:bg-brand-red transition-colors">
                  <Heart fill="white" />
                </div>
                <span className="text-xs font-bold">{DUMMY_VIDEOS[currentIndex].likes}</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-zinc-800/50 rounded-full group-hover:bg-gray-600 transition-colors">
                  <MessageCircle />
                </div>
                <span className="text-xs font-bold">{DUMMY_VIDEOS[currentIndex].comments}</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-zinc-800/50 rounded-full group-hover:bg-gray-600 transition-colors">
                  <Share2 />
                </div>
                <span className="text-xs font-bold">Share</span>
              </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-4 right-16 pointer-events-auto text-white">
              <h3 className="font-bold text-lg mb-1">{DUMMY_VIDEOS[currentIndex].author}</h3>
              <p className="text-sm mb-3">{DUMMY_VIDEOS[currentIndex].title}</p>
              <div className="flex items-center gap-2 text-sm bg-black/40 w-max px-3 py-1 rounded-full">
                <Music size={14} className="animate-spin-slow" />
                <span>Original Audio - Marhaenistik</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarhaenFeed;
