import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, RefreshCw, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Konfigurasi API
const API_URL = 'http://localhost:5000/api';

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  imageUrl: string | null;
  isPublished: boolean;
  createdAt: string;
}

const AdminBerita = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Nasional',
    content: '',
    imageUrl: ''
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/articles`);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      alert('Gagal mengambil data berita.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/articles`, formData);
      setIsModalOpen(false);
      setFormData({ title: '', category: 'Nasional', content: '', imageUrl: '' });
      fetchArticles(); // Refresh data
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Gagal menyimpan berita.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await axios.delete(`${API_URL}/articles/${id}`);
        fetchArticles(); // Refresh data
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('Gagal menghapus berita.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Kelola Kabar Banteng</h2>
          <p className="text-gray-500 text-sm mt-1">Manajemen publikasi berita dan artikel website.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={fetchArticles}
            className="p-2 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors text-gray-600 dark:text-gray-300"
            title="Refresh Data"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            <span>Tulis Berita</span>
          </button>
        </div>
      </div>

      {/* Tabel Berita */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-400 border-b border-gray-200 dark:border-zinc-700">
              <tr>
                <th scope="col" className="px-6 py-4">Judul Artikel</th>
                <th scope="col" className="px-6 py-4">Kategori</th>
                <th scope="col" className="px-6 py-4">Tanggal Dibuat</th>
                <th scope="col" className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada berita yang dipublikasikan.</td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="border-b border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                      {article.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800/50">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(article.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Lihat">
                          <Eye size={18} />
                        </button>
                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(article.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-3xl my-8 flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-zinc-800 shrink-0">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Tulis Berita Baru</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form id="article-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Artikel</label>
                    <input 
                      type="text" 
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="Masukkan judul berita yang menarik"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      >
                        <option value="Nasional">Nasional</option>
                        <option value="Daerah">Daerah</option>
                        <option value="Kegiatan DPC">Kegiatan DPC</option>
                        <option value="Opini">Opini</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Gambar Cover</label>
                      <input 
                        type="url" 
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                        placeholder="https://contoh.com/gambar.jpg"
                      />
                    </div>
                  </div>

                  {formData.imageUrl && (
                    <div className="h-40 w-full rounded-lg border border-gray-200 overflow-hidden">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konten Berita</label>
                    <textarea 
                      name="content"
                      required
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={8}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="Ketikkan isi berita di sini..."
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-zinc-800 flex justify-end space-x-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none dark:bg-zinc-800 dark:text-gray-300 dark:border-zinc-600 dark:hover:bg-zinc-700"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  form="article-form"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-brand-red hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    'Publikasikan'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBerita;
