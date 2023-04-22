import { Task } from "./task.interface"

export interface TaskList {
  id: number,
  listName: string,
  tasks: Task[]
}