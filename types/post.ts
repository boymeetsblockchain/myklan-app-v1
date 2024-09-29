export interface Creator {
  id: number;
  name: string;
  username: string;
  avatar: string;
  hide_name: string;
  verified_id: string;
  plan: string;
  free_subscription: string;
  cover: string;
  plans: {
    user_id: number;
    name: string;
    status: string;
  }[];
}

export type Media = {
  id: number;
  updates_id: number;
  user_id: number;
  type: string;
  image?: string;
  width?: string;
  height?: string;
  img_type?: string;
  video?: string;
  encoded?: string;
  video_poster?: string | null;
  duration_video?: string | null;
  quality_video?: string | null;
  video_embed?: string;
  music?: string;
  file?: string;
  file_name?: string;
  file_size?: string;
  bytes?: string;
  mime: string;
  token: string;
  status: string;
  created_at: string;
  updated_at: string;
  job_id?: string | null;
};

export interface Post {
  bookmarks_count: string;
  can_media_edit: string;
  comments_count: string;
  creator: Creator;
  date: string;
  description: string;
  editing: string;
  fixed_post: string;
  id: number;
  ip: string;
  likes_count: string;
  locked: string;
  media: Media[]; 
  media_count: string;
  price: string;
  replies_count: string;
  schedule: string;
  scheduled_date: string;
  status: string;
  title: string;
  token_id: string;
  user_id: string;
  video_views: string;
}

export interface PostResponse {
  data: PostData;
  media_paths: string[];
  message: string;
  status: boolean;
}

export interface PostData {  // Ensure this matches API structure
  data: Post[];
  current_page: number;
}
