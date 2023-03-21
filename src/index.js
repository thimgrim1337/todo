import UI from './modules/GUI/UI';
import TodoList from './modules/TodoList';
import './styles/main.scss';

// export const app = new App();
// app.getProject('Main').createTodo(new Todo('1'));
// app.getProject('Main').createTodo(new Todo('2'));
// app.getProject('Main').createTodo(new Todo('3'));
// app.getProject('Main').createTodo(new Todo('4'));

// renderProjectList();

export const todoList = new TodoList();
UI.initProjectList();
