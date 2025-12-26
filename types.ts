
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
  iconText?: any; // Changed from React.ReactNode to any to avoid persistence issues, usually string or component
  
  // Editor Data Fields
  developer?: string;
  category?: string;
  description?: string;
  rating?: number;
  ratingDistribution?: number[];
  reviewsCount?: string;
  downloads?: string;
  size?: string;
  age?: string;
  iconUrl?: string;
  screenshots?: string[];
  videoUrl?: string;
  tags?: string[];
  comments?: any[];
  keepReviewDatesCurrent?: boolean;
  offerLink?: string;
  passGetParams?: boolean;
  geoCloaking?: 'all' | 'specific';
  androidOnly?: boolean;
  enableWhitepage?: boolean;
  language?: string;
  languageCode?: string;
}

export interface Invoice {
    id: string;
    amount: number;
    createdDate: string;
    status: 'new' | 'paid';
    paidDate?: string;
    txnHash?: string;
}
