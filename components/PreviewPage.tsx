
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, MoreVertical, Search, ArrowRight, Share2, Loader2 } from 'lucide-react';
import { Language, PwaRow } from '../types';
import { supabase } from '../supabaseClient';

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
    offerLink?: string;
}

const DEFAULT_DATA: AppData = {
    name: 'Sweet Bananza LC',
    developer: 'Denesik LLC',
    category: 'Gambling',
    rating: 4.93,
    ratingDistribution: [70, 15, 10, 3, 2],
    reviewsCount: '1538',
    downloads: '50,000+',
    size: '5Mb',
    age: '18+',
    description: '**App: Ultimate Gamble**\n\nExperience the thrill of the ultimate slot machine experience right in your pocket. Spin to win with amazing graphics and sound effects.\n\nOne of the standout features of Ultimate Gamble is its constant stream of promotions.',
    iconColor: 'bg-purple-600',
    iconUrl: '',
    screenshots: [],
    tags: ['Best choice', 'Secure payments', 'Roulette King'],
    comments: [
        { 
            id: 1, 
            user: 'Lessie_Kshlerin22', 
            avatarUrl: '',
            date: '12.12.2024', 
            rating: 5, 
            likes: 42,
            text: 'Love this app! The bonuses are amazing and the interface is super user-friendly.' 
        }
    ],
    languageCode: 'ru',
    offerLink: ''
};

const TRANSLATIONS: Record<string, any> = {
    en: { install: "Install", ads: "Contains ads", purchases: "In-app purchases", about: "About this app", ratingsReviews: "Ratings and reviews", reviews: "reviews", downloads: "Downloads", size: "Size", rating: "Rating", dataSafety: "Data safety", dataSafetyDesc: "To manage your safety, it's important to understand how developers collect and share your data.", helpful: "Helpful?", yes: "Yes", no: "No" },
    ru: { install: "Установить", ads: "Есть реклама", purchases: "Покупки в приложении", about: "Об этом приложении", ratingsReviews: "Оценки и отзывы", reviews: "отзывов", downloads: "Скачиваний", size: "Размер", rating: "Рейтинг", dataSafety: "Безопасность данных", dataSafetyDesc: "Чтобы управлять своей безопасностью, важно понимать, как разработчики собирают и передают ваши данные.", helpful: "Полезно?", yes: "Да", no: "Нет" },
    az: { install: "Quraşdır", ads: "Reklamlar var", purchases: "Tətbiqdaxili satınalmalar", about: "Bu tətbiq haqqında", ratingsReviews: "Reytinqlər və rəylər", reviews: "rəylər", downloads: "Yükləmələr", size: "Həcm", rating: "Reytinq", dataSafety: "Məlumatların təhlükəsizliyi", dataSafetyDesc: "Təhlükəsizliyinizi idarə etmək üçün inkişaf etdiricilərin məlumatlarınızı necə topladığını anlamaq vacibdir.", helpful: "Faydalı?", yes: "Hə", no: "Yox" },
    es: { install: "Instalar", ads: "Contiene anuncios", purchases: "Compras en la aplicación", about: "Sobre esta app", ratingsReviews: "Calificaciones y opiniones", reviews: "opiniones", downloads: "Descargas", size: "Tamaño", rating: "Calificación", dataSafety: "Seguridad de los datos", dataSafetyDesc: "Para gestionar tu seguridad, es importante entender cómo los desarrolladores recopilan tus datos.", helpful: "¿Útil?", yes: "Sí", no: "No" },
    tr: { install: "Yükle", ads: "Reklam içerir", purchases: "Uygulama içi satın alma", about: "Bu uygulama hakkında", ratingsReviews: "Puanlar ve yorumlar", reviews: "yorum", downloads: "İndirme", size: "Boyut", rating: "Puan", dataSafety: "Veri güvenliği", dataSafetyDesc: "Güvenliğinizi yönetmek için, geliştiricilerin verilerinizi nasıl topladığını и paylaştığını anlamak önemlidir.", helpful: "Yararlı mı?", yes: "Evet", no: "Hayır" },
};

