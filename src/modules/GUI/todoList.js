import { app } from '../../index';
import Todo from '../Todo';
import makeFieldEditable from './makeFieldEditable';
import { selectedProject } from './projectList';

export default function renderTodoList() {
  const todoList = document.querySelector('.todos');
  const newTodoBtn = document.querySelector('.btn-add');
  const todos = getAllTodos(selectedProject);

  clearTodoList(todoList);

  if (todos) {
    todos.forEach((todo) =>
      todoList.insertBefore(renderTodo(todo), newTodoBtn)
    );
  }

  document
    .querySelectorAll('[data-title]')
    .forEach((title) => title.addEventListener('dblclick', makeFieldEditable));

  newTodoBtn.addEventListener('click', createTodo);
}

function getAllTodos(selectedProject) {
  return selectedProject && app.getProject(selectedProject.textContent)
    ? app.getProject(selectedProject.textContent).getAllTodos()
    : false;
}

function renderTodo(todo) {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const dueDate = document.createElement('p');
  const btn = document.createElement('button');

  div.className = 'todo';
  div.setAttribute('data-id', todo.getId());
  title.textContent = todo.getTitle();
  title.className = 'title';
  title.setAttribute('data-title', '');
  description.textContent = todo.getDescription();
  description.className = 'description';
  description.setAttribute('data-description', '');
  dueDate.textContent = todo.getDueDate();
  dueDate.className = 'dueDate';
  dueDate.setAttribute('data-date', '');
  btn.textContent = 'Completed';
  btn.className = 'btn btn-complete';

  [title, description, dueDate].forEach((field) =>
    field.addEventListener('dblclick', makeFieldEditable)
  );
  div.append(title, description, dueDate, btn);

  return div;
}

function clearTodoList(todoList) {
  const todos = document.querySelectorAll('.todo');
  if (todos) todos.forEach((todo) => todoList.removeChild(todo));
}

function createTodo() {
  const newTodo = new Todo();
  app.getProject(selectedProject.textContent).createTodo(newTodo);
  renderTodo(newTodo);
  renderTodoList();
}

export function renameTodo(id, title) {
  app.getProject(selectedProject.textContent).getTodo(id).setTitle(title);
}

export function changeDescription(id, description) {
  app
    .getProject(selectedProject.textContent)
    .getTodo(id)
    .setDescription(description);
}

export function changeDate(id, date) {
  app
    .getProject(selectedProject.textContent)
    .getTodo(id)
    .setDueDate(Date.parse(date));
}
