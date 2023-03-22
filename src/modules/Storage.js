import { parseISO } from 'date-fns';
import { todoList } from '..';
import Todo from './Todo';

export default class Storage {
  static setProjects() {
    localStorage.setItem('projects', JSON.stringify(todoList.getAllProjects()));
  }

  static getProjects() {
    return JSON.parse(localStorage.getItem('projects'));
  }

  static getTodos(projectName) {
    const rawTodos = JSON.parse(localStorage.getItem('projects')).find(
      (project) => project.name === projectName
    ).todos;

    const todos = [];

    rawTodos.forEach((todo) => {
      todos.push(
        Object.create(
          new Todo(
            todo.title,
            todo.description,
            parseISO(todo.dueDate),
            todo.priority,
            todo.id,
            todo.isComplete
          )
        )
      );
    });

    return todos;
  }

  static checkStorage() {
    if (localStorage.getItem('projects')) return true;

    return false;
  }
}
