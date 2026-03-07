export interface Analysis {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  content: string;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string | null;
  is_author_verified: boolean;
  tags: string[] | null;
  views_count: number;
  likes_count: number;
  pr_url: string;
  visibility: boolean;
}

export interface ProjectWithAnalyses {
  id: string;
  repo_name: string;
  repo_owner: string;
  user_id: string;
  analyses: Analysis[];
}
