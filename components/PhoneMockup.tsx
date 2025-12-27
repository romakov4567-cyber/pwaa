
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Star, ArrowLeft, MoreVertical, Search, Share2 } from 'lucide-react';

interface PhoneMockupProps {
    data: {
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
        screenshots?: string[];
        tags: string[];
        comments: any[];
        languageCode?: string;
    }
}

// Map of translations for preview
const TRANSLATIONS: Record<string, any> = {
    en: { install: "Install", ads: "Contains ads", purchases: "In-app purchases", about: "About this app", ratingsReviews: "Ratings and reviews", reviews: "reviews", downloads: "Downloads", size: "Size", rating: "Rating", dataSafety: "Data safety", dataSafetyDesc: "To manage your safety, it's important to understand how developers collect and share your data.", helpful: "Helpful?", yes: "Yes", no: "No" },
    ru: { install: "Установить", ads: "Есть реклама", purchases: "Покупки в приложении", about: "Об этом приложении", ratingsReviews: "Оценки и отзывы", reviews: "отзывов", downloads: "Скачиваний", size: "Размер", rating: "Рейтинг", dataSafety: "Безопасность данных", dataSafetyDesc: "Чтобы управлять своей безопасностью, важно понимать, как разработчики собирают и передают ваши данные.", helpful: "Полезно?", yes: "Да", no: "Нет" },
    az: { install: "Quraşdır", ads: "Reklamlar var", purchases: "Tətbiqdaxili satınalmalar", about: "Bu tətbiq haqqında", ratingsReviews: "Reytinqlər və rəylər", reviews: "rəylər", downloads: "Yükləmələr", size: "Həcm", rating: "Reytinq", dataSafety: "Məlumatların təhlükəsizliyi", dataSafetyDesc: "Təhlükəsizliyinizi idarə etmək üçün inkişaf etdiricilərin məlumatlarınızı necə topladığını anlamaq vacibdir.", helpful: "Faydalı?", yes: "Hə", no: "Yox" },
    ar: { install: "تثبيت", ads: "يحتوي على إعلانات", purchases: "عمليات شراء داخل التطبيق", about: "لمحة عن هذا التطبيق", ratingsReviews: "التقييمات والمراجعات", reviews: "مراجعة", downloads: "عمليات التنزيل", size: "الحجم", rating: "التقييم", dataSafety: "أمان البيانات", dataSafetyDesc: "لإدارة سلامتك، من المهم فهم كيفية جمع المطورين لبياناتك ومشاركتها.", helpful: "هل كان هذا مفيدًا؟", yes: "نعم", no: "لا" },
    be: { install: "Усталяваць", ads: "Утрымлівае рэкламу", purchases: "Пакупкі ў праграме", about: "Пра праграму", ratingsReviews: "Ацэнкі і водгукі", reviews: "водгукаў", downloads: "Спампоўванні", size: "Памер", rating: "Рэйтынг", dataSafety: "Бяспека даных", dataSafetyDesc: "Каб кіраваць сваёй бяспекай, важна разумець, як распрацоўшчыкі збіраюць вашы даныя.", helpful: "Карысна?", yes: "Так", no: "Не" },
    bg: { install: "Инсталиране", ads: "Съдържа реклами", purchases: "Покупки в приложението", about: "За това приложение", ratingsReviews: "Оценки и отзиви", reviews: "отзива", downloads: "Изтегляния", size: "Размер", rating: "Оценка", dataSafety: "Безопасност на данните", dataSafetyDesc: "Важно е да разберете как разработчиците събират и споделят данните ви.", helpful: "Полезно?", yes: "Да", no: "Не" },
    bn: { install: "ইন্সটল করুন", ads: "বিজ্ঞাপন রয়েছে", purchases: "অ্যাপ-মধ্যস্থ কেনাকাটা", about: "এই অ্যাপটি সম্পর্কে", ratingsReviews: "রেটিং এবং পর্যালোচনা", reviews: "পর্যালোচনা", downloads: "ডাউনলোডগুলি", size: "আকার", rating: "রেটিং", dataSafety: "ডেটা সেфটি", dataSafetyDesc: "আপনার নিরাপত্তা ম্যানেজ করার জন্য, ডেভেলপাররা কীভাবে আপনার ডেটা সংগ্রহ করে তা বোঝা জরুরি।", helpful: "সহায়ক?", yes: "হ্যাঁ", no: "না" },
    hu: { install: "Telepítés", ads: "Hirdetéseket tartalmaz", purchases: "Alkalmazáson belüli vásárlás", about: "Az alkalmazásról", ratingsReviews: "Értékelések и vélemények", reviews: "vélemény", downloads: "Letöltés", size: "Méret", rating: "Értékelés", dataSafety: "Adatbiztonság", dataSafetyDesc: "A biztonság kezeléséhez fontos megérteni, hogyan gyűjtik és osztják meg a fejlesztők az adatait.", helpful: "Hasznos?", yes: "Igen", no: "Nem" },
    vi: { install: "Cài đặt", ads: "Chứa quảng cáo", purchases: "Mua hàng trong ứng dụng", about: "Về ứng dụng này", ratingsReviews: "Xếp hạng và bài đánh giá", reviews: "bài đánh giá", downloads: "Lượt tải xuống", size: "Kích thước", rating: "Xếp hạng", dataSafety: "An toàn dữ liệu", dataSafetyDesc: "Để quản lý sự an toàn của bạn, điều quan trọng là phải hiểu cách nhà phát triển thu thập dữ liệu.", helpful: "Hữu ích?", yes: "Có", no: "Không" },
    el: { install: "Εγκατάσταση", ads: "Περιέχει διαφημίσεις", purchases: "Αγορές εντός εφαρμογής", about: "Σχετικά με την εφαρμογή", ratingsReviews: "Αξιολογήσεις και κριτικές", reviews: "κριτικές", downloads: "Λήψεις", size: "Μέγεθος", rating: "Αξιολόγηση", dataSafety: "Ασφάλεια δεδομένων", dataSafetyDesc: "Για να διαχειριστείτε την ασφάλειά σας, είναι σημαντικό να κατανοήσετε πώς συλλέγουν οι προγραμματιστές τα δεδομένα.", helpful: "Χρήσιμο;", yes: "Ναι", no: "Όχι" },
    da: { install: "Installer", ads: "Indeholder annoncer", purchases: "Køb i appen", about: "Om denne app", ratingsReviews: "Bedømmelser og anmeldelser", reviews: "anmeldelser", downloads: "Downloads", size: "Størrelse", rating: "Bedømmelse", dataSafety: "Datasikkerhed", dataSafetyDesc: "For at administrere din sikkerhed er det vigtigt at forstå, hvordan udviklere indsamler dine data.", helpful: "Nyttigt?", yes: "Ja", no: "Nej" },
    he: { install: "התקנה", ads: "מכיל מודעות", purchases: "רכישות בתוך האפلیקציה", about: "מידע על האפליקציה", ratingsReviews: "דירוגים וביקורות", reviews: "ביקורות", downloads: "הורדות", size: "גודל", rating: "דירוג", dataSafety: "בטיחות נתונים", dataSafetyDesc: "כדי לנהל את הבטיחות שלך, חשוב להבין כיצד מפתחים אוספים ומשתפים את הנתונים שלך.", helpful: "מועיל?", yes: "כן", no: "לא" },
    id: { install: "Instal", ads: "Berisi iklan", purchases: "Pembelian dalam aplikasi", about: "Tentang aplikasi ini", ratingsReviews: "Rating dan ulasan", reviews: "ulasan", downloads: "Download", size: "Ukuran", rating: "Rating", dataSafety: "Keamanan data", dataSafetyDesc: "Untuk mengelola keamanan Anda, penting untuk memahami cara pengembang mengumpulkan data Anda.", helpful: "Membantu?", yes: "Ya", no: "Tidak" },
    es: { install: "Instalar", ads: "Contiene anuncios", purchases: "Compras en la aplicación", about: "Sobre esta app", ratingsReviews: "Calificaciones y opiniones", reviews: "opiniones", downloads: "Descargas", size: "Tamaño", rating: "Calificación", dataSafety: "Seguridad de los datos", dataSafetyDesc: "Para gestionar tu seguridad, es importante entender cómo los desarrolladores recopilan tus datos.", helpful: "¿Útil?", yes: "Sí", no: "No" },
    it: { install: "Installa", ads: "Contiene annunci", purchases: "Acquisti in-app", about: "Info sull'app", ratingsReviews: "Valutazioni e recensioni", reviews: "recensioni", downloads: "Download", size: "Dimensioni", rating: "Valutazione", dataSafety: "Sicurezza dei dati", dataSafetyDesc: "Per gestire la tua sicurezza, è importante capire come gli sviluppatori raccolgono i tuoi dati.", helpful: "Utile?", yes: "Sì", no: "No" },
    kk: { install: "Орнату", ads: "Жарнама бар", purchases: "Қолданба ішіндегі сауда", about: "Осы қолданба туралы", ratingsReviews: "Бағалар мен пікірлер", reviews: "пікір", downloads: "Жүктеп алынған", size: "Өлшемі", rating: "Баға", dataSafety: "Дерек қауіпсіздігі", dataSafetyDesc: "Қауіпсіздікті басқару үшін әзірлеушілердің деректеріңізді қалай жинайтынын түсіну маңызды.", helpful: "Пайдалы?", yes: "Иә", no: "Жоқ" },
    zh: { install: "安装", ads: "包含广告", purchases: "应用内购买", about: "关于此应用", ratingsReviews: "评分和评价", reviews: "条评价", downloads: "次下载", size: "大小", rating: "评分", dataSafety: "数据安全", dataSafetyDesc: "为了管理您的安全，了解开发人员如何收集和共享您的数据非常重要。", helpful: "有用吗？", yes: "是", no: "否" },
    ko: { install: "설치", ads: "광고 포함", purchases: "인앱 구매", about: "앱 정보", ratingsReviews: "평가 및 리뷰", reviews: "개 리뷰", downloads: "다운로드", size: "크기", rating: "평점", dataSafety: "데이터 보안", dataSafetyDesc: "안전을 관리하려면 개발자가 데이터를 수집하고 공유하는 방식을 이해하는 것이 중요합니다.", helpful: "유용함?", yes: "예", no: "아니요" },
    de: { install: "Installieren", ads: "Enthält Werbung", purchases: "In-App-Käufe", about: "Über diese App", ratingsReviews: "Bewertungen und Rezensionen", reviews: "Rezensionen", downloads: "Downloads", size: "Größe", rating: "Bewertung", dataSafety: "Datensicherheit", dataSafetyDesc: "Um Ihre Sicherheit zu verwalten, ist es wichtig zu verstehen, wie Entwickler Ihre Daten erheben.", helpful: "Hilfreich?", yes: "Ja", no: "Nein" },
    nl: { install: "Installeren", ads: "Bevat advertenties", purchases: "In-app aankopen", about: "Over deze app", ratingsReviews: "Beoordelingen en reviews", reviews: "reviews", downloads: "Downloads", size: "Grootte", rating: "Beoordeling", dataSafety: "Gegevensveiligheid", dataSafetyDesc: "Om uw veiligheid te beheren, is het belangrijk te begrijpen hoe ontwikkelaars uw gegevens verzamelen.", helpful: "Nuttig?", yes: "Ja", no: "Nee" },
    no: { install: "Installer", ads: "Inneholder annonser", purchases: "Kjøp i app", about: "Om denne appen", ratingsReviews: "Vurderinger og anmeldelser", reviews: "anmeldelser", downloads: "Nedlastinger", size: "Størrelse", rating: "Vurdering", dataSafety: "Datasikkerhet", dataSafetyDesc: "For å administrere sikkerheten din er det viktig å forstå hvordan utviklere samler inn dataene dine.", helpful: "Nyttig?", yes: "Ja", no: "Nei" },
    pl: { install: "Zainstaluj", ads: "Zawiera reklamy", purchases: "Zakupy w aplikacji", about: "O tej aplikacji", ratingsReviews: "Oceny i opinie", reviews: "opinii", downloads: "Pobrań", size: "Rozmiar", rating: "Ocena", dataSafety: "Bezpieczeństwo danych", dataSafetyDesc: "Aby zarządzać swoim bezpieczeństwem, ważne jest zrozumienie, jak deweloperzy zbierają Twoje dane.", helpful: "Pomocne?", yes: "Tak", no: "Nie" },
    pt: { install: "Instalar", ads: "Contém anúncios", purchases: "Compras na aplicação", about: "Acerca desta app", ratingsReviews: "Classificações e críticas", reviews: "críticas", downloads: "Transferências", size: "Tamanho", rating: "Classificação", dataSafety: "Segurança dos dados", dataSafetyDesc: "Para gerir a sua segurança, é importante compreender como os programadores recolhem os seus dados.", helpful: "Útil?", yes: "Sim", no: "Não" },
    ro: { install: "Instalează", ads: "Conține anunțuri", purchases: "Achiziții în aplicație", about: "Despre această aplicație", ratingsReviews: "Evaluări și recenzii", reviews: "recenzii", downloads: "Descărcări", size: "Dimensiune", rating: "Evaluare", dataSafety: "Siguranța datelor", dataSafetyDesc: "Pentru a-ți gestiona siguranța, este important să înțelegi cum colectează dezvoltatorii datele tale.", helpful: "Util?", yes: "Da", no: "Nu" },
    th: { install: "ติดตั้ง", ads: "มีโฆษณา", purchases: "การซื้อในแอป", about: "เกี่ยวกับแอปนี้", ratingsReviews: "คะแนนและรีวิว", reviews: "รีวิว", downloads: "ดาวน์โหลด", size: "ขนาด", rating: "คะแนน", dataSafety: "ความปลอดภัยของข้อมูล", dataSafetyDesc: "เพื่อจัดการความปลอดภัยของคุณ สิ่งสำคัญคือต้องเข้าใจว่านักพัฒนารวบรวมข้อมูลของคุณอย่างไร", helpful: "มีประโยชน์ไหม", yes: "ใช่", no: "ไม่" },
    tr: { install: "Yükle", ads: "Reklam içerir", purchases: "Uygulama içi satın alma", about: "Bu uygulama hakkında", ratingsReviews: "Puanlar ve yorumlar", reviews: "yorum", downloads: "İndirme", size: "Boyut", rating: "Puan", dataSafety: "Veri güvenliği", dataSafetyDesc: "Güvenliğinizi yönetmek için, geliştiricilerin verilerinizi nasıl topladığını ve paylaştığını anlamak önemlidir.", helpful: "Yararlı mı?", yes: "Evet", no: "Hayır" },
    uk: { install: "Установити", ads: "Містить рекламу", purchases: "Покупки в програмі", about: "Про цю програму", ratingsReviews: "Оцінки та відгуки", reviews: "відгуків", downloads: "Завантаження", size: "Розмір", rating: "Рэйтинг", dataSafety: "Безпека даних", dataSafetyDesc: "Щоб керувати своєю безпекою, важливо розуміти, як розробники збирають ваші дані.", helpful: "Корисно?", yes: "Так", no: "Ні" },
    fi: { install: "Asenna", ads: "Sisältää mainoksia", purchases: "Ostoja sovelluksessa", about: "Tietoja sovelluksesta", ratingsReviews: "Arviot ja arvostelut", reviews: "arvostelua", downloads: "Latauskerrat", size: "Koko", rating: "Arvio", dataSafety: "Tietoturvallisuus", dataSafetyDesc: "Turvallisuutesi hallitsemiseksi on tärkeää ymmärtää, miten kehittäjät keräävät tietojasi.", helpful: "Hyödyllinen?", yes: "Kyllä", no: "Ei" },
    fr: { install: "Installer", ads: "Contient des annonces", purchases: "Achats via l'application", about: "À propos de l'appli", ratingsReviews: "Notes et avis", reviews: "avis", downloads: "Téléchargements", size: "Taille", rating: "Note", dataSafety: "Sécurité des données", dataSafetyDesc: "Pour gérer votre sécurité, il est important de comprendre comment les développeurs collectent vos données.", helpful: "Utile ?", yes: "Oui", no: "Non" },
    hi: { install: "इंस्टॉल करें", ads: "विज्ञापन शामिल हैं", purchases: "इन-ऐप खरीदारी", about: "इस ऐप्लिकेशन के बारे में", ratingsReviews: "रेटिंग और समीक्षाएं", reviews: "समीक्षाएं", downloads: "डाउनलोड", size: "आकार", rating: "रेटिंग", dataSafety: "डेटा सुरक्षा", dataSafetyDesc: "अपनी सुरक्षा प्रबंधित करने के लिए, यह समझना महत्वपूर्ण है कि डेवलपर आपका डेटा कैसे एकत्र करते हैं।", helpful: "फ़ायदेमंद?", yes: "हां", no: "नहीं" },
    hr: { install: "Instaliraj", ads: "Sadrži oglase", purchases: "Kupnja u aplikaciji", about: "O aplikaciji", ratingsReviews: "Ocjene i recenzije", reviews: "recenzija", downloads: "Preuzimanja", size: "Veličina", rating: "Ocjena", dataSafety: "Sigurnost podataka", dataSafetyDesc: "Da biste upravljali svojom sigurnošću, važno je razumjeti kako razvojni programeri prikupljaju vaše podatke.", helpful: "Korisno?", yes: "Da", no: "Ne" },
    cs: { install: "Nainstalovat", ads: "Obsahuje reklamy", purchases: "Nákupy v aplikaci", about: "O aplikaci", ratingsReviews: "Hodnocení a recenze", reviews: "recenzí", downloads: "Stažení", size: "Velikost", rating: "Hodnocení", dataSafety: "Bezpečnost údajů", dataSafetyDesc: "Pro správu vaší bezpečnosti je důležité pochopit, jak vývojáři shromažďují vaše údaje.", helpful: "Užitečné?", yes: "Ano", no: "Ne" },
    sv: { install: "Installera", ads: "Innehåller annonser", purchases: "Köp i appen", about: "Om appen", ratingsReviews: "Betyg och recensioner", reviews: "recensioner", downloads: "Nedladdningar", size: "Storlek", rating: "Betyg", dataSafety: "Datasäkerhet", dataSafetyDesc: "För att hantera din säkerhet är det viktigt att förstå hur utvecklare samlar in dina data.", helpful: "Användbart?", yes: "Ja", no: "Nej" },
    ja: { install: "インストール", ads: "広告を含む", purchases: "アプリ内課金あり", about: "このアプリについて", ratingsReviews: "評価とレビュー", reviews: "件のレビュー", downloads: "ダウンロード数", size: "サイズ", rating: "評価", dataSafety: "データの安全性", dataSafetyDesc: "安全性を管理するには、デベロッパーがデータをどのように収集するかを理解することが重要です。", helpful: "役に立ちましたか？", yes: "はい", no: "いいえ" },
};

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ data }) => {
  const langCode = data.languageCode || 'en';
  // Fallback to English if translation missing
  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en'];

  return (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
        <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative overflow-y-auto no-scrollbar">
            
            {/* Play Store Header */}
            <div className="p-4 flex items-center justify-between sticky top-0 bg-white z-20">
                <ArrowLeft size={20} className="text-gray-700" />
                <div className="flex gap-4 text-gray-700">
                    <Search size={20} />
                    <MoreVertical size={20} />
                </div>
            </div>

            {/* App Header Info */}
            <div className="px-5 pb-6">
                <div className="flex gap-4 mb-6">
                     {data.iconUrl ? (
                        <img src={data.iconUrl} alt="App Icon" className="w-16 h-16 rounded-xl object-cover shadow-md flex-shrink-0" />
                     ) : (
                        <div className={`w-16 h-16 rounded-xl ${data.iconColor} flex items-center justify-center text-white text-[10px] font-bold text-center leading-tight shadow-md flex-shrink-0`}>
                            SWEET<br/>BANANZA<br/>1000
                        </div>
                     )}
                     <div className="flex-1">
                         <h2 className="text-lg font-semibold text-gray-900 leading-tight mb-1">{data.name}</h2>
                         <div className="text-sm text-green-700 font-medium mb-1">{data.developer}</div>
                         <div className="text-xs text-gray-500">{t.ads}</div>
                     </div>
                </div>

                {/* Stats Row */}
                <div className="flex justify-between items-center mb-6 px-2 border-r border-gray-100 last:border-0">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 font-bold text-gray-800 text-sm">
                            {data.rating} <Star size={10} fill="currentColor" />
                        </div>
                        <div className="text-[10px] text-gray-500">{data.reviewsCount} {t.reviews}</div>
                    </div>
                    <div className="w-[1px] h-6 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        <div className="font-bold text-gray-800 text-sm">{data.size}</div>
                        <div className="text-[10px] text-gray-500">{t.size}</div>
                    </div>
                     <div className="w-[1px] h-6 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        <div className="font-bold text-gray-800 text-sm">{data.age}</div>
                        <div className="text-[10px] text-gray-500">{t.rating}</div>
                    </div>
                    <div className="w-[1px] h-6 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        <div className="font-bold text-gray-800 text-sm">{data.downloads}</div>
                        <div className="text-[10px] text-gray-500">{t.downloads}</div>
                    </div>
                </div>

                {/* Install Button */}
                <button className="w-full bg-[#01875f] text-white py-2 rounded-lg font-medium text-sm shadow-sm mb-6">
                    {t.install}
                </button>

                 {/* Screenshots */}
                 {data.screenshots && data.screenshots.length > 0 && (
                     <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar mb-4">
                         {data.screenshots.map((src, i) => (
                             <img key={i} src={src} className="w-24 h-40 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                         ))}
                     </div>
                 )}

                 {/* Description Preview */}
                 <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2 text-sm flex justify-between items-center">
                        {t.about} <ArrowLeft className="rotate-180 text-gray-500" size={16} />
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                        {data.description?.replace(/\*\*/g, '')}
                    </p>
                    <div className="flex gap-2 mt-3 overflow-hidden">
                        {data.tags?.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 border border-gray-300 rounded-full text-gray-600 whitespace-nowrap">{tag}</span>
                        ))}
                    </div>
                 </div>

                 {/* Data Safety */}
                 <div className="mb-6">
                     <h3 className="font-medium text-gray-900 mb-2 text-sm flex justify-between items-center">
                        {t.dataSafety} <ArrowLeft className="rotate-180 text-gray-500" size={16} />
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                        {t.dataSafetyDesc}
                    </p>
                    <div className="mt-3 bg-white border border-gray-100 rounded-lg p-3 space-y-3">
                         <div className="flex gap-4">
                            <Share2 size={16} className="text-gray-600 flex-shrink-0" />
                            <div className="text-[10px] text-gray-600">
                                This app may share these data types with third parties
                            </div>
                         </div>
                    </div>
                 </div>

                 {/* Reviews Preview */}
                 <div>
                     <h3 className="font-medium text-gray-900 mb-4 text-sm flex justify-between items-center">
                        {t.ratingsReviews} <ArrowLeft className="rotate-180 text-gray-500" size={16} />
                     </h3>

                     {/* Ratings Summary */}
                     <div className="flex items-center gap-4 mb-6">
                        <div className="flex flex-col items-center">
                             <span className="text-4xl font-medium text-gray-900">{data.rating}</span>
                             <div className="flex text-gray-900 text-[8px] gap-0.5 mt-1">
                                 {[1,2,3,4,5].map(i => <Star key={i} size={8} fill={i <= Math.round(data.rating) ? "currentColor" : "none"} className={i <= Math.round(data.rating) ? "" : "text-gray-300"} />)}
                             </div>
                             <div className="text-[10px] text-gray-500 mt-0.5">{data.reviewsCount}</div>
                        </div>
                        <div className="flex-1 space-y-1">
                             {[5,4,3,2,1].map((r, i) => (
                                  <div key={r} className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold text-gray-500 w-1.5">{r}</span>
                                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                          <div className="h-full bg-[#01875f] rounded-full" style={{ width: `${data.ratingDistribution?.[i] || 0}%` }}></div>
                                      </div>
                                  </div>
                             ))}
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        {data.comments?.map((comment) => (
                             <div key={comment.id} className="flex gap-3">
                                 <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                                     {comment.avatarUrl ? (
                                         <img src={comment.avatarUrl} alt="" className="w-full h-full object-cover" />
                                     ) : (
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} alt="" className="w-full h-full" />
                                     )}
                                 </div>
                                 <div className="flex-1">
                                     <div className="text-xs font-medium text-gray-900 mb-0.5">{comment.user}</div>
                                     <div className="flex items-center gap-1.5 mb-1">
                                         <div className="flex text-[10px]">
                                             {[...Array(5)].map((_, i) => (
                                                 <Star key={i} size={10} fill={i < comment.rating ? "#1F2937" : "none"} className={i < comment.rating ? "text-gray-800" : "text-gray-300"} />
                                             ))}
                                         </div>
                                         <span className="text-[10px] text-gray-500">{comment.date}</span>
                                     </div>
                                     <p className="text-[11px] text-gray-600 leading-relaxed mb-2">
                                         {comment.text}
                                     </p>
                                     <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                         {t.helpful} <span className="font-medium">{t.yes}</span> {comment.likes > 0 && `(${comment.likes})`}
                                     </div>
                                 </div>
                                 <MoreVertical size={14} className="text-gray-400 flex-shrink-0" />
                             </div>
                        ))}
                     </div>
                 </div>

            </div>
        </div>
        <style>{`
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
    </div>
  );
};
