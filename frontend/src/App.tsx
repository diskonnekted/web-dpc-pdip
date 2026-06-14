import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import Home from './pages/public/Home';
import Kabar from './pages/public/Kabar';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, FileText, Users, Settings, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

// Modern Public Layout
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Profil', path: '/profil' },
    { name: 'Berita', path: '/kabar' },
    { name: 'Multimedia', path: '/multimedia' },
    { name: 'Layanan KIP/PIP', path: '/layanan-kip-pip' },
    { name: 'Aspirasi', path: '/aspirasi' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Bar - Varied Element */}
      <div className={`bg-brand-dark text-white text-xs py-2 transition-all duration-300 ${scrolled ? 'hidden' : 'block'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <span className="flex items-center"><FileText size={14} className="mr-1 text-brand-red"/> Solid Bergerak</span>
            <span className="hidden md:flex items-center"><Users size={14} className="mr-1 text-brand-red"/> Gotong Royong</span>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-brand-red transition">Facebook</a>
            <a href="https://twitter.com" className="hover:text-brand-red transition">Twitter</a>
            <a href="https://instagram.com" className="hover:text-brand-red transition">Instagram</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-md shadow-md py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo Area */}
          <motion.a 
            href="/"
            className="flex items-center space-x-3 group"
          >
            <img src="/logopdip.png" alt="Logo PDIP" className="w-12 h-12 object-contain drop-shadow-md" />
            <div className="flex flex-col">
              <span className="font-bold text-xl md:text-2xl tracking-tighter text-brand-dark uppercase leading-tight">PDI Perjuangan</span>
              <span className="text-xs text-brand-red font-semibold tracking-wider uppercase">DPC Banjarnegara</span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.path}
                className="font-bold text-sm uppercase tracking-wide text-brand-dark hover:text-brand-red hover:bg-gray-100 px-4 py-2 rounded-md transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-200">
              <a href="/gabung" className="bg-brand-red hover:bg-red-800 text-white px-5 py-2 rounded-sm font-bold text-sm uppercase tracking-wide transition-colors shadow-md shadow-red-500/20">
                Gabung Kader
              </a>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-brand-dark p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden absolute w-full"
            >
              <div className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.path}
                    className="text-brand-dark font-bold text-lg py-3 px-4 border-b border-gray-100 hover:text-brand-red hover:bg-gray-50 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a href="/gabung" className="mt-4 bg-brand-red text-center text-white px-5 py-3 rounded-sm font-bold text-lg uppercase tracking-wide">
                  Gabung Kader
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Varied Footer */}
      <footer className="bg-[#111] text-white pt-16 pb-8 border-t-[6px] border-brand-red">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logopdip.png" alt="Logo PDIP" className="w-10 h-10 object-contain drop-shadow-md" />
              <div className="flex flex-col">
                <span className="font-bold text-xl uppercase tracking-wider leading-none">PDI Perjuangan</span>
                <span className="text-sm text-gray-400">DPC Kab. Banjarnegara</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Partai Demokrasi Indonesia Perjuangan adalah partai politik di Indonesia. Menjaga tegaknya NKRI dan Pancasila, mewujudkan keadilan sosial bagi seluruh rakyat Indonesia.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li><a href="/" className="hover:text-brand-red transition-colors flex items-center space-x-2"><span className="text-brand-red">▸</span><span>Beranda</span></a></li>
              <li><a href="/profil" className="hover:text-brand-red transition-colors flex items-center space-x-2"><span className="text-brand-red">▸</span><span>Profil Partai</span></a></li>
              <li><a href="/kabar" className="hover:text-brand-red transition-colors flex items-center space-x-2"><span className="text-brand-red">▸</span><span>Berita Terbaru</span></a></li>
              <li><a href="/dokumen" className="hover:text-brand-red transition-colors flex items-center space-x-2"><span className="text-brand-red">▸</span><span>AD/ART</span></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start space-x-3">
                <div className="mt-1 bg-white/10 p-2 rounded-full text-brand-red"><Settings size={14} /></div>
                <span>Kantor DPC PDIP Banjarnegara<br/>Jl. Pemuda No. 123</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-full text-brand-red"><FileText size={14} /></div>
                <span>sekretariat@pdip-banjarnegara.id</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs px-4 md:px-8">
          <p>&copy; {new Date().getFullYear()} DPC PDI Perjuangan Banjarnegara. Hak Cipta Dilindungi.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Modern Admin Layout
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('admin_token');
  const adminUsername = localStorage.getItem('admin_username') || 'Admin';

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    window.location.href = '/login';
  };
  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Pendaftar KIP/PIP', path: '/admin/kip-pip', icon: <Users size={20} /> },
    { name: 'Galeri Multimedia', path: '/admin/multimedia', icon: <Users size={20} /> },
    { name: 'Pendaftaran Anggota', path: '/admin/gabung', icon: <Users size={20} /> },
    { name: 'Layanan Aspirasi', path: '/admin/aspirasi', icon: <Users size={20} /> },
    { name: 'Kelola Berita', path: '/admin/berita', icon: <FileText size={20} /> },
    { name: 'Struktur Organisasi', path: '/admin/struktur', icon: <Users size={20} /> },
    { name: 'Pengaturan', path: '/admin/pengaturan', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-dark text-white flex flex-col shadow-2xl relative z-20">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <img src="/logopdip.png" alt="Logo PDIP" className="w-10 h-10 object-contain drop-shadow-md" />
            <div>
              <h2 className="font-bold tracking-wider text-sm">ADMIN PANEL</h2>
              <p className="text-xs text-gray-400">PDIP Banjarnegara</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {adminLinks.map((link) => (
            <a 
              key={link.name}
              href={link.path} 
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all group"
            >
              <span className="text-gray-400 group-hover:text-brand-red transition-colors">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-brand-red transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Admin Topbar */}
        <header className="bg-white dark:bg-zinc-800 h-16 flex items-center justify-between px-8 shadow-sm z-10 border-b dark:border-zinc-700">
          <h1 className="font-semibold text-gray-800 dark:text-gray-200">Selamat datang, {adminUsername}</h1>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-brand-red text-white rounded-full flex items-center justify-center font-bold uppercase">
              {adminUsername.charAt(0)}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-8 bg-gray-50 dark:bg-zinc-900/50">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

import Profil from './pages/public/Profil';
import Multimedia from './pages/public/Multimedia';
import LayananKipPip from './pages/public/LayananKipPip';
import Gabung from './pages/public/Gabung';
import Aspirasi from './pages/public/Aspirasi';
import KabarDetail from './pages/public/KabarDetail';

import Dashboard from './pages/admin/Dashboard';
import AdminBerita from './pages/admin/AdminBerita';
import AdminKipPip from './pages/admin/AdminKipPip';
import AdminGabung from './pages/admin/AdminGabung';
import AdminAspirasi from './pages/admin/AdminAspirasi';
import AdminStruktur from './pages/admin/AdminStruktur';
import AdminPengaturan from './pages/admin/AdminPengaturan';
import AdminMultimedia from './pages/admin/AdminMultimedia';
import Login from './pages/admin/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/kabar" element={<PublicLayout><Kabar /></PublicLayout>} />
        <Route path="/kabar/:slug" element={<PublicLayout><KabarDetail /></PublicLayout>} />
        <Route path="/profil" element={<PublicLayout><Profil /></PublicLayout>} />
        <Route path="/multimedia" element={<PublicLayout><Multimedia /></PublicLayout>} />
        <Route path="/layanan-kip-pip" element={<PublicLayout><LayananKipPip /></PublicLayout>} />
        <Route path="/gabung" element={<PublicLayout><Gabung /></PublicLayout>} />
        <Route path="/aspirasi" element={<PublicLayout><Aspirasi /></PublicLayout>} />
        
        {/* Admin Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/berita" element={<AdminLayout><AdminBerita /></AdminLayout>} />
        <Route path="/admin/multimedia" element={<AdminLayout><AdminMultimedia /></AdminLayout>} />
        <Route path="/admin/kip-pip" element={<AdminLayout><AdminKipPip /></AdminLayout>} />
        <Route path="/admin/gabung" element={<AdminLayout><AdminGabung /></AdminLayout>} />
        <Route path="/admin/aspirasi" element={<AdminLayout><AdminAspirasi /></AdminLayout>} />
        <Route path="/admin/struktur" element={<AdminLayout><AdminStruktur /></AdminLayout>} />
        <Route path="/admin/pengaturan" element={<AdminLayout><AdminPengaturan /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
