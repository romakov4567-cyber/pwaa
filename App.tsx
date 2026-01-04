
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Editor } from './components/Editor';
import { LandingPage } from './components/LandingPage';
import { PreviewPage } from './components/PreviewPage';
import { Analytics } from './components/Analytics';
import { Invoices } from './components/Invoices';
import { Search, Command, Sun, User, ChevronDown, LogOut, Loader2, Cloud, CloudOff, Wallet } from 'lucide-react';
import { Language, PwaRow, Invoice } from './types';
import { supabase } from './supabaseClient';

export type ViewState = 'dashboard' | 'editor' | 'analytics' | 'invoices';

// Helper to determine view from URL hash or path
const getViewFromUrl = (): ViewState => {
  const hash = window.location.hash.replace('#', '').split('?')[0];
  if (['dashboard', 'editor', 'analytics', 'invoices'].includes(hash)) {
    return hash as ViewState;
  }
  
  // Fallback to path for legacy or direct access
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith('/analytics')) return 'analytics';
  if (path.startsWith('/invoices')) return 'invoices';
  if (path.startsWith('/editor')) return 'editor';
  return 'dashboard';
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Initialize currentView based on the current URL
  const [currentView, setCurrentView] = useState<ViewState>(getViewFromUrl);
  
  const [hash, setHash] = useState(window.location.hash);
  const [lang, setLang] = useState<Language>('ru');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // User Data State
  const [rows, setRows] = useState<PwaRow[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  
  // Editor State
  const [editingPwa, setEditingPwa] = useState<PwaRow | null>(null);

  // PWA / Public Mode State
  const [isPwaMode, setIsPwaMode] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Check for Standalone Mode OR Custom Domain on Mount
  useEffect(() => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
      const hostname = window.location.hostname;
      
      // Define domains that should show the Admin Panel (Builder)
      // Modify 'pwa.bot' to your actual main domain if different
      const isBuilderDomain = hostname.includes('localhost') || hostname.includes('.vercel.app') || hostname === 'pwa.bot' || hostname === 'www.pwa.bot';

      // If it's a standalone install OR a custom user domain (not the builder), show PWA Mode
      // We also allow manual preview via hash on the builder domain
      if (isStandalone || (!isBuilderDomain) || window.location.hash === '#preview') {
          setIsPwaMode(true);
      }
  }, []);

  // Initialize Auth
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
          console.error('Error restoring session:', error);
      }
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        loadUserData(session.user.id);
      }
    }).catch(err => {
        console.error('Unexpected error during session restore:', err);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        loadUserData(session.user.id);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setRows([]);
        setBalance(0);
        setInvoices([]);
      }
    });

    const handleHashChange = () => {
      const currentHash = window.location.hash;
      setHash(currentHash);
      if (currentHash === '#preview') {
          setIsPwaMode(true);
      } 
      // Note: We don't automatically set isPwaMode to false here to protect custom domains
      const view = getViewFromUrl();
      setCurrentView(view);
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle Browser Back Button (Popstate)
    const handlePopState = () => {
        setCurrentView(getViewFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    
    // Close menus on click outside
    const handleClickOutside = (event: MouseEvent) => {
        if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
            setIsLangMenuOpen(false);
        }
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
            setIsProfileMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        subscription.unsubscribe();
        window.removeEventListener('hashchange', handleHashChange);
        window.removeEventListener('popstate', handlePopState);
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Save data whenever it changes and user is logged in (Debounced)
  useEffect(() => {
      if (user && isAuthenticated) {
          setSaveStatus('saving');
          const timer = setTimeout(async () => {
              try {
                  const payload = {
                      user_id: user.id,
                      email: user.email, 
                      full_name: user.user_metadata?.full_name || '', 
                      balance: balance,
                      pwas: rows,
                      invoices: invoices
                  };
                  
                  const { error } = await supabase
                      .from('drumsky')
                      .upsert(payload, { onConflict: 'user_id' });

                  if (error) {
                      console.error('Error saving data to Supabase:', error);
                      setSaveStatus('error');
                  } else {
                      setSaveStatus('saved');
                  }
              } catch (err) {
                  console.error('Unexpected error saving data:', err);
                  setSaveStatus('error');
              }
          }, 1000); // 1s debounce

          return () => clearTimeout(timer);
      }
  }, [rows, balance, invoices, user, isAuthenticated]);

  const loadUserData = async (userId: string) => {
      setSaveStatus('saving');
      try {
          const { data, error } = await supabase
              .from('drumsky')
              .select('balance, pwas, invoices')
              .eq('user_id', userId)
              .single();

          if (error) {
              if (error.code !== 'PGRST116') { 
                 console.error('Error loading data:', error);
                 setSaveStatus('error');
              } else {
                 setSaveStatus('saved'); 
              }
              setRows([]);
              setBalance(0);
              setInvoices([]);
          } else if (data) {
              setRows(data.pwas || []);
              setBalance(data.balance || 0);
              setInvoices(data.invoices || []);
              setSaveStatus('saved');
          }
      } catch (err) {
          console.error('Unexpected error loading data:', err);
          setSaveStatus('error');
      }
  };

  const handleLogout = async () => {
      try {
          await supabase.auth.signOut();
      } catch (e) {
          console.error('Error signing out:', e);
      }
      setIsAuthenticated(false);
      setUser(null);
      setIsProfileMenuOpen(false);
      setRows([]);
      setBalance(0);
      setInvoices([]);
      // Use hash for navigation to avoid SecurityError
      window.location.hash = '';
      setCurrentView('dashboard');
  };

  const handleCreateInvoice = (invoice: Invoice) => {
      setInvoices(prev => [invoice, ...prev]);
  };

  // PWA MODE RENDER (Public or Standalone)
  if (isPwaMode) {
      return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-50">
            <PreviewPage lang={lang} />
        </div>
      );
  }

  if (!isAuthenticated) {
    return <LandingPage lang={lang} setLang={setLang} />;
  }

  const toggleLang = (l: Language) => {
      setLang(l);
      setIsLangMenuOpen(false);
  };
  
  // Updated to use hash-based routing
  const updateUrl = (view: ViewState) => {
      window.location.hash = view === 'dashboard' ? '' : view;
  };

  const handleNavigate = (view: ViewState) => {
      setCurrentView(view);
      updateUrl(view);
  };
  
  const handleCreatePwa = () => {
    const newDraft: PwaRow = {
        id: `row_${Date.now()}`,
        name: 'New Application',
        isApp: false,
        date: new Date().toLocaleDateString('ru-RU'),
        status: 'draft'
    };
    setRows(currentRows => [newDraft, ...currentRows]);
    setEditingPwa(newDraft);
    setCurrentView('editor');
    updateUrl('editor');
  };
  
  const handleSavePwa = (updatedPwa: PwaRow) => {
      setRows(prevRows => prevRows.map(row => 
          row.id === updatedPwa.id ? updatedPwa : row
      ));
      setEditingPwa(updatedPwa);
  };

  const handleDeletePwa = (idToDelete: string) => {
      setRows(currentRows => currentRows.filter(row => row.id !== idToDelete));
  };
  
  const handleEditPwa = (row: PwaRow) => {
      setEditingPwa(row);
      setCurrentView('editor');
      updateUrl('editor');
  };

  const flags = {
      ru: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png",
      en: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"
  };

  const t = {
      ru: {
          myPwa: "Мои PWA",
          profile: "Профиль",
          logout: "Выйти",
          balance: "Баланс"
      },
      en: {
          myPwa: "My PWA",
          profile: "Profile",
          logout: "Logout",
          balance: "Balance"
      }
  };

  // Header Component
  const Header = () => (
    <header className="h-16 bg-white border-b border-pwa-border flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {currentView === 'editor' && (
             <div className="text-sm text-pwa-muted flex items-center gap-2">
                 <span 
                    className="cursor-pointer hover:text-pwa-green" 
                    onClick={() => handleNavigate('dashboard')}
                 >
                    {t[lang].myPwa}
                 </span>
                 <span>/</span>
                 <span className="text-pwa-text font-medium">{editingPwa?.name || 'New Application'}</span>
             </div>
        )}
      </div>
      
      <div className="flex items-center gap-6">
        {/* Save Status Indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs transition-colors">
            {saveStatus === 'saving' && (
                <>
                    <Loader2 size={14} className="animate-spin text-gray-400" />
                    <span className="text-gray-400">Saving...</span>
                </>
            )}
            {saveStatus === 'saved' && (
                <>
                    <Cloud size={14} className="text-green-500" />
                    <span className="text-green-600">Saved</span>
                </>
            )}
            {saveStatus === 'error' && (
                <>
                    <CloudOff size={14} className="text-red-500" />
                    <span className="text-red-500">Sync Error</span>
                </>
            )}
        </div>

        <div className="flex items-center gap-4 text-pwa-muted">
           <Search size={20} className="cursor-pointer hover:text-pwa-text" />
           <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs font-mono cursor-pointer hover:bg-gray-200">
              <Command size={14} />
              <span>K</span>
           </div>
        </div>
        
        {/* Balance with clearer label */}
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <div className="flex flex-col items-end leading-none">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{t[lang].balance}</span>
                <span className="font-bold text-pwa-dark text-base">${balance.toFixed(2)}</span>
            </div>
            <Wallet size={18} className="text-pwa-green" />
        </div>
        
        <div className="relative" ref={langMenuRef}>
            <div className="flex items-center gap-3 pl-4 border-l border-pwa-border">
                <img 
                    src={flags[lang]} 
                    alt={lang.toUpperCase()} 
                    className="w-5 h-3.5 rounded-sm object-cover shadow-sm cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                />
                <Sun size={20} className="text-yellow-500 cursor-pointer hover:opacity-80" />
                
                {/* Profile Dropdown */}
                <div className="relative" ref={profileMenuRef}>
                    <div 
                        className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold border border-gray-300 cursor-pointer hover:bg-black transition-colors"
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        {user?.email ? user.email[0].toUpperCase() : <User size={16} />}
                    </div>

                    {isProfileMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-56 z-50 animate-fade-in">
                            <div className="px-4 py-3 border-b border-gray-100 mb-1">
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Account</div>
                                <div className="text-sm font-bold text-gray-900 truncate">{user?.user_metadata?.full_name || 'User'}</div>
                                <div className="text-xs text-gray-500 truncate mt-0.5">{user?.email || ''}</div>
                            </div>
                            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 w-full text-sm text-red-600">
                                <LogOut size={16} />
                                {t[lang].logout}
                            </button>
                        </div>
                    )}
                </div>
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
      </div>
    </header>
  );

  return (
    <div className={`flex min-h-screen bg-[#F3F4F6]`}>
      <Sidebar lang={lang} currentView={currentView} onNavigate={handleNavigate} />
      
      <div className="flex-1 flex flex-col ml-64 min-w-0 transition-all duration-300">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {currentView === 'dashboard' && (
            <Dashboard 
              rows={rows} 
              onCreate={handleCreatePwa} 
              onDelete={handleDeletePwa} 
              onEdit={handleEditPwa} 
              lang={lang} 
            />
          )}
          {currentView === 'editor' && (
            <Editor 
              onBack={() => handleNavigate('dashboard')} 
              onSave={handleSavePwa}
              lang={lang} 
              initialData={editingPwa}
            />
          )}
          {currentView === 'analytics' && (
            <Analytics lang={lang} hasData={rows.length > 0} />
          )}
          {currentView === 'invoices' && (
            <Invoices lang={lang} invoices={invoices} onCreateInvoice={handleCreateInvoice} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
