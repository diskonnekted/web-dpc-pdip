import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, CheckCircle2, Plus } from 'lucide-react';

const Home = () => {
  // Simple countdown logic for the Event section
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 10, minutes: 24, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-start bg-brand-dark text-white pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"></div>
        <img 
          src="/3.jpg" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        />

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              BANGKIT BERGERAK <br/><span className="text-brand-red">BERSAMA RAKYAT</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-2xl"
            >
              Kota yang penuh semangat, ambil kesempatan Anda untuk maju bersama kami mewujudkan keadilan sosial.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a href="/gabung" className="bg-brand-red hover:bg-red-800 text-white font-bold py-4 px-8 text-lg rounded-sm transition-colors inline-flex items-center">
                Gabung Kampanye <ArrowRight className="ml-2" size={20} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Overlapping Feature Cards (Hidden as requested)
      <section className="relative z-30 -mt-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Siaga Darurat & Keamanan", icon: <Shield size={32} />, desc: "Memastikan perlindungan bagi setiap warga." },
              { title: "Peta Interaktif & Wilayah", icon: <Map size={32} />, desc: "Pemetaan daerah pemilihan terpadu." },
              { title: "Hak Sipil & Kebebasan", icon: <Users size={32} />, desc: "Menjamin hak konstitusional rakyat." },
              { title: "Transparansi Dokumen Publik", icon: <FileText size={32} />, desc: "Keterbukaan informasi pemerintahan." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 shadow-xl border-b-4 border-brand-red hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
              >
                <div className="text-brand-red mb-6 group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-brand-dark group-hover:text-brand-red transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* 3. About Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-red translate-x-4 -translate-y-4 rounded-sm z-0"></div>
                <img src="/media/banteng-banjarnegara-mulai-panaskan-mesin-partai-00969umqUf.jpg" alt="About" className="relative z-10 w-full rounded-sm shadow-2xl border-l-8 border-brand-red" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-brand-red font-bold tracking-widest uppercase mb-2 block">Tentang Kami</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 leading-tight">Membangun Masa Depan Bersama Rakyat</h2>
              <p className="text-gray-600 mb-8 text-lg">
                PDI Perjuangan DPC Banjarnegara berdedikasi untuk melayani masyarakat. Kami percaya pada kekuatan gotong royong dan tindakan politik nyata untuk memecahkan masalah mendasar di masyarakat.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-brand-red mt-1 flex-shrink-0" size={20} />
                  <span className="font-bold text-gray-800">Komite Aksi Politik Rakyat</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-brand-red mt-1 flex-shrink-0" size={20} />
                  <span className="font-bold text-gray-800">Advokasi Kebijakan Publik</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-brand-red mt-1 flex-shrink-0" size={20} />
                  <span className="font-bold text-gray-800">Pemberdayaan Ekonomi Lokal</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-brand-red mt-1 flex-shrink-0" size={20} />
                  <span className="font-bold text-gray-800">Pelayanan Kesehatan Gratis</span>
                </div>
              </div>

              <a href="/profil" className="inline-flex items-center text-brand-dark font-bold hover:text-brand-red transition-colors uppercase tracking-wider">
                Lebih Lanjut Tentang Kami <ArrowRight className="ml-2" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Event & Countdown Section */}
      <section className="bg-brand-dark text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current text-white"><polygon points="0,100 100,0 100,100"/></svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <span className="text-brand-red font-bold uppercase tracking-widest block mb-3 flex items-center"><Calendar size={18} className="mr-2" /> Agenda Terdekat</span>
            <h3 className="text-3xl font-bold mb-2">21 Mei 2026, 10:00 WIB</h3>
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase text-brand-red drop-shadow-md">Rapat Kerja Cabang Khusus</h2>
            <p className="text-xl text-gray-300">Banjarnegara, Jawa Tengah</p>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end gap-4 md:gap-6 text-center">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md flex items-center justify-center text-3xl md:text-5xl font-black mb-2 shadow-lg">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <span className="uppercase tracking-wider text-xs md:text-sm text-gray-300 font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Focus Areas / Programs */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <span className="text-brand-red font-bold tracking-widest uppercase mb-2 block">Program Kerja</span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-16">Kerja Nyata Untuk <span className="text-brand-red">Rakyat</span></h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Kerja Komunitas Pendorong Perubahan", img: "/media/84165_pdip-cegah-stunting.jpeg" },
              { title: "Pendidikan & Akses Sekolah", img: "/media/apel-siaga-dpc-pdip-banjarnegara-jawa-tengah-sabtu-2762020_169.jpeg" },
              { title: "Pelayanan Publik & Reformasi", img: "/media/banteng-banjarnegara-mulai-panaskan-mesin-partai-00969umqUf.jpg" },
              { title: "Keadilan Sistem Hukum Kita", img: "/media/84165_pdip-cegah-stunting.jpeg" },
            ].map((program, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden rounded-sm mb-6 shadow-md relative h-64">
                  <img src={program.img} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-red/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Plus size={40} className="text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-brand-dark group-hover:text-brand-red transition-colors leading-tight">{program.title}</h3>
                <p className="text-gray-500 mt-3 text-sm line-clamp-3">Sed ut perspiciatis unde omnis iste natus ut perspiciatis unde omnis iste perspiciatis ut perspiciatis unde.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <span className="text-brand-red font-bold tracking-widest uppercase mb-2 block">Tanya Jawab</span>
              <h2 className="text-4xl font-black text-brand-dark mb-6">Pertanyaan <br/>Yang Sering <span className="text-brand-red">Diajukan</span></h2>
              <p className="text-gray-600 mb-8">
                Punya pertanyaan lain terkait keanggotaan atau program partai? Jangan ragu untuk menghubungi sekretariat DPC kami.
              </p>
              <a href="/kontak" className="bg-brand-dark hover:bg-black text-white font-bold py-3 px-8 rounded-sm transition-colors inline-block uppercase tracking-wider text-sm">
                Hubungi Kami
              </a>
            </div>
            
            <div className="lg:w-2/3">
              <div className="space-y-4">
                {[
                  { q: "Bagaimana cara menjadi relawan partai?", a: "PDI Perjuangan terbuka bagi siapapun yang ingin berjuang bersama. Anda dapat mendaftar langsung ke kantor DPC terdekat atau melalui portal pendaftaran kader online kami." },
                  { q: "Apakah saya harus hadir secara fisik saat rapat partai?", a: "Kehadiran fisik sangat diapresiasi untuk memperkuat rasa gotong royong, namun beberapa kegiatan juga kami selenggarakan secara hybrid (online dan offline)." },
                  { q: "Apa program prioritas DPC Banjarnegara saat ini?", a: "Fokus utama kami adalah pemberdayaan ekonomi UMKM, perbaikan akses pendidikan dasar, dan layanan kesehatan gratis melalui posko-posko partai di tingkat kecamatan." },
                  { q: "Bagaimana cara mengajukan aspirasi warga?", a: "Aspirasi dapat disampaikan melalui perwakilan Fraksi PDIP di DPRD, pengurus Ranting, atau secara langsung melalui kotak aduan di website ini." }
                ].map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-sm overflow-hidden">
                    <button 
                      className={`w-full text-left px-6 py-4 font-bold text-lg flex justify-between items-center transition-colors ${activeFaq === i ? 'bg-brand-red text-white' : 'bg-gray-50 text-brand-dark hover:bg-gray-100'}`}
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    >
                      {faq.q}
                      <span className={`transform transition-transform ${activeFaq === i ? 'rotate-45' : ''}`}><Plus size={20} /></span>
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 text-gray-600 bg-white">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Blog / Latest News Grid (Similar to theme's bottom section) */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-brand-red font-bold tracking-widest uppercase mb-2 block">Pembaruan Terbaru</span>
              <h2 className="text-4xl font-black text-brand-dark">Pelajaran inspiratif <br/>untuk <span className="text-brand-red">pemimpin masa depan</span></h2>
            </div>
            <a href="/kabar" className="hidden md:inline-flex bg-white border-2 border-brand-red text-brand-red font-bold hover:bg-brand-red hover:text-white transition-colors px-6 py-3 rounded-sm uppercase tracking-wider text-sm items-center">
              Lihat Semua Artikel
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Suara yang dibungkam: mengungkap kisah keberanian yang terlupakan.", img: "/media/banteng-banjarnegara-mulai-panaskan-mesin-partai-00969umqUf.jpg" },
              { title: "Dari protes menuju kebijakan: transformasi politik yang nyata.", img: "/media/apel-siaga-dpc-pdip-banjarnegara-jawa-tengah-sabtu-2762020_169.jpeg" },
              { title: "Bagaimana pertemuan publik membangun kepercayaan masyarakat.", img: "/media/84165_pdip-cegah-stunting.jpeg" },
            ].map((blog, i) => (
              <div key={i} className="bg-white rounded-sm overflow-hidden shadow-lg group">
                <div className="relative h-56 overflow-hidden">
                  <img src={blog.img} alt="Blog" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-brand-red text-white text-center py-1 px-3 rounded-sm shadow-md">
                    <span className="block text-xl font-black leading-none">10</span>
                    <span className="block text-xs uppercase">Sep</span>
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">
                    <span className="text-brand-red mr-2">Oleh Admin</span>
                  </div>
                  <h3 className="font-bold text-xl text-brand-dark group-hover:text-brand-red transition-colors leading-tight mb-4">
                    <a href="#">{blog.title}</a>
                  </h3>
                  <a href="#" className="text-brand-dark font-bold hover:text-brand-red transition-colors inline-flex items-center text-sm uppercase tracking-widest border-b-2 border-brand-red pb-1">
                    Selengkapnya
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <a href="/kabar" className="inline-flex bg-white border-2 border-brand-red text-brand-red font-bold hover:bg-brand-red hover:text-white transition-colors px-6 py-3 rounded-sm uppercase tracking-wider text-sm items-center">
              Lihat Semua Artikel
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
