export class Task {
  id;
  title;
  description;
  completed;

  constructor() {
    this.id = -1;
    this.title = '';
    this.description = '';
    this.completed = false;
  }

  setTask(id, title, description, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}
