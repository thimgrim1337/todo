import './styles/main.scss';
import App from './modules/App';

const app = new App();

function createProjectList() {
  const projectsList = document.querySelector('.projects');
  const projects = app.getAllProject();

  projects.forEach((project) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const i = document.createElement('i');
    li.classList.add('project');
    i.classList.add('fa-regular', 'fa-trash-can');

    a.textContent = project.name;
    a.href = '#';

    li.append(a, i);
    projectsList.appendChild(li);
  });

  const deleteProjectIcons = document.querySelectorAll('.fa-trash-can');
  deleteProjectIcons.forEach((icon) =>
    icon.addEventListener('click', () => {
      if (app.deleteProject(icon.previousSibling.textContent)) {
        icon.parentElement.remove();
      }
    })
  );
}

createProjectList();
