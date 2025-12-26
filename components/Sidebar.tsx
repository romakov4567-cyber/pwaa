
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  Bell, 
  FileText, 
  CreditCard, 
  Users, 
  LifeBuoy, 
  Send,
  Bot
} from 'lucide-react';
import { Language } from '../types';
import { ViewState } from '../App';

interface SidebarProps {
    lang: Language;
    currentView: ViewState;
    onNavigate: (view: ViewState) => void;
}

const MenuItem = ({ icon: Icon, label, active = false, badge = '', hasSub = false, onClick }: any) => (
  <div 
    className={`flex items-center justify-between px-4 py-2.5 mb-1 rounded-lg cursor-pointer transition-colors ${active ? 'bg-green-50 text-pwa-green font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-pwa-green' : 'text-gray-400'} />
      <span className="text-sm">{label}</span>
    </div>
    {badge && (
      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-pwa-green">
        {badge}
      </span>
    )}
    {hasSub && (
        <span className="text-gray-300">›</span>
    )}
  </div>
);

const MenuSection = ({ title, children }: { title?: string, children?: React.ReactNode }) => (
    <div className="mb-6">
        {title && <div className="px-4 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">{title}</div>}
        {children}
    </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ lang, currentView, onNavigate }) => {
  const t = {
    ru: {
        main: "ОСНОВНЫЕ", myPwa: "Мои PWA", analytics: "Аналитика", push: "PUSH-уведомления",
        finance: "ФИНАНСЫ", invoices: "Счета", transactions: "Транзакции", tariffs: "Тарифы", referral: "Реферальная",
        other: "ДРУГОЕ", logs: "Логи", support: "Поддержка", channel: "Наш канал",
        new: "Новое", subscribe: "Подпишись"
    },
    en: {
        main: "MAIN", myPwa: "My PWAs", analytics: "Analytics", push: "Push Notifications",
        finance: "FINANCE", invoices: "Invoices", transactions: "Transactions", tariffs: "Plans", referral: "Referral",
        other: "OTHER", logs: "Logs", support: "Support", channel: "Our Channel",
        new: "New", subscribe: "Subscribe"
    }
  }[lang];

  return (
    <div className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-pwa-border flex flex-col z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-transparent">
        <div className="flex items-center gap-2 text-gray-800 font-bold text-xl cursor-pointer" onClick={() => onNavigate('dashboard')}>
           <Bot size={28} className="text-gray-800" />
           <div className="leading-none">
             <span>PWA</span><br/>
             <span className="text-gray-400 text-xs tracking-widest">BOT</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <MenuSection title={t.main}>
            <MenuItem 
                icon={LayoutDashboard} 
                label={t.myPwa} 
                active={currentView === 'dashboard' || currentView === 'editor'} 
                onClick={() => onNavigate('dashboard')}
            />
            <MenuItem 
                icon={BarChart2} 
                label={t.analytics} 
                badge={t.new} 
                active={currentView === 'analytics'} 
                onClick={() => onNavigate('analytics')}
            />
            <MenuItem icon={Bell} label={t.push} hasSub />
        </MenuSection>

        <MenuSection title={t.finance}>
            <MenuItem 
                icon={FileText} 
                label={t.invoices} 
                active={currentView === 'invoices'}
                onClick={() => onNavigate('invoices')}
            />
            <MenuItem icon={CreditCard} label={t.transactions} />
            <MenuItem icon={BarChart2} label={t.tariffs} />
            <MenuItem icon={Users} label={t.referral} />
        </MenuSection>

        <MenuSection title={t.other}>
            <MenuItem icon={FileText} label={t.logs} hasSub />
            <MenuItem icon={LifeBuoy} label={t.support} />
            <MenuItem icon={Send} label={t.channel} badge={t.subscribe} />
        </MenuSection>
      </div>
      
      <div className="p-4 border-t border-pwa-border text-xs text-gray-400 text-center">
        v2.4.0 &copy; 2024 PWABOT
      </div>
    </div>
  );
};
