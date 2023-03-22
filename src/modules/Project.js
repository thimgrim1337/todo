export default class Project {
  constructor(name) {
    this.todos = [];
    this.name = name;
  }

  setName = (projectName) => (this.name = projectName);

  getAllTodo = () => this.todos;

  createTodo = (todo) => this.todos.push(todo);

  removeTodo = (id) =>
    this.todos.splice(
      this.todos.findIndex((todo) => todo.id == id),
      1
    );

  getTodo = (id) => this.todos.find((todo) => todo.id === id);
}
