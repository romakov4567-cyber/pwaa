
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pzwpisihflrdspzpxdhl.supabase.co';
// Using the provided key. 
const supabaseKey = 'sb_publishable_bVyrO7jg4WBWxl5AjoQRTg_W7XQDwOU';

export const supabase = createClient(supabaseUrl, supabaseKey);
