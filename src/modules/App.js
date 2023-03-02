import Project from './Project';

export default class App {
  constructor() {
    this.projects = [new Project('main')];
  }

  checkName = (name) => {
    if (this.projects.find((project) => (project.name = name)) == undefined)
      return name;
  };

  createProject = (name) =>
    this.projects.push(new Project(this.checkName(name)));

  deleteProject = (name) =>
    this.projects.splice(
      this.projects.findIndex((project) => (project.name = name)),
      1
    );

  getAllProject = () => this.projects;
}
