import UI from './modules/GUI/UI';
import TodoList from './modules/TodoList';
import Todo from './modules/Todo';
import Storage from './modules/Storage';
import './styles/main.scss';

// export const app = new App();

// renderProjectList();

export const todoList = new TodoList();
// todoList.getProject('Main').createTodo(new Todo('1'));
// todoList.getProject('Main').createTodo(new Todo('2'));
// todoList.getProject('Main').createTodo(new Todo('3'));
// todoList.getProject('Main').createTodo(new Todo('4'));
UI.initProjectList();
UI.initTodoList();
