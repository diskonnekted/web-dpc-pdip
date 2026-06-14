import React, { useState, useEffect } from 'react';
import { Users, FileText, Activity, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    kipPip: 0,
    members: 0,
    aspirations: 0,
    pendingKip: 0,
    unreadAspirations: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Berita', value: stats.articles, icon: <FileText size={24} />, color: 'bg-blue-500' },
    { title: 'Pendaftar KIP/PIP', value: stats.kipPip, subtext: `${stats.pendingKip} Menunggu`, icon: <Activity size={24} />, color: 'bg-green-500' },
    { title: 'Anggota Baru', value: stats.members, icon: <Users size={24} />, color: 'bg-brand-red' },
    { title: 'Aspirasi Masuk', value: stats.aspirations, subtext: `${stats.unreadAspirations} Belum dibaca`, icon: <MessageSquare size={24} />, color: 'bg-yellow-500' }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Ikhtisar Sistem</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 flex items-center space-x-4">
            <div className={`${card.color} text-white p-4 rounded-lg`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{card.title}</p>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white">{card.value}</h3>
              {card.subtext && <p className="text-xs text-red-500 font-semibold mt-1">{card.subtext}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
        <h3 className="text-lg font-bold mb-4">Selamat Bekerja, Admin!</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Gunakan menu di sebelah kiri untuk mengelola konten website, menyetujui pendaftaran anggota baru, merespons aspirasi masyarakat, serta memperbarui jajaran kepengurusan partai.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
