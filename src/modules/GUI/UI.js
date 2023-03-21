import { todoList } from '../..';
import Storage from '../Storage';

export default class UI {
  static projectList = document.querySelector('.projects');
  static selectedProject;

  static initProjectList() {
    if (!Storage.checkStorage()) Storage.setProjects();
    this.renderProjectsList();
    this.initNewProjectEventListeners();
    this.setDefaultActiveProject();
  }

  static renderProjectsList() {
    const projects = Storage.getProjects();

    projects.forEach((project) => {
      if (project.name === 'Main' || project.name === 'Completed')
        this.projectList.appendChild(this.createProjectListItem(project.name));
      else this.projectList.appendChild(this.createProject(project.name));
    });
  }

  static createProjectListItem(projectName) {
    const li = document.createElement('li');

    li.textContent = projectName;
    li.classList.add('project');
    li.setAttribute('data-name', projectName);
    this.initLiActiveEventlistener(li);

    return li;
  }

  static createProjectListRemoveIcon() {
    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-trash-can');
    this.initRemoveProjectEventlistener(icon);

    return icon;
  }

  static createProject(projectName) {
    if (!todoList.isNameAvaiable(projectName)) return;

    todoList.createProject(projectName);
    Storage.setProjects();

    const project = this.createProjectListItem(projectName);
    project.appendChild(this.createProjectListRemoveIcon());
    this.setActive(project);
    this.projectList.appendChild(project);
    this.initMakeFieldEditable(project);

    return project;
  }

  static removeProject(e) {
    e.stopPropagation();
    let projectName = e.target.closest('li').textContent;
    todoList.removeProject(projectName);
    e.target.parentElement.remove();
    Storage.setProjects();
    this.setDefaultActiveProject;
  }

  static renameProject(element, newName) {
    const oldName = element.getAttribute('data-name');

    todoList.getProject(oldName).setName(newName);
    document
      .querySelector(`[data-name="${oldName}"]`)
      .setAttribute('data-name', newName);
    document
      .querySelector(`[data-name="${newName}"]`)
      .appendChild(this.createProjectListRemoveIcon(newName));

    this.setActive(document.querySelector(`[data-name="${newName}"]`));

    Storage.setProjects();
  }

  static setActive(project) {
    if (this.selectedProject) this.selectedProject.classList.remove('active');
    this.selectedProject = project;
    project.classList.add('active');
    this.displayActiveProjectName();
  }

  static displayActiveProjectName() {
    document.querySelector('#activeProjectName').textContent =
      this.selectedProject.textContent;
  }

  static setDefaultActiveProject() {
    this.setActive(document.querySelector('.project'));
  }

  // PROJECT LIST EVENTLISTENERS
  static newProjectBtn = document.querySelector('.btn-project');
  static newProjectLabel = document.querySelector('[for="newProject"]');
  static newProjectInput = document.querySelector('input#newProject');
  static newProjectConfirmBtn = document.querySelector('.fa-check');
  static newProjectAbortBtn = document.querySelector('.fa-xmark');
  static projectsListItem = document.querySelectorAll('.project');

  static initNewProjectEventListeners() {
    this.newProjectBtn.addEventListener('click', () =>
      this.newProjectLabel.classList.toggle('visible')
    );

    this.newProjectConfirmBtn.addEventListener('click', () => {
      this.createProject(this.newProjectInput.value);
      this.clearInput();
    });

    this.newProjectAbortBtn.addEventListener('click', () => this.clearInput());
  }

  static initLiActiveEventlistener(li) {
    li.addEventListener('click', () => this.setActive(li));
  }

  static initRemoveProjectEventlistener(btn) {
    btn.addEventListener('click', this.removeProject, { once: true });
  }

  static initMakeFieldEditable(project) {
    project.addEventListener('dblclick', this.makeFieldEditable);
  }

  static clearInput() {
    this.newProjectInput.value = '';
    this.newProjectLabel.classList.remove('visible');
  }

  static getInput(element) {
    if (element.hasAttribute('data-description'))
      return document.createElement('textarea');
    if (element.hasAttribute('data-date')) {
      const datetime = document.createElement('input');
      datetime.type = 'date';
      return datetime;
    }

    return document.createElement('input');
  }

  static makeFieldEditable(e) {
    const currentElement = e.target;
    const currentValue = e.target.textContent;

    const input = UI.getInput(currentElement);

    e.target.parentElement.replaceChild(input, currentElement);
    input.value = currentValue;

    input.addEventListener('keydown', editField);
    input.addEventListener('focusout', editField);

    function editField(e) {
      if (e.type == 'keydown' && e.key == 'Enter') {
        const newValue =
          e.target.value != '' ? e.target.value : 'Fill this field';
        currentElement.textContent = newValue;
        e.target.parentElement.replaceChild(currentElement, input);

        UI.changeValue(currentElement, newValue);

        input.removeEventListener('keydown', editField);
        input.removeEventListener('focusout', editField);
      }
    }
  }

  static changeValue(element, value) {
    const id = element.parentElement.hasAttribute('data-id')
      ? element.parentElement.getAttribute('data-id')
      : undefined;
    if (element.hasAttribute('data-name')) this.renameProject(element, value);
    if (element.hasAttribute('data-title')) renameTodo(id, value);
    if (element.hasAttribute('data-description')) changeDescription(id, value);
    if (element.hasAttribute('data-date')) changeDate(id, value);
  }
}
