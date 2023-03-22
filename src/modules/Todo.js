import { v4 as uuid } from 'uuid';
import format from 'date-fns/format';

export default class Todo {
  constructor(
    title = 'No Title',
    description = 'No description',
    dueDate = Date.now(),
    priority = 1,
    id = uuidGenerator(),
    isComplete = false
  ) {
    this.id = id;
    this.title = this.setTitle(title);
    this.description = this.setDescription(description);
    this.dueDate = dateFormater(dueDate);
    this.priority = priority;
    this.isComplete = isComplete;
  }

  setTitle = (title) =>
    title != '' ? (this.title = title) : (this.title = 'No title');

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
