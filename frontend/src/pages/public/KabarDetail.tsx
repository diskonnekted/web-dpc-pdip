import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ChevronLeft, Tag } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
  category: string;
  createdAt: string;
}

const KabarDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/articles/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-brand-red font-bold text-xl animate-pulse">Memuat Berita...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-black text-brand-dark mb-4">404</h1>
        <p className="text-gray-500 mb-8">Berita tidak ditemukan atau telah dihapus.</p>
        <Link to="/kabar" className="bg-brand-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-800 transition">
          Kembali ke Kabar
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 md:px-8 pt-12 md:pt-20 max-w-4xl">
        <Link to="/kabar" className="inline-flex items-center text-gray-500 hover:text-brand-red font-semibold text-sm mb-8 transition">
          <ChevronLeft size={16} className="mr-1" />
          KEMBALI KE INDEKS BERITA
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6 flex items-center gap-3 text-sm font-bold">
            <span className="bg-brand-red text-white px-3 py-1 rounded-full uppercase tracking-wider text-xs">
              {article.category.replace('-', ' ')}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-brand-dark leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8 gap-4 border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-brand-red" />
              {new Date(article.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2 text-brand-red" />
              Admin DPC
            </div>
          </div>
        </motion.div>

        {article.imageUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white"
          >
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg prose-red max-w-none text-gray-800"
        >
          {article.content.split('\n').map((paragraph, index) => (
            paragraph.trim() ? <p key={index} className="mb-4 leading-relaxed">{paragraph}</p> : <br key={index} />
          ))}
        </motion.div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="font-bold text-xl mb-4 flex items-center text-brand-dark">
            <Tag size={20} className="mr-2 text-brand-red" />
            Topik Terkait
          </h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold uppercase cursor-pointer hover:bg-gray-300">PDI Perjuangan</span>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold uppercase cursor-pointer hover:bg-gray-300">Banjarnegara</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KabarDetail;
