export interface Notification {
    id_noty: number;
    type: number;
    target: number;
    created_at: string;
    userId: number;
    username: string;
    hide_name: string;
    name: string;
    avatar: string;
    id: number;
    description: string;
    usernameAuthor: string;
    message: string | null;
    userDestination: string | null;
    productName: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

 interface NotificationsResponse {
    status: boolean;
    data: {
        current_page: number;
        data: Notification[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: PaginationLink[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}
