import Storage from './Storage';
import TodoList from './TodoList';

export default class UI {
  // Project List
  static todoList = new TodoList();
  static projectList = document.querySelector('.projects__list');
  static selectedProject;

  static initTodoApp() {
    this.initProjectList();
    this.initTodoList();
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
    this.initProjectActiveEventlistener(li);

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
    this.initProjectRemoveEventlistener(icon);

    return icon;
  }

  static createProjectListItem(projectName) {
    const li = this.createDefaultProjectListItem(projectName);
    const icon = this.createProjectListRemoveIcon();

    li.appendChild(icon);
    this.setActive(li);
    this.initProjectHoverEventlistener(li);
    this.initMakeFieldEditable(li);

    return li;
  }

  static createProject(projectName) {
    if (projectName === '') return;

    Storage.createProject(projectName);
    this.renderProjectsList();
  }

  static removeProject(projectName) {
    Storage.removeProject(projectName);

    this.renderProjectsList();
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
    this.setActive(document.querySelector("[data-name='Main']"));
  }

  // PROJECT LIST EVENTLISTENERS
  static newProjectBtn = document.querySelector('.projects__btn');

  static initProjectEventlistener() {
    this.newProjectBtn.addEventListener('click', () => {
      const projectNumber = this.todoList.getProjects().length + 1;
      this.createProject(`Project ${projectNumber}`);
    });
  }

  static initProjectActiveEventlistener(node) {
    node.addEventListener('click', () => {
      this.setActive(node);
    });
  }

