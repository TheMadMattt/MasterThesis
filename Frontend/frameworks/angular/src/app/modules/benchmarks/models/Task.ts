export class Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;

  constructor() {
    this.id = -1;
    this.title = '';
    this.description = '';
    this.completed = false;
  }

  setTask(id: number, title: string, description: string, completed: boolean): void {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}
