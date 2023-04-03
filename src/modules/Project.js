export default class Project {
  constructor(name) {
    this.todos = [];
    this.name = name;
  }

  setName = (projectName) => (this.name = projectName);
  getName = () => this.name;

  getTodos = () => this.todos;
  setTodos = (todos) => (this.todos = todos);

  setTodo = (todo) => this.todos.push(todo);
  getTodo = (id) => this.todos.find((todo) => todo.id === id);

  removeTodo = (id) =>
    this.todos.splice(
      this.todos.findIndex((todo) => todo.id == id),
      1
    );
}
