interface Creator {
    id: number;
    avatar: string;
    username: string;
    name: string;
    plan: string;
    status: string;
}

export interface Subscription {
    id: number;
    creator_id: number;
    user_id: number;
    name: string | null;
    stripe_id: string | null;
    stripe_status: string | null;
    stripe_price: string;
    quantity: number | null;
    trial_ends_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
    last_payment: string | null;
    free: "yes" | "no";
    subscription_id: string;
    cancelled: "yes" | "no";
    rebill_wallet: "on" | "off";
    interval: string;
    taxes: string | null;
    payment_id: string | null;
    creator: Creator;
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse {
    current_page: number;
    data: Subscription[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
