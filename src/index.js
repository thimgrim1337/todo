import './styles/main.scss';
import App from './modules/App';

const app = new App();

function initProjectList() {
  const projectsList = document.querySelector('.projects');
  const defaultProjects = app.getDefaultProjects();

  defaultProjects.forEach((project) => {
    projectsList.appendChild(createProjectListItem(project.name));
  });
}

function createProjectListItem(name) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  li.classList.add('project');

  a.textContent = name;
  a.href = '#';

  li.appendChild(a);
  return li;
}

function createProjectListRemoveIcon() {
  const icon = document.createElement('i');
  icon.classList.add('fa-regular', 'fa-trash-can');
  return icon;
}

function createProject(name) {
  if (!app.checkName(name)) return;
  const projectsList = document.querySelector('.projects');
  const project = createProjectListItem(name);
  project.appendChild(createProjectListRemoveIcon());
  projectsList.appendChild(project);
}

initProjectList();

// console.log(app.getAllProjects());

// function createProjectList() {
//   const deleteProjectIcons = document.querySelectorAll('.fa-trash-can');
//   deleteProjectIcons.forEach((icon) =>
//     icon.addEventListener('click', () => {
//       if (app.deleteProject(icon.previousSibling.textContent)) {
//         icon.parentElement.remove();
//       }
//     })
//   );
// }

// createProjectList();
