import './styles/main.scss';
import renderProjectList from './modules/GUI/projectList';
import App from './modules/App';
import Todo from './modules/Todo';

export const app = new App();
app.getProject('Main').addToProject(new Todo());
app.getProject('Main').addToProject(new Todo());
app.getProject('Main').addToProject(new Todo());
app.getProject('Main').addToProject(new Todo());

renderProjectList();
