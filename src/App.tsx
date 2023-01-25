import Flex from "./components/layout/Flex";
import Labels from "./pages/Labels";
import Meter from "./pages/Meter";
import { useState } from "react";
import CardContainer from "./components/cards/CardContainer";
import { TransferData } from "./types/dataTransfer";
import { useTasksData } from "./hooks/useTasksData";

const App = () => {
  const [draggedData, setDraggedData] = useState<TransferData>();
  const { newTask, shiftTasks, editTask, filterTasks, labels } = useTasksData();

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
