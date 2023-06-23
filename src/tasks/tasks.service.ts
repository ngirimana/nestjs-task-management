import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   *
   * @returns Task[]
   */
  getAllTasks(): Task[] {
    return this.tasks;
  }

  /**
   *
   * @param filterDto
   * @returns Task[]
   */
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  /**
   *
   * @param id
   * @returns Task
   */
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  /**
   *
   * @param createTaskDto
   * @returns Task
   */
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  /**
   * @param id
   * @returns void
   */
  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  /**
   * @param id
   * @param status
   * @returns Task
   */
  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    console.log(task);
    task.status = status;
    return task;
  }
}
