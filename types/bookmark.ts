 export interface Bookmark {
    updates: Updates;
    hasPages: boolean;
    users: User[];
    payPerViewsUser: number;
  }
  
 export  interface Updates {
    current_page: number;
    data: UpdateData[];
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
  }
  
  export interface UpdateData {
    id: number;
    title: string | null;
    description: string;
    user_id: number;
    date: string;
    locked: string;
    fixed_post: string;
    price: string;
    status: string;
    video_views: number;
    scheduled_date: string;
    token_id: string;
    ip: string;
    schedule: number;
    editing: number;
    can_media_edit: number;
    creator: Creator;
    media: Media[];
    comments: Comment[];
    likes: Like[];
    pivot: Pivot;
  }
  
  interface Creator {
    id: number;
    name: string;
    username: string;
    avatar: string;
    hide_name: string;
    verified_id: string;
    plan: string;
    free_subscription: string;
    cover: string;
    plans: any[]; 
  }
  
  interface Media {

  }
  
  interface Comment {
 
  }
  
  interface Like {
    
  }
  
  interface Pivot {
    user_id: number;
    updates_id: number;
  }
  
  interface User {
    id: number;
    name: string;
    username: string;
    avatar: string;
    cover: string;
    free_subscription: string;
    hide_name: string;
    featured: string;
  }
  