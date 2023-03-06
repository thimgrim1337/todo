import Project from './Project';

export default class App {
  _defaultProjects = [
    new Project('Main'),
    new Project('Completed'),
    new Project('Test'),
  ];
  constructor() {
    this.projects = [...this._defaultProjects];
  }

  checkName = (name) => {
    if (this.projects.find((project) => (project.name = name)) == undefined)
      return name;
  };

  createProject = (name) =>
    this.projects.push(new Project(this.checkName(name)));

  deleteProject = (name) => {
    if (
      name == this._defaultProjects[0].name ||
      name == this._defaultProjects[1].name
    )
      return false;

    this.projects.splice(
      this.projects.findIndex((project) => project.name == name),
      1
    );

    return true;
  };

  getAllProject = () => this.projects;
}
