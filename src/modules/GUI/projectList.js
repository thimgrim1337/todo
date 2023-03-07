import { app } from '../../index';

export default function initProjectList() {
  const projectsList = document.querySelector('.projects');
  const defaultProjects = app.getDefaultProjects();
  const label = document.querySelector('[for="newProject"]');
  const input = document.querySelector('input#newProject');

  defaultProjects.forEach((project) => {
    projectsList.appendChild(createProjectListItem(project.name));
  });

  document.querySelector('.btn-project').addEventListener('click', () => {
    label.classList.toggle('visible');
  });

  document.querySelector('.fa-check').addEventListener('click', () => {
    createProject(input.value) && clearInput(input);
  });

  document.querySelector('.fa-xmark').addEventListener('click', clearInput);
  function clearInput() {
    input.value = '';
    label.classList.remove('visible');
  }
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

function createProjectListRemoveIcon(name) {
  const icon = document.createElement('i');
  icon.classList.add('fa-regular', 'fa-trash-can');
  icon.addEventListener('click', () => {
    app.deleteProject(name);
    icon.parentElement.remove();
  });
  return icon;
}

function createProject(name) {
  if (!app.checkName(name)) return false;
  const projectsList = document.querySelector('.projects');
  const project = createProjectListItem(name);
  project.appendChild(createProjectListRemoveIcon(name));
  projectsList.appendChild(project);
  app.createProject(name);
  return true;
}
