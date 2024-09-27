// Type for the User object
type User = {
    id: number;
    avatar: string;
    name: string;
    username: string;
    hide_name: 'yes' | 'no';
    status: 'active' | 'inactive';
    verified_id: 'yes' | 'no';
    active_status_online: 'yes' | 'no';
  };
  
  // Type for the Media object
  type Media = {
    id: number;
    url: string;
    type: string;
    created_at: string;
    updated_at: string;
    original_name?: string;
    format?: string;
    size?: number;
  };
  
  // Type for the Message object
  export  type Message = {
    id: number;
    conversations_id: number;
    from_user_id: number;
    to_user_id: number;
    message: string;
    attach_file: string;
    created_at: string;
    updated_at: string;
    status: 'readed' | 'unread';
    remove_from: '1' | '0';
    file: string;
    original_name: string;
    format: string;
    size: string;
    price: string;
    tip: 'yes' | 'no';
    tip_amount: number;
    mode: 'active' | 'inactive';
    gift_id: number | null;
    gift_amount: string;
    sender: User;
    receiver: User;
    media: Media[];
  };
  

  export type MessagesInbox = {
    current_page: number;
    data: Message[];
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
  };
  
  // Example of the full response type
  export  type MessagesInboxResponse = {
    messagesInbox: MessagesInbox;
  };
  