// import './styles/main.scss';
import Todo from './modules/Todo';
import Project from './modules/Project';

class Application {
  constructor() {
    this.projects = [new Project('main')];
  }

  getProject = () => this.projects;
}

const date = Date.now();
const project = new Project('main');
const todoOne = new Todo();
const todoTwo = new Todo('myTodo', 'fff', date, 2);

project.addToProject(todoOne);
project.addToProject(todoTwo);
console.log(project.getAllTodos());
