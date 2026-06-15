import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import React from 'react';

import Home from './pages/public/Home';
import Kabar from './pages/public/Kabar';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, FileText, Users, Settings, LogOut, Zap, Home as HomeIcon, PlayCircle, HeartHandshake, BookOpen, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useYouthModeStore } from './store/youthModeStore';

// Modern Public Layout
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isYouthMode, setYouthMode } = useYouthModeStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isGenzPath = location.pathname.startsWith('/genz');
    if (isGenzPath && !isYouthMode) {
      setYouthMode(true);
    } else if (!isGenzPath && isYouthMode) {
      setYouthMode(false);
    }
  }, [location.pathname]);

  const handleToggleYouthMode = () => {
    if (isYouthMode) {
      navigate('/');
    } else {
      navigate('/genz');
    }
  };

  const navLinks = isYouthMode 
    ? [
        { name: 'Gen Z Home', path: '/genz' },
        { name: 'Marhaen Feed', path: '/genz/feed' },
        { name: 'Gen Z Care', path: '/genz/care' },
        { name: 'Marhaen Academy', path: '/genz/academy' },
      ]
    : [
        { name: 'Beranda', path: '/' },
        { name: 'Profil', path: '/profil' },
        { name: 'Berita', path: '/kabar' },
        { name: 'Multimedia', path: '/multimedia' },
        { name: 'Layanan KIP/PIP', path: '/layanan-kip-pip' },
        { name: 'Aspirasi', path: '/aspirasi' },
      ];

  const bottomNavItems = [
    { name: 'Home', path: '/genz', icon: <HomeIcon size={20} /> },
    { name: 'Feed', path: '/genz/feed', icon: <PlayCircle size={20} /> },
    { name: 'Care', path: '/genz/care', icon: <HeartHandshake size={20} /> },
    { name: 'Academy', path: '/genz/academy', icon: <BookOpen size={20} /> },
    { name: 'Profile', path: '/genz/profile', icon: <User size={20} /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${isYouthMode ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-brand-dark'} ${isYouthMode ? 'pb-20 lg:pb-0' : ''}`}>
      {/* Top Bar - Classic/Desktop only */}
      <div className={`bg-brand-dark text-white text-xs py-2 transition-all duration-300 ${scrolled ? 'hidden' : 'block'} ${isYouthMode ? 'lg:block hidden' : 'block'}`}>
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
          scrolled 
            ? isYouthMode ? 'bg-zinc-900/90 shadow-lg py-2 border-b border-brand-red/30 backdrop-blur-xl' : 'bg-white shadow-lg py-2' 
            : isYouthMode ? 'bg-zinc-950/80 backdrop-blur-xl shadow-md py-4 border-b border-white/5' : 'bg-white/95 backdrop-blur-md shadow-md py-4'
        } ${isYouthMode ? 'lg:block hidden' : 'block'}`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo Area */}
          <motion.div 
            onClick={() => navigate(isYouthMode ? '/genz' : '/')}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <img src="/logopdip.png" alt="Logo PDIP" className="w-12 h-12 object-contain drop-shadow-md" />
            <div className="flex flex-col">
              <span className={`font-bold text-xl md:text-2xl tracking-tighter uppercase leading-tight ${isYouthMode ? 'text-white' : 'text-brand-dark'}`}>PDI Perjuangan</span>
              <span className="text-xs text-brand-red font-semibold tracking-wider uppercase">DPC Banjarnegara</span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`font-bold text-sm uppercase tracking-wide px-4 py-2 rounded-md transition-all ${
                  isYouthMode 
                    ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                    : 'text-brand-dark hover:text-brand-red hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Youth Mode Toggle */}
            <button 
              onClick={handleToggleYouthMode}
              className={`ml-2 p-2 rounded-full transition-all ${isYouthMode ? 'bg-brand-red/20 text-brand-red shadow-[0_0_15px_rgba(204,0,0,0.5)]' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              title="Toggle Youth Mode"
            >
              <Zap size={18} className={isYouthMode ? "fill-brand-red" : ""} />
            </button>
            <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <Link to="/gabung" className={`px-5 py-2 rounded-sm font-bold text-sm uppercase tracking-wide transition-colors shadow-md ${
                isYouthMode ? 'bg-brand-red text-white hover:bg-red-700 shadow-red-500/50' : 'bg-brand-red text-white hover:bg-red-800 shadow-red-500/20'
              }`}>
                Gabung Kader
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 ${isYouthMode ? 'text-white' : 'text-brand-dark'}`}
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
              className={`lg:hidden border-t overflow-hidden absolute w-full ${
                isYouthMode ? 'bg-zinc-900 border-zinc-800 shadow-[0_10px_30px_rgba(204,0,0,0.1)]' : 'bg-white border-gray-100 shadow-xl'
              }`}
            >
              <div className="flex flex-col p-4 space-y-2">
                <button 
                  onClick={handleToggleYouthMode}
                  className={`flex items-center justify-center space-x-2 w-full p-3 rounded-lg font-bold ${
                    isYouthMode ? 'bg-brand-red/20 text-brand-red border border-brand-red/30' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Zap size={18} className={isYouthMode ? "fill-brand-red" : ""} />
                  <span>{isYouthMode ? 'Matikan Youth Mode' : 'Aktifkan Youth Mode'}</span>
                </button>
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-bold text-lg py-3 px-4 border-b transition-colors ${
                      isYouthMode 
                        ? 'text-gray-200 border-zinc-800 hover:text-brand-red hover:bg-zinc-800' 
                        : 'text-brand-dark border-gray-100 hover:text-brand-red hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  to="/gabung" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 bg-brand-red text-center text-white px-5 py-3 rounded-sm font-bold text-lg uppercase tracking-wide"
                >
                  Gabung Kader
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sleek Mobile Header ONLY in Gen Z Mode */}
      {isYouthMode && (
        <header className="lg:hidden sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logopdip.png" alt="Logo PDIP" className="w-8 h-8 object-contain" />
            <span className="font-extrabold text-sm uppercase tracking-tight text-white">Marhaen Muda</span>
          </div>
          <button 
            onClick={handleToggleYouthMode}
            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-850 hover:bg-zinc-850/50 border border-zinc-800 rounded-full text-[10px] font-bold text-gray-300 transition-all"
          >
            <Zap size={12} className="text-brand-red fill-brand-red" />
            Mode Klasik
          </button>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar (ONLY in Gen Z Mode on Mobile) */}
      {isYouthMode && (
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-850 shadow-2xl flex justify-around py-2 px-2 pb-safe-bottom">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                  isActive ? 'text-brand-red' : 'text-gray-400 hover:text-gray-250'
                }`}
              >
                <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-brand-red/10 scale-110 shadow-[0_0_15px_rgba(204,0,0,0.25)]' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold mt-0.5 tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* Varied Footer - Hidden on mobile in Youth/Gen Z Mode */}
      <footer className={`bg-[#111] text-white pt-16 pb-8 border-t-[6px] border-brand-red ${isYouthMode ? 'lg:block hidden' : 'block'}`}>
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
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
              <li><Link to={isYouthMode ? "/genz" : "/"} className="hover:text-brand-red transition-colors flex items-center space-x-2"><span className="text-brand-red">▸</span><span>Beranda</span></Link></li>
              <li><Link to="/profil" className="hover:text-brand-red transition-colors flex items-center space-x-2"><span className="text-brand-red">▸</span><span>Profil Partai</span></Link></li>
              <li><Link to="/kabar" className="hover:text-brand-red transition-colors flex items-center space-x-2"><span className="text-brand-red">▸</span><span>Berita Terbaru</span></Link></li>
              <li><Link to="/profil-ad-art" className="hover:text-brand-red transition-colors flex items-center space-x-2"><span className="text-brand-red">▸</span><span>AD/ART</span></Link></li>
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

          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Peta Lokasi</h4>
            <div className="w-full h-32 rounded-xl overflow-hidden border border-zinc-800 shadow-md">
              <iframe 
                src="https://maps.google.com/maps?q=-7.3909213069062,109.70636000185057&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Peta DPC PDIP Banjarnegara"
              ></iframe>
            </div>
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
    { name: 'Kelola Gen Z', path: '/admin/genz', icon: <Zap size={20} /> },
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
import AdminGenz from './pages/admin/AdminGenz';

// Gen Z Pages
import GenzHome from './pages/genz/GenzHome';
import MarhaenFeed from './pages/genz/MarhaenFeed';
import GenZCare from './pages/genz/GenZCare';
import MarhaenAcademy from './pages/genz/MarhaenAcademy';
import GenzProfile from './pages/genz/GenzProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/kabar" element={<PublicLayout><Kabar /></PublicLayout>} />
        <Route path="/kabar/:slug" element={<PublicLayout><KabarDetail /></PublicLayout>} />
        <Route path="/profil" element={<PublicLayout><Profil /></PublicLayout>} />
        <Route path="/profil-ad-art" element={<PublicLayout><Profil /></PublicLayout>} />
        <Route path="/multimedia" element={<PublicLayout><Multimedia /></PublicLayout>} />
        <Route path="/layanan-kip-pip" element={<PublicLayout><LayananKipPip /></PublicLayout>} />
        <Route path="/gabung" element={<PublicLayout><Gabung /></PublicLayout>} />
        <Route path="/aspirasi" element={<PublicLayout><Aspirasi /></PublicLayout>} />
        
        {/* Gen Z Routes */}
        <Route path="/genz" element={<PublicLayout><GenzHome /></PublicLayout>} />
        <Route path="/genz/feed" element={<PublicLayout><MarhaenFeed /></PublicLayout>} />
        <Route path="/genz/care" element={<PublicLayout><GenZCare /></PublicLayout>} />
        <Route path="/genz/academy" element={<PublicLayout><MarhaenAcademy /></PublicLayout>} />
        <Route path="/genz/profile" element={<PublicLayout><GenzProfile /></PublicLayout>} />

        {/* Admin Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/genz" element={<AdminLayout><AdminGenz /></AdminLayout>} />
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
