// Menggunakan native fetch
const articles = [
  {
    title: 'Sukses Gelar Musancab 2026, PDIP Banjarnegara Panaskan Mesin Partai',
    category: 'Kegiatan DPC',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: 'DPC PDIP Banjarnegara sukses menggelar Musyawarah Anak Cabang (Musancab) pada Jumat, 22 Mei 2026, di Ballroom Hotel Surya Yudha, Banjarnegara. Ketua DPC PDIP Banjarnegara, H. Nuryanto, menyampaikan bahwa konsolidasi ini merupakan upaya partai untuk memanaskan mesin partai dan memperkuat struktur organisasi hingga ke tingkat desa dalam rangka persiapan Pilkada dan Pemilu mendatang.'
  },
  {
    title: '19 Ketua PAC PDIP se-Kabupaten Banjarnegara Resmi Dikukuhkan',
    category: 'Daerah',
    imageUrl: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: 'Sebanyak 19 Ketua Pengurus Anak Cabang (PAC) PDI Perjuangan se-Kabupaten Banjarnegara resmi dikukuhkan dalam kegiatan Musancab. Proses penetapan pengurus ini telah melalui tahapan seleksi yang sangat ketat, mulai dari tahapan penjaringan, penyaringan, hingga tes tertulis dan wawancara yang dipantau secara langsung oleh DPD PDIP Provinsi Jawa Tengah.'
  },
  {
    title: 'Targetkan 11 Kursi DPRD, PDIP Banjarnegara Terus Lakukan Evaluasi Internal',
    category: 'Nasional',
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: 'Menghadapi agenda politik ke depan, DPC PDIP Banjarnegara memasang target ambisius untuk merebut hingga 11 kursi legislatif pada pemilu mendatang. Hal ini disampaikan oleh pimpinan partai sebagai bentuk evaluasi serius atas perolehan kursi pada Pemilu 2024 sebelumnya yang turun menjadi 8 kursi. Langkah taktis dan strategis pun mulai disusun dari akar rumput.'
  }
];

async function seed() {
  for (const article of articles) {
    try {
      const res = await fetch('http://localhost:5000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
      });
      const data = await res.json();
      console.log(`Berhasil insert: ${data.title}`);
    } catch (err) {
      console.error(`Gagal insert: ${article.title}`, err.message);
    }
  }
}

seed();
