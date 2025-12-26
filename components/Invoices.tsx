
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { CreditCard, Calendar, Search, X, ArrowLeft } from 'lucide-react';
import { Language, Invoice } from '../types';

interface InvoicesProps {
    lang: Language;
    invoices: Invoice[];
    onCreateInvoice?: (invoice: Invoice) => void;
}

export const Invoices: React.FC<InvoicesProps> = ({ lang, invoices, onCreateInvoice }) => {
    const [activeTab, setActiveTab] = useState<'all' | 'paid' | 'new'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [topUpAmount, setTopUpAmount] = useState<string>('');

    const t = {
        ru: {
            title: "Счета",
            breadcrumbs: "Dashboard • Счета",
            topUp: "Пополнить баланс",
            tabs: { all: "Все", paid: "Оплаченные", new: "Новые" },
            placeholders: { start: "Start date", end: "End date", search: "Поиск по id, сумме или txnHash транзакции..." },
            table: { id: "id", amount: "Сумма", created: "Дата создания", status: "Статус", paidDate: "Дата оплаты", hash: "txnHash", action: "Action", empty: "Счетов не найдено" },
            status: { new: "Новый", paid: "Оплачен" },
            btn: { pay: "Оплатить" },
            modal: {
                title: "Пополнение баланса",
                step1: "Шаг 1",
                step2: "Шаг 2",
                sumLabel: "Сумма пополнения $",
                desc: "Введите сумму, на которую хотите пополнить баланс. После перехода на следующий шаг, ее уже нельзя будет поменять.",
                placeholder: "$",
                continue: "Продолжить",
                back: "Назад",
                close: "Закрыть",
                paymentDesc: "Оплата и подтверждение"
            }
        },
        en: {
            title: "Invoices",
            breadcrumbs: "Dashboard • Invoices",
            topUp: "Top up balance",
            tabs: { all: "All", paid: "Paid", new: "New" },
            placeholders: { start: "Start date", end: "End date", search: "Search by id, amount or txnHash..." },
            table: { id: "id", amount: "Amount", created: "Date Created", status: "Status", paidDate: "Date Paid", hash: "txnHash", action: "Action", empty: "No invoices found" },
            status: { new: "New", paid: "Paid" },
            btn: { pay: "Pay" },
            modal: {
                title: "Top up balance",
                step1: "Step 1",
                step2: "Step 2",
                sumLabel: "Top up amount $",
                desc: "Enter the amount you want to top up. After proceeding to the next step, it cannot be changed.",
                placeholder: "$",
                continue: "Continue",
                back: "Back",
                close: "Close",
                paymentDesc: "Payment and confirmation"
            }
        }
    }[lang];

    const filteredInvoices = invoices.filter(inv => {
        if (activeTab === 'all') return true;
        return inv.status === activeTab;
    });

    const handleAmountPreset = (val: string) => {
        setTopUpAmount(val);
    };

    const handleContinue = () => {
        if (topUpAmount) {
            // Create invoice immediately upon continuing to step 2 for this demo
            // or we could do it on confirm. Let's do it on continue to ensure it exists.
            if (onCreateInvoice) {
                const newInvoice: Invoice = {
                    id: `inv_${Date.now()}`,
                    amount: parseFloat(topUpAmount),
                    createdDate: new Date().toLocaleDateString('ru-RU'),
                    status: 'new'
                };
                onCreateInvoice(newInvoice);
            }
            setModalStep(2);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalStep(1);
        setTopUpAmount('');
    };

    return (
        <div className="animate-fade-in font-sans pb-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
                    <div className="text-sm text-gray-500">{t.breadcrumbs}</div>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#1F2937] hover:bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                >
                    <CreditCard size={16} />
                    {t.topUp}
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 px-2">
                    <button 
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'all' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        {t.tabs.all} <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs font-semibold">{invoices.length}</span>
                    </button>
                    <button 
                         onClick={() => setActiveTab('paid')}
                        className={`px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'paid' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        {t.tabs.paid} <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-semibold">{invoices.filter(i => i.status === 'paid').length}</span>
                    </button>
                    <button 
                         onClick={() => setActiveTab('new')}
                        className={`px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'new' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        {t.tabs.new} <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs font-semibold">{invoices.filter(i => i.status === 'new').length}</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="p-4 flex gap-4 border-b border-gray-100">
                    <div className="relative w-40">
                        <input type="text" placeholder={t.placeholders.start} className="w-full pl-4 pr-10 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300" />
                        <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative w-40">
                        <input type="text" placeholder={t.placeholders.end} className="w-full pl-4 pr-10 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300" />
                        <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            placeholder={t.placeholders.search}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                        <Search size={16} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">{t.table.id}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-right">{t.table.amount}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 flex items-center gap-1">
                                    {t.table.created} <span className="text-gray-400">↓</span>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">{t.table.status}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">{t.table.paidDate}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">{t.table.hash}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-right">{t.table.action}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredInvoices.length > 0 ? filteredInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-700">{inv.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 text-right">${inv.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{inv.createdDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${inv.status === 'new' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                                            {inv.status === 'new' ? t.status.new : t.status.paid}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{inv.paidDate || ''}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">{inv.txnHash || ''}</td>
                                    <td className="px-6 py-4 text-right">
                                        {inv.status === 'new' && (
                                            <button className="bg-[#1F2937] hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors">
                                                {t.btn.pay}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400 text-sm">
                                        {t.table.empty}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Up Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">{t.modal.title}</h2>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            <div className="flex gap-4">
                                {/* Step 1 Indicator */}
                                <div className="flex flex-col gap-8 relative">
                                    <div className="relative z-10">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${modalStep === 1 ? 'bg-[#00C48C] text-white' : 'bg-[#00C48C] text-white'}`}>
                                            1
                                        </div>
                                        {/* Line connector */}
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200 -z-10 min-h-[100px]"></div>
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${modalStep === 2 ? 'bg-[#00C48C] text-white' : 'bg-gray-400 text-white'}`}>
                                            2
                                        </div>
                                    </div>
                                </div>

                                {/* Steps Content */}
                                <div className="flex-1 pt-1">
                                    {/* Step 1 Content */}
                                    <div className={`transition-opacity duration-300 ${modalStep === 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1">{t.modal.step1}</h3>
                                        <div className="text-sm text-gray-500 mb-4">{t.modal.sumLabel}</div>
                                        
                                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                            {t.modal.desc}
                                        </p>

                                        <div className="mb-4">
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">{t.modal.sumLabel}</label>
                                            <input 
                                                type="text" 
                                                value={topUpAmount}
                                                onChange={(e) => setTopUpAmount(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-lg text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                                                placeholder={t.modal.placeholder}
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {['30', '50', '100', '250', '500', '1000'].map((val) => (
                                                <button 
                                                    key={val}
                                                    onClick={() => handleAmountPreset(val)}
                                                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg text-sm font-bold text-gray-700 transition-colors"
                                                >
                                                    ${val}
                                                </button>
                                            ))}
                                        </div>

                                        {modalStep === 1 && (
                                            <div className="flex items-center gap-4">
                                                <button 
                                                    onClick={handleContinue}
                                                    className="px-6 py-2.5 bg-[#1F2937] hover:bg-black text-white rounded-lg font-bold text-sm transition-colors"
                                                >
                                                    {t.modal.continue}
                                                </button>
                                                <button 
                                                    onClick={handleCloseModal}
                                                    className="px-4 py-2.5 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors"
                                                >
                                                    {t.modal.back}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Step 2 Content Placeholder */}
                                    <div className={`mt-10 transition-opacity duration-300 ${modalStep === 2 ? 'opacity-100' : 'opacity-40'}`}>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1">{t.modal.step2}</h3>
                                        <div className="text-sm text-gray-500 mb-4">{t.modal.paymentDesc}</div>
                                        
                                        {modalStep === 2 && (
                                            <div className="flex justify-end pt-4">
                                                <button 
                                                    onClick={handleCloseModal}
                                                    className="px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 rounded-lg font-bold text-sm transition-colors"
                                                >
                                                    {t.modal.close}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
