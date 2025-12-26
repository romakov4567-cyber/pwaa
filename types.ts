
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export type Language = 'ru' | 'en';

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface Laureate {
  name: string;
  image: string; // placeholder url
  role: string;
  desc: string;
}

export interface PwaRow {
  id: string;
  name: string;
  isApp: boolean;
  date: string;
  status: 'draft' | 'stopped';
  sub?: string;
  domain?: string;
  geo?: string;
  iconColor?: string;
  iconText?: React.ReactNode;
  // Added for editor state
  language?: string; // name
  languageCode?: string; // code (en, az, ru)
}

export interface Invoice {
    id: string;
    amount: number;
    createdDate: string;
    status: 'new' | 'paid';
    paidDate?: string;
    txnHash?: string;
}
