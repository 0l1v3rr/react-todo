export interface Task {
  id: string;
  title: string;
  description?: string;
  labels: Label;
  status: TaskStatus;
}

export interface Label {
  id: string;
  text: string;
  color: string;
}

export type TaskStatus = "To Do" | "In Progress" | "Done";
