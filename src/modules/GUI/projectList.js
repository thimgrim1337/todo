import { app } from '../../index';

let selectedProject;

export default function initProjectList() {
  const projectsList = document.querySelector('.projects');
  const defaultProjects = app.getDefaultProjects();
  const newProjectLabel = document.querySelector('[for="newProject"]');
  const newProjectInput = document.querySelector('input#newProject');

  defaultProjects.forEach((project) =>
    projectsList.appendChild(createProjectListItem(project.name))
  );

  setDefaultActive();

  document
    .querySelector('.btn-project')
    .addEventListener('click', () =>
      newProjectLabel.classList.toggle('visible')
    );

  document
    .querySelector('.fa-check')
    .addEventListener(
      'click',
      () => createProject(newProjectInput.value) && clearInput()
    );

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
  li.addEventListener('click', () => setActive(li));

  return li;
}

function createProjectListRemoveIcon() {
  const icon = document.createElement('i');
  icon.classList.add('fa-regular', 'fa-trash-can');
  icon.addEventListener('click', deleteProject, { once: true });

  return icon;
}

function createProject(name) {
  if (!app.checkName(name)) return false;

  const projectsList = document.querySelector('.projects');
  const project = createProjectListItem(name);

  project.appendChild(createProjectListRemoveIcon(name));
  project.addEventListener('dblclick', makeFieldEditable);
  projectsList.appendChild(project);
  app.createProject(name);
  setActive(project);

  return true;
}

function deleteProject(e) {
  e.stopPropagation();
  let projectName = e.target.closest('li').textContent;
  app.deleteProject(projectName);
  e.target.parentElement.remove();
  setDefaultActive();
}

function setDefaultActive() {
  const mainProject = document.querySelector('.project');
  setActive(mainProject);
}

function setActive(project) {
  if (selectedProject) selectedProject.classList.remove('active');
  selectedProject = project;
  project.classList.add('active');
  displayActiveProjectName();
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
      app.getProject(currentName).setName(newName);
      currentElement.appendChild(createProjectListRemoveIcon(newName));

      input.removeEventListener('keydown', changeName);
      input.removeEventListener('focusout', changeName);
    }
  }
}
