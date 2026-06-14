async function update() {
  const mediaImages = [
    '/media/84165_pdip-cegah-stunting.jpeg',
    '/media/apel-siaga-dpc-pdip-banjarnegara-jawa-tengah-sabtu-2762020_169.jpeg',
    '/media/banteng-banjarnegara-mulai-panaskan-mesin-partai-00969umqUf.jpg'
  ];

  try {
    const res = await fetch('http://localhost:5000/api/articles');
    const articles = await res.json();
    
    // We update them by deleting and recreating, or we can add an update endpoint.
    // Wait, the API doesn't have an update endpoint. So deleting and recreating is easier.
    for (const article of articles) {
      await fetch(`http://localhost:5000/api/articles/${article.id}`, { method: 'DELETE' });
    }

    const newArticles = [
      {
        title: 'Sukses Gelar Musancab 2026, PDIP Banjarnegara Panaskan Mesin Partai',
        category: 'Kegiatan DPC',
        imageUrl: mediaImages[2], // banteng panaskan mesin
        content: 'DPC PDIP Banjarnegara sukses menggelar Musyawarah Anak Cabang (Musancab) pada Jumat, 22 Mei 2026, di Ballroom Hotel Surya Yudha, Banjarnegara. Ketua DPC PDIP Banjarnegara, H. Nuryanto, menyampaikan bahwa konsolidasi ini merupakan upaya partai untuk memanaskan mesin partai dan memperkuat struktur organisasi hingga ke tingkat desa dalam rangka persiapan Pilkada dan Pemilu mendatang.'
      },
      {
        title: '19 Ketua PAC PDIP se-Kabupaten Banjarnegara Resmi Dikukuhkan',
        category: 'Daerah',
        imageUrl: mediaImages[1], // apel siaga
        content: 'Sebanyak 19 Ketua Pengurus Anak Cabang (PAC) PDI Perjuangan se-Kabupaten Banjarnegara resmi dikukuhkan dalam kegiatan Musancab. Proses penetapan pengurus ini telah melalui tahapan seleksi yang sangat ketat, mulai dari tahapan penjaringan, penyaringan, hingga tes tertulis dan wawancara yang dipantau secara langsung oleh DPD PDIP Provinsi Jawa Tengah.'
      },
      {
        title: 'Targetkan 11 Kursi DPRD, PDIP Banjarnegara Terus Lakukan Evaluasi Internal',
        category: 'Nasional',
        imageUrl: mediaImages[0], // cegah stunting (placeholder)
        content: 'Menghadapi agenda politik ke depan, DPC PDIP Banjarnegara memasang target ambisius untuk merebut hingga 11 kursi legislatif pada pemilu mendatang. Hal ini disampaikan oleh pimpinan partai sebagai bentuk evaluasi serius atas perolehan kursi pada Pemilu 2024 sebelumnya yang turun menjadi 8 kursi. Langkah taktis dan strategis pun mulai disusun dari akar rumput.'
      }
    ];

    for (const article of newArticles) {
      await fetch('http://localhost:5000/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
    }
    console.log('Successfully updated images');
  } catch (e) {
    console.error(e);
  }
}
update();
