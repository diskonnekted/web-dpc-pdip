import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Award, Users, Target, Clock, BookOpen, Download, Shield, Compass, Scale, Landmark } from 'lucide-react';

const Profil = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'tentang' | 'adart'>('tentang');

  useEffect(() => {
    if (location.pathname === '/profil-ad-art' || searchParams.get('tab') === 'adart') {
      setActiveTab('adart');
    } else {
      setActiveTab('tentang');
    }
  }, [location.pathname, searchParams]);

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="relative h-[50vh] flex items-center justify-center bg-brand-dark text-white pt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>
        <img 
          src="/3.jpg" 
          alt="Profil PDI Perjuangan" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mt-8">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold font-bold tracking-widest uppercase mb-4 block text-sm"
          >
            Profil Resmi Partai
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 uppercase"
          >
            {activeTab === 'tentang' ? 'Mengenal Lebih Dekat' : 'AD / ART PARTAI'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-300 font-light"
          >
            {activeTab === 'tentang' 
              ? 'Sejarah, Visi, Misi, dan Perjuangan DPC PDI Perjuangan Banjarnegara.' 
              : 'Anggaran Dasar & Anggaran Rumah Tangga PDI Perjuangan sebagai konstitusi tertinggi organisasi.'}
          </motion.p>
        </div>
      </section>

      {/* Tab Switcher */}
      <div className="bg-zinc-50 border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 flex justify-center">
          <div className="flex space-x-8">
            <button 
              onClick={() => setActiveTab('tentang')}
              className={`py-4 px-6 font-bold text-sm uppercase tracking-wider border-b-2 transition-all flex items-center space-x-2 ${
                activeTab === 'tentang' 
                  ? 'border-brand-red text-brand-red scale-105' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={16} />
              <span>Tentang Kami & Sejarah</span>
            </button>
            <button 
              onClick={() => setActiveTab('adart')}
              className={`py-4 px-6 font-bold text-sm uppercase tracking-wider border-b-2 transition-all flex items-center space-x-2 ${
                activeTab === 'adart' 
                  ? 'border-brand-red text-brand-red scale-105' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Scale size={16} />
              <span>Konstitusi AD / ART</span>
            </button>
            <Link 
              to="/profil-lambang"
              className="py-4 px-6 font-bold text-sm uppercase tracking-wider border-b-2 border-transparent text-gray-500 hover:text-brand-red transition-all flex items-center space-x-2"
            >
              <Shield size={16} />
              <span>Lambang & Bendera</span>
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'tentang' ? (
          <motion.div
            key="tentang"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sejarah Section */}
            <section className="py-20">
              <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-16">
                  <div className="md:w-1/2">
                    <h2 className="text-4xl font-black text-brand-dark mb-6 uppercase leading-tight">Sejarah Perjuangan <br/><span className="text-brand-red">Partai</span></h2>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      Partai Demokrasi Indonesia Perjuangan (PDI-P) lahir dari fusi beberapa partai politik dan melewati dinamika sejarah yang panjang demi mempertahankan ideologi Pancasila dan ajaran Bung Karno.
                    </p>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                      Di tingkat daerah, DPC PDI Perjuangan Banjarnegara terus mengobarkan semangat gotong royong dan marhaenisme, berdiri di garis depan dalam memperjuangkan hak-hak rakyat kecil (wong cilik) di wilayah Banjarnegara.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mt-10 border-t border-gray-100 pt-10">
                      <div className="flex items-start space-x-4">
                        <div className="bg-red-50 text-brand-red p-3 rounded-lg"><Clock size={24} /></div>
                        <div>
                          <h4 className="font-bold text-xl text-brand-dark">1999</h4>
                          <p className="text-sm text-gray-500">Tahun Deklarasi PDI Perjuangan</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="bg-red-50 text-brand-red p-3 rounded-lg"><Users size={24} /></div>
                        <div>
                          <h4 className="font-bold text-xl text-brand-dark">Jutaan</h4>
                          <p className="text-sm text-gray-500">Kader & Simpatisan Aktif</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 relative">
                    <div className="absolute inset-0 bg-brand-red translate-x-4 translate-y-4 rounded-sm z-0"></div>
                    <img src="/media/apel-siaga-dpc-pdip-banjarnegara-jawa-tengah-sabtu-2762020_169.jpeg" alt="Sejarah" className="relative z-10 w-full h-full object-cover rounded-sm shadow-xl" />
                  </div>
                </div>
              </div>
            </section>

            {/* Visi Misi Section */}
            <section className="py-20 bg-gray-50 border-t border-gray-200">
              <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <span className="text-brand-red font-bold tracking-widest uppercase mb-2 block">Landasan Gerak</span>
                  <h2 className="text-4xl font-black text-brand-dark uppercase">Visi & Misi</h2>
                  <div className="w-24 h-1 bg-brand-red mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-white p-10 rounded-sm shadow-xl border-t-4 border-brand-red">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="bg-red-50 text-brand-red p-4 rounded-full"><Target size={32} /></div>
                      <h3 className="text-3xl font-black text-brand-dark uppercase">Visi</h3>
                    </div>
                    <p className="text-xl text-gray-600 leading-relaxed italic font-light">
                      "Menjadi partai politik pelopor yang solid, kuat, dan mengakar di tengah rakyat untuk mewujudkan Indonesia yang berdaulat di bidang politik, berdikari di bidang ekonomi, dan berkepribadian dalam kebudayaan."
                    </p>
                  </div>

                  <div className="bg-white p-10 rounded-sm shadow-xl border-t-4 border-gray-800">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="bg-gray-100 text-gray-800 p-4 rounded-full"><Award size={32} /></div>
                      <h3 className="text-3xl font-black text-brand-dark uppercase">Misi</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Mempertahankan dan mewujudkan cita-cita proklamasi 17 Agustus 1945.",
                        "Menjaga keutuhan Negara Kesatuan Republik Indonesia (NKRI) berlandaskan Pancasila.",
                        "Membangun tatanan kehidupan bermasyarakat yang berkeadilan sosial.",
                        "Mengembangkan pemberdayaan ekonomi kerakyatan (Marhaenisme).",
                        "Mencetak kader-kader pemimpin bangsa yang berintegritas dan melayani rakyat."
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle2 className="text-brand-red shrink-0 mt-1" size={20} />
                          <span className="text-gray-600 text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="adart"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Fondasi Organisasi Section */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4 md:px-8">
                <div className="row justify-center mb-16 text-center">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl md:text-5xl font-black mb-6 text-brand-dark uppercase">Fondasi Konstitusi Organisasi</h3>
                    <div className="relative p-8 md:p-12 rounded-2xl bg-zinc-50 border border-zinc-200 mt-8 shadow-inner">
                      <span className="absolute top-2 left-6 text-brand-red/10 text-8xl font-serif select-none">“</span>
                      <p className="text-xl md:text-2xl font-medium fst-italic text-gray-700 mb-0 leading-relaxed italic relative z-10">
                        "Anggaran Dasar dan Anggaran Rumah Tangga PDI Perjuangan adalah konstitusi Partai yang harus dipatuhi, dijalankan, dan diperjuangkan oleh seluruh kader Partai di semua tingkatan."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Document Download Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:border-brand-gold/30 hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col justify-between text-center">
                    <div>
                      <div className="w-20 h-20 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen size={40} />
                      </div>
                      <h4 className="text-2xl font-bold mb-3 text-brand-dark">AD / ART PDI Perjuangan</h4>
                      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        Dokumen lengkap konstitusi Anggaran Dasar & Anggaran Rumah Tangga hasil keputusan Kongres V PDI Perjuangan di Bali.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <a 
                        href="https://pdippurbalingga.or.id/assets/docs/AD-ART-PDIP.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-gradient-pdi hover:brightness-110 text-white font-bold py-3.5 px-6 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-brand-red/20 transition-all"
                      >
                        <Download size={18} />
                        Download Dokumen PDF
                      </a>
                      <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                        <Landmark size={12} className="text-brand-gold" />
                        Versi Resmi Kongres V • PDF (2.5 MB)
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:border-brand-gold/30 hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col justify-between text-center">
                    <div>
                      <div className="w-20 h-20 bg-zinc-50 text-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield size={40} />
                      </div>
                      <h4 className="text-2xl font-bold mb-3 text-brand-dark">Buku Saku Panduan Kader</h4>
                      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        Ringkasan dan panduan praktis penegakan disiplin organisasi dan implementasi aturan AD/ART dalam keseharian kader.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <a 
                        href="#" 
                        className="w-full border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-bold py-3 px-6 rounded-full inline-flex items-center justify-center gap-2 transition-all"
                      >
                        <Download size={18} />
                        Download Ringkasan
                      </a>
                      <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                        <Landmark size={12} className="text-brand-gold" />
                        Panduan Ringkas • PDF (1.2 MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Fungsi Utama AD/ART */}
            <section className="py-20 bg-zinc-50 border-t border-gray-200">
              <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <span className="text-brand-red font-bold tracking-widest uppercase mb-2 block">Aturan Disiplin</span>
                  <h2 className="text-3xl md:text-5xl font-black text-brand-dark uppercase">Fungsi Utama AD / ART</h2>
                  <div className="w-24 h-1 bg-brand-red mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 bg-brand-gold h-full"></div>
                    <div className="w-12 h-12 bg-yellow-50 text-brand-gold-dark rounded-xl flex items-center justify-center mb-6">
                      <Compass size={24} />
                    </div>
                    <h5 className="text-xl font-bold text-brand-dark mb-3">Landasan Gerak</h5>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Sebagai pedoman arah perjuangan partai agar tetap tegak lurus pada ideologi Pancasila dan ajaran Bung Karno dalam menyejahterakan rakyat.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 bg-brand-gold h-full"></div>
                    <div className="w-12 h-12 bg-yellow-50 text-brand-gold-dark rounded-xl flex items-center justify-center mb-6">
                      <Scale size={24} />
                    </div>
                    <h5 className="text-xl font-bold text-brand-dark mb-3">Aturan Main Organisasi</h5>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Mengatur mekanisme pengambilan keputusan di berbagai level struktural, hak & kewajiban anggota, serta sanksi disiplin partai.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 bg-brand-gold h-full"></div>
                    <div className="w-12 h-12 bg-yellow-50 text-brand-gold-dark rounded-xl flex items-center justify-center mb-6">
                      <Shield size={24} />
                    </div>
                    <h5 className="text-xl font-bold text-brand-dark mb-3">Penyelesaian Perselisihan</h5>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Menjadi rujukan konstitusional tertinggi untuk menuntaskan berbagai dinamika internal partai secara terhormat dan adil.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Konstitusi */}
            <section className="py-20 text-center bg-gradient-pdi text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 z-0"></div>
              <div className="container mx-auto px-4 md:px-8 relative z-10">
                <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase">Jadilah Kader yang Taat Konstitusi</h3>
                <p className="mb-8 opacity-80 text-lg max-w-2xl mx-auto">Pahami aturan partai, perkuat barisan, dan menangkan hati rakyat dengan gotong royong.</p>
                <Link 
                  to="/gabung" 
                  className="bg-white text-brand-red hover:bg-zinc-100 font-bold py-3.5 px-8 rounded-full shadow-lg transition-all text-sm uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Daftar Anggota SIJUANG
                </Link>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profil;
