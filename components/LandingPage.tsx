
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Star, Send, X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { supabase } from '../supabaseClient';

interface LandingPageProps {
    lang: Language;
    setLang: (lang: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setLang }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close lang menu on click outside
    const handleClickOutside = (event: MouseEvent) => {
        if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
            setIsLangMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openAuth = (mode: 'login' | 'register') => {
      setAuthMode(mode);
      setIsAuthModalOpen(true);
      setError('');
      setEmail('');
      setPassword('');
      setName('');
  };

  const closeAuth = () => {
      setIsAuthModalOpen(false);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      try {
        if (authMode === 'register') {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (signUpError) throw signUpError;
            // Supabase auto signs in after sign up usually, App.tsx will catch it.
        } else {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;
        }
      } catch (err: any) {
          setError(err.message || 'An unexpected error occurred');
      } finally {
          setIsLoading(false);
      }
  };

  const handleGoogleLogin = async () => {
      setIsLoading(true);
      try {
          const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
          });
          if (error) throw error;
      } catch (err: any) {
          setError(err.message || 'Error with Google Login');
          setIsLoading(false);
      }
  };

  const flags = {
      ru: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png",
      en: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"
  };

  const t = {
    ru: {
        nav: {
            constructor: "Конструктор PWA",
            benefits: "Преимущества",
            pricing: "Цены",
            docs: "Документация"
        },
        buttons: {
            login: "Войти",
            register: "Зарегистрироваться"
        },
        hero: {
            titlePrefix: "Создайте свою",
            desc: "Быстрое создание PWA приложений в удобном конструкторе. Готовые дизайны, импорт из Google Play, пуши, постбеки - все внутри.",
            reviews: "(99+ отзывов)",
            subscribe: "ПОДПИШИТЕСЬ НА ОБНОВЛЕНИЯ"
        },
        footer: {
            integrations: "Интеграции и Партнеры"
        },
        auth: {
            loginTitle: "Вход в админку pwa.bot",
            regTitle: "Начать бесплатно",
            firstTime: "Впервые здесь?",
            alreadyHave: "Уже есть аккаунт?",
            createAccount: "Создайте аккаунт",
            loginLink: "Войдите",
            name: "Имя",
            email: "Email",
            password: "Пароль",
            forgot: "Забыли пароль?",
            loginBtn: "Войти",
            regBtn: "Зарегистрироваться",
            or: "или",
            google: "Войти через Google",
            policy: "Регистрируясь, я соглашаюсь с Правилами и Политикой конфиденциальности.",
            promo: "Промокод (если есть)"
        }
    },
    en: {
        nav: {
            constructor: "PWA Builder",
            benefits: "Benefits",
            pricing: "Pricing",
            docs: "Documentation"
        },
        buttons: {
            login: "Log In",
            register: "Sign Up"
        },
        hero: {
            titlePrefix: "Create your",
            desc: "Fast creation of PWA apps in a convenient builder. Ready-made designs, import from Google Play, pushes, postbacks - everything inside.",
            reviews: "(99+ reviews)",
            subscribe: "SUBSCRIBE FOR UPDATES"
        },
        footer: {
            integrations: "Integrations & Partners"
        },
        auth: {
            loginTitle: "Login to pwa.bot",
            regTitle: "Get started for free",
            firstTime: "New here?",
            alreadyHave: "Already have an account?",
            createAccount: "Create an account",
            loginLink: "Sign in",
            name: "Name",
            email: "Email",
            password: "Password",
            forgot: "Forgot password?",
            loginBtn: "Log In",
            regBtn: "Sign Up",
            or: "or",
            google: "Continue with Google",
            policy: "By registering, I agree to the Terms and Privacy Policy.",
            promo: "Promo code (if any)"
        }
    }
  }[lang];

  const toggleLang = (l: Language) => {
      setLang(l);
      setIsLangMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden selection:bg-green-100 selection:text-green-900">
      {/* Navbar */}
      <nav className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-gray-800 cursor-pointer">
           <Bot size={32} className="text-gray-800" />
           <div className="leading-none">
             <span>PWA</span><br/>
             <span className="text-gray-400 text-xs tracking-widest">BOT</span>
           </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-gray-600">
          <a href="#" className="hover:text-gray-900 transition-colors">{t.nav.constructor}</a>
          <a href="#" className="hover:text-gray-900 transition-colors">{t.nav.benefits}</a>
          <a href="#" className="hover:text-gray-900 transition-colors">{t.nav.pricing}</a>
          <a href="#" className="hover:text-gray-900 transition-colors flex items-center gap-1 group">
            {t.nav.docs}
            <span className="text-[10px] text-gray-400 group-hover:text-gray-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">↗</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
           {/* Language Switcher */}
           <div className="relative" ref={langMenuRef}>
               <div 
                  className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity mr-2"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
               >
                  <img src={flags[lang]} alt={lang.toUpperCase()} className="w-6 h-4 rounded-[2px] object-cover shadow-sm border border-gray-100" />
               </div>
               
               {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-36 z-50 animate-fade-in">
                    <button onClick={() => toggleLang('ru')} className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-sm ${lang === 'ru' ? 'bg-gray-50 font-medium' : ''}`}>
                        <img src={flags.ru} className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm" /> 
                        Русский
                    </button>
                    <button onClick={() => toggleLang('en')} className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-sm ${lang === 'en' ? 'bg-gray-50 font-medium' : ''}`}>
                        <img src={flags.en} className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm" /> 
                        English
                    </button>
                </div>
               )}
           </div>

           <button onClick={() => openAuth('login')} className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-semibold transition-colors">
             {t.buttons.login}
           </button>
           <button onClick={() => openAuth('register')} className="px-6 py-2.5 rounded-xl bg-[#1F2937] hover:bg-black text-white text-sm font-semibold transition-all hover:shadow-lg shadow-gray-200">
             {t.buttons.register}
           </button>
        </div>
      </nav>

      {/* Auth Modal Overlay */}
      {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="absolute top-6 right-6">
                  <button onClick={closeAuth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <X size={24} className="text-gray-500" />
                  </button>
              </div>

              <div className="w-full max-w-[400px] animate-in zoom-in-95 duration-200">
                  <div className="text-right mb-6">
                       <img src={flags[lang]} alt={lang} className="w-6 h-4 inline-block rounded-[2px] shadow-sm" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {authMode === 'login' ? t.auth.loginTitle : t.auth.regTitle}
                  </h2>
                  
                  <div className="text-sm text-gray-600 mb-8">
                      {authMode === 'login' ? (
                          <>
                              {t.auth.firstTime} <button onClick={() => setAuthMode('register')} className="text-[#10B981] font-medium hover:underline">{t.auth.createAccount}</button>
                          </>
                      ) : (
                          <>
                              {t.auth.alreadyHave} <button onClick={() => setAuthMode('login')} className="text-[#10B981] font-medium hover:underline">{t.auth.loginLink}</button>
                          </>
                      )}
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                      {authMode === 'register' && (
                          <div className="relative">
                              <input 
                                  type="text" 
                                  placeholder={t.auth.name}
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="w-full h-12 px-4 bg-blue-50/50 border border-blue-100 rounded-lg focus:outline-none focus:border-blue-300 focus:bg-white transition-colors placeholder-gray-400"
                              />
                              <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-bold text-gray-400 hidden">{t.auth.name}</label>
                          </div>
                      )}

                      <div className="relative group">
                          <input 
                              type="email" 
                              placeholder={t.auth.email}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full h-12 px-4 bg-blue-50/50 border border-blue-100 rounded-lg focus:outline-none focus:border-blue-300 focus:bg-white transition-colors placeholder-gray-400"
                              required
                          />
                          <label className={`absolute left-4 transition-all pointer-events-none ${email ? '-top-2 bg-white px-1 text-xs font-bold text-blue-400' : 'top-3 text-gray-400 opacity-0'}`}>{t.auth.email}</label>
                      </div>

                      <div className="relative group">
                          <input 
                              type={showPassword ? "text" : "password"}
                              placeholder={t.auth.password}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full h-12 px-4 bg-blue-50/50 border border-blue-100 rounded-lg focus:outline-none focus:border-blue-300 focus:bg-white transition-colors placeholder-gray-400"
                              required
                          />
                           <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                           </button>
                      </div>
                      
                      {authMode === 'register' && (
                          <div className="relative">
                              <input 
                                  type="text" 
                                  placeholder={t.auth.promo}
                                  className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors placeholder-gray-300"
                              />
                          </div>
                      )}

                      {error && (
                          <div className="text-red-500 text-sm text-center">{error}</div>
                      )}

                      {authMode === 'login' && (
                          <div className="text-right">
                              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 underline decoration-gray-300 underline-offset-4">{t.auth.forgot}</a>
                          </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full h-12 bg-[#1F2937] hover:bg-black text-white rounded-lg font-bold text-[15px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                      >
                          {isLoading ? <Loader2 size={20} className="animate-spin" /> : (authMode === 'login' ? t.auth.loginBtn : t.auth.regBtn)}
                      </button>
                  </form>

                  <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">{t.auth.or}</span>
                      </div>
                  </div>

                  <button 
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full h-12 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-lg flex items-center justify-center gap-3 transition-colors"
                  >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {t.auth.google}
                  </button>

                  {authMode === 'register' && (
                      <p className="mt-6 text-center text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                          {t.auth.policy.split('Правилами')[0]}
                          <a href="#" className="underline hover:text-gray-600">Правилами</a>
                          {lang === 'ru' && ' и '}
                          <a href="#" className="underline hover:text-gray-600">Политикой конфиденциальности</a>.
                      </p>
                  )}
              </div>
          </div>
      )}

      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-6 pt-12 lg:pt-20 pb-32 flex flex-col lg:flex-row items-center relative">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-50/50 rounded-full blur-3xl"></div>
        </div>

        {/* Text Content */}
        <div className="flex-1 z-10 lg:pr-20 mb-16 lg:mb-0 text-center lg:text-left">
           <h1 className="text-5xl lg:text-[4rem] font-bold leading-[1.1] mb-8 text-gray-900">
             {t.hero.titlePrefix} <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#84cc16] to-[#eab308]">PWA</span>
           </h1>
           <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
             {t.hero.desc}
           </p>

           <div className="flex items-center justify-center lg:justify-start gap-2 mb-10">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#FACC15" className="text-yellow-400" />)}
              </div>
              <span className="text-gray-900 font-bold ml-2 text-sm">4.97/5</span>
              <span className="text-gray-400 text-sm">{t.hero.reviews}</span>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => openAuth('register')} className="px-8 py-4 rounded-xl bg-[#1F2937] hover:bg-black text-white font-semibold text-base transition-all transform hover:-translate-y-1 shadow-xl shadow-gray-200/50">
                {t.buttons.register}
              </button>
              <button onClick={() => openAuth('login')} className="px-8 py-4 rounded-xl bg-white border-2 border-gray-100 hover:border-gray-300 text-gray-900 font-semibold text-base transition-all hover:bg-gray-50">
                {t.buttons.login}
              </button>
           </div>
           
           <div className="mt-16 inline-flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow group" onClick={() => window.open('https://t.me/pwabot_channel', '_blank')}>
              <span className="flex relative h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide group-hover:text-gray-600 transition-colors">{t.hero.subscribe}</span>
              <span className="text-sky-500 font-bold text-sm flex items-center gap-1 group-hover:text-sky-600">
                  <span className="text-lg">👇</span> pwabot_channel
              </span>
           </div>
        </div>

        {/* Visual Content - Skewed Phones */}
        <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative h-[500px] lg:h-[600px] perspective-[2000px]">
           
           {/* Decorative Elements */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-100/40 via-blue-100/40 to-green-100/40 blur-[100px] rounded-full pointer-events-none"></div>

           {/* Phone 1 (Left, Tilted) */}
           <div className="absolute top-[10%] -left-[5%] w-[45%] aspect-[9/19] bg-gray-900 rounded-[2rem] shadow-2xl border-[6px] border-gray-900 transform rotate-[-12deg] translate-y-12 z-10 transition-transform duration-700 hover:rotate-[-5deg] hover:z-30 hover:scale-105 group overflow-hidden">
                <img src="https://placehold.co/300x600/5b21b6/ffffff?text=Bonus+Win" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <div className="w-full">
                        <div className="h-1.5 w-12 bg-white/30 rounded-full mb-2"></div>
                        <div className="h-1.5 w-20 bg-white/20 rounded-full"></div>
                    </div>
                </div>
           </div>

           {/* Phone 2 (Right, Tilted) */}
           <div className="absolute top-[5%] right-0 w-[45%] aspect-[9/19] bg-gray-900 rounded-[2rem] shadow-2xl border-[6px] border-gray-900 transform rotate-[12deg] translate-y-20 z-10 transition-transform duration-700 hover:rotate-[5deg] hover:z-30 hover:scale-105 group overflow-hidden">
                <img src="https://placehold.co/300x600/0ea5e9/ffffff?text=Lucky+Slots" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                 </div>
           </div>

           {/* Phone 3 (Center, Main) */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] aspect-[9/19] bg-gray-900 rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-[8px] border-gray-900 z-20 transition-transform duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden ring-1 ring-white/10">
                {/* Simulated Screen Content - Sweet Bonanza Style */}
                <div className="w-full h-full bg-[#3b0764] relative">
                    <div className="absolute inset-0 bg-[url('https://placehold.co/400x800/ff0055/ffffff?text=Sweet+Bonanza')] bg-cover bg-center"></div>
                    
                    {/* UI Overlay */}
                    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent pt-20">
                        <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 rounded-xl shadow-lg shadow-green-900/50 transform active:scale-95 transition-all mb-3 animate-pulse">
                            PLAY NOW
                        </button>
                        <div className="flex justify-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-white/50"></div>
                             <div className="w-2 h-2 rounded-full bg-white"></div>
                             <div className="w-2 h-2 rounded-full bg-white/50"></div>
                        </div>
                    </div>
                    
                    {/* Floating Elements (Decorations) */}
                    <div className="absolute top-20 -left-4 w-12 h-12 bg-yellow-400 rounded-full blur-md opacity-60 animate-bounce"></div>
                    <div className="absolute bottom-40 -right-4 w-16 h-16 bg-pink-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                </div>
           </div>

        </div>
      </div>
      
      {/* Logos/Trust Section (Optional filler) */}
      <div className="border-t border-gray-100 py-10 bg-gray-50/50">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">{t.footer.integrations}</p>
              <div className="flex flex-wrap justify-center gap-8 lg:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-blue-600 rounded-full"></div> Facebook</div>
                  <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-green-500 rounded-full"></div> Google Ads</div>
                  <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-black rounded-full"></div> TikTok</div>
                  <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-orange-500 rounded-full"></div> Unity</div>
              </div>
          </div>
      </div>
    </div>
  )
}
