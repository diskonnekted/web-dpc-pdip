import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CheckCircle, ShieldCheck } from 'lucide-react';

const Gabung = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nik: '',
    dob: '',
    address: '',
    phone: '',
    email: '',
    profession: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed');
      
      setStatus('success');
      setFormData({
        fullName: '', nik: '', dob: '', address: '', phone: '', email: '', profession: ''
      });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      <section className="relative h-[30vh] flex items-center justify-center bg-brand-dark text-white">
        <div className="absolute inset-0 bg-brand-red opacity-20 mix-blend-multiply"></div>
        <div className="relative z-20 text-center px-4 mt-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-2 uppercase tracking-tight"
          >
            Gabung <span className="text-brand-red">PDIP</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-xl mx-auto"
          >
            Mari berjuang bersama dalam satu barisan untuk mewujudkan Indonesia yang berdaulat, berdikari, dan berkepribadian.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 mt-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="bg-brand-red text-white p-8 md:w-1/3 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
              <UserPlus size={200} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4 uppercase">Keuntungan Menjadi Anggota</h2>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex gap-3"><ShieldCheck className="flex-shrink-0" /> Berkontribusi langsung pada kemajuan daerah dan bangsa.</li>
                <li className="flex gap-3"><ShieldCheck className="flex-shrink-0" /> Mengikuti pendidikan politik & kepemimpinan kader.</li>
                <li className="flex gap-3"><ShieldCheck className="flex-shrink-0" /> Memperluas jaringan dan gotong royong antar simpatisan.</li>
              </ul>
            </div>
            <div className="relative z-10 mt-8 text-sm opacity-80">
              Pastikan Anda memberikan data yang valid untuk verifikasi KTA (Kartu Tanda Anggota).
            </div>
          </div>

          <div className="p-8 md:w-2/3">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={64} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pendaftaran Berhasil!</h3>
                <p className="text-gray-600 mb-6">Terima kasih telah bergabung. Tim sekretariat kami akan meninjau data Anda dan menghubungi Anda untuk proses selanjutnya.</p>
                <button onClick={() => setStatus('idle')} className="px-6 py-2 bg-brand-red text-white rounded font-bold hover:bg-red-700">Daftar Lagi</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-brand-dark mb-4 border-b pb-2">Formulir Anggota Baru</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nama Lengkap (Sesuai KTP)</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border-gray-300 rounded p-2.5 bg-gray-50 border focus:border-brand-red focus:ring-0" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">NIK</label>
                    <input required type="text" name="nik" value={formData.nik} onChange={handleChange} maxLength={16} className="w-full border-gray-300 rounded p-2.5 bg-gray-50 border focus:border-brand-red focus:ring-0" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tanggal Lahir</label>
                    <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border-gray-300 rounded p-2.5 bg-gray-50 border focus:border-brand-red focus:ring-0" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pekerjaan/Profesi</label>
                    <input required type="text" name="profession" value={formData.profession} onChange={handleChange} className="w-full border-gray-300 rounded p-2.5 bg-gray-50 border focus:border-brand-red focus:ring-0" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Alamat Domisili</label>
                  <textarea required name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full border-gray-300 rounded p-2.5 bg-gray-50 border focus:border-brand-red focus:ring-0"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nomor HP/WA Aktif</label>
                    <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-gray-300 rounded p-2.5 bg-gray-50 border focus:border-brand-red focus:ring-0" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Aktif</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded p-2.5 bg-gray-50 border focus:border-brand-red focus:ring-0" />
                  </div>
                </div>

                {status === 'error' && <p className="text-red-500 text-sm">Gagal mengirim data. Silakan periksa koneksi Anda.</p>}

                <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-dark hover:bg-black text-white font-bold py-3 mt-4 rounded uppercase tracking-widest transition-colors disabled:opacity-50">
                  {status === 'loading' ? 'Mengirim...' : 'Kirim Pendaftaran'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gabung;
