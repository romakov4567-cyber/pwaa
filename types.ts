
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
  iconText?: any;
  
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

  // Analytics & Postbacks
  postback_install?: string;
  postback_install_method?: 'GET' | 'POST';
  postback_open?: string;
  postback_open_method?: 'GET' | 'POST';
  postback_push_sub?: string;
  postback_push_sub_method?: 'GET' | 'POST';
  postback_reg?: string;
  postback_reg_method?: 'GET' | 'POST';
  postback_dep?: string;
  postback_dep_method?: 'GET' | 'POST';

  // Pixels / Integrations
  pixel_fb_enabled?: boolean;
  pixel_fb_id?: string;
  pixel_bigo_enabled?: boolean;
  pixel_bigo_id?: string;
  pixel_kwai_enabled?: boolean;
  pixel_kwai_id?: string;
  pixel_snapchat_enabled?: boolean;
  pixel_snapchat_id?: string;

  // Push Settings
  push_ask_permission?: boolean;

  // Extra Settings
  extra_richer_ui?: boolean;
  extra_auto_theme?: boolean;
}

export interface Invoice {
    id: string;
    amount: number;
    createdDate: string;
    status: 'new' | 'paid';
    paidDate?: string;
    txnHash?: string;
}
