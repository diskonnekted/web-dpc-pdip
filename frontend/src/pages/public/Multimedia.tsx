import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Play } from 'lucide-react';

interface MultimediaItem {
  id: number;
  platform: string;
  title: string;
  embedCode: string;
  order: number;
  isActive: boolean;
}

const Multimedia = () => {
  const [items, setItems] = useState<MultimediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/multimedia');
        const data = await res.json();
        setItems(data.filter((item: MultimediaItem) => item.isActive));
      } catch (error) {
        console.error("Failed to fetch multimedia", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const youtubeItems = items.filter(i => i.platform === 'YOUTUBE');
  const instagramItems = items.filter(i => i.platform === 'INSTAGRAM');
  const tiktokItems = items.filter(i => i.platform === 'TIKTOK');

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <section className="relative h-[40vh] flex items-center justify-center bg-brand-dark text-white pt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>
        <img 
          src="/media/apel-siaga-dpc-pdip-banjarnegara-jawa-tengah-sabtu-2762020_169.jpeg" 
          alt="Multimedia PDI Perjuangan" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        />
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 uppercase"
          >
            Galeri <span className="text-brand-red">Multimedia</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 font-light max-w-2xl mx-auto"
          >
            Saksikan berbagai dokumentasi kegiatan, pidato politik, dan pergerakan DPC PDI Perjuangan Banjarnegara di berbagai platform digital kami.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 mt-16 space-y-24">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Memuat Galeri Multimedia...</div>
        ) : (
          <>
            {/* YouTube Section */}
            {youtubeItems.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-8 border-b border-gray-200 pb-4">
                  <div className="bg-red-600 p-3 rounded-lg text-white">
                    <Video size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-brand-dark uppercase">Kanal YouTube</h2>
                    <p className="text-gray-500 text-sm">Video dokumentasi dan orasi politik terbaru</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {youtubeItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex flex-col">
                      <div className="aspect-w-16 aspect-h-9 w-full h-[300px] md:h-[400px]" dangerouslySetInnerHTML={{ __html: item.embedCode }}></div>
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <h3 className="font-bold text-lg text-brand-dark">{item.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Instagram Section */}
            {instagramItems.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-8 border-b border-gray-200 pb-4">
                  <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-3 rounded-lg text-white">
                    <Camera size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-brand-dark uppercase">Instagram</h2>
                    <p className="text-gray-500 text-sm">Momen visual dan liputan kegiatan terkini</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {instagramItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex justify-center overflow-hidden">
                      <div dangerouslySetInnerHTML={{ __html: item.embedCode }}></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TikTok Section */}
            {tiktokItems.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-8 border-b border-gray-200 pb-4">
                  <div className="bg-black p-3 rounded-lg text-white">
                    <Play size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-brand-dark uppercase">TikTok</h2>
                    <p className="text-gray-500 text-sm">Konten edukasi politik dan keseharian kader</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tiktokItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex justify-center overflow-hidden">
                      <div dangerouslySetInnerHTML={{ __html: item.embedCode }}></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {items.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-500">Belum ada konten multimedia yang diterbitkan.</h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Multimedia;
