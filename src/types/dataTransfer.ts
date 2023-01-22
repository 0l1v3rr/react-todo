import { Task, TaskStatus } from "./task";

export interface TransferData {
  height: number;
  index: number;
  status: TaskStatus;
  task: Task;
}
