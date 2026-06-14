import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertTriangle, Info, Lightbulb, CheckCircle } from 'lucide-react';

const Aspirasi = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    phone: '',
    category: 'Keluhan',
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed');
      
      setStatus('success');
      setFormData({ senderName: '', phone: '', category: 'Keluhan', content: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      <section className="bg-brand-dark text-white py-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <MessageSquare size={48} className="mx-auto text-brand-red mb-4" />
          <h1 className="text-4xl font-black mb-4 uppercase tracking-wider">Layanan Aspirasi <br/>& Pengaduan</h1>
          <p className="text-gray-300">Sampaikan keluhan, kritik, saran, maupun informasi penting kepada DPC PDIP Banjarnegara. Suara Anda adalah nafas perjuangan kami.</p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 md:px-8 mt-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start space-x-4 border-l-4 border-red-500">
              <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Keluhan / Aduan</h3>
                <p className="text-sm text-gray-500 mt-1">Sampaikan keluhan terkait pelayanan publik, infrastruktur rusak, atau masalah sosial lainnya di lingkungan Anda.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start space-x-4 border-l-4 border-yellow-500">
              <Lightbulb className="text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Saran & Masukan</h3>
                <p className="text-sm text-gray-500 mt-1">Berikan ide atau gagasan yang membangun untuk kemajuan program partai dan kesejahteraan rakyat.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start space-x-4 border-l-4 border-blue-500">
              <Info className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Informasi Publik</h3>
                <p className="text-sm text-gray-500 mt-1">Sampaikan informasi penting mengenai potensi desa atau hal-hal yang perlu menjadi perhatian bersama.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-brand-dark mb-6 border-b pb-4">Tulis Pesan Anda</h2>
              
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Pesan Berhasil Terkirim</h3>
                  <p className="text-gray-600 mb-6">Terima kasih atas partisipasi Anda. Laporan Anda telah kami terima dan akan segera ditindaklanjuti.</p>
                  <button onClick={() => setStatus('idle')} className="px-6 py-2 bg-brand-red text-white rounded font-bold hover:bg-red-700">Kirim Laporan Lain</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap / Inisial</label>
                      <input required type="text" name="senderName" value={formData.senderName} onChange={handleChange} className="w-full border-gray-300 rounded-md p-3 bg-gray-50 border focus:border-brand-red focus:ring-0" placeholder="Boleh dirahasiakan" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Kontak (HP/WA)</label>
                      <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-gray-300 rounded-md p-3 bg-gray-50 border focus:border-brand-red focus:ring-0" placeholder="Untuk konfirmasi lebih lanjut" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori Laporan</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full border-gray-300 rounded-md p-3 bg-gray-50 border focus:border-brand-red focus:ring-0">
                      <option value="Keluhan">Keluhan / Aduan</option>
                      <option value="Saran">Saran / Masukan</option>
                      <option value="Informasi">Informasi / Potensi Wilayah</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Pesan / Uraian</label>
                    <textarea required name="content" value={formData.content} onChange={handleChange} rows={6} className="w-full border-gray-300 rounded-md p-3 bg-gray-50 border focus:border-brand-red focus:ring-0" placeholder="Ceritakan secara detail keluhan atau saran Anda di sini..."></textarea>
                  </div>

                  {status === 'error' && <p className="text-red-500 text-sm">Gagal mengirim pesan. Coba lagi nanti.</p>}

                  <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-md uppercase tracking-widest transition-colors disabled:opacity-50">
                    {status === 'loading' ? 'Memproses...' : 'Kirim Aspirasi Sekarang'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aspirasi;
