export default class Project {
  constructor(name) {
    this.todos = [];
    this.name = name;
  }

  setName = (name) => (this.name = name);

  getAllTodos = () => this.todos;

  createTodo = (todo) => this.todos.push(todo);

  removeTodo = (id) =>
    this.todos.splice(
      this.todos.findIndex((todo) => (todo.id = id)),
      1
    );

  getTodo = (id) => this.todos.find((todo) => todo.id === id);
}
