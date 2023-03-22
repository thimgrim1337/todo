import Project from './Project';

export default class TodoList {
  _defaultProjects = [new Project('Main'), new Project('Completed')];
  constructor() {
    this.projects = [...this._defaultProjects];
  }

  isNameAvaiable = (projectName) => {
    if (this.getProject(projectName) || projectName == '') return false;

    return true;
  };

  createProject = (projectName) => {
    this.projects.push(new Project(projectName));
  };

  removeProject = (projectName) => {
    this.projects.splice(
      this.projects.findIndex((project) => project.name == projectName),
      1
    );
  };

  getProject = (projectName) =>
    this.projects.find((project) => project.name == projectName);
  getAllProjects = () => this.projects;
}
