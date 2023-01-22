import { TaskStatus } from "./task";

export interface TransferData {
  height: number;
  index: number;
  status: TaskStatus;
}
