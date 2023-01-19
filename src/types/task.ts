export interface Task {
  id: string;
  position: number;
  title: string;
  labels: Label[];
  status: TaskStatus;
}

export interface Label {
  id: string;
  text: string;
  color: string;
}

export type TaskStatus = "To Do" | "In Progress" | "Done";
