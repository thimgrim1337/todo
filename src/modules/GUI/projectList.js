import { app } from '../../index';
import renderTodoList from './todoList';
import makeFieldEditable from './makeFieldEditable';

export let selectedProject;

export default function renderProjectList() {
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
  li.setAttribute('data-name', name);
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

export function renameProject(element, newName) {
  const oldName = element.getAttribute('data-name');

  app.getProject(oldName).setName(newName);
  document
    .querySelector(`[data-name="${oldName}"]`)
    .setAttribute('data-name', newName);
  document
    .querySelector(`[data-name="${newName}"]`)
    .appendChild(createProjectListRemoveIcon(newName));

  setActive(document.querySelector(`[data-name="${newName}"]`));
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
  renderTodoList();
}

function displayActiveProjectName() {
  document.querySelector('#activeProjectName').textContent =
    document.querySelector('.active').textContent;
}
