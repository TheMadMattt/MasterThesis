export interface PostDTO {
  title: string;
  body: string;
}

export interface CommentDTO {
  postId: number;
  name: string;
  email: string;
  body: string;
}
