export default class Project {
  constructor(name) {
    this.tasks = [];
    this.name = name;
  }

  setName = (projectName) => (this.name = projectName);

  getAllTasks = () => this.tasks;

  createTask = (task) => this.tasks.push(task);

  removeTask = (id) =>
    this.tasks.splice(
      this.tasks.findIndex((task) => task.id == id),
      1
    );

  getTask = (id) => this.tasks.find((task) => task.id === id);
}
