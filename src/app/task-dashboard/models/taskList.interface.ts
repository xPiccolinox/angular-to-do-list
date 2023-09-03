import { Task } from "./task.interface"

export interface TaskList {
  id: string,
  listName: string,
  tasks: Task[]
}