import { todoList } from '../..';
import Storage from '../Storage';
import Todo from '../Todo';

export default class UI {
  // Project List
  static projectList = document.querySelector('.projects');
  static selectedProject;

  static initProjectList() {
    // if (!Storage.checkStorage()) Storage.setProjects();
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
    li.addEventListener('click', () => this.setActive(li));

    return li;
  }

  static createProjectListRemoveIcon() {
    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-trash-can');
    icon.addEventListener('click', this.removeProject, { once: true });

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
    this.renderTodoList();
  }

  static getActiveProject() {
    return this.selectedProject.textContent;
  }

  static displayActiveProjectName() {
    document.querySelector('#activeProjectName').textContent =
      this.getActiveProject();
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

  static initMakeFieldEditable(project) {
    project.addEventListener('dblclick', this.makeFieldEditable);
  }

  static clearInput() {
    this.newProjectInput.value = '';
    this.newProjectLabel.classList.remove('visible');
  }

  // Todo List

  static initTodoList() {
    const newTodoBtn = document.querySelector('.btn-add');
    this.renderTodoList();
    newTodoBtn.addEventListener('click', () => this.createTodo());
  }

  static renderTodoList() {
    const todolist = document.querySelector('.todos');
    const todos = Storage.getTodos(this.getActiveProject());

    this.clearTodoList(todolist);

    if (todos) {
      todos.forEach((todo) =>
        todolist.insertBefore(this.renderTodo(todo), todolist.firstChild)
      );
    }
  }

  // static getTodos(selectedProject) {
  //   return selectedProject && todoList.getProject(selectedProject)
  //     ? todoList.getProject(selectedProject).getAllTodo()
  //     : false;
  // }

  static renderTodo(todo) {
    const div = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const dueDate = document.createElement('p');
    const btnComplete = document.createElement('button');
    const btnRemove = document.createElement('button');

    div.className = 'todo';
    div.setAttribute('data-id', todo.getId());
    title.textContent = todo.getTitle();
    title.className = 'title';
    title.setAttribute('data-title', '');
    description.textContent = todo.getDescription();
    description.className = 'description';
    description.setAttribute('data-description', '');
    dueDate.textContent = todo.getDueDate();
    dueDate.className = 'dueDate';
    dueDate.setAttribute('data-date', '');
    btnComplete.textContent = 'Completed';
    btnComplete.className = 'btn btn-complete';
    btnComplete.style.background = todo.getIsComplete() ? 'green' : 'red';
    btnRemove.textContent = 'Delete';
    btnRemove.className = 'btn btn-remove';
    [title, description, dueDate].forEach((field) =>
      field.addEventListener('dblclick', this.makeFieldEditable)
    );

    btnComplete.addEventListener('click', (e) => this.setComplete(e));
    btnRemove.addEventListener('click', (e) => this.removeTodo(e));
    div.append(title, description, dueDate, btnComplete, btnRemove);

    return div;
  }

  static clearTodoList(todoList) {
    const todos = document.querySelectorAll('.todo');
    if (todos) todos.forEach((todo) => todoList.removeChild(todo));
  }

  static createTodo() {
    todoList.getProject(this.getActiveProject()).createTodo(new Todo());
    Storage.setProjects();
    this.renderTodoList();
  }

  static removeTodo(e) {
    const id = e.target.parentElement.dataset.id;
    todoList.getProject(this.getActiveProject()).removeTodo(id);
    Storage.setProjects();
    this.renderTodoList();
  }

  static setComplete(e) {
    const id = e.target.parentElement.dataset.id;

    const todo = todoList.getProject(this.getActiveProject()).getTodo(id);

    if (todo.getIsComplete()) return;

    todo.setComplete();
    this.removeTodo(e);
    todoList.getProject('Completed').createTodo(todo);
    this.renderTodoList();
    Storage.setProjects();
  }

  static renameTodo(id, title) {
    todoList.getProject(this.getActiveProject()).getTodo(id).setTitle(title);
  }

  static changeDescription(id, description) {
    todoList
      .getProject(this.getActiveProject())
      .getTodo(id)
      .setDescription(description);
  }

  static changeDate(id, date) {
    todoList
      .getProject(this.getActiveProject())
      .getTodo(id)
      .setDueDate(Date.parse(date));
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

  static changeValue(element, value) {
    const id = element.parentElement.hasAttribute('data-id')
      ? element.parentElement.getAttribute('data-id')
      : undefined;
    if (element.hasAttribute('data-name')) this.renameProject(element, value);
    if (element.hasAttribute('data-title')) this.renameTodo(id, value);
    if (element.hasAttribute('data-description'))
      this.changeDescription(id, value);
    if (element.hasAttribute('data-date')) this.changeDate(id, value);
  }
}