export const PreviewPage: React.FC<{ lang: Language }> = ({ lang }) => {
    const [data, setData] = useState<AppData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            
            // 1. Try LocalStorage (for internal previews on same domain)
            const stored = localStorage.getItem('pwa-preview-data');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    setData(parsed);
                    updateMetadata(parsed);
                    setIsLoading(false);
                    return;
                } catch (e) {
                    console.error("Failed to parse preview data", e);
                }
            }

            // 2. Try Supabase lookup by domain (for custom domains)
            const currentDomain = window.location.hostname;
            if (!currentDomain.includes('vercel.app') && currentDomain !== 'localhost') {
                try {
                    // Logic: Find any user who has a PWA with this domain
                    // Note: This is an expensive query if the table is large, but fits the current schema
                    const { data: users, error } = await supabase
                        .from('drumsky')
                        .select('pwas');

                    if (data && !error) {
                        for (const userEntry of (users as any[])) {
                            const match = (userEntry.pwas as PwaRow[]).find(p => p.domain === currentDomain);
                            if (match) {
                                const appData: AppData = match as any;
                                setData(appData);
                                updateMetadata(appData);
                                setIsLoading(false);
                                return;
                            }
                        }
                    }
                } catch (err) {
                    console.error("Error fetching data by domain:", err);
                }
            }

            // 3. Fallback
            setData(DEFAULT_DATA);
            updateMetadata(DEFAULT_DATA);
            setIsLoading(false);
        };

        const updateMetadata = (parsedData: any) => {
            if (parsedData.name) document.title = parsedData.name;
            if (parsedData.iconUrl) {
                let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.getElementsByTagName('head')[0].appendChild(link);
                }
                link.href = parsedData.iconUrl;
            }
        };

        initData();

        // PWA install logic
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
        setIsStandalone(checkStandalone);

        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    // REDIRECT LOGIC
    useEffect(() => {
        if (isStandalone && data?.offerLink) {
             let link = data.offerLink;
             link = link.replace('{user_id}', 'pwa_installed_user');
             window.location.replace(link);
        }
    }, [isStandalone, data]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-pwa-green" size={48} /></div>;
    if (!data) return null;
    
    if (isStandalone) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <Loader2 className="animate-spin text-[#01875f] mb-4" size={48} />
                <p className="text-gray-500 font-medium">Opening...</p>
            </div>
        );
    }

    const langCode = data.languageCode || 'en';
    const t = TRANSLATIONS[langCode] || TRANSLATIONS['en'];

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            setDeferredPrompt(null);
        } else {
             alert(langCode === 'ru' ? 'Установка приложения началась...' : 'App installation started...');
        }
    };

    return (
        <div className="bg-white min-h-screen text-gray-900 font-sans max-w-[500px] mx-auto shadow-xl relative pb-20 overflow-x-hidden">
            <div className="p-4 flex items-center justify-between sticky top-0 bg-white z-20 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>
                    <div className="flex items-center gap-3">
                        {data.iconUrl ? (
                            <img src={data.iconUrl} alt="" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                        ) : (
                            <div className={`w-8 h-8 rounded-lg ${data.iconColor || 'bg-blue-500'} flex items-center justify-center text-[6px] text-white font-bold`}>
                                APP
                            </div>
                        )}
                        <span className="font-bold text-gray-900 truncate max-w-[150px]">{data.name || 'Application'}</span>
                    </div>
                </div>
                <div className="flex gap-4 text-gray-700">
                    <Search size={24} className="cursor-pointer" />
                    <MoreVertical size={24} className="cursor-pointer" />
                </div>
            </div>

            <div className="px-6 py-6">
                <div className="flex gap-6 mb-8">
                     {data.iconUrl ? (
                        <img src={data.iconUrl} alt="App Icon" className="w-24 h-24 rounded-2xl object-cover shadow-lg flex-shrink-0" />
                     ) : (
                        <div className={`w-24 h-24 rounded-2xl ${data.iconColor || 'bg-blue-500'} flex items-center justify-center text-white text-xs font-bold text-center leading-tight shadow-lg flex-shrink-0`}>
                            {data.name || 'APP'}
                        </div>
                     )}
                     <div className="flex-1 flex flex-col justify-center">
                         <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{data.name || 'Application'}</h1>
                         <div className="text-base text-green-700 font-medium mb-1">{data.developer || 'Developer'}</div>
                         <div className="text-sm text-gray-500">{t.ads}</div>
                     </div>
                </div>

                <div className="flex justify-between items-center mb-8 px-2 overflow-x-auto no-scrollbar gap-8 border-b border-gray-100 pb-6">
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="flex items-center gap-1 font-bold text-gray-800 text-base">
                            {data.rating || 0} <Star size={14} fill="currentColor" />
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">{data.reviewsCount || 0} {t.reviews}</div>
                    </div>
                    <div className="w-[1px] h-8 bg-gray-200 flex-shrink-0"></div>
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="font-bold text-gray-800 text-base">{data.size || '0MB'}</div>
                        <div className="text-xs text-gray-500">{t.size}</div>
                    </div>
                     <div className="w-[1px] h-8 bg-gray-200 flex-shrink-0"></div>
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="font-bold text-gray-800 text-base">{data.age || '3+'}</div>
                        <div className="text-xs text-gray-500">{t.rating}</div>
                    </div>
                    <div className="w-[1px] h-8 bg-gray-200 flex-shrink-0"></div>
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="font-bold text-gray-800 text-base">{data.downloads || '0+'}</div>
                        <div className="text-xs text-gray-500">{t.downloads}</div>
                    </div>
                </div>

                <button 
                    onClick={handleInstall}
                    className="w-full bg-[#01875f] hover:bg-[#01704e] text-white py-3 rounded-xl font-bold text-base shadow-lg shadow-green-100 mb-8 transition-all active:scale-95"
                >
                    {t.install}
                </button>

                 {data.screenshots && data.screenshots.length > 0 && (
                     <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 no-scrollbar mb-6">
                         {data.screenshots.map((src, i) => (
                             <img key={i} src={src} className="w-44 h-80 object-cover rounded-2xl bg-gray-100 flex-shrink-0 shadow-md" alt={`screenshot-${i}`} />
                         ))}
                     </div>
                 )}

                 <div className="mb-10">
                    <div className="flex justify-between items-center mb-4 cursor-pointer group">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#01875f] transition-colors">{t.about}</h3>
                        <ArrowRight className="text-gray-400 group-hover:text-gray-900 transition-colors" size={24} />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {data.description?.replace(/\*\*/g, '') || 'No description provided.'}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                        {data.tags?.map((tag, i) => (
                            <span key={i} className="text-xs px-4 py-1.5 border border-gray-200 rounded-full text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors shadow-sm">{tag}</span>
                        ))}
                    </div>
                 </div>

                 <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">{t.dataSafety}</h3>
                        <ArrowRight className="text-gray-400" size={24} />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {t.dataSafetyDesc}
                    </p>
                    <div className="space-y-4">
                         <div className="flex gap-4 items-start">
                            <Share2 size={20} className="text-gray-600 mt-1 flex-shrink-0" />
                            <div className="text-sm text-gray-700 font-bold">
                                This app may share these data types with third parties
                            </div>
                         </div>
                    </div>
                 </div>

                 <div className="mb-8">
                    <div className="flex justify-between items-center mb-6 cursor-pointer group">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#01875f] transition-colors">{t.ratingsReviews}</h3>
                        <ArrowRight className="text-gray-400 group-hover:text-gray-900 transition-colors" size={24} />
                    </div>

                     <div className="flex items-center gap-10 mb-10">
                        <div className="flex flex-col items-center">
                             <span className="text-6xl font-bold text-gray-900 tracking-tight">{data.rating || 0}</span>
                             <div className="flex text-gray-900 gap-1 mt-2">
                                 {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= Math.round(data.rating || 0) ? "currentColor" : "none"} className={i <= Math.round(data.rating || 0) ? "text-green-800" : "text-gray-200"} />)}
                             </div>
                             <div className="text-xs text-gray-400 mt-2 font-medium">{data.reviewsCount || 0} {t.reviews}</div>
                        </div>
                        <div className="flex-1 space-y-2">
                             {[5,4,3,2,1].map((r, i) => (
                                  <div key={r} className="flex items-center gap-4">
                                      <span className="text-xs font-bold text-gray-500 w-2">{r}</span>
                                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                          <div className="h-full bg-[#01875f] rounded-full" style={{ width: `${data.ratingDistribution?.[i] || 0}%` }}></div>
                                      </div>
                                  </div>
                             ))}
                        </div>
                     </div>
                     
                     <div className="space-y-10">
                        {data.comments?.map((comment) => (
                             <div key={comment.id} className="pb-8 border-b border-gray-100 last:border-0 group">
                                 <div className="flex items-center justify-between mb-4">
                                     <div className="flex items-center gap-4">
                                         <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200 shadow-sm">
                                             {comment.avatarUrl ? (
                                                 <img src={comment.avatarUrl} alt="" className="w-full h-full object-cover" />
                                             ) : (
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user || 'anon'}`} alt="" className="w-full h-full" />
                                             )}
                                         </div>
                                         <div className="text-sm font-bold text-gray-900">{comment.user || 'User'}</div>
                                     </div>
                                     <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                         <MoreVertical size={20} className="text-gray-400" />
                                     </button>
                                 </div>
                                 <div className="flex items-center gap-3 mb-3">
                                     <div className="flex gap-0.5">
                                         {[...Array(5)].map((_, i) => (
                                             <Star key={i} size={14} fill={i < comment.rating ? "#1F2937" : "none"} className={i < comment.rating ? "text-gray-900" : "text-gray-300"} />
                                         ))}
                                     </div>
                                     <span className="text-xs text-gray-400 font-medium">{comment.date}</span>
                                 </div>
                                 <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                     {comment.text}
                                 </p>
                                 <div className="flex items-center justify-between">
                                     <div className="text-xs text-gray-500 flex items-center gap-3">
                                         {t.helpful} 
                                         <span className="font-bold border border-gray-200 px-4 py-1.5 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer select-none">{t.yes}</span>
                                         <span className="font-bold border border-gray-200 px-4 py-1.5 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer select-none">{t.no}</span>
                                     </div>
                                     {comment.likes > 0 && <span className="text-xs text-gray-400 font-medium">{comment.likes} people found this helpful</span>}
                                 </div>

                                 {comment.developerResponse && (
                                     <div className="mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-100 ml-6 relative">
                                         <div className="absolute -top-3 left-4 w-6 h-6 bg-gray-50 border-t border-l border-gray-100 transform rotate-45"></div>
                                         <div className="flex items-center gap-2 mb-3">
                                             <span className="font-bold text-[10px] text-gray-900 uppercase tracking-widest bg-white px-2 py-1 rounded shadow-sm border border-gray-100">Developer Response</span>
                                         </div>
                                         <p className="text-xs text-gray-600 leading-relaxed italic">
                                             "{comment.developerResponse}"
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
