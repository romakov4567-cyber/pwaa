
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, ChevronLeft, ChevronRight, ToggleLeft, ExternalLink, MoreVertical, Zap, Copy, Eye, TrendingUp, Trash2 } from 'lucide-react';
import { Language, PwaRow } from '../types';

const Badge = ({ children, color }: { children?: React.ReactNode, color: 'green' | 'red' | 'yellow' | 'gray' }) => {
    const styles = {
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        gray: 'bg-gray-100 text-gray-800'
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${styles[color]}`}>
            {children}
        </span>
    );
};

interface DashboardProps {
    rows: PwaRow[];
    onCreate: () => void;
    onEdit: (row: PwaRow) => void;
    onDelete: (id: string) => void;
    lang: Language;
}

export const Dashboard: React.FC<DashboardProps> = ({ rows, onCreate, onEdit, onDelete, lang }) => {
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuRowId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuClick = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      setOpenMenuRowId(openMenuRowId === id ? null : id);
  };
  
  const t = {
    ru: {
        title: "Мои PWA", dashboard: "Дашборд", create: "Создать PWA",
        tabs: { all: "Все", active: "Активные", drafts: "Черновики", stopped: "Остановленные" },
        filters: { geo: "Гео", search: "Поиск по названию, ID или домену" },
        table: { name: "Название", domain: "Домен", geo: "Гео", date: "Дата создания", status: "Статус" },
        badges: { draft: "Черновик", stopped: "Остановлен" },
        footer: { compact: "Компактно", rows: "Строк на странице", of: "из" },
        geoNames: { tr: "Турция", ru: "Россия" },
        menu: {
            launch: "Запустить",
            edit: "Редактировать",
            duplicate: "Дублировать",
            preview: "Предпросмотр",
            stats: "Статистика",
            delete: "Удалить"
        }
    },
    en: {
        title: "My PWAs", dashboard: "Dashboard", create: "Create PWA",
        tabs: { all: "All", active: "Active", drafts: "Drafts", stopped: "Stopped" },
        filters: { geo: "Geo", search: "Search by name, ID or domain" },
        table: { name: "Name", domain: "Domain", geo: "Geo", date: "Created", status: "Status" },
        badges: { draft: "Draft", stopped: "Stopped" },
        footer: { compact: "Compact", rows: "Rows per page", of: "of" },
        geoNames: { tr: "Turkey", ru: "Russia" },
        menu: {
            launch: "Launch",
            edit: "Edit",
            duplicate: "Duplicate",
            preview: "Preview",
            stats: "Statistics",
            delete: "Delete"
        }
    }
  }[lang];

  const ActionMenu = ({ onDeleteAction, onEditAction }: { onDeleteAction: () => void, onEditAction: () => void }) => (
      <div className="absolute right-0 top-8 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors" onClick={(e) => e.stopPropagation()}>
              <Zap size={18} className="text-gray-900" /> {t.menu.launch}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onEditAction(); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
              <Edit2 size={18} className="text-gray-900" /> {t.menu.edit}
          </button>
          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors" onClick={(e) => e.stopPropagation()}>
              <Copy size={18} className="text-gray-900" /> {t.menu.duplicate}
          </button>
          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors" onClick={(e) => e.stopPropagation()}>
              <Eye size={18} className="text-gray-900" /> {t.menu.preview}
          </button>
          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors" onClick={(e) => e.stopPropagation()}>
              <TrendingUp size={18} className="text-gray-900" /> {t.menu.stats}
          </button>
          <div className="h-px bg-gray-100 my-1"></div>
          <button onClick={(e) => { e.stopPropagation(); onDeleteAction(); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
              <Trash2 size={18} /> {t.menu.delete}
          </button>
      </div>
  );

  const draftsCount = rows.filter(row => row.status === 'draft').length;
  const stoppedCount = rows.filter(row => row.status === 'stopped').length;
  const activeCount = 0; // Placeholder for active status

  return (
    <div className="animate-fade-in font-sans">
      <div className="flex justify-between items-start mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <span>{t.dashboard}</span> 
                <span className="text-gray-300">•</span> 
                <span>{t.title}</span>
            </div>
        </div>
        <button onClick={onCreate} className="bg-[#1F2937] hover:bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
            <Plus size={16} />
            {t.create}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-2">
            <button className="px-4 py-3 text-sm font-medium text-gray-900 border-b-2 border-gray-900 flex items-center gap-2">
                {t.tabs.all} <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs font-semibold">{rows.length}</span>
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-2 border-b-2 border-transparent hover:border-gray-200 transition-colors">
                {t.tabs.active} <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-semibold">{activeCount}</span>
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-2 border-b-2 border-transparent hover:border-gray-200 transition-colors">
                {t.tabs.drafts} <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs font-semibold">{draftsCount}</span>
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-2 border-b-2 border-transparent hover:border-gray-200 transition-colors">
                {t.tabs.stopped} <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-xs font-semibold">{stoppedCount}</span>
            </button>
        </div>

        {/* Filters */}
        <div className="p-4 flex gap-4">
            <div className="w-48 relative">
                <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-900 appearance-none focus:outline-none focus:ring-1 focus:ring-gray-300 hover:border-gray-300 transition-colors cursor-pointer">
                    <option>{t.filters.geo}</option>
                    <option>{t.geoNames.tr}</option>
                    <option>{t.geoNames.ru}</option>
                </select>
            </div>
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder={t.filters.search}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 hover:border-gray-300 transition-colors"
                />
            </div>
        </div>

        {/* Table */}
        <div className="">
            <table className="w-full text-left border-t border-gray-100">
                <thead className="bg-white">
                    <tr>
                        <th className="px-6 py-4 w-10 border-b border-gray-100">
                            <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-0 cursor-pointer" />
                        </th>
                        <th className="px-6 py-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t.table.name}</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t.table.domain}</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t.table.geo}</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer group hover:text-gray-600 transition-colors">
                            <div className="flex items-center gap-1">
                                {t.table.date} 
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </th>
                        <th className="px-6 py-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t.table.status}</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-right"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {rows.map((row) => (
                        <tr 
                            key={row.id} 
                            className="hover:bg-gray-50 transition-colors group cursor-pointer" 
                            onClick={() => row.isApp && onEdit(row)}
                        >
                            <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-0 cursor-pointer" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    {row.isApp ? (
                                        <div className={`w-10 h-10 rounded border border-transparent overflow-hidden shadow-sm relative ${!row.iconUrl ? row.iconColor : ''} flex items-center justify-center shrink-0`}>
                                            {row.iconUrl ? (
                                                <img src={row.iconUrl} alt={row.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[8px] text-white font-bold text-center leading-tight">{row.iconText}</span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200"></div>
                                    )}
                                    <div className="flex flex-col">
                                        <div className={`text-sm ${row.isApp ? 'font-medium text-gray-900' : 'font-normal text-gray-400'}`}>
                                            {row.name}
                                        </div>
                                        {row.sub && <div className="text-xs text-gray-400 font-mono mt-0.5">{row.sub}</div>}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400">
                                {row.domain ? (
                                     <div className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                                        {row.domain}
                                        <ExternalLink size={12} className="text-gray-400" />
                                     </div>
                                ) : '—'}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400">
                                {row.geo ? (
                                    <img src={`https://flagcdn.com/w40/${row.geo}.png`} alt={row.geo} className="w-5 h-auto rounded-[2px] shadow-sm border border-gray-100" />
                                ) : '—'}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{row.date}</td>
                            <td className="px-6 py-4">
                                <Badge color={row.status === 'stopped' ? 'red' : 'yellow'}>
                                    {row.status === 'stopped' ? t.badges.stopped : t.badges.draft}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 text-right">
                                 <div className={`flex justify-end gap-2 transition-opacity ${openMenuRowId === row.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    <button 
                                        className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors"
                                        onClick={(e) => { e.stopPropagation(); onEdit(row); }}
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <div className="relative">
                                        <button 
                                            className={`p-1 rounded text-gray-500 transition-colors ${openMenuRowId === row.id ? 'bg-gray-200 text-gray-800' : 'hover:bg-gray-200'}`}
                                            onClick={(e) => handleMenuClick(e, row.id)}
                                        >
                                            <MoreVertical size={16} />
                                        </button>
                                        {openMenuRowId === row.id && (
                                            <ActionMenu 
                                                onDeleteAction={() => { setOpenMenuRowId(null); onDelete(row.id); }} 
                                                onEditAction={() => { setOpenMenuRowId(null); onEdit(row); }}
                                            />
                                        )}
                                    </div>
                                 </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 bg-gray-50/30">
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                <ToggleLeft size={24} className="text-gray-300" />
                <span>{t.footer.compact}</span>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    {t.footer.rows}:
                    <select className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>
                <div>1-{rows.length} {t.footer.of} {rows.length}</div>
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 transition-colors"><ChevronLeft size={16} /></button>
                    <button className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 transition-colors"><ChevronRight size={16} /></button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
