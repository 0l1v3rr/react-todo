import Flex from "./components/layout/Flex";
import Labels from "./pages/Labels";
import Meter from "./pages/Meter";
import { Label } from "./types/task";
import { useState } from "react";
import { defaultLabels } from "./const/labels";

const App = () => {
  const [labels] = useState<Label[]>(defaultLabels);

  return (
    <main
      className="bg-gray-900 w-full min-h-screen overflow-x-hidden 
        flex flex-col items-center py-5 px-4 sm:px-12 md:px-20"
    >
      <Flex className="items-stretch flex-col md:flex-row">
        <Meter todoCount={4} inProgressCount={12} doneCount={6} />
        <Labels labels={labels} />
      </Flex>
    </main>
  );
};

export default App;
