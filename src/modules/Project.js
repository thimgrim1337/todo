import Todo from './Todo';

export default class Project {
  constructor(name) {
    this.todos = [];
    this.name = name;
  }

  setName = (name) => (this.name = name);

  getAllTodos = () => this.todos;

  addToProject = () => this.todos.push(new Todo());

  removeFromProject = (id) =>
    this.todos.splice(
      this.todos.findIndex((todo) => (todo.id = id)),
      1
    );

  searchTodo = (id) => this.todos.find((todo) => todo.id === id);
}
