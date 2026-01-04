
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Play, Eye, Save, Globe, MousePointer, Monitor, MessageSquare, BarChart, Settings, Plus, X, Dices, Image as ImageIcon, Sparkles, Star, MoreVertical, Upload, Trash2, Calendar, ThumbsUp, Info, Search, ChevronDown, MessageCircle, Check, Layers, ArrowRight, Wand2, Copy } from 'lucide-react';
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

const AVAILABLE_DOMAINS = [
    'playpilot.sbs',
    'winbig.app',
    'lucky-spin.io',
    'best-game.zone',
    'app-store-mirror.net'
];

const translations: Record<Language, any> = {
    ru: {
        launch: "Запустить", preview: "Предпросмотр", save: "Сохранить", saved: "Сохранено",
        tabs: { domain: "Домен", tracker: "Трекер", design: "Оформление", analytics: "Аналитика", push: "Push-уведомления", extra: "Дополнительно" },
        stopped: "Остановлен",
        draft: "Черновик",
        domain: {
            title: "Домен",
            desc: "Для работы PWA необходим домен. Вы можете купить домен у нас или использовать свой.",
            buyTitle: "Купить готовый домен",
            ownTitle: "Использовать свой домен",
            buyPrice: "$5",
            ownPrice: "Бесплатно",
            selectTitle: "Выберите понравившийся домен",
            selectDesc: "Все домены уже настроены и работают. Ничего дополнительно настраивать не нужно.",
            ownDomainTitle: "Привязка домена",
            ownDomainDesc: "Укажите домен и данные вашего аккаунта Cloudflare. Мы автоматически настроим DNS и SSL.",
            selectLabel: "Домен",
            placeholder: "Выберите домен",
            ownPlaceholder: "example.com",
            cfEmail: "Cloudflare Email",
            cfKey: "Global API Key",
            cfIntegration: "Интеграция Cloudflare",
            cfAuto: "Запустить автонастройку",
            buyBtn: "Купить домен",
            checkBtn: "Проверить настройки",
            saveContinue: "Сохранить и продолжить"
        },
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
            langCatDesc: "Выберите основной язык, на котором будут отобраляться все системные надписи на странице установки PWA. Выбранная категория будет влиять на некоторые надписи на странице установки, а также на стиль и тематику при генерации описания и комментариев.",
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
            addComment: "Добавить комментарий",
            keepDates: "Держать даты отзывов актуальными",
            keepDatesSub: "При включении, даты отзывов всегда будут актуальными",
            editComment: {
                title: "Редактировать отзыв",
                username: "Имя пользователя",
                date: "Дата",
                rating: "Оценка",
                likes: "Лайки",
                text: "Текст отзыва",
                devResponse: "Ответ разработчика",
                avatar: "Аватар",
                uploadAvatar: "Загрузить фото",
                cancel: "Отмена",
                save: "Сохранить",
                delete: "Удалить",
                genComment: "Сгенерировать отзыв",
                genResponse: "Сгенерировать ответ"
            },
            process: {
                title: "Процесс настройки",
                domain: "Домен", offer: "Оффер", cloak: "Гео клоакинг", white: "Whitepage", design: "Оформление", desc: "Описание", comments: "Отзывы", pixels: "Пиксели",
                status: { done: "Готово", process: "В процессе", none: "Не заполнено" }
            }
        },
        analytics: {
            incoming: {
                title: "Входящие постбеки",
                desc: "Для отображения регистраций и депозитов в статистике pwa.bot, добавьте постбеки в вашу партнерскую сеть или трекер. Как настроить смотрите",
                here: "здесь",
                reg: "Postback на регистрации",
                dep: "Postback на депозиты"
            },
            outgoing: {
                title: "Исходящие постбеки",
                desc: "Здесь вы можете настроить передачу событий из pwa.bot во внешние системы.",
                install: "Установка",
                open: "Открытие",
                pushSub: "Подписка на PUSH",
                reg: "Регистрация",
                dep: "Депозит",
                method: "Метод"
            },
            integrations: {
                fb: "Интеграция с Facebook",
                bigo: "Интеграция с Bigo Ads (Likee, imo)",
                kwai: "Интеграция с KWAI Ads",
                snapchat: "Интеграция с Snapchat Ads",
                desc: "Подробнее о настройке интеграции",
                addPixel: "Добавить пиксель на страницу установки",
                addPixelDesc: "При включении, пиксель будет размещен на странице установки PWA",
                addBtn: "Добавить пиксель"
            }
        },
        push: {
            title: "PUSH-уведомления",
            desc: "Мы не знаем зачем это может понадобиться, но если вы хотите, то можете отключить запрос разрешения на отправку PUSH уведомлений при установке PWA.",
            collect: "Собирать подписки на PUSH",
            collectSub: "При установке PWA будет показан системный запрос на разрешение пуш-уведомлений."
        },
        extra: {
            title: "Дополнительные настройки",
            desc: "Сюда попало все, что не влезло в другие разделы.",
            richer: "Richer UI",
            richerSub: "Красивый системный интерфейс отображения запроса на установку приложения.",
            theme: "Автоматическая смена темы",
            themeSub: "При включении, тема оформления (светлая/темная) будет подстраиваться под устройство пользователя"
        },
        langs: { tr: "Турецкий", ru: "Русский", en: "Английский" }
    },
    en: {
        launch: "Launch", preview: "Preview", save: "Save", saved: "Saved",
        tabs: { domain: "Domain", tracker: "Tracker", design: "Design", analytics: "Analytics", push: "Push Notifications", extra: "Extra" },
        stopped: "Stopped",
        draft: "Draft",
        domain: {
            title: "Domain",
            desc: "A domain is required for PWA to work. You can buy one from us or use your own.",
            buyTitle: "Buy ready domain",
            ownTitle: "Use own domain",
            buyPrice: "$5",
            ownPrice: "Free",
            selectTitle: "Select a domain you like",
            selectDesc: "All domains are pre-configured and ready. No additional setup needed.",
            ownDomainTitle: "Domain Linkage",
            ownDomainDesc: "Specify domain and Cloudflare account details. We will automatically configure DNS and SSL.",
            selectLabel: "Domain",
            placeholder: "Select domain",
            ownPlaceholder: "example.com",
            cfEmail: "Cloudflare Email",
            cfKey: "Global API Key",
            cfIntegration: "Cloudflare Integration",
            cfAuto: "Run auto-setup",
            buyBtn: "Buy Domain",
            checkBtn: "Check settings",
            saveContinue: "Save and continue"
        },
        tracker: {
            offer: {
                title: "Offer and parameters",
                desc: "Enter the offer link where PWA users should be redirected. See how to configure parameters in the offer link",
                here: "here",
                placeholder: "Offer Link",
                macros: "Available macros:",
                passGet: "Pass GET parameters to offer",
                passGetSub: "When enabled, all GET parameters will be passed to the offer"
            },
            geo: {
                title: "Geo Cloaking",
                desc: "You can select one or more regions where the PWA will work. Users from other countries will be sent to the Whitepage. If Geo is selected but Whitepage is not configured or disabled, users will see a placeholder.",
                noCloak: "Cloaking not needed. Allow all GEOs",
                specific: "Allow only specific GEOs"
            },
            device: {
                title: "Device Cloaking",
                desc: "Traffic routing rules for different devices. If set to send to Whitepage but it's not configured, users will see a placeholder.",
                android: "Android devices only",
                androidSub: "When enabled, the PWA will work only for Android devices, and other traffic will be sent to the Whitepage."
            },
            whitepage: {
                title: "Whitepage",
                desc: "Here you can configure the whitepage to be displayed for inappropriate traffic.",
                enable: "Enable whitepage",
                enableSub: "When enabled, all inappropriate traffic will be redirected to the whitepage."
            }
        },
        design: {
            title: "Design Settings",
            desc: "You can do everything yourself or copy the design of an existing app.",
            copy: "Copy from Google Play",
            manual: "Do manually",
            langCatTitle: "PWA Language and Category",
            langCatDesc: "Choose the primary language for all system labels on the PWA install page. The selected category affects some labels on the install page and the style of generated descriptions and comments.",
            lang: "Language",
            cat: "Category",
            installTitle: "Install Page Design",
            installSub: "App Header",
            upload: "Upload",
            appName: "App Name",
            dev: "Developer",
            size: "Size",
            age: "Age",
            downloads: "Downloads",
            mediaTitle: "Images and Video",
            mediaSub: "Upload images and videos to display on the installation page",
            videoInfo: "The video will always be displayed first in the app screenshots",
            descTitle: "Description and Tags",
            descSub: "A good description and tags increase conversion. Do not neglect this.",
            mainLang: "Primary Language",
            descLabel: "App Description",
            tagsLabel: "Description Tags",
            addTags: "Add Tags",
            genDesc: "Generate description with ChatGPT",
            randTags: "Select random tags",
            ratingsTitle: "Ratings and Reviews",
            rating: "Rating",
            reviewsCount: "Reviews Count",
            commentsTitle: "Comments",
            addComment: "Add Comment",
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
        analytics: {
            incoming: {
                title: "Incoming Postbacks",
                desc: "To display registrations and deposits in pwa.bot statistics, add postbacks to your affiliate network or tracker. See how to configure",
                here: "here",
                reg: "Postback for registrations",
                dep: "Postback for deposits"
            },
            outgoing: {
                title: "Outgoing Postbacks",
                desc: "Here you can configure event transmission from pwa.bot to external systems.",
                install: "Install",
                open: "Open",
                pushSub: "Push Subscription",
                reg: "Registration",
                dep: "Deposit",
                method: "Method"
            },
            integrations: {
                fb: "Integration with Facebook",
                bigo: "Integration with Bigo Ads (Likee, imo)",
                kwai: "Integration with KWAI Ads",
                snapchat: "Integration with Snapchat Ads",
                desc: "Read more about integration configuration",
                addPixel: "Add pixel to install page",
                addPixelDesc: "When enabled, the pixel will be placed on the PWA installation page",
                addBtn: "Add Pixel"
            }
        },
        push: {
            title: "Push Notifications",
            desc: "We don't know why this might be needed, but if you want, you can disable the request for permission to send PUSH notifications when installing PWA.",
            collect: "Collect PUSH subscriptions",
            collectSub: "When installing PWA, a system request for push notification permission will be shown."
        },
        extra: {
            title: "Additional Settings",
            desc: "Here is everything that didn't fit into other sections.",
            richer: "Richer UI",
            richerSub: "Beautiful system interface for displaying the application installation request.",
            theme: "Automatic theme change",
            themeSub: "When enabled, the theme (light/dark) will adapt to the user's device"
        },
        langs: { tr: "Turkish", ru: "Russian", en: "English" }
    }
};

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
      geoCloaking: 'all' as 'all' | 'specific',
      androidOnly: true,
      enableWhitepage: false,
      language: 'Турецкий',
      languageCode: 'tr',
      push_ask_permission: true,
      extra_richer_ui: true,
      extra_auto_theme: false
};

