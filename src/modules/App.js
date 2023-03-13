import Project from './Project';

export default class App {
  _defaultProjects = [new Project('Main'), new Project('Completed')];
  constructor() {
    this.projects = [...this._defaultProjects];
  }

  checkName = (name) => {
    if (
      this.projects.find((project) => project.name == name) == undefined &&
      name != ''
    )
      return true;

    return false;
  };

  createProject = (name) => this.projects.push(new Project(name));

  deleteProject = (name) => {
    this.projects.splice(
      this.projects.findIndex((project) => project.name == name),
      1
    );
  };

  getProject = (name) => this.projects.find((project) => project.name == name);
  getDefaultProjects = () => this._defaultProjects;
  getAllProjects = () => this.projects;
}
