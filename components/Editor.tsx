
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Play, Eye, Save, Copy, Globe, MousePointer, Monitor, MessageSquare, BarChart, Settings, Plus, X, Dices, Image as ImageIcon, Sparkles, Star, MoreVertical, Upload, Trash2, Calendar, ThumbsUp, Info, Search, ChevronDown, MessageCircle, Check } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { Language, PwaRow } from '../types';

interface EditorProps {
    onBack: () => void;
    onSave: (data: PwaRow) => void;
    lang: Language;
    initialData?: PwaRow | null;
}

// Extensive list of languages matching app store standards
const LANGUAGES = [
    { name: 'Английский', native: 'English', code: 'en' },
    { name: 'Арабский', native: 'العربية', code: 'ar' },
    { name: 'Азербайджанский', native: 'Azərbaycan', code: 'az' },
    { name: 'Белорусский', native: 'Беларуская', code: 'be' },
    { name: 'Болгарский', native: 'Български', code: 'bg' },
    { name: 'Бенгальский', native: 'বাংলা', code: 'bn' },
    { name: 'Венгерский', native: 'Magyar', code: 'hu' },
    { name: 'Вьетнамский', native: 'Tiếng Việt', code: 'vi' },
    { name: 'Греческий', native: 'Ελληνικά', code: 'el' },
    { name: 'Датский', native: 'Dansk', code: 'da' },
    { name: 'Иврит', native: 'עברית', code: 'he' },
    { name: 'Индонезийский', native: 'Indonesia', code: 'id' },
    { name: 'Испанский', native: 'Español', code: 'es' },
    { name: 'Итальянский', native: 'Italiano', code: 'it' },
    { name: 'Казахский', native: 'Қазақ', code: 'kk' },
    { name: 'Китайский', native: '中文', code: 'zh' },
    { name: 'Корейский', native: '한국어', code: 'ko' },
    { name: 'Немецкий', native: 'Deutsch', code: 'de' },
    { name: 'Нидерландский', native: 'Nederlands', code: 'nl' },
    { name: 'Норвежский', native: 'Norsk', code: 'no' },
    { name: 'Польский', native: 'Polski', code: 'pl' },
    { name: 'Португальский', native: 'Português', code: 'pt' },
    { name: 'Румынский', native: 'Română', code: 'ro' },
    { name: 'Русский', native: 'Русский', code: 'ru' },
    { name: 'Тайский', native: 'ไทย', code: 'th' },
    { name: 'Турецкий', native: 'Türkçe', code: 'tr' },
    { name: 'Украинский', native: 'Українська', code: 'uk' },
    { name: 'Финский', native: 'Suomi', code: 'fi' },
    { name: 'Французский', native: 'Français', code: 'fr' },
    { name: 'Хинди', native: 'हिन्दी', code: 'hi' },
    { name: 'Хорватский', native: 'Hrvatski', code: 'hr' },
    { name: 'Чешский', native: 'Čeština', code: 'cs' },
    { name: 'Шведский', native: 'Svenska', code: 'sv' },
    { name: 'Японский', native: '日本語', code: 'ja' },
];

const CATEGORIES = [
    'Gambling',
    'Betting',
    'Crypto',
    'Finance',
    'Dating',
    'Nutra'
];

const sweetBananzaData = {
      name: 'Sweet Bananza LC',
      developer: 'Denesik LLC',
      category: 'Gambling',
      description: '**App: Ultimate Gamble**\n\nExperience the thrill of the ultimate slot machine experience right in your pocket. Spin to win with amazing graphics and sound effects.\n\nOne of the standout features of Ultimate Gamble is its constant stream of promotions.',
      rating: 4.93,
      ratingDistribution: [70, 15, 10, 3, 2],
      reviewsCount: '1538',
      downloads: '50,000+',
      size: '5Mb',
      age: '18+',
      iconColor: 'bg-purple-600',
      iconUrl: '',
      screenshots: [] as string[],
      videoUrl: '',
      tags: ['Best choice', 'Secure payments', 'Roulette King', 'Blackjack Master', '24/7 support'],
      comments: [
        { 
            id: 1, 
            user: 'Lessie_Kshlerin22', 
            avatarUrl: '', // empty = generate from name
            date: '12.12.2024', 
            rating: 5, 
            likes: 42,
            text: 'Love this app! The bonuses are amazing and the interface is super user-friendly. Winning feels easier and more exciting! Highly recommend for a fun experience! 💰🎲✨',
            developerResponse: 'Спасибо за ваш отзыв! Мы рады, что вам понравилось наше приложение. Удачи в игре!'
        },
        { 
            id: 2, 
            user: 'Barrett.Klein-Roberts', 
            avatarUrl: '',
            date: '10.12.2024', 
            rating: 4, 
            likes: 12,
            text: 'I\'ve been using this app for a few weeks, and it\'s been an amazing experience. The interface is user-friendly and the games are engaging. I\'ve had some good wins, which has been a nice bonus. It definitely adds excitement to my downtime. Highly recommended!' 
        },
        { 
            id: 3, 
            user: 'Lonny8', 
            avatarUrl: '',
            date: '08.12.2024', 
            rating: 5, 
            likes: 8,
            text: 'I\'ve been using this app for a while now, and the bonuses are fantastic! The user interface is' 
        }
      ],
      keepReviewDatesCurrent: false,
      offerLink: 'https://example-offer.com?click_id={user_id}',
      passGetParams: true,
      // Fix: widen type to 'all' | 'specific' to avoid unintentional comparison errors in TypeScript
      geoCloaking: 'all' as 'all' | 'specific',
      androidOnly: true,
      enableWhitepage: false,
      language: 'Турецкий',
      languageCode: 'tr'
};

const defaultData = {
      name: 'New Application',
      developer: 'Developer Name',
      category: 'Utility',
      description: '',
      rating: 5.0,
      ratingDistribution: [100, 0, 0, 0, 0],
      reviewsCount: '100',
      downloads: '100+',
      size: '15Mb',
      age: '3+',
      iconColor: 'bg-blue-500',
      iconUrl: '',
      screenshots: [] as string[],
      videoUrl: '',
      tags: [] as string[],
      comments: [] as any[],
      keepReviewDatesCurrent: false,
      offerLink: '',
      passGetParams: false,
      // Fix: widen type to 'all' | 'specific' to avoid unintentional comparison errors in TypeScript
      geoCloaking: 'all' as 'all' | 'specific',
      androidOnly: false,
      enableWhitepage: false,
      language: 'Английский',
      languageCode: 'en'
};

