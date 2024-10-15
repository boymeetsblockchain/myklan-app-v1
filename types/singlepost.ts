// Interface for User
interface User {
    id: number;
    username: string;
    avatar: string;
    verified_id: string;
    last_seen: string;
    stripe_id: string | null;
    free_subscription: string;
    status: string;
    plan: string;
    hide_name: string;
    allow_dm: number;
  }
  
  // Interface for Creator (inside Updates)
  interface Creator {
    id: number;
    username: string;
    avatar: string;
    last_seen: string;
    verified_id: string;
  }
  
  // Interface for Update Post
  interface UpdatePost {
    id: number;
    title: string | null;
    description: string;
    user_id: number;
    date: string;
    token_id: string;
    locked: string;
    fixed_post: string;
    price: string;
    status: string;
    video_views: number;
    ip: string;
    scheduled_date: string;
    schedule: number;
    editing: number;
    can_media_edit: number;
    creator: Creator;
    media: any[]; 
    comments: any[]; 
    likes: any[]; 
  }
  
  // Interface for Explore Creators
  interface ExploreCreator {
    id: number;
    name: string;
    username: string;
    avatar: string;
    cover: string | null;
    free_subscription: string;
    hide_name: string;
    featured: string;
  }
  
  // Main Interface for the entire data
  export interface PostData {
    paid: boolean;
    user: User;
    updates: UpdatePost;
    updatesCount: number;
    inPostDetail: boolean;
    exploreCreators: ExploreCreator[];
  }
  