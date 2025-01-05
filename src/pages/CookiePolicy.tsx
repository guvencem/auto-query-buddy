import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CookiePolicy = () => {
  const navigate = useNavigate();

  return (
    <Dialog open={true} onOpenChange={() => navigate("/")}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Kapat</span>
        </DialogClose>
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            İNTERNET SİTESİ KULLANIMI KAPSAMINDA ÇEREZ BİLGİLENDİRME METNİ ve GİZLİLİK
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4 text-foreground">
          <p className="mb-6">
            ARABA AKADEMİSİ ("Araba Akademisi" veya "Şirket") olarak, siz değerli ziyaretçilerimizin www.arabaakademisi.com ("Site") adresine yapmış olduğu ziyaretlerdeki kişisel verilerinizin 6698 sayılı KİŞİSEL VERİLERİN KORUNMASI KANUNU ("Kanun") ve ikincil düzenlemelerine uygun olarak işlenmesi ve korunması için azami hassasiyeti göstermekteyiz. Bu kapsamda sizleri, işbu "İnternet Sitesi Kullanımı Kapsamında Çerez Bilgilendirme Metni ve Gizlilik" ile internet sitemizin operasyonu kapsamında uyulması gereken genel ilkeler, kullandığımız çerezler ve bu vasıtayla işlenen kişisel verileriniz hakkında bilgilendirmek isteriz.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Gizlilik ve Bilgi Güvenliği</h2>
          
          <div className="space-y-4">
            <p>
              a. www.arabaakademisi.com adresinde verilen bilgiler, "olduğu gibi" ve "mevcut olduğu şekilde" sağlanmaktadır. Araba Akademisi, bu bilgilerin doğruluklarını, yeterliliklerini ve eksiksizliklerini garanti etmemekte ve bu bilgilerdeki hatalar ya da eksiklikler nedeniyle sorumluluğu reddetmektedir.
            </p>
            
            <p>
              b. Araba Akademisi, bilgilerinize yönelik yetkisiz erişimlerin engellenmesi için gerekli teknik ve idari tedbirleri almaktadır.
            </p>
            
            <p>
              c. Site'miz zaman zaman üçüncü taraf sitelere yönlendirme linkleri içerebilir. Bu metinde yer alan taahhütler sadece www.arabaakademisi.com adresi için geçerlidir.
            </p>
            
            <p>
              d. Site kullanımı esnasında genel ahlak kurallarına aykırı, yasalara aykırı ya da 3. kişilerin haklarını ihlal edici içerikler paylaşılmaması gereklidir.
            </p>
            
            <p>
              e. Araba Akademisi ile aranızda çıkabilecek her türlü uyuşmazlıkta Araba Akademisi'nin kayıt ve belgeleri Hukuk Muhakemeleri Kanunu uyarınca kesin delil teşkil eder.
            </p>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Hangi Çerez Türlerini Kullanmaktayız?</h2>
          
          <p className="mb-4">
            Sitemizi ziyaret ettiğinizde, cihazınızda bazı bilgilendirme dosyaları (çerezler) oluşturulabilir. Sitemizde kullandığımız çerez türleri ve amaçları şu şekildedir:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Zorunlu Çerezler:</strong> Site'nin doğru şekilde çalışması için kullanılır.</li>
            <li><strong>Analitik Çerezler:</strong> Ziyaretçi sayısını belirleme, sayfa görüntüleme oranları gibi istatistiksel bilgiler için kullanılır.</li>
            <li><strong>Performans Çerezleri:</strong> Site'nin hızı ve performansı ile ilgili bilgilerin toplanmasına yardımcı olur.</li>
            <li><strong>Hedefleme/Reklam Çerezleri:</strong> Kullanıcı deneyimini ve reklam görüntüleme kalitesini iyileştirmek için kullanılır.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">Çerezlerin Yönetimi</h2>
          
          <p className="mb-4">
            Tarayıcınızdan çerez ayarlarınızı düzenleyebilirsiniz. Ancak tüm çerezlerin engellenmesi halinde, sitemizin bazı fonksiyonlarının doğru çalışmayabileceğini unutmayın.
          </p>

          <p className="font-semibold mb-2">Tarayıcı Ayarları:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Microsoft Edge</li>
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Safari</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">Kişisel Verilerinizin Güvenliği</h2>
          
          <p className="mb-6">
            Toplanan kişisel veriler, 6698 sayılı Kanun'a uygun olarak korunmakta ve Şirketimiz tarafından gerekli teknik ve idari tedbirlerle güvence altına alınmaktadır.
          </p>

          <p className="mb-6">
            Herhangi bir sorunuz olması halinde bizimle info@arabaakademisi.com adresinden iletişime geçebilirsiniz.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Bu metin, 05.01.2025 tarihinde güncellenmiştir.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => navigate("/")} variant="outline">
            Kapat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookiePolicy;