const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background font-quicksand p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#6E59A5] mb-8">Çerez Politikası</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-[#6E59A5] mb-3">1. Çerezler Nedir?</h2>
            <p>
              Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza yerleştirilen küçük metin dosyalarıdır. 
              Bu dosyalar size daha iyi bir kullanıcı deneyimi sunmamıza, sitemizi geliştirmemize ve analiz etmemize yardımcı olur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#6E59A5] mb-3">2. Hangi Çerezleri Kullanıyoruz?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Zorunlu Çerezler:</strong> Sitemizin düzgün çalışması için gerekli olan çerezlerdir.</li>
              <li><strong>Performans Çerezleri:</strong> Sitemizin performansını ölçmek ve iyileştirmek için kullanılır.</li>
              <li><strong>İşlevsellik Çerezleri:</strong> Tercihlerinizi hatırlamak için kullanılır.</li>
              <li><strong>Hedefleme/Reklam Çerezleri:</strong> Size özelleştirilmiş içerik ve reklamlar sunmak için kullanılır.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#6E59A5] mb-3">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
            <p>
              Tarayıcınızın ayarlarından çerezleri kabul etme veya reddetme hakkına sahipsiniz. Ancak çerezleri devre dışı 
              bırakmanız durumunda web sitemizin bazı özelliklerinin düzgün çalışmayabileceğini unutmayın.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#6E59A5] mb-3">4. Çerez Politikası Güncellemeleri</h2>
            <p>
              Bu politikayı dilediğimiz zaman güncelleme hakkını saklı tutarız. Güncellemeler web sitemizde yayınlandığı 
              tarihte yürürlüğe girer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#6E59A5] mb-3">5. İletişim</h2>
            <p>
              Çerez politikamızla ilgili sorularınız için bize Instagram üzerinden ulaşabilirsiniz: 
              <a 
                href="https://www.instagram.com/arabaakademisitr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6E59A5] hover:text-[#8A6FD3] ml-1"
              >
                @arabaakademisitr
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;