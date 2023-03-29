import Project from './Project';
import Todo from './Todo';
import TodoList from './TodoList';

export default class Storage {
  static setTodoList(data) {
    localStorage.setItem('todoList', JSON.stringify(data));
  }

  static getTodoList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('todoList'))
    );

    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(new Project(), project))
    );

    todoList
      .getProjects()
      .forEach((project) =>
        project.setTodos(
          project.getTodos().map((todo) => Object.assign(new Todo(), todo))
        )
      );

    return todoList;
  }

  static createProject(project) {
    const todoList = this.getTodoList();
    if (!todoList.isNameAvaiable(project)) return;
    todoList.addProject(project);
    this.setTodoList(todoList);
  }

  static removeProject(project) {
    const todoList = this.getTodoList();
    todoList.removeProject(project);
    this.setTodoList(todoList);
  }

  static renameProject(oldName, newName) {
    const todoList = this.getTodoList();
    todoList.getProject(oldName).setName(newName);
    this.setTodoList(todoList);
  }

  static createTodo(project, title) {
    const todoList = this.getTodoList();
    todoList.getProject(project).setTodo(new Todo(title));
    this.setTodoList(todoList);
  }

  static removeTodo(project, id) {
    const todoList = this.getTodoList();
    todoList.getProject(project).removeTodo(id);
    this.setTodoList(todoList);
  }

  static renameTodo(project, id, title) {
    const todoList = this.getTodoList();
    todoList.getProject(project).getTodo(id).setTitle(title);
    this.setTodoList(todoList);
  }

  static changeDescription(project, id, description) {
    const todoList = this.getTodoList();

    todoList.getProject(project).getTodo(id).setDescription(description);
    this.setTodoList(todoList);
  }

  static changeDate(project, id, date) {
    const todoList = this.getTodoList();
    todoList.getProject(project).getTodo(id).setDueDate(Date.parse(date));
    this.setTodoList(todoList);
  }

  static setComplete(project, id) {
    const todoList = this.getTodoList();
    const todo = todoList.getProject(project).getTodo(id);
    if (todo.getIsComplete()) return;
    todo.setComplete();

    todoList.getProject('Completed').setTodo(todo);
    todoList.getProject(project).removeTodo(id);

    this.setTodoList(todoList);
  }

  static checkStorage(todoList) {
    if (localStorage.getItem('todoList'))
      return (todoList = this.getTodoList());
    else this.setTodoList(todoList);

    return todoList;
  }
}
