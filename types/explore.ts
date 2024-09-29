interface Update {
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
    creator: Creator;
    media: Media[];
    comments: Comment[];
    likes: Like[];
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
    plans: Plan[];
  }
  
  interface Plan {
    user_id: number;
    name: string;
    status: string;
  }
  
  interface Media {
    id: number;
    updates_id: number;
    user_id: number;
    type: string;
    image: string | null;
    width: number | null;
    height: number | null;
    img_type: string;
    video: string | null;
    encoded: string;
    video_poster: string | null;
    duration_video: string | null;
    quality_video: string | null;
    video_embed: string;
    music: string;
    file: string;
    file_name: string;
    file_size: string;
    bytes: string;
    mime: string;
    token: string;
    status: string;
    created_at: string;
    updated_at: string;
    job_id: string | null;
  }
  
  interface Comment {
    // Define properties for comments here based on your actual data structure.
  }
  
  interface Like {
    // Define properties for likes here based on your actual data structure.
  }
  
  interface UpdatesResponse {
    updates: {
      current_page: number;
      data: Update[];
    };
  }
  