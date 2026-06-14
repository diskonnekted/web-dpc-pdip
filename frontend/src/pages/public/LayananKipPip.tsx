import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

const LayananKipPip = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nik: '',
    nisn: '',
    schoolName: '',
    programType: 'PIP',
    parentName: '',
    address: '',
    phoneNumber: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/kippip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      setStatus('success');
      setFormData({
        fullName: '', nik: '', nisn: '', schoolName: '', programType: 'PIP', parentName: '', address: '', phoneNumber: ''
      });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <section className="relative h-[40vh] flex items-center justify-center bg-brand-dark text-white pt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>
        <img 
          src="/media/apel-siaga-dpc-pdip-banjarnegara-jawa-tengah-sabtu-2762020_169.jpeg" 
          alt="Pendidikan PDI Perjuangan" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        />
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 uppercase"
          >
            Layanan Pendaftaran <span className="text-brand-red">KIP & PIP</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 font-light max-w-2xl mx-auto"
          >
            Wujud komitmen PDI Perjuangan untuk memastikan seluruh anak bangsa mendapatkan akses pendidikan yang layak dan merata.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 mt-16 flex flex-col lg:flex-row gap-12">
        
        {/* Informasi Syarat KIP & PIP */}
        <div className="lg:w-1/2 space-y-12">
          
          <section className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <div className="p-3 bg-red-100 rounded-lg text-brand-red">
                <BookOpen size={32} />
              </div>
              <h2 className="text-2xl font-black text-brand-dark">Syarat PIP 2026</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Program Indonesia Pintar (PIP) ditujukan untuk siswa SD, SMP, SMA/SMK dari keluarga miskin/rentan miskin.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Peserta didik pemegang Kartu Indonesia Pintar (KIP).</li>
              <li>Berasal dari keluarga peserta PKH atau pemegang KKS.</li>
              <li>Siswa yatim, piatu, atau yatim piatu.</li>
              <li>Menyiapkan Fotokopi KK & Akta Kelahiran.</li>
              <li>Surat Keterangan Tidak Mampu (SKTM) dari Desa/Kelurahan.</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <div className="p-3 bg-red-100 rounded-lg text-brand-red">
                <GraduationCap size={32} />
              </div>
              <h2 className="text-2xl font-black text-brand-dark">Syarat KIP Kuliah 2026</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Bantuan pendidikan untuk lulusan SMA/sederajat yang akan melanjutkan ke perguruan tinggi.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Lulusan SMA/SMK/MA tahun 2026, 2025, atau 2024.</li>
              <li>Memiliki potensi akademik baik namun memiliki keterbatasan ekonomi.</li>
              <li>Memiliki NISN, NPSN, dan NIK yang valid di Dapodik.</li>
              <li>Lulus seleksi penerimaan mahasiswa baru di PTN/PTS berakreditasi.</li>
            </ul>
          </section>
        </div>

        {/* Formulir Pendaftaran */}
        <div className="lg:w-1/2">
          <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-brand-red">
            <h3 className="text-2xl font-bold text-brand-dark mb-6">Formulir Bantuan Pendaftaran</h3>
            
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 p-6 rounded-lg text-center border border-green-200"
              >
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-800 mb-2">Pendaftaran Berhasil Dikirim!</h4>
                <p className="text-green-600">
                  Data Anda telah masuk ke sistem kami. Tim pendamping pendidikan DPC PDIP Banjarnegara akan segera menghubungi Anda untuk proses tindak lanjut.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                >
                  Daftarkan Yang Lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap Siswa</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-brand-red focus:border-brand-red" placeholder="Cth: Budi Santoso" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NIK Siswa</label>
                    <input required type="text" name="nik" value={formData.nik} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-brand-red focus:border-brand-red" placeholder="16 Digit NIK" maxLength={16} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
                    <input required type="text" name="nisn" value={formData.nisn} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-brand-red focus:border-brand-red" placeholder="Nomor Induk Siswa Nasional" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah</label>
                    <input required type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-brand-red focus:border-brand-red" placeholder="Cth: SMAN 1 Banjarnegara" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Bantuan Yang Diajukan</label>
                  <select name="programType" value={formData.programType} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-brand-red focus:border-brand-red">
                    <option value="PIP">Program Indonesia Pintar (SD/SMP/SMA)</option>
                    <option value="KIP Kuliah">KIP Kuliah (Perguruan Tinggi)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Orang Tua / Wali</label>
                  <input required type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-brand-red focus:border-brand-red" placeholder="Nama lengkap sesuai KK" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                  <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full border border-gray-300 rounded-md p-3 focus:ring-brand-red focus:border-brand-red" placeholder="Alamat rumah saat ini"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP/WhatsApp (Aktif)</label>
                  <input required type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-brand-red focus:border-brand-red" placeholder="081234567890" />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">Terjadi kesalahan sistem, silakan coba lagi nanti.</p>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-md uppercase tracking-widest transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LayananKipPip;
