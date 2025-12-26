
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { Filter, Calendar, RotateCw, X, ChevronDown, ArrowDown, BarChart2 } from 'lucide-react';
import { Language } from '../types';

interface AnalyticsProps {
    lang: Language;
    hasData: boolean;
}

export const Analytics: React.FC<AnalyticsProps> = ({ lang, hasData }) => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
    
    const filtersRef = useRef<HTMLDivElement>(null);
    const dateMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
                setIsFiltersOpen(false);
            }
            if (dateMenuRef.current && !dateMenuRef.current.contains(event.target as Node)) {
                setIsDateMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleRefresh = () => {
        window.location.reload();
    };

    const t = {
        ru: {
            title: "Аналитика",
            breadcrumbs: "Dashboard • Аналитика",
            tabs: { all: "Все", ios: "iOS", pwa: "PWA" },
            controls: { filters: "Фильтры", today: "Сегодня", refresh: "Обновить", reset: "Сбросить" },
            cards: {
                uniques: "Уники",
                installs: "Инсталлы",
                opens: "Открытия",
                regs: "Регистрации",
                deps: "Депозиты"
            },
            period: "Данные за период",
            periodSub: "с 25.12.2025 00:00:00 по 25.12.2025 23:59:59 (время по UTC)",
            map: "Данные по странам",
            countries: { us: "США" },
            table: {
                headers: {
                    country: "Страна",
                    date: "Дата",
                    uniques: "Уники",
                    installs: "Инсталлы",
                    opens: "Открытия",
                    regs: "Регистрации",
                    deps: "Депозиты",
                    v2i: "visit2install",
                    i2r: "inst2reg",
                    r2d: "reg2dep"
                },
                total: "Всего строк: 1",
                empty: "Нет данных"
            },
            filterOptions: {
                pwa: "Фильтр по PWA",
                applink: "Фильтр по Applink",
                geo: "Фильтр по ГЕО"
            },
            dateOptions: [
                "Сегодня",
                "Вчера",
                "Текущая неделя",
                "Последние 7 дней",
                "Текущий месяц",
                "Последние 30 дней",
                "Предыдущий месяц",
                "Интервал дат"
            ],
            noData: "Пока нет данных для отображения"
        },
        en: {
            title: "Analytics",
            breadcrumbs: "Dashboard • Analytics",
            tabs: { all: "All", ios: "iOS", pwa: "PWA" },
            controls: { filters: "Filters", today: "Today", refresh: "Refresh", reset: "Reset" },
            cards: {
                uniques: "Uniques",
                installs: "Installs",
                opens: "Opens",
                regs: "Registrations",
                deps: "Deposits"
            },
            period: "Data for period",
            periodSub: "from 25.12.2025 00:00:00 to 25.12.2025 23:59:59 (UTC time)",
            map: "Data by countries",
            countries: { us: "USA" },
            table: {
                headers: {
                    country: "Country",
                    date: "Date",
                    uniques: "Uniques",
                    installs: "Installs",
                    opens: "Opens",
                    regs: "Registrations",
                    deps: "Deposits",
                    v2i: "visit2install",
                    i2r: "inst2reg",
                    r2d: "reg2dep"
                },
                total: "Total rows: 1",
                empty: "No data available"
            },
            filterOptions: {
                pwa: "Filter by PWA",
                applink: "Filter by Applink",
                geo: "Filter by GEO"
            },
            dateOptions: [
                "Today",
                "Yesterday",
                "Current week",
                "Last 7 days",
                "Current month",
                "Last 30 days",
                "Previous month",
                "Date range"
            ],
            noData: "No data to display yet"
        }
    }[lang];

    // Simple SVG Chart Implementation
    const Chart = () => (
        <div className="w-full h-64 mt-8 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
                {[1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0].map((val, i) => (
                    <div key={i} className="flex items-center w-full">
                        <span className="w-6 text-right pr-2">{val.toFixed(1)}</span>
                        <div className="flex-1 h-px bg-gray-100 border-t border-dashed border-gray-200"></div>
                    </div>
                ))}
            </div>
            
            {hasData ? (
                /* Data Line & Area (Mocked spike at 15:00) */
                <div className="absolute left-6 right-0 top-0 bottom-6">
                    <svg viewBox="0 0 1000 230" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.2"/>
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                        <path 
                            d="M0,230 L650,230 Q680,230 700,50 Q720,230 750,230 L1000,230" 
                            fill="url(#chartGradient)" 
                            stroke="none" 
                        />
                        <path 
                            d="M0,230 L650,230 Q680,230 700,50 Q720,230 750,230 L1000,230" 
                            fill="none" 
                            stroke="#10B981" 
                            strokeWidth="2" 
                        />
                    </svg>
                </div>
            ) : (
                /* Empty State Chart */
                <div className="absolute left-6 right-0 top-0 bottom-6 flex items-center justify-center">
                    <div className="text-gray-300 flex flex-col items-center">
                        <BarChart2 size={48} className="mb-2 opacity-20" />
                        <span className="text-sm">{t.noData}</span>
                    </div>
                </div>
            )}

            {/* X Axis Labels */}
            <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[10px] text-gray-400 pt-2">
                {Array.from({length: 23}, (_, i) => i).map(h => (
                    <span key={h}>{h.toString().padStart(2, '0')}:00</span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in font-sans pb-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
                <div className="text-sm text-gray-500">{t.breadcrumbs}</div>
            </div>

            {/* Tabs & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-20">
                <div className="flex gap-6 border-b border-gray-200 w-full md:w-auto">
                    <button className="pb-3 border-b-2 border-gray-900 font-medium text-gray-900 text-sm">{t.tabs.all}</button>
                    <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2">
                        <span className="text-lg"></span> {t.tabs.ios}
                    </button>
                    <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2">
                        <span className="text-lg">▶</span> {t.tabs.pwa}
                    </button>
                </div>

                <div className="flex flex-wrap gap-3">
                    {/* Filters Dropdown */}
                    <div className="relative" ref={filtersRef}>
                        <button 
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                            className={`px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm ${isFiltersOpen ? 'ring-2 ring-gray-100' : ''}`}
                        >
                            <Filter size={16} /> {t.controls.filters}
                        </button>
                        {isFiltersOpen && (
                            <div className="absolute top-full left-0 mt-2 w-[400px] bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 p-6 animate-in fade-in zoom-in-95 duration-100">
                                <h3 className="font-bold text-gray-900 mb-4 text-base">{t.controls.filters}</h3>
                                <div className="space-y-3">
                                    <div className="relative group">
                                        <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 flex justify-between items-center cursor-pointer hover:border-gray-300 transition-colors">
                                            {t.filterOptions.pwa} <ChevronDown size={16} className="text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 flex justify-between items-center cursor-pointer hover:border-gray-300 transition-colors">
                                            {t.filterOptions.applink} <ChevronDown size={16} className="text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 flex justify-between items-center cursor-pointer hover:border-gray-300 transition-colors">
                                            {t.filterOptions.geo} <ChevronDown size={16} className="text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Date Dropdown */}
                    <div className="relative" ref={dateMenuRef}>
                        <button 
                            onClick={() => setIsDateMenuOpen(!isDateMenuOpen)}
                            className={`px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm ${isDateMenuOpen ? 'ring-2 ring-gray-100' : ''}`}
                        >
                            <Calendar size={16} /> {t.controls.today}
                        </button>
                        {isDateMenuOpen && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 py-2 animate-in fade-in zoom-in-95 duration-100">
                                {t.dateOptions.map((option, i) => (
                                    <button 
                                        key={i} 
                                        className={`w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${i === 0 ? 'text-gray-900 font-medium' : ''}`}
                                        onClick={() => setIsDateMenuOpen(false)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm active:scale-95 transition-transform"
                    >
                        <RotateCw size={16} /> {t.controls.refresh}
                    </button>
                </div>
            </div>

            {/* Stats Cards and Chart Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{t.period}</h2>
                        <p className="text-sm text-gray-400 mt-1">{t.periodSub}</p>
                    </div>
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold hover:bg-gray-200 transition-colors">
                        {t.controls.reset}
                    </button>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    {[
                        { title: t.cards.uniques, val: hasData ? 1 : 0, color: "bg-[#00C48C]" },
                        { title: t.cards.installs, val: 0, color: "bg-[#FFB020]" },
                        { title: t.cards.opens, val: 0, color: "bg-[#00BCD4]" },
                        { title: t.cards.regs, val: 0, color: "bg-[#FF5722]" },
                        { title: t.cards.deps, val: 0, color: "bg-[#22C55E]" }
                    ].map((card, i) => (
                        <div key={i} className={`${card.color} rounded-xl p-4 text-white shadow-sm transition-transform hover:-translate-y-1 duration-200`}>
                            <div className="text-xs font-medium opacity-90 mb-1">{card.title}</div>
                            <div className="text-3xl font-bold">{card.val}</div>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                <Chart />
                
                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-6 mt-6">
                    {[
                        { label: t.cards.uniques, color: "bg-[#00C48C]" },
                        { label: t.cards.installs, color: "bg-[#FFB020]" },
                        { label: t.cards.opens, color: "bg-[#00BCD4]" },
                        { label: t.cards.regs, color: "bg-[#FF5722]" },
                        { label: t.cards.deps, color: "bg-[#22C55E]" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${item.color}`}></div>
                            <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">{t.map}</h2>
                        <div className="h-[300px] relative">
                            {/* Simple World Map Visualization */}
                            <div className="absolute inset-0 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center">
                                {/* Using an image for the map background to be more realistic as requested by screenshot, 
                                    but overlapping with our custom country highlight */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-contain bg-no-repeat"></div>
                                
                                {hasData ? (
                                    <>
                                        {/* Highlight US approx position */}
                                        <div className="absolute top-[32%] left-[22%] w-16 h-10">
                                            <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-lg filter">
                                                <path d="M10,10 L90,10 L80,50 L20,50 Z" fill="#047857" />
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-8 left-8 w-48 h-2 bg-[#047857] rounded-full">
                                            <div className="absolute right-0 -top-6 text-xs font-bold text-gray-600">1</div>
                                            <div className="absolute left-0 -top-6 text-xs font-bold text-gray-600">1</div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-gray-400 text-sm">
                                        {t.noData}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-80 pt-12">
                        <div className="flex justify-end gap-1 mb-4">
                            {['Уники', 'Инсталлы', 'Регистрации', 'Депозиты'].map((l, i) => (
                                <button key={i} className={`px-2 py-1 text-[10px] border border-gray-200 rounded ${i === 0 ? 'bg-gray-800 text-white border-gray-800' : 'text-gray-600'}`}>
                                    {l}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-4xl font-light text-gray-900">{hasData ? 1 : 0}</span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                                    <span className="flex items-center gap-2"><img src="https://flagcdn.com/w40/us.png" className="w-5 rounded shadow-sm" /> {t.countries.us}</span>
                                    <span>{hasData ? 1 : 0}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00C48C] w-full rounded-full" style={{ width: hasData ? '100%' : '0%' }}></div>
                                </div>
                                <div className="text-right text-[10px] text-gray-400 mt-1">{hasData ? '100%' : '0%'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 font-medium text-gray-500 flex items-center gap-1 cursor-pointer hover:text-gray-700">
                                    {t.table.headers.date} <ArrowDown size={14} />
                                </th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-center">{t.table.headers.uniques}</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-center">{t.table.headers.installs}</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-center">{t.table.headers.opens}</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-center">{t.table.headers.regs}</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-center">{t.table.headers.deps}</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-center">{t.table.headers.v2i}</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-center">{t.table.headers.i2r}</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-center">{t.table.headers.r2d}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hasData ? (
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-900">25.12.2025</td>
                                    <td className="px-6 py-4 text-center text-gray-900">1</td>
                                    <td className="px-6 py-4 text-center text-gray-900">0</td>
                                    <td className="px-6 py-4 text-center text-gray-900">0</td>
                                    <td className="px-6 py-4 text-center text-gray-900">0</td>
                                    <td className="px-6 py-4 text-center text-gray-900">0</td>
                                    <td className="px-6 py-4 text-center text-gray-500">0%</td>
                                    <td className="px-6 py-4 text-center text-gray-500">0%</td>
                                    <td className="px-6 py-4 text-center text-gray-500">0%</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan={9} className="px-6 py-8 text-center text-gray-400">
                                        {t.table.empty}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 text-right text-xs text-gray-500">
                    {hasData ? t.table.total : t.table.total.replace('1', '0')}
                </div>
            </div>
        </div>
    );
};
