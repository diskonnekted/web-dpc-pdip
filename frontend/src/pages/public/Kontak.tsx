import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react';

const Kontak = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    phone: '',
    category: 'Aspirasi',
    content: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/aspirations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: formData.senderName,
          phone: formData.phone,
          category: formData.category,
          content: formData.content
        }),
      });

      if (!response.ok) throw new Error('Failed');
      
      setStatus('success');
      setFormData({ senderName: '', phone: '', category: 'Aspirasi', content: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative bg-brand-dark text-white pt-32 pb-40 text-center overflow-hidden">
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50/20 z-0"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-brand-aqua mb-4"
          >
            <Send size={14} className="text-brand-aqua" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Layanan Aspirasi</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-wider text-white"
          >
            Hubungi Kami
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-300 font-light max-w-2xl mx-auto"
          >
            Sampaikan aspirasi, saran, kritik, atau pertanyaan Anda. Suara Anda adalah nafas perjuangan kami.
          </motion.p>
        </div>
      </section>

      {/* 2. Main content overlap */}
      <div className="container mx-auto px-4 md:px-8 -mt-24 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Info Card + Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-150 shadow-lg hover:shadow-xl hover:border-brand-red/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-brand-dark mb-6 border-b pb-3 uppercase tracking-wide">
                Kantor Sekretariat
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-red-50 text-brand-red rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-dark text-sm uppercase tracking-wider">Alamat DPC</h5>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                      Jl. Letnan Karjono, Parakancanggah,<br />
                      Kec. Banjarnegara, Kab. Banjarnegara,<br />
                      Jawa Tengah 53412
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-red-50 text-brand-red rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-dark text-sm uppercase tracking-wider">Email Resmi</h5>
                    <p className="text-gray-500 text-sm mt-1">
                      <a href="mailto:sekretariat@pdip-banjarnegara.id" className="hover:text-brand-red transition-colors">
                        sekretariat@pdip-banjarnegara.id
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-red-50 text-brand-red rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-dark text-sm uppercase tracking-wider">Kontak Center</h5>
                    <p className="text-gray-500 text-sm mt-1">
                      (0286) 591234<br />
                      0812-3456-7890 (WhatsApp)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="w-full h-80 rounded-2xl overflow-hidden border-4 border-white shadow-lg shadow-black/5 relative">
              <iframe 
                src="https://maps.google.com/maps?q=-7.3909213069062,109.70636000185057&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Peta Kantor DPC PDIP Banjarnegara"
              ></iframe>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black text-brand-dark mb-2 uppercase">Kirim Pesan</h3>
                <p className="text-gray-500 text-sm mb-8">
                  Formulir ini terhubung langsung dengan admin DPC. Silakan isi data diri Anda dengan benar.
                </p>
                
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <CheckCircle size={72} className="text-green-500 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">Aspirasi Terkirim</h4>
                    <p className="text-gray-600 max-w-md mx-auto mb-8 text-sm">
                      Terima kasih atas partisipasi aktif Anda. Pesan Anda telah kami terima dan akan segera ditindaklanjuti oleh sekretariat DPC.
                    </p>
                    <button 
                      onClick={() => setStatus('idle')} 
                      className="px-6 py-2.5 bg-brand-red text-white rounded-full font-bold hover:bg-red-700 shadow-md transition-all text-sm uppercase tracking-wider"
                    >
                      Kirim Pesan Lain
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Nama Lengkap</label>
                        <input 
                          required 
                          type="text" 
                          name="senderName" 
                          value={formData.senderName} 
                          onChange={handleChange} 
                          className="w-full border-gray-200 rounded-xl p-3.5 bg-gray-50 border focus:bg-white focus:border-brand-red focus:ring-0 text-sm outline-none transition-all" 
                          placeholder="Masukkan nama lengkap" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">WhatsApp / Email</label>
                        <input 
                          required 
                          type="text" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          className="w-full border-gray-200 rounded-xl p-3.5 bg-gray-50 border focus:bg-white focus:border-brand-red focus:ring-0 text-sm outline-none transition-all" 
                          placeholder="No. WA atau email aktif" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Subjek Pesan</label>
                      <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        className="w-full border-gray-200 rounded-xl p-3.5 bg-gray-50 border focus:bg-white focus:border-brand-red focus:ring-0 text-sm outline-none transition-all"
                      >
                        <option value="Aspirasi">Aspirasi Rakyat</option>
                        <option value="Saran">Saran & Masukan</option>
                        <option value="Informasi">Permintaan Informasi</option>
                        <option value="Keanggotaan">Layanan Keanggotaan (KTA)</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Isi Pesan Anda</label>
                      <textarea 
                        required 
                        name="content" 
                        value={formData.content} 
                        onChange={handleChange} 
                        rows={5} 
                        className="w-full border-gray-200 rounded-xl p-3.5 bg-gray-50 border focus:bg-white focus:border-brand-red focus:ring-0 text-sm outline-none transition-all resize-none" 
                        placeholder="Tulis aspirasi atau pertanyaan Anda secara detail di sini..."
                      ></textarea>
                    </div>

                    {status === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-150 rounded-xl text-red-600 text-sm">
                        Gagal mengirim aspirasi. Silakan periksa koneksi atau coba kembali setelah beberapa saat.
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === 'loading'} 
                      className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-full uppercase tracking-widest text-sm shadow-md shadow-brand-red/10 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 inline-flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? 'Sedang Mengirim...' : (
                        <>
                          <Send size={16} />
                          <span>Kirim Aspirasi Sekarang</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. SIJUANG CTA Banner */}
      <section className="mt-24 text-center py-12 bg-white border-t border-b border-gray-200/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h4 className="text-2xl font-bold mb-3 text-brand-dark uppercase">Ingin Terlibat Langsung?</h4>
          <p className="text-gray-500 mb-6 text-sm">Bergabunglah menjadi anggota resmi DPC PDI Perjuangan Banjarnegara dan berkontribusi nyata.</p>
          <a 
            href="/gabung" 
            className="inline-flex items-center gap-2 border-2 border-brand-red hover:bg-brand-red hover:text-white text-brand-red font-bold py-3 px-8 rounded-full transition-all text-sm uppercase tracking-wider"
          >
            Daftar Anggota (SIJUANG)
          </a>
        </div>
      </section>
    </div>
  );
};

export default Kontak;
