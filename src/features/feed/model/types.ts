export interface FeedCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    thumbnail_url: string;
    likes_count: number;
    created_at: string;
    tags: string[];
    is_author_verified: boolean;
    users: {
      username: string;
      avatar_url: string;
    };
  };
}
