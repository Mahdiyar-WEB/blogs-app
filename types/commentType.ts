export interface CommentContent {
  text: string;
}

export interface CommentAnswer {
  _id: string;
  user: {
    name: string;
  };
  post: string;
  content: CommentContent;
  status: number;
  openToComment: boolean;
  createdAt: string;
}

export interface Comment {
  _id: string;
  user: {
    name: string;
  };
  post?: {
    title: string;
    slug: string;
  };
  content: CommentContent;
  status: number;
  openToComment: boolean;
  answers: CommentAnswer[];
  createdAt: string;
  updatedAt: string;
}