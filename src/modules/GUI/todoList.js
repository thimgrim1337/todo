import { app } from '../../index';
import { selectedProject } from './projectList';

export default function renderTodoList() {
  const todoList = document.querySelector('.todos');
  const newTodoBtn = document.querySelector('.btn-add');
  const todos = app.getProject(selectedProject.textContent).getAllTodos();

  clearTodoList(todoList);

  todos.forEach((todo) =>
    todoList.insertBefore(renderTodo({ todo }), newTodoBtn)
  );

  newTodoBtn.addEventListener('click', createTodo);
}

function renderTodo({ todo }) {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const dueDate = document.createElement('p');
  const btn = document.createElement('button');

  div.className = 'todo';
  title.textContent = todo.getTitle();
  title.className = 'title';
  description.textContent = todo.getDescription();
  description.className = 'description';
  dueDate.textContent = todo.getDueDate();
  dueDate.className = 'dueDate';
  btn.textContent = 'Completed';
  btn.className = 'btn btn-complete';

  div.append(title, description, dueDate, btn);

  return div;
}

function clearTodoList(todoList) {
  const todos = document.querySelectorAll('.todo');
  if (todoList.contains(todos[0]))
    todos.forEach((todo) => todoList.removeChild(todo));
}

function createTodo() {}
