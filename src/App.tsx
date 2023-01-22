import Flex from "./components/layout/Flex";
import Labels from "./pages/Labels";
import Meter from "./pages/Meter";
import { Label, Task, TaskStatus } from "./types/task";
import { useState, useCallback } from "react";
import { defaultLabels } from "./const/labels";
import CardContainer from "./components/cards/CardContainer";
import { createUUID } from "./utils/uuid";
import { TransferData } from "./types/dataTransfer";

const App = () => {
  const [draggedData, setDraggedData] = useState<TransferData>();
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
      position: 3,
      labels: [labels[4], labels[3]],
      status: "To Do",
      title: "Test task with longer title and emoji and rice 🥰",
    },
    {
      id: "2",
      position: 2,
      labels: [],
      status: "In Progress",
      title: "Test task 2",
    },
    {
      id: "3",
      position: 4,
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
    (toStatus: TaskStatus, taskId: Task["id"], index: number) => {
      const filteredTasks = filterTasks(toStatus);

      // the index of the task in the FULL tasks array
      const taskIndex = tasks.findIndex((task) => task.id === taskId);

      const updatedTask: Task = {
        ...tasks[taskIndex],
        status: toStatus,
        position: index === -1 ? 0 : filteredTasks[index].position,
      };

      const newTasks = [...tasks];
      newTasks.splice(taskIndex, 1);
      newTasks.push(updatedTask);

      // for (let i = index; i < filteredTasks.length; i++) {
      //   const currentIndex = tasks.findIndex(
      //     (task) => task.id === filteredTasks[i].id
      //   );
      //   const { position } = newTasks[currentIndex];
      //   newTasks[currentIndex] = {
      //     ...newTasks[currentIndex],
      //     position: position + 1,
      //   };
      // }

      setTasks(newTasks);
    },
    [tasks, filterTasks, setTasks]
  );

  const newTask = useCallback((task: Task) => {
    setTasks((prev) => {
      task.position = prev.length + 1;
      task.id = createUUID();

      return [...prev, task];
    });
  }, []);

  return (
    <main
      className="bg-gray-900 w-full min-h-screen overflow-x-hidden 
        flex flex-col items-center py-5 px-4 sm:px-10 md:px-14 lg:px-24 gap-2"
    >
      <Flex className="items-stretch flex-col md:flex-row">
        <Meter
          todoCount={filterTasks("To Do").length}
          inProgressCount={filterTasks("In Progress").length}
          doneCount={filterTasks("Done").length}
        />
        <Labels labels={labels} />
      </Flex>

      <Flex className="items-start flex-col md:flex-row">
        {(["To Do", "In Progress", "Done"] as const).map((status) => (
          <CardContainer
            newTask={newTask}
            editTask={editTask}
            shiftTasks={shiftTasks}
            status={status}
            tasks={filterTasks(status)}
            labels={labels}
            draggedData={draggedData}
            setDraggedData={(data) => setDraggedData(data)}
            key={status}
          />
        ))}
      </Flex>
    </main>
  );
};

export default App;
