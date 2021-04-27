export class Post {
  userId;
  id;
  title;
  body;
  comments;

  constructor() {
    this.id = -1;
    this.title = '';
    this.body = '';
  }

  setPost(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
  }
}

export class Comment {
  postId;
  id;
  name;
  email;
  body;
}
