
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, MoreVertical, Search, ArrowRight, Share2 } from 'lucide-react';
import { Language } from '../types';

interface AppData {
  name: string;
  developer: string;
  category: string;
  rating: number;
  ratingDistribution: number[];
  reviewsCount: string;
  downloads: string;
  size: string;
  age: string;
  description: string;
  iconColor: string;
  iconUrl: string;
  screenshots: string[];
  tags: string[];
  comments: any[];
  languageCode?: string;
}

// Map of translations for preview
const TRANSLATIONS: Record<string, any> = {
  en: { install: "Install", ads: "Contains ads", purchases: "In-app purchases", about: "About this app", ratingsReviews: "Ratings and reviews", reviews: "reviews", downloads: "Downloads", size: "Size", rating: "Rating", dataSafety: "Data safety", dataSafetyDesc: "To manage your safety, it's important to understand how developers collect and share your data.", helpful: "Helpful?", yes: "Yes", no: "No" },
  ru: { install: "Установить", ads: "Есть реклама", purchases: "Покупки в приложении", about: "Об этом приложении", ratingsReviews: "Оценки и отзывы", reviews: "отзывов", downloads: "Скачиваний", size: "Размер", rating: "Рейтинг", dataSafety: "Безопасность данных", dataSafetyDesc: "Чтобы управлять своей безопасностью, важно понимать, как разработчики собирают и передают ваши данные.", helpful: "Полезно?", yes: "Да", no: "Нет" },
  az: { install: "Quraşdır", ads: "Reklamlar var", purchases: "Tətbiqdaxili satınalmalar", about: "Bu tətbiq haqqında", ratingsReviews: "Reytinqlər və rəylər", reviews: "rəylər", downloads: "Yüklэмələr", size: "Həcm", rating: "Reytinq", dataSafety: "Məlumatların təhlükəsizliyi", dataSafetyDesc: "Təhlükəsizliyinizi idarə etmək үшін inkişaf etdiricilərin məlumatlarınızı necə topladığını anlamaq vacibdir.", helpful: "Faydalı?", yes: "Hə", no: "Yox" },
  ar: { install: "تثبيت", ads: "يحتوي على إعلانات", purchases: "عمليات شراء داخل التطبيق", about: "لمحة عن هذا التطبيق", ratingsReviews: "التقييمات والمراجعات", reviews: "مراجعة", downloads: "عمليات التنزيل", size: "الحجم", rating: "التقييم", dataSafety: "أمان البيانات", dataSafetyDesc: "لإدارة سلامتك، من المهم فهم كيفية جمع المطورين لبياناتك ومشاركتها.", helpful: "هل كان هذا مفيدًا؟", yes: "نعم", no: "لا" },
  be: { install: "Усталяваць", ads: "Утрымлівае рэкламу", purchases: "Пакупкі ў праграме", about: "Пра праграму", ratingsReviews: "Ацэнкі і водгукі", reviews: "водгукаў", downloads: "Спампоўванні", size: "Памер", rating: "Рэйтынг", dataSafety: "Бяспека даных", dataSafetyDesc: "Каб кіраваць сваёй бяспекай, важна разумець, як распрацоўшчыкі збіраюць вашы даныя.", helpful: "Карысна?", yes: "Так", no: "Не" },
  bg: { install: "Инсталиране", ads: "Съдържа реклами", purchases: "Покупки в приложението", about: "За това приложение", ratingsReviews: "Оценки и отзиви", reviews: "отзива", downloads: "Изтегляния", size: "Размер", rating: "Оценка", dataSafety: "Безопасност на данните", dataSafetyDesc: "Важно е да разберете как разработчиците събират и споделят данните ви.", helpful: "Полезно?", yes: "Да", no: "Не" },
  bn: { install: "ইন্সটল করুন", ads: "বিজ্ঞাপন রয়েছে", purchases: "অ্যাপ-মধ্যস্থ কেনাকাটা", about: "এই অ্যাপটি সম্পর্কে", ratingsReviews: "রেটিং এবং পর্যালোচনা", reviews: "পর্যালোচনা", downloads: "ডাউনলোডগুলি", size: "আকার", rating: "রেটিং", dataSafety: "ডেটা সেফটি", dataSafetyDesc: "আপনার নিরাপত্তা ম্যানেজ করার জন্য, ডেভেলপাররা কীভাবে আপনার ডেটা সংগ্রহ করে তা বোঝা জরুরি।", helpful: "সহায়ক?", yes: "হ্যাঁ", no: "না" },
  hu: { install: "Telepítés", ads: "Hirdetéseket tartalmaz", purchases: "Alkalmazáson belüli vásárlás", about: "Az alkalmazásról", ratingsReviews: "Értékelések és vélemények", reviews: "vélemény", downloads: "Letöltés", size: "Méret", rating: "Értékelés", dataSafety: "Adatbiztonság", dataSafetyDesc: "A biztonság kezeléséhez fontos megérteni, hogyan gyűjtik és osztják meg a fejlesztők az adatait.", helpful: "Hasznos?", yes: "Igen", no: "Nem" },
  vi: { install: "Cài đặt", ads: "Chứa quảng cáo", purchases: "Mua hàng trong ứng dụng", about: "Về ứng dụng này", ratingsReviews: "Xếp hạng và bài đánh giá", reviews: "bài đánh giá", downloads: "Lượt tải xuống", size: "Kích thước", rating: "Xếp hạng", dataSafety: "An toàn dữ liệu", dataSafetyDesc: "Để quản lý sự an toàn của bạn, điều quan trọng là phải hiểu cách nhà phát triển thu thập dữ liệu.", helpful: "Hữu ích?", yes: "Có", no: "Không" },
  el: { install: "Εγκατάσταση", ads: "Περιέχει διαφημίσεις", purchases: "Αγορές εντός εφαρμογής", about: "Σχετικά με την εφαρμογή", ratingsReviews: "Αξιολογήσεις και κριτικές", reviews: "κριτικές", downloads: "Λήψεις", size: "Μέγεθος", rating: "Αξιολόγηση", dataSafety: "Ασφάλεια δεδομένων", dataSafetyDesc: "Για να διαχειριστείτε την ασφάλειά σας, είναι σημαντικό να κατανοήσετε πώς συλλέγουν οι προγραμματιστές τα δεδομένα.", helpful: "Χρήσιμο;", yes: "Ναι", no: "Όχι" },
  da: { install: "Installer", ads: "Indeholder annoncer", purchases: "Køb i appen", about: "Om denne app", ratingsReviews: "Bedømmelser og anmeldelser", reviews: "anmeldelser", downloads: "Downloads", size: "Størrelse", rating: "Bedømmelse", dataSafety: "Datasikkerhed", dataSafetyDesc: "For at administrere din sikkerhed er det vigtigt at forstå, hvordan udviklere indsamler dine data.", helpful: "Nyttigt?", yes: "Ja", no: "Nej" },
  he: { install: "התקנה", ads: "מכיל מודעות", purchases: "רכישות בתוך האפליקציה", about: "מידע על האפליקציה", ratingsReviews: "דירוגים וביקורות", reviews: "ביקורות", downloads: "הורדות", size: "גודל", rating: "דירוג", dataSafety: "בטיחות נתונים", dataSafetyDesc: "כדי לנהל את הבטיחות שלך, חשוב להבין כיצד מפתחים אוספים ומשתפים את הנתונים שלך.", helpful: "מועיל?", yes: "כן", no: "לא" },
  id: { install: "Instal", ads: "Berisi iklan", purchases: "Pembelian dalam aplikasi", about: "Tentang aplikasi ini", ratingsReviews: "Rating dan ulasan", reviews: "ulasan", downloads: "Download", size: "Ukuran", rating: "Rating", dataSafety: "Keamanan data", dataSafetyDesc: "Untuk mengelola keamanan Anda, penting untuk memahami cara pengembang mengumpulkan data Anda.", helpful: "Membantu?", yes: "Ya", no: "Tidak" },
  es: { install: "Instalar", ads: "Contiene anuncios", purchases: "Compras en la aplicación", about: "Sobre esta app", ratingsReviews: "Calificaciones y opiniones", reviews: "opiniones", downloads: "Descargas", size: "Tamaño", rating: "Calificación", dataSafety: "Seguridad de los datos", dataSafetyDesc: "Para gestionar tu seguridad, es importante entender cómo los desarrolladores recopilan tus datos.", helpful: "¿Útil?", yes: "Sí", no: "No" },
  it: { install: "Installa", ads: "Contiene annunci", purchases: "Acquisti in-app", about: "Info sull'app", ratingsReviews: "Valutazioni e recensioni", reviews: "recensioni", downloads: "Download", size: "Dimensioni", rating: "Valutazione", dataSafety: "Sicurezza dei dati", dataSafetyDesc: "Per gestire la tua sicurezza, è importante capire come gli sviluppatori raccolgono i tuoi dati.", helpful: "Utile?", yes: "Sì", no: "No" },
  kk: { install: "Орнату", ads: "Жарнама бар", purchases: "Қолданба ішіндегі сауда", about: "Осы қолданба туралы", ratingsReviews: "Бағалар мен пікірлер", reviews: "пікір", downloads: "Жүктеп алынған", size: "Өлшемі", rating: "Баға", dataSafety: "Дерек қауіпсіздігі", dataSafetyDesc: "Қауіпсіздікті басқару үшін әзірлеушілердің деректеріңізді қалай жинайтынын түсіну маңызды.", helpful: "Пайдалы?", yes: "Иә", no: "Жоқ" },
  zh: { install: "安装", ads: "包含广告", purchases: "应用内购买", about: "关于此应用", ratingsReviews: "评分和评价", reviews: "条评价", downloads: "次下载", size: "大小", rating: "评分", dataSafety: "数据安全", dataSafetyDesc: "为了管理您的安全，了解开发人员如何收集和共享您的数据非常重要。", helpful: "有用吗？", yes: "是", no: "否" },
  ko: { install: "설치", ads: "광고 포함", purchases: "인앱 구매", about: "앱 정보", ratingsReviews: "평가 및 리뷰", reviews: "개 리뷰", downloads: "다운로드", size: "크기", rating: "평점", dataSafety: "데이터 보안", dataSafetyDesc: "안전을 관리하려면 개발자가 데이터를 수집하고 공유하는 방식을 이해하는 것이 중요합니다.", helpful: "유용함?", yes: "예", no: "아니요" },
  de: { install: "Installieren", ads: "Enthält Werbung", purchases: "In-App-Käufe", about: "Über diese App", ratingsReviews: "Bewertungen und Rezensionen", reviews: "Rezensionen", downloads: "Downloads", size: "Größe", rating: "Bewertung", dataSafety: "Datensicherheit", dataSafetyDesc: "Um Ihre Sicherheit zu verwalten, ist es wichtig zu verstehen, wie Entwickler Ihre Daten erheben.", helpful: "Hilfreich?", yes: "Ja", no: "Nein" },
  nl: { install: "Installeren", ads: "Bevat advertenties", purchases: "In-app aankopen", about: "Over deze app", ratingsReviews: "Beoordelingen en reviews", reviews: "reviews", downloads: "Downloads", size: "Grootte", rating: "Beoordeling", dataSafety: "Gegevensveiligheid", dataSafetyDesc: "Om uw veiligheid te beheren, ist het belangrijk te begrijpen hoe ontwikkelaars uw gegevens verzamelen.", helpful: "Nuttig?", yes: "Ja", no: "Nee" },
  no: { install: "Installer", ads: "Inneholder annonser", purchases: "Kjøp i app", about: "Om denne appen", ratingsReviews: "Vurderinger og anmeldelser", reviews: "anmeldelser", downloads: "Nedlastinger", size: "Størrelse", rating: "Vurdering", dataSafety: "Datasikkerhet", dataSafetyDesc: "For å administrere sikkerheten din er det viktig å forstå hvordan utviklere samler inn dataene dine.", helpful: "Nyttig?", yes: "Ja", no: "Nei" },
  pl: { install: "Zainstaluj", ads: "Zawiera reklamy", purchases: "Zakupy w aplikacji", about: "O tej aplikacji", ratingsReviews: "Oceny i opinie", reviews: "opinii", downloads: "Pobrań", size: "Rozmiar", rating: "Ocena", dataSafety: "Bezpieczeństwo danych", dataSafetyDesc: "Aby zarządzać swoim bezpieczeństwem, ważne jest zrozumienie, jak deweloperzy zbierają Twoje dane.", helpful: "Pomocne?", yes: "Tak", no: "Nie" },
  pt: { install: "Instalar", ads: "Contém anúncios", purchases: "Compras na aplicação", about: "Acerca desta app", ratingsReviews: "Classificações e críticas", reviews: "críticas", downloads: "Transferências", size: "Tamanho", rating: "Classificação", dataSafety: "Segurança dos dados", dataSafetyDesc: "Para gerir a sua segurança, é importante compreender como os programadores recolhem os seus dados.", helpful: "Útil?", yes: "Sim", no: "Não" },
  ro: { install: "Instalează", ads: "Conține anunțuri", purchases: "Achiziții în aplicație", about: "Despre această aplicație", ratingsReviews: "Evaluări și recenzii", reviews: "recenzii", downloads: "Descărcări", size: "Dimensiune", rating: "Evaluare", dataSafety: "Siguranța datelor", dataSafetyDesc: "Pentru a-ți gestiona siguranța, este important să înțelegi cum colectează dezvoltatorii datele tale.", helpful: "Util?", yes: "Da", no: "Nu" },
  th: { install: "ติดตั้ง", ads: "มีโฆษณา", purchases: "การซื้อในแอป", about: "เกี่ยวกับแอปนี้", ratingsReviews: "คะแนนและรีวิว", reviews: "รีวิว", downloads: "ดาวน์โหลด", size: "ขนาด", rating: "คะแนน", dataSafety: "ความปลอดภัยของข้อมูล", dataSafetyDesc: "เพื่อจัดการความปลอดภัยของคุณ สิ่งสำคัญคือต้องเข้าใจว่านักพัฒนารวบรวมข้อมูลของคุณอย่างไร", helpful: "มีประโยชน์ไหม", yes: "ใช่", no: "ไม่" },
  tr: { install: "Yükle", ads: "Reklam içerir", purchases: "Uygulama içi satın alma", about: "Bu uygulama hakkında", ratingsReviews: "Puanlar ve yorumlar", reviews: "yorum", downloads: "İndirme", size: "Boyut", rating: "Puan", dataSafety: "Veri güvenliği", dataSafetyDesc: "Güvenliğinizi yönetmek için, geliştiricilerin verilerinizi nasıl topladığını ve paylaştığını anlamak önemlidir.", helpful: "Yararlı mı?", yes: "Evet", no: "Hayır" },
  uk: { install: "Установити", ads: "Містить рекламу", purchases: "Покупки в програмі", about: "Про цю програму", ratingsReviews: "Оцінки та відгуки", reviews: "відгуків", downloads: "Завантаження", size: "Розмір", rating: "Рэйтинг", dataSafety: "Безпека даних", dataSafetyDesc: "Щоб керувати своєю безпекою, важливо розуміти, як розробники збирають ваші дані.", helpful: "Корисно?", yes: "Так", no: "Ні" },
  fi: { install: "Asenna", ads: "Sisältää mainoksia", purchases: "Ostoja sovelluksessa", about: "Tietoja sovelluksesta", ratingsReviews: "Arviot ja arvostelut", reviews: "arvostelua", downloads: "Latauskerrat", size: "Koko", rating: "Arvio", dataSafety: "Tietoturvallisuus", dataSafetyDesc: "Turvallisuutesi hallitsemiseksi on tärkeää ymmärtää, miten kehittäjät keräävät tietojasi.", helpful: "Hyödyllinen?", yes: "Kyllä", no: "Ei" },
  fr: { install: "Installer", ads: "Contient des annonces", purchases: "Achats via l'application", about: "À propos de l'appli", ratingsReviews: "Notes et avis", reviews: "avis", downloads: "Téléchargements", size: "Taille", rating: "Note", dataSafety: "Sécurité des données", dataSafetyDesc: "Pour gérer votre sécurité, est important de comprendre comment les développeurs collectent vos données.", helpful: "Utile ?", yes: "Oui", no: "Non" },
  hi: { install: "इंस्टॉल करें", ads: "विज्ञापन शामिल हैं", purchases: "इन-ऐप खरीदारी", about: "इस ऐप्लिकेशन के बारे में", ratingsReviews: "रेटिंग और समीक्षाएं", reviews: "समीक्षाएं", downloads: "डाउनलोड", size: "आकार", rating: "रेटिंग", dataSafety: "डेटा सुरक्षा", dataSafetyDesc: "अपनी सुरक्षा प्रबंधित करने के लिए, यह समझना महत्वपूर्ण है कि डेवलपर आपका डेटा कैसे एकत्र करते हैं।", helpful: "फ़ायदेमंद?", yes: "हां", no: "नहीं" },
  hr: { install: "Instaliraj", ads: "Sadrži oglase", purchases: "Kupnja u aplikaciji", about: "O aplikaciji", ratingsReviews: "Ocjene i recenzije", reviews: "recenzija", downloads: "Preuzimanja", size: "Veličina", rating: "Ocjena", dataSafety: "Sigurnost podataka", dataSafetyDesc: "Da biste upravljali svojom sigurnošću, važno je razumjeti kako razvojni programeri prikupljaju vaše podatke.", helpful: "Korisno?", yes: "Da", no: "Ne" },
  cs: { install: "Nainstalovat", ads: "Obsahuje reklamy", purchases: "Nákupy v aplikaci", about: "O aplikaci", ratingsReviews: "Hodnocení a recenze", reviews: "recenzí", downloads: "Stažení", size: "Velikost", rating: "Hodnocení", dataSafety: "Bezpečnost údajů", dataSafetyDesc: "Pro správu vaší bezpečnosti je důležité pochopit, jak vývojáři shromažďují vaše údaje.", helpful: "Užitečné?", yes: "Ano", no: "Ne" },
  sv: { install: "Installera", ads: "Innehåller annonser", purchases: "Køp i appen", about: "Om appen", ratingsReviews: "Betyg och recensioner", reviews: "recensioner", downloads: "Nedladdningar", size: "Storlek", rating: "Betyg", dataSafety: "Datasäkerhet", dataSafetyDesc: "För att hantera din säkerhet är det viktigt att förstå hur utvecklare samlar in dina data.", helpful: "Användbart?", yes: "Ja", no: "Nej" },
  ja: { install: "インストール", ads: "広告を含む", purchases: "アプリ内課金あり", about: "このアプリについて", ratingsReviews: "評価とレビュー", reviews: "件のレビュー", downloads: "ダウンロード数", size: "サイズ", rating: "評価", dataSafety: "データの安全性", dataSafetyDesc: "安全性を管理するには、デベロッパーがデータをどのように収集するかを理解することが重要です。", helpful: "役に立ちましたか？", yes: "はい", no: "いいえ" },
};

