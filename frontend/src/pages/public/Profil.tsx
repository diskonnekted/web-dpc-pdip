import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Target, Clock } from 'lucide-react';

const Profil = () => {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="relative h-[60vh] flex items-center justify-center bg-brand-dark text-white pt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>
        <img 
          src="/3.jpg" 
          alt="Profil PDI Perjuangan" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-red font-bold tracking-widest uppercase mb-4 block"
          >
            Profil Partai
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-6 uppercase"
          >
            Mengenal Lebih Dekat
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 font-light"
          >
            Sejarah, Visi, Misi, dan Perjuangan DPC PDI Perjuangan Banjarnegara.
          </motion.p>
        </div>
      </section>

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

    </div>
  );
};

export default Profil;
