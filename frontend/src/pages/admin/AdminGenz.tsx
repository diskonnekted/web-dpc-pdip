import React, { useState } from 'react';
import { Film, Briefcase, BookOpen, Check, Plus, Trash2 } from 'lucide-react';

export default function AdminGenz() {
  const [activeTab, setActiveTab] = useState<'feed' | 'care' | 'academy'>('feed');

  // State Mock Data
  const [videos, setVideos] = useState([
    { id: 1, title: 'Gotong Royong di Era Digital', author: '@marhaen_muda', status: 'Published', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    { id: 2, title: 'Literasi Digital Anti Scam!', author: '@windy_tech', status: 'Published', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
    { id: 3, title: 'Keseruan Volunteer Tanam Pohon Dieng', author: '@anak_gunung', status: 'Pending Review', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
  ]);

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Social Media Admin', biz: 'Kopi Marhaen Banjarnegara', salary: 'Rp 1.5 - 2.5 jt' },
    { id: 2, title: 'Desainer Grafis Freelance', biz: 'Batik Tulis Gumelem', salary: 'Project-based' }
  ]);

  const [volunteers, setVolunteers] = useState([
    { id: 1, title: 'Tanam 1000 Pohon Dieng', date: 'Minggu, 21 Juni 2026', loc: 'Kawasan Wisata Dieng' },
    { id: 2, title: 'Clean-Up Sungai Serayu', date: 'Sabtu, 27 Juni 2026', loc: 'Pinggiran Sungai Serayu' }
  ]);

  // Form states
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoAuthor, setNewVideoAuthor] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobBiz, setNewJobBiz] = useState('');
  const [newJobSalary, setNewJobSalary] = useState('');

  // Handlers
  const handleApproveVideo = (id: number) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, status: 'Published' } : v));
  };

  const handleDeleteVideo = (id: number) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle || !newVideoAuthor) return;
    setVideos(prev => [
      ...prev,
      {
        id: Date.now(),
        title: newVideoTitle,
        author: newVideoAuthor.startsWith('@') ? newVideoAuthor : `@${newVideoAuthor}`,
        status: 'Published',
        url: newVideoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      }
    ]);
    setNewVideoTitle('');
    setNewVideoAuthor('');
    setNewVideoUrl('');
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle || !newJobBiz) return;
    setJobs(prev => [
      ...prev,
      {
        id: Date.now(),
        title: newJobTitle,
        biz: newJobBiz,
        salary: newJobSalary || 'Project-based'
      }
    ]);
    setNewJobTitle('');
    setNewJobBiz('');
    setNewJobSalary('');
  };

  const handleDeleteJob = (id: number) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  const handleDeleteVolunteer = (id: number) => {
    setVolunteers(prev => prev.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Kelola Fitur Gen Z</h1>
          <p className="text-sm text-gray-500">Moderasi video feed, atur portal lowongan kerja, pelatihan, dan kegiatan kerelawanan.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-zinc-700">
        <button
          onClick={() => setActiveTab('feed')}
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'feed'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Film size={16} /> Marhaen Feed (Video)
        </button>
        <button
          onClick={() => setActiveTab('care')}
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'care'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Briefcase size={16} /> Gen Z Care (Job & Volunteer)
        </button>
        <button
          onClick={() => setActiveTab('academy')}
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'academy'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <BookOpen size={16} /> Marhaen Academy
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm border dark:border-zinc-700">
        
        {/* Tab 1: Marhaen Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-8">
            {/* Add video form */}
            <form onSubmit={handleAddVideo} className="p-4 bg-gray-50 dark:bg-zinc-850 rounded-xl border dark:border-zinc-700 space-y-4">
              <h3 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><Plus size={18} /> Tambah Video Edukasi Baru</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Judul Video"
                  value={newVideoTitle}
                  onChange={e => setNewVideoTitle(e.target.value)}
                  className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Pembuat (@username)"
                  value={newVideoAuthor}
                  onChange={e => setNewVideoAuthor(e.target.value)}
                  className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="URL Video (.mp4)"
                  value={newVideoUrl}
                  onChange={e => setNewVideoUrl(e.target.value)}
                  className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none"
                />
              </div>
              <button type="submit" className="px-5 py-2 bg-brand-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors">
                Tambah Video
              </button>
            </form>

            {/* Video List */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 dark:text-gray-250">Daftar Unggahan Video (UGC)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 dark:bg-zinc-850 text-gray-700 dark:text-gray-300 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3">Judul</th>
                      <th className="px-6 py-3">Kreator</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
                    {videos.map(v => (
                      <tr key={v.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-750/30">
                        <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{v.title}</td>
                        <td className="px-6 py-4 text-brand-red font-semibold">{v.author}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            v.status === 'Published' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {v.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          {v.status === 'Pending Review' && (
                            <button 
                              onClick={() => handleApproveVideo(v.id)}
                              className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                              title="Setujui Video"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteVideo(v.id)}
                            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Hapus Video"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Gen Z Care */}
        {activeTab === 'care' && (
          <div className="space-y-8">
            {/* Add job */}
            <form onSubmit={handleAddJob} className="p-4 bg-gray-50 dark:bg-zinc-850 rounded-xl border dark:border-zinc-700 space-y-4">
              <h3 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><Plus size={18} /> Tambah Lowongan Kerja Baru (Berdikari)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Posisi Pekerjaan"
                  value={newJobTitle}
                  onChange={e => setNewJobTitle(e.target.value)}
                  className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Nama UMKM/Usaha"
                  value={newJobBiz}
                  onChange={e => setNewJobBiz(e.target.value)}
                  className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Gaji / Keterangan"
                  value={newJobSalary}
                  onChange={e => setNewJobSalary(e.target.value)}
                  className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none"
                />
              </div>
              <button type="submit" className="px-5 py-2 bg-brand-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors">
                Tambah Lowongan
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jobs list */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">Daftar Lowongan Kerja</h3>
                <div className="divide-y divide-gray-150 dark:divide-zinc-700">
                  {jobs.map(j => (
                    <div key={j.id} className="py-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-250">{j.title}</h4>
                        <p className="text-xs text-gray-500">{j.biz} - <span className="text-brand-red font-medium">{j.salary}</span></p>
                      </div>
                      <button onClick={() => handleDeleteJob(j.id)} className="text-red-500 hover:text-red-700 p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteers list */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">Daftar Aksi Relawan Aktif (Sosio-Ekologis)</h3>
                <div className="divide-y divide-gray-150 dark:divide-zinc-700">
                  {volunteers.map(v => (
                    <div key={v.id} className="py-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-250">{v.title}</h4>
                        <p className="text-xs text-gray-500">{v.date} | {v.loc}</p>
                      </div>
                      <button onClick={() => handleDeleteVolunteer(v.id)} className="text-red-500 hover:text-red-700 p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Marhaen Academy */}
        {activeTab === 'academy' && (
          <div className="space-y-6">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Manajemen Kurikulum & Modul Belajar</h3>
            <p className="text-sm text-gray-500">Berikut modul kurikulum akademi kader yang aktif. Fitur pembuatan kuis kustom baru dan penambahan slide sedang dalam pengembangan oleh dewan pimpinan instruktur.</p>
            
            <div className="space-y-4">
              {[
                { title: 'Marhaen 101', questions: 3, xp: 200, status: 'Active' },
                { title: 'Digital Activist', questions: 3, xp: 500, status: 'Active' },
                { title: 'Community Organizer', questions: 0, xp: 800, status: 'Draft/Locked' },
                { title: 'Policy Maker Muda', questions: 0, xp: 1000, status: 'Draft/Locked' }
              ].map((m, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-zinc-850 rounded-xl border dark:border-zinc-700 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">{m.title}</h4>
                    <p className="text-xs text-gray-500">{m.questions} Pertanyaan - Reward: {m.xp} XP</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    m.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-350'
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
