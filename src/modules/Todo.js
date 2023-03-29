import { v4 as uuid } from 'uuid';
import format from 'date-fns/format';

export default class Todo {
  constructor(title) {
    this.id = uuidGenerator();
    this.title = title;
    this.description = this.setDescription();
    this.dueDate = dateFormater(Date.now());
    this.priority = 1;
    this.isComplete = false;
  }

  setTitle = (title) =>
    title !== '' ? (this.title = title) : (this.title = 'No title');

  setDescription = (description) =>
    description != ''
      ? (this.description = description)
      : (this.description = 'No description');

  setDueDate = (dueDate) => (this.dueDate = dateFormater(dueDate));
  setPriority = (priority) => (this.priority = priority);
  setComplete = () => (this.isComplete = !this.isComplete);

  getId = () => this.id;
  getTitle = () => this.title;
  getDescription = () => this.description;
  getDueDate = () => this.dueDate;
  getPriority = () => this.priority;
  getIsComplete = () => this.isComplete;
}

const dateFormater = (date) => format(date, 'yyyy-MM-dd');
const uuidGenerator = () => uuid();
