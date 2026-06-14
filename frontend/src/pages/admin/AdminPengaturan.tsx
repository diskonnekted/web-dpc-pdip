import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const AdminPengaturan = () => {
  const [settings, setSettings] = useState({ visi: '', misi: '', telepon: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/settings');
        const data = await res.json();
        setSettings(prev => ({ ...prev, ...data }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) setMessage('Pengaturan berhasil disimpan!');
      else setMessage('Gagal menyimpan pengaturan.');
    } catch (error) {
      console.error(error);
      setMessage('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pengaturan Sistem</h2>
          <p className="text-gray-500 text-sm mt-1">Ubah informasi dasar website seperti Visi, Misi, dan Kontak.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 max-w-3xl p-8">
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Visi Organisasi</label>
              <textarea 
                rows={3}
                value={settings.visi || ''}
                onChange={e => setSettings({...settings, visi: e.target.value})}
                className="w-full border border-gray-300 rounded p-3 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700 focus:border-brand-red focus:ring-0" 
                placeholder="Tuliskan visi partai di sini..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Misi Organisasi</label>
              <textarea 
                rows={5}
                value={settings.misi || ''}
                onChange={e => setSettings({...settings, misi: e.target.value})}
                className="w-full border border-gray-300 rounded p-3 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700 focus:border-brand-red focus:ring-0" 
                placeholder="Tuliskan misi partai di sini..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nomor Telepon Sekretariat</label>
                <input 
                  type="text"
                  value={settings.telepon || ''}
                  onChange={e => setSettings({...settings, telepon: e.target.value})}
                  className="w-full border border-gray-300 rounded p-3 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700 focus:border-brand-red focus:ring-0" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Publik</label>
                <input 
                  type="email"
                  value={settings.email || ''}
                  onChange={e => setSettings({...settings, email: e.target.value})}
                  className="w-full border border-gray-300 rounded p-3 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700 focus:border-brand-red focus:ring-0" 
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button 
                type="submit" 
                disabled={saving}
                className="bg-brand-red text-white hover:bg-red-700 px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              </button>
              {message && <span className={message.includes('berhasil') ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{message}</span>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPengaturan;
