export class Post {
  userId?: number;
  id: number;
  title: string;
  body: string;
  comments?: Comment[];

  constructor() {
    this.id = -1;
    this.title = '';
    this.body = '';
  }

  setPost(id: number, title: string, body: string): void {
    this.id = id;
    this.title = title;
    this.body = body;
  }
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