export const PreviewPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('pwa-preview-data');
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse preview data", e);
      }
    }
  }, []);

  if (!data) return <div className="p-10 text-center">Loading preview...</div>;

  const langCode = data.languageCode || 'en';
  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en'];

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans max-w-[500px] mx-auto shadow-xl relative pb-20">
      {/* Header */}
      <div className="p-4 flex items-center justify-between sticky top-0 bg-white z-20 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.hash = ''} className="p-1 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div className="flex items-center gap-3">
            {data.iconUrl ? (
              <img src={data.iconUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              <div className={`w-8 h-8 rounded-lg ${data.iconColor} flex items-center justify-center text-[6px] text-white font-bold`}>
                APP
              </div>
            )}
            <span className="font-medium text-gray-900 truncate max-w-[150px]">{data.name}</span>
          </div>
        </div>
        <div className="flex gap-4 text-gray-700">
          <Search size={24} />
          <MoreVertical size={24} />
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex gap-6 mb-8">
          {data.iconUrl ? (
            <img src={data.iconUrl} alt="App Icon" className="w-24 h-24 rounded-2xl object-cover shadow-lg flex-shrink-0" />
          ) : (
            <div className={`w-24 h-24 rounded-2xl ${data.iconColor} flex items-center justify-center text-white text-xs font-bold text-center leading-tight shadow-lg flex-shrink-0`}>
              {data.name}
            </div>
          )}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{data.name}</h1>
            <div className="text-base text-green-700 font-medium mb-1">{data.developer}</div>
            <div className="text-sm text-gray-500">{t.ads}</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center mb-8 px-2 overflow-x-auto no-scrollbar gap-8">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="flex items-center gap-1 font-bold text-gray-800 text-base">
              {data.rating} <Star size={14} fill="currentColor" />
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">{data.reviewsCount} {t.reviews}</div>
          </div>
          <div className="w-[1px] h-8 bg-gray-200 flex-shrink-0"></div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="font-bold text-gray-800 text-base">{data.size}</div>
            <div className="text-xs text-gray-500">{t.size}</div>
          </div>
          <div className="w-[1px] h-8 bg-gray-200 flex-shrink-0"></div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="font-bold text-gray-800 text-base">{data.age}</div>
            <div className="text-xs text-gray-500">{t.rating}</div>
          </div>
          <div className="w-[1px] h-8 bg-gray-200 flex-shrink-0"></div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="font-bold text-gray-800 text-base">{data.downloads}</div>
            <div className="text-xs text-gray-500">{t.downloads}</div>
          </div>
        </div>

        {/* Install Button */}
        <button className="w-full bg-[#01875f] hover:bg-[#01704e] text-white py-3 rounded-xl font-bold text-base shadow-md mb-8 transition-colors">
          {t.install}
        </button>

        {/* Screenshots */}
        {data.screenshots && data.screenshots.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-6 -mx-6 px-6 no-scrollbar mb-6">
            {data.screenshots.map((src, i) => (
              <img key={i} src={src} className="w-40 h-72 object-cover rounded-xl bg-gray-100 flex-shrink-0 shadow-sm" alt={`screenshot-${i}`} />
            ))}
          </div>
        )}

        {/* Description Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4 cursor-pointer">
            <h3 className="font-bold text-gray-900 text-lg">{t.about}</h3>
            <ArrowRight className="text-gray-500" size={24} />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {data.description?.replace(/\*\*/g, '')}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {data.tags?.map((tag, i) => (
              <span key={i} className="text-xs px-4 py-1.5 border border-gray-200 rounded-full text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">{tag}</span>
            ))}
          </div>
        </div>

        {/* Data Safety Section */}
        <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-3 cursor-pointer">
            <h3 className="font-bold text-gray-900 text-lg">{t.dataSafety}</h3>
            <ArrowRight className="text-gray-500" size={24} />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {t.dataSafetyDesc}
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <Share2 size={20} className="text-gray-600 mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-700 font-medium">
                This app may share these data types with third parties
              </div>
            </div>
          </div>
        </div>

        {/* Ratings and Reviews Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6 cursor-pointer">
            <h3 className="font-bold text-gray-900 text-lg">{t.ratingsReviews}</h3>
            <ArrowRight className="text-gray-500" size={24} />
          </div>

          {/* Ratings Summary */}
          <div className="flex items-center gap-8 mb-10">
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold text-gray-900">{data.rating}</span>
              <div className="flex text-gray-900 gap-1 mt-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill={i <= Math.round(data.rating) ? "currentColor" : "none"} className={i <= Math.round(data.rating) ? "text-green-800" : "text-gray-200"} />)}
              </div>
              <div className="text-xs text-gray-500 mt-2 font-medium">{data.reviewsCount} {t.reviews}</div>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((r, i) => (
                <div key={r} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-500 w-2">{r}</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#01875f] rounded-full" style={{ width: `${data.ratingDistribution?.[i] || 0}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-8">
            {data.comments?.map((comment) => (
              <div key={comment.id} className="pb-8 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                      {comment.avatarUrl ? (
                        <img src={comment.avatarUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} alt="" className="w-full h-full" />
                      )}
                    </div>
                    <div className="text-sm font-bold text-gray-900">{comment.user}</div>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                    <MoreVertical size={20} className="text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < comment.rating ? "#1F2937" : "none"} className={i < comment.rating ? "text-gray-900" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{comment.date}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {comment.text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    {t.helpful} <span className="font-bold border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">{t.yes}</span>
                    <span className="font-bold border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">{t.no}</span>
                  </div>
                  {comment.likes > 0 && <span className="text-xs text-gray-400">{comment.likes} people found this helpful</span>}
                </div>

                {comment.developerResponse && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 ml-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-xs text-gray-900 uppercase tracking-wider">Response from developer</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic">
                      {comment.developerResponse}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