const defaultData: Partial<PwaRow> = {
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
      geoCloaking: 'all' as 'all' | 'specific',
      androidOnly: false,
      enableWhitepage: false,
      language: 'Английский',
      languageCode: 'en',
      
      // Cloudflare
      cloudflareEmail: '',
      cloudflareApiKey: '',

      // Default Analytics
      postback_install_method: 'GET',
      postback_open_method: 'GET',
      postback_push_sub_method: 'GET',
      postback_reg_method: 'GET',
      postback_dep_method: 'GET',
      
      // Default Pixels
      pixel_fb_enabled: false,
      pixel_bigo_enabled: false,
      pixel_kwai_enabled: false,
      pixel_snapchat_enabled: false,

      // Default Push
      push_ask_permission: true,

      // Default Extra
      extra_richer_ui: false,
      extra_auto_theme: false
};

export const Editor: React.FC<EditorProps> = ({ onBack, onSave, lang, initialData }) => {
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('domain');
  const [saveBtnState, setSaveBtnState] = useState<'idle' | 'saved'>('idle');
  const [domainMode, setDomainMode] = useState<'buy' | 'own'>('buy');
  
  // State for the comment being edited
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [tempComment, setTempComment] = useState<any>(null);

  // State for Language Search Dropdown
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [langSearchQuery, setLangSearchQuery] = useState('');
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const [appData, setAppData] = useState<any>(() => {
      // Logic to determine if we load the full mock data or a blank slate
      if (initialData?.id === 'row3' || initialData?.name === 'Sweet Bananza LC') {
          return {
              ...defaultData, // Ensure defaults for new fields are present
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

  const handleSave = async () => {
      if (!initialData) return;
      
      const updatedRow: PwaRow = {
          ...initialData,
          ...appData,
          isApp: true, // Mark as configured app
      };
      
      // Auto-add domain to Vercel via API if domain is set and changed
      if (appData.domain && appData.domain !== initialData.domain && !appData.domain.includes('localhost')) {
          try {
              fetch('/api/add-domain', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ domain: appData.domain })
              }).catch(err => console.error("Auto-domain add failed silently:", err));
          } catch (e) {
              console.error("Failed to trigger domain add", e);
          }
      }

      onSave(updatedRow);
      
      setSaveBtnState('saved');
      setTimeout(() => setSaveBtnState('idle'), 2000);
  };

  const handleSaveAndContinue = () => {
      handleSave();
      const tabs = ['domain', 'tracker', 'design', 'analytics', 'push', 'extra'];
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex < tabs.length - 1) {
          setActiveTab(tabs[currentIndex + 1]);
      }
  };

  const handlePreview = () => {
    try {
        localStorage.setItem('pwa-preview-data', JSON.stringify(appData));
        handleSave();
    } catch (e) {
        console.error("Local storage sync error", e);
    }

    if (appData.domain && appData.domain.trim() !== '') {
        const domain = appData.domain.includes('://') ? appData.domain : `https://${appData.domain}`;
        const previewUrl = `${domain}/#preview`;
        window.open(previewUrl, '_blank');
    } else {
        window.location.hash = 'preview';
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

  // Helper for Outgoing Postback Inputs
  const OutgoingPostbackInput = ({ label, value, method, onChangeValue, onChangeMethod }: any) => (
       <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
           <div className="w-40 text-sm font-medium text-gray-700">{label}</div>
           <div className="flex-1">
               <input 
                    type="text" 
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pwa-green placeholder-gray-300"
                    placeholder={`URL для события ${label}`}
                    value={value || ''}
                    onChange={(e) => onChangeValue(e.target.value)}
               />
           </div>
           <div className="w-24">
                <select 
                    className="w-full bg-white border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-pwa-green"
                    value={method || 'GET'}
                    onChange={(e) => onChangeMethod(e.target.value)}
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                </select>
           </div>
       </div>
  );

  const handleTagRemove = (tagToRemove: string) => {
      setAppData({...appData, tags: appData.tags.filter((tag: string) => tag !== tagToRemove)});
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
    if (file && (appData.screenshots?.length || 0) < 6) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newScreenshots = [...(appData.screenshots || []), reader.result as string];
            setAppData({ ...appData, screenshots: newScreenshots });
        };
        reader.readAsDataURL(file);
    }
    if (event.target) {
        event.target.value = '';
    }
  };

  const handleRemoveScreenshot = (indexToRemove: number) => {
    const newScreenshots = (appData.screenshots || []).filter((_: string, index: number) => index !== indexToRemove);
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
      setAppData((prev: any) => {
          const exists = (prev.comments || []).some((c: any) => c.id === tempComment.id);
          return {
              ...prev,
              comments: exists 
                  ? prev.comments.map((c: any) => c.id === tempComment.id ? tempComment : c)
                  : [tempComment, ...(prev.comments || [])]
          };
      });
      setEditingCommentId(null);
      setTempComment(null);
  };

  const handleDeleteComment = () => {
      if (!tempComment) return;
      setAppData((prev: any) => ({
          ...prev,
          comments: (prev.comments || []).filter((c: any) => c.id !== tempComment.id)
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

  return (
    <div className="animate-fade-in pb-20 relative">
      <input type="file" ref={screenshotFileInputRef} onChange={handleScreenshotFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
      <input type="file" ref={iconFileInputRef} onChange={handleIconFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
      <input type="file" ref={commentAvatarInputRef} onChange={handleCommentAvatarChange} className="hidden" accept="image/png, image/jpeg, image/webp" />

       {/* Edit Comment Modal */}
      {editingCommentId && tempComment && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-gray-800">{t.design.editComment.title}</h3>
                      <button onClick={cancelEditing} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                  </div>
                  <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
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
                              <button onClick={() => commentAvatarInputRef.current?.click()} className="text-xs text-blue-600 font-medium hover:underline">
                                {t.design.editComment.uploadAvatar}
                              </button>
                          </div>
                          
                          <div className="flex-1 space-y-4">
                              <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.editComment.username}</label>
                                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors" value={tempComment.user} onChange={(e) => setTempComment({...tempComment, user: e.target.value})} />
                              </div>
                              <div className="flex gap-4">
                                  <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.editComment.date}</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors" value={tempComment.date} onChange={(e) => setTempComment({...tempComment, date: e.target.value})} placeholder="DD.MM.YYYY" />
                                  </div>
                                  <div className="w-24">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">{t.design.editComment.likes}</label>
                                      <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors" value={tempComment.likes} onChange={(e) => setTempComment({...tempComment, likes: Number(e.target.value)})} />
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div>
                          <label className="block text-xs font-medium text-gray-500 mb-2">{t.design.editComment.rating}</label>
                          <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                  <button key={star} type="button" onClick={() => setTempComment({...tempComment, rating: star})} className="focus:outline-none">
                                      <Star size={24} fill={star <= tempComment.rating ? "#FACC15" : "none"} className={star <= tempComment.rating ? "text-yellow-400" : "text-gray-300"} />
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div>
                          <div className="flex justify-between items-center mb-1">
                              <label className="block text-xs font-medium text-gray-500">{t.design.editComment.text}</label>
                              <button className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">
                                  <Sparkles size={12} /> {t.design.editComment.genComment}
                              </button>
                          </div>
                          <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors min-h-[100px] resize-y" value={tempComment.text} onChange={(e) => setTempComment({...tempComment, text: e.target.value})}></textarea>
                      </div>

                      <div>
                          <div className="flex justify-between items-center mb-1">
                              <label className="block text-xs font-medium text-gray-500">{t.design.editComment.devResponse}</label>
                              <button className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">
                                  <Sparkles size={12} /> {t.design.editComment.genResponse}
                              </button>
                          </div>
                          <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-pwa-green focus:bg-white transition-colors min-h-[80px] resize-y" value={tempComment.developerResponse || ''} onChange={(e) => setTempComment({...tempComment, developerResponse: e.target.value})} placeholder={lang === 'ru' ? 'Введите ваш ответ...' : 'Enter your reply...'}></textarea>
                      </div>

                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between gap-3">
                      <button onClick={handleDeleteComment} className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                          <Trash2 size={16} /> {t.design.editComment.delete}
                      </button>
                      <div className="flex gap-3">
                        <button onClick={cancelEditing} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors">
                            {t.design.editComment.cancel}
                        </button>
                        <button onClick={saveComment} className="px-4 py-2 rounded-lg text-sm font-medium bg-pwa-green text-white hover:bg-green-600 transition-colors shadow-sm">
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
              
              {/* Domain Tab Content */}
              {activeTab === 'domain' && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
                      <h3 className="font-bold text-gray-800 mb-1">{t.domain.title}</h3>
                      <p className="text-sm text-gray-400 mb-6">{t.domain.desc}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          <div 
                              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${domainMode === 'buy' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                              onClick={() => setDomainMode('buy')}
                          >
                              <Layers className="text-gray-900 mb-3" size={24} />
                              <div className="font-bold text-gray-900 mb-1">{t.domain.buyTitle}</div>
                              <div className="font-bold text-xl">{t.domain.buyPrice}</div>
                          </div>
                          
                          <div 
                              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${domainMode === 'own' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                              onClick={() => setDomainMode('own')}
                          >
                              <Layers className="text-gray-900 mb-3" size={24} />
                              <div className="font-bold text-gray-900 mb-1">{t.domain.ownTitle}</div>
                              <div className="font-bold text-xl">{t.domain.ownPrice}</div>
                          </div>
                      </div>

                      {domainMode === 'buy' ? (
                          <>
                              <h4 className="font-bold text-sm text-gray-800 mb-1">{t.domain.selectTitle}</h4>
                              <p className="text-xs text-gray-400 mb-4">{t.domain.selectDesc}</p>
                              
                              <div className="mb-6 relative">
                                  <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-bold text-gray-500">{t.domain.selectLabel}</label>
                                  <div className="relative">
                                      <select 
                                          className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white text-sm focus:outline-none focus:border-pwa-green appearance-none cursor-pointer"
                                          value={appData.domain || ''}
                                          onChange={(e) => setAppData({...appData, domain: e.target.value})}
                                      >
                                          <option value="" disabled>{t.domain.placeholder}</option>
                                          {AVAILABLE_DOMAINS.map(d => (
                                              <option key={d} value={d}>{d}</option>
                                          ))}
                                      </select>
                                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                  </div>
                              </div>

                              <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                                  {t.domain.buyBtn}
                              </button>
                              
                              <div className="mt-12 flex justify-end">
                                <button 
                                    onClick={handleSaveAndContinue}
                                    className="bg-[#1F2937] hover:bg-black text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-gray-200 flex items-center gap-2 transition-all"
                                >
                                    {t.domain.saveContinue}
                                    <ArrowRight size={16} />
                                </button>
                              </div>
                          </>
                      ) : (
                          <>
                            <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                                <h4 className="font-bold text-gray-900 mb-2">{t.domain.ownDomainTitle}</h4>
                                <p className="text-xs text-gray-500 mb-4">{t.domain.ownDomainDesc}</p>

                                <div className="space-y-3">
                                    <input 
                                        type="text" 
                                        placeholder={t.domain.ownPlaceholder} 
                                        value={appData.domain || ''}
                                        onChange={(e) => setAppData({...appData, domain: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-gray-300 focus:outline-none transition-colors"
                                    />
                                    <div className="flex gap-3">
                                        <input 
                                            type="text" 
                                            placeholder={t.domain.cfEmail} 
                                            value={appData.cloudflareEmail || ''}
                                            onChange={(e) => setAppData({...appData, cloudflareEmail: e.target.value})}
                                            className="w-1/2 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-gray-300 focus:outline-none transition-colors"
                                        />
                                        <input 
                                            type="text" 
                                            placeholder={t.domain.cfKey} 
                                            value={appData.cloudflareApiKey || ''}
                                            onChange={(e) => setAppData({...appData, cloudflareApiKey: e.target.value})}
                                            className="w-1/2 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-gray-300 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <h5 className="font-bold text-sm text-gray-900 mb-2">{t.domain.cfIntegration}</h5>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                                        <Wand2 size={16} /> {t.domain.cfAuto}
                                    </button>
                                </div>
                                
                                <div className="flex justify-end mt-4">
                                     <button onClick={handleSaveAndContinue} className="bg-[#111827] text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-black transition-colors shadow-md">
                                        {t.domain.saveContinue} <ArrowRight size={16} />
                                     </button>
                                </div>
                            </div>
                          </>
                      )}
                  </div>
              )}

              {/* Tracker Tab Content */}
              {activeTab === 'tracker' && (
                  <div className="space-y-6 animate-fade-in">
                      {/* Offer Section */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-1">{t.tracker.offer.title}</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.tracker.offer.desc} <a href="#" className="text-pwa-green hover:underline">{t.tracker.offer.here}</a>.</p>
                          
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
                          <h3 className="font-bold text-gray-800 mb-1">{t.tracker.geo.title}</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.tracker.geo.desc}</p>
                          
                          <div className="space-y-3">
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name="geoCloaking" 
                                    checked={appData.geoCloaking === 'all'} 
                                    onChange={() => setAppData({...appData, geoCloaking: 'all'})}
                                    className="text-pwa-green focus:ring-pwa-green" 
                                  />
                                  <span className="text-sm text-gray-700">{t.tracker.geo.noCloak}</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name="geoCloaking" 
                                    checked={appData.geoCloaking === 'specific'} 
                                    onChange={() => setAppData({...appData, geoCloaking: 'specific'})}
                                    className="text-pwa-green focus:ring-pwa-green" 
                                  />
                                  <span className="text-sm text-gray-700">{t.tracker.geo.specific}</span>
                              </label>
                          </div>
                      </div>

                      {/* Device Cloaking */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-1">{t.tracker.device.title}</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.tracker.device.desc}</p>
                          
                           <div className="flex items-center justify-between p-1">
                              <div>
                                  <div className="font-bold text-sm text-gray-800">{t.tracker.device.android}</div>
                                  <div className="text-xs text-gray-400 mt-1">{t.tracker.device.androidSub}</div>
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
                          
                           <div className="flex items-center justify-between p-1">
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
                  </div>
              )}
              
              {/* Design Tab Content */}
              {activeTab === 'design' && (
                  <div className="space-y-6 animate-fade-in">
                      {/* Copy vs Manual */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-4">
                          <button className="flex-1 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-bold text-gray-500 hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center gap-2">
                              <Copy size={20} />
                              {t.design.copy}
                          </button>
                          <button className="flex-1 py-3 border-2 border-gray-900 bg-gray-50 rounded-lg text-sm font-bold text-gray-900 flex flex-col items-center gap-2">
                              <Dices size={20} />
                              {t.design.manual}
                          </button>
                      </div>

                      {/* Language and Category */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative z-20">
                          <h3 className="font-bold text-gray-800 mb-1">{t.design.langCatTitle}</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.design.langCatDesc}</p>
                          
                          <div className="flex gap-4">
                              <div className="flex-1">
                                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.design.lang}</label>
                                  <div className="relative" ref={langDropdownRef}>
                                      <div 
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white text-sm flex items-center justify-between cursor-pointer"
                                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                      >
                                          <span>{appData.language || 'English'}</span>
                                          <ChevronDown size={16} className="text-gray-400" />
                                      </div>
                                      
                                      {isLangDropdownOpen && (
                                          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 p-2">
                                              <input 
                                                type="text" 
                                                placeholder="Search..." 
                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm mb-2 focus:outline-none"
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={(e) => setLangSearchQuery(e.target.value)}
                                              />
                                              {LANGUAGES.filter(l => l.name.toLowerCase().includes(langSearchQuery.toLowerCase())).map(lang => (
                                                  <div 
                                                    key={lang.code}
                                                    className="px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer text-sm flex justify-between"
                                                    onClick={() => {
                                                        setAppData({...appData, language: lang.name, languageCode: lang.code});
                                                        setIsLangDropdownOpen(false);
                                                    }}
                                                  >
                                                      <span>{lang.name}</span>
                                                      <span className="text-gray-400 text-xs">{lang.native}</span>
                                                  </div>
                                              ))}
                                          </div>
                                      )}
                                  </div>
                              </div>
                              <div className="flex-1">
                                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.design.cat}</label>
                                  <div className="relative">
                                      <select 
                                          className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white text-sm focus:outline-none focus:border-pwa-green appearance-none cursor-pointer"
                                          value={appData.category || ''}
                                          onChange={(e) => setAppData({...appData, category: e.target.value})}
                                      >
                                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                      </select>
                                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Header Info */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-1">{t.design.installTitle}</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.design.installSub}</p>

                          <div className="flex gap-6 mb-6">
                              <div className="flex flex-col gap-2">
                                  <div className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative group" onClick={handleAddIconClick}>
                                      {appData.iconUrl ? (
                                          <img src={appData.iconUrl} alt="icon" className="w-full h-full object-cover rounded-2xl" />
                                      ) : (
                                          <ImageIcon className="text-gray-400" />
                                      )}
                                      <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                          <Upload className="text-white" size={24} />
                                      </div>
                                  </div>
                                  <button onClick={handleAddIconClick} className="text-xs font-bold text-blue-600 hover:underline text-center">{t.design.upload}</button>
                              </div>
                              <div className="flex-1 space-y-4">
                                  <div>
                                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.design.appName}</label>
                                      <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pwa-green" value={appData.name} onChange={(e) => setAppData({...appData, name: e.target.value})} />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.design.dev}</label>
                                      <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pwa-green" value={appData.developer} onChange={(e) => setAppData({...appData, developer: e.target.value})} />
                                  </div>
                              </div>
                          </div>

                          <div className="flex gap-4">
                              <div className="flex-1">
                                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.design.size}</label>
                                  <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pwa-green" value={appData.size} onChange={(e) => setAppData({...appData, size: e.target.value})} />
                              </div>
                              <div className="flex-1">
                                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.design.age}</label>
                                  <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pwa-green" value={appData.age} onChange={(e) => setAppData({...appData, age: e.target.value})} />
                              </div>
                              <div className="flex-1">
                                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.design.downloads}</label>
                                  <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pwa-green" value={appData.downloads} onChange={(e) => setAppData({...appData, downloads: e.target.value})} />
                              </div>
                          </div>
                      </div>

                      {/* Media */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-1">{t.design.mediaTitle}</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.design.mediaSub}</p>

                          <div className="grid grid-cols-4 gap-4 mb-4">
                               {appData.screenshots?.map((src: string, index: number) => (
                                   <div key={index} className="relative aspect-[9/16] rounded-lg overflow-hidden group">
                                       <img src={src} className="w-full h-full object-cover" />
                                       <button 
                                            onClick={() => handleRemoveScreenshot(index)}
                                            className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                       >
                                           <X size={14} />
                                       </button>
                                   </div>
                               ))}
                               {(appData.screenshots?.length || 0) < 6 && (
                                   <div 
                                        className="aspect-[9/16] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={handleAddScreenshotClick}
                                   >
                                       <Plus size={24} className="mb-2" />
                                       <span className="text-xs font-bold">{t.design.upload}</span>
                                   </div>
                               )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Info size={14} /> {t.design.videoInfo}
                          </div>
                      </div>

                      {/* Description */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-1">{t.design.descTitle}</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.design.descSub}</p>

                          <div className="mb-6">
                              <div className="flex justify-between items-center mb-2">
                                  <label className="block text-xs font-bold text-gray-400 uppercase">{t.design.descLabel}</label>
                                  <button className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded transition-colors">
                                      <Sparkles size={12} /> {t.design.genDesc}
                                  </button>
                              </div>
                              <textarea 
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pwa-green min-h-[120px] resize-y"
                                value={appData.description}
                                onChange={(e) => setAppData({...appData, description: e.target.value})}
                              ></textarea>
                          </div>

                          <div>
                              <div className="flex justify-between items-center mb-2">
                                  <label className="block text-xs font-bold text-gray-400 uppercase">{t.design.tagsLabel}</label>
                                  <button className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-gray-700 bg-gray-100 px-2 py-1 rounded transition-colors">
                                      <Dices size={12} /> {t.design.randTags}
                                  </button>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-2">
                                  {appData.tags?.map((tag: string) => (
                                      <div key={tag} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium group">
                                          {tag}
                                          <button onClick={() => handleTagRemove(tag)} className="text-gray-400 hover:text-red-500 ml-1"><X size={12} /></button>
                                      </div>
                                  ))}
                                  <button 
                                    onClick={handleAddTag}
                                    className="flex items-center gap-1 border border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                                  >
                                      <Plus size={12} /> {t.design.addTags}
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Ratings */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-6">{t.design.ratingsTitle}</h3>
                          
                          <div className="flex gap-6 items-start">
                              <div className="w-32">
                                  <div className="text-5xl font-bold text-gray-900 mb-1">{appData.rating}</div>
                                  <div className="flex text-yellow-400 mb-2">
                                      {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                  </div>
                                  <div className="text-xs text-gray-400 font-bold">{appData.reviewsCount} Reviews</div>
                              </div>
                              
                              <div className="flex-1 space-y-2">
                                  {[5,4,3,2,1].map((r, i) => (
                                      <div key={r} className="flex items-center gap-3">
                                          <span className="text-xs font-bold text-gray-400 w-2">{r}</span>
                                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                              <div 
                                                className="h-full bg-green-500 rounded-full" 
                                                style={{ width: `${appData.ratingDistribution?.[i] || 0}%` }}
                                              ></div>
                                          </div>
                                          <input 
                                            type="range" 
                                            min="0" 
                                            max="100" 
                                            value={appData.ratingDistribution?.[i] || 0}
                                            onChange={(e) => handleDistributionChange(i, Number(e.target.value))}
                                            className="w-20"
                                          />
                                      </div>
                                  ))}
                              </div>
                          </div>
                          
                          <div className="flex gap-4 mt-6">
                              <div className="flex-1">
                                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.design.rating}</label>
                                  <input type="number" step="0.1" max="5" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pwa-green" value={appData.rating} onChange={(e) => setAppData({...appData, rating: Number(e.target.value)})} />
                              </div>
                              <div className="flex-1">
                                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.design.reviewsCount}</label>
                                  <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-pwa-green" value={appData.reviewsCount} onChange={(e) => setAppData({...appData, reviewsCount: e.target.value})} />
                              </div>
                          </div>
                      </div>

                      {/* Comments */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-6">
                              <h3 className="font-bold text-gray-800">{t.design.commentsTitle}</h3>
                              <button onClick={handleAddComment} className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-black transition-colors">
                                  <Plus size={14} /> {t.design.addComment}
                              </button>
                          </div>

                           <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6">
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

                          <div className="space-y-4">
                              {appData.comments?.map((comment: any) => (
                                  <div key={comment.id} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors bg-white group relative">
                                      <div className="flex justify-between items-start mb-2">
                                          <div className="flex items-center gap-3">
                                               <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                                                   {comment.avatarUrl ? (
                                                       <img src={comment.avatarUrl} className="w-full h-full object-cover" />
                                                   ) : (
                                                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} className="w-full h-full" />
                                                   )}
                                               </div>
                                               <div>
                                                   <div className="text-sm font-bold text-gray-900">{comment.user}</div>
                                                   <div className="text-xs text-gray-400">{comment.date}</div>
                                               </div>
                                          </div>
                                          <div className="flex text-yellow-400 gap-0.5">
                                              {[...Array(5)].map((_, i) => (
                                                  <Star key={i} size={12} fill={i < comment.rating ? "currentColor" : "none"} className={i < comment.rating ? "" : "text-gray-200"} />
                                              ))}
                                          </div>
                                      </div>
                                      <p className="text-sm text-gray-600 line-clamp-2">{comment.text}</p>
                                      
                                      <button 
                                        onClick={() => startEditingComment(comment)}
                                        className="absolute top-4 right-4 p-2 bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all text-gray-600"
                                      >
                                          <Settings size={16} />
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              )}

              {/* Analytics Tab Content */}
              {activeTab === 'analytics' && (
                  <div className="space-y-6 animate-fade-in">
                      {/* Incoming Postbacks */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-1">{t.analytics.incoming.title}</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.analytics.incoming.desc} <a href="#" className="text-pwa-green hover:underline">{t.analytics.incoming.here}</a>.</p>
                          
                          <div className="space-y-4">
                              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs text-gray-600 break-all">
                                  <span className="text-gray-400 select-none block mb-1 text-[10px] font-sans font-bold uppercase">{t.analytics.incoming.reg}</span>
                                  https://pwa.bot/api/postback?click_id={'{click_id}'}&event=reg
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs text-gray-600 break-all">
                                  <span className="text-gray-400 select-none block mb-1 text-[10px] font-sans font-bold uppercase">{t.analytics.incoming.dep}</span>
                                  https://pwa.bot/api/postback?click_id={'{click_id}'}&event=dep&amount={'{amount}'}
                              </div>
                          </div>
                      </div>

                      {/* Outgoing Postbacks */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-1">{t.analytics.outgoing.title}</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.analytics.outgoing.desc}</p>
                          
                          <OutgoingPostbackInput 
                            label={t.analytics.outgoing.install} 
                            value={appData.postback_install} 
                            method={appData.postback_install_method}
                            onChangeValue={(v: string) => setAppData({...appData, postback_install: v})}
                            onChangeMethod={(v: string) => setAppData({...appData, postback_install_method: v})}
                          />
                          <OutgoingPostbackInput 
                            label={t.analytics.outgoing.open} 
                            value={appData.postback_open} 
                            method={appData.postback_open_method}
                            onChangeValue={(v: string) => setAppData({...appData, postback_open: v})}
                            onChangeMethod={(v: string) => setAppData({...appData, postback_open_method: v})}
                          />
                          <OutgoingPostbackInput 
                            label={t.analytics.outgoing.pushSub} 
                            value={appData.postback_push_sub} 
                            method={appData.postback_push_sub_method}
                            onChangeValue={(v: string) => setAppData({...appData, postback_push_sub: v})}
                            onChangeMethod={(v: string) => setAppData({...appData, postback_push_sub_method: v})}
                          />
                          <OutgoingPostbackInput 
                            label={t.analytics.outgoing.reg} 
                            value={appData.postback_reg} 
                            method={appData.postback_reg_method}
                            onChangeValue={(v: string) => setAppData({...appData, postback_reg: v})}
                            onChangeMethod={(v: string) => setAppData({...appData, postback_reg_method: v})}
                          />
                          <OutgoingPostbackInput 
                            label={t.analytics.outgoing.dep} 
                            value={appData.postback_dep} 
                            method={appData.postback_dep_method}
                            onChangeValue={(v: string) => setAppData({...appData, postback_dep: v})}
                            onChangeMethod={(v: string) => setAppData({...appData, postback_dep_method: v})}
                          />
                      </div>

                      {/* Integrations */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-1">Integrations</h3>
                          <p className="text-sm text-gray-400 mb-6">{t.analytics.integrations.desc}</p>

                          <div className="space-y-4">
                              {[
                                  { id: 'fb', label: t.analytics.integrations.fb, enabled: appData.pixel_fb_enabled, val: appData.pixel_fb_id },
                                  { id: 'bigo', label: t.analytics.integrations.bigo, enabled: appData.pixel_bigo_enabled, val: appData.pixel_bigo_id },
                                  { id: 'kwai', label: t.analytics.integrations.kwai, enabled: appData.pixel_kwai_enabled, val: appData.pixel_kwai_id },
                                  { id: 'snapchat', label: t.analytics.integrations.snapchat, enabled: appData.pixel_snapchat_enabled, val: appData.pixel_snapchat_id },
                              ].map((item: any) => (
                                  <div key={item.id} className="border border-gray-200 rounded-xl p-4 transition-all bg-white hover:border-gray-300">
                                      <div className="flex items-center justify-between mb-3">
                                          <div className="font-bold text-sm text-gray-800">{item.label}</div>
                                          <div 
                                            className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${item.enabled ? 'bg-pwa-green' : 'bg-gray-200'}`}
                                            onClick={() => setAppData({...appData, [`pixel_${item.id}_enabled`]: !item.enabled})}
                                          >
                                              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${item.enabled ? 'translate-x-5' : ''}`}></div>
                                          </div>
                                      </div>
                                      {item.enabled && (
                                          <div className="animate-in fade-in slide-in-from-top-2">
                                              <input 
                                                type="text" 
                                                placeholder="Pixel ID" 
                                                value={item.val || ''}
                                                onChange={(e) => setAppData({...appData, [`pixel_${item.id}_id`]: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pwa-green" 
                                              />
                                          </div>
                                      )}
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              )}

              {/* Push Tab Content */}
              {activeTab === 'push' && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                      <h3 className="font-bold text-gray-800 mb-1">{t.push.title}</h3>
                      <p className="text-sm text-gray-400 mb-6">{t.push.desc}</p>
                      
                       <div className="flex items-center justify-between p-1">
                          <div>
                              <div className="font-bold text-sm text-gray-800">{t.push.collect}</div>
                              <div className="text-xs text-gray-400 mt-1">{t.push.collectSub}</div>
                          </div>
                          <div 
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${appData.push_ask_permission ? 'bg-pwa-green' : 'bg-gray-200'}`} 
                            onClick={() => setAppData({...appData, push_ask_permission: !appData.push_ask_permission})}
                          >
                              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${appData.push_ask_permission ? 'translate-x-6' : ''}`}></div>
                          </div>
                      </div>
                  </div>
              )}

              {/* Extra Tab Content */}
              {activeTab === 'extra' && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                      <h3 className="font-bold text-gray-800 mb-1">{t.extra.title}</h3>
                      <p className="text-sm text-gray-400 mb-6">{t.extra.desc}</p>
                      
                       <div className="flex items-center justify-between p-1 mb-6 border-b border-gray-50 pb-6">
                          <div>
                              <div className="font-bold text-sm text-gray-800">{t.extra.richer}</div>
                              <div className="text-xs text-gray-400 mt-1">{t.extra.richerSub}</div>
                          </div>
                          <div 
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${appData.extra_richer_ui ? 'bg-pwa-green' : 'bg-gray-200'}`} 
                            onClick={() => setAppData({...appData, extra_richer_ui: !appData.extra_richer_ui})}
                          >
                              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${appData.extra_richer_ui ? 'translate-x-6' : ''}`}></div>
                          </div>
                      </div>

                      <div className="flex items-center justify-between p-1">
                          <div>
                              <div className="font-bold text-sm text-gray-800">{t.extra.theme}</div>
                              <div className="text-xs text-gray-400 mt-1">{t.extra.themeSub}</div>
                          </div>
                          <div 
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${appData.extra_auto_theme ? 'bg-pwa-green' : 'bg-gray-200'}`} 
                            onClick={() => setAppData({...appData, extra_auto_theme: !appData.extra_auto_theme})}
                          >
                              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${appData.extra_auto_theme ? 'translate-x-6' : ''}`}></div>
                          </div>
                      </div>
                  </div>
              )}
          </div>

          {/* Sidebar / Preview Area */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
              {/* Progress Checklist */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">{t.design.process.title}</h3>
                  <ProgressItem label={t.design.process.domain} status={appData.domain ? "done" : "process"} />
                  <ProgressItem label={t.design.process.offer} status={appData.offerLink ? "done" : "none"} />
                  <ProgressItem label={t.design.process.cloak} status={appData.geoCloaking === 'specific' ? "done" : "none"} />
                  <ProgressItem label={t.design.process.white} status={appData.enableWhitepage ? "done" : "none"} />
                  <ProgressItem label={t.design.process.design} status="done" />
                  <ProgressItem label={t.design.process.desc} status={appData.description ? "done" : "none"} />
                  <ProgressItem label={t.design.process.comments} status={(appData.comments?.length || 0) > 0 ? "done" : "none"} />
                  <ProgressItem label={t.design.process.pixels} status={(appData.pixel_fb_enabled || appData.pixel_bigo_enabled || appData.pixel_kwai_enabled || appData.pixel_snapchat_enabled) ? "done" : "none"} />
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
