const galleryImages = [
'https://instagram.fdel27-3.fna.fbcdn.net/v/t51.82787-15/724072949_17873275344617418_8877785551248739405_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&_nc_map=urlgen_bucketless&ig_cache_key=MzkyMDA0NDAwMjgxNDQzOTA0NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQwMy5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=v-at7fh8ensQ7kNvwFiUQDy&_nc_oc=AdqJLRR2UKc6nsl1dLTI6YJ75FOnT2QK9ZXy7Wbt5slcZojs_USmzNN2eHKTaUepXMzYWEOrA75t-Bao8JrZ9dPE&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fdel27-3.fna&_nc_gid=uuvTkzDV_IPYCsmD6hRaGQ&_nc_ss=7a22e&oh=00_AQD4x6fxOOeCJLRrl1WCjhlKo9S3uk0k1kZBukXcrTwwYg&oe=6A494529',
'https://instagram.fdel27-8.fna.fbcdn.net/v/t51.82787-15/729666983_17875367802617418_4517901850080930933_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&_nc_map=urlgen_bucketless&ig_cache_key=MzkzMDIwMDQyNTUyNzQxMjgxOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQwMy5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=prT-41gYEWgQ7kNvwFd-ilF&_nc_oc=AdqkAlO_aiAjkg-842YoE2O0drQydrdWzeaEt282H4HUI5-dpjdDMyAFKnTHvmCOy_PpK6Y3sbR04WadZnpZO-wn&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fdel27-8.fna&_nc_gid=1MNWICE9oIqK5u11IH0xLg&_nc_ss=7a22e&oh=00_AQB4AUCT6vT0Em4yybCyrVzjeDdPwqzLujDfR6LSExoepA&oe=6A493B29',
'https://instagram.fdel27-8.fna.fbcdn.net/v/t51.82787-15/673185286_17865503346617418_8448388610025336181_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=104&_nc_map=urlgen_bucketless&ig_cache_key=Mzg4MDkyMzUxNDg3NDIxNjY5MjE3ODY1NTAzMzQwNjE3NDE4.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjcyMC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=NHlQMn6SJvEQ7kNvwFntVTp&_nc_oc=Adrq11_sfxZglGsulfsaCu7IuHxuovjG-iHsfi3GL04M_LEfj2QFiGbxtPQRi8T7x0ZzZPsJ4s_hypxvdOaYhiQN&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fdel27-8.fna&_nc_gid=zXWPjWzXUpELuiixm_0F-g&_nc_ss=7a22e&oh=00_AQCYdcA2-xeqpNZS2AAcYl86kUkonfSUz6pYcpnwYRBnYQ&oe=6A4935C8'
  

];

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <p className="eyebrow text-rose-600 mb-2">REAL MOMENTS</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Our Gallery</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((src, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden bg-blush">
            <img src={src} alt="" className="w-full h-fit object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
