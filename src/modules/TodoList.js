import Project from './Project';

export default class TodoList {
  constructor() {
    this.projects = [new Project('Main'), new Project('Completed')];
  }

  isNameAvaiable = (projectName) => {
    if (this.getProject(projectName) || projectName == '') return false;

    return true;
  };

  addProject = (projectName) => {
    this.projects.push(new Project(projectName));
  };
  getProject = (projectName) =>
    this.projects.find((project) => project.name == projectName);

  removeProject = (projectName) => {
    this.projects.splice(
      this.projects.findIndex((project) => project.name == projectName),
      1
    );
  };

  setProjects = (projects) => (this.projects = projects);
  getProjects = () => this.projects;
}