  static initProjectRemoveEventlistener(node) {
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      this.removeProject(node.parentElement.dataset.name);
    });
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
    node.addEventListener('dblclick', (e) => this.makeFieldEditable(e));
  }

  // Todo List
  static initTodoList() {
    const newTodoInput = document.querySelector('.todos__input-item');
    this.renderTodoList();
    newTodoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.createTodo(e.target.value);
        e.target.value = '';
      }
    });
  }

  static renderTodoList() {
    this.todoList = Storage.checkStorage(this.todoList);
    const todoLi = document.querySelector('.todos__list');
    const todos = this.todoList.getProject(this.getActiveProject()).getTodos();

    this.clearTodoList(todoLi);

    if (todos) {
      todos.forEach((todo) =>
        todoLi.insertBefore(this.renderTodo(todo), todoLi.firstChild)
      );
    }
  }

  static renderTodo(todo) {
    const li = document.createElement('li');
    const btnComplete = document.createElement('input');
    const title = document.createElement('label');
    const btnDetails = document.createElement('button');
    const date = document.createElement('span');
    const btnEdit = document.createElement('i');
    const btnRemove = document.createElement('i');

    li.className = 'todos__item';
    li.setAttribute('data-id', todo.getId());
    btnComplete.className = 'todos__input-checkbox';
    btnComplete.type = 'checkbox';
    btnComplete.name = 'task';
    btnComplete.id = 'task';
    title.classList.add('todos__name', 'flex-grow');
    title.for = 'task';
    title.textContent = todo.getTitle();
    title.setAttribute('data-title', '');
    btnDetails.classList.add('btn', 'todos__btn');
    btnDetails.textContent = 'Details';
    date.className = 'todos__date';
    date.textContent = todo.getDueDate();
    date.setAttribute('data-date', '');
    btnEdit.classList.add(
      'todos__icon',
      'icon',
      'icon--modify',
      'fa-solid',
      'fa-pencil'
    );
    btnRemove.classList.add(
      'todos__icon',
      'icon',
      'icon--remove',
      'fa-solid',
      'fa-trash'
    );

    if (todo.getPriority() === 1)
      li.classList.add('todos__item--priority-high');
    if (todo.getPriority() === 2)
      li.classList.add('todos__item--priority-medium');
    if (todo.getPriority() === 3) li.classList.add('todos__item--priority-low');

    this.initShowDetailsEventListener(btnDetails);
    this.initRemoveTodoEventListener(btnRemove);
    this.initEditTodoEventListener(btnEdit);
    li.append(btnComplete, title, btnDetails, date, btnEdit, btnRemove);

    return li;
  }

  static clearTodoList(todoList) {
    const todos = document.querySelectorAll('.todos__item');
    if (todos) todos.forEach((todo) => todoList.removeChild(todo));
  }

  static createTodo(todoTitle) {
    Storage.createTodo(this.getActiveProject(), todoTitle);
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

  static renderDetails(todo) {
    const details = document.createElement('div');
    const content = document.createElement('div');
    const title = document.createElement('h3');
    const name = document.createElement('p');
    const nameSpan = document.createElement('span');
    const description = document.createElement('p');
    const descriptionSpan = document.createElement('span');
    const creationDate = document.createElement('p');
    const creationDateSpan = document.createElement('span');
    const dueDate = document.createElement('p');
    const dueDateSpan = document.createElement('span');
    const priority = document.createElement('p');
    const prioritySpan = document.createElement('span');
    const isCompleted = document.createElement('p');
    const isCompletedSpan = document.createElement('span');

    details.classList.add('details', 'todos__details');
    content.classList.add('details__content');
    title.classList.add('details__title');
    title.textContent = 'Details';
    name.classList.add('details__task-name');
    nameSpan.textContent = `Name: ${todo.getTitle()}`;
    description.classList.add('details__task-description');
    descriptionSpan.textContent = `Description: ${todo.getDescription()}`;
    creationDate.classList.add('details__task-creation-date');
    creationDateSpan.textContent = `Creation date: ${todo.getCreationDate()}`;
    dueDate.classList.add('details__task-due-date');
    dueDateSpan.textContent = `Due date: ${todo.getDueDate()}`;
    priority.classList.add('details__task-priority');
    prioritySpan.textContent = `Priority: ${todo.getPriority()}`;
    isCompleted.classList.add('details__task-is-completed');
    isCompletedSpan.textContent = `Is complete: ${todo.getIsComplete()}`;

    name.appendChild(nameSpan);
    description.appendChild(descriptionSpan);
    creationDate.appendChild(creationDateSpan);
    dueDate.appendChild(dueDateSpan);
    priority.appendChild(prioritySpan);
    isCompleted.appendChild(isCompletedSpan);
    content.append(
      title,
      name,
      description,
      creationDate,
      dueDate,
      priority,
      isCompleted
    );
    details.appendChild(content);
    return details;
  }

  static initShowDetailsEventListener(btn) {
    btn.addEventListener('click', () => {
      const details = document.querySelector('.todos__details');
      if (details) {
        details.classList.remove('details--slidedown');
        details.classList.add('details--slideup');
        details.addEventListener('animationend', () => {
          details.remove();
        });
        return;
      }
      const detailsElement = this.renderDetails(
        this.todoList
          .getProject(this.getActiveProject())
          .getTodo(btn.parentElement.dataset.id)
      );

      detailsElement.classList.add('details--slidedown');
      btn.parentElement.appendChild(detailsElement);
    });
  }

  static initEditTodoEventListener(btn) {
    btn.addEventListener('click', () => {
      let priority = undefined;
      const todoId = btn.parentElement.dataset.id;
      const modal = document.querySelector('.modal');
      modal.classList.remove('is-hidden');
      const nameInput = document.querySelector('input#task-name');
      const descriptionInput = document.querySelector('input#task-description');
      const dueDateInput = document.querySelector('input#task-duedate');
      const priorityBtns = document.querySelectorAll(
        'label[for="task-priority"] > .btn'
      );
      const saveBtn = document.querySelector('.btn--save');
      const closeBtn = document.querySelector('.btn--close');

      priorityBtns.forEach((btn) =>
        btn.addEventListener('click', () => {
          priorityBtns.forEach((btn) => btn.classList.remove('btn--active'));
          btn.classList.add('btn--active');
          if (btn.textContent === 'Low') priority = 3;
          if (btn.textContent === 'Medium') priority = 2;
          if (btn.textContent === 'High') priority = 1;
        })
      );

      saveBtn.addEventListener('click', () => {
        // TODO: Jeśli puste pole nic nie rób
        Storage.renameTodo(this.getActiveProject(), todoId, nameInput.value);
        Storage.changeDescription(
          this.getActiveProject(),
          todoId,
          descriptionInput.value
        );

        Storage.changeDate(this.getActiveProject(), todoId, dueDateInput.value);
        Storage.changePriority(this.getActiveProject(), todoId, priority);

        nameInput.value = '';
        descriptionInput.value = '';
        dueDateInput.value = '';

        modal.classList.add('is-hidden');
      });

      closeBtn.addEventListener('click', () => {
        modal.classList.add('is-hidden');
      });
    });
  }

  static initRemoveTodoEventListener(btn) {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.add('todos__item--slideright');
      btn.parentElement.addEventListener('animationend', () => {
        Storage.removeTodo(
          this.getActiveProject(),
          btn.parentElement.dataset.id
        );
        this.renderTodoList();
      });
    });
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

    const input = document.createElement('input');
    input.classList.add('projects__input');
    return input;
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
