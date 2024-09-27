interface User {
    id: number;
    name: string;
    username: string;
    countries_id: string;
    email: string;
    date: string;
    avatar: string;
    cover: string;
    status: string;
    role: string;
    permission: string;
    token: string;
    confirmation_code: string;
    paypal_account: string;
    payment_gateway: string;
    bank: string;
    featured: string;
    featured_date: string | null;
    about: string;
    story: string;
    profession: string;
    oauth_uid: string;
    oauth_provider: string;
    categories_id: string;
    website: string;
    stripe_id: string | null;
    pm_type: string | null;
    pm_last_four: string | null;
    trial_ends_at: string | null;
    price: string;
    balance: string;
    verified_id: string;
    address: string;
    city: string;
    zip: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    pinterest: string;
    github: string;
    last_seen: string;
    email_new_subscriber: string;
    plan: string;
    notify_new_subscriber: string;
    notify_liked_post: string;
    notify_commented_post: string;
    company: string;
    post_locked: string;
    ip: string;
    dark_mode: string;
    gender: string;
    birthdate: string;
    allow_download_files: string;
    language: string;
    free_subscription: string;
    wallet: string;
    tiktok: string;
    snapchat: string;
    paystack_plan: string;
    paystack_authorization_code: string;
    paystack_last4: string;
    paystack_exp: string;
    paystack_card_brand: string;
    notify_new_tip: string;
    hide_profile: string;
    hide_last_seen: string;
    last_login: string;
    hide_count_subscribers: string;
    hide_my_country: string;
    show_my_birthdate: string;
    notify_new_post: string;
    notify_email_new_post: string;
    custom_fee: string;
    hide_name: string;
    birthdate_changed: string;
    email_new_tip: string;
    email_new_ppv: string;
    notify_new_ppv: string;
    active_status_online: string;
    payoneer_account: string;
    zelle_account: string;
    notify_liked_comment: string;
    permissions: string;
    blocked_countries: string;
    two_factor_auth: string;
    notify_live_streaming: string;
    notify_mentions: string;
    stripe_connect_id: string | null;
    completed_stripe_onboarding: string;
    device_token: string | null;
    telegram: string;
    vk: string;
    twitch: string;
    discord: string;
    reddit: string;
    spotify: string;
    posts_privacy: string;
    document_id: string;
    crypto_wallet: string;
    threads: string;
    allow_live_streaming_private: string;
    price_live_streaming_private: string | null;
    allow_dm: string;
    welcome_message_new_subs: string;
    send_welcome_message: string;
    price_welcome_message: string | null;
    alias_mp: string;
    cvu: string;
    kick: string;
    new_notifications_count: string;
    new_inbox_count: string;
    avatar_path: string;
    cover_path: string;
    plans: any[];
  }
  
 export  interface Update {
    id: number;
    title: string;
    description: string;
    user_id: string;
    date: string;
    token_id: string;
    locked: string;
    fixed_post: string;
    price: string;
    status: string;
    video_views: string;
    ip: string;
    scheduled_date: string;
    schedule: string;
    editing: string;
    can_media_edit: string;
    media: any[];
  }
  
  interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
  }
  
  interface UserProducts {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
  }
  
  export interface Profile {
    user: User;
  
    updates: {
      current_page: number;
      data: Update[];
      first_page_url: string;
      from: number;
      next_page_url: string | null;
      path: string;
      per_page: string;
      prev_page_url: string | null;
      to: number;
    };
    
    hasPages: boolean;
    totalPosts: number;
    totalPhotos: number;
    totalVideos: number;
    totalMusic: number;
    totalFiles: number;
    totalEpub: number;
    _stripe: string | null;
    checkSubscription: string | null;
    media: string | null;
    mediaTitle: string | null;
    sortPostByTypeMedia: string | null;
    allPayment: any[];
    paymentIncomplete: string | null;
    likeCount: number;
    categories: string[];
    paymentGatewaySubscription: string | null;
    subscriptionsActive: number;
    plans: any[];
    userPlanMonthlyActive: string | null;
    userProducts: UserProducts;
    shopCategories: string | null;
  
    // New subscription-related fields
    subscribed_to_user: boolean;
    subscribed_until: string;
    cancelled: string;
    free_subscription: string;
  }
  
  