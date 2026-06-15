import { motion } from 'framer-motion';
import { Shield, Info, Palette, Eye, Award, RefreshCw, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Lambang = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header Banner */}
      <section className="relative h-[45vh] flex items-center justify-center bg-brand-dark text-white pt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>
        <img 
          src="/hero.jpg" 
          alt="Banner Lambang" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-35"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-brand-red/10 border border-brand-red/30 px-4 py-1.5 rounded-full text-brand-aqua mb-4"
          >
            <Shield size={14} className="fill-brand-aqua/20" />
            <span className="text-xs font-bold uppercase tracking-wider">Identitas Resmi Partai</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight"
          >
            Lambang & Bendera
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-300 font-light"
          >
            Makna filosofis mendalam di balik identitas perjuangan banteng moncong putih.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Identity Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Logo Container */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative group">
                <div className="absolute -inset-6 bg-brand-red/10 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center bg-zinc-50 border border-zinc-150 rounded-full p-8 shadow-xl">
                  <motion.img 
                    src="/logopdip.png" 
                    alt="Logo PDI Perjuangan" 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-4/5 h-auto object-contain drop-shadow-[0_15px_30px_rgba(212,31,38,0.25)]" 
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-7">
              <div className="flex items-center space-x-2 mb-4">
                <span className="h-[2px] w-8 bg-brand-gold"></span>
                <span className="text-brand-red font-bold text-xs uppercase tracking-wider">Identitas Visual</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 uppercase leading-tight">
                Banteng Moncong Putih
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Lambang PDI Perjuangan berupa gambar <strong className="text-brand-dark">banteng hitam bermoncong putih</strong> dengan latar merah di dalam lingkaran bergaris hitam dan putih.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Setiap goresan visual melambangkan jiwa perjuangan yang suci, kokoh, dan berakar pada kepentingan rakyat marhaen. Ini bukan sekadar simbol estetika, melainkan panji kehormatan perjuangan membela wong cilik.
              </p>

              <div className="flex items-start p-5 bg-zinc-50 border border-zinc-200 rounded-2xl gap-4">
                <div className="text-brand-red mt-1">
                  <Info size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-lg mb-1">Simbol Kekuatan Kolektif</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Banteng dikenal sebagai hewan sosial yang hidup rukun bergotong royong, namun memiliki keberanian luar biasa pantang menyerah untuk membela koloninya jika diserang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Makna Filosofis Section */}
      <section className="py-20 bg-zinc-50 border-t border-b border-zinc-200/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-brand-red font-bold tracking-widest uppercase mb-2 block text-xs">Makna Filosofis</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark uppercase">Detail Komponen Lambang</h2>
            <div className="w-24 h-1 bg-brand-red mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Dasar Merah", 
                icon: <Palette size={24} />, 
                desc: "Melambangkan keberanian mengambil risiko dalam memperjuangkan keadilan, kebenaran, dan hak-hak rakyat marhaen." 
              },
              { 
                title: "Mata Merah", 
                icon: <Eye size={24} />, 
                desc: "Melambangkan sikap selalu waspada, tajam, dan peka terhadap ancaman, tantangan, serta dinamika sosial bangsa." 
              },
              { 
                title: "Moncong Putih", 
                icon: <Award size={24} />, 
                desc: "Melambangkan kesucian hati, kebersihan niat, dapat dipercaya, dan tulus dalam berjuang tanpa pamrih." 
              },
              { 
                title: "Lingkaran Bulat", 
                icon: <RefreshCw size={24} />, 
                desc: "Melambangkan kebulatan tekad, persatuan yang kokoh tak terpatahkan, serta perjuangan berkelanjutan yang tiada henti." 
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-150 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 bg-brand-gold h-full group-hover:bg-brand-red transition-all"></div>
                <div className="w-12 h-12 bg-red-50 text-brand-red rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-red group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-red transition-colors">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Flag Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Flag View */}
            <div className="order-last lg:order-first flex justify-center">
              <div className="relative group max-w-md w-full">
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-red to-brand-gold rounded-2xl blur-xl opacity-25"></div>
                <img 
                  src="/bendera.png" 
                  alt="Bendera PDI Perjuangan" 
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl border-4 border-zinc-100 object-contain hover:scale-105 transition duration-500" 
                />
              </div>
            </div>

            {/* Flag Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Flag size={20} className="text-brand-red" />
                <span className="text-brand-red font-bold text-xs uppercase tracking-wider">Panji Kehormatan</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 uppercase leading-tight">
                Bendera Kebesaran Partai
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Bendera PDI Perjuangan adalah simbol kehormatan tertinggi organisasi yang harus dijaga, dirawat, dan dijunjung tinggi oleh seluruh kader juang.
              </p>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center shrink-0">
                    <span className="font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-dark text-lg">Komposisi Standar</h5>
                    <p className="text-gray-500 text-sm">Bendera berwarna dasar merah terang dengan lambang Banteng Moncong Putih presisi berada di tengahnya.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center shrink-0">
                    <span className="font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-dark text-lg">Penggunaan & Pengibaran</h5>
                    <p className="text-gray-500 text-sm">Dikibarkan secara resmi dalam rapat kerja partai, upacara kenegaraan, serta momentum kampanye konsolidasi rakyat.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-20 text-center bg-gradient-pdi text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase">Pahami, Resapi, dan Amalkan</h3>
          <p className="mb-8 opacity-85 text-lg max-w-2xl mx-auto">Identitas ini bukan sekadar gambar, melainkan ikrar suci perjuangan untuk kejayaan Indonesia Raya.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/profil" 
              className="bg-white text-brand-red hover:bg-zinc-100 font-bold py-3.5 px-8 rounded-full shadow-lg transition-all text-sm uppercase tracking-wider inline-flex items-center gap-2"
            >
              Lihat Visi & Misi
            </Link>
            <Link 
              to="/gabung" 
              className="border-2 border-white hover:bg-white hover:text-brand-red text-white font-bold py-3 px-8 rounded-full transition-all text-sm uppercase tracking-wider inline-flex items-center gap-2"
            >
              Gabung SIJUANG
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lambang;