export const Editor: React.FC<EditorProps> = ({ onBack, onSave, lang, initialData }) => {
  const [activeTab, setActiveTab] = useState('design');
  const [saveBtnState, setSaveBtnState] = useState<'idle' | 'saved'>('idle');
  
  // State for the comment being edited
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [tempComment, setTempComment] = useState<any>(null);

  // State for Language Search Dropdown
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [langSearchQuery, setLangSearchQuery] = useState('');
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const [appData, setAppData] = useState(() => {
      // Logic to determine if we load the full mock data or a blank slate
      if (initialData?.id === 'row3' || initialData?.name === 'Sweet Bananza LC') {
          return {
              ...sweetBananzaData,
          };
      }
      return {
          ...defaultData,
          ...initialData, // Load all initial data if exists
          name: initialData?.name || defaultData.name, // Ensure name is present
      };
  });

  const screenshotFileInputRef = useRef<HTMLInputElement>(null);
  const iconFileInputRef = useRef<HTMLInputElement>(null);
  const commentAvatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
              setIsLangDropdownOpen(false);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = () => {
      if (!initialData) return;
      
      const updatedRow: PwaRow = {
          ...initialData,
          ...appData,
          isApp: true, // Mark as configured app
      };
      onSave(updatedRow);
      
      setSaveBtnState('saved');
      setTimeout(() => setSaveBtnState('idle'), 2000);
  };

  const t = {
    ru: {
        launch: "Запустить", preview: "Предпросмотр", save: "Сохранить", saved: "Сохранено",
        tabs: { domain: "Домен", tracker: "Трекер", design: "Оформление", analytics: "Аналитика", push: "Push-уведомления", extra: "Дополнительно" },
        stopped: "Остановлен",
        draft: "Черновик",
        tracker: {
            offer: {
                title: "Оффер и параметры",
                desc: "Введите ссылку на оффер, куда должны попадать пользователи PWA. Как настроить параметры в ссылке оффера смотрите",
                here: "здесь",
                placeholder: "Ссылка Оффера",
                macros: "Доступные макросы:",
                passGet: "Прокидывать GET параметры в оффер",
                passGetSub: "При включении, все GET параметры будут прокинуты в оффер"
            },
            geo: {
                title: "Клоакинг по гео",
                desc: "Можно выбрать одно или несколько гео, в которых будет работать PWA. Пользователи из других стран будут отправлены на Whitepage. Если Гео выбрано, но Whitepage не настроен или отключен, то пользователи увидят вот такую заглушку",
                noCloak: "Клоакинг не нужен. Разрешить все ГЕО",
                specific: "Разрешить только определенные ГЕО"
            },
            device: {
                title: "Клоакинг по устройствам",
                desc: "Правила направления трафика для различных устройств. Если выбрано отправлять на Whitepage, но она не настроена, то пользователи увидят вот такую заглушку",
                android: "Только устройства Android",
                androidSub: "При включении этой опции, PWA будет работать только для устройств на Android, а остальной трафик будет отправлен на Whitepage."
            },
            whitepage: {
                title: "Whitepage",
                desc: "Здесь можно настроить whitepage, которая будет отображаться при неподходящем трафике",
                enable: "Включить whitepage",
                enableSub: "При включении, весь неподходящий трафик будет перенаправляться на whitepage."
            }
        },
        design: {
            title: "Настройки оформления",
            desc: "Вы можете сделать все самостоятельно или же скопировать дизайн существующего приложения.",
            copy: "Скопировать из Google Play",
            manual: "Сделать вручную",
            langCatTitle: "Язык и категория PWA",
            langCatDesc: "Выберите основной язык, на котором будут отображаться все системные надписи на странице установки PWA. Выбранная категория будет влиять на некоторые надписи на странице установки, а также на стиль и тематику при генерации описания и комментариев.",
            lang: "Язык",
            cat: "Категория",
            installTitle: "Оформление страницы установки",
            installSub: "Шапка приложения",
            upload: "Загрузить",
            appName: "Название приложения",
            dev: "Разработчик",
            size: "Размер",
            age: "Возраст",
            downloads: "Скачиваний",
            mediaTitle: "Изображения и видео",
            mediaSub: "Загрузите изображения и видео для отображения на странице установки",
            videoInfo: "Видео всегда будет отображаться первым в скриншотах приложения",
            descTitle: "Описание и теги",
            descSub: "Хорошее описание и наличие тегов повышает конверсию. Не пренебрегайте этим.",
            mainLang: "Основной язык",
            descLabel: "Описание приложения",
            tagsLabel: "Теги к описанию",
            addTags: "Добавить теги",
            genDesc: "Сгенерировать описание с ChatGPT",
            randTags: "Выбрать случайные теги",
            ratingsTitle: "Оценки и отзывы",
            rating: "Рейтинг",
            reviewsCount: "Количество отзывов",
            commentsTitle: "Комментарии",
            keepDates: "Поддерживать актуальные даты комментариев",
            keepDatesSub: "При включении даты комментариев всегда будут актуальными",
            editComment: {
                title: "Редактирование отзыва",
                username: "Имя пользователя",
                date: "Дата",
                rating: "Оценка",
                likes: "Лайков",
                text: "Текст отзыва",
                devResponse: "Ответ разработчика",
                avatar: "Аватар",
                uploadAvatar: "Загрузить фото",
                cancel: "Отмена",
                save: "Сохранить",
                delete: "Удалить",
                genComment: "Сгенерировать коммент",
                genResponse: "Сгенерировать ответ"
            },
            process: {
                title: "Процесс настройки",
                domain: "Домен", offer: "Оффер", cloak: "Клоакинг по гео", white: "Whitepage", design: "Оформление", desc: "Описание приложения", comments: "Комментарии", pixels: "Пиксели",
                status: { done: "Готово", process: "В процессе", none: "Не настроено" }
            }
        },
        langs: { tr: "Турецкий", ru: "Русский", en: "Английский" }
    },
    en: {
        launch: "Launch", preview: "Preview", save: "Save", saved: "Saved",
        tabs: { domain: "Domain", tracker: "Tracker", design: "Design", analytics: "Analytics", push: "Push Notifications", extra: "Extra" },
        stopped: "Stopped",
        draft: "Draft",
        tracker: {
            offer: {
                title: "Offer and parameters",
                desc: "Enter a link to the offer where PWA users should land. See how to set parameters in the offer link",
                here: "here",
                placeholder: "Offer Link",
                macros: "Available macros:",
                passGet: "Pass GET parameters to offer",
                passGetSub: "When enabled, all GET parameters will be passed to the offer"
            },
            geo: {
                title: "Geo Cloaking",
                desc: "You can select one or several regions where PWA will work. Users from other countries will be sent to Whitepage. If Geo is selected, but Whitepage is not configured or disabled, users will see this placeholder",
                noCloak: "Cloaking not needed. Allow all GEO",
                specific: "Allow only specific GEO"
            },
            device: {
                title: "Device Cloaking",
                desc: "Traffic routing rules for different devices. If selected to send to Whitepage but it is not configured, users will see this placeholder",
                android: "Android devices only",
                androidSub: "When this option is enabled, PWA will work only for Android devices, and other traffic will be sent to Whitepage."
            },
            whitepage: {
                title: "Whitepage",
                desc: "Here you can configure the whitepage that will be displayed for inappropriate traffic",
                enable: "Enable whitepage",
                enableSub: "When enabled, all inappropriate traffic will be redirected to whitepage."
            }
        },
        design: {
            title: "Design Settings",
            desc: "You can do everything yourself or copy the design of an existing application.",
            copy: "Copy from Google Play",
            manual: "Do it manually",
            langCatTitle: "PWA Language and Category",
            langCatDesc: "Select the main language in which all system labels on the PWA installation page will be displayed. The selected category will affect some labels on the installation page, as well as the style and theme when generating descriptions and comments.",
            lang: "Language",
            cat: "Category",
            installTitle: "Installation Page Design",
            installSub: "App Header",
            upload: "Upload",
            appName: "App Name",
            dev: "Developer",
            size: "Size",
            age: "Age",
            downloads: "Downloads",
            mediaTitle: "Images and Video",
            mediaSub: "Upload images and videos to display on the installation page",
            videoInfo: "Video will always appear first in app screenshots",
            descTitle: "Description and Tags",
            descSub: "Good description and tags increase conversion. Do not neglect this.",
            mainLang: "Main Language",
            descLabel: "App Description",
            tagsLabel: "Description Tags",
            addTags: "Add Tags",
            genDesc: "Generate description with ChatGPT",
            randTags: "Pick random tags",
            ratingsTitle: "Ratings and Reviews",
            rating: "Rating",
            reviewsCount: "Reviews Count",
            commentsTitle: "Comments",
            keepDates: "Keep review dates current",
            keepDatesSub: "When enabled, review dates will always be current",
            editComment: {
                title: "Edit Review",
                username: "Username",
                date: "Date",
                rating: "Rating",
                likes: "Likes",
                text: "Review Text",
                devResponse: "Developer Response",
                avatar: "Avatar",
                uploadAvatar: "Upload Photo",
                cancel: "Cancel",
                save: "Save",
                delete: "Delete",
                genComment: "Generate comment",
                genResponse: "Generate response"
            },
            process: {
                title: "Setup Process",
                domain: "Domain", offer: "Offer", cloak: "Geo Cloaking", white: "Whitepage", design: "Design", desc: "App Description", comments: "Comments", pixels: "Pixels",
                status: { done: "Done", process: "In Progress", none: "Not Set" }
            }
        },
        langs: { tr: "Turkish", ru: "Russian", en: "English" }
    }
  }[lang];

  const handlePreview = () => {
    try {
        localStorage.setItem('pwa-preview-data', JSON.stringify(appData));
        window.location.hash = 'preview';
    } catch (error) {
        console.error("Failed to save preview data to localStorage:", error);
        alert("Could not open preview.");
    }
  };

  const TabButton = ({ id, label, icon: Icon }: any) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors shrink-0 ${activeTab === id ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
      >
        <Icon size={16} />
        {label}
      </button>
  );

  const ProgressItem = ({ label, status }: { label: string, status: 'done' | 'process' | 'none' }) => {
      const colors = {
          done: 'bg-green-100 text-green-700',
          process: 'bg-yellow-100 text-yellow-700',
          none: 'bg-gray-100 text-gray-500'
      };
      return (
          <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-gray-600 font-medium">{label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${colors[status]}`}>{t.design.process.status[status]}</span>
          </div>
      );
  }

  // ... (Other handlers) ...
  const handleTagRemove = (tagToRemove: string) => {
      setAppData({...appData, tags: appData.tags.filter(tag => tag !== tagToRemove)});
  };

  const handleAddTag = () => {
      const newTag = prompt(lang === 'ru' ? "Введите новый тег:" : "Enter new tag:");
      if (newTag) setAppData({...appData, tags: [...appData.tags, newTag]});
  };

  const handleAddScreenshotClick = () => {
    screenshotFileInputRef.current?.click();
  };

  const handleScreenshotFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && appData.screenshots.length < 6) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newScreenshots = [...appData.screenshots, reader.result as string];
            setAppData({ ...appData, screenshots: newScreenshots });
        };
        reader.readAsDataURL(file);
    }
    if (event.target) {
        event.target.value = '';
    }
  };

  const handleRemoveScreenshot = (indexToRemove: number) => {
    const newScreenshots = appData.screenshots.filter((_, index) => index !== indexToRemove);
    setAppData({ ...appData, screenshots: newScreenshots });
  };
  
  const handleAddIconClick = () => {
    iconFileInputRef.current?.click();
  };

  const handleIconFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAppData({ ...appData, iconUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
    }
    if (event.target) {
        event.target.value = '';
    }
  };

  const handleDistributionChange = (index: number, value: number) => {
    const newDist = [...(appData.ratingDistribution || [100,0,0,0,0])];
    newDist[index] = value;
    setAppData({ ...appData, ratingDistribution: newDist });
  };

  // Comment Editing Logic
  const startEditingComment = (comment: any) => {
      setTempComment({...comment});
      setEditingCommentId(comment.id);
  };

  const handleAddComment = () => {
      const newId = Date.now();
      const newComment = {
          id: newId,
          user: lang === 'ru' ? 'Новый пользователь' : 'New User',
          avatarUrl: '',
          date: new Date().toLocaleDateString('ru-RU'),
          rating: 5,
          likes: 0,
          text: '',
          developerResponse: ''
      };
      setTempComment(newComment);
      setEditingCommentId(newId);
  };

  const saveComment = () => {
      if (!tempComment) return;
      setAppData(prev => {
          const exists = prev.comments.some(c => c.id === tempComment.id);
          return {
              ...prev,
              comments: exists 
                  ? prev.comments.map(c => c.id === tempComment.id ? tempComment : c)
                  : [tempComment, ...prev.comments]
          };
      });
      setEditingCommentId(null);
      setTempComment(null);
  };

  const handleDeleteComment = () => {
      if (!tempComment) return;
      setAppData(prev => ({
          ...prev,
          comments: prev.comments.filter(c => c.id !== tempComment.id)
      }));
      setEditingCommentId(null);
      setTempComment(null);
  };

  const cancelEditing = () => {
      setEditingCommentId(null);
      setTempComment(null);
  };

  const handleCommentAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && tempComment) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setTempComment({ ...tempComment, avatarUrl: reader.result as string });
          };
          reader.readAsDataURL(file);
      }
      if (event.target) event.target.value = '';
  };

  // Language Dropdown Logic
  const filteredLanguages = LANGUAGES.filter(l => 
      l.name.toLowerCase().includes(langSearchQuery.toLowerCase()) ||
      l.native.toLowerCase().includes(langSearchQuery.toLowerCase())
  );

  const handleLanguageSelect = (langObj: typeof LANGUAGES[0]) => {
      setAppData({ ...appData, language: langObj.name, languageCode: langObj.code });
      setIsLangDropdownOpen(false);
      setLangSearchQuery('');
  };


  return (
    <div className="animate-fade-in pb-20 relative">
      {/* Hidden file inputs for uploads */}
      <input
        type="file"
        ref={screenshotFileInputRef}
        onChange={handleScreenshotFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <input
        type="file"
        ref={iconFileInputRef}
        onChange={handleIconFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
       <input
        type="file"
        ref={commentAvatarInputRef}
        onChange={handleCommentAvatarChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />

      {/* Edit Comment Modal */}
      {editingCommentId && tempComment && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-gray-800">{t.design.editComment.title}</h3>
                      <button onClick={cancelEditing} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                  </div>
                  <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                      {/* Avatar & Name */}
                      <div className="flex gap-4 items-start">
                          <div className="flex flex-col items-center gap-2">
                              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative group">
                                  {tempComment.avatarUrl ? (
                                      <img src={tempComment.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                                  ) : (
                                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tempComment.user}`} alt="avatar" className="w-full h-full" />
                                  )}
                                  <div 
                                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    onClick={() => commentAvatarInputRef.current?.click()}
                                  >
                                      <Upload className="text-white" size={20} />
                                  </div>
                              </div>
                              <button 
                                onClick={() => commentAvatarInputRef.current?.click()}
                                className="text-xs text-blue-600 font-medium hover:underline"
                              >
                                {t.design.editComment.uploadAvatar}
                              </button>
                          </div>
                          
                          <div className="flex-1 space-y-4">
                              <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.editComment.username}</label>
                                  <input 
                                    type="text" 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors"
                                    value={tempComment.user}
                                    onChange={(e) => setTempComment({...tempComment, user: e.target.value})}
                                  />
                              </div>
                              <div className="flex gap-4">
                                  <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.editComment.date}</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors"
                                        value={tempComment.date}
                                        onChange={(e) => setTempComment({...tempComment, date: e.target.value})}
                                        placeholder="DD.MM.YYYY"
                                    />
                                  </div>
                                  <div className="w-24">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.editComment.likes}</label>
                                      <input 
                                        type="number" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors"
                                        value={tempComment.likes}
                                        onChange={(e) => setTempComment({...tempComment, likes: Number(e.target.value)})}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Rating */}
                      <div>
                          <label className="block text-xs font-medium text-gray-500 mb-2">{t.design.editComment.rating}</label>
                          <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                  <button 
                                    key={star} 
                                    type="button"
                                    onClick={() => setTempComment({...tempComment, rating: star})}
                                    className="focus:outline-none"
                                  >
                                      <Star 
                                        size={24} 
                                        fill={star <= tempComment.rating ? "#FACC15" : "none"} 
                                        className={star <= tempComment.rating ? "text-yellow-400" : "text-gray-300"} 
                                      />
                                  </button>
                              ))}
                          </div>
                      </div>

                      {/* Text */}
                      <div>
                          <div className="flex justify-between items-center mb-1">
                              <label className="block text-xs font-medium text-gray-500">{t.design.editComment.text}</label>
                              <button className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">
                                  <Sparkles size={12} /> {t.design.editComment.genComment}
                              </button>
                          </div>
                          <textarea 
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors min-h-[100px] resize-y"
                              value={tempComment.text}
                              onChange={(e) => setTempComment({...tempComment, text: e.target.value})}
                          ></textarea>
                      </div>

                      {/* Developer Response */}
                      <div>
                          <div className="flex justify-between items-center mb-1">
                              <label className="block text-xs font-medium text-gray-500">{t.design.editComment.devResponse}</label>
                              <button className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">
                                  <Sparkles size={12} /> {t.design.editComment.genResponse}
                              </button>
                          </div>
                          <textarea 
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors min-h-[80px] resize-y"
                              value={tempComment.developerResponse || ''}
                              onChange={(e) => setTempComment({...tempComment, developerResponse: e.target.value})}
                              placeholder={lang === 'ru' ? 'Введите ваш ответ...' : 'Enter your reply...'}
                          ></textarea>
                      </div>

                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between gap-3">
                      <button 
                        onClick={handleDeleteComment} 
                        className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                          <Trash2 size={16} /> {t.design.editComment.delete}
                      </button>
                      <div className="flex gap-3">
                        <button 
                            onClick={cancelEditing} 
                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                            {t.design.editComment.cancel}
                        </button>
                        <button 
                            onClick={saveComment}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-pwa-green text-white hover:bg-green-600 transition-colors shadow-sm"
                        >
                            {t.design.editComment.save}
                        </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Top Bar */}
      <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                  <ChevronLeft size={20} />
              </button>
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-xs text-center leading-tight shadow-sm overflow-hidden flex-shrink-0">
                  {appData.iconUrl ? (
                      <img src={appData.iconUrl} alt="icon" className="w-full h-full object-cover" />
                  ) : (
                      <div className={`w-full h-full ${appData.iconColor || 'bg-blue-500'} flex items-center justify-center`}>
                          {initialData?.isApp ? <>SWEET<br/>BANANZA<br/>1000</> : 'NEW'}
                      </div>
                  )}
              </div>
              <div className="min-w-0">
                  <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold text-pwa-dark truncate">{appData.name}</h1>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 ${initialData?.status === 'stopped' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
                          {initialData?.status === 'stopped' ? t.stopped : t.draft}
                      </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span className="truncate">{initialData?.domain || 'playpilot.sbs'}</span>
                      <Copy size={12} className="cursor-pointer hover:text-gray-600 shrink-0" />
                      <Eye size={12} className="cursor-pointer hover:text-gray-600 shrink-0" />
                      <span className="bg-gray-100 text-gray-500 px-1.5 rounded shrink-0">id: {initialData?.id || 'new'}</span>
                  </div>
              </div>
          </div>
          
          <div className="flex gap-3">
              <button className="bg-pwa-green hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm shadow-green-200 transition-colors">
                  <Play size={16} fill="currentColor" /> {t.launch}
              </button>
              <button onClick={handlePreview} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                  <Eye size={16} /> {t.preview}
              </button>
              <button 
                onClick={handleSave} 
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm ${
                    saveBtnState === 'saved' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-[#1F2937] text-white hover:bg-black'
                }`}
              >
                  {saveBtnState === 'saved' ? <Check size={16} /> : <Save size={16} />} 
                  {saveBtnState === 'saved' ? t.saved : t.save}
              </button>
          </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
          <TabButton id="domain" label={t.tabs.domain} icon={Globe} />
          <TabButton id="tracker" label={t.tabs.tracker} icon={MousePointer} />
          <TabButton id="design" label={t.tabs.design} icon={Monitor} />
          <TabButton id="analytics" label={t.tabs.analytics} icon={BarChart} />
          <TabButton id="push" label={t.tabs.push} icon={MessageSquare} />
          <TabButton id="extra" label={t.tabs.extra} icon={Settings} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form Area */}
          <div className="flex-1 min-w-0 space-y-6">
              
              {/* Tracker Content */}
              {activeTab === 'tracker' && (
                  <>
                    {/* Offer and parameters */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-1">{t.tracker.offer.title}</h3>
                        <p className="text-sm text-gray-400 mb-6">
                            {t.tracker.offer.desc} <a href="#" className="text-pwa-green hover:underline">{t.tracker.offer.here}</a>.
                        </p>
                        
                        <div className="mb-4">
                            <input 
                                type="text" 
                                placeholder={t.tracker.offer.placeholder}
                                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-pwa-green transition-colors"
                                value={appData.offerLink || ''}
                                onChange={(e) => setAppData({...appData, offerLink: e.target.value})}
                            />
                        </div>

                        <div className="flex items-center gap-2 mb-8">
                            <span className="text-xs text-gray-400">{t.tracker.offer.macros}</span>
                            <span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded font-mono">{"{user_id}"}</span>
                        </div>

                        <div className="flex items-center justify-between p-1">
                            <div>
                                <div className="font-bold text-sm text-gray-800">{t.tracker.offer.passGet}</div>
                                <div className="text-xs text-gray-400 mt-1">{t.tracker.offer.passGetSub}</div>
                            </div>
                            <div 
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${appData.passGetParams ? 'bg-pwa-green' : 'bg-gray-200'}`}
                                onClick={() => setAppData({...appData, passGetParams: !appData.passGetParams})}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${appData.passGetParams ? 'translate-x-6' : ''}`}></div>
                            </div>
                        </div>
                    </div>

                    {/* Geo Cloaking */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                             <h3 className="font-bold text-gray-800">{t.tracker.geo.title}</h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            {t.tracker.geo.desc} <Info size={14} className="inline text-gray-600 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" />
                        </p>
                        
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="radio" 
                                        name="geoCloaking" 
                                        className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:border-pwa-green transition-colors cursor-pointer"
                                        checked={appData.geoCloaking === 'all'}
                                        onChange={() => setAppData({...appData, geoCloaking: 'all'})}
                                    />
                                    {appData.geoCloaking === 'all' && <div className="absolute w-2.5 h-2.5 rounded-full bg-pwa-green"></div>}
                                </div>
                                <span className={`text-sm ${appData.geoCloaking === 'all' ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                    {t.tracker.geo.noCloak}
                                </span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="radio" 
                                        name="geoCloaking" 
                                        className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:border-pwa-green transition-colors cursor-pointer"
                                        checked={appData.geoCloaking === 'specific'}
                                        onChange={() => setAppData({...appData, geoCloaking: 'specific'})}
                                    />
                                    {appData.geoCloaking === 'specific' && <div className="absolute w-2.5 h-2.5 rounded-full bg-pwa-green"></div>}
                                </div>
                                <span className={`text-sm ${appData.geoCloaking === 'specific' ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                    {t.tracker.geo.specific}
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Device Cloaking */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-1">{t.tracker.device.title}</h3>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            {t.tracker.device.desc} <Info size={14} className="inline text-gray-600 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" />
                        </p>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-bold text-sm text-gray-800">{t.tracker.device.android}</div>
                                <div className="text-xs text-gray-400 mt-1 max-w-md">{t.tracker.device.androidSub}</div>
                            </div>
                            <div 
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${appData.androidOnly ? 'bg-pwa-green' : 'bg-gray-200'}`}
                                onClick={() => setAppData({...appData, androidOnly: !appData.androidOnly})}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${appData.androidOnly ? 'translate-x-6' : ''}`}></div>
                            </div>
                        </div>
                    </div>

                    {/* Whitepage */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-1">{t.tracker.whitepage.title}</h3>
                        <p className="text-sm text-gray-400 mb-6">{t.tracker.whitepage.desc}</p>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-bold text-sm text-gray-800">{t.tracker.whitepage.enable}</div>
                                <div className="text-xs text-gray-400 mt-1">{t.tracker.whitepage.enableSub}</div>
                            </div>
                            <div 
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${appData.enableWhitepage ? 'bg-pwa-green' : 'bg-gray-200'}`}
                                onClick={() => setAppData({...appData, enableWhitepage: !appData.enableWhitepage})}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${appData.enableWhitepage ? 'translate-x-6' : ''}`}></div>
                            </div>
                        </div>
                    </div>
                  </>
              )}

              {/* Design Tab Content */}
              {activeTab === 'design' && (
                  <>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-1">{t.design.title}</h3>
                        <p className="text-sm text-gray-500 mb-6">{t.design.desc}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-pwa-green hover:bg-green-50 transition-all group">
                                 <div className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center relative group-hover:border-pwa-green transition-colors">
                                    <Play size={24} fill="currentColor" className="text-gray-800 group-hover:text-pwa-green transition-colors" />
                                 </div>
                                 <div className="font-bold text-center">{t.design.copy}</div>
                             </div>
                             <div className="border-2 border-gray-900 rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer bg-gray-50">
                                 <div className="text-3xl">🤘</div>
                                 <div className="font-bold text-center">{t.design.manual}</div>
                             </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                         <h3 className="font-bold text-gray-800 mb-1">{t.design.langCatTitle}</h3>
                         <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                             {t.design.langCatDesc}
                         </p>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Custom Searchable Language Dropdown */}
                             <div className="relative" ref={langDropdownRef}>
                                 <div className="relative">
                                     <div 
                                        className="w-full border-2 border-gray-800 rounded-lg px-3 py-2.5 bg-white text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                     >
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-700 px-1">{appData.language}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            {isLangDropdownOpen ? <X size={16} onClick={(e) => {e.stopPropagation(); setIsLangDropdownOpen(false)}} /> : <ChevronDown size={16} />}
                                        </div>
                                     </div>
                                     <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-bold text-gray-800">
                                        {t.design.lang}
                                     </label>
                                 </div>

                                 {isLangDropdownOpen && (
                                     <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[300px] flex flex-col animate-fade-in">
                                         <div className="p-2 border-b border-gray-100">
                                             <div className="relative">
                                                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                 <input 
                                                    type="text" 
                                                    className="w-full bg-gray-50 border border-gray-200 rounded pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:border-pwa-green"
                                                    placeholder="Search language..."
                                                    value={langSearchQuery}
                                                    onChange={(e) => setLangSearchQuery(e.target.value)}
                                                    autoFocus
                                                    onClick={(e) => e.stopPropagation()}
                                                 />
                                             </div>
                                         </div>
                                         <div className="overflow-y-auto flex-1 p-1">
                                             {filteredLanguages.map(l => (
                                                 <div 
                                                    key={l.code} 
                                                    className={`px-3 py-2 text-sm rounded cursor-pointer flex justify-between items-center ${appData.language === l.name ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                                                    onClick={() => handleLanguageSelect(l)}
                                                 >
                                                     <span>{l.name}</span>
                                                     <span className="text-xs text-gray-400">({l.code})</span>
                                                 </div>
                                             ))}
                                             {filteredLanguages.length === 0 && (
                                                 <div className="px-3 py-4 text-center text-xs text-gray-400">No languages found</div>
                                             )}
                                         </div>
                                     </div>
                                 )}
                             </div>

                             {/* Category Selector */}
                             <div className="relative">
                                 <div className="relative">
                                    <select 
                                        className="w-full border-2 border-gray-800 rounded-lg px-3 py-2.5 bg-white text-sm focus:outline-none appearance-none font-medium text-gray-700 cursor-pointer"
                                        value={appData.category}
                                        onChange={(e) => setAppData({...appData, category: e.target.value})}
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-3 pointer-events-none">
                                        <ChevronDown size={16} className="text-gray-400" />
                                    </div>
                                    <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-bold text-gray-800">
                                        {t.design.cat}
                                    </label>
                                 </div>
                             </div>
                         </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                         <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-bold text-gray-800">{t.design.installTitle}</h3>
                                <p className="text-xs text-gray-400 mt-1">{t.design.installSub}</p>
                            </div>
                            <MoreVertical size={20} className="text-gray-300 cursor-pointer" />
                         </div>
                         
                         <div className="flex gap-6 mb-6">
                             <div className="w-28 h-28 flex-shrink-0">
                                <button 
                                    onClick={handleAddIconClick} 
                                    className="w-full h-full rounded-2xl border-4 border-gray-100 flex items-center justify-center text-center shadow-md overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors group"
                                >
                                    {appData.iconUrl ? (
                                        <img src={appData.iconUrl} alt="App Icon" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-400 group-hover:text-pwa-green transition-colors">
                                            <ImageIcon size={24} />
                                            <span className="text-xs mt-1 font-medium">{t.design.upload}</span>
                                        </div>
                                    )}
                                </button>
                             </div>
                             <div className="flex-1 space-y-4">
                                 <div>
                                     <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.appName}</label>
                                     <input 
                                        type="text" 
                                        className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-pwa-green"
                                        value={appData.name}
                                        onChange={(e) => setAppData({...appData, name: e.target.value})}
                                     />
                                 </div>
                                 <div>
                                     <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.dev}</label>
                                     <div className="flex gap-2 items-center">
                                         <div className="relative flex-1">
                                            <input 
                                                type="text" 
                                                className="w-full bg-white border border-gray-200 rounded-lg p-2.5 pl-3 text-sm focus:outline-none focus:border-pwa-green"
                                                value={appData.developer}
                                                onChange={(e) => setAppData({...appData, developer: e.target.value})}
                                            />
                                            <Dices className="absolute right-3 top-2.5 text-gray-400" size={16} />
                                         </div>
                                         <div className="flex items-center gap-1.5 text-blue-500 text-sm font-bold bg-blue-50 px-3 py-2.5 rounded-lg">
                                             <div className="bg-blue-500 text-white rounded-full p-0.5"><div className="w-2.5 h-2.5">✓</div></div> 
                                             Verified
                                         </div>
                                     </div>
                                 </div>
                                 <div className="flex gap-4">
                                     <div className="flex-1">
                                         <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.size}</label>
                                         <div className="relative">
                                            <input type="text" value={appData.size} onChange={e => setAppData({...appData,size: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-pwa-green" />
                                            <Dices className="absolute right-3 top-2.5 text-gray-400" size={16} />
                                         </div>
                                     </div>
                                     <div className="flex-1">
                                         <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.age}</label>
                                         <div className="relative">
                                            <input type="text" value={appData.age} onChange={e => setAppData({...appData, age: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-pwa-green" />
                                            <Dices className="absolute right-3 top-2.5 text-gray-400" size={16} />
                                         </div>
                                     </div>
                                     <div className="flex-1">
                                         <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.downloads}</label>
                                         <div className="relative">
                                            <input type="text" value={appData.downloads} onChange={e => setAppData({...appData, downloads: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-pwa-green" />
                                            <Dices className="absolute right-3 top-2.5 text-gray-400" size={16} />
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                         <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-bold text-gray-800">{t.design.mediaTitle}</h3>
                                <p className="text-xs text-gray-400 mt-1">{t.design.mediaSub}</p>
                            </div>
                            <MoreVertical size={20} className="text-gray-300 cursor-pointer" />
                         </div>

                         <div className="mb-6">
                             <input 
                                type="text" 
                                placeholder="Youtube video URL"
                                className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-pwa-green mb-2"
                                value={appData.videoUrl}
                                onChange={(e) => setAppData({...appData, videoUrl: e.target.value})}
                             />
                             <div className="flex items-center gap-2 text-xs text-gray-500">
                                 <div className="bg-gray-400 rounded-full p-0.5 text-white w-3 h-3 flex items-center justify-center text-[8px] font-bold">i</div>
                                 {t.design.videoInfo}
                             </div>
                         </div>

                         <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                             {appData.screenshots.map((src, i) => (
                                 <div key={i} className="w-24 h-40 flex-shrink-0 relative rounded-lg overflow-hidden group shadow-sm">
                                     <img src={src} className="w-full h-full object-cover" />
                                     <button 
                                        onClick={() => handleRemoveScreenshot(i)}
                                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black">
                                         <X size={12} />
                                     </button>
                                 </div>
                             ))}
                             {appData.screenshots.length < 6 && Array.from({ length: 6 - appData.screenshots.length }).map((_, i) => (
                                 <div 
                                    key={`add-${i}`} 
                                    onClick={handleAddScreenshotClick}
                                    className="w-24 h-40 flex-shrink-0 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 hover:border-pwa-green hover:text-pwa-green transition-colors group">
                                     <ImageIcon size={24} className="mb-2" />
                                     <div className="bg-gray-200 group-hover:bg-pwa-green/20 rounded-full p-1 transition-colors"><Plus size={12} /></div>
                                 </div>
                             ))}
                         </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                         <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-bold text-gray-800">{t.design.descTitle}</h3>
                                <p className="text-xs text-gray-400 mt-1">{t.design.descSub}</p>
                            </div>
                            <MoreVertical size={20} className="text-gray-300 cursor-pointer" />
                         </div>
                         
                         <div className="flex items-center gap-3 mb-4">
                            <button className="bg-[#1F2937] text-white text-xs px-3 py-1.5 rounded font-medium flex items-center gap-1.5 hover:bg-black transition-colors">
                                {t.design.mainLang} <Plus size={12} />
                            </button>
                         </div>
                         
                         <div className="relative mb-6">
                            <label className="absolute top-[-8px] left-3 bg-white px-1 text-xs text-gray-400">{t.design.descLabel}</label>
                            <textarea 
                                className="w-full bg-white border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:border-pwa-green min-h-[200px] leading-relaxed resize-y"
                                value={appData.description}
                                onChange={(e) => setAppData({...appData, description: e.target.value})}
                            ></textarea>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-gray-200 rounded-full"></div>
                         </div>

                         <div className="mb-6">
                             <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">{t.design.tagsLabel}</label>
                             <div className="flex flex-wrap gap-2 mb-3">
                                 {appData.tags.map((tag, i) => (
                                     <div key={i} className="bg-cyan-100/50 text-cyan-800 px-3 py-1 rounded-full text-sm flex items-center gap-1.5">
                                         {tag}
                                         <button onClick={() => handleTagRemove(tag)} className="bg-cyan-200/50 rounded-full p-0.5 hover:bg-cyan-300/50"><X size={10} /></button>
                                     </div>
                                 ))}
                                 <button onClick={handleAddTag} className="text-gray-400 text-sm px-2 py-1 hover:text-gray-600 transition-colors">{t.design.addTags}</button>
                             </div>
                         </div>

                         <div className="flex gap-4">
                             <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                 <Sparkles size={16} />
                                 {t.design.genDesc}
                             </button>
                             <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                 <Dices size={16} />
                                 {t.design.randTags}
                             </button>
                         </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                         <div className="flex justify-between items-start mb-6">
                            <h3 className="font-bold text-gray-800">{t.design.ratingsTitle}</h3>
                            <MoreVertical size={20} className="text-gray-300 cursor-pointer" />
                         </div>
                         
                         <div className="flex flex-col md:flex-row gap-8">
                             <div className="flex-1 space-y-4">
                                 <div>
                                     <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">{t.design.rating}</label>
                                     <input 
                                        type="number" 
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-lg font-bold text-gray-800 focus:outline-none focus:border-pwa-green"
                                        value={appData.rating}
                                        onChange={(e) => setAppData({...appData, rating: Number(e.target.value)})}
                                        step="0.1"
                                        max="5"
                                     />
                                 </div>
                                 <div>
                                     <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">{t.design.reviewsCount}</label>
                                     <input 
                                        type="text" 
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-lg font-bold text-gray-800 focus:outline-none focus:border-pwa-green"
                                        value={appData.reviewsCount}
                                        onChange={(e) => setAppData({...appData, reviewsCount: e.target.value})}
                                     />
                                 </div>
                             </div>
                             
                             <div className="flex-1 flex flex-col justify-center gap-3 pt-2">
                                 {[5, 4, 3, 2, 1].map((star, index) => (
                                     <div key={star} className="flex items-center gap-3">
                                         <span className="text-xs font-bold text-gray-400 w-3">{star}</span>
                                         <input 
                                            type="range" 
                                            min="0" 
                                            max="100" 
                                            value={appData.ratingDistribution?.[index] ?? 0}
                                            onChange={(e) => handleDistributionChange(index, Number(e.target.value))}
                                            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-pwa-green"
                                         />
                                     </div>
                                 ))}
                             </div>
                         </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                         <div className="flex justify-between items-start mb-6">
                            <h3 className="font-bold text-gray-800">{t.design.commentsTitle}</h3>
                            <MoreVertical size={20} className="text-gray-300 cursor-pointer" />
                         </div>

                         <div className="flex items-center justify-between mb-8">
                             <div>
                                 <div className="font-bold text-sm text-gray-800">{t.design.keepDates}</div>
                                 <div className="text-xs text-gray-400 mt-1">{t.design.keepDatesSub}</div>
                             </div>
                             <div 
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${appData.keepReviewDatesCurrent ? 'bg-pwa-green' : 'bg-gray-200'}`}
                                onClick={() => setAppData({...appData, keepReviewDatesCurrent: !appData.keepReviewDatesCurrent})}
                             >
                                 <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${appData.keepReviewDatesCurrent ? 'translate-x-6' : ''}`}></div>
                             </div>
                         </div>

                         <div className="flex items-center gap-3 mb-6">
                            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                <Sparkles size={16} />
                                {t.design.editComment.genComment}
                            </button>
                            <button 
                                onClick={handleAddComment}
                                className="bg-[#1F2937] text-white text-xs px-3 py-1.5 rounded font-medium flex items-center gap-1.5 hover:bg-black transition-colors"
                            >
                                <Plus size={12} /> {lang === 'ru' ? 'Добавить комментарий' : 'Add comment'}
                            </button>
                         </div>

                         <div className="space-y-4">
                             {appData.comments.map((comment) => (
                                 <div key={comment.id} className="border border-gray-200 rounded-lg p-4 relative group hover:border-pwa-green transition-colors bg-white">
                                     <button 
                                        onClick={() => startEditingComment(comment)}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-pwa-green p-1 hover:bg-green-50 rounded transition-colors"
                                     >
                                        <Settings size={18} />
                                     </button>

                                     <div className="flex justify-between items-start mb-2 pr-8">
                                         <div className="flex items-center gap-3">
                                             <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                                                 {comment.avatarUrl ? (
                                                     <img src={comment.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                                                 ) : (
                                                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} alt="avatar" className="w-full h-full" />
                                                 )}
                                             </div>
                                             <div>
                                                <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                    {comment.user} 
                                                    <span className="text-gray-400 font-normal text-xs">• {comment.date}</span>
                                                    {comment.date === new Date().toLocaleDateString('ru-RU') && (
                                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase">Актуальная дата</span>
                                                    )}
                                                </div>
                                                <div className="flex gap-0.5 mt-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={12} fill={i < comment.rating ? "#FACC15" : "none"} className={i < comment.rating ? "text-yellow-400" : "text-gray-300"} />
                                                    ))}
                                                </div>
                                             </div>
                                         </div>
                                     </div>
                                     
                                     <p className="text-sm text-gray-600 leading-relaxed mb-3">{comment.text}</p>
                                     
                                     {comment.developerResponse && (
                                         <div className="mt-3 bg-gray-50 border-l-2 border-pwa-green p-3 rounded-r-lg">
                                             <div className="flex items-center gap-2 mb-1.5">
                                                 <div className="w-5 h-5 rounded-full bg-pwa-green flex items-center justify-center text-white shrink-0">
                                                     <Bot size={12} />
                                                 </div>
                                                 <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">{t.design.editComment.devResponse}</span>
                                             </div>
                                             <p className="text-xs text-gray-500 leading-relaxed italic">"{comment.developerResponse}"</p>
                                         </div>
                                     )}

                                     <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                                         <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                             <ThumbsUp size={12} />
                                             {comment.likes} {t.design.editComment.likes}
                                         </div>
                                         <button 
                                            onClick={() => startEditingComment(comment)}
                                            className="flex items-center gap-1 text-[11px] text-blue-500 font-medium hover:underline"
                                         >
                                             <MessageCircle size={12} /> {lang === 'ru' ? 'Ответить' : 'Reply'}
                                         </button>
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                  </>
              )}
              
              {/* Placeholder for other tabs */}
              {activeTab !== 'design' && activeTab !== 'tracker' && (
                  <div className="bg-white p-12 rounded-xl border border-gray-200 shadow-sm text-center text-gray-500 animate-in fade-in duration-300">
                      <Settings className="mx-auto mb-4 text-gray-300 animate-spin-slow" size={48} />
                      <p>Content for {activeTab} tab would go here.</p>
                      <p className="text-xs mt-2">Section is under development.</p>
                  </div>
              )}
              
          </div>

          {/* Sidebar / Preview Area */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
              {/* Progress Checklist */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">{t.design.process.title}</h3>
                  <ProgressItem label={t.design.process.domain} status="done" />
                  <ProgressItem label={t.design.process.offer} status={appData.offerLink ? "done" : "none"} />
                  <ProgressItem label={t.design.process.cloak} status={appData.geoCloaking === 'specific' ? "done" : "none"} />
                  <ProgressItem label={t.design.process.white} status={appData.enableWhitepage ? "done" : "none"} />
                  <ProgressItem label={t.design.process.design} status="done" />
                  <ProgressItem label={t.design.process.desc} status={appData.description ? "done" : "none"} />
                  <ProgressItem label={t.design.process.comments} status={appData.comments.length > 0 ? "done" : "none"} />
                  <ProgressItem label={t.design.process.pixels} status="none" />
              </div>

              {/* Phone Preview */}
              <div className="sticky top-24">
                   <PhoneMockup data={appData} />
              </div>
          </div>
      </div>
      <style>{`
          .animate-spin-slow {
              animation: spin 8s linear infinite;
          }
          @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
          }
      `}</style>
    </div>
  );
};

// Simple Bot icon for developer response
const Bot = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
);
