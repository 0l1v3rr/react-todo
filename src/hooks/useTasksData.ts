import { useCallback, useState } from "react";
import { defaultLabels } from "../const/labels";
import { Label, Task, TaskStatus } from "../types/task";
import { createUUID } from "../utils/uuid";

export const useTasksData = () => {
  const [labels] = useState<Label[]>(defaultLabels);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      position: 1,
      labels: [labels[0]],
      status: "To Do",
      title: "Test task to do",
    },
    {
      id: "4",
      position: 2,
      labels: [labels[4], labels[3]],
      status: "To Do",
      title: "Test task with longer title and emoji and rice 🥰",
    },
    {
      id: "2",
      position: 1,
      labels: [],
      status: "In Progress",
      title: "Test task 2",
    },
    {
      id: "3",
      position: 1,
      labels: [labels[2]],
      status: "Done",
      title: "Test task 2",
    },
  ]);

  const filterTasks = useCallback(
    (status: TaskStatus) =>
      [...tasks]
        .filter((t) => t.status === status)
        .sort((a, b) => a.position - b.position),
    [tasks]
  );

  const getNextPosition = useCallback(
    (status: TaskStatus) => {
      return filterTasks(status).length + 1;
    },
    [filterTasks]
  );

  const editTask = useCallback(
    (id: string, task: Task) => {
      const index = tasks.findIndex((task) => task.id === id);
      const newArr = [...tasks];
      newArr[index] = task;
      setTasks(newArr);
    },
    [tasks]
  );

  const shiftTasks = useCallback(
    (
      toStatus: TaskStatus,
      taskId: Task["id"],
      index: number,
      originalIndex: number
    ) => {
      // the index of the task in the FULL tasks array
      const taskIndex = tasks.findIndex((task) => task.id === taskId);

      const filteredTasks = filterTasks(toStatus);
      const newTasks = [...tasks];

      // create the updated task
      const updatedTask: Task = {
        ...tasks[taskIndex],
        status: toStatus,
        position: index + 2,
      };

      // if the from status and the to status is the same
      if (tasks[taskIndex].status === toStatus) {
        for (let i = originalIndex; i < filterTasks.length; i++) {
          const idx = newTasks.findIndex(
            (task) => task.id === filteredTasks[i].id
          );

          const { position } = newTasks[idx];
          newTasks[idx] = { ...newTasks[idx], position: position - 1 };
        }

        // remove and push the updated task
        newTasks.splice(taskIndex, 1);
        filteredTasks.splice(index + 1, 0, updatedTask);

        // increment the position by 1 "under" the new element
        for (let i = index + 1; i < filteredTasks.length; i++) {
          if (tasks[taskIndex].id === filteredTasks[i].id) continue;

          const idx = newTasks.findIndex(
            (task) => task.id === filteredTasks[i].id
          );

          const { position } = newTasks[idx];
          newTasks[idx] = { ...newTasks[idx], position: position + 1 };
        }

        newTasks.push(updatedTask);
        setTasks(newTasks);
        return;
      }

      const fromStatusTasks = filterTasks(tasks[taskIndex].status);

      // increment the position by 1 "under" the new element
      for (let i = index + 1; i < filteredTasks.length; i++) {
        const idx = newTasks.findIndex(
          (task) => task.id === filteredTasks[i].id
        );

        const { position } = newTasks[idx];
        newTasks[idx] = { ...newTasks[idx], position: position + 1 };
      }

      // decrement the position by 1 in the column where the task originates from
      for (let i = originalIndex + 1; i < fromStatusTasks.length; i++) {
        const idx = newTasks.findIndex(
          (task) => task.id === fromStatusTasks[i].id
        );

        const { position } = newTasks[idx];
        newTasks[idx] = { ...newTasks[idx], position: position - 1 };
      }

      // remove and push the updated task
      newTasks.splice(taskIndex, 1);
      newTasks.push(updatedTask);

      setTasks(newTasks);
    },
    [tasks, filterTasks, setTasks]
  );

  const newTask = useCallback(
    (task: Task) => {
      setTasks((prev) => {
        task.position = getNextPosition(task.status);
        task.id = createUUID();

        return [...prev, task];
      });
    },
    [getNextPosition]
  );

  return {
    newTask,
    shiftTasks,
    editTask,
    filterTasks,
    tasks,
    labels,
  };
};
