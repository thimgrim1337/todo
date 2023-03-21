import { todoList } from '..';

export default class Storage {
  static setProjects() {
    localStorage.setItem('projects', JSON.stringify(todoList.getAllProjects()));
  }

  static getProjects() {
    return JSON.parse(localStorage.getItem('projects'));
  }

  static checkStorage() {
    if (localStorage.getItem('projects')) return true;

    return false;
  }
}
