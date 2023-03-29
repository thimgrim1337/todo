import Storage from './Storage';
import TodoList from './TodoList';

export default class UI {
  // Project List
  static todoList = new TodoList();
  static projectList = document.querySelector('.projects__list');
  static selectedProject;

  static initTodoApp() {
    this.initProjectList();
    // this.initTodoList();
  }

  static initProjectList() {
    this.renderProjectsList();
    this.initProjectEventlistener();
    this.setDefaultActiveProject();
  }

  static renderProjectsList() {
    this.todoList = Storage.checkStorage(this.todoList);

    this.projectList.innerHTML = '';
    const projects = this.todoList.getProjects();

    projects.forEach((project) => {
      if (project.getName() === 'Main' || project.getName() === 'Completed') {
        this.projectList.appendChild(
          this.createDefaultProjectListItem(project.getName())
        );
      } else
        this.projectList.appendChild(
          this.createProjectListItem(project.getName())
        );
    });
  }

  static createDefaultProjectListItem(projectName) {
    const li = document.createElement('li');

    li.textContent = projectName;
    li.classList.add('projects__item');
    li.setAttribute('data-name', projectName);
    li.addEventListener('click', () => this.setActive(li));

    return li;
  }

  static createProjectListRemoveIcon() {
    const icon = document.createElement('i');
    icon.classList.add(
      'icon',
      'projects__icon',
      'icon--remove',
      'is-hidden',
      'fa-solid',
      'fa-trash'
    );
    icon.addEventListener('click', (e) => this.removeProject(e));

    return icon;
  }

  static createProjectListItem(projectName) {
    const li = this.createDefaultProjectListItem(projectName);
    const icon = this.createProjectListRemoveIcon();

    li.appendChild(icon);
    this.setActive(li);
    this.initProjectHoverEventlistener(li);
    // this.initMakeFieldEditable(li);

    return li;
  }

  static createProject(projectName) {
    if (projectName === '') return;

    Storage.createProject(projectName);
    this.renderProjectsList();
  }

  static removeProject(e) {
    e.stopPropagation();
    let projectName = e.target.closest('li').textContent;
    Storage.removeProject(projectName);
    e.target.parentElement.remove();
    this.setDefaultActiveProject();
  }

  static renameProject(element, newName) {
    const oldName = element.getAttribute('data-name');

    Storage.renameProject(oldName, newName);

    document
      .querySelector(`[data-name="${oldName}"]`)
      .setAttribute('data-name', newName);
    document
      .querySelector(`[data-name="${newName}"]`)
      .appendChild(this.createProjectListRemoveIcon(newName));

    this.setActive(document.querySelector(`[data-name="${newName}"]`));
  }

  static setActive(project) {
    if (this.selectedProject)
      this.selectedProject.classList.remove('projects__item--active');
    this.selectedProject = project;
    project.classList.add('projects__item--active');
    this.displayActiveProjectName();
    this.renderTodoList();
  }

  static getActiveProject() {
    return this.selectedProject.textContent;
  }

  static displayActiveProjectName() {
    document.querySelector('.todos__title span').textContent =
      this.getActiveProject();
  }

  static setDefaultActiveProject() {
    this.setActive(document.querySelector('.projects__item'));
  }

  // PROJECT LIST EVENTLISTENERS
  static newProjectBtn = document.querySelector('.projects__btn');

  static initProjectEventlistener() {
    const projectNumber = this.todoList.getProjects().length + 1;
    this.newProjectBtn.addEventListener('click', () =>
      this.createProject(`Project ${projectNumber}`)
    );
  }

  static initProjectHoverEventlistener(node) {
    node.addEventListener('mouseover', () => {
      node.firstElementChild.classList.remove('is-hidden');
    });

    node.addEventListener('mouseout', () => {
      node.firstElementChild.classList.add('is-hidden');
    });
  }

  static initMakeFieldEditable(node) {
    this.makeFieldEditable(node);
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
    this.todoList = Storage.checkStorage(this.todoList);
    const todosDiv = document.querySelector('.todos');
    const todos = this.todoList.getProject(this.getActiveProject()).getTodos();

    this.clearTodoList(todosDiv);

    if (todos) {
      todos.forEach((todo) =>
        todosDiv.insertBefore(this.renderTodo(todo), todosDiv.firstChild)
      );
    }
  }

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
    Storage.createTodo(this.getActiveProject());
    this.renderTodoList();
  }

  static removeTodo(e) {
    const id = e.target.parentElement.dataset.id;
    Storage.removeTodo(this.getActiveProject(), id);
    this.renderTodoList();
  }

  static setComplete(e) {
    const id = e.target.parentElement.dataset.id;
    Storage.setComplete(this.getActiveProject(), id);
    this.renderTodoList();
  }

  static renameTodo(id, title) {
    Storage.renameTodo(this.getActiveProject(), id, title);
  }

  static changeDescription(id, description) {
    Storage.changeDescription(this.getActiveProject(), id, description);
  }

  static changeDate(id, date) {
    Storage.changeDate(this.getActiveProject(), id, date);
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
