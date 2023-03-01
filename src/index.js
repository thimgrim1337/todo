// import './styles/main.scss';

class IdGenerator {
  constructor() {}
}

class Todo {
  constructor(title, description, dueDate, priority) {
    this.id = Math.floor(Math.random() * 1000);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }

  setTitle = (title) => (this.title = title);
  setDescription = (description) => (this.description = description);
  setDueDate = (dueDate) => (this.dueDate = dueDate);
  setPriority = (priority) => (this.priority = priority);
  setComplete = () => (this.isComplete = !this.isComplete);
}

const testTodoes = [
  new Todo('One', 'blabla1', '01-03-2023', 1),
  new Todo('Two', 'blabla2', '02-03-2023', 1),
  new Todo('Three', 'blabla3', '03-03-2023', 2),
];

class Project {
  constructor(name, todos) {
    this.todos = todos;
    this.name = name;
  }

  getAllTodos = () => this.todos;

  addToProject = (todo) => this.todos.push(todo);
  removeFromProject = (id) => this.todos.splice(this.findIndex(id), 1);

  searchTodo = (id) => this.todos.find((todo) => todo.id === id);
  findIndex = (id) => this.todos.indexOf(this.searchTodo(id));
}

class Application {
  constructor() {
    this.projects = [new Project('main', testTodoes)];
  }

  getProjects = () => this.projects;
}

const app = new Application();
console.log(app.getProjects());
