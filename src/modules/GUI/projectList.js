import { app } from '../../index';

export default function initProjectList() {
  const projectsList = document.querySelector('.projects');
  const defaultProjects = app.getDefaultProjects();
  const newProjectLabel = document.querySelector('[for="newProject"]');
  const newProjectInput = document.querySelector('input#newProject');

  defaultProjects.forEach((project) => {
    projectsList.appendChild(createProjectListItem(project.name));
  });

  const mainProject = document.querySelector('.project');
  mainProject.classList.add('active');
  displayActiveProjectName();

  document.querySelector('.btn-project').addEventListener('click', () => {
    newProjectLabel.classList.toggle('visible');
  });

  document.querySelector('.fa-check').addEventListener('click', () => {
    createProject(newProjectInput.value) && clearInput(newProjectInput);
  });

  document.querySelector('.fa-xmark').addEventListener('click', clearInput);
  function clearInput() {
    newProjectInput.value = '';
    newProjectLabel.classList.remove('visible');
  }
}

function createProjectListItem(name) {
  const li = document.createElement('li');

  li.textContent = name;
  li.classList.add('project');

  li.addEventListener('click', setActive);
  li.addEventListener('dblclick', makeFieldEditable);

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

function setActive(e) {
  removeActiveClass();
  e.target.classList.add('active');
  displayActiveProjectName();
}

function removeActiveClass() {
  document
    .querySelectorAll('.project')
    .forEach((project) => project.classList.remove('active'));
}

function displayActiveProjectName() {
  document.querySelector('#activeProjectName').textContent =
    document.querySelector('.active').textContent;
}

function makeFieldEditable(e) {
  const currentElement = e.target;
  const currentName = e.target.textContent;
  const input = document.createElement('input');
  input.type = 'text';

  e.target.parentElement.replaceChild(input, currentElement);
  input.value = currentName;

  input.addEventListener('keydown', changeName);
  input.addEventListener('focusout', changeName);

  function changeName(e) {
    if ((e.type == 'keydown' && e.key == 'Enter') || e.type == 'focusout') {
      const newName = e.target.value;
      currentElement.textContent = newName;
      e.target.parentElement.replaceChild(currentElement, input);

      input.removeEventListener('keydown', inputChange);
      input.removeEventListener('focusout', inputChange);
    }
  }
}
