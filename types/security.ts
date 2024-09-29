interface Agent {
    id: number;
    user_id: number;
    ip: string;
    device: string;
    device_type: string;
    browser: string;
    platform: string;
    country: string | null;
    created_at: string;
    updated_at: string;
  }
  
  interface CurrentSession {
    id: number;
    user_id: number;
    ip: string;
    device: string;
    device_type: string;
    browser: string;
    platform: string;
    country: string | null;
    created_at: string;
    updated_at: string;
  }
  
  interface Privacy {
    hide_profile: string;
    hide_last_seen: string;
    hide_count_subscribers: string;
    hide_my_country: string;
    show_my_birthdate: string;
    active_status_online: string;
    two_factor_auth: string;
    posts_privacy: number;
  }
  
 export  interface SecurityResponse {
    success: boolean;
    agents: Agent[];
    currentSession: CurrentSession;
    privacy: Privacy[];
  }