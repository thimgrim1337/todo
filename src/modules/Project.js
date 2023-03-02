export default class Project {
  constructor(name) {
    this.todos = [];
    this.name = name;
  }

  getAllTodos = () => this.todos;

  addToProject = (todo) => this.todos.push(todo);

  removeFromProject = (id) => this.todos.splice(this.findIndex(id), 1);

  searchTodo = (id) => this.todos.find((todo) => todo.id === id);

  findIndex = (id) => this.todos.indexOf(this.searchTodo(id));
}
