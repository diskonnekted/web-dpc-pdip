import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Play, Camera, Video } from 'lucide-react';

interface Multimedia {
  id: number;
  platform: string;
  title: string;
  embedCode: string;
  order: number;
  isActive: boolean;
}

const AdminMultimedia = () => {
  const [items, setItems] = useState<Multimedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Multimedia>>({ platform: 'YOUTUBE', title: '', embedCode: '', order: 0, isActive: true });

  const fetchItems = async () => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/multimedia');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `http://localhost:5000/api/multimedia/${formData.id}` : (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/multimedia';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setIsEditing(false);
      setFormData({ platform: 'YOUTUBE', title: '', embedCode: '', order: 0, isActive: true });
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Hapus konten multimedia ini?')) return;
    try {
      await fetch(`http://localhost:5000/api/multimedia/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YOUTUBE': return <Video size={16} className="text-red-600" />;
      case 'INSTAGRAM': return <Camera size={16} className="text-pink-600" />;
      case 'TIKTOK': return <Play size={16} className="text-black dark:text-white" />;
      default: return <Video size={16} />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Galeri Multimedia</h2>
          <p className="text-gray-500 text-sm mt-1">Kelola tautan (embed) video YouTube, Instagram, dan TikTok.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(true); setFormData({ platform: 'YOUTUBE', title: '', embedCode: '', order: 0, isActive: true }); }}
          className="flex items-center space-x-2 bg-brand-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <Plus size={18} />
          <span>Tambah Media</span>
        </button>
      </div>

      {isEditing && (
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 mb-8">
          <h3 className="text-lg font-bold mb-4">{formData.id ? 'Edit Media' : 'Tambah Media Baru'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Platform</label>
                <select value={formData.platform || 'YOUTUBE'} onChange={e => setFormData({...formData, platform: e.target.value})} className="w-full border rounded p-2 dark:bg-zinc-900 dark:border-zinc-700">
                  <option value="YOUTUBE">YouTube</option>
                  <option value="INSTAGRAM">Instagram</option>
                  <option value="TIKTOK">TikTok</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Judul Video/Konten</label>
                <input required type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border rounded p-2 dark:bg-zinc-900 dark:border-zinc-700" placeholder="Misal: Pidato Ketua Umum" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Kode Embed (HTML Iframe/Blockquote)</label>
              <textarea required rows={4} value={formData.embedCode || ''} onChange={e => setFormData({...formData, embedCode: e.target.value})} className="w-full border rounded p-2 dark:bg-zinc-900 dark:border-zinc-700 font-mono text-sm" placeholder='<iframe src="..."></iframe>' />
              <p className="text-xs text-gray-500 mt-1">Gunakan fitur "Copy Embed Code" atau "Sematkan" langsung dari YouTube/IG/TikTok.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Urutan (Makin kecil makin awal)</label>
                <input required type="number" value={formData.order || 0} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full border rounded p-2 dark:bg-zinc-900 dark:border-zinc-700" />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isActive !== false} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="form-checkbox text-brand-red rounded border-gray-300" />
                  <span className="text-sm font-medium">Tampilkan di Halaman Publik</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Batal</button>
              <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded hover:bg-red-700">Simpan</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-zinc-900/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Platform</th>
              <th className="p-4 font-medium">Judul Konten</th>
              <th className="p-4 font-medium text-center">Urutan</th>
              <th className="p-4 font-medium text-center">Status</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Belum ada multimedia.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-2 font-bold text-gray-700 dark:text-gray-300">
                      {getPlatformIcon(item.platform)}
                      <span>{item.platform}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-800 dark:text-white">
                    {item.title}
                  </td>
                  <td className="p-4 text-center text-gray-500">{item.order}</td>
                  <td className="p-4 text-center">
                    {item.isActive ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Aktif</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">Tersembunyi</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setFormData(item); setIsEditing(true); }} className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded mr-2"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMultimedia;
