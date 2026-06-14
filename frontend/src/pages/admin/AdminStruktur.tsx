import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface Structure {
  id: number;
  name: string;
  position: string;
  imageUrl: string | null;
  order: number;
}

const AdminStruktur = () => {
  const [structures, setStructures] = useState<Structure[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Structure>>({ name: '', position: '', imageUrl: '', order: 0 });

  const fetchStructures = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/structures');
      const data = await res.json();
      setStructures(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStructures();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `http://localhost:5000/api/structures/${formData.id}` : 'http://localhost:5000/api/structures';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setIsEditing(false);
      setFormData({ name: '', position: '', imageUrl: '', order: 0 });
      fetchStructures();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Yakin ingin menghapus pengurus ini?')) return;
    try {
      await fetch(`http://localhost:5000/api/structures/${id}`, { method: 'DELETE' });
      fetchStructures();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Struktur Organisasi</h2>
          <p className="text-gray-500 text-sm mt-1">Kelola jajaran pengurus DPC PDI Perjuangan Banjarnegara.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(true); setFormData({ name: '', position: '', imageUrl: '', order: 0 }); }}
          className="flex items-center space-x-2 bg-brand-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <Plus size={18} />
          <span>Tambah Pengurus</span>
        </button>
      </div>

      {isEditing && (
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 mb-8">
          <h3 className="text-lg font-bold mb-4">{formData.id ? 'Edit Pengurus' : 'Tambah Pengurus Baru'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded p-2 dark:bg-zinc-900 dark:border-zinc-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jabatan</label>
                <input required type="text" value={formData.position || ''} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full border rounded p-2 dark:bg-zinc-900 dark:border-zinc-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Foto (opsional)</label>
                <input type="text" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border rounded p-2 dark:bg-zinc-900 dark:border-zinc-700" placeholder="/media/foto-pengurus.jpg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Urutan Tampil (Angka)</label>
                <input required type="number" value={formData.order || 0} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full border rounded p-2 dark:bg-zinc-900 dark:border-zinc-700" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Batal</button>
              <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded hover:bg-red-700">Simpan</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">Memuat data...</div>
        ) : structures.map((item) => (
          <div key={item.id} className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xl">{item.name.charAt(0)}</div>}
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-gray-800 dark:text-white">{item.name}</h4>
              <p className="text-sm text-brand-red font-medium">{item.position}</p>
              <p className="text-xs text-gray-400 mt-1">Urutan: {item.order}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <button onClick={() => { setFormData(item); setIsEditing(true); }} className="p-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded"><Edit2 size={14}/></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStruktur;
